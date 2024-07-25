import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';
import axios from 'axios';

const GamePage = ({ route, navigation }) => {
  const { username, gameId } = route.params;
  const [board, setBoard] = useState(Array(9).fill(''));
  const [currentPlayer, setCurrentPlayer] = useState(null);
  const [winner, setWinner] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGameState();
    const interval = setInterval(fetchGameState, 5000); // Polling every 5 seconds
    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  const fetchGameState = async () => {
    try {
      const response = await axios.post('http://3.139.54.170:8000/get_game_state', {
        game_id: gameId,
      });
      setBoard(response.data.board.split(''));
      setCurrentPlayer(response.data.current_player);
      setWinner(response.data.winner);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const makeMove = async (index) => {
    if (board[index] !== '' || winner || currentPlayer !== username) return;

    try {
      setLoading(true);
      const response = await axios.post('http://3.139.54.170:8000/make_move', {
        username: username,
        game_id: gameId,
        move: index,
      });
      setBoard(response.data.board.split(''));
      setCurrentPlayer(response.data.current_player);
      setWinner(response.data.winner);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const resetGame = () => {
    setBoard(Array(9).fill(''));
    setWinner(null);
  };

  if (loading) return <ActivityIndicator size="large" color="#0000ff" />;

  return (
    <View style={styles.container}>
      <Text style={styles.turnText}>
        {winner ? `Winner: ${winner}` : `Player ${currentPlayer}'s turn`}
      </Text>
      <View style={styles.board}>
        {board.map((cell, index) => (
          <TouchableOpacity
            key={index}
            style={[styles.cell, (index % 3 !== 2) && styles.cellBorderRight, (index < 6) && styles.cellBorderBottom]}
            onPress={() => makeMove(index)}
            disabled={cell !== '' || winner || currentPlayer !== username}
          >
            <Text style={styles.cellText}>{cell}</Text>
          </TouchableOpacity>
        ))}
      </View>
      {/* <TouchableOpacity style={styles.resetButton} onPress={resetGame}>
        <Text style={styles.resetButtonText}>Reset Game</Text>
      </TouchableOpacity> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  turnText: {
    fontSize: 24,
    marginBottom: 20,
  },
  board: {
    width: 300,
    height: 300,
    backgroundColor: '#fff',
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderWidth: 1,
    borderColor: '#000',
  },
  cell: {
    width: '33.33%',
    height: '33.33%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cellBorderRight: {
    borderRightWidth: 1,
  },
  cellBorderBottom: {
    borderBottomWidth: 1,
  },
  cellText: {
    fontSize: 36,
    fontWeight: 'bold',
  },
  resetButton: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#007bff',
    borderRadius: 8,
  },
  resetButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default GamePage;
