// src/LoginScreen.js
import React, { useState } from 'react';
import { View, Text, TextInput, Button } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Add your authentication logic here
    // For example, you might make an API call to validate the credentials

    // Assume authentication is successful for demonstration purposes
    const isAuthenticated = true;

    if (isAuthenticated) {
      // Navigate to the main app screen after successful login
      navigation.navigate('MainAppScreen');
    } else {
      // Handle unsuccessful login
      // Display an error message or take appropriate action
    }
  };

  return (
    <View>
      <Text>Login Page</Text>
      <TextInput
        placeholder="Username"
        value={username}
        onChangeText={(text) => setUsername(text)}
      />
      <TextInput
        placeholder="Password"
        value={password}
        onChangeText={(text) => setPassword(text)}
        secureTextEntry
      />
      <Button title="Login" onPress={handleLogin} />
    </View>
  );
};

export default LoginScreen;
