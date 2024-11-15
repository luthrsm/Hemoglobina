import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


import MenuHemocentro from '../../../../components/menu/menuHemocentro';

const RegistrosPendentes = ({ route }) => {
    const { data, quantidade, cpf, tipoSanguineo, nome } = route.params;

    const navigation = useNavigation();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Adicionar doação</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={32} color="#053a45" />
                    </TouchableOpacity>
                </View>

                <Text style={{ fontFamily: 'DM-Sans', fontSize: 25, marginTop: 40, textAlign: 'center', marginBottom: 40 }}>Registros Pendentes</Text>
                <ScrollView>
                    <View style={styles.doacaoContainer}>
                        <View style={styles.cardDoacao}>
                            <View style={styles.headerCard}>
                                <Text style={styles.cardTitle}>{nome}</Text>
                            </View>
                            <View style={{ flexDirection: 'row', gap: 70, padding: 28 }}>
                                <View>
                                    <View style={styles.doacaoInfo}>
                                        <Text style={styles.cardText}>CPF: {cpf}</Text>
                                        <Text style={styles.cardText}>Data da doação: {data}</Text>
                                        <Text style={styles.cardText}>Tipo sanguíneo: {tipoSanguineo}</Text>
                                        <Text style={styles.cardText}>Quantidade: {quantidade}</Text>
                                    </View>
                                </View>
                                <View style={styles.esquerdaCard}>
                                    <Text style={{ fontFamily: 'DM-Sans', fontSize: 16 }}>3</Text>
                                    <Image style={styles.image} source={require('../../../../assets/img/gotinha.png')} />
                                </View>
                            </View>
                            <View style={styles.bottomContainer}>
                                <TouchableOpacity onPress={() => navigation.navigate('EdicaoDoacao', {data, quantidade, cpf, tipoSanguineo, nome})} style={styles.button}>
                                    <Text style={styles.botaoTxt}>Editar informações</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => navigation.navigate('HistoricoHemocentro')} style={styles.button}>
                                    <Text style={styles.botaoTxt}>Salvar registro</Text>
                                </TouchableOpacity>
                            </View>

                        </View>

                    </View>
                </ScrollView>

            </View>
            <MenuHemocentro />
        </SafeAreaView>

    );
};

export default RegistrosPendentes;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
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
    voltarContainer: {
        position: 'absolute',
        top: 16,
        left: 16,
    },
    title: {
        color: '#EEF0EB',
        marginTop: 7,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        marginLeft: 10

    },
    mainContainer: {
        padding: 32,
        flex: 1,
    },
    cardDoacao: {
        backgroundColor: '#daeef2',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#053a45',
        height: 260,
        marginBottom: 20
    },
    cardTitle: {
        fontFamily: 'DM-Sans Bold',
        fontSize: 18,
        marginBottom: 5,
        marginLeft: 28,
        marginTop: 28
    },
    cardText: {
        fontFamily: 'DM-Sans',
        fontSize: 14,
        marginBottom: 8
    },
    esquerdaCard: {
        flexDirection: 'row',
        alignSelf: 'baseline'

    },
    image: {
        height: 20,
        width: 30
    },
    bottomContainer: {
        flexDirection: 'row',
        gap: 30,
        alignSelf: 'center'
    },
    button: {
        backgroundColor: '#1e6370',
        borderWidth: 1,
        borderRadius: 8,
        borderColor: '#053a45',
        width: 130,
        height: 30,
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: -10
    },
    botaoTxt: {
        color: '#fff',
        fontFamily: 'DM-Sans',
        fontSize: 12
    }
})
