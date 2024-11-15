import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import PerfilDoador from '../../../components/cadDoador/perfilDoador';
import AddressForm from '../../../components/cadDoador/cep';
import InputSenhaCad from '../../../components/cadDoador/inputSenhaCad';

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

// Função de validação de idade mínima
const validateAge = (date) => {
    if (!date) return false; // Certifique-se de que a data é válida
    const today = new Date();
    const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
    return date <= minAgeDate;
};


//esquemas de validação
const schemaCEP = yup.object().shape({
    cep: yup.string().required("Informe seu CEP").length(8, "O CEP deve ter 8 dígitos"),
    endereco: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
});

const schemaFinal = yup.object().shape({
    email: yup
        .string()
        .email('Endereço de email inválido')
        .required('O email é obrigatório'),
    senha: yup
        .string()
        .min(8, 'A senha deve ter pelo menos 8 caracteres')
        .required('A senha é obrigatória'),
    confirmarSenha: yup
        .string()
        .oneOf([yup.ref('senha'), null], 'As senhas devem corresponder')
        .required('A confirmação da senha é obrigatória'),
    isChecked: yup
        .boolean()
        .oneOf([true], 'Você deve concordar com os Termos de Uso e Política de Privacidade'),
});

const schemaPerfilDoador = yup.object().shape({
    nome: yup.string().required("Informe seu nome"),
    sobrenome: yup.string().required("Informe seu sobrenome"),
    dataNascimento: yup.date().required("Informe sua data de nascimento")
        .test("idade-minima", "Você deve ter pelo menos 16 anos", (value) => {
            return validateAge(value);
        }),
    cpf: yup.string().required("Informe seu CPF").test("valid-cpf", "Informe um CPF válido", (value) => {
        return isValidCPF(value)
    }

    ),
    tipoSanguineo: yup.string().required("Selecione um tipo sanguíneo"),

});

const CadastroDoador = () => {

    const [currentStep, setCurrentStep] = useState(1);
    const schemas = [schemaPerfilDoador, schemaCEP, schemaFinal];

    const {
        setValue,
        control,
        handleSubmit,
        formState: { errors },
        trigger,
    } = useForm({
        resolver: yupResolver(schemas[currentStep - 1]), // Usa o schema baseado na etapa atual
        defaultValues: formData,
        mode: 'onChange', // Modo de validação onChange para validação em tempo real
    });

    const getValidationSchema = () => {
        switch (currentStep) {
            case 1:
                return schemaPerfilDoador;
            case 2:
                return schemaCEP;
            case 3:
                return schemaFinal;
            default:
                return yup.object().shape({});
        }
    };

    const [formData, setFormData] = useState({});

    const navigation = useNavigation();

    const handleDataChange = (newData) => {
        setFormData(prevData => ({ ...prevData, ...newData }));
    };

    const validateStep = async () => {
        const isStepValid = await trigger(); // Valida a etapa atual
        if (isStepValid) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const onSubmit = (data) => {
        console.log('Final data:', data);
        // Navega para a próxima tela ou faz a submissão final
        navigation.navigate('HomeDoador');
    };

    return (
        <SafeAreaView style={styles.container}>
            {currentStep === 1 && (
                <PerfilDoador
                    control={control}
                    errors={errors}
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    onBack={() => navigation.navigate('CadastroEscolha')}
                />
            )}
            {currentStep === 2 && (
                <AddressForm
                    control={control}
                    errors={errors}
                    formData={formData}
                    onDataChange={handleDataChange}
                    onNext={validateStep}
                    setValue={setValue}
                    trigger={trigger}
                    onBack={() => setCurrentStep(prevStep => prevStep - 1)}
                />
            )}
            {currentStep === 3 && (
                <InputSenhaCad
                control={control}
                errors={errors}
                formData={formData}
                onDataChange={handleDataChange}
                onNext={handleSubmit(onSubmit)} // Valida a última etapa antes de finalizar
                onBack={() => setCurrentStep(prevStep => prevStep - 1)}
                />
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
