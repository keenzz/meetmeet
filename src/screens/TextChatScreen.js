import { StyleSheet, Text, View, TextInput, TouchableOpacity, FlatList, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';

const TextChatScreen = ({ navigation }) => {
  const [inputMessage, setInputMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [typing, setTyping] = useState(false);
  const listRef = useRef(null);
  
  // Otoresponder ile örnek kullanıcı adı
  const otherUser = {
    id: '2',
    name: 'Kullanıcı238',
  };
  
  const currentUser = {
    id: '1',
    name: 'Ben',
  };

  useEffect(() => {
    // Karşı kullanıcıdan bir karşılama mesajı ekleyelim
    setTimeout(() => {
      const welcomeMessage = {
        id: Date.now().toString(),
        text: 'Merhaba! Nasılsın?',
        sender: otherUser.id,
        timestamp: new Date(),
      };
      setMessages([welcomeMessage]);
    }, 1000);
  }, []);

  const handleSend = () => {
    if (!inputMessage.trim()) return;
    
    // Kullanıcı mesajını ekleyelim
    const newMessage = {
      id: Date.now().toString(),
      text: inputMessage,
      sender: currentUser.id,
      timestamp: new Date(),
    };
    
    const updatedMessages = [...messages, newMessage];
    setMessages(updatedMessages);
    setInputMessage('');
    
    // Basit bir otoresponder ekleyelim
    setTyping(true);
    setTimeout(() => {
      const responseMessage = {
        id: (Date.now() + 1).toString(),
        text: getRandomResponse(),
        sender: otherUser.id,
        timestamp: new Date(),
      };
      setMessages([...updatedMessages, responseMessage]);
      setTyping(false);
    }, 1500);
  };
  
  const getRandomResponse = () => {
    const responses = [
      'Evet, ben de öyle düşünüyorum.',
      'İlginç bir bakış açısı.',
      'Bu konuda ne düşünüyorsun?',
      'Sevdiğin müzik türleri neler?',
      'Daha önce hiç yurtdışına çıktın mı?',
      'Favori filmin nedir?',
      'Bu aralar ilginç bir şey okudun mu?',
      'Hangi şehirde yaşıyorsun?',
      'Bu hafta sonu ne yapacaksın?',
      'Şu an hava nasıl oralarda?'
    ];
    return responses[Math.floor(Math.random() * responses.length)];
  };
  
  const formatTime = (timestamp) => {
    return `${timestamp.getHours()}:${String(timestamp.getMinutes()).padStart(2, '0')}`;
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
            Alert.alert('Rapor Gönderildi', 'Geri bildiriminiz için teşekkürler.');
            navigation.navigate('Main');
          } 
        }
      ]
    );
  };
  
  const endChat = () => {
    Alert.alert(
      'Sohbeti Sonlandır',
      'Bu sohbeti sonlandırmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sonlandır', 
          onPress: () => navigation.navigate('Main')
        }
      ]
    );
  };
  
  const blockUser = () => {
    Alert.alert(
      'Kullanıcıyı Engelle',
      'Bu kullanıcıyı engellemek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Engelle', 
          style: 'destructive',
          onPress: () => {
            Alert.alert('Kullanıcı Engellendi', 'Bu kullanıcı artık sizinle iletişim kuramayacak.');
            navigation.navigate('Main');
          } 
        }
      ]
    );
  };
  
  const newMatch = () => {
    Alert.alert(
      'Yeni Eşleşme',
      'Başka bir kullanıcı ile eşleşmek istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Yeni Eşleşme', 
          onPress: () => navigation.navigate('MatchWaiting')
        }
      ]
    );
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <View style={styles.header}>
        <Text style={styles.headerTitle}>{otherUser.name}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={reportUser}>
            <Text style={styles.headerAction}>Raporla</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={blockUser}>
            <Text style={styles.headerAction}>Engelle</Text>
          </TouchableOpacity>
        </View>
      </View>
      
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.id}
        style={styles.messageList}
        onContentSizeChange={() => listRef.current?.scrollToEnd()}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === currentUser.id ? styles.sentMessage : styles.receivedMessage
          ]}>
            <Text style={styles.messageText}>{item.text}</Text>
            <Text style={styles.messageTime}>{formatTime(item.timestamp)}</Text>
          </View>
        )}
      />
      
      {typing && (
        <View style={styles.typingContainer}>
          <Text style={styles.typingText}>{otherUser.name} yazıyor...</Text>
        </View>
      )}
      
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Mesajınızı yazın..."
          value={inputMessage}
          onChangeText={setInputMessage}
          multiline
        />
        <TouchableOpacity 
          style={[styles.sendButton, !inputMessage.trim() && styles.sendButtonDisabled]}
          onPress={handleSend}
          disabled={!inputMessage.trim()}
        >
          <Text style={styles.sendButtonText}>Gönder</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.footer}>
        <TouchableOpacity style={styles.footerButton} onPress={endChat}>
          <Text style={styles.footerButtonText}>Sohbeti Sonlandır</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.footerButton} onPress={newMatch}>
          <Text style={styles.footerButtonText}>Yeni Eşleşme</Text>
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
};

export default TextChatScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f8f8',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#3498db',
    padding: 15,
    paddingTop: 50,
  },
  headerTitle: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  headerActions: {
    flexDirection: 'row',
  },
  headerAction: {
    color: '#fff',
    marginLeft: 15,
  },
  messageList: {
    flex: 1,
    padding: 10,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: 12,
    borderRadius: 20,
    marginBottom: 10,
  },
  sentMessage: {
    backgroundColor: '#3498db',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  receivedMessage: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    color: '#333',
    fontSize: 16,
  },
  sentMessage: {
    backgroundColor: '#3498db',
    alignSelf: 'flex-end',
    borderBottomRightRadius: 5,
  },
  receivedMessage: {
    backgroundColor: '#e5e5e5',
    alignSelf: 'flex-start',
    borderBottomLeftRadius: 5,
  },
  messageText: {
    fontSize: 16,
  },
  messageTime: {
    fontSize: 12,
    color: '#888',
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  typingContainer: {
    padding: 10,
  },
  typingText: {
    color: '#888',
    fontStyle: 'italic',
  },
  inputContainer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    alignItems: 'center',
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  input: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 10,
    maxHeight: 100,
  },
  sendButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginLeft: 10,
  },
  sendButtonDisabled: {
    backgroundColor: '#ccc',
  },
  sendButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  footer: {
    flexDirection: 'row',
    padding: 10,
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    justifyContent: 'space-between',
  },
  footerButton: {
    flex: 1,
    padding: 10,
    marginHorizontal: 5,
    backgroundColor: '#f0f0f0',
    borderRadius: 5,
    alignItems: 'center',
  },
  footerButtonText: {
    color: '#333',
    fontWeight: '500',
  },
}); 