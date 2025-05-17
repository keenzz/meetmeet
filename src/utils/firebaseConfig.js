// Firebase konfigürasyon dosyası
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import { getDatabase } from 'firebase/database';
import { getStorage } from 'firebase/storage';
import AsyncStorage from '@react-native-async-storage/async-storage';

// !!! ÖNEMLİ UYARI !!!
// Mevcut API anahtarı askıya alınmış. 
// Aşağıdaki adımları izleyin:
// 1. Firebase Console'da (https://console.firebase.google.com/) yeni bir proje oluşturun
// 2. Android uygulamasını kaydedin
// 3. google-services.json dosyasını indirin ve proje kök dizinine koyun
// 4. google-services.json dosyasındaki değerleri aşağıya ekleyin

// Firebase yapılandırma
const firebaseConfig = {
  apiKey: "AIzaSyD1DeiklmiYX0qGDYxRKla6sqI1aEHgNok",
  authDomain: "meetmeetapps.firebaseapp.com",
  projectId: "meetmeetapps",
  storageBucket: "meetmeetapps.firebasestorage.app",
  messagingSenderId: "299653157110",
  appId: "1:299653157110:android:bf4c9c9b5b16df2fcc5cd7",
  databaseURL: "https://meetmeetapps-default-rtdb.europe-west1.firebasedatabase.app"
};

// Firebase uygulamasını başlat
const app = initializeApp(firebaseConfig);

// Auth servisini AsyncStorage ile başlat
const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage)
});

// Hizmetleri dışa aktar
export { auth };
export const database = getDatabase(app);
export const storage = getStorage(app);
export default app; 