import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import {StyleSheet} from 'react-native';


//telas
import WelcomeScreen from './src/pagBemVindo';
import CadastroEscolha from "./src/cadEscolha";
import CadastroDoador from './src/cadDoador';
import LoginEscolha from './src/loginEscolha';
import LoginDoador from './src/loginDoador';
import HomeDoador from './src/homeDoador';
import ProxDoacao  from './src/proxDoacao';

const Stack = createNativeStackNavigator();




export default function App() {

  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'DM-Sans': require('./assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []);
  if (!fontsLoaded) {
    return console.log('fontes carregadas');
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="CadastroEscolha" component={CadastroEscolha} />
        {/* <Stack.Screen name="cadHemocentro" component={CadHemocentro} /> */}
        <Stack.Screen name="CadastroDoador" component={CadastroDoador} />
        <Stack.Screen name="LoginEscolha" component={LoginEscolha} />
        <Stack.Screen name="LoginDoador" component={LoginDoador} />
        <Stack.Screen name="HomeDoador" component={HomeDoador} />
        <Stack.Screen name="ProxDoacao" component={ProxDoacao} />


      </Stack.Navigator>
    </NavigationContainer>


  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
