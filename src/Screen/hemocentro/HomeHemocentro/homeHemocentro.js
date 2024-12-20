import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../../Services/firebaseConfig';
import { getAuth, signOut } from 'firebase/auth';
import { getDoc, doc } from 'firebase/firestore';


import MenuHemocentro from '../../../../components/menu/menuHemocentro';



const HomeHemocentro = () => {

  const [userName, setUserName] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
      // Pegue o ID do usuário autenticado
      const auth = getAuth();
      const user = auth.currentUser;
      console.log('currentUser:', user);
      if (user) {
          
          const userRef = doc(db, 'Hemocentro', user.uid); 
          getDoc(userRef).then((docSnap) => {
              if (docSnap.exists()) {
                  setUserName(docSnap.data().Nome);
              } else {
                  console.log('esse documento nao existe!');
              }
          }).catch((error) => {
              console.error("Error getting document:", error);
          });
      }
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Bem vindo, {userName}!</Text>
      </View>

      <View style={styles.mainContainer}>

        <View style={styles.txtFotoContainer}>
          <Text style={styles.txtTitle}>Gerencie o nível do banco de sangue do seu hemocentro</Text>
          <View style={styles.fotoCont}>
            <Image style={styles.image} source={require('../../../../assets/img/hemoCadImages/grafico.png')} />
          </View>
        </View>

        <View style={styles.doacoesContainer}>
          <Text style={styles.doacoesTxt}>Adicionar nova doação:</Text>
          <TouchableOpacity style={styles.botaoAdDoacao} onPress={() => navigation.navigate('AdcDoacao')}>
            <Text style={styles.txtBotao}>Adicionar nova doação</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoAdDoacao} onPress={() => navigation.navigate('Estoque')}>
            <Text style={styles.txtBotao}>Gerenciar banco de sangue</Text>
          </TouchableOpacity>

        </View>
      </View>

      <MenuHemocentro />
    </View>

  )
}

export default HomeHemocentro;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
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
  title: {
    color: '#EEF0EB',
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1
  },

  txtTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
  },

  txtFotoContainer: {
    marginBottom: 90,
  },
  txtBotao: {
    color: '#EEF0EB',
    fontFamily: 'DM-Sans',
  },
  image: {
    width: 300,
    height: 250,
    marginTop: 50
  },
  fotoCont: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginBottom: 30,
    marginTop: 20,
  },
  doacoesContainer: {
    marginTop: 30,
  },
  doacoesTxt: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 17,
    color: '#470404',
    marginBottom: 30,
    fontWeight: '500',
  },
  botaoAdDoacao: {
    backgroundColor: '#1E6370',
    height: 37,
    width: 235,
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 30,
  }
});