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
    const tipos = [
        { key: "1", value: "Não sei" },
        { key: "2", value: "A+" },
        { key: "3", value: "A-" },
        { key: "4", value: "B+" },
        { key: "5", value: "B-" },
        { key: "6", value: "AB+" },
        { key: "7", value: "AB-" },
        { key: "8", value: "O+" },
        { key: "9", value: "O-" },
    ];

    const schemaPerfilDoador = yup.object().shape({
        nome: yup.string().required("Informe seu nome"),
        sobrenome: yup.string().required("Informe seu sobrenome"),
        dataNascimento: yup.date().required("Informe sua data de nascimento")
            .test("idade-minima", "Você deve ter pelo menos 16 anos", (value) => {
                return validateAge(value);
            }),
        cpf: yup.string().required("Informe seu CPF"),
        tipoSanguineo: yup.string().required("Selecione um tipo sanguíneo")
    });



    const { control, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schemaPerfilDoador)
    });

    const navigation = useNavigation();
    const [currentStep, setCurrentStep] = useState(1);
    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const validateStep = async () => {
        const result = await trigger();
        if (result) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    };

    const onSubmit = (data) => {
        alert('Cadastro concluído!');
        console.log(data);
    };

    const onChangeDate = (event, selectedDate) => {
        setShow(false); // Fecha o DatePicker
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Formatação da data
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Função de validação de idade mínima
    const validateAge = (date) => {
        if (!date) return false; // Certifique-se de que a data é válida
        const today = new Date();
        const minAgeDate = new Date(today.getFullYear() - 16, today.getMonth(), today.getDate());
        return date <= minAgeDate;
    };

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    const [value, setValue] = useState('');

    // Função para garantir que o valor é um número
    const handleChange = (text) => {
        // Permite apenas números
        const numericValue = text.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    //encontrar endereço pelo CEP
    const [cep, setCep] = useState('');

    useEffect(() => {
        const fetchAddress = async () => {
            if (cep.length === 8) {
                try {
                    const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                    const data = response.data;
                    console.log('Dados obtidos:', data); // Verifique os dados aqui
                    if (data && !data.erro) {
                        setValue('endereco', data.logradouro);
                        setValue('bairro', data.bairro);
                        setValue('cidade', data.localidade);
                        setValue('estado', data.uf);
                        trigger(); // Força a re-renderização do formulário
                    } else {
                        setValue('endereco', '');
                        setValue('bairro', '');
                        setValue('cidade', '');
                        setValue('estado', '');
                        trigger(); // Força a re-renderização do formulário
                    }
                } catch (error) {
                    console.error("Erro ao buscar endereço:", error);
                    setValue('endereco', '');
                    setValue('bairro', '');
                    setValue('cidade', '');
                    setValue('estado', '');
                    trigger(); // Força a re-renderização do formulário
                }
            }
        };
    }, [cep, setValue, trigger]);



    return (
        <SafeAreaView style={styles.container}>
            {currentStep === 1 && (
                <View style={styles.stepContainer}>
                    <View style={styles.voltarContainer}>
                        <TouchableOpacity onPress={() => navigation.navigate('CadastroEscolha')}>
                            <AntDesign name="arrowleft" size={24} color="#7A0000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerImg}>
                        <Image style={styles.logo} source={require('../assets/img/logoHemoglobina.png')} />
                    </View>
                    <View style={styles.txtTopContainer}>
                        <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                        <Text style={styles.txtSecundario}>Perfil do doador</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <Controller
                            control={control}
                            name='nome'
                            render={({ field: { onChange, onBlur, value } }) =>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Nome'
                                    placeholderTextColor='#000'
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            }
                        />
                        {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}

                        <Controller
                            control={control}
                            name='sobrenome'
                            render={({ field: { onChange, onBlur, value } }) =>
                                <TextInput
                                    style={styles.input}
                                    placeholder='Sobrenome'
                                    placeholderTextColor='#000'
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            }
                        />
                        {errors.sobrenome && <Text style={styles.labelError}>{errors.sobrenome.message}</Text>}

                        <Controller
                            control={control}
                            name="dataNascimento"
                            render={({ field: { onChange, value } }) => (
                                <>
                                    <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                                        <Text>
                                            {value ? formatDate(value) : 'Data de Nascimento'}
                                        </Text>
                                    </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                            value={value || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={(event, selectedDate) => {
                                                setShow(false); // Fecha o DateTimePicker após selecionar a data
                                                onChange(selectedDate); // Atualiza o valor do Controller
                                            }}
                                        />
                                    )}
                                </>
                            )}
                        />
                        {errors.dataNascimento && <Text style={styles.labelError}>{errors.dataNascimento.message}</Text>}


                        <Controller
                            control={control}
                            name='cpf'
                            render={({ field: { onChange, onBlur, value } }) =>
                                <TextInput
                                    style={styles.input}
                                    placeholder='CPF'
                                    placeholderTextColor='#000'
                                    onChangeText={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    keyboardType='numeric'
                                />
                            }
                        />
                        {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}

                        <Controller
                            control={control}
                            name='tipoSanguineo'
                            render={({ field: { onChange, onBlur, value } }) =>
                                <SelectList
                                    setSelected={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                    data={tipos}
                                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                    search={false}
                                    placeholder='Tipo Sanguíneo'
                                    boxStyles={styles.boxStyles}
                                    dropdownItemStyles={styles.dropdownItemStyles}
                                    dropdownStyles={styles.dropdownStyles}
                                />
                            }
                        />
                        {errors.tipoSanguineo && <Text style={styles.labelError}>{errors.tipoSanguineo.message}</Text>}
                    </View>
                    <TouchableOpacity onPress={validateStep} style={styles.BtProx}>
                        <Text style={styles.txtBtProx}>Avançar</Text>
                    </TouchableOpacity>
                </View>
            )}

            {currentStep === 2 && (
                <View style={styles.stepContainer}>
                    <View style={styles.voltarContainer}>
                        <TouchableOpacity onPress={handleBack}>
                            <AntDesign name="arrowleft" size={24} color="#7A0000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerImg}>
                        <Image style={[styles.logo, { marginTop: '-15%' }]} source={require('../assets/img/logoHemoglobina.png')} />
                    </View>
                    <View style={styles.txtTopContainer}>
                        <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                        <Text style={styles.txtSecundario}>Editar endereço</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        
                        


                        <TouchableOpacity style={styles.BtProx} onPress={() => fetchAddress}>
                            <Text style={styles.txtBtProx}>Próximo</Text>
                        </TouchableOpacity>

                    </View>

                </View>
            )}

            {currentStep === 3 && (
                <View style={styles.stepContainer}>
                    <View style={styles.voltarContainer}>
                        <TouchableOpacity onPress={handleBack}>
                            <AntDesign name="arrowleft" size={24} color="#7A0000" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.containerImg}>
                        <Image style={[styles.logo, { marginTop: '-35%' }]} source={require('../assets/img/logoHemoglobina.png')} />
                    </View>
                    <View style={styles.txtTopContainer}>
                        <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                        <Text style={styles.txtSecundario}>Finalize seu cadastro</Text>
                    </View>

                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder='E-mail'
                            placeholderTextColor='#000'
                        />
                        <InputSenhaCad />
                        <View style={styles.termos}>
                            <TouchableOpacity
                                style={styles.checkboxContainer}
                                onPress={toggleCheckbox}
                            >
                                <Ionicons
                                    name={isChecked ? 'checkbox' : 'square-outline'}
                                    size={24}
                                    color="black"
                                />
                                <Text style={styles.label}>
                                    Declaro que li e concordo com os
                                    <Text style={styles.link}>
                                        Termos de Uso
                                    </Text>
                                    e com a
                                    <Text style={styles.link}>
                                        Política de Privacidade
                                    </Text>
                                </Text>
                            </TouchableOpacity>
                        </View>


                        <TouchableOpacity style={styles.BtProx} onPress={() => navigation.navigate('HomeDoador')}>
                            <Text style={styles.txtBtProx}>Próximo</Text>
                        </TouchableOpacity>

                    </View>

                </View>
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
