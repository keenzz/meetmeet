import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  KeyboardAvoidingView, 
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo';
import { registerUser, getErrorMessage } from '../services/authService';

const RegisterScreen = ({ navigation }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const validateInputs = () => {
    if (!name || !email || !password || !confirmPassword) {
      setError('Lütfen tüm alanları doldurun.');
      return false;
    }
    
    if (password !== confirmPassword) {
      setError('Şifreler eşleşmiyor.');
      return false;
    }
    
    if (password.length < 6) {
      setError('Şifre en az 6 karakter olmalıdır.');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Geçerli bir e-posta adresi girin.');
      return false;
    }
    
    return true;
  };

  const handleRegister = async () => {
    if (!validateInputs()) {
      return;
    }
    
    setIsLoading(true);
    setError('');
    
    try {
      // Firebase ile kullanıcı kaydı oluştur
      await registerUser(email, password, name);
      
      setIsLoading(false);
      navigation.navigate('Main');
    } catch (error) {
      setIsLoading(false);
      setError(getErrorMessage(error));
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <View style={styles.logoContainer}>
          <Logo size={80} color="#3498db" />
        </View>
        
        <View style={styles.formContainer}>
          <Text style={styles.title}>Kayıt Ol</Text>
          
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Ad Soyad</Text>
            <TextInput
              style={styles.input}
              placeholder="Ad Soyad"
              value={name}
              onChangeText={setName}
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>E-posta</Text>
            <TextInput
              style={styles.input}
              placeholder="E-posta"
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Şifre</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifre"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
            />
          </View>
          
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Şifre Tekrar</Text>
            <TextInput
              style={styles.input}
              placeholder="Şifre Tekrar"
              value={confirmPassword}
              onChangeText={setConfirmPassword}
              secureTextEntry
            />
          </View>
          
          <TouchableOpacity style={styles.button} onPress={handleRegister} disabled={isLoading}>
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Kayıt Ol</Text>
            )}
          </TouchableOpacity>
          
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Zaten hesabınız var mı? </Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text style={styles.loginLink}>Giriş Yap</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.termsText}>
            Kayıt olarak, <Text style={styles.link}>Kullanım Koşulları</Text> ve{' '}
            <Text style={styles.link}>Gizlilik Politikası</Text>'nı kabul etmiş olursunuz.
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 30,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 40,
    marginBottom: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  errorContainer: {
    backgroundColor: '#ffebee',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  errorText: {
    color: '#d32f2f',
    textAlign: 'center',
  },
  inputContainer: {
    marginBottom: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  loginText: {
    color: '#666',
  },
  loginLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
  termsText: {
    marginTop: 20,
    textAlign: 'center',
    fontSize: 12,
    color: '#999',
    paddingHorizontal: 30,
  },
  link: {
    color: '#3498db',
  },
}); 