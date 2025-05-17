import { StyleSheet, Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const HelpScreen = () => {
  const [expandedFaq, setExpandedFaq] = useState(null);

  const faqData = [
    {
      id: '1',
      question: 'MeetMeet nasıl çalışır?',
      answer: 'MeetMeet, ortak ilgi alanlarına sahip insanları rastgele eşleştiren bir platformdur. Eşleşme tercihlerinizi seçin, bekleyin ve size uygun bir kullanıcı ile eşleşin! Yazılı veya görüntülü sohbet edebilirsiniz.'
    },
    {
      id: '2',
      question: 'Hesabımı nasıl silebilirim?',
      answer: 'Hesabınızı silmek için Ayarlar > Hesap Ayarları sayfasına gidin ve "Hesabı Sil" butonuna tıklayın. Bu işlem geri alınamaz ve tüm verileriniz kalıcı olarak silinir.'
    },
    {
      id: '3',
      question: 'Uygunsuz bir kullanıcıyı nasıl raporlayabilirim?',
      answer: 'Sohbet ekranındaki "Raporla" butonuna tıklayarak veya kullanıcının profilinde bulunan raporlama seçeneğini kullanarak bir kullanıcıyı bildirebilirsiniz. Raporlar ekibimiz tarafından incelenir ve gerekli önlemler alınır.'
    },
    {
      id: '4',
      question: 'MeetMeet\'te güvenlik nasıl sağlanıyor?',
      answer: 'Güvenliğinizi sağlamak için tüm kullanıcıların 18 yaş üzeri olması gerekiyor. İçerik filtreleme sistemimiz uygunsuz içerikleri tespit eder. Ayrıca, kullanıcıları engelleme ve raporlama özellikleri de bulunmaktadır.'
    },
    {
      id: '5',
      question: 'Profilimi kimler görebilir?',
      answer: 'Profiliniz sadece sizinle eşleşen kullanıcılar tarafından görülebilir. Ayarlar > Gizlilik Ayarları bölümünden profilinizin görünürlüğünü kontrol edebilirsiniz.'
    },
    {
      id: '6',
      question: 'Şifremi unuttum, ne yapmalıyım?',
      answer: 'Giriş ekranındaki "Şifremi Unuttum" seçeneğine tıklayarak e-posta adresinize şifre sıfırlama bağlantısı gönderebilirsiniz.'
    },
    {
      id: '7',
      question: 'Görüntülü görüşmeler için kamera izni nasıl verilir?',
      answer: 'İlk kez görüntülü görüşme başlattığınızda, uygulamanın kamera erişimi için izin istemesi gerekir. İzin vermediyseniz, telefonunuzun ayarlarından uygulama izinlerini güncellemeniz gerekecektir.'
    }
  ];

  const toggleFaq = (id) => {
    if (expandedFaq === id) {
      setExpandedFaq(null);
    } else {
      setExpandedFaq(id);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Yardım & Destek</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sık Sorulan Sorular</Text>
        
        {faqData.map((faq) => (
          <TouchableOpacity 
            key={faq.id} 
            style={styles.faqItem}
            onPress={() => toggleFaq(faq.id)}
          >
            <View style={styles.faqHeader}>
              <Text style={styles.faqQuestion}>{faq.question}</Text>
              <Text style={styles.expandIcon}>{expandedFaq === faq.id ? '−' : '+'}</Text>
            </View>
            
            {expandedFaq === faq.id && (
              <Text style={styles.faqAnswer}>{faq.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>İletişim</Text>
        
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>E-posta:</Text>
          <Text style={styles.contactValue}>destek@meetmeet.com</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Telefon:</Text>
          <Text style={styles.contactValue}>+90 XXX XXX XX XX</Text>
        </View>
        
        <View style={styles.contactItem}>
          <Text style={styles.contactLabel}>Adres:</Text>
          <Text style={styles.contactValue}>MeetMeet Teknoloji A.Ş., İstanbul, Türkiye</Text>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Bize Ulaşın</Text>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Mesaj Gönder</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.contactButton}>
          <Text style={styles.contactButtonText}>Sorun Bildir</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          İhtiyacınız olan cevabı bulamadınız mı? Lütfen bizimle iletişime geçin.
        </Text>
      </View>
    </ScrollView>
  );
};

export default HelpScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
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
  faqItem: {
    marginBottom: 15,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
    padding: 15,
  },
  faqHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '500',
    flex: 1,
  },
  expandIcon: {
    fontSize: 20,
    color: '#3498db',
    fontWeight: 'bold',
  },
  faqAnswer: {
    marginTop: 10,
    color: '#666',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  contactLabel: {
    width: 80,
    fontWeight: '500',
  },
  contactValue: {
    flex: 1,
    color: '#666',
  },
  contactButton: {
    backgroundColor: '#3498db',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 10,
  },
  contactButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    textAlign: 'center',
    color: '#666',
    lineHeight: 20,
  },
}); 