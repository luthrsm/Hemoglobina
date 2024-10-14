import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';


import MenuDoador from '../components/menuDoador';

const ProxDoacao = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Próxima Doação</Text>
                <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.navigate('HomeDoador')}>
                        <AntDesign name="arrowleft" size={28} color="#326771" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.titleMain}>Sua última doação foi no dia:</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.data}>22/10/2024</Text>
                    </View>
                    <Text style={styles.titleMain}>Sua próxima doação será no dia:</Text>
                    <View style={styles.dataContainer}>
                        <Text style={styles.data}>22/10/2024</Text>
                    </View>
                        <Text style={styles.titleMain}> Quantidade de Doações </Text>
                        <View style={styles.doacaoContainer}>
                            <Image style={styles.image} source={require('../assets/img/gotinha.png')} />
                            <Text style={styles.doacaotxt}>3</Text>
                        </View>
                </View>
            </View>
            <MenuDoador />
        </View>

    )
}

export default ProxDoacao;

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
    voltarContainer: {
        position: 'absolute',
        top: 25,
        left: 16,
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: '7%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 16
    },
    
    btConfig: {
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
        gap: 20,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleMain: {
        fontFamily: 'DM-Sans',
        fontSize: 28,
    },
    contentContainer: {
        gap: 40,
        justifyContent: 'center',
    },
    dataContainer: {
        backgroundColor: '#DAEEF2',
        height: 42,
        borderColor: '#053A45',
        borderWidth: 1,
        borderRadius: 5,
        paddingLeft: 24,
        justifyContent: 'center',
    },
    data: {
        fontFamily: 'DM-Sans',
        fontSize: 16,
    },
    doacaoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: '-7%'
    },
    doacaotxt: {
        fontSize: 26,
    }
});