import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { Ionicons } from '@expo/vector-icons';
import { auth } from '../../Services/firebaseConfig';

const LoginDoador = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isPasswordVisible, setIsPasswordVisible] = useState(false);

    const togglePasswordVisibility = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleLogin = async () => {
        try {
            // Fazendo login com email e senha
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Login bem-sucedido!');
            navigation.navigate('HomeDoador'); // Navegar para a próxima tela após o login
        } catch (error) {
            console.error("Erro no login:", error.message);
            alert('Erro ao fazer login. Verifique suas credenciais.');
        }
    };

    return (
        <View style={styles.container}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('LoginEscolha')}>
                    <Ionicons name="arrow-back" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={styles.logo} source={require('../../../assets/img/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Fazer Login</Text>
                <Text style={styles.txtSecundario}> Doador de sangue</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    value={email}
                    onChangeText={setEmail}
                    placeholderTextColor="#000"
                />
                <View>
                    <View style={styles.containerBotao}>
                        <TextInput
                            style={styles.inputS}
                            value={password}
                            onChangeText={setPassword}
                            placeholder="Senha"
                            secureTextEntry={!isPasswordVisible}
                            placeholderTextColor="#000"
                        />
                        <TouchableOpacity
                            style={styles.iconContainer}
                            onPress={togglePasswordVisibility}
                        >
                            <Ionicons
                                name={isPasswordVisible ? 'eye' : 'eye-off'}
                                size={24}
                                color="#7A0000"
                            />
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.BtProx} onPress={handleLogin}>
                    <Text style={styles.txtBtProx}>Entrar</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default LoginDoador;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
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
        marginTop: '-45%',
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
    iconContainer: {
        paddingHorizontal: 5,
    },
    inputS: {
        flex: 1,
        height: 40,
        fontFamily: 'DM-Sans'
    },
});
