import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StyleSheet } from 'react-native';


//telas
import CampanhaMain from './src/campanha/index';
import CriarCampanha from './src/campanha/criarCampanha';
import CampaignDetails from './src/campanha/index'
import WelcomeScreen from './src/pagBemVindo';
import CadastroEscolha from "./src/cadEscolha";
import CadastroDoador from './src/cadDoador';
import LoginEscolha from './src/loginEscolha';
import LoginDoador from './src/loginDoador';
import HomeDoador from './src/homeDoador';
import ProxDoacao from './src/proxDoacao';
import CadastroHemocentro from './components/hemoCad';
import HomeHemocentro from './components/homeHemocentro';
import HemocentroLogin from './components/loginHemo';
import QuestionarioTriagem from './src/questionarioTriagem';
import Perguntas from './components/perguntas';
import SolicitarCarteirinha from './components/ScolicitarCar';
import HistoricoDoacoes from './components/historico';
import LoginHemo from './components/loginHemo';
//estoque

import Apositivo from './assets/componentesEstoqCadHemo/A+'


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
        <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <Stack.Screen name="CadastroEscolha" component={CadastroEscolha} />
        {/* <Stack.Screen name="cadHemocentro" component={CadHemocentro} /> */}
        <Stack.Screen name="CadastroDoador" component={CadastroDoador} />
        <Stack.Screen name="LoginEscolha" component={LoginEscolha} />
        <Stack.Screen name="LoginDoador" component={LoginDoador} />
        <Stack.Screen name="HomeDoador" component={HomeDoador} />
        <Stack.Screen name="ProxDoacao" component={ProxDoacao} />
        <Stack.Screen name="HemoTela" component={CadastroHemocentro} />
        <Stack.Screen name="HomeHemocentro" component={HomeHemocentro} />
        <Stack.Screen name="HemocentroLogin" component={HemocentroLogin} />
        <Stack.Screen name="QuestionarioTriagem" component={QuestionarioTriagem} />
        <Stack.Screen name="Perguntas" component={Perguntas} />
        <Stack.Screen name="SolicitarCarteirinha" component={SolicitarCarteirinha} />
        <Stack.Screen name="HistoricoDoacoes" component={HistoricoDoacoes} />
        <Stack.Screen name="LoginHemo" component={LoginHemo} />
        <Stack.Screen name="CampanhaMain" component={CampanhaMain} />
        <Stack.Screen name="CriarCampanha" component={CriarCampanha} />
        <Stack.Screen name="CampaignDetails" component={CampaignDetails} />


        {/*screen pra cada componente do estoque*/}
        <Stack.Screen name="Apositivo" component={Apositivo} />




      </Stack.Navigator>
    </NavigationContainer>


  );
}