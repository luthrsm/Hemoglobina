import { Text, SafeAreaView, StyleSheet, View, TouchableOpacity, Image } from 'react-native';
import React, { useState } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native'

const CadastroEscolha = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>

            <View style={styles.tudoJunto}>
                <Image style={styles.logo} source={require('../assets/img/logoHemoglobina.png')} />

                <View style={styles.dentroCad}>

                    <Text style={styles.textoBranco1}>Realize o seu cadastro</Text>

                    <View styles={styles.ordemTam}>
                        <Text style={styles.textoBranco2}>E faça parte de uma comunidade de doadores e hemocentros</Text>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HemoTela')} >

                            <Text style={styles.buttonText}>Hemocentro</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('CadastroDoador')} >

                            <Text style={styles.buttonText}>Doador</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.button1} onPress={() => navigation.navigate('LoginEscolha')} >
                            <Text style={styles.textoBrancoLink}>Já tem uma conta? Clique aqui.</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>

        </SafeAreaView>
    );
}

export default CadastroEscolha;


const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 8,
        width: '100%',
        alignItems: 'center',
        backgroundColor: '#ffff',
    },
    tudoJunto: {
        top: 100,
        alignItems: 'center',
    },
    textoBranco1: {
        fontSize: 20,
        color: 'white',
        textAlign: 'center',
    },
    textoBranco2: {
        fontSize: 10,
        marginTop: 20,
        color: 'white',
        marginBottom: 20,
        textAlign: 'center',
    },
    textoBrancoLink: {
        fontSize: 11,
        color: 'white',
        marginBottom: 30,
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
    ordemTam: {
        width: 250,
    },
    button: {
        width: 168,
        height: 50,
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
