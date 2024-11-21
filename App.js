import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as Font from 'expo-font'
import { StatusBar, View, ActivityIndicator } from 'react-native';
import { AppRegistry } from 'react-native';
import { name as Hemoglobina } from './app.json'
import { onAuthStateChanged } from '@firebase/auth';
import { auth, db } from './src/Services/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native'


AppRegistry.registerComponent(Hemoglobina, () => App);


//telas
import LoadingScreen from './src/Screen/geral/LoadingScreen';
import CampanhaDoador from './src/Screen/doador/campanha/campanhaMainDoador';
import CampanhaHemo from './src/Screen/hemocentro/campanha/campanhaMainHemo'
import CriarCampanha from './src/Screen/doador/campanha/criarCampanha';
import CampanhaDetalhes from './components/campanha/campanhaDetails'
import CriarCampanhaHemo from './src/Screen/hemocentro/campanha/criarCampanhaHemo';

import WelcomeScreen from './src/Screen/geral/pagBemVindo'
import CadastroEscolha from "./src/Screen/geral/cadEscolha";
import LoginEscolha from './src/Screen/geral/loginEscolha';
import LoginDoador from './src/Screen/doador/loginDoador';
import HomeDoador from './src/Screen/doador/homeDoador';
import ProxDoacao from './src/Screen/doador/proxDoacao';
import HomeHemocentro from './src/Screen/hemocentro/HomeHemocentro/homeHemocentro';
import QuestionarioTriagem from './src/Screen/doador/questionarioTriagem';
import Perguntas from './src/Screen/doador/perguntas';
import SolicitarCarteirinha from './src/Screen/doador/ScolicitarCar';
import HistoricoDoacoes from './src/Screen/doador/historico';
import LoginHemocento from './src/Screen/hemocentro/HemoCad/loginHemocentro';
import PerfilDoador from './components/cadDoador/perfilDoador';
import AddressFormDoador from './components/cadDoador/cep';
import InputSenhaCadDoador from './components/cadDoador/inputSenhaCad';

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

//chatbot
import Chatbot from './src/Screen/doador/HemoAssistent/Chatbot';

import ProliticasDeSegurancaCad from './src/Screen/geral/politicasCad';
import TermosDeUsoCad from './src/Screen/geral/termosCad';

const Stack = createNativeStackNavigator();

