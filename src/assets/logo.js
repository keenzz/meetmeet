import React from 'react';
import { Text, StyleSheet } from 'react-native';

// Metin tabanlı marka adı bileşeni
const Logo = ({ size = 150, color = '#fff' }) => {
  // Boyutu font boyutuna dönüştür
  const fontSize = size * 0.30; // Boyutun %30'u kadar font büyüklüğü
  
  return (
    <Text style={[styles.brandText, { fontSize, color }]}>
      MeetMeet
    </Text>
  );
};

const styles = StyleSheet.create({
  brandText: {
    fontWeight: 'bold',
    letterSpacing: 1,
    textAlign: 'center',
  },
});

export default Logo; 