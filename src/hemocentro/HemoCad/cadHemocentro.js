import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import InputSenhaCad from '../../components/elementosHemocentro/inputSenhaCad';
import AddressForm from '../../components/elementosHemocentro/cep'
import PerfilHemocentro from '../../components/elementosHemocentro/perfilHemocentro';
import Estoque from '../../components/elementosHemocentro/estoqueCad'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

const CadastroHemocentro = () => {


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
                <PerfilHemocentro formData={formData}
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
                <Estoque
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)} />
            )}

            {currentStep === 4 && (
                <InputSenhaCad
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)} />
            )}
        </SafeAreaView>
    )
}

export default CadastroHemocentro;

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
});