import { StyleSheet, Text, View, TouchableOpacity, ScrollView, TextInput, Switch } from 'react-native';
import React, { useState } from 'react';
import Avatar from '../assets/avatar';

const ProfileScreen = () => {
  const [username, setUsername] = useState('Kullanıcı123');
  const [isEditing, setIsEditing] = useState(false);
  const [selectedInterests, setSelectedInterests] = useState(['Müzik', 'Film', 'Teknoloji']);
  
  const INTERESTS = [
    'Müzik', 'Film', 'Kitaplar', 'Spor', 'Teknoloji', 
    'Seyahat', 'Yemek', 'Sanat', 'Oyunlar', 'Dans',
    'Doğa', 'Bilim', 'Moda', 'Komedi', 'Evcil Hayvanlar'
  ];
  
  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  const saveProfile = () => {
    // İlerde Firebase ile profil güncellemesi yapılacak
    setIsEditing(false);
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.profileHeader}>
        <Avatar username={username} size={120} />
        
        {isEditing ? (
          <TextInput 
            style={styles.usernameInput} 
            value={username} 
            onChangeText={setUsername} 
            placeholder="Kullanıcı adı"
          />
        ) : (
          <Text style={styles.username}>{username}</Text>
        )}
      </View>
      
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>İlgi Alanları</Text>
          {isEditing && (
            <Text style={styles.editHint}>Değiştirmek için dokun</Text>
          )}
        </View>
        
        <View style={styles.interestsContainer}>
          {INTERESTS.map((interest) => (
            <TouchableOpacity
              key={interest}
              style={[
                styles.interestItem,
                selectedInterests.includes(interest) && styles.selectedInterest,
                !isEditing && !selectedInterests.includes(interest) && styles.hiddenInterest
              ]}
              onPress={() => isEditing && toggleInterest(interest)}
              disabled={!isEditing}
            >
              <Text 
                style={[
                  styles.interestText,
                  selectedInterests.includes(interest) && styles.selectedInterestText
                ]}
              >
                {interest}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap Bilgileri</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>E-posta</Text>
          <Text style={styles.infoValue}>kullanici@example.com</Text>
        </View>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Katılma Tarihi</Text>
          <Text style={styles.infoValue}>01.01.2023</Text>
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Dil Tercihleri</Text>
        
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>Tercih Edilen Dil</Text>
          <Text style={styles.infoValue}>Türkçe</Text>
        </View>
      </View>
      
      <View style={styles.buttonsContainer}>
        {isEditing ? (
          <>
            <TouchableOpacity style={styles.saveButton} onPress={saveProfile}>
              <Text style={styles.saveButtonText}>Değişiklikleri Kaydet</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={styles.cancelButton} 
              onPress={() => setIsEditing(false)}
            >
              <Text style={styles.cancelButtonText}>İptal</Text>
            </TouchableOpacity>
          </>
        ) : (
          <TouchableOpacity 
            style={styles.editButton} 
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Profili Düzenle</Text>
          </TouchableOpacity>
        )}
      </View>
    </ScrollView>
  );
};

export default ProfileScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  profileHeader: {
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  username: {
    fontSize: 22,
    fontWeight: 'bold',
    marginTop: 15,
  },
  usernameInput: {
    fontSize: 20,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 8,
    width: '80%',
    textAlign: 'center',
    marginTop: 15,
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
  },
  editHint: {
    fontSize: 12,
    color: '#888',
    fontStyle: 'italic',
  },
  interestsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  interestItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 15,
    margin: 5,
  },
  hiddenInterest: {
    display: 'none',
  },
  selectedInterest: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  interestText: {
    color: '#666',
  },
  selectedInterestText: {
    color: '#fff',
  },
  infoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  infoLabel: {
    color: '#666',
  },
  infoValue: {
    fontWeight: '500',
  },
  buttonsContainer: {
    padding: 20,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  editButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  saveButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
}); 