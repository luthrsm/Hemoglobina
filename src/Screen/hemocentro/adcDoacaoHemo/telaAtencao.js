import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { ALERT_TYPE, Dialog, AlertNotificationRoot, Toast } from 'react-native-alert-notification';

import MenuHemocentro from '../../../../components/menu/menuHemocentro';





const AtencaoScreen = ({ route, navigation }) => {
    const { data, quantidade, cpf, tipoSanguineo, nome } = route.params;

    const handlePendente = () => {
        navigation.navigate('RegistrosPendentes', { data, quantidade, cpf, tipoSanguineo, nome });
    };

    const handleConfirmar = () => {
        Alert.alert('Atenção!', 'Você tem certeza que você deseja confirmar essa doação?', [
            {
                text: 'Editar Informações',
                onPress: () => navigation.navigate('EdicaoDoacao', {
                    data,
                    quantidade,
                    cpf,
                    tipoSanguineo,
                    nome
                })
            },
            {
                text: 'Colocar doação como pendente',
                onPress: () => navigation.navigate('RegistrosPendentes', { data, quantidade, cpf, tipoSanguineo, nome }),
                style: 'cancel',
            },
            { text: 'Confirmar doação', onPress: () => navigation.navigate('HistoricoHemocentro') },
            { cancelable: true }
        ]);
    };


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

                <View style={styles.attContainer}>
                    <Text style={styles.attTitle}>Atenção!</Text>
                    <Text style={styles.attTxt}>
                        Certifique-se de que o registro esteja completo, ou seja, com todas as informações corretas. Em caso afirmativo, seu registro poderá ser salvo, senão, ele será encaminhado para a página de pendências, podendo ser alterado posteriormente e salvo no banco de sangue.
                    </Text>
                    <TouchableOpacity onPress={handlePendente} style={[styles.attButton, { marginTop: 20 }]}>
                        <Text style={styles.attButtonTxt}>Deixar como pendente</Text>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirmar} style={styles.attButton}>
                        <Text style={styles.attButtonTxt}>Confirmar registro</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MenuHemocentro />
        </SafeAreaView>

    );
};

export default AtencaoScreen;

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
        marginLeft: 10,
        fontSize: 16,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
        justifyContent: 'center'
    },
    attContainer: {
        backgroundColor: '#DAEEF2',
        borderWidth: 1.2,
        borderColor: '#053a45',
        borderRadius: 4.71,
        padding: 24,
        minHeight: '50%',
        gap: 20,
    },
    attTitle: {
        fontSize: 30,
        textAlign: 'center',
        fontFamily: 'DM-Sans'
    },
    attTxt: {
        fontFamily: 'DM-Sans',
        fontSize: 15,
        textAlign: 'justify'
    },
    attButton: {
        backgroundColor: '#1E6370',
        width: 145,
        height: 35,
        alignSelf: 'center',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#053a45',
        alignContent: 'center',
        justifyContent: 'center',

    },
    attButtonTxt: {
        textAlign: 'center',
        color: '#eef0eb',
        fontSize: 12
    }
})
