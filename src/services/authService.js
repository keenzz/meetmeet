import { 
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from 'firebase/auth';
import { ref, set } from 'firebase/database';
import { auth, database } from '../utils/firebaseConfig';

// Kullanıcı kaydı
export const registerUser = async (email, password, displayName) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    // Kullanıcı adını güncelle
    await updateProfile(user, { displayName });
    
    // Kullanıcı bilgilerini veritabanına kaydet
    await set(ref(database, `users/${user.uid}`), {
      email,
      displayName,
      createdAt: new Date().toISOString(),
      preferences: {
        interests: [],
        language: 'tr',
      }
    });
    
    return user;
  } catch (error) {
    throw error;
  }
};

// Kullanıcı girişi
export const loginUser = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return userCredential.user;
  } catch (error) {
    throw error;
  }
};

// Şifre sıfırlama
export const resetPassword = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return true;
  } catch (error) {
    throw error;
  }
};

// Çıkış yap
export const logoutUser = async () => {
  try {
    await signOut(auth);
    return true;
  } catch (error) {
    throw error;
  }
};

// Firebase hata mesajlarını kullanıcı dostu metinlere dönüştür
export const getErrorMessage = (error) => {
  switch (error.code) {
    case 'auth/email-already-in-use':
      return 'Bu e-posta adresi zaten kullanımda.';
    case 'auth/invalid-email':
      return 'Geçersiz e-posta adresi.';
    case 'auth/user-disabled':
      return 'Bu kullanıcı hesabı devre dışı bırakılmış.';
    case 'auth/user-not-found':
      return 'Bu e-posta adresiyle ilişkili bir hesap bulunamadı.';
    case 'auth/wrong-password':
      return 'Yanlış şifre.';
    case 'auth/weak-password':
      return 'Şifre çok zayıf. En az 6 karakter kullanın.';
    case 'auth/too-many-requests':
      return 'Çok fazla başarısız giriş denemesi. Lütfen daha sonra tekrar deneyin.';
    default:
      return error.message || 'Bir hata oluştu. Lütfen tekrar deneyin.';
  }
}; 