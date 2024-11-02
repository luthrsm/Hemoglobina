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
import InputSenha from '../../components/elementosHemocentro/inputSenha';

const LoginHemocento = () => {
    const navigation = useNavigation();


    return (
        <View style={styles.container}>
            <View style={styles.voltarContainer}>
              <TouchableOpacity onPress={() => navigation.navigate('LoginEscolha')}>
                  <AntDesign name="arrowleft" size={24} color="#7A0000" />
              </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={styles.logo} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Fazer Login</Text>
                <Text style={styles.txtSecundario}> Hemocentro</Text>
            </View>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    placeholder='Email'
                    placeholderTextColor='#000'

                />
                <InputSenha/>

                <TouchableOpacity style={styles.BtProx} onPress={() => navigation.navigate('HomeHemocentro')}>
                  <Text style={styles.txtBtProx}>Próximo</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default LoginHemocento;

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
      top: 40,
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
})