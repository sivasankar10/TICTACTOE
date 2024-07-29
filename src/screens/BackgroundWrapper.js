// src/components/BackgroundWrapper.js
import React from 'react';
import { View, ImageBackground, StyleSheet } from 'react-native';

const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')} // Make sure this path is correct
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover', // This makes sure the image covers the entire screen
  },
});

export default BackgroundWrapper;
