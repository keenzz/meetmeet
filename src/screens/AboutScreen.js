import { StyleSheet, Text, View, ScrollView, Linking, TouchableOpacity } from 'react-native';
import React from 'react';
import Logo from '../assets/logo';

const AboutScreen = () => {
  const openUrl = (url) => {
    Linking.openURL(url).catch((err) => console.error('URL açılamadı:', err));
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Hakkımızda</Text>
      </View>

      <View style={styles.logoContainer}>
        <Logo size={100} color="#3498db" />
        <Text style={styles.version}>Sürüm 1.0.0</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Misyonumuz</Text>
        <Text style={styles.paragraph}>
          MeetMeet, insanların sınırları aşarak yeni arkadaşlıklar kurabilecekleri, paylaşımda
          bulunabilecekleri ve hayatlarını zenginleştirebilecekleri güvenli bir platform sunmayı
          amaçlamaktadır. Ortak ilgi alanlarına sahip insanları bir araya getirerek anlamlı 
          bağlar kurulmasına yardımcı oluyoruz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Hikayemiz</Text>
        <Text style={styles.paragraph}>
          MeetMeet, 2023 yılında bir grup tutkulu girişimci tarafından kuruldu. Amacımız, 
          insanların sosyal çevrelerini genişletebilecekleri, yeni dostluklar kurabilecekleri 
          ve farklı bakış açıları kazanabilecekleri bir platform oluşturmaktı. Bugün, giderek 
          büyüyen kullanıcı topluluğumuzla birlikte, her gün binlerce yeni bağlantının kurulmasına 
          aracılık ediyoruz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ekibimiz</Text>
        <Text style={styles.paragraph}>
          MeetMeet, deneyimli geliştiriciler, tasarımcılar, içerik üreticileri ve müşteri 
          hizmetleri uzmanlarından oluşan tutkulu bir ekip tarafından desteklenmektedir. 
          Hepimiz, kullanıcılarımızın güvenli ve keyifli bir deneyim yaşaması için çalışıyoruz.
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Sosyal Medya</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => openUrl('https://instagram.com/meetmeet')}
          >
            <Text style={styles.socialButtonText}>Instagram</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => openUrl('https://twitter.com/meetmeet')}
          >
            <Text style={styles.socialButtonText}>Twitter</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => openUrl('https://facebook.com/meetmeet')}
          >
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Yasal Bilgiler</Text>
        <TouchableOpacity 
          style={styles.legalItem}
          onPress={() => openUrl('https://meetmeet.com/terms')}
        >
          <Text style={styles.legalItemText}>Kullanım Koşulları</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.legalItem}
          onPress={() => openUrl('https://meetmeet.com/privacy')}
        >
          <Text style={styles.legalItemText}>Gizlilik Politikası</Text>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.legalItem}
          onPress={() => openUrl('https://meetmeet.com/cookies')}
        >
          <Text style={styles.legalItemText}>Çerez Politikası</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          © 2023-2024 MeetMeet. Tüm hakları saklıdır.
        </Text>
      </View>
    </ScrollView>
  );
};

export default AboutScreen;

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
  logoContainer: {
    alignItems: 'center',
    paddingVertical: 30,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  appName: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#3498db',
  },
  version: {
    fontSize: 14,
    color: '#666',
    marginTop: 5,
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
    marginBottom: 10,
  },
  paragraph: {
    fontSize: 15,
    lineHeight: 22,
    color: '#444',
  },
  socialLinks: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 10,
  },
  socialButton: {
    backgroundColor: '#3498db',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
    flex: 1,
    marginHorizontal: 5,
    alignItems: 'center',
  },
  socialButtonText: {
    color: '#fff',
    fontWeight: '500',
  },
  legalItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  legalItemText: {
    fontSize: 15,
    color: '#3498db',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontSize: 12,
    color: '#666',
  },
}); 