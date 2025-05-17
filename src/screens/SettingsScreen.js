import { StyleSheet, Text, View, TouchableOpacity, Switch, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

const SettingsScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState(true);
  const [darkMode, setDarkMode] = useState(false);
  const [locationSharing, setLocationSharing] = useState(false);
  const [privateProfile, setPrivateProfile] = useState(false);

  const toggleNotifications = () => setNotifications(prev => !prev);
  const toggleDarkMode = () => setDarkMode(prev => !prev);
  const toggleLocationSharing = () => setLocationSharing(prev => !prev);
  const togglePrivateProfile = () => setPrivateProfile(prev => !prev);
  
  const deleteAccount = () => {
    Alert.alert(
      'Hesabı Sil',
      'Hesabınızı silmek istediğinize emin misiniz? Bu işlem geri alınamaz.',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Sil', 
          style: 'destructive',
          onPress: () => {
            // Firebase'de hesap silme işlemi yapılacak
            Alert.alert('Hesap Silindi', 'Hesabınız başarıyla silindi.');
            navigation.navigate('Welcome');
          }
        }
      ]
    );
  };
  
  const changePassword = () => {
    // Şifre değiştirme işlemi için yeni bir ekrana yönlendirme yapılabilir
    Alert.alert('Şifre Değiştirme', 'Bu özellik şu anda geliştirme aşamasındadır.');
  };
  
  const logout = () => {
    Alert.alert(
      'Çıkış Yap',
      'Hesabınızdan çıkış yapmak istediğinize emin misiniz?',
      [
        { text: 'İptal', style: 'cancel' },
        { 
          text: 'Çıkış Yap', 
          onPress: () => {
            // Firebase çıkış işlemi yapılacak
            navigation.navigate('Welcome');
          }
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bildirim Ayarları</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Bildirimleri Etkinleştir</Text>
          <Switch
            value={notifications}
            onValueChange={toggleNotifications}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={notifications ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Görünüm Ayarları</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Koyu Mod</Text>
          <Switch
            value={darkMode}
            onValueChange={toggleDarkMode}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={darkMode ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Gizlilik Ayarları</Text>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Konum Paylaşımı</Text>
          <Switch
            value={locationSharing}
            onValueChange={toggleLocationSharing}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={locationSharing ? '#fff' : '#f4f3f4'}
          />
        </View>
        
        <View style={styles.settingItem}>
          <Text style={styles.settingLabel}>Özel Profil</Text>
          <Switch
            value={privateProfile}
            onValueChange={togglePrivateProfile}
            trackColor={{ false: '#767577', true: '#3498db' }}
            thumbColor={privateProfile ? '#fff' : '#f4f3f4'}
          />
        </View>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hesap Ayarları</Text>
        
        <TouchableOpacity style={styles.button} onPress={changePassword}>
          <Text style={styles.buttonText}>Şifre Değiştir</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Profile')}>
          <Text style={styles.buttonText}>Profili Düzenle</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hakkında ve Destek</Text>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Help')}>
          <Text style={styles.buttonText}>Yardım & Destek</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('About')}>
          <Text style={styles.buttonText}>Hakkında</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.actionButtons}>
        <TouchableOpacity style={styles.logoutButton} onPress={logout}>
          <Text style={styles.logoutText}>Çıkış Yap</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.deleteButton} onPress={deleteAccount}>
          <Text style={styles.deleteText}>Hesabı Sil</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.versionContainer}>
        <Text style={styles.versionText}>Uygulama Sürümü: 1.0.0</Text>
      </View>
    </ScrollView>
  );
};

export default SettingsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#3498db',
    marginBottom: 15,
  },
  settingItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  button: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  buttonText: {
    fontSize: 16,
    color: '#333',
  },
  actionButtons: {
    padding: 20,
  },
  logoutButton: {
    backgroundColor: '#f39c12',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  logoutText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  deleteButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  deleteText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  versionContainer: {
    padding: 20,
    alignItems: 'center',
  },
  versionText: {
    color: '#999',
    fontSize: 14,
  },
}); 