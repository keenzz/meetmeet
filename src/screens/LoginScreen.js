import { StyleSheet, Text, View, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform, Alert, ActivityIndicator } from 'react-native';
import React, { useState } from 'react';
import Logo from '../assets/logo';
import { loginUser, getErrorMessage } from '../services/authService';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Lütfen e-posta ve şifrenizi girin.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Firebase ile giriş yap
      await loginUser(email, password);
      // Başarılı giriş
      setIsLoading(false);
      navigation.navigate('Main');
    } catch (error) {
      setIsLoading(false);
      setError(getErrorMessage(error));
    }
  };
  
  const handleForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <KeyboardAvoidingView 
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.logoContainer}>
        <Logo size={100} color="#3498db" />
      </View>
      
      <View style={styles.formContainer}>
        <Text style={styles.title}>Giriş Yap</Text>
        
        {error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        ) : null}
        
        <View style={styles.inputContainer}>
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
          <TextInput
            style={styles.input}
            placeholder="Şifre"
            value={password}
            onChangeText={setPassword}
            secureTextEntry
          />
        </View>
        
        <TouchableOpacity onPress={handleForgotPassword}>
          <Text style={styles.forgotPassword}>Şifremi Unuttum</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={handleLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="#fff" size="small" />
          ) : (
            <Text style={styles.buttonText}>Giriş Yap</Text>
          )}
        </TouchableOpacity>
        
        <View style={styles.socialLoginContainer}>
          <Text style={styles.socialText}>Veya şununla giriş yap:</Text>
          
          <View style={styles.socialButtons}>
            <TouchableOpacity style={styles.socialButton}>
              <Text>Google</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.socialButton}>
              <Text>Facebook</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Hesabın yok mu? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Register')}>
            <Text style={styles.signupLink}>Kayıt Ol</Text>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 50,
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
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 15,
    paddingVertical: 12,
    fontSize: 16,
  },
  forgotPassword: {
    textAlign: 'right',
    color: '#3498db',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  socialLoginContainer: {
    marginVertical: 20,
  },
  socialText: {
    textAlign: 'center',
    marginBottom: 15,
    color: '#666',
  },
  socialButtons: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  socialButton: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: 'bold',
  },
}); 