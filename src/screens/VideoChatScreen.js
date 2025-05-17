import { StyleSheet, Text, View, TouchableOpacity, Alert, Dimensions, Image } from 'react-native';
import React, { useState, useEffect } from 'react';
// WebRTC ile ilgili importları geçici olarak kaldırıp, yorum satırına alıyoruz
// import { RTCView } from 'react-native-webrtc';
// import WebRTCService from '../services/webrtcService';

const VideoChatScreen = ({ navigation, route }) => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [chatVisible, setChatVisible] = useState(false);
  const [remoteUserName, setRemoteUserName] = useState('Kullanıcı');
  
  useEffect(() => {
    // Parametrelerden kullanıcı bilgilerini al
    const { remoteUserDisplayName } = route.params || {};
    
    if (remoteUserDisplayName) {
      setRemoteUserName(remoteUserDisplayName);
    }
    
    // Demo amaçlı bir uyarı gösterelim
    Alert.alert(
      "Test Modu",
      "WebRTC modülleri Expo Go'da çalışmadığından, bu ekran demo modunda çalışmaktadır. Gerçek cihaz testi için EAS Build kullanın.",
      [{ text: "Anladım" }]
    );
    
    return () => {
      // Temizleme işlemleri
    };
  }, []);
  
  const toggleMic = () => {
    setIsMicOn(!isMicOn);
    // Gerçek WebRTC implementasyonunda burada stream kontrolleri olacak
  };
  
  const toggleCamera = () => {
    setIsCameraOn(!isCameraOn);
    // Gerçek WebRTC implementasyonunda burada stream kontrolleri olacak
  };
  
  const toggleChat = () => {
    setChatVisible(!chatVisible);
  };
  
  const endCall = () => {
    Alert.alert(
      'Görüşmeyi Sonlandır',
      'Görüşmeyi sonlandırmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sonlandır', 
          style: 'destructive',
          onPress: () => {
            navigation.navigate('Main');
          }
        }
      ]
    );
  };
  
  const reportUser = () => {
    Alert.alert(
      'Kullanıcıyı Raporla',
      'Bu kullanıcıyı uygunsuz davranış nedeniyle bildirmek istiyor musunuz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Raporla', 
          style: 'destructive',
          onPress: () => {
            navigation.navigate('Report', {
              userId: route.params?.remoteUserId || 'unknown',
              userName: remoteUserName
            });
          }
        }
      ]
    );
  };
  
  const switchCamera = () => {
    Alert.alert('Kamera Değiştirildi', 'Ön/arka kamera değiştirildi.');
  };

  return (
    <View style={styles.container}>
      {/* Diğer kişinin kamerası (arka planda) */}
      <View style={styles.remoteVideo}>
        <Text style={styles.connectingText}>
          {isCameraOn ? 
            "Bu demoda görüntü aktarımı kullanılamıyor.\nWebRTC özelliğini test etmek için EAS Build kullanın." : 
            "Karşı tarafın kamerası kapalı"}
        </Text>
        <Text style={styles.remoteUserName}>{remoteUserName}</Text>
      </View>
      
      {/* Kişinin kendi kamerası (alt köşede küçük pencere) */}
      <View style={styles.localVideoContainer}>
        <View style={[styles.localVideo, !isCameraOn && styles.videoOff]}>
          {!isCameraOn ? (
            <View style={styles.cameraOffOverlay}>
              <Text style={styles.videoOffText}>Kamera Kapalı</Text>
            </View>
          ) : (
            <Text style={[styles.videoOffText, {color: '#ddd'}]}>Kamera Önizlemesi</Text>
          )}
        </View>
      </View>
      
      {/* Yazılı mesaj alanı */}
      {chatVisible && (
        <View style={styles.chatOverlay}>
          <View style={styles.chatHeader}>
            <Text style={styles.chatHeaderText}>Sohbet</Text>
            <TouchableOpacity onPress={toggleChat}>
              <Text style={styles.chatCloseButton}>Kapat</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.chatMessages}>
            <Text style={styles.chatMessage}>Bu özellik henüz geliştiriliyor...</Text>
          </View>
        </View>
      )}
      
      {/* Kontrol butonları */}
      <View style={styles.controlsContainer}>
        <TouchableOpacity 
          style={[styles.controlButton, !isMicOn && styles.controlButtonOff]} 
          onPress={toggleMic}
        >
          <Text style={styles.controlButtonText}>
            {isMicOn ? '🎤' : '🔇'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, !isCameraOn && styles.controlButtonOff]} 
          onPress={toggleCamera}
        >
          <Text style={styles.controlButtonText}>
            {isCameraOn ? '📹' : '❌'}
          </Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, styles.endCallButton]} 
          onPress={endCall}
        >
          <Text style={styles.controlButtonText}>🔚</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={switchCamera}
        >
          <Text style={styles.controlButtonText}>🔄</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={[styles.controlButton, chatVisible && styles.controlButtonActive]} 
          onPress={toggleChat}
        >
          <Text style={styles.controlButtonText}>💬</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.controlButton} 
          onPress={reportUser}
        >
          <Text style={styles.controlButtonText}>⚠️</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default VideoChatScreen;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
  },
  remoteVideo: {
    width: windowWidth,
    height: windowHeight,
    backgroundColor: '#333',
    justifyContent: 'center',
    alignItems: 'center',
  },
  remoteUserName: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'rgba(0,0,0,0.5)',
    padding: 8,
    borderRadius: 8,
  },
  localVideoContainer: {
    position: 'absolute',
    top: 90,
    right: 20,
    zIndex: 1,
    borderRadius: 12,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#fff',
    width: 120,
    height: 180,
  },
  localVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: '#666',
  },
  videoOff: {
    opacity: 0.5,
  },
  cameraOffOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  videoOffText: {
    color: '#fff',
    fontSize: 12,
    textAlign: 'center',
  },
  controlsContainer: {
    position: 'absolute',
    bottom: 40,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  controlButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(255,255,255,0.3)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  controlButtonOff: {
    backgroundColor: 'rgba(255,0,0,0.3)',
  },
  controlButtonActive: {
    backgroundColor: 'rgba(0,255,0,0.3)',
  },
  endCallButton: {
    backgroundColor: 'rgba(255,0,0,0.8)',
  },
  controlButtonText: {
    fontSize: 24,
  },
  chatOverlay: {
    position: 'absolute',
    right: 20,
    bottom: 100,
    width: 250,
    height: 300,
    backgroundColor: 'rgba(0,0,0,0.8)',
    borderRadius: 12,
    padding: 10,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    paddingBottom: 10,
  },
  chatHeaderText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  chatCloseButton: {
    color: '#3498db',
    fontSize: 14,
  },
  chatMessages: {
    flex: 1,
    paddingTop: 10,
  },
  chatMessage: {
    color: '#fff',
    marginBottom: 5,
  },
  connectingText: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
  },
}); 