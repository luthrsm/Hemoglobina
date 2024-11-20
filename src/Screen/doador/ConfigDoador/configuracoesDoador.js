import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { db } from '../../../Services/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { getDoc, doc, onSnapshot } from 'firebase/firestore';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuDoador from '../../../../components/menu/menuDoador';


const ConfigGeralDoador = () => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [cartSolicitada, setCartSolicitada] = useState(false);

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    const userRef = doc(db, 'doador', user.uid);
        
    // Utiliza onSnapshot para ouvir alterações em tempo real
    const unsubscribe = onSnapshot(userRef, (docSnap) => {
        if (docSnap.exists()) {
            const userData = docSnap.data();
            setUserName(userData.nome);
            setUserEmail(userData.email);
            setCartSolicitada(userData.cartSolicitada || false); // Atualiza com o valor de cartSolicitada
        } else {
            console.log('Documento não existe!');
        }
    });

    // Limpa o listener quando o componente for desmontado
    return () => unsubscribe();
}, []);

  const navigation = useNavigation();

  const [loggedOut, setLoggedOut] = useState(false);

  const handleLogout = async () => {
    const auth = getAuth();
    
    try {
      await signOut(auth);  
      console.log('Usuário deslogado com sucesso!');
      
      navigation.navigate('WelcomeScreen'); 
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity  onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <ScrollView>
          <View style={styles.profile}>

            <Image source={require('../../../../assets/img/iconUser.png')} style={styles.profileImage} />
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
          </View>

          <View style={styles.options}>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilConfigDoador')}>
              <Image source={require('../../../../assets/img/configImages/lapis.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Editar perfil</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={handleLogout}>
              <Image source={require('../../../../assets/img/configImages/sairConta.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Sair da conta</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FaleConoscoDoador')}>
              <Image source={require('../../../../assets/img/configImages/faleConosco.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Fale conosco</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SolicitarCarteirinha')}>
              <Image source={require('../../../../assets/img/configImages/resgatarCarte.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>{cartSolicitada ? 'Visualizar carteirinha' : 'Solicitar carteirinha'}</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PoliticasDeSegurancaDoador')}>
              <Image source={require('../../../../assets/img/configImages/politicas.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Políticas de segurança</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermosDeUsoDoador')}>
              <Image source={require('../../../../assets/img/configImages/termos.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Termos de uso</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SobreDoador')}>
              <Image source={require('../../../../assets/img/configImages/sobre.png')} style={styles.imageBotoes} />
              <Text style={styles.optionText}>Sobre</Text>
            </TouchableOpacity>

          </View>
        </ScrollView>
      </View>

      <MenuDoador />
    </View>

  )
}

export default ConfigGeralDoador;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do fundo e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    backgroundColor: '#AF2B2B',
    height: '9%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  voltarContainer: {
    position: 'absolute',
    left: 16,
  },
  title: {
    color: '#EEF0EB',
    marginLeft: 25,
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1,
  },
  imageBotoes: {
    width: 37,
    height: 37,
    marginRight: 10
  },
  txtTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },
  profile: {
    alignItems: 'center',
    marginTop: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  options: {
    marginTop: 10,
    padding: 15,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  optionIcon: {
    marginRight: 15,
  },
  optionIconText: {
    fontSize: 20,
  },
  optionText: {
    fontSize: 16,
  },

});