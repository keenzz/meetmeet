# Omegle Benzeri Uygulama Proje Yapısı

```
/omegle-clone
|-- /assets
|   |-- /images             # Uygulama görselleri
|   |-- /fonts              # Özel yazı tipleri
|   |-- /animations         # Lottie animasyonları
|
|-- /src
|   |-- /components         # Yeniden kullanılabilir UI bileşenleri
|   |   |-- /buttons
|   |   |-- /cards
|   |   |-- /inputs
|   |   |-- /modals
|   |   |-- /headers
|   |   |-- /loading
|   |   |-- /chat
|   |   |-- /video
|   |
|   |-- /screens            # Uygulama ekranları
|   |   |-- /auth           # Kimlik doğrulama ekranları
|   |   |   |-- WelcomeScreen.js
|   |   |   |-- LoginScreen.js
|   |   |   |-- RegisterScreen.js
|   |   |
|   |   |-- /main           # Ana uygulama ekranları
|   |   |   |-- HomeScreen.js
|   |   |   |-- ProfileScreen.js
|   |   |   |-- SettingsScreen.js
|   |   |
|   |   |-- /chat           # Sohbet ekranları
|   |   |   |-- MatchPreferencesScreen.js
|   |   |   |-- MatchLoadingScreen.js
|   |   |   |-- TextChatScreen.js
|   |   |   |-- VideoChatScreen.js
|   |   |   |-- ReportUserScreen.js
|   |   |
|   |   |-- /settings       # Ayarlar ekranları
|   |   |   |-- NotificationsScreen.js
|   |   |   |-- PrivacyScreen.js
|   |   |   |-- HelpScreen.js
|   |   |   |-- AboutScreen.js
|   |
|   |-- /navigation         # React Navigation yapılandırması
|   |   |-- AppNavigator.js # Ana navigasyon yapısı
|   |   |-- AuthNavigator.js
|   |   |-- ChatNavigator.js
|   |   |-- MainNavigator.js
|   |
|   |-- /services           # Harici servisler ve API bağlantıları
|   |   |-- /firebase       # Firebase servisleri
|   |   |   |-- config.js
|   |   |   |-- auth.js
|   |   |   |-- database.js
|   |   |   |-- storage.js
|   |   |   |-- matching.js
|   |   |
|   |   |-- /chat           # Sohbet servisleri
|   |   |   |-- messages.js
|   |   |   |-- videoCall.js
|   |
|   |-- /hooks              # Özel React hooks
|   |   |-- useAuth.js
|   |   |-- useChat.js
|   |   |-- useMatching.js
|   |   |-- useVideoCall.js
|   |
|   |-- /contexts           # React Context API'leri
|   |   |-- AuthContext.js
|   |   |-- ThemeContext.js
|   |   |-- ChatContext.js
|   |
|   |-- /utils              # Yardımcı fonksiyonlar ve sabitler
|   |   |-- constants.js
|   |   |-- helpers.js
|   |   |-- validation.js
|   |   |-- permissions.js
|   |
|   |-- /store              # State yönetimi (Redux veya Context)
|   |   |-- /actions
|   |   |-- /reducers
|   |   |-- /selectors
|   |   |-- store.js
|   |
|   |-- /styles             # Ortak stil tanımlamaları
|   |   |-- colors.js
|   |   |-- typography.js
|   |   |-- spacing.js
|   |   |-- theme.js
|   |
|   |-- /localization       # Çoklu dil desteği
|   |   |-- i18n.js
|   |   |-- /translations
|   |       |-- tr.json
|   |       |-- en.json
|   |
|   |-- App.js              # Ana uygulama bileşeni
|
|-- /firebase               # Firebase Cloud Functions
|   |-- functions/
|       |-- index.js        # Cloud Functions tanımlamaları
|       |-- matching.js     # Eşleşme fonksiyonları
|       |-- notifications.js # Bildirim fonksiyonları
|
|-- app.json                # Expo yapılandırması
|-- babel.config.js         # Babel yapılandırması
|-- package.json            # Bağımlılıklar ve komutlar
|-- metro.config.js         # Metro bundler yapılandırması
|-- .gitignore
|-- README.md
```

## Temel Bağımlılıklar

```json
{
  "dependencies": {
    "expo": "~48.0.0",
    "expo-status-bar": "~1.4.0",
    "react": "18.2.0",
    "react-native": "0.71.8",
    "expo-av": "~13.2.1",
    "expo-camera": "~13.2.1",
    "expo-image-picker": "~14.1.1",
    "expo-notifications": "~0.18.1",
    "expo-permissions": "~14.1.1",
    "firebase": "^9.22.0",
    "react-native-gesture-handler": "~2.9.0",
    "react-native-reanimated": "~2.14.4",
    "react-native-safe-area-context": "4.5.0",
    "react-native-screens": "~3.20.0",
    "@react-navigation/native": "^6.1.6",
    "@react-navigation/stack": "^6.3.16",
    "@react-navigation/bottom-tabs": "^6.5.7",
    "react-native-vector-icons": "^9.2.0",
    "expo-constants": "~14.2.1",
    "react-native-dotenv": "^3.4.8",
    "@reduxjs/toolkit": "^1.9.5",
    "react-redux": "^8.0.5",
    "i18n-js": "^4.2.3",
    "react-native-webrtc": "^1.94.1"
  },
  "devDependencies": {
    "@babel/core": "^7.20.0",
    "babel-preset-expo": "^9.3.0",
    "eslint": "^8.40.0",
    "eslint-plugin-react": "^7.32.2",
    "eslint-plugin-react-native": "^4.0.0"
  }
}
```

## Firebase Yapılandırması

Firebase'i yapılandırmak için gereken temel adımlar:

1. Firebase Console'da yeni bir proje oluşturun
2. Web uygulaması ekleyin
3. Authentication, Firestore, Realtime Database, Storage ve Cloud Functions hizmetlerini etkinleştirin
4. Web yapılandırmasını `src/services/firebase/config.js` dosyasına ekleyin:

```javascript
// src/services/firebase/config.js
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.manifest.extra.firebaseApiKey,
  authDomain: Constants.manifest.extra.firebaseAuthDomain,
  projectId: Constants.manifest.extra.firebaseProjectId,
  storageBucket: Constants.manifest.extra.firebaseStorageBucket,
  messagingSenderId: Constants.manifest.extra.firebaseMessagingSenderId,
  appId: Constants.manifest.extra.firebaseAppId,
  databaseURL: Constants.manifest.extra.firebaseDatabaseURL
};

// Firebase'i başlat
const app = initializeApp(firebaseConfig);

// Auth servisi
const auth = getAuth(app);

// Firestore veritabanı
const firestore = getFirestore(app);

// Realtime Database
const database = getDatabase(app);

// Storage
const storage = getStorage(app);

export { app, auth, firestore, database, storage };
``` 