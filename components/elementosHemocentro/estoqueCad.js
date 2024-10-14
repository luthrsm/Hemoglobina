import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native'; // Import useNavigation hook

import AntDesign from '@expo/vector-icons/AntDesign';

// onPress={onBack} do primeiro touchableOpacity

const HemocentroScreen = ({ formData, onDataChange, onNext, onBack }) => {

  const navigation = useNavigation();

  const [selectedType, setSelectedType] = useState(null);

  const handleTypePress = (type) => {
    setSelectedType(type);
    // Navegar para a tela de estoque com o tipo selecionado
    navigation.navigate('EstoqueScreen', { type }); // Implemente a navegação
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.stepContainer}>
      <View style={styles.voltarContainer}>
        <TouchableOpacity onPress={onBack}>
          <AntDesign name="arrowleft" size={24} color="#7A0000" />
        </TouchableOpacity>
      </View>
      <View style={styles.containerImg}>
        <Image style={styles.logo} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} /> 
      </View>
        <View style={styles.txtTopContainer}>
          <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
            <Text style={styles.txtSecundario}>Registrar banco de sangue</Text>
        </View>

      <View style={styles.inputContainer}>
        <View style={styles.regSangue}>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'A+' && styles.selectedButton]} onPress={() => handleTypePress('A+')}>
          <Text style={styles.buttonText}>A+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'B+' && styles.selectedButton]} onPress={() => handleTypePress('B+')}>
            <Text style={styles.buttonText}>B+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'AB+' && styles.selectedButton]} onPress={() => handleTypePress('AB+')}>
            <Text style={styles.buttonText}>AB+</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.regSangue}>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'O+' && styles.selectedButton]} onPress={() => handleTypePress('O+')}>
            <Text style={styles.buttonText}>O+</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'A-' && styles.selectedButton]} onPress={() => handleTypePress('A-')}>
            <Text style={styles.buttonText}>A-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'B-' && styles.selectedButton]} onPress={() => handleTypePress('B-')}>
            <Text style={styles.buttonText}>B-</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.regSangue}>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'O-' && styles.selectedButton]} onPress={() => handleTypePress('O-')}>
            <Text style={styles.buttonText}>O-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.botaoSangue, selectedType === 'AB-' && styles.selectedButton]} onPress={() => handleTypePress('AB-')}>
            <Text style={styles.buttonText}>AB-</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.botaoSangue}>
            
          </TouchableOpacity>
        </View>
        
        <TouchableOpacity style={styles.BtProx} onPress={onNext}>
            <Text style={styles.txtBtProx}>Próximo</Text>
        </TouchableOpacity>
      </View>
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
  selectedButton: {
    backgroundColor: '#AF2B2B', // Define a cor para o botão selecionado
    borderColor: '#AF2B2B',
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Cor do texto no botão selecionado
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarContainer: {
    position: 'absolute',
    top: 15,
    left: 3,
  },
  containerImg: {
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
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
  txtSecundario: {
    fontSize: 16,
    color: '#470404',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: '5%',
    width: '95%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  estoqueLogo: {
    width: 40,
    height: 40,
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
  regSangue:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 30,
    width: '80%',
    alignSelf: 'center',
    marginTop: 10
  },
  regSangueUltimo:{
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 130,
    width: '80%',
    alignSelf: 'center',
    alignItems: 'space-between',
    marginTop: 10 
  },
  botaoSangue:{
    backgroundColor: '#EEF0EB',
    width: 80,
    height: 80,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default HemocentroScreen;
