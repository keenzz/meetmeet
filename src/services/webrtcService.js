// WebRTC Hizmeti - Görüntülü görüşme için
import { RTCPeerConnection, RTCSessionDescription, RTCIceCandidate, mediaDevices } from 'react-native-webrtc';
import { ref, onValue, set, push, onDisconnect, remove } from 'firebase/database';
import { auth, database } from '../utils/firebaseConfig';

// STUN sunucuları (Internet üzerinden bağlantı kurmak için)
const configuration = {
  iceServers: [
    { urls: 'stun:stun.l.google.com:19302' },
    { urls: 'stun:stun1.l.google.com:19302' }
  ]
};

export default class WebRTCService {
  constructor() {
    this.localStream = null;
    this.remoteStream = null;
    this.peerConnection = null;
    this.roomId = null;
    this.callListenersAdded = false;
    this.onRemoteStreamUpdate = null;
  }

  // Yerel medya akışını başlatma
  async startLocalStream() {
    try {
      const stream = await mediaDevices.getUserMedia({
        audio: true,
        video: {
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      
      this.localStream = stream;
      return stream;
    } catch (error) {
      console.error('Medya erişimi hatası:', error);
      throw error;
    }
  }

  // Yerel medya akışını durdurma
  stopLocalStream() {
    if (this.localStream) {
      this.localStream.getTracks().forEach(track => track.stop());
      this.localStream = null;
    }
  }

  // Görüntülü arama başlatma
  async startCall(remoteUserId) {
    try {
      // Peer bağlantısı oluşturma
      this.createPeerConnection();
      
      // Yerel medya akışını ekle
      if (!this.localStream) {
        await this.startLocalStream();
      }
      
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });
      
      // Yeni oda oluştur
      const roomRef = await push(ref(database, 'calls'), {
        caller: auth.currentUser.uid,
        callee: remoteUserId,
        status: 'waiting',
        createdAt: new Date().toISOString()
      });
      
      this.roomId = roomRef.key;
      
      // Bağlantı kesildiğinde odayı sil
      onDisconnect(roomRef).remove();
      
      // Teklif oluştur
      const offer = await this.peerConnection.createOffer();
      await this.peerConnection.setLocalDescription(offer);
      
      // Teklifi veritabanına kaydet
      await set(ref(database, `calls/${this.roomId}/offer`), {
        type: offer.type,
        sdp: offer.sdp
      });
      
      // Cevap için dinleme
      this.setupCallListeners();
      
      return this.roomId;
    } catch (error) {
      console.error('Arama başlatma hatası:', error);
      this.endCall();
      throw error;
    }
  }
  
  // Görüntülü aramayı yanıtlama
  async answerCall(roomId) {
    try {
      this.roomId = roomId;
      
      // Peer bağlantısı oluşturma
      this.createPeerConnection();
      
      // Yerel medya akışını ekle
      if (!this.localStream) {
        await this.startLocalStream();
      }
      
      this.localStream.getTracks().forEach(track => {
        this.peerConnection.addTrack(track, this.localStream);
      });
      
      // Teklifi al
      const roomRef = ref(database, `calls/${roomId}`);
      const roomSnapshot = await new Promise(resolve => {
        onValue(roomRef, snapshot => {
          resolve(snapshot);
        }, { onlyOnce: true });
      });
      
      const roomData = roomSnapshot.val();
      if (!roomData || !roomData.offer) {
        throw new Error('Geçersiz oda veya teklif bulunamadı');
      }
      
      // Uzak açıklamayı ayarla
      const offer = new RTCSessionDescription(roomData.offer);
      await this.peerConnection.setRemoteDescription(offer);
      
      // Cevap oluştur
      const answer = await this.peerConnection.createAnswer();
      await this.peerConnection.setLocalDescription(answer);
      
      // Cevabı veritabanına kaydet
      await set(ref(database, `calls/${roomId}/answer`), {
        type: answer.type,
        sdp: answer.sdp
      });
      
      // ICE adayları ve diğer güncellemeler için dinleme
      this.setupCallListeners();
      
      // Arama durumunu güncelle
      await set(ref(database, `calls/${roomId}/status`), 'active');
      
      return this.roomId;
    } catch (error) {
      console.error('Arama yanıtlama hatası:', error);
      this.endCall();
      throw error;
    }
  }
  
  // Görüntülü aramayı sonlandırma
  async endCall() {
    try {
      // Medya akışlarını kapat
      this.stopLocalStream();
      
      // Peer bağlantısını kapat
      if (this.peerConnection) {
        this.peerConnection.close();
        this.peerConnection = null;
      }
      
      // Odayı veritabanından sil (eğer varsa)
      if (this.roomId) {
        await remove(ref(database, `calls/${this.roomId}`));
        this.roomId = null;
      }
      
      this.callListenersAdded = false;
    } catch (error) {
      console.error('Arama sonlandırma hatası:', error);
    }
  }
  
  // Peer bağlantısı oluşturma
  createPeerConnection() {
    this.peerConnection = new RTCPeerConnection(configuration);
    
    // ICE aday olaylarını dinle
    this.peerConnection.onicecandidate = event => {
      if (event.candidate && this.roomId) {
        // ICE adayını veritabanına ekle
        const candidateRef = push(ref(database, `calls/${this.roomId}/candidates/${auth.currentUser.uid}`));
        set(candidateRef, {
          type: 'candidate',
          label: event.candidate.sdpMLineIndex,
          id: event.candidate.sdpMid,
          candidate: event.candidate.candidate
        });
      }
    };
    
    // Uzak akış olaylarını dinle
    this.peerConnection.ontrack = event => {
      if (event.streams && event.streams[0]) {
        this.remoteStream = event.streams[0];
        
        // Callback ile bildirim
        if (this.onRemoteStreamUpdate) {
          this.onRemoteStreamUpdate(this.remoteStream);
        }
      }
    };
    
    // Bağlantı durumu değişimi olaylarını dinle
    this.peerConnection.oniceconnectionstatechange = () => {
      console.log('ICE bağlantı durumu:', this.peerConnection.iceConnectionState);
      
      // Bağlantı kesilirse aramayı sonlandır
      if (
        this.peerConnection.iceConnectionState === 'disconnected' ||
        this.peerConnection.iceConnectionState === 'failed' ||
        this.peerConnection.iceConnectionState === 'closed'
      ) {
        this.endCall();
      }
    };
  }
  
  // Arama olaylarını dinleme
  setupCallListeners() {
    if (this.callListenersAdded || !this.roomId) return;
    
    // Cevabı dinle
    const answerRef = ref(database, `calls/${this.roomId}/answer`);
    onValue(answerRef, async snapshot => {
      const data = snapshot.val();
      if (data && !this.peerConnection.currentRemoteDescription) {
        const answer = new RTCSessionDescription(data);
        try {
          await this.peerConnection.setRemoteDescription(answer);
        } catch (error) {
          console.error('Uzak açıklama ayarlama hatası:', error);
        }
      }
    });
    
    // ICE adaylarını dinle
    const remoteId = auth.currentUser.uid === this.roomId ? 'callee' : 'caller';
    const candidatesRef = ref(database, `calls/${this.roomId}/candidates/${remoteId}`);
    
    onValue(candidatesRef, snapshot => {
      snapshot.forEach(childSnapshot => {
        const data = childSnapshot.val();
        if (data && data.type === 'candidate') {
          const candidate = new RTCIceCandidate({
            sdpMLineIndex: data.label,
            sdpMid: data.id,
            candidate: data.candidate
          });
          
          this.peerConnection.addIceCandidate(candidate);
        }
      });
    });
    
    this.callListenersAdded = true;
  }
  
  // Uzak akış güncellemelerini dinleme için geri arama fonksiyonu
  setOnRemoteStreamUpdate(callback) {
    this.onRemoteStreamUpdate = callback;
    
    // Eğer akış zaten varsa callback'i hemen çağır
    if (this.remoteStream && callback) {
      callback(this.remoteStream);
    }
  }
} 