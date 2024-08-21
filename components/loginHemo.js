import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native';

import InputSenha from './inputSenha';

import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

//navigation
import { useNavigation } from '@react-navigation/native';

const MenuDoador = () => {

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.stepContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('EntrarLogin')}>
                        <AntDesign name="arrowleft" size={24} color="#7A0000" />
                    </TouchableOpacity>
                </View>
                <View style={styles.containerImg}>
                    <Image style={[styles.logo, { marginTop: '-35%' }]} source={require('../assets/img/hemoglobina.png')} />
                </View>
                <View style={styles.txtTopContainer}>
                    <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
                    <Text style={styles.txtSecundario}>Finalize seu cadastro</Text>
                </View>

                <View style={styles.inputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='E-mail'
                        placeholderTextColor='#000'
                    />
                    <InputSenha />

                    <TouchableOpacity style={styles.BtProx} onPress={() => navigation.navigate('HomeHemocentro')}>
                        <Text style={styles.txtBtProx}>Próximo</Text>
                    </TouchableOpacity>

                </View>

            </View>
        </SafeAreaView>
    )
}

export default MenuDoador

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

});