import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';

import MenuHemocentro from './menuHemocentro';
import { ScrollView } from 'react-native-gesture-handler';


const HomeDoador = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Bem vindo, hemocentro!</Text>
            </View>

            <ScrollView style={styles.mainContainer}>

                <TouchableOpacity style={styles.txtFotoContainer}>
                    <Text style={styles.txtTitle}>Gerencie o nível do banco de sangue do seu hemocentro</Text>
                    <View style={styles.fotoCont}>
                        <Image style={styles.image} source={require('../assets/img/grafico.png')} />
                    </View>
                </TouchableOpacity>

                <View style={styles.doacoesContainer}>
                    <Text style={styles.doacoesTxt}>Adicionar nova doação:</Text>
                    <TouchableOpacity style={styles.botaoAdDoacao}>
                        <Text style={styles.txtBotao}>Adicionar nova doação</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoAdDoacao}>
                        <Text style={styles.txtBotao}>Gerenciar banco de sangue</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>

            <MenuHemocentro/>
        </View>

    )
}

export default HomeDoador;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
        justifyContent: 'flex-end',
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: '9%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: '#EEF0EB',
        marginTop: 7,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5
    },
    mainContainer: {
        padding: 32,
        top: 20,
    },

    txtTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 16,
        color: '#470404'
    },
    maisTxt: {
        fontFamily: 'DM-Sans',
        color: '#326771',
        fontSize: 9.9,
        fontWeight: '600',
        lineHeight: 12.9,
    },

    txtFotoContainer: {
        marginBottom: 90,
        
    },
    txtBotao: {
        color: '#EEF0EB',
        fontFamily: 'DM-Sans',
    },
    image: {
        height: 250,
        width: 300,
    },
    fotoCont: {
        alignItems: 'center',
        width: '100%',
        height: 200,
        marginBottom: 30,
        marginTop: 20,
    },
    doacoesContainer: {
        marginTop: 30,
    },
    doacoesTxt: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 17,
        color: '#470404',
        marginBottom: 30,
        fontWeight: '500',
    },
    botaoAdDoacao: {
        backgroundColor: '#1E6370',
        height: 37,
        width: 235,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 30,
    }
});