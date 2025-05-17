import React, { useState } from 'react';
import { 
  StyleSheet, 
  Text, 
  View, 
  TextInput, 
  TouchableOpacity, 
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  ActivityIndicator
} from 'react-native';
import { resetPassword, getErrorMessage } from '../services/authService';
import Logo from '../assets/logo';

const ForgotPasswordScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleResetPassword = async () => {
    if (!email) {
      setError('Lütfen e-posta adresinizi girin.');
      return;
    }
    
    if (!validateEmail(email)) {
      setError('Lütfen geçerli bir e-posta adresi girin.');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      // Firebase şifre sıfırlama işlemi
      await resetPassword(email);
      setIsLoading(false);
      setIsSent(true);
    } catch (error) {
      setIsLoading(false);
      setError(getErrorMessage(error));
    }
  };

  const handleTryAgain = () => {
    setIsSent(false);
    setEmail('');
    setError('');
  };

  if (isSent) {
    return (
      <View style={styles.container}>
        <View style={styles.successContainer}>
          <View style={styles.emailSentIcon}>
            <Text style={styles.emailIconText}>✉️</Text>
          </View>
          <Text style={styles.successTitle}>E-posta Gönderildi!</Text>
          <Text style={styles.successMessage}>
            {email} adresine şifre sıfırlama bağlantısı gönderdik.
            Lütfen e-postanızı kontrol edin ve bağlantıya tıklayarak şifrenizi sıfırlayın.
          </Text>
          
          <TouchableOpacity 
            style={styles.buttonOutline}
            onPress={handleTryAgain}
          >
            <Text style={styles.buttonOutlineText}>Tekrar Dene</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.button}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.buttonText}>Giriş Ekranına Dön</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.goBack()}
          >
            <Text style={styles.backButtonText}>← Geri</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.logoContainer}>
          <Logo size={100} color="#3498db" />
        </View>

        <Text style={styles.title}>Şifrenizi mi Unuttunuz?</Text>
        <Text style={styles.subtitle}>
          Endişelenmeyin! Kayıtlı e-posta adresinizi girin ve size şifre sıfırlama bağlantısı gönderelim.
        </Text>

        <View style={styles.formContainer}>
          {error ? (
            <View style={styles.errorContainer}>
              <Text style={styles.errorText}>{error}</Text>
            </View>
          ) : null}

          <Text style={styles.label}>E-posta Adresi</Text>
          <TextInput
            style={styles.input}
            placeholder="E-posta adresinizi girin"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(text) => {
              setEmail(text);
              setError('');
            }}
          />

          <TouchableOpacity
            style={[styles.button, !email ? styles.buttonDisabled : null]}
            onPress={handleResetPassword}
            disabled={!email || isLoading}
          >
            {isLoading ? (
              <ActivityIndicator color="#fff" size="small" />
            ) : (
              <Text style={styles.buttonText}>Şifre Sıfırlama Bağlantısı Gönder</Text>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>
            E-posta adresinizi hatırlıyor musunuz?{' '}
            <Text 
              style={styles.footerLink}
              onPress={() => navigation.navigate('Login')}
            >
              Giriş Yap
            </Text>
          </Text>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default ForgotPasswordScreen;

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    width: '100%',
    paddingTop: 40,
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backButtonText: {
    fontSize: 16,
    color: '#3498db',
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  emailSentIcon: {
    width: 150,
    height: 150,
    borderRadius: 75,
    backgroundColor: '#e3f2fd',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  emailIconText: {
    fontSize: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
  },
  formContainer: {
    width: '100%',
    marginBottom: 30,
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
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: '500',
  },
  input: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    padding: 15,
    marginBottom: 20,
    fontSize: 16,
  },
  button: {
    backgroundColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
  },
  buttonDisabled: {
    backgroundColor: '#a0d1f2',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  buttonOutline: {
    borderWidth: 1,
    borderColor: '#3498db',
    borderRadius: 8,
    padding: 15,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonOutlineText: {
    color: '#3498db',
    fontSize: 16,
    fontWeight: '500',
  },
  footer: {
    alignItems: 'center',
  },
  footerText: {
    fontSize: 14,
    color: '#666',
  },
  footerLink: {
    color: '#3498db',
    fontWeight: '500',
  },
  successContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  successTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  successMessage: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 30,
    lineHeight: 22,
  },
}); 