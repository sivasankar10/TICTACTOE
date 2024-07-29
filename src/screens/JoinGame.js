import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import BackgroundWrapper from './BackgroundWrapper'; // Ensure this path is correct

const JoinGame = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState('');

  const joinGame = async () => {
    try {
      const response = await axios.post('http://3.139.54.170:8000/join_game', {
        username: username,
        game_id: gameId,
      });

      if (response.status === 200) {
        navigation.navigate('GamePage', { username, gameId });
      } else {
        Alert.alert('Error', 'Could not join game. Please check the Game ID and try again.');
      }
    } catch (error) {
      Alert.alert('Error', 'Could not join game. Please check the Game ID and try again.');
      console.error(error);
    }
  };

  return (
    <BackgroundWrapper>
      <View style={styles.container}>
        <Text style={styles.title}>Join an Existing Game</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your username"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter Game ID"
          value={gameId}
          onChangeText={setGameId}
        />
        <TouchableOpacity style={styles.button} onPress={joinGame}>
          <Text style={styles.buttonText}>Start Game</Text>
        </TouchableOpacity>
      </View>
    </BackgroundWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    width: '100%',
    height: '100%',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    color: '#fff', // Ensure text is readable against the background
  },
  input: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 12,
    paddingHorizontal: 8,
    backgroundColor: '#fff',
  },
  button: {
    backgroundColor: '#007bff',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default JoinGame;
