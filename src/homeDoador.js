import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, Platform } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';


import MenuDoador from '../components/menu';

const HomeDoador = () => {

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Bem vindo, doador!</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="gear" size={28} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <TouchableOpacity style={styles.contagemContainer} onPress={() => navigation.navigate('ProxDoacao')}>
                    <View style={styles.diasContagem}>
                        <Text style={styles.diasContagemTxt}> 15 </Text>
                    </View>
                    <View style={styles.txtContagemContainer}>
                        <Text style={styles.txtTitle}>Dias para sua próxima doação</Text>
                        <Text style={styles.maisTxt}>mais detalhes</Text>
                    </View>
                </TouchableOpacity>
                <View style={styles.questionarioContainer}>
                    <View style={{marginRight: 20}}>
                        <Text style={styles.questionarioTxt}>Questionário de triagem</Text>
                        <TouchableOpacity style={styles.botaoTriagem}>
                            <Text style={styles.txtBotao}>Responder agora</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={require('../assets/img/questionariotriagemhome.png')} />
                    </View>

                </View>
                <View style={styles.doacoesContainer}>
                    <Text style={styles.doacoesTxt}>Minhas Doações</Text>
                    <TouchableOpacity style={styles.botaoDoacao}>
                        <Text style={styles.txtBotao}>Solicitar carteirinha</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoDoacao}>
                        <Text style={styles.txtBotao}>Ver histórico de doações</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <MenuDoador/>
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
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 15,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 20

    },
    config: {
        marginTop: 15,
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
        gap: 20,
    },
    contagemContainer: {
        marginBottom: 20,
        height: 150,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    txtContagemContainer: {
        gap: 5,
        width: '55%',
        justifyContent: 'center',
        
    },
    txtTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
    },
    maisTxt: {
        fontFamily: 'DM-Sans',
        color: '#326771',
        fontSize: 14,
        fontWeight: '600',
        lineHeight: 12.9,
    },
    questionarioContainer: {
        backgroundColor: '#EEF0EB',
        flexDirection: 'row',
        paddingVertical: 20,
        paddingHorizontal: 10,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 10,
        marginBottom: 50,
        height: 200,
    },
    botaoTriagem: {
        backgroundColor: '#1E6370',
        height: 37,
        width: 149,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center'
    },
    txtBotao: {
        color: '#EEF0EB',
        fontFamily: 'DM-Sans',
        fontSize: 17
    },
    questionarioTxt: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 22,
        color: '#470404',
        marginBottom: 20,
        textAlign: 'center',

    },
    doacoesTxt: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 20,
        color: '#470404',
        marginBottom: 45
    },
    botaoDoacao:{
        backgroundColor: '#1E6370',
        height: 37,
        width: 235,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 24,
    },
    diasContagem:{
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 5,
        marginRight: 30,
        marginLeft: 30
    },
    diasContagemTxt:{
        fontSize: 74,
        letterSpacing: 10,
        fontFamily: 'Poppins-SemiBold',
        
    }
});