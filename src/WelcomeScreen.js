// src/WelcomeScreen.js
import React from 'react';
import { View, Text, Button } from 'react-native';

const WelcomeScreen = ({ navigation }) => {
  const goToLogin = () => {
    navigation.navigate('Login');
  };

  const goToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Welcome to Your App!</Text>
      <Button title="Login" onPress={goToLogin} />
      <Button title="Register" onPress={goToRegister} />
    </View>
  );
};

export default WelcomeScreen;

