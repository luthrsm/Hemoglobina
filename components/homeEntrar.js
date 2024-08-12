import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';

// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
//onClick={} onPress={}
// const Stack = createStackNavigator();

export default function App() {

  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.tudoJunto}>
      
        <Image style={styles.logo} source={require('../imagens/hemoglobina.png')}/>

        <View style={styles.dentroCad}>

          <Text style={styles.textoBranco1}>Realize o seu cadastro</Text>

          <View styles={styles.ordemTam}>
            <Text style={styles.textoBranco2}>E faça parte de uma comunidade de doadores e hemocentros</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Hemocentro')} >
              <Text style={styles.buttonText}>Hemocentro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Doador')} >
              <Text style={styles.buttonText}>Doador</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('EntrarLogin')} >
              <Text style={styles.textoBrancoLink}>Já tem uma conta? Clique aqui.</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EEF0EB',
  },
  tudoJunto: {
    top: 100,
    alignItems: 'center',
  },
  textoBranco1: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoBranco2: {
    fontSize: 17,
    marginTop: 20,
    color: 'white',
    marginBottom: 20,
    textAlign: 'center',
  },
  textoBrancoLink: {
    fontSize: 17,
    color: 'white',
    marginBottom: 30,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
  ordemTam: {
    width: 250,
  },
  button: {
    height: 70,
    width: 250,
    marginBottom: 25,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0EB',
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  dentroCad: {
    top: 70,
    padding: 20,
    width: '95%',
    color: 'white',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#AF2B2B',
  },
    logo: {
    width: 80,
    height: 80,
  },
});