export default function App() {
  const [user, setUser] = useState(null);
  const [loadingAuth, setLoadingAuth] = useState(true);
  const [fontsLoaded, setFontsLoaded] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        try {
          // Verifique se o usuário é um doador
          const doadorDoc = await getDoc(doc(db, "doador", currentUser.uid));
          if (doadorDoc.exists()) {
            const cadastroCompleto = doadorDoc.data().cadastroCompleto;
            if (cadastroCompleto) {
              setUser({ ...currentUser, tipoUsuario: "doador" });
            } else {
              setUser({ ...currentUser, tipoUsuario: "doadorCadastro" });
            }
          } else {
            // Verifique se o usuário é um hemocentro
            const hemocentroDoc = await getDoc(doc(db, "Hemocentro", currentUser.uid));
            if (hemocentroDoc.exists()) {
              const cadastroCompleto = hemocentroDoc.data().cadastroCompleto;
              if (cadastroCompleto) {
                setUser({ ...currentUser, tipoUsuario: "hemocentro" });
              } else {
                setUser({ ...currentUser, tipoUsuario: "hemocentroCadastro" });
              }
            } else {
              setUser(null); // Usuário não encontrado
            }
          }
        } catch (error) {
          console.error("Erro ao buscar tipo de usuário:", error);
        }
      } else {
        setUser(null); // Usuário não autenticado
      }
      setLoadingAuth(false);
    });

    // Retorno da função de limpeza do efeito para cancelar a assinatura
    return unsubscribe;
  }, []);

  const updateTipoUsuario = (tipo) => {
    setUser((prevUser) => ({
      ...prevUser,
      tipoUsuario: tipo
    }));
  };


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
      <StatusBar barStyle="light-content" backgroundColor="#af2b2b" />
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="WelcomeScreen"
          screenOptions={{
            headerShown: false,
            statusBarColor: "#af2b2b",
            statusBarStyle: 'light',
          }}
          initialParams={{ updateTipoUsuario }}
        >
          {loadingAuth ? (
            <Stack.Screen name="LoadingScreen" component={LoadingScreen} />
          ) : !user ? (
            <>
              <Stack.Screen name="WelcomeScreen" component={WelcomeScreen} />
              <Stack.Screen name="CadastroEscolha" component={CadastroEscolha} />
              <Stack.Screen name="LoginEscolha" component={LoginEscolha} />
              <Stack.Screen name="LoginDoador" component={LoginDoador} initialParams={{ updateTipoUsuario }} />
              <Stack.Screen name="InputSenhaCad" component={InputSenhaCad} />

              <Stack.Screen name="LoginHemo" component={LoginHemocento} initialParams={{ updateTipoUsuario }} />

              <Stack.Screen name="InputSenhaCadDoador" component={InputSenhaCadDoador} />
            </>
          ) : user.tipoUsuario === "doador" ? (
            <>
              <Stack.Screen name="HomeDoador" component={HomeDoador} />
              <Stack.Screen name="ProxDoacao" component={ProxDoacao} />
              <Stack.Screen name="QuestionarioTriagem" component={QuestionarioTriagem} />
              <Stack.Screen name="Perguntas" component={Perguntas} />
              <Stack.Screen name="SolicitarCarteirinha" component={SolicitarCarteirinha} />
              <Stack.Screen name="HistoricoDoacoes" component={HistoricoDoacoes} />
              <Stack.Screen name="CampanhaDoador" component={CampanhaDoador} />
              <Stack.Screen name="CriarCampanha" component={CriarCampanha} />
              <Stack.Screen name="ConfiguracoesDoador" component={ConfigGeralDoador} />
              <Stack.Screen name="FaleConoscoDoador" component={FaleConoscoD} />
              <Stack.Screen name="PerfilConfigDoador" component={ProfileScreen} />
              <Stack.Screen name="TermosDeUsoDoador" component={TermosDeUsoDoador} />
              <Stack.Screen name="PoliticasDeSegurancaDoador" component={PoliticasDeSegurancaDoador} />
              <Stack.Screen name="SobreDoador" component={SobreDoador} />
              <Stack.Screen name="InfoMain" component={InfoMain} />
              <Stack.Screen name="InfoCardContent" component={InfoCardContent} />
              <Stack.Screen name="Chatbot" component={Chatbot} />
              <Stack.Screen name="HemocentrosMap" component={HemocentrosMap} />
            </>
          ) : user.tipoUsuario === "hemocentro" ? (
            <>
              <Stack.Screen name="HomeHemocentro" component={HomeHemocentro} />
              <Stack.Screen name="CampanhaMainHemocentro" component={CampanhaHemo} />
              <Stack.Screen name="CriarCampanhaHemo" component={CriarCampanhaHemo} />
              <Stack.Screen name="ConfiguracoesHemo" component={ConfigHemo} />
              <Stack.Screen name="FaleConoscoHemo" component={FaleConoscoH} />
              <Stack.Screen name="PoliticasDeSegurancaHemo" component={PoliticasDeSegurancaHemo} />
              <Stack.Screen name="TermosDeUsoHemo" component={TermosDeUsoHemo} />
              <Stack.Screen name="PerfilConfigHemo" component={ProfileScreenHemo} />
              <Stack.Screen name="SobreHemo" component={SobreHemo} />
              <Stack.Screen name="Estoque" component={EstoqueBancoDeSangue} />
              <Stack.Screen name="GraficosEstoque" component={SangueChart} />
              <Stack.Screen name="GerenciarEstoqueHemo" component={GerenciarEstoqueHemo} />

              <Stack.Screen name="HistoricoHemocentro" component={HistoricoHemocentro} />
              <Stack.Screen name="AdcDoacao" component={AdcDoacao} />
              <Stack.Screen name="RegistrosPendentes" component={RegistrosPendentes} />
              <Stack.Screen name="AtencaoScreen" component={AtencaoScreen} />
              <Stack.Screen name="EdicaoDoacao" component={EdicaoDoacao} />
            </>
          ) : user.tipoUsuario === "doadorCadastro" ? (
            <>
              <Stack.Screen name="PerfilDoador" component={PerfilDoador} />
              <Stack.Screen name="AddressFormDoador" component={AddressFormDoador}
                initialParams={{ updateTipoUsuario }} />
            </>
          ) : (
            <>
              <Stack.Screen name="PerfilHemocentro" component={PerfilHemocentro} />
              <Stack.Screen name="AddressForm" component={AddressForm} initialParams={{ updateTipoUsuario }} />

              <Stack.Screen name="Estoquecad" component={Estoque} initialParams={{ updateTipoUsuario }} />
              <Stack.Screen name="EstoqueScreen" component={EstoqueScreen} />
            </>
          )}
          <Stack.Screen name="CampanhaDetalhes" component={CampanhaDetalhes} />
          <Stack.Screen name="TermosCad" component={TermosDeUsoCad} />
          <Stack.Screen name="PoliticasCad" component={ProliticasDeSegurancaCad} />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
  s
}