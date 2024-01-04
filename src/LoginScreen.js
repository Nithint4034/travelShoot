import React, { useState } from 'react';
import { View, Text, TextInput, Button, Alert } from 'react-native';

const LoginScreen = ({ navigation }) => {
  const [email, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      // Make an API call to the login endpoint
      const response = await fetch('https://dtravelshoot.deducetech.com/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      // Check if the response is successful (status code 2xx)
      if (response.status===200) {
        // Assuming the API returns a JSON object with a success property
        const data = await response.json();
        console.log('jhv',data);

        if (data) {
          // Authentication successful
          navigation.navigate('MainAppScreen');
        } else {
          // Authentication failed
          Alert.alert('Login Failed', 'Invalid username or password');
        }
      } else {
        // Handle non-successful response (status code other than 2xx)
        Alert.alert('Error', 'Failed to login. Please try again later.');
      }
    } catch (error) {
      // Handle network errors or other exceptions
      console.error('Login Error:', error);
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    }
  };

  return (
    <View>
      <Text>Login Page</Text>
      <TextInput
        placeholder="email"
        value={email}
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
