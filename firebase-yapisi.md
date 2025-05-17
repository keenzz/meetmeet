# Firebase Veri Yapısı ve Eşleşme Sistemi

## Firestore Koleksiyonları

### `users` Koleksiyonu
```javascript
{
  userId: "string", // Firebase Auth UID
  displayName: "string",
  email: "string",
  profilePicUrl: "string?", // Opsiyonel profil fotoğrafı
  createdAt: timestamp,
  lastActive: timestamp,
  preferences: {
    languages: ["string"], // Konuşulan diller
    interests: ["string"], // İlgi alanları
    matchPreference: "text" | "video" | "both" // Tercih edilen sohbet türü
  },
  isOnline: boolean,
  deviceTokens: ["string"], // Bildirim token'ları
  blockedUsers: ["string"] // Engellenen kullanıcı ID'leri
}
```

### `reports` Koleksiyonu
```javascript
{
  reportId: "string", // Otomatik oluşturulan ID
  reportedUserId: "string", // Rapor edilen kullanıcı
  reporterUserId: "string", // Rapor eden kullanıcı
  reason: "string", // Rapor nedeni
  details: "string", // Ek açıklama
  evidence: "string?", // Ekran görüntüsü URL
  createdAt: timestamp,
  status: "pending" | "reviewed" | "actionTaken" | "dismissed"
}
```

### `chats` Koleksiyonu
```javascript
{
  chatId: "string", // Otomatik oluşturulan ID
  participants: ["string"], // Kullanıcı ID'leri
  type: "text" | "video",
  startedAt: timestamp,
  endedAt: timestamp?,
  isActive: boolean
}
```

## Realtime Database Yapısı

### `/online-users`
```javascript
{
  "userId1": {
    status: "available" | "matching" | "chatting",
    preferences: {
      languages: ["tr", "en"],
      interests: ["music", "gaming"],
      matchType: "text" | "video"
    },
    lastActive: timestamp
  },
  "userId2": { ... }
}
```

### `/matching-queue`
```javascript
{
  "text": {
    "queueId1": {
      userId: "string",
      joinedAt: timestamp,
      preferences: { ... }
    },
    "queueId2": { ... }
  },
  "video": {
    "queueId3": { ... },
    "queueId4": { ... }
  }
}
```

### `/active-chats`
```javascript
{
  "chatId1": {
    participants: {
      "userId1": true,
      "userId2": true
    },
    type: "text" | "video",
    startedAt: timestamp,
    isActive: true
  },
  "chatId2": { ... }
}
```

### `/messages`
```javascript
{
  "chatId1": {
    "messageId1": {
      senderId: "string",
      text: "string",
      timestamp: timestamp,
      read: boolean
    },
    "messageId2": { ... }
  },
  "chatId2": { ... }
}
```

## Eşleşme Algoritması (Cloud Functions)

Eşleşme algoritması, aşağıdaki adımları takip eder:

1. Kullanıcı sohbet başlatmak istediğinde, kendi tercihlerini belirler (dil, ilgi alanları, sohbet türü)
2. Kullanıcı eşleşme kuyruğuna eklenir (`/matching-queue` altında)
3. Cloud Function, belirli aralıklarla veya trigger ile kuyrukta uyumlu kullanıcıları arar
4. Eşleşen kullanıcılar bulunduğunda:
   - Eşleşme kuyruğundan çıkarılır
   - Yeni bir sohbet oluşturulur
   - Her iki kullanıcıya da eşleşme bildirimi gönderilir

### Eşleşme Cloud Function Örneği

