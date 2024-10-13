import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'

const Stack = createNativeStackNavigator();


import HistoricoHemocentro from './src/adcDoacaoHemo/historicoDoacaoHemo';
import AdcDoacao from './src/adcDoacaoHemo/adcDoacao';
import AtencaoScreen from './src/adcDoacaoHemo/telaAtencao';
import RegistrosPendentes from './src/adcDoacaoHemo/registrosPendentes';
import EdicaoDoacao from './src/adcDoacaoHemo/editInfo';

export default function App() {
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const loadFonts = async () => {
      await Font.loadAsync({
        'Poppins-Regular': require('./assets/fonts/Poppins-Regular.ttf'),
        'Poppins-Medium': require('./assets/fonts/Poppins-Medium.ttf'),
        'Poppins-SemiBold': require('./assets/fonts/Poppins-SemiBold.ttf'),
        'DM-Sans': require('./assets/fonts/DMSans-VariableFont_opsz,wght.ttf'),
        'DM-Sans Bold': require('./assets/fonts/DMSans-Bold.ttf'),
        'DM-Sans Medium': require('./assets/fonts/DMSans-Medium.ttf'),

      });
      setFontsLoaded(true);
    };

    loadFonts();
  }, []); if (!fontsLoaded) {
    return null;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerShown: false}}>
        <Stack.Screen component={HistoricoHemocentro} name="HistoricoHemocentro"/>
        <Stack.Screen component={AdcDoacao} name="AdcDoacao"/>
        <Stack.Screen name="RegistrosPendentes" component={RegistrosPendentes} />
        <Stack.Screen name="AtencaoScreen" component={AtencaoScreen} />
        <Stack.Screen name="EdicaoDoacao" component={EdicaoDoacao} />

      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
