import { StyleSheet, Text, View, ActivityIndicator, TouchableOpacity, Animated } from 'react-native';
import React, { useEffect, useState, useRef } from 'react';

const MatchWaitingScreen = ({ navigation, route }) => {
  const [waitingTime, setWaitingTime] = useState(0);
  const [onlineUsers, setOnlineUsers] = useState(2453); // Örnek kullanıcı sayısı
  const bounceAnim = useRef(new Animated.Value(0)).current;
  
  const { interests, language, locationFilter, videoChat } = route.params || {};
  
  useEffect(() => {
    // Her saniye bekleme süresini güncelleme
    const interval = setInterval(() => {
      setWaitingTime(prev => prev + 1);
    }, 1000);
    
    // Her 2 saniyede bir kullanıcı sayısını rastgele güncelleme (gerçek uygulamada Firebase'den gelir)
    const usersInterval = setInterval(() => {
      setOnlineUsers(prev => Math.max(2000, prev + Math.floor(Math.random() * 21) - 10));
    }, 2000);
    
    // Döngüsel zıplama animasyonu
    const startBounceAnimation = () => {
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 800,
          useNativeDriver: true,
        })
      ]).start(() => startBounceAnimation());
    };
    
    startBounceAnimation();
    
    // Örnek olarak 5 saniye sonra eşleşme bulduğumuzu varsayalım ve ekran geçişi yapalım
    const timeoutId = setTimeout(() => {
      // Firebase'den rastgele bir kullanıcı ile eşleşme olduğunu varsayalım
      const matchedUser = {
        uid: `user-${Math.floor(Math.random() * 1000)}`,
        displayName: `Kullanıcı${Math.floor(Math.random() * 1000)}`,
      };
      
      if (videoChat) {
        // Görüntülü sohbet için gerekli parametreleri aktar
        navigation.replace('VideoChat', {
          remoteUserId: matchedUser.uid,
          remoteUserDisplayName: matchedUser.displayName,
          isIncoming: false
        });
      } else {
        // Yazılı sohbet için gerekli parametreleri aktar
        navigation.replace('TextChat', {
          userId: matchedUser.uid,
          userName: matchedUser.displayName
        });
      }
    }, 5000);
    
    return () => {
      clearInterval(interval);
      clearInterval(usersInterval);
      clearTimeout(timeoutId);
    };
  }, [navigation, videoChat]);
  
  const formatWaitingTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins < 10 ? '0' : ''}${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const scalingAnimation = bounceAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 1.2],
  });
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eşleşme Bekleniyor</Text>
      
      <View style={styles.preferencesContainer}>
        <Text style={styles.preferencesTitle}>Tercihleriniz:</Text>
        {interests && interests.length > 0 && (
          <Text style={styles.preference}>İlgi Alanları: {interests.join(', ')}</Text>
        )}
        <Text style={styles.preference}>Dil: {language}</Text>
        <Text style={styles.preference}>Konum Filtresi: {locationFilter ? 'Açık' : 'Kapalı'}</Text>
        <Text style={styles.preference}>Görüntülü Sohbet: {videoChat ? 'Açık' : 'Kapalı'}</Text>
      </View>
      
      <View style={styles.loaderContainer}>
        <Animated.View style={{ transform: [{ scale: scalingAnimation }] }}>
          <ActivityIndicator size="large" color="#3498db" />
        </Animated.View>
        <Text style={styles.waitingText}>Sizin için en uygun eşleşmeyi arıyoruz...</Text>
        <Text style={styles.timerText}>Bekleme süresi: {formatWaitingTime(waitingTime)}</Text>
      </View>
      
      <View style={styles.usersInfoContainer}>
        <Text style={styles.onlineUsersText}>{onlineUsers} kullanıcı çevrimiçi</Text>
      </View>
      
      <TouchableOpacity 
        style={styles.cancelButton}
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.cancelButtonText}>İptal Et</Text>
      </TouchableOpacity>
    </View>
  );
};

export default MatchWaitingScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 40,
    marginBottom: 20,
  },
  preferencesContainer: {
    backgroundColor: '#f8f8f8',
    borderRadius: 10,
    padding: 15,
    width: '100%',
  },
  preferencesTitle: {
    fontWeight: 'bold',
    marginBottom: 8,
    fontSize: 16,
  },
  preference: {
    marginBottom: 5,
    color: '#555',
  },
  loaderContainer: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  waitingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 10,
  },
  timerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  usersInfoContainer: {
    marginBottom: 20,
  },
  onlineUsersText: {
    fontSize: 16,
    color: '#27ae60',
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    marginBottom: 30,
    width: '100%',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 