import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StatusBar } from 'react-native';

//telas
import CampanhaDoador from './src/campanha/campanhaMainDoador';
import CampanhaHemo from './src/campanha/campanhaMainHemo'
import CriarCampanha from './src/campanha/criarCampanha';
import CampaignDetailsDoador from './src/campanha/campanhaMainDoador'
import CriarCampanhaHemo from './src/campanha/criarCampanhaHemo';

import WelcomeScreen from './src/pagBemVindo';
import CadastroEscolha from "./src/cadEscolha";
import CadastroDoador from './src/cadDoador';
import LoginEscolha from './src/loginEscolha';
import LoginDoador from './src/loginDoador';
import HomeDoador from './src/homeDoador';
import ProxDoacao from './src/proxDoacao';
import HomeHemocentro from './src/HomeHemocentro/homeHemocentro';
import HemocentroLogin from './components/loginHemo';
import QuestionarioTriagem from './src/questionarioTriagem';
import Perguntas from './components/perguntas';
import SolicitarCarteirinha from './components/ScolicitarCar';
import HistoricoDoacoes from './components/historico';
import LoginHemo from './components/loginHemo';

//cadastro Hemo

import CadastroHemocentro from './src/HemoCad/cadHemocentro';
import EstoqueScreen from './components/elementosHemocentro/estoqueCadContinuacao';

//configurações doador

import ConfigGeralDoador from './src/ConfigDoador/configuracoesDoador';
import FaleConoscoD from './src/ConfigDoador/faleConoscoDoadConfig';
import ProfileScreen from './src/ConfigDoador/perfilConfigDoador';
import SobreDoador from './src/ConfigDoador/sobreDoador';
import TermosDeUsoDoador from './src/ConfigDoador/termosDeUsoDoador';
import PoliticasDeSegurancaDoador from './src/ConfigDoador/politicSeguranDoador';

//configurações hemocentro

import ConfigHemo from './src/ConfigHemo/configuracoesHemo';
import FaleConoscoH from './src/ConfigHemo/faleConoscoHemoConfig';
import ProfileScreenHemo from './src/ConfigHemo/perfilConfigHemo';
import SobreHemo from './src/ConfigHemo/sobreHemo';
import TermosDeUsoHemo from './src/ConfigHemo/termosUsoHemo'
import PoliticasDeSegurancaHemo from './src/ConfigHemo/politicasDeSegurancaHemo'


//estoque

import EstoqueBancoDeSangue from './src/GerenciarEstoquePag/estoqueHemo';
import SangueChart from './src/GerenciarEstoquePag/grafico';
import GerenciarEstoqueHemo from './components/GerenciarEstoqueHemo/gerenciarEstoqueHemo';

//informações 

import InfoCardContent from './src/Informações/InfoCardContent';
import InfoMain from './src/Informações/infoMain';

//mapa
import HemocentrosMap from './src/mapDoador';


//adc doacao
import HistoricoHemocentro from './src/adcDoacaoHemo/historicoDoacaoHemo';
import AdcDoacao from './src/adcDoacaoHemo/adcDoacao';
import AtencaoScreen from './src/adcDoacaoHemo/telaAtencao';
import RegistrosPendentes from './src/adcDoacaoHemo/registrosPendentes';
import EdicaoDoacao from './src/adcDoacaoHemo/editInfo';


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
          <Stack.Screen name="HemoTela" component={CadastroHemocentro} />
          <Stack.Screen name="HomeHemocentro" component={HomeHemocentro} />
          <Stack.Screen name="HemocentroLogin" component={HemocentroLogin} />
          <Stack.Screen name="QuestionarioTriagem" component={QuestionarioTriagem} />
          <Stack.Screen name="Perguntas" component={Perguntas} />
          <Stack.Screen name="SolicitarCarteirinha" component={SolicitarCarteirinha} />
          <Stack.Screen name="HistoricoDoacoes" component={HistoricoDoacoes} />
          <Stack.Screen name="LoginHemo" component={LoginHemo} />

          <Stack.Screen name="CampanhaDoador" component={CampanhaDoador} />
          <Stack.Screen name="CampanhaMainHemocentro" component={CampanhaHemo} />
          <Stack.Screen name="CriarCampanha" component={CriarCampanha} />
          <Stack.Screen name="CriarCampanhaHemo" component={CriarCampanhaHemo} />
          <Stack.Screen name="CampaignDetailsDoador" component={CampaignDetailsDoador} />


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