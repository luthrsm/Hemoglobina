import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import {StyleSheet} from 'react-native';


//telas
import CampanhaMain from './src/campanha/index';
import CriarCampanha from './src/campanha/criarCampanha';
import CampaignDetails from './src/campanha/index'

//estoque



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

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen  name="CampanhaMain" component={CampanhaMain} />
        <Stack.Screen  name="CriarCampanha" component={CriarCampanha}/>
        <Stack.Screen  name="CampaignDetails" component={CampaignDetails}/>




      </Stack.Navigator>
    </NavigationContainer>


  );
}