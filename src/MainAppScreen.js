// src/MainAppScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const MainAppScreen = () => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Perform any logout logic here
    // For example, reset authentication state, navigate to the login screen, etc.
    navigation.navigate('Welcome'); // Navigating back to the welcome screen after logout
  };

  const handleOpenCamera = () => {
    navigation.navigate('CameraScreen');
  };

  return (
    <View>
      <Text>Main App Screen</Text>
      {/* Add your main app content here */}

      {/* Example Logout Button */}
      <Button title="Logout" onPress={handleLogout} />

      {/* Example Button to Open Camera */}
      <Button title="Open Camera" onPress={handleOpenCamera} />
    </View>
  );
};

export default MainAppScreen;
