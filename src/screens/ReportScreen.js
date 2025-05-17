import { StyleSheet, Text, View, TextInput, TouchableOpacity, ScrollView, Alert } from 'react-native';
import React, { useState } from 'react';

const ReportScreen = ({ navigation, route }) => {
  const [selectedReason, setSelectedReason] = useState(null);
  const [details, setDetails] = useState('');
  
  const { userId, userName } = route.params || { userId: 'unknown', userName: 'Kullanıcı' };

  const reportReasons = [
    { id: 1, label: 'Uygunsuz İçerik' },
    { id: 2, label: 'Taciz / Zorbalık' },
    { id: 3, label: 'Sahte Hesap' },
    { id: 4, label: 'Nefret Söylemi / Ayrımcılık' },
    { id: 5, label: 'Dolandırıcılık / Şüpheli Davranış' },
    { id: 6, label: '18 Yaş Altı Kullanıcı' },
    { id: 7, label: 'Diğer' }
  ];

  const handleSubmit = () => {
    if (!selectedReason) {
      Alert.alert('Hata', 'Lütfen bir rapor nedeni seçin.');
      return;
    }
    
    // Firebae'e rapor gönderilecek
    console.log('Rapor gönderiliyor:', {
      userId,
      reason: reportReasons.find(reason => reason.id === selectedReason)?.label,
      details
    });
    
    Alert.alert(
      'Rapor Gönderildi',
      'Raporunuz için teşekkürler. Ekibimiz en kısa sürede inceleyecektir.',
      [
        {
          text: 'Tamam',
          onPress: () => navigation.goBack()
        }
      ]
    );
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.headerTitle}>Kullanıcıyı Rapor Et</Text>
        <Text style={styles.headerSubtitle}>Kullanıcı: {userName}</Text>
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Rapor Nedeni</Text>
        <Text style={styles.sectionSubtitle}>Bu kullanıcıyı rapor etme nedeninizi seçin:</Text>
        
        {reportReasons.map((reason) => (
          <TouchableOpacity
            key={reason.id}
            style={[
              styles.reasonItem,
              selectedReason === reason.id && styles.selectedReasonItem
            ]}
            onPress={() => setSelectedReason(reason.id)}
          >
            <View style={styles.radioContainer}>
              <View style={styles.radioOuter}>
                {selectedReason === reason.id && <View style={styles.radioInner} />}
              </View>
            </View>
            <Text style={styles.reasonLabel}>{reason.label}</Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ek Detaylar (İsteğe bağlı)</Text>
        <TextInput
          style={styles.detailsInput}
          value={details}
          onChangeText={setDetails}
          placeholder="Lütfen sorunu detaylandırın..."
          multiline
          numberOfLines={4}
          textAlignVertical="top"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.submitButton}
          onPress={handleSubmit}
        >
          <Text style={styles.submitButtonText}>Raporu Gönder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.cancelButtonText}>İptal</Text>
        </TouchableOpacity>
      </View>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Raporunuz gizli tutulacak ve ekibimiz tarafından incelenecektir. Kuralları ihlal eden kullanıcılar uygulama kullanım hakkını kaybedebilir.
        </Text>
      </View>
    </ScrollView>
  );
};

export default ReportScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#666',
  },
  section: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
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
  reasonItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedReasonItem: {
    backgroundColor: '#f8f8f8',
  },
  radioContainer: {
    marginRight: 15,
  },
  radioOuter: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioInner: {
    height: 10,
    width: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
  },
  reasonLabel: {
    fontSize: 16,
    color: '#333',
  },
  detailsInput: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 15,
    fontSize: 16,
    minHeight: 100,
  },
  buttonContainer: {
    padding: 20,
  },
  submitButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  submitButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#f0f0f0',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#666',
    fontSize: 16,
  },
  infoContainer: {
    padding: 20,
    paddingTop: 0,
  },
  infoText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    fontStyle: 'italic',
  },
}); 