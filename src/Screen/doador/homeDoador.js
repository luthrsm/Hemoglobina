import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';
import React, { useEffect, useState } from 'react';
import { db } from '../../Services/firebaseConfig';
import { getAuth } from 'firebase/auth';
import { getDoc, doc, onSnapshot} from 'firebase/firestore';

import MenuDoador from '../../../components/menu/menuDoador';

const HomeDoador = () => {
    const [userName, setUserName] = useState('');
    const [userUid, setUserUid] = useState(null);
    const [cartSolicitada, setCartSolicitada] = useState(false);
    const navigation = useNavigation();
    const auth = getAuth();

    useEffect(() => {
        const auth = getAuth();
        const user = auth.currentUser;
        const userRef = doc(db, 'doador', user.uid);
            
        // Utiliza onSnapshot para ouvir alterações em tempo real
        const unsubscribe = onSnapshot(userRef, (docSnap) => {
            if (docSnap.exists()) {
                const userData = docSnap.data();
                setUserName(userData.nome);
                setCartSolicitada(userData.cartSolicitada || false); // Atualiza com o valor de cartSolicitada
            } else {
                console.log('Documento não existe!');
            }
        });

        // Limpa o listener quando o componente for desmontado
        return () => unsubscribe();
    }, []);


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Bem-vindo(a), {userName || "Usuário"}!</Text>
                <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.contagemContainer} >
                    <View style={styles.diasContagem}>
                        <Image source={require('../../../assets/img/Vector.png')} />
                    </View>
                    <View style={styles.txtContagemContainer}>
                        <Text style={styles.txtTitle}>Verifique quando será sua próxima doação!</Text>
                        <TouchableOpacity style={styles.btDetalhes} onPress={() => navigation.navigate('ProxDoacao')}>
                            <Text style={styles.maisTxt}>Descobrir</Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View style={styles.questionarioContainer}>
                    <View>
                        <Text style={styles.questionarioTxt}>Questionário de triagem</Text>
                        <TouchableOpacity style={styles.botaoTriagem} onPress={() => navigation.navigate('QuestionarioTriagem')}>
                            <Text style={styles.txtBotao}>Responder agora</Text>
                        </TouchableOpacity>
                    </View>
                    <View>
                        <Image source={require('../../../assets/img/questionariotriagemhome.png')} />
                    </View>

                </View>
                <View style={styles.doacoesContainer}>
                    <Text style={styles.doacoesTxt}>Minhas Doações</Text>
                    <TouchableOpacity 
                        style={styles.botaoDoacao} 
                        onPress={() => navigation.navigate('SolicitarCarteirinha')}
                    >
                        <Text style={styles.txtBotao}>
                            {cartSolicitada ? 'Visualizar carteirinha' : 'Solicitar carteirinha'}
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.botaoDoacao} onPress={() => navigation.navigate('HistoricoDoacoes')}>
                        <Text style={styles.txtBotao}>Ver histórico de doações</Text>
                    </TouchableOpacity>

                </View>
            </View>

            <MenuDoador />
        </SafeAreaView>

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
        top: 20,
    },
    contagemContainer: {
        marginBottom: 70,
        flexDirection: 'row',
        gap: 50,
        alignSelf: 'center'
    },
    txtContagemContainer: {
        alignSelf: 'flex-end',
        gap: 5,
        width: '50%',

    },
    txtTitle: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        textAlign: 'center'
    },
    maisTxt: {
        fontFamily: 'DM-Sans',
        color: '#fff',
        fontSize: 12.28,
        fontWeight: '600',
        lineHeight: 12.9,
    },
    btDetalhes: {
        backgroundColor: '#326771',
        justifyContent: 'center',
        alignItems: 'center',
        height: 25,
        width: 104,
        borderRadius: 8,
        alignSelf: 'center'
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
        height: 170,

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
    },
    questionarioTxt: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#470404',
        marginBottom: 20
    },
    doacoesTxt: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 15,
        color: '#470404',
        marginBottom: 20
    },
    botaoDoacao: {
        backgroundColor: '#1E6370',
        height: 37,
        width: 235,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
        marginBottom: 24,
    }
});