import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

// Not: Bu geçici bir avatar bileşenidir. Gerçek uygulamada bir görsel dosyası kullanılacaktır.
const Avatar = ({ size = 120, username = 'Kullanıcı' }) => {
  // Kullanıcı adından rastgele renk oluşturma
  const getColor = (name) => {
    const colors = ['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#1abc9c', '#e67e22'];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
      sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const bgColor = getColor(username);
  const initials = username.charAt(0).toUpperCase();

  return (
    <View style={[styles.container, { width: size, height: size, backgroundColor: bgColor }]}>
      <Text style={[styles.text, { fontSize: size / 2.5 }]}>{initials}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default Avatar; 