# MeetMeet - Rastgele Görüntülü ve Yazılı Sohbet Uygulaması

MeetMeet, Omegle benzeri bir rastgele sohbet uygulamasıdır. Kullanıcıların ilgi alanları ve dil tercihleri doğrultusunda yeni insanlarla tanışmasını sağlar.

## Özellikler

- Kullanıcı kaydı ve kimlik doğrulama
- İlgi alanlarına göre eşleşme
- Metin tabanlı sohbet
- Görüntülü sohbet
- Kullanıcı raporlama sistemi
- Profil oluşturma ve düzenleme
- Çeşitli gizlilik ayarları

## Teknoloji Yığını

- **Frontend**: React Native Expo
- **Backend**: Firebase
  - Authentication: Kullanıcı yönetimi
  - Firestore: Kullanıcı verileri ve ayarlar
  - Realtime Database: Anlık mesajlaşma
  - Cloud Functions: Eşleştirme algoritması
  - Storage: Medya dosyaları
- **Görüntülü Sohbet**: WebRTC (geliştirme aşamasında)
- **Bildirimler**: Firebase Cloud Messaging

## Kurulum ve Çalıştırma

1. Repoyu klonlayın:
```bash
git clone https://github.com/yourusername/meetmeet.git
cd meetmeet
```

2. Bağımlılıkları yükleyin:
```bash
npm install
```

3. Uygulamayı çalıştırın:
```bash
npm start
```

4. Expo Go uygulamasını kullanarak mobil cihazınızda test edin veya emülatör kullanın:
```bash
npm run android
# veya
npm run ios
```

## Firebase Kurulumu

1. Firebase konsolunda yeni bir proje oluşturun
2. Web uygulaması ekleyin ve yapılandırma bilgilerini alın
3. `App.js` dosyasındaki Firebase yapılandırma bölümünü güncelleyin
4. Authentication, Firestore ve Realtime Database hizmetlerini etkinleştirin

## Proje Yapısı

```
src/
├── assets/       # Görseller, fontlar ve diğer statik dosyalar
├── components/   # Yeniden kullanılabilir bileşenler
├── constants/    # Sabitler, renkler, boyutlar vb.
├── hooks/        # Özel React kancaları
├── navigation/   # Navigasyon yapısı
├── screens/      # Uygulama ekranları
└── services/     # Firebase ve diğer harici servis entegrasyonları
```

## Katkıda Bulunma

1. Bu repoyu forklayın
2. Kendi feature branch'inizi oluşturun (`git checkout -b feature/amazing-feature`)
3. Değişikliklerinizi commit edin (`git commit -m 'Add some amazing feature'`)
4. Branch'inizi push edin (`git push origin feature/amazing-feature`)
5. Pull Request açın

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için `LICENSE` dosyasına bakabilirsiniz. 