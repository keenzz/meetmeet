import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import { SafeAreaView, StyleSheet, StatusBar, LogBox } from 'react-native';
import AppNavigator from './src/navigation/AppNavigator';

// Firebase yapılandırmasını import et
import './src/utils/firebaseConfig';

// Bazı uyarıları görmezden gel
LogBox.ignoreLogs([
  'ReactNativeFiberHostComponent: Calling getNode() on the ref of an Animated component',
  'Failed to register screen capture listener',
  'Non-serializable values were found in the navigation state'
]);

export default function App() {
  useEffect(() => {
    // Uygulamayı çalışır duruma getirmek için yazılmıştır
    // Bazı uyarıları görmezden gelmek için eklenmiştir
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <AppNavigator />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
