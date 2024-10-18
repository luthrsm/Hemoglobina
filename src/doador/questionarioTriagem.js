import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'

//componentes
import MenuDoador from '../components/menuDoador';

const QuestionarioTriagem = () => {
    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Questionário de Triagem</Text>
                <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB"  />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color="#326771" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.titleMain}>Questionário de triagem</Text>
                    <Text style={styles.secondaryText}>Você está apto à doar sangue?</Text>
                    <Image style={styles.image} source={require('../assets/img/questionarioTriagem1.png')}/>
                    <TouchableOpacity style={styles.BtQuestionario} onPress={() => navigation.navigate('Perguntas')}>
                        <Text style={styles.BtQuestionarioTxt}>Realizar Questionário</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MenuDoador/>
        </SafeAreaView>
    )
}

export default QuestionarioTriagem

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
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
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleMain: {
        fontFamily: 'DM-Sans',
        fontSize: 28,
    },
    contentContainer: {
        marginTop: '-10%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    secondaryText:{
        fontSize: 20,
        textAlign: 'center',
        marginBottom: 100,
        marginTop: 10,
        fontFamily: 'DM-Sans',
    },
    image:{
        justifyContent:'center',
        flexShrink: 0,
        width: 200,
        height: 250,
        alignSelf:'center',
        marginBottom: 100
    },
    BtQuestionario:{
        backgroundColor: '#DAEEF2',
        borderRadius: 15,
        borderWidth: 1,
        borderColor: '#1E6370',
        height: 51,
        width: 211,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf:'center'
    },
    BtQuestionarioTxt:{
        fontSize: 17,
        color: '#053A45',
        fontFamily: 'DM-Sans',
    }

})