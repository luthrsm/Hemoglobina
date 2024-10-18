import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StatusBar } from 'react-native';

//telas gerais
import WelcomeScreen from './src/pagBemVindo';
import CadastroEscolha from "./src/cadastro/cadEscolha";
import LoginEscolha from './src/login/loginEscolha';

//telas doador
import CampanhaDoador from './src/doador/campanha doador/campanhaMainDoador';
import CriarCampanha from './src/doador/campanha doador/criarCampanha';
import CampaignDetailsDoador from './src/doador/campanha doador/campanhaMainDoador'
import CadastroDoador from './src/doador/cadDoador/cadDoador';
import LoginDoador from './src/doador/loginDoador';
import HomeDoador from './src/doador/loginDoador';
import ProxDoacao from './src/doador/proxDoacao';
import QuestionarioTriagem from './src/doador/questionarioTriagem';
import Perguntas from './src/doador/perguntas';
import SolicitarCarteirinha from './src/doador/ScolicitarCar';
import HistoricoDoacoes from './src/doador/historico';
//configurações doador
import ConfigGeralDoador from './src/doador/ConfigDoador/configuracoesDoador';
import FaleConoscoD from './src/doador/ConfigDoador/faleConoscoDoadConfig';
import ProfileScreen from './src/doador/ConfigDoador/perfilConfigDoador';
import SobreDoador from './src/doador/ConfigDoador/sobreDoador';
import TermosDeUsoDoador from './src/doador/ConfigDoador/termosDeUsoDoador';
import PoliticasDeSegurancaDoador from './src/doador/ConfigDoador/politicSeguranDoador';
//informações 
import InfoCardContent from './src/doador/Informações/InfoCardContent';
import InfoMain from './src/doador/Informações/infoMain';
//mapa
import HemocentrosMap from './src/doador/mapDoador';



//telas hemocentro
import CampanhaHemo from './src/hemocentro/campanha hemocentro/campanhaMainHemo';
import CriarCampanhaHemo from './src/hemocentro/campanha hemocentro/criarCampanhaHemo';
import HomeHemocentro from './src/hemocentro/homeHemocentro';
import LoginHemo from './src/hemocentro/loginHemo';
//cadastro Hemo
import CadastroHemocentro from './src/hemocentro/HemoCad/cadHemocentro';
import EstoqueScreen from './components/elementosHemocentro/estoqueCadContinuacao';
//configurações hemocentro
import ConfigHemo from './src/hemocentro/ConfigHemo/configuracoesHemo';
import FaleConoscoH from './src/hemocentro/ConfigHemo/faleConoscoHemoConfig';
import ProfileScreenHemo from './src/hemocentro/ConfigHemo/perfilConfigHemo';
import SobreHemo from './src/hemocentro/ConfigHemo/sobreHemo';
import TermosDeUsoHemo from './src/hemocentro/ConfigHemo/termosUsoHemo'
import PoliticasDeSegurancaHemo from './src/hemocentro/ConfigHemo/politicasDeSegurancaHemo'
//estoque
import EstoqueBancoDeSangue from './src/hemocentro/GerenciarEstoquePag/estoqueHemo';
import SangueChart from './src/hemocentro/GerenciarEstoquePag/grafico';
import GerenciarEstoqueHemo from './components/GerenciarEstoqueHemo/gerenciarEstoqueHemo';
//adc doacao
import HistoricoHemocentro from './src/hemocentro/adcDoacaoHemo/historicoDoacaoHemo';
import AdcDoacao from './src/hemocentro/adcDoacaoHemo/adcDoacao';
import AtencaoScreen from './src/hemocentro/adcDoacaoHemo/telaAtencao';
import RegistrosPendentes from './src/hemocentro/adcDoacaoHemo/registrosPendentes';
import EdicaoDoacao from './src/hemocentro/adcDoacaoHemo/editInfo';




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