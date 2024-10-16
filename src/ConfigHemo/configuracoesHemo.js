import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import React, { useState, useRef } from 'react';
import { AsyncStorage } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuHemocentro from '../../components/menuHemocentro';


const ConfigHemo = () => {

  const [userData] = useState({
    name: 'Hospital Geral',
    email: 'hgpirajussara@gmail.com',
  });

  const navigation = useNavigation();

  const [loggedOut, setLoggedOut] = useState(false);
  
  const handleLogout = async () => {
    navigation.navigate('WelcomeScreen')
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
                <TouchableOpacity  onPress={() => navigation.goBack()}>
                  <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
              </View>

              <View style={styles.profile}>
                
                <Image source={require('../../assets/img/configImages/hemocentro.png')} style={styles.profileImage} />
                <Text style={styles.profileName}>{userData.name}</Text>
                <Text style={styles.profileEmail}>{userData.email}</Text>
              </View>

              <View style={styles.options}>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PerfilConfigHemo')}> 
                  <Image source={require('../../assets/img/configImages/lapis.png')} style={styles.imageBotoes} />
                  <Text style={styles.optionText}>Editar perfil</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={handleLogout}>
                  <Image source={require('../../assets/img/configImages/sairConta.png')} style={styles.imageBotoes}/>
                  <Text style={styles.optionText}>Sair da conta</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('FaleConoscoHemo')}>
                  <Image source={require('../../assets/img/configImages/faleConosco.png')} style={styles.imageBotoes} />
                  <Text style={styles.optionText}>Fale conosco</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('PoliticasDeSegurancaHemo')}>
                  <Image source={require('../../assets/img/configImages/politicas.png')} style={styles.imageBotoes} />
                  <Text style={styles.optionText}>Políticas de segurança</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('TermosDeUsoHemo')}>
                  <Image source={require('../../assets/img/configImages/termos.png')} style={styles.imageBotoes} />
                  <Text style={styles.optionText}>Termos de uso</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.option} onPress={() => navigation.navigate('SobreHemo')}>
                  <Image source={require('../../assets/img/configImages/sobre.png')} style={styles.imageBotoes} />
                  <Text style={styles.optionText}>Sobre</Text>
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