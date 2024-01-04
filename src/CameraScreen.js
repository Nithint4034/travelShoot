import React, { useState, useRef } from 'react';
import { Camera } from 'expo-camera';
import * as Location from 'expo-location';
import * as FileSystem from 'expo-file-system';
import { Button, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function CameraScreen() {
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = useRef(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>We need your permission to show the camera</Text>
        <Button onPress={requestPermission} title="Grant Permission" />
      </View>
    );
  }

  async function takePicture() {
    if (cameraRef.current) {
      // Get the current position
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Location permission not granted!');
        return;
      }

      try {
        const location = await Location.getCurrentPositionAsync({});
        const latitude = location.coords.latitude;
        const longitude = location.coords.longitude;

        // Take the picture and obtain the URI
        const photo = await cameraRef.current.takePictureAsync();
        console.log('Latitude:', latitude);
        console.log('Longitude:', longitude);
        console.log('Picture URI:', photo.uri);

        // Convert the picture URI to base64
        const base64Image = await convertUriToBase64(photo.uri);
        console.log('Base64 Image:', base64Image);

        // Send data to the API
        await sendToAPI(latitude, longitude, base64Image);
      } catch (error) {
        console.error('Error taking picture:', error);
      }
    }
  }

  async function convertUriToBase64(uri) {
    try {
      const fileUri = FileSystem.cacheDirectory + 'temp.jpg';
      await FileSystem.moveAsync({
        from: uri,
        to: fileUri,
      });
      const base64 = await FileSystem.readAsStringAsync(fileUri, {
        encoding: FileSystem.EncodingType.Base64,
      });
      await FileSystem.deleteAsync(fileUri);
      return base64;
    } catch (error) {
      console.error('Error converting URI to base64:', error);
      throw error;
    }
  }

  async function sendToAPI(latitude, longitude, base64Image) {
    try {
      const apiUrl = 'https://dtravelshoot.deducetech.com/add_location';
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude,
          longitude,
          image: base64Image, // Make sure the API expects the image field
        }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('API Response:', data);
      } else {
        console.error('API Request failed:', response.status);
      }
    } catch (error) {
      console.error('Error sending data to API:', error);
    }
  }

  return (
    <View style={styles.container}>
      <Camera style={styles.camera} type={Camera.Constants.Type.back} ref={cameraRef}>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.text}>Take Picture</Text>
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    margin: 20,
  },
  button: {
    alignSelf: 'flex-end',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'white',
  },
});
