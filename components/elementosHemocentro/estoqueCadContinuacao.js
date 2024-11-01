import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import AntDesign from '@expo/vector-icons/AntDesign';

const EstoqueScreen = ({ route }) => {

  const navigation = useNavigation();

  const { type } = route.params;
  const [quantidade, setQuantidade] = useState('');

  const handleVoltar = () => {
    // Navegar para a tela anterior
    navigation.goBack(); // Implemente a navegação
  };

  const handleSalvar = () => {
    // Processar o salvamento da quantidade no estoque
    console.log(`Quantidade de ${type}: ${quantidade} ml`);
    // Você pode implementar a lógica para salvar essa informação em um banco de dados ou servidor aqui
  };

  return (
   

    <SafeAreaView style={styles.container}>
      <View style={styles.stepContainer}>
      <View style={styles.voltarContainer}>
        
        <TouchableOpacity onPress={handleVoltar}>
          <AntDesign name="arrowleft" size={24} color="#7A0000" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImg}>
       <Image style={styles.logo} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} />  
      </View>
      <View style={styles.txtTopContainer}>
          <Text style={styles.txtPrincipal}>Atualize seu estoque</Text>
      </View>

      <View style={styles.textoSanguineo}>
        <Text style={styles.type}>{type}</Text>
      </View>
      

      <TextInput
        style={styles.input}
        placeholder="Quantidade atual (em ml)"
        keyboardType="numeric"
        value={quantidade}
        onChangeText={setQuantidade}
      />

      <TouchableOpacity style={styles.BtProx} onPress={handleSalvar}>
        <Text style={styles.txtBtProx}>Salvar</Text>
      </TouchableOpacity>

    </View>
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  type: {
    fontSize: 25,
    color: '#000',
    
  },
  textoSanguineo: {
    backgroundColor: '#EEF0EB',
    width: 120,
    height: 120,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 100,
    marginBottom: 20,
    marginTop: 20,
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#EEF0EB',
    paddingHorizontal: 8,
    borderRadius: 7,
    paddingLeft: 20,
    fontFamily: 'DM-Sans',
    marginTop: 10,
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  voltarContainer: {
    position: 'absolute',
    top: 25,
    left: 16,
  },
  containerImg: {
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: '-20%',
  },
  txtTopContainer: {
    marginBottom: 20,
  },
  txtPrincipal: {
    fontSize: 24,
    color: '#470404',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  BtProx: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: '15%',
    width: '60%',
    alignSelf: 'center'
  },
  txtBtProx: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EstoqueScreen;