// BackgroundWrapper.js
import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

const BackgroundWrapper = ({ children }) => {
  return (
    <ImageBackground
      source={require('../assets/background.png')} 
      style={styles.background}
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    resizeMode: 'cover',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default BackgroundWrapper;
