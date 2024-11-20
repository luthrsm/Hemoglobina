import React, { useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import MenuHemocentro from '../../../../components/menu/menuHemocentro';


import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const SobreHemo = ({ navigation }) => {

  const scrollViewRef = useRef(null);
  // const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesHemo')}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >

        <View style={styles.mainSection}>
          <Text style={styles.textoFale}>Sobre o App</Text>

          <Image style={styles.Image} source={require('../../../../assets/img/configImages/sobreApp.png')} />

          <Text style={styles.textoPoliticas}>Quer saber mais sobre o nosso aplicativo? Venha aqui que irei lhe contar! </Text>
          <Text style={styles.textoPoliticas}>O Hemoglobina é uma aplicativo que conecta doadores de sangue e os hemocentros, disso todo mundo já sabe, porém, o que você não sabe é que o nosso aplicativo busca facilitar tanto o doador na hora de buscar por hemocentros próximos de si, fornecendo informações confiáveis sobre os mesmos, quanto os próprios hemocentros, auxiliando-os a editar e verificar seu próprio estoque conforme forem recebendo doações! </Text>
        </View>
        
      </ScrollView>
    <MenuHemocentro />
  </View>
  );
};

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
  mainSection: {
    padding: 32,
    marginTop: '-8%'
  },
  Image: {
    width: '100%',
    marginBottom: 25,
  },
  textoFale: {
    textAlign: 'center',
    fontSize: 30,
    fontWeight: '700',
    marginBottom: 20,
  },
  textoPoliticas: {
    textAlign: 'justify',
    fontSize: 17,
    marginBottom: 7,
  },
});

export default SobreHemo;