import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet, Text, Image, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';

import { auth, db } from '../../src/Services/firebaseConfig';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, collection } from 'firebase/firestore';

// Definição do esquema de validação com yup
const schema = yup.object().shape({
    email: yup
        .string()
        .email('Endereço de email inválido')
        .required('O email é obrigatório'),
    senha: yup
        .string()
        .min(6, 'A senha deve ter pelo menos 6 caracteres')
        .required('A senha é obrigatória'),
    confirmarSenha: yup
        .string()
        .oneOf([yup.ref('senha'), null], 'As senhas devem corresponder')
        .required('A confirmação da senha é obrigatória'),
    isChecked: yup
        .boolean()
        .oneOf([true], 'Você deve concordar com os Termos de Uso e Política de Privacidade'),
});

const InputSenhaCad = () => {
    const navigation = useNavigation();
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const handleCheckboxToggle = () => {
        setIsChecked(prev => !prev);
    };

    const handleSignUp = async (data) => {
        if (!isChecked) {
            alert("Por favor, aceite os termos de uso e a política de privacidade.");
            return;
        }

        const { email, senha } = data;

        try {
            // Cria a conta com e-mail e senha no Firebase Auth
            const userCredential = await createUserWithEmailAndPassword(auth, email, senha);
            const { uid } = userCredential.user;

            const doadorRef = doc(collection(db, 'Hemocentro'), uid);

            // Criando o documento no Firestore
            await setDoc(doadorRef, {
                Email: email,
                cadastroCompleto: false
            });


            navigation.navigate('PerfilHemocentro', { uid });
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                Alert.alert('Erro', 'Email já cadastrado.');
            } else {
                Alert.alert('Erro', error.message || 'Ocorreu um erro.');
            }
        }
    };

    return (
        <View style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={[styles.logo, { marginTop: '-15%' }]} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
                <Text style={styles.txtSecundario}>Inicie seu cadastro</Text>
            </View>

            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="email"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.inputEmail}
                            placeholder='E-mail'
                            placeholderTextColor='#000'
                            onChangeText={onChange}
                            onBlur={onBlur}
                            value={value}
                        />
                    )}
                />
                {errors.email && <Text style={styles.labelError}>{errors.email.message}</Text>}

                <Controller
                    control={control}
                    name="senha"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.containerBotao}>
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Senha"
                                secureTextEntry={!isPasswordVisible1}
                                placeholderTextColor="#000"
                                onBlur={onBlur}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setIsPasswordVisible1(!isPasswordVisible1)}
                            >
                                <Ionicons
                                    name={isPasswordVisible1 ? 'eye' : 'eye-off'}
                                    size={24}
                                    color="#7A0000"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.senha && <Text style={styles.labelError}>{errors.senha.message}</Text>}

                <Controller
                    control={control}
                    name="confirmarSenha"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <View style={styles.containerBotao}>
                            <TextInput
                                style={styles.input}
                                value={value}
                                onChangeText={onChange}
                                placeholder="Confirmar Senha"
                                secureTextEntry={!isPasswordVisible2}
                                placeholderTextColor="#000"
                                onBlur={onBlur}
                            />
                            <TouchableOpacity
                                style={styles.iconContainer}
                                onPress={() => setIsPasswordVisible2(!isPasswordVisible2)}
                            >
                                <Ionicons
                                    name={isPasswordVisible2 ? 'eye' : 'eye-off'}
                                    size={24}
                                    color="#7A0000"
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                />
                {errors.confirmarSenha && <Text style={styles.labelError}>{errors.confirmarSenha.message}</Text>}

                <View style={styles.termos}>
                    <TouchableOpacity style={styles.checkboxContainer} onPress={handleCheckboxToggle}>
                        <Ionicons
                            name={isChecked ? 'checkbox' : 'square-outline'}
                            size={24}
                            color="black"
                        />
                    </TouchableOpacity>

                    <Text style={styles.label}>
                        Li e estou de acordo com o{'   '}
                        <TouchableOpacity style={styles.btLink} onPress={() => navigation.navigate('TermosCad')}>
                            <Text style={styles.link}>Termo de Uso</Text>
                        </TouchableOpacity>{'    '}
                        e{'    '}
                        <TouchableOpacity style={styles.btLink} onPress={() => navigation.navigate('PoliticasCad')}>
                            <Text style={styles.link}>Política de Privacidade</Text>
                        </TouchableOpacity>
                    </Text>
                    {errors.isChecked && <Text style={styles.labelError}>{errors.isChecked.message}</Text>}
                </View>

                <TouchableOpacity style={styles.BtProx} onPress={handleSubmit(handleSignUp)}>
                    <Text style={styles.txtBtProx}>Próximo</Text>
                </TouchableOpacity>

            </View>

        </View>
    );
};

export default InputSenhaCad;

const styles = StyleSheet.create({
    containerBotao: {
        flexDirection: 'row',
        height: 50,
        width: '100%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        alignItems: 'center',
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
    input: {
        flex: 1,
        height: 40,
        fontFamily: 'DM-Sans',
        border: 'none',
    },
    iconContainer: {
        paddingHorizontal: 5,
    },
    termos: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 7,
        marginRight: 7,
        width: '100%',
        
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
        alignContent: 'center',
        width: '100%',
    },
    link: {
        textDecorationLine: 'underline',
        color: '#326771',
    },
    inputContainer: {
        marginTop: '5%',
        width: '95%',
        justifyContent: 'center',
        alignItems: 'center',
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
    labelError: {
        alignSelf: 'flex-start',
        color: '#AF2B2B',
        marginBottom: 8,
    },
    inputEmail: {
        height: 50,
        width: '100%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        border: 'none',
        fontFamily: 'DM-Sans',
        justifyContent: 'center'
    },
    txtBtProx: {
        color: '#fff',
        fontSize: 16,
    },
});