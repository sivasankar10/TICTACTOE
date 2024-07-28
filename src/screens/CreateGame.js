import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Alert, ActivityIndicator, Clipboard } from 'react-native';
import axios from 'axios';

const CreateGame = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [gameId, setGameId] = useState(null);
  const [loading, setLoading] = useState(false);

  const createGame = async () => {
    setLoading(true);
    try {
      const response = await axios.post('http://3.139.54.170:8000/create_game', {
        username: username,
      });
      setGameId(response.data.game_id);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      Alert.alert('Error', 'Could not create game. Please try again.');
      console.error(error);
    }
  };

  const copyGameIdToClipboard = () => {
    Clipboard.setString(gameId);
    Alert.alert('Copied to Clipboard', 'The Game ID has been copied to your clipboard.');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create a New Game</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your username"
        value={username}
        onChangeText={setUsername}
      />
      <TouchableOpacity style={styles.button} onPress={createGame}>
        <Text style={styles.buttonText}>Create Game</Text>
      </TouchableOpacity>
      {loading && <ActivityIndicator size="large" color="#007bff" />}
      {gameId && (
        <View style={styles.gameIdContainer}>
          <Text style={styles.gameIdText}>Game ID: {gameId}</Text>
          <TouchableOpacity onPress={copyGameIdToClipboard}>
            <Text style={styles.copyText}>Copy Game ID</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.startButton}
            onPress={() => navigation.navigate('GamePage', { gameId, username })}
          >
            <Text style={styles.startButtonText}>Start Game</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#f0f0f0',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
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
  gameIdContainer: {
    marginTop: 20,
    alignItems: 'center',
  },
  gameIdText: {
    fontSize: 18,
    color: '#333',
  },
  copyText: {
    color: '#007bff',
    fontSize: 16,
    marginTop: 10,
  },
  startButton: {
    backgroundColor: '#28a745',
    padding: 10,
    borderRadius: 8,
    alignItems: 'center',
    width: '80%',
    marginTop: 20,
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default CreateGame;
