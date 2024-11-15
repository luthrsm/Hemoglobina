import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useState } from 'react';

import MenuHemocentro from '../../../../components/menu/menuHemocentro';

const HistoricoHemocentro = () => {
    const navigation = useNavigation();

    const [filtro, setFiltro] = useState(null); // Estado para armazenar o filtro selecionado

    // Exemplo de doações para testar o filtro
    const doacoes = [
        { id: 1, nome: "Juliana Ferreira Lima", data: "20/09/2024", tipo: "A+", cpf: "123456789", status: "concluida", vezes: 5 },
        { id: 2, nome: "Carlos da Silva", data: "22/07/2024", tipo: "O-", cpf: "987654321", status: "concluida", vezes: 2 },
        { id: 3, nome: "Joana D'arc Souza", data: "13/10/2024", tipo: "O-", cpf: "54587664820", status: "pendente", vezes: 1 },
    ];

    // Função para filtrar as doações com base no estado selecionado
    const doacoesFiltradas = filtro
        ? doacoes.filter((doacao) => doacao.status === filtro)
        : doacoes;

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Histórico de Doações</Text>
            </View>

            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.text}>Últimas doações</Text>
                </View>
                <View style={styles.filtroContainer}>
                    <TouchableOpacity
                        style={[
                            styles.filtroBt,
                            filtro === 'concluida' && styles.filtroBtAtivo
                        ]}
                        onPress={() => setFiltro(filtro === 'concluida' ? null : 'concluida')}
                    >
                        <Text style={[styles.filtroBtTxt, filtro === 'concluida' && styles.filtroBtTxtAtivo]}>Doações Concluídas</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[
                            styles.filtroBt,
                            filtro === 'pendente' && styles.filtroBtAtivo
                        ]}
                        onPress={() => setFiltro(filtro === 'pendente' ? null : 'pendente')}
                    >
                        <Text style={[styles.filtroBtTxt, filtro === 'pendente' && styles.filtroBtTxtAtivo]}>Doações Pendentes</Text>
                    </TouchableOpacity>
                </View>

                <ScrollView>
                    {doacoesFiltradas.map((doacao) => (
                        <View key={doacao.id} style={styles.doacaoContainer}>
                            <View style={styles.cardDoacao}>
                                <View>
                                    <View style={styles.headerCard}>
                                        <Text style={styles.cardTitle}>{doacao.nome}</Text>
                                    </View>
                                    <View style={styles.doacaoInfo}>
                                        <Text style={styles.cardText}>Data da doação: {doacao.data}</Text>
                                        <Text style={styles.cardText}>Tipo sanguíneo: {doacao.tipo}</Text>
                                        <Text style={styles.cardText}>CPF: {doacao.cpf}</Text>
                                    </View>
                                </View>
                                <View style={styles.esquerdaCard}>
                                    <Text style={{ fontFamily: 'DM-Sans', fontSize: 16 }}>{doacao.vezes}</Text>
                                    <Image style={styles.image} source={require('../../../../assets/img/gotinha.png')} />
                                </View>
                            </View>
                        </View>
                    ))}
                </ScrollView>

                <View style={styles.adcDoacao}>
                    <TouchableOpacity style={styles.adcBt} onPress={() => navigation.navigate('AdcDoacao')}>
                        <Image style={styles.imageAdcMais} source={require('../../../../assets/img/mais.png')} />
                    </TouchableOpacity>
                </View>
            </View>

            <MenuHemocentro />
        </SafeAreaView>
    );
};

export default HistoricoHemocentro;

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
        top: 10,
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
        justifyContent: 'flex-start',
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 19,
        marginTop: 16,
        marginBottom: 11
    },
    filtroContainer: {
        flexDirection: 'row',
        gap: 16,
        marginBottom: 25
    },
    filtroBt: {
        backgroundColor: '#DAEEF2',
        borderColor: '#053a45',
        borderWidth: 1,
        borderRadius: 7,
        height: 35,
        padding: 5,
        justifyContent: 'center',
    },
    filtroBtAtivo: {
        backgroundColor: '#1E6370', // Cor de fundo para o botão ativo
    },
    filtroBtTxt: {
        fontFamily: 'DM-Sans Bold',
        fontSize: 11,
        color: '#000',
    },
    filtroBtTxtAtivo:{
        color: '#fff'
    },
    cardDoacao: {
        backgroundColor: '#daeef2',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#053a45',
        padding: 28,
        flexDirection: 'row',
        gap: 45,
        height: 180,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20
    },
    cardTitle: {
        fontFamily: 'DM-Sans Bold',
        fontSize: 18,
        marginBottom: 16,
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
    adcDoacao: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        zIndex: 1,
    },
    adcBt: {
        borderRadius: 50,
        padding: 10,
    },
    imageAdcMais: {
        width: 75,
        height: 75,
    }
});
