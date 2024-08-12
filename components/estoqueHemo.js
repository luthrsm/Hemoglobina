import { Text, SafeAreaView, StyleSheet, TextInput, Image, TouchableOpacity, View, FlatList } from 'react-native';

import InputSenha from '../assets/InputSenha';

import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';


const CadastroHemocentro = () => {
  //cria navegação
    const navigation = useNavigation();

    //estado pra saber qual etapa do cadastro está sendo usada
    const [currentStep, setCurrentStep] = useState(1);

    const [currentStepSangue, setCurrentStepSangue] = useState(1);

    //avança pra prox etapa do registro do sangue no hemocentro
    const handleNextSangue = () => {
        setCurrentStepSangue((prevStep) => prevStep + 1);
    };

    //avança pra prox etapa
    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep = 1);
    };

    //volta para a etapa anterior
    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    }

    //é chamado quando a etapa final é concluída
    const handleSubmit = () => {
        alert('Cadastro concluído!');
    }


    return (
        <SafeAreaView style={styles.container}>

            {currentStepSangue === 1 && (
                <View style={styles.stepContainer}>
                    <View style={styles.voltarContainer}>
                        <TouchableOpacity onPress={handleBack}>
                            <AntDesign name="arrowleft" size={24} color="#7A0000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerImg}>
                        <Image style={[styles.logo, { marginTop: '-35%' }]} source={require('../imagens/hemoglobina.png')} />
                    </View>

                </View>
            )}



        </SafeAreaView>
    )
}


const styles = StyleSheet.create({
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
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        fontFamily: 'DM-Sans'
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
    inputBottomContainer: {
        flexDirection: "row",
        gap: 20,
    },
    inputBottom: {
        height: 50,
        width: '47%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        fontFamily: 'DM-Sans'
    },

    regSangue:{
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 30,
      width: '80%',
      alignItems: 'center'
    },
    regSangueUltimo:{
      flexDirection: 'row',
      justifyContent: 'center',
      gap: 130,
      width: '80%',
      alignItems: 'space-between', 
    },
    botaoSangue:{
      backgroundColor: '#EEF0EB',
      width: 70,
      height: 70,
      borderRadius: 70,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
    },

    termos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
    },
    link: {
        textDecorationLine: 'underline',
        color: '#326771',
    }
});