
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginPage from '../src/screens/LoginPage';
import SignupPage from '../src/screens/SignupPage';
import MainPage from '../src/screens/MainPage';
import CreateGame from '../src/screens/CreateGame';
import JoinGame from '../src/screens/JoinGame';
import GamePage from '../src/screens/GamePage';


const Stack = createStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen name="LoginPage" component={LoginPage} />
        <Stack.Screen name="SignuPage" component={SignupPage} />
        <Stack.Screen name="MainPage" component={MainPage} /> 
        <Stack.Screen name="CreateGame" component={CreateGame}/>
        <Stack.Screen name="JoinGame" component={JoinGame}/>
        <Stack.Screen name="GamePage" component={GamePage}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
