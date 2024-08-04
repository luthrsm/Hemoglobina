import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState} from 'react';
import { useNavigation } from '@react-navigation/native'

import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

//components
import CadastroEscolha from './cadEscolha';
import MyDropDownPicker from '../components/dropDownPicker';
import InputSenha from '../components/inputSenha';

const CadastroDoador = () => {
    //cria navegação
    const navigation = useNavigation();

    //estado pra saber qual etapa do cadastro está sendo usada
    const [currentStep, setCurrentStep] = useState(1);


    //avança pra prox etapa
    const handleNext = () => {
        setCurrentStep((prevStep) => prevStep + 1);
    };

    //volta para a etapa anterior
    const handleBack = () => {
        setCurrentStep((prevStep) => prevStep - 1);
    }

    //é chamado quando a etapa final é concluída
    const handleSubmit = () => {
        alert('Cadastro concluído!');
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
                        <TextInput
                            style={styles.input}
                            placeholder='Nome'
                            placeholderTextColor='#000'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Sobrenome'
                            placeholderTextColor='#000'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='Data de nascimento'
                            placeholderTextColor='#000'
                        />
                        <TextInput
                            style={styles.input}
                            placeholder='CPF'
                            placeholderTextColor='#000'
                        />

                        <MyDropDownPicker style={styles.input} />

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
                        <InputSenha />
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


                        <TouchableOpacity style={styles.BtProx} onPress={console.log('cadastro concluído')}>
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
        top: 16,
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
    }
});
