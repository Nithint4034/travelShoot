// src/MainAppScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';
import { Camera } from 'react-native-camera';

const MainAppScreen = ({ navigation }) => {
  const handleLogout = () => {
    // Perform any logout logic here
    // For example, reset authentication state, navigate to the login screen, etc.
    navigation.navigate('Welcome'); // Navigating back to the welcome screen after logout
  };

  const handleOpenCamera = () => {
    // Implement logic to open the camera
    // This can involve navigating to a new screen with the camera component
    // For simplicity, we'll just log a message for now
    console.log('Opening the camera...');
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
