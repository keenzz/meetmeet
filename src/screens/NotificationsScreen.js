import { StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';

const NotificationsScreen = () => {
  // Örnek bildirim verileri
  const [notifications, setNotifications] = useState([
    {
      id: '1',
      type: 'system',
      title: 'Hoş Geldiniz!',
      message: 'MeetMeet uygulamasına hoş geldiniz. Yeni insanlarla tanışmaya hemen başlayabilirsiniz.',
      date: '12 May 2023',
      read: true,
    },
    {
      id: '2',
      type: 'feature',
      title: 'Yeni Özellik: Tema Renkleri',
      message: 'Artık tema renklerini değiştirebilirsiniz. Ayarlar > Görünüm sayfasını ziyaret edin.',
      date: '5 May 2023',
      read: false,
    },
    {
      id: '3',
      type: 'maintenance',
      title: 'Planlı Bakım',
      message: 'Yarın 03:00-05:00 saatleri arasında sunucularımız bakımda olacak ve uygulama geçici olarak çalışmayabilir.',
      date: '28 Nis 2023',
      read: false,
    },
    {
      id: '4',
      type: 'system',
      title: 'Güvenlik Güncellemesi',
      message: 'Hesabınızın güvenliği için şifrenizi düzenli olarak değiştirmenizi öneririz.',
      date: '15 Nis 2023',
      read: true,
    },
    {
      id: '5',
      type: 'feature',
      title: 'Yeni Eşleşme Algoritması',
      message: 'Eşleşme algoritmamızı güncelledik. Artık daha iyi eşleşmeler bulabileceksiniz!',
      date: '10 Nis 2023',
      read: true,
    },
  ]);

  // Bildirimi okundu olarak işaretleme
  const markAsRead = (id) => {
    const updatedNotifications = notifications.map(notification =>
      notification.id === id ? { ...notification, read: true } : notification
    );
    setNotifications(updatedNotifications);
  };

  // Tüm bildirimleri okundu olarak işaretleme
  const markAllAsRead = () => {
    const updatedNotifications = notifications.map(notification => ({
      ...notification,
      read: true
    }));
    setNotifications(updatedNotifications);
  };

  // Bildirimleri temizleme
  const clearNotifications = () => {
    setNotifications([]);
  };

  // Bildirim tipine göre ikon döndürme
  const getNotificationIcon = (type) => {
    switch (type) {
      case 'system':
        return '🔔';
      case 'feature':
        return '✨';
      case 'maintenance':
        return '🔧';
      default:
        return '📌';
    }
  };

  const renderNotificationItem = ({ item }) => (
    <TouchableOpacity 
      style={[styles.notificationItem, !item.read && styles.unreadNotification]}
      onPress={() => markAsRead(item.id)}
    >
      <View style={styles.notificationIcon}>
        <Text style={styles.iconText}>{getNotificationIcon(item.type)}</Text>
      </View>
      <View style={styles.notificationContent}>
        <Text style={styles.notificationTitle}>{item.title}</Text>
        <Text style={styles.notificationMessage}>{item.message}</Text>
        <Text style={styles.notificationDate}>{item.date}</Text>
      </View>
      {!item.read && <View style={styles.unreadDot} />}
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Bildirimler</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity onPress={markAllAsRead}>
            <Text style={styles.headerButtonText}>Tümünü Okundu İşaretle</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={clearNotifications}>
            <Text style={styles.headerButtonText}>Temizle</Text>
          </TouchableOpacity>
        </View>
      </View>

      {notifications.length > 0 ? (
        <FlatList
          data={notifications}
          renderItem={renderNotificationItem}
          keyExtractor={item => item.id}
          style={styles.notificationsList}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Hiç bildiriminiz yok</Text>
        </View>
      )}
    </View>
  );
};

export default NotificationsScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  headerButtonText: {
    color: '#3498db',
    fontSize: 14,
  },
  notificationsList: {
    flex: 1,
  },
  notificationItem: {
    flexDirection: 'row',
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
    backgroundColor: '#fff',
  },
  unreadNotification: {
    backgroundColor: '#f0f8ff',
  },
  notificationIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#e1f5fe',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  iconText: {
    fontSize: 18,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  notificationDate: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#3498db',
    alignSelf: 'center',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: '#999',
  },
}); 