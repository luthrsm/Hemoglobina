import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StatusBar } from 'react-native';


AppRegistry.registerComponent(appName, () => App);


//telas
import CampanhaDoador from './src/Screen/doador/campanha/campanhaMainDoador';
import CampanhaHemo from './src/Screen/hemocentro/campanha/campanhaMainHemo'
import CriarCampanha from './src/Screen/doador/campanha/criarCampanha';
import CampanhaDetalhes from './components/campanha/campanhaDetails'
import CriarCampanhaHemo from './src/Screen/hemocentro/campanha/criarCampanhaHemo';

import WelcomeScreen from './src/Screen/geral/pagBemVindo';
import CadastroEscolha from "./src/Screen/geral/cadEscolha";
import CadastroDoador from './src/Screen/doador/cadDoador';
import LoginEscolha from './src/Screen/geral/loginEscolha';
import LoginDoador from './src/Screen/doador/loginDoador';
import HomeDoador from './src/Screen/doador/homeDoador';
import ProxDoacao from './src/Screen/doador/proxDoacao';
import HomeHemocentro from './src/Screen/hemocentro/HomeHemocentro/homeHemocentro';
import QuestionarioTriagem from './src/Screen/doador/questionarioTriagem';
import Perguntas from './src/Screen/doador/perguntas';
import SolicitarCarteirinha from './src/Screen/doador/ScolicitarCar';
import HistoricoDoacoes from './src/Screen/doador/historico';
import LoginHemo from './src/Screen/hemocentro/HemoCad/loginHemo';


//cadastro Hemo

import EstoqueScreen from './components/elementosHemocentro/estoqueCadContinuacao';
import InputSenhaCad from './components/elementosHemocentro/inputSenhaCad';
import AddressForm from './components/elementosHemocentro/cep';
import PerfilHemocentro from './components/elementosHemocentro/perfilHemocentro';
import Estoque from './components/elementosHemocentro/estoqueCad';

//configurações doador

import ConfigGeralDoador from './src/Screen/doador/ConfigDoador/configuracoesDoador';
import FaleConoscoD from './src/Screen/doador/ConfigDoador/faleConoscoDoadConfig';
import ProfileScreen from './src/Screen/doador/ConfigDoador/perfilConfigDoador';
import SobreDoador from './src/Screen/doador/ConfigDoador/sobreDoador';
import TermosDeUsoDoador from './src/Screen/doador/ConfigDoador/termosDeUsoDoador';
import PoliticasDeSegurancaDoador from './src/Screen/doador/ConfigDoador/politicSeguranDoador';

//configurações hemocentro

import ConfigHemo from './src/Screen/hemocentro/ConfigHemo/configuracoesHemo';
import FaleConoscoH from './src/Screen/hemocentro/ConfigHemo/faleConoscoHemoConfig';
import ProfileScreenHemo from './src/Screen/hemocentro/ConfigHemo/perfilConfigHemo';
import SobreHemo from './src/Screen/hemocentro/ConfigHemo/sobreHemo';
import TermosDeUsoHemo from './src/Screen/hemocentro/ConfigHemo/termosUsoHemo'
import PoliticasDeSegurancaHemo from './src/Screen/hemocentro/ConfigHemo/politicasDeSegurancaHemo'


//estoque

import EstoqueBancoDeSangue from './src/Screen/hemocentro/GerenciarEstoquePag/estoqueHemo';
import SangueChart from './src/Screen/hemocentro/GerenciarEstoquePag/grafico';
import GerenciarEstoqueHemo from './components/GerenciarEstoqueHemo/gerenciarEstoqueHemo';

//informações 

import InfoCardContent from './src/Screen/doador/Informações/InfoCardContent';
import InfoMain from './src/Screen/doador/Informações/infoMain';

//mapa
import HemocentrosMap from './src/Screen/doador/mapDoador';


//adc doacao
import HistoricoHemocentro from './src/Screen/hemocentro/adcDoacaoHemo/historicoDoacaoHemo';
import AdcDoacao from './src/Screen/hemocentro/adcDoacaoHemo/adcDoacao';
import AtencaoScreen from './src/Screen/hemocentro/adcDoacaoHemo/telaAtencao';
import RegistrosPendentes from './src/Screen/hemocentro/adcDoacaoHemo/registrosPendentes';
import EdicaoDoacao from './src/Screen/hemocentro/adcDoacaoHemo/editInfo';

