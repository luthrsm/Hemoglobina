import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';
import { AsyncStorage } from 'react-native';

import { db } from '../../../Services/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuHemocentro from '../../../../components/menu/menuHemocentro';


const ConfigHemo = () => {

  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    // Pegue o ID do usuário autenticado
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'Hemocentro', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().Nome);
          setUserEmail(docSnap.data().Email);

        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, []);

  const navigation = useNavigation();

  const [loggedOut, setLoggedOut] = useState(false);

  const Logout = async () => {
    const auth = getAuth();

    try {
      await signOut(auth);
      console.log('Usuário deslogado com sucesso!');

      navigation.navigate('WelcomeScreen');
    } catch (error) {
      console.error('Erro ao fazer logout:', error.message);
    }
  }

  const handleLogout = async () => {
    Alert.alert('Atenção!', 'Você tem certeza que deseja sair da sua conta?', [
      {
        text: 'Sair da conta',
        onPress: async () => {
          await Logout();
        }
      },
      {
        text: 'Cancelar',
        style: 'cancel',
      },
    ]);

  };

  // const route = useRoute();
  // const { profilePic } = route.params;

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <View style={styles.profile}>

          <Image source={require('../../../../assets/img/iconUser.png')} style={styles.profileImage} />
          <Text style={styles.profileName}>{userName}</Text>
          <Text style={styles.profileEmail}>{userEmail}</Text>
        </View>

        <View style={styles.options}>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilConfigHemo')}>
            <Image source={require('../../../../assets/img/configImages/lapis.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Editar perfil</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FaleConoscoHemo')}>
            <Image source={require('../../../../assets/img/configImages/faleConosco.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Fale conosco</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PoliticasDeSegurancaHemo')}>
            <Image source={require('../../../../assets/img/configImages/politicas.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Políticas de segurança</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermosDeUsoHemo')}>
            <Image source={require('../../../../assets/img/configImages/termos.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Termos de uso</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SobreHemo')}>
            <Image source={require('../../../../assets/img/configImages/sobre.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Sobre</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.option} onPress={handleLogout}>
            <Image source={require('../../../../assets/img/configImages/sairConta.png')} style={styles.imageBotoes} />
            <Text style={styles.optionText}>Sair da conta</Text>
          </TouchableOpacity>

        </View>
      </View>

      <MenuHemocentro />
    </View>

  )
}

export default ConfigHemo;

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