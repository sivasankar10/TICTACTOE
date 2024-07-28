import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import axios from 'axios';

const GamePage = ({ route }) => {
  const { gameId, username } = route.params;
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [playerRole, setPlayerRole] = useState('');
  const [winner, setWinner] = useState(null);

  useEffect(() => {
    assignPlayerRole();
    const interval = setInterval(() => {
      getGameState();
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const assignPlayerRole = async () => {
    try {
      const response = await axios.post('http://3.139.54.170:8000/get_game_state', {
        game_id: gameId,
      });

      const { player1, player2 } = response.data;

      if (player1 === username) {
        setPlayerRole('X');
      } else if (player2 === username) {
        setPlayerRole('O');
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not assign player role.');
    }
  };

  const getGameState = async () => {
    try {
      const response = await axios.post('http://3.139.54.170:8000/get_game_state', {
        game_id: gameId,
      });

      const { board, current_player, winner } = response.data;
      setBoard(board.split(''));
      setCurrentPlayer(current_player);
      setWinner(winner);
    } catch (error) {
      console.error(error);
    }
  };

  const makeMove = async (index) => {
   

    try {
      const response = await axios.post('http://3.139.54.170:8000/make_move', {
        username: username,
        game_id: gameId,
        move: index,
      });

      if (response.data.message === 'Move made') {
        setBoard(response.data.board.split(''));
        setCurrentPlayer(response.data.current_player);
        // setWinner(response.data.winner);
      } else {
        Alert.alert('Error', response.data.message);
      }
    } catch (error) {
      console.error(error);
      Alert.alert('Error', 'Could not make move. Please try again.');
    }
  };

  const renderBox = (index) => (
    <TouchableOpacity
      key={index}
      style={styles.box}
      onPress={() => makeMove(index)}
    >
      <Text style={styles.boxText}>{board[index]}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Game ID: {gameId}</Text>
      <Text style={styles.title}>You are: {playerRole}</Text>
      <View style={styles.board}>
        {board.map((_, index) => renderBox(index))}
      </View>
      {winner ? (
        <Text style={styles.winnerText}>Winner: {winner}</Text>
      ) : (
        <Text style={styles.turnText}>
          {currentPlayer === playerRole ? 'Your turn' : 'Opponent\'s turn'}
        </Text>
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
    fontSize: 20,
    marginBottom: 20,
  },
  board: {
    width: '80%',
    aspectRatio: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  box: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#333',
  },
  boxText: {
    fontSize: 32,
    fontWeight: 'bold',
  },
  winnerText: {
    fontSize: 24,
    color: '#28a745',
    marginTop: 20,
  },
  turnText: {
    fontSize: 18,
    marginTop: 20,
    color: '#333',
  },
});

export default GamePage;
