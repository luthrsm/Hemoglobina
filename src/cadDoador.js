import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import React, { useState, useEffect, Component } from 'react';
import { useNavigation } from '@react-navigation/native'
import { useForm, Controller } from 'react-hook-form'; //verificação do formulário
import { yupResolver } from '@hookform/resolvers/yup'; //verficação do formulário
import * as yup from 'yup'; //verficação do formulário
import { SelectList } from 'react-native-dropdown-select-list';  //dropdown tipo sanguineo
import { format, parse } from 'date-fns'; //manipulação de data
import DateTimePicker from '@react-native-community/datetimepicker' //input de data

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

//components
import CadastroEscolha from './cadEscolha';
import InputSenhaCad from '../components/inputSenhaCad';

//testar CPF
const isValidCPF = (cpf) => {
    cpf = cpf.replace(/[^\d]+/g, ''); //remove todos os caracteres não numéricos

    if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false; //verifica se o cpf tem 11 dígitos e se todos os digitos são iguais

    //lógica de verificação dos 2 primeiros dígitos e dos dois últimos

    let sum = 0;
    let remainder;

    for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0;
    if (remainder !== parseInt(cpf.substring(9, 10))) return false;
    sum = 0;
    for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    remainder = (sum * 10) % 11;
    if (remainder === 10 || remainder === 11) remainder = 0; if (remainder !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}



const CadastroDoador = () => {

    const tiposValidos = [
        "A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-", "Não sei"
    ];
    const schemaPerfilDoador = yup.object({
        nome: yup.string().required("Informe seu nome"),
        sobrenome: yup.string().required("Informe seu sobrenome"),
        dataNascimento: yup.date().required("Informe sua data de nascimento").test(
            "idade-minima",
            "Você deve ter pelo menos 16 anos",
            function (value) {
                //pega a data do dia
                const hoje = new Date();
                //subtrai 16 anos à data do dia
                const data16AnosAtras = new Date(
                    today.getFullYear() - 16,
                    today.getMonth(),
                    today.getDate()
                );
                //verifica se a data de nascimento é anterior à data mínima de 16 anos
                return value <= data16AnosAtras;
            }
        ),
        cpf: yup.string().required("Informe seu CPF").test("is-valid-cpf", "CPF inválido", value => isValidCPF(value)),
        tipoSanguineo: yup.string().oneOf(tiposValidos, "Selecione uma opção válida").required("Selecione um tipo sanguíneo")
    })
    const { control, handleSubmit, formState: { errors }, trigger } = useForm({
        resolver: yupResolver(schemaPerfilDoador)
    });

    const validateStep = async (step) => {
        const result = await trigger();
        if (result) {
            setCurrentStep(step);
        }
    };

    //cria navegação
    const navigation = useNavigation();

    //estado pra saber qual etapa do cadastro está sendo usada
    const [currentStep, setCurrentStep] = useState(1);

    //avança pra prox etapa

    const handleNext = async () => {
        const result = await trigger();
        if (result) {
            setCurrentStep(prevStep => prevStep + 1);
        }
    };

    //volta para a etapa anterior
    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    }

    //é chamado quando a etapa final é concluída
    const onSubmit = (data) => {
        alert('Cadastro concluído!');
        console.log(data);
    }

    const [value, setValue] = useState('');

    // Função para garantir que o valor é um número
    const handleChange = (text) => {
        // Permite apenas números
        const numericValue = text.replace(/[^0-9]/g, '');
        setValue(numericValue);
    };

    //checkbox
    const [isChecked, setIsChecked] = useState(false);

    const toggleCheckbox = () => {
        setIsChecked(!isChecked);
    };

    //datePicker
    const [date, setDate] = useState();  //atribui a data atual se 'date' estiver vazia
    const [show, setShow] = useState(false);

    const onChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShow(Platform.OS === 'ios');
        setDate(currentDate);
    }

    const showDatepicker = () => {
        setShow(true);
    };

    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    //dropdown tipo sanguíneo
    const [selected, setSelected] = React.useState("");


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
                                    onChange={onChange}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            }
                        />



                        {errors.sobrenome && <Text style={styles.labelError}>{errors.sobrenome.message}</Text>}


                        <Controller
                            control={control}
                            name='dataNascimento'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <>
                                    <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                                        <Text>
                                            {date ? formatDate(date) : 'Data de Nascimento'}
                                        </Text>
                                    </TouchableOpacity>
                                    {show && (
                                        <DateTimePicker
                                            testID="dateTimePicker"
                                            value={date || new Date()}
                                            mode="date"
                                            display="default"
                                            onChange={onChange}
                                            onBlur={onBlur}
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
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}

                                />
                            }
                        />



                        {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}


                        <Controller
                            control={control}
                            name='tipoSanguineo'
                            render={({ field: { onChange, onBlur, value } }) =>
                                <SelectList
                                    setSelected={setSelected}
                                    fontFamily='DM-Sans'
                                    data={tipos}
                                    arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                    searchicon={<FontAwesome name="search" size={12} color={'black'} />}
                                    search={false}
                                    placeholder='Tipo Sanguíneo'
                                    boxStyles={styles.boxStyles}
                                    dropdownItemStyles={styles.dropdownItemStyles}
                                    dropdownStyles={styles.dropdownStyles}
                                    onChange={onChange}
                                    onBlur={onBlur}
                                    value={value}
                                />
                            }
                        />


                        {errors.tipoSanguineo && <Text style={styles.labelError}>{errors.tipoSanguineo.message}</Text>}


                        <TouchableOpacity style={styles.BtProx} onPress={handleNext}>
                            <Text style={styles.txtBtProx}>Próximo</Text>
                        </TouchableOpacity>

                    </View>

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
                        <TextInput
                            style={styles.input}
                            placeholder='CEP'
                            keyboardType='numeric'
                            placeholderTextColor='#000'
                            onChangeText={handleChange}
                            value={value}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Endereço'
                            placeholderTextColor='#000'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Número'
                            placeholderTextColor='#000'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Bairro'
                            placeholderTextColor='#000'
                        />
                        <View style={styles.inputBottomContainer}>
                            <TextInput
                                style={styles.inputBottom}
                                placeholder='Cidade'
                                placeholderTextColor='#000'
                            />
                            <TextInput
                                style={styles.inputBottom}
                                placeholder='Estado'
                                placeholderTextColor='#000'
                            />
                        </View>


                        <TouchableOpacity style={styles.BtProx} onPress={handleNext}>
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