import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "sua-api-key",
  authDomain: "seu-auth-domain",
  projectId: "seu-project-id",
  storageBucket: "seu-storage-bucket",
  messagingSenderId: "seu-messaging-sender-id",
  appId: "seu-app-id"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
} else {
  firebase.app();
}

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

    <>
      <StatusBar
        barStyle="light-content"
        backgroundColor="#af2b2b"
      />
      <NavigationContainer
      >

        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerShown: false,
            statusBarColor: "#af2b2b",
            statusBarStyle: 'light'
          }}
        >
          <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
          <Stack.Screen name="CadastroEscolha" component={CadastroEscolha} />
          {/* <Stack.Screen name="cadHemocentro" component={CadHemocentro} /> */}
          <Stack.Screen name="CadastroDoador" component={CadastroDoador} />
          <Stack.Screen name="LoginEscolha" component={LoginEscolha} />
          <Stack.Screen name="LoginDoador" component={LoginDoador} />
          <Stack.Screen name="HomeDoador" component={HomeDoador} />
          <Stack.Screen name="ProxDoacao" component={ProxDoacao} />
          <Stack.Screen name="InputSenhaCad" component={InputSenhaCad} />
          <Stack.Screen name="AddressForm" component={AddressForm} />
          <Stack.Screen name="PerfilHemocentro" component={PerfilHemocentro} />
          <Stack.Screen name="Estoquecad" component={Estoque} />
          <Stack.Screen name="HomeHemocentro" component={HomeHemocentro} />
          <Stack.Screen name="QuestionarioTriagem" component={QuestionarioTriagem} />
          <Stack.Screen name="Perguntas" component={Perguntas} />
          <Stack.Screen name="SolicitarCarteirinha" component={SolicitarCarteirinha} />
          <Stack.Screen name="HistoricoDoacoes" component={HistoricoDoacoes} />
          <Stack.Screen name="LoginHemo" component={LoginHemo} />

          <Stack.Screen name="CampanhaDoador" component={CampanhaDoador} />
          <Stack.Screen name="CampanhaMainHemocentro" component={CampanhaHemo} />
          <Stack.Screen name="CriarCampanha" component={CriarCampanha} />
          <Stack.Screen name="CriarCampanhaHemo" component={CriarCampanhaHemo} />
          <Stack.Screen name="CampanhaDetalhes" component={CampanhaDetalhes} />


          <Stack.Screen name="ConfiguracoesDoador" component={ConfigGeralDoador} />
          <Stack.Screen name="FaleConoscoDoador" component={FaleConoscoD} />
          <Stack.Screen name="PerfilConfigDoador" component={ProfileScreen} />
          <Stack.Screen name="TermosDeUsoDoador" component={TermosDeUsoDoador} />
          <Stack.Screen name="PoliticasDeSegurancaDoador" component={PoliticasDeSegurancaDoador} />
          <Stack.Screen name="SobreDoador" component={SobreDoador} />


          <Stack.Screen name="ConfiguracoesHemo" component={ConfigHemo} />
          <Stack.Screen name="FaleConoscoHemo" component={FaleConoscoH} />
          <Stack.Screen name="PoliticasDeSegurancaHemo" component={PoliticasDeSegurancaHemo} />
          <Stack.Screen name="TermosDeUsoHemo" component={TermosDeUsoHemo} />
          <Stack.Screen name="PerfilConfigHemo" component={ProfileScreenHemo} />
          <Stack.Screen name="SobreHemo" component={SobreHemo} />

          <Stack.Screen name="Estoque" component={EstoqueBancoDeSangue} />
          <Stack.Screen name="GraficosEstoque" component={SangueChart} />
          <Stack.Screen name="GerenciarEstoqueHemo" component={GerenciarEstoqueHemo} />
          <Stack.Screen name="EstoqueScreen" component={EstoqueScreen} />

          <Stack.Screen name="InfoMain" component={InfoMain} />
          <Stack.Screen name="InfoCardContent" component={InfoCardContent} />

          <Stack.Screen name="HemocentrosMap" component={HemocentrosMap} />

          {/*adc doacao hemocentro */}
          <Stack.Screen component={HistoricoHemocentro} name="HistoricoHemocentro" />
          <Stack.Screen component={AdcDoacao} name="AdcDoacao" />
          <Stack.Screen name="RegistrosPendentes" component={RegistrosPendentes} />
          <Stack.Screen name="AtencaoScreen" component={AtencaoScreen} />
          <Stack.Screen name="EdicaoDoacao" component={EdicaoDoacao} />







        </Stack.Navigator>
      </NavigationContainer>
    </>



  );
}