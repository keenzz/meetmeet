import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from '../assets/logo';

const WelcomeScreen = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Logo size={150} color="#fff" />
        <Text style={styles.tagline}>Hemen yeni insanlarla tanışmaya başlayın!</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity 
          style={styles.button} 
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.buttonText}>Giriş Yap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.registerButton]} 
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.buttonText}>Kayıt Ol</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.button, styles.guestButton]} 
          onPress={() => navigation.navigate('Main')}
        >
          <Text style={styles.guestButtonText}>Misafir Olarak Devam Et</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 50,
  },
  tagline: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
    marginTop: 20,
  },
  buttonContainer: {
    width: '100%',
  },
  button: {
    backgroundColor: '#2980b9',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 15,
  },
  registerButton: {
    backgroundColor: '#27ae60',
  },
  guestButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  guestButtonText: {
    color: '#fff',
    fontSize: 16,
  },
}); 