```javascript
// Firebase Cloud Functions - matching.js

exports.matchUsers = functions.pubsub.schedule('every 5 seconds').onRun(async (context) => {
  const db = admin.database();
  
  // Text ve video kuyrukları için ayrı eşleşme işlemi
  await matchQueue(db, 'text');
  await matchQueue(db, 'video');
  
  return null;
});

async function matchQueue(db, type) {
  const queueRef = db.ref(`/matching-queue/${type}`);
  const snapshot = await queueRef.once('value');
  
  if (!snapshot.exists()) {
    return;
  }

  const queue = [];
  snapshot.forEach((child) => {
    queue.push({
      id: child.key,
      userId: child.val().userId,
      preferences: child.val().preferences,
      joinedAt: child.val().joinedAt
    });
  });
  
  // En eski kullanıcıları önce eşleştir (FIFO)
  queue.sort((a, b) => a.joinedAt - b.joinedAt);
  
  const matches = [];
  const matched = new Set();
  
  // En uygun eşleşmeleri bul
  for (let i = 0; i < queue.length; i++) {
    if (matched.has(i)) continue;
    
    const user1 = queue[i];
    let bestMatch = null;
    let bestScore = 0;
    
    for (let j = 0; j < queue.length; j++) {
      if (i === j || matched.has(j)) continue;
      
      const user2 = queue[j];
      const score = calculateMatchScore(user1, user2);
      
      if (score > bestScore) {
        bestScore = score;
        bestMatch = j;
      }
    }
    
    if (bestMatch !== null && bestScore > 0) {
      matches.push([i, bestMatch]);
      matched.add(i);
      matched.add(bestMatch);
    }
  }
  
  // Eşleşen kullanıcıları işle
  for (const [i, j] of matches) {
    const user1 = queue[i];
    const user2 = queue[j];
    
    // Eşleşme kuyruğundan çıkar
    await queueRef.child(user1.id).remove();
    await queueRef.child(user2.id).remove();
    
    // Yeni sohbet oluştur
    const chatId = db.ref('/active-chats').push().key;
    
    await db.ref(`/active-chats/${chatId}`).set({
      participants: {
        [user1.userId]: true,
        [user2.userId]: true
      },
      type: type,
      startedAt: admin.database.ServerValue.TIMESTAMP,
      isActive: true
    });
    
    // Kullanıcıları aktif sohbet durumuna güncelle
    await db.ref(`/online-users/${user1.userId}/status`).set('chatting');
    await db.ref(`/online-users/${user2.userId}/status`).set('chatting');
    
    // Eşleşme bildirimi gönder
    await sendMatchNotification(user1.userId, user2.userId, chatId, type);
  }
}

// Eşleşme skorunu hesapla (ortak dil ve ilgi alanları)
function calculateMatchScore(user1, user2) {
  let score = 0;
  
  // Dil uyumluluğu kontrolü
  const commonLanguages = user1.preferences.languages.filter(lang => 
    user2.preferences.languages.includes(lang)
  );
  
  if (commonLanguages.length === 0) {
    return 0; // Ortak dil yoksa eşleştirme yapma
  }
  
  // Ortak ilgi alanları için puan ekle
  const user1Interests = user1.preferences.interests || [];
  const user2Interests = user2.preferences.interests || [];
  
  const commonInterests = user1Interests.filter(interest => 
    user2Interests.includes(interest)
  );
  
  // Her ortak ilgi alanı için 10 puan
  score += commonInterests.length * 10;
  
  // Temel olarak ortak dil için 50 puan
  score += commonLanguages.length * 50;
  
  return score;
}

// Eşleşme bildirimi gönder
async function sendMatchNotification(userId1, userId2, chatId, type) {
  // Firebase Cloud Messaging ile bildirimleri gönder
  const user1Doc = await admin.firestore().collection('users').doc(userId1).get();
  const user2Doc = await admin.firestore().collection('users').doc(userId2).get();
  
  const user1Tokens = user1Doc.data().deviceTokens || [];
  const user2Tokens = user2Doc.data().deviceTokens || [];
  
  const chatType = type === 'text' ? 'yazılı sohbet' : 'görüntülü sohbet';
  
  if (user1Tokens.length > 0) {
    await admin.messaging().sendMulticast({
      tokens: user1Tokens,
      notification: {
        title: 'Yeni Eşleşme!',
        body: `Bir ${chatType} eşleşmeniz bulundu. Hemen sohbete başlayın!`
      },
      data: {
        chatId: chatId,
        type: type
      }
    });
  }
  
  if (user2Tokens.length > 0) {
    await admin.messaging().sendMulticast({
      tokens: user2Tokens,
      notification: {
        title: 'Yeni Eşleşme!',
        body: `Bir ${chatType} eşleşmeniz bulundu. Hemen sohbete başlayın!`
      },
      data: {
        chatId: chatId,
        type: type
      }
    });
  }
}
```

## WebRTC Entegrasyonu

Görüntülü sohbet için WebRTC kullanacağız. Firebase, WebRTC için sinyalleşme sunucusu olarak kullanılabilir.

### Sinyalleşme İçin Realtime Database Yapısı

```javascript
{
  "webrtc-signaling": {
    "chatId1": {
      "userId1": {
        "offer": { ... },
        "ice-candidates": [ ... ]
      },
      "userId2": {
        "answer": { ... },
        "ice-candidates": [ ... ]
      }
    }
  }
}
```

WebRTC ile ilgili sinyalleşme mesajları bu yapı üzerinden iletilerek kullanıcılar arasında doğrudan P2P bağlantı kurulacaktır. 