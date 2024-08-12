import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import InputSenhaCad from '../components/inputSenhaCad';
import AddressForm from '../components/cep'
import PerfilDoador from '../components/perfilDoador';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';




// Validação CPF
const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, '');
    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;

    let sum = 0;
    let remainder;
    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
};

const CadastroDoador = () => {


    const [formData, setFormData] = useState({});
    const [currentStep, setCurrentStep] = useState(1);

    const navigation = useNavigation();

    const handleDataChange = (newData) => {
        setFormData(prevData => ({ ...prevData, ...newData }));
    };

    const handleSubmit = () => {
        console.log('Dados finais:', formData);
        // Enviar dados para o servidor ou realizar outra ação
    };

    const validateStep = () => {
        // Aqui você pode adicionar lógica de validação de cada etapa
        setCurrentStep(prevStep => prevStep + 1);
    };

    return (
        <SafeAreaView style={styles.container}>
            {currentStep === 1 && (
                <PerfilDoador formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)} />
            )}

            {currentStep === 2 && (
                <AddressForm
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)} />
            )}

            {currentStep === 3 && (
                <InputSenhaCad
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)} />
            )}
        </SafeAreaView>
    )
}

export default CadastroDoador;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul 


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    stepContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    voltarContainer: {
        position: 'absolute',
        top: 25,
        left: 16,
    },
    containerImg: {
        marginBottom: 20,
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
    txtSecundario: {
        fontSize: 16,
        color: '#470404',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center'
    },
    inputContainer: {
        marginTop: '5%',
        width: '95%',
    },
    input: {
        height: 50,
        width: '100%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        fontFamily: 'DM-Sans',
        justifyContent: 'center'
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
    termos: {
        flexDirection: 'row',
        alignItems: 'center',
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
    },
    labelError: {
        alignSelf: 'flex-start',
        color: '#AF2B2B',
        marginBottom: 8,
    },
    boxStyles: {
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',

    },
    dropdownStyles: {
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',
        marginTop: '',
        marginBottom: '5%'
    },
});
