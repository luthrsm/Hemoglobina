import { StyleSheet, Text, View, TouchableOpacity, TextInput, Image } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';

//icons
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

import { useNavigation } from '@react-navigation/native';

const Apositivo = () => {

  const navigation = useNavigation();

    return (
        <View style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('HemoTela')}>
                  <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
              <Image style={styles.logo} source={require('../img/hemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
              <Text style={styles.txtPrincipal}>Atualize seu estoque</Text>
            </View>

            <View style={styles.inputContainer}>
              <View style={styles.text}>
                <Text style={styles.textoText}>A+</Text>
              </View>
                        
              <TextInput
                style={styles.input}
                placeholder='Quantidade atual no estoque (em ml)'
                placeholderTextColor='#000'
              />


              <TouchableOpacity style={styles.BtProx} onPress={() => navigation.navigate('HemoTela')}>
                <Text style={styles.txtBtProx}>Voltar</Text>
              </TouchableOpacity>

            </View>

        </View>
    )
}

export default Apositivo

const styles = StyleSheet.create({
    text: {
      backgroundColor: '#EEF0EB',
      width: 190,
      height: 190,
      borderRadius: 190,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom: 10,
      
    },
    textoText: {
      fontSize: 35,
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
    inputContainer: {
        marginTop: '5%',
        width: '65%',
        justifyContent: 'center',
        alignItems: 'center',
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
        marginTop: 20,
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

});