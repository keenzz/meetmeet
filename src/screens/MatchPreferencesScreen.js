import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch } from 'react-native';
import React, { useState } from 'react';

const INTERESTS = [
  'Müzik', 'Film', 'Kitaplar', 'Spor', 'Teknoloji', 
  'Seyahat', 'Yemek', 'Sanat', 'Oyunlar', 'Dans',
  'Doğa', 'Bilim', 'Moda', 'Komedi', 'Evcil Hayvanlar'
];

const LANGUAGES = ['Türkçe', 'İngilizce', 'Almanca', 'Fransızca', 'İspanyolca', 'Rusça'];

const MatchPreferencesScreen = ({ navigation }) => {
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [selectedLanguage, setSelectedLanguage] = useState('Türkçe');
  const [locationFilter, setLocationFilter] = useState(false);
  const [videoChat, setVideoChat] = useState(false);

  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter(item => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };

  const startMatching = () => {
    navigation.navigate('MatchWaiting', {
      interests: selectedInterests,
      language: selectedLanguage,
      locationFilter,
      videoChat
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Eşleşme Tercihleri</Text>
      
      <ScrollView style={styles.scrollView}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>İlgi Alanları</Text>
          <Text style={styles.sectionSubtitle}>Ortak ilgi alanlarına sahip kişilerle eşleşmek için seçim yapın</Text>
          
          <View style={styles.interestsContainer}>
            {INTERESTS.map((interest) => (
              <TouchableOpacity
                key={interest}
                style={[
                  styles.interestItem,
                  selectedInterests.includes(interest) && styles.selectedInterest
                ]}
                onPress={() => toggleInterest(interest)}
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
          <Text style={styles.sectionTitle}>Dil</Text>
          <Text style={styles.sectionSubtitle}>Hangi dilde sohbet etmek istiyorsunuz?</Text>
          
          <View style={styles.languageContainer}>
            {LANGUAGES.map((language) => (
              <TouchableOpacity
                key={language}
                style={[
                  styles.languageItem,
                  selectedLanguage === language && styles.selectedLanguage
                ]}
                onPress={() => setSelectedLanguage(language)}
              >
                <Text 
                  style={[
                    styles.languageText,
                    selectedLanguage === language && styles.selectedLanguageText
                  ]}
                >
                  {language}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
        
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Diğer Filtreler</Text>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Konum filtrelemesi (yakın kullanıcılar)</Text>
            <Switch
              value={locationFilter}
              onValueChange={setLocationFilter}
              trackColor={{ false: '#767577', true: '#3498db' }}
              thumbColor={locationFilter ? '#fff' : '#f4f3f4'}
            />
          </View>
          
          <View style={styles.switchContainer}>
            <Text style={styles.switchLabel}>Görüntülü sohbet</Text>
            <Switch
              value={videoChat}
              onValueChange={setVideoChat}
              trackColor={{ false: '#767577', true: '#3498db' }}
              thumbColor={videoChat ? '#fff' : '#f4f3f4'}
            />
          </View>
        </View>
      </ScrollView>
      
      <View style={styles.bottomContainer}>
        <TouchableOpacity
          style={styles.startButton}
          onPress={startMatching}
        >
          <Text style={styles.startButtonText}>Eşleşme Bul</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default MatchPreferencesScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    margin: 20,
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#3498db',
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 15,
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
  languageContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  languageItem: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 20,
    margin: 5,
  },
  selectedLanguage: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  languageText: {
    color: '#666',
  },
  selectedLanguageText: {
    color: '#fff',
  },
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  switchLabel: {
    fontSize: 16,
    color: '#333',
  },
  bottomContainer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },
  startButton: {
    backgroundColor: '#3498db',
    borderRadius: 10,
    paddingVertical: 15,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
}); 