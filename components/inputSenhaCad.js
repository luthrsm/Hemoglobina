import React, { useState } from 'react';
import { View, TextInput, Text, TouchableOpacity, SafeAreaView, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Ionicons } from '@expo/vector-icons';

// Definição do esquema de validação com yup
const schema = yup.object().shape({
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

const InputSenhaCad = ({ formData, onDataChange, onNext, onBack }) => {
    const navigation = useNavigation();
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);
    const [isChecked, setIsChecked] = useState(false);

    const { control, handleSubmit, formState: { errors }, getValues, trigger } = useForm({
        resolver: yupResolver(schema),
    });

    const handleCheckboxToggle = () => {
        setIsChecked(prev => !prev);
    };

    const validateStep = async () => {
        const result = await trigger(); // Valida todos os campos
        if (result) {
            const formData = getValues(); // Coleta os dados do formulário
            console.log('Dados do formulário:', formData); // Exibe os dados no console
            navigation.navigate('HomeDoador');
        }
    };

    return (
        <SafeAreaView style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={onBack}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={[styles.logo, { marginTop: '-15%' }]} source={require('../assets/img/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                <Text style={styles.txtSecundario}>Finalize seu cadastro</Text>
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
                    <TouchableOpacity
                        style={styles.checkboxContainer}
                        onPress={handleCheckboxToggle}
                    >
                        <Ionicons
                            name={isChecked ? 'checkbox' : 'square-outline'}
                            size={24}
                            color="black"
                        />
                        <Text style={styles.label}>
                            Declaro que li e concordo com os{' '}
                            <Text style={styles.link}>
                                Termos de Uso
                            </Text>
                            {' '}e com a{' '}
                            <Text style={styles.link}>
                                Política de Privacidade
                            </Text>
                        </Text>
                    </TouchableOpacity>
                    {errors.isChecked && <Text style={styles.labelError}>{errors.isChecked.message}</Text>}
                </View>


            </View>
            <TouchableOpacity style={styles.BtProx} onPress={onNext}>
                <Text style={styles.txtBtProx}>Cadastrar-se</Text>
            </TouchableOpacity>

        </SafeAreaView>
    );
};
export default InputSenhaCad;

const styles = StyleSheet.create({
    container: {
        padding: 5
    },
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
    input: {
        flex: 1,
        height: 40,
        fontFamily: 'DM-Sans',
    },
    iconContainer: {
        paddingHorizontal: 5,
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
    inputEmail: {
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
})


