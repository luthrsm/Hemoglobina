import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import AntDesign from '@expo/vector-icons/AntDesign';




const LoginEscolha = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('CadastroEscolha')}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>

            <View style={styles.tudoJunto}>
                <Image style={styles.logo} source={require('../assets/img/logoHemoglobina.png')} />

                <View style={styles.dentroCad}>

                    <Text style={styles.textoBranco1}>Realize o seu login</Text>

                    <View styles={styles.ordemTam}>
                        <Text style={styles.textoBranco2}>E contribua com a rede de doadores</Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginHemo')} >

                            <Text style={styles.buttonText}>Hemocentro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('LoginDoador')} >
                            <Text style={styles.buttonText}>Doador</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}

export default LoginEscolha;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    voltarContainer: {
        position: 'absolute',
        top: 50,
        left: 16,
    },
    tudoJunto: {
        top: 100,
        alignItems: 'center',
    },
    textoBranco1: {
        fontSize: 20,
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
    textoBranco2: {
        fontSize: 13,
        marginTop: 20,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    textoBrancoLink: {
        fontSize: 17,
        color: 'white',
        marginBottom: 30,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    ordemTam: {
        width: 250,
    },
    button: {
        height: 50,
        width: 168,
        marginBottom: 25,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        backgroundColor: '#EEF0EB',
    },
    buttonText: {
        fontSize: 13,
        color: '#000',
        textAlign: 'center',
    },
    dentroCad: {
        top: 70,
        padding: 20,
        width: 270,
        height: 298,
        color: 'white',
        borderRadius: 15,
        alignItems: 'center',
        backgroundColor: '#AF2B2B',
    },
    logo: {
        width: 80,
        height: 80,
    },
});
