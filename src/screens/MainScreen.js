import { StyleSheet, Text, View, TouchableOpacity, StatusBar, Alert } from 'react-native';
import React from 'react';
import { logoutUser } from '../services/authService';

const MainScreen = ({ navigation }) => {
  const onlineUserCount = 2453; // Örnek kullanıcı sayısı, gerçek uygulamada Firebase'den gelecek

  const handleLogout = async () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          onPress: async () => {
            try {
              await logoutUser();
              navigation.navigate('Welcome');
            } catch (error) {
              Alert.alert('Hata', 'Çıkış yapılırken bir hata oluştu.');
            }
          }
        }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>MeetMeet</Text>
        <View style={styles.onlineContainer}>
          <View style={styles.onlineDot} />
          <Text style={styles.onlineText}>{onlineUserCount} çevrimiçi</Text>
        </View>
      </View>
      
      <View style={styles.actionsContainer}>
        <TouchableOpacity 
          style={styles.chatButton}
          onPress={() => navigation.navigate('MatchPreferences')}
        >
          <Text style={styles.chatButtonText}>Sohbet Başlat</Text>
        </TouchableOpacity>
        
        <View style={styles.menuContainer}>
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Profile')}
          >
            <Text style={styles.menuButtonText}>Profil</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.menuButtonText}>Ayarlar</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuButton}
            onPress={() => navigation.navigate('Notifications')}
          >
            <Text style={styles.menuButtonText}>Bildirimler</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.menuButtonLogout}
            onPress={handleLogout}
          >
            <Text style={styles.menuButtonText}>Çıkış Yap</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.bottomButtons}>
          <TouchableOpacity 
            style={styles.bottomButton}
            onPress={() => navigation.navigate('Help')}
          >
            <Text style={styles.bottomButtonText}>Yardım</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.bottomButton}
            onPress={() => navigation.navigate('About')}
          >
            <Text style={styles.bottomButtonText}>Hakkında</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default MainScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3498db',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
  },
  onlineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  onlineDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#2ecc71',
    marginRight: 8,
  },
  onlineText: {
    color: '#fff',
    fontWeight: '500',
  },
  actionsContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  chatButton: {
    backgroundColor: '#fff',
    paddingVertical: 20,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 40,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  chatButtonText: {
    color: '#3498db',
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuContainer: {
    marginTop: 30,
  },
  menuButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  menuButtonLogout: {
    backgroundColor: 'rgba(231, 76, 60, 0.7)',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  menuButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
  bottomButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  bottomButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    width: '48%',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  bottomButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '500',
  },
}); 