# Omegle Benzeri Mobil Uygulama Ekranları

## 1. Karşılama/Açılış Ekranı
- **İşlev**: Uygulama açıldığında gösterilen ilk ekran
- **Özellikler**:
  - Uygulama logosu
  - Kısa açıklama/slogan
  - Giriş yap/Kayıt ol butonları
  - Misafir olarak devam et seçeneği

## 2. Giriş Ekranı
- **İşlev**: Kullanıcı girişi yapma ekranı
- **Özellikler**:
  - E-posta ve şifre ile giriş
  - Sosyal medya hesaplarıyla giriş (Google, Facebook)
  - Şifremi unuttum
  - Kayıt olma sayfasına yönlendirme

## 3. Kayıt Ekranı
- **İşlev**: Yeni kullanıcı kaydı
- **Özellikler**:
  - E-posta ve şifre ile kayıt
  - İsim (veya nickname) belirleme
  - Yaş doğrulama (18 yaş kontrolü)
  - Kullanım şartları ve gizlilik politikası onayı

## 4. Ana Menü Ekranı
- **İşlev**: Uygulamanın ana sayfası, diğer bölümlere erişim
- **Özellikler**:
  - Sohbet başlat düğmesi
  - Profil bölümüne erişim
  - Ayarlar menüsü
  - Aktif kullanıcı sayısı göstergesi

## 5. Eşleşme Tercihleri Ekranı
- **İşlev**: Sohbet eşleşmesi öncesi filtreleme
- **Özellikler**:
  - İlgi alanları seçme
  - Dil seçenekleri
  - Konum/ülke filtreleme (opsiyonel)
  - Eşleşme türü (yazılı sohbet/görüntülü sohbet)

## 6. Eşleşme Bekleme Ekranı
- **İşlev**: Kullanıcıya eşleşme beklerken gösterilen ekran
- **Özellikler**:
  - Yükleniyor animasyonu
  - İptal et butonu
  - Bekleme süresi göstergesi
  - Kaç kullanıcının çevrimiçi olduğu bilgisi

## 7. Yazılı Sohbet Ekranı
- **İşlev**: Eşleşilen kullanıcı ile metin tabanlı sohbet
- **Özellikler**:
  - Mesaj gönderme/alma alanı
  - Emoji desteği
  - Kullanıcıyı raporlama seçeneği
  - Sohbeti sonlandırma butonu
  - Yeni eşleşme bulma seçeneği
  - Kullanıcıyı engelleme seçeneği

## 8. Görüntülü Sohbet Ekranı
- **İşlev**: Eşleşilen kullanıcı ile görüntülü konuşma
- **Özellikler**:
  - Kamera görüntüsü (kendisi ve karşı taraf)
  - Mikrofon aç/kapat
  - Kamera aç/kapat
  - Görüşmeyi sonlandırma
  - Yazılı mesaj gönderme seçeneği
  - Kullanıcıyı raporlama

## 9. Profil Ekranı
- **İşlev**: Kullanıcının kendi profil bilgilerini yönetme
- **Özellikler**:
  - Profil fotoğrafı (opsiyonel)
  - Kullanıcı adı/nickname
  - İlgi alanları
  - Hesap bilgileri
  - Dil tercihleri

## 10. Ayarlar Ekranı
- **İşlev**: Uygulama ayarlarını yapılandırma
- **Özellikler**:
  - Bildirim ayarları
  - Gizlilik tercihleri
  - Tema seçenekleri (koyu/açık mod)
  - Hesap silme seçeneği
  - Şifre değiştirme
  - Yardım/Destek

## 11. Bildirimler Ekranı
- **İşlev**: Kullanıcıya gelen bildirimleri gösterme
- **Özellikler**:
  - Sistem bildirimleri
  - Yeni özellik duyuruları
  - Bakım bildirimleri

## 12. Kullanıcı Raporlama Ekranı
- **İşlev**: Uygunsuz kullanıcıları bildirme
- **Özellikler**:
  - Rapor nedeni seçme
  - Detay ekleme alanı
  - Ekran görüntüsü/kanıt ekleme
  - Gönder butonu

## 13. Hakkında/Yardım Ekranı
- **İşlev**: Uygulama bilgileri ve yardım içeriği
- **Özellikler**:
  - SSS (Sık Sorulan Sorular)
  - İletişim bilgileri
  - Kullanım koşulları
  - Gizlilik politikası
  - Uygulama versiyonu

## Ekran Akış Diyagramı

```
Karşılama → Giriş/Kayıt → Ana Menü
                                ↓
Profil ← Ana Menü → Eşleşme Tercihleri → Eşleşme Bekleme → Yazılı/Görüntülü Sohbet
   ↓                                                               ↓
Ayarlar                                                    Kullanıcı Raporlama
   ↓
Bildirimler/Hakkında
```

## Teknoloji Yığını

- **Frontend**: React Native Expo
- **Backend**: Firebase
  - Authentication: Kullanıcı yönetimi
  - Firestore: Kullanıcı verileri ve ayarlar
  - Realtime Database: Anlık mesajlaşma
  - Cloud Functions: Eşleştirme algoritması
  - Storage: Medya dosyaları
- **Görüntülü Sohbet**: WebRTC veya Agora.io
- **Bildirimler**: Firebase Cloud Messaging 