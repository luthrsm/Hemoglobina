import React, { useState } from 'react';
import { View, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const InputSenha = () => {
    const [password1, setPassword1] = useState('');
    const [isPasswordVisible1, setIsPasswordVisible1] = useState(false);
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [isPasswordVisible2, setIsPasswordVisible2] = useState(false);

    const togglePasswordVisibility1 = () => {
        setIsPasswordVisible1(!isPasswordVisible1);
    };

    const togglePasswordVisibility2 = () => {
        setIsPasswordVisible2(!isPasswordVisible2);
    };

    return (
        <View>
            <View style={styles.containerBotao}>
                <TextInput
                    style={styles.input}
                    value={password1}
                    onChangeText={setPassword1}
                    placeholder="Senha"
                    secureTextEntry={!isPasswordVisible1}
                    placeholderTextColor="#000"
                />
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={togglePasswordVisibility1}
                >
                    <Ionicons
                        name={isPasswordVisible1 ? 'eye' : 'eye-off'}
                        size={24}
                        color="#7A0000"
                    />
                </TouchableOpacity>
            </View>
            <View style={styles.containerBotao}>
                <TextInput
                    style={styles.input}
                    value={passwordConfirm}
                    onChangeText={setPasswordConfirm}
                    placeholder="Confirmar Senha"
                    secureTextEntry={!isPasswordVisible2}
                    placeholderTextColor="#000"
                />
                <TouchableOpacity
                    style={styles.iconContainer}
                    onPress={togglePasswordVisibility2}
                >
                    <Ionicons
                        name={isPasswordVisible2 ? 'eye' : 'eye-off'}
                        size={24}
                        color="#7A0000"
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

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
    input: {
        flex: 1,
        height: 40,
        fontFamily: 'DM-Sans'
    },
    iconContainer: {
        paddingHorizontal: 5,
    },
});

export default InputSenha;
