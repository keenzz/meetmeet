import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Ekranları içe aktarma
import WelcomeScreen from '../screens/WelcomeScreen';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import MainScreen from '../screens/MainScreen';
import MatchPreferencesScreen from '../screens/MatchPreferencesScreen';
import MatchWaitingScreen from '../screens/MatchWaitingScreen';
import TextChatScreen from '../screens/TextChatScreen';
import ProfileScreen from '../screens/ProfileScreen';
import SettingsScreen from '../screens/SettingsScreen';
import VideoChat from '../screens/VideoChatScreen';
import ReportScreen from '../screens/ReportScreen';
import NotificationsScreen from '../screens/NotificationsScreen';
import HelpScreen from '../screens/HelpScreen';
import AboutScreen from '../screens/AboutScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Welcome">
        {/* Giriş Akışı */}
        <Stack.Screen 
          name="Welcome" 
          component={WelcomeScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Login" 
          component={LoginScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="Register" 
          component={RegisterScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="ForgotPassword" 
          component={ForgotPasswordScreen} 
          options={{ headerShown: false }}
        />
        
        {/* Ana Uygulama Akışı */}
        <Stack.Screen 
          name="Main" 
          component={MainScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="MatchPreferences" 
          component={MatchPreferencesScreen} 
          options={{ 
            title: 'Eşleşme Tercihleri',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="MatchWaiting" 
          component={MatchWaitingScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="TextChat" 
          component={TextChatScreen} 
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="VideoChat" 
          component={VideoChat} 
          options={{ headerShown: false }}
        />
        
        {/* Profil ve Ayarlar */}
        <Stack.Screen 
          name="Profile" 
          component={ProfileScreen} 
          options={{ 
            title: 'Profil',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Settings" 
          component={SettingsScreen} 
          options={{ 
            title: 'Ayarlar',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff', 
          }}
        />
        
        {/* Yeni Eklenen Ekranlar */}
        <Stack.Screen 
          name="Notifications" 
          component={NotificationsScreen} 
          options={{ 
            title: 'Bildirimler',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="Help" 
          component={HelpScreen} 
          options={{ 
            title: 'Yardım',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
        <Stack.Screen 
          name="About" 
          component={AboutScreen} 
          options={{ 
            title: 'Hakkında',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
        
        {/* Ek Ekranlar */}
        <Stack.Screen 
          name="Report" 
          component={ReportScreen} 
          options={{ 
            title: 'Kullanıcıyı Raporla',
            headerStyle: {
              backgroundColor: '#3498db',
            },
            headerTintColor: '#fff',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 