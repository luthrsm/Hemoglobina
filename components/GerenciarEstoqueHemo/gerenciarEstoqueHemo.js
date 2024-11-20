import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, SafeAreaView, Image,Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook
import { getFirestore, doc, updateDoc, setDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

import AntDesign from '@expo/vector-icons/AntDesign';
import MenuHemocentro from '../menu/menuHemocentro';

const GerenciarEstoqueHemo = ({ route }) => {

  const navigation = useNavigation();
  const { type, quantidades } = route.params;
  const [quantidade, setQuantidade] = useState(''); // Preencher com a quantidade se já houver
  const [updatedQuantities, setUpdatedQuantities] = useState(quantidades);

  const handleVoltar = () => {
    navigation.goBack();
  };

  const handleSalvar = async () => {
    if (isNaN(quantidade) || quantidade < 0) {
      Alert.alert('Erro', 'Por favor, insira uma quantidade válida.');
      return;
    }
    
  
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (user) {
      const db = getFirestore();
      const hemocentroRef = doc(db, 'Hemocentro', user.uid);
  
      try {
        
        const estoqueAtualizado = {
          [`estoque.${type}`]: quantidade, 
        };
  
        
        await updateDoc(hemocentroRef, estoqueAtualizado);
        setUpdatedQuantities(prevQuantities => ({
          ...prevQuantities,
          [type]: quantidade,
        }));
        Alert.alert(`Estoque de ${type} salvo com sucesso. Quantidade atual: ${quantidade} ml.`);
        console.log(`Quantidade de ${type}: ${quantidade} ml`);
        navigation.goBack();
      } catch (error) {
        console.error("Erro ao salvar estoque:", error);
        Alert.alert('Erro', 'Ocorreu um erro ao salvar o estoque.');
      }
    } else {
      Alert.alert('Erro', 'Usuário não autenticado');
    }
  };

  return (

    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Banco de sangue - Hemocentro </Text>
      </View>
      <View style={styles.stepContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={handleVoltar}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>
      
        <View style={styles.txtTopContainer}>
            <Text style={styles.txtPrincipal}>Atualize seu estoque</Text>
        </View>

        <View style={styles.textoSanguineo}>
          <Text style={styles.type}>{type}</Text>
        </View>
        

        <TextInput
          style={styles.input}
          placeholder="Quantidade atual (em litros)"
          keyboardType="numeric"
          value={quantidade}
          onChangeText={setQuantidade}
        />

        <TouchableOpacity style={styles.BtProx} onPress={handleSalvar}>
          <Text style={styles.txtBtProx}>Salvar</Text>
        </TouchableOpacity>

      </View>
      <MenuHemocentro />
    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    //padding: 16,
  },
  type: {
    fontSize: 25,
    color: '#000',
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

export default GerenciarEstoqueHemo;
