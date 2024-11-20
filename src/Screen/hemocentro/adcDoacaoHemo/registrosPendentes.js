import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MenuHemocentro from '../../../../components/menu/menuHemocentro';

import { useState, useEffect } from 'react';
import { collection, query, where, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Services/firebaseConfig';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const RegistrosPendentes = ({ route }) => {
    const [uid, setUid] = useState(null);
    const [doacoes, setDoacoes] = useState([]);
    const navigation = useNavigation();
    const { data, quantidade, cpf, tipoSanguineo, nome, donationId, hemocentroId, doadorUid } = route.params || {};
    
    useEffect(() => {
        if (!uid) return;

        const fetchDoacoes = async () => {
            const doacoesRef = collection(db, 'doacoes');
            const q = query(
                doacoesRef,
                where('hemocentroUid', '==', uid),
                where('status', '==', 'pendente')
            );
            const querySnapshot = await getDocs(q);
            const doacoesData = querySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
            setDoacoes(doacoesData);
        };

        fetchDoacoes();
    }, [uid]);

    const auth = getAuth();
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            if (user) {
                setUid(user.uid);
            } else {
                setUid(null);
            }
        });

        return () => unsubscribe();
    }, []);

    // Função para atualizar o status da doação
    const updateDonationStatus = async (donationId, newStatus) => {
        const donationRef = doc(db, "doacoes", donationId);
        try {
            await updateDoc(donationRef, { status: newStatus });
            console.log(`Status da doação ${donationId} atualizado para: ${newStatus}`);
        } catch (error) {
            console.error("Erro ao atualizar o status da doação:", error);
        }
    };

    const updateEstoque = async (hemocentroId, tipoSanguineo, quantidade) => {
        try {
            console.log("Atualizando estoque para hemocentroId:", hemocentroId);

            const hemocentroRef = doc(db, 'Hemocentro', hemocentroId);
            const hemocentroDoc = await getDoc(hemocentroRef);

            if (!hemocentroDoc.exists()) {
                console.error(`Documento do hemocentro ${hemocentroId} não encontrado.`);
                return;
            }

            const hemocentroData = hemocentroDoc.data();
            const estoqueAtualString = hemocentroData.estoque?.[tipoSanguineo] || "0";
            const estoqueAtual = parseInt(estoqueAtualString, 10); // Converte para número

            if (isNaN(estoqueAtual)) {
                console.error('Estoque atual não é um número válido. Estoque atual:', estoqueAtualString);
                return;
            }

            const quantidadeInt = parseInt(quantidade, 10); // Converte a quantidade para número
            if (isNaN(quantidadeInt)) {
                console.error('Quantidade fornecida não é válida. Quantidade:', quantidade);
                return;
            }

            const novoEstoque = estoqueAtual + quantidadeInt; // Soma dos números

            await updateDoc(hemocentroRef, {
                [`estoque.${tipoSanguineo}`]: novoEstoque.toString(), // Converte o resultado para string
            });

            console.log(`Estoque do tipo ${tipoSanguineo} atualizado para ${novoEstoque}ml.`);
        } catch (error) {
            console.error('Erro ao atualizar estoque:', error);
        }
    };

    const updateDoadorInfo = async (userUid, dataDoacao) => {
        try {
            const doadorRef = doc(db, 'doador', userUid);
            const doadorDoc = await getDoc(doadorRef);

            if (doadorDoc.exists()) {
                const doadorData = doadorDoc.data();
                const updatedQuantDoacoes = (parseInt(doadorData.quantDoacoes || 0, 10) || 0) + 1;

                // Calcula a próxima data de doação como string
                const [dia, mes, ano] = dataDoacao.split("/");
                if (!dia || !mes || !ano) {
                    console.error("Data da doação inválida:", dataDoacao);
                    return;
                }
                const mesProximo = (parseInt(mes, 10) + 4) % 12 || 12;
                const anoProximo = parseInt(ano, 10) + Math.floor((parseInt(mes, 10) + 4) / 12);

                const proxDoacao = `${dia.padStart(2, "0")}/${mesProximo.toString().padStart(2, "0")}/${anoProximo}`;

                await updateDoc(doadorRef, {
                    quantDoacoes: updatedQuantDoacoes.toString(),
                    ultimaDoacao: dataDoacao, // Salva como string
                    proxDoacao: proxDoacao,  // Próxima data também como string
                });

                console.log("Informações do doador atualizadas com sucesso.");
            } else {
                console.warn("Documento do doador não encontrado.");
            }
        } catch (error) {
            console.error("Erro ao atualizar informações do doador:", error);
        }
    };

    const handleConfirmarDoacao = async (donationId, doadorUid, hemocentroId, tipoSanguineo, quantidade, dataDoacao) => {
        if (!donationId || !hemocentroId || !tipoSanguineo || !quantidade || !dataDoacao) {
            console.error("Valores ausentes ao confirmar doação:", { donationId, doadorUid, hemocentroId, tipoSanguineo, quantidade, dataDoacao });
            alert("Erro: Alguns campos obrigatórios estão ausentes.");
            return;
        }

        try {
            await updateDonationStatus(donationId, "confirmada");
            await updateEstoque(hemocentroId, tipoSanguineo, quantidade);

            if (doadorUid) {
                console.log(`Atualizando informações do doador com UID: ${doadorUid}`);
                await updateDoadorInfo(doadorUid, dataDoacao);
            } else {
                console.log("Doador não registrado. Doação confirmada apenas no histórico do hemocentro.");
            }

            alert("Doação confirmada com sucesso!");
            navigation.navigate('HistoricoHemocentro');
        } catch (error) {
            console.error("Erro ao confirmar doação:", error);
            alert("Erro ao confirmar doação. Tente novamente.");
        }
    };


    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Adicionar doação</Text>
            </View>
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.text}>Registros Pendentes</Text>
                </View>
                <ScrollView>
                    {doacoes.length > 0 ? (
                        doacoes.map((doacao) => (
                            <View key={doacao.id} style={styles.doacaoContainer}>
                                <View style={styles.cardDoacao}>
                                    <View style={styles.headerCard}>
                                        <Text style={styles.cardTitle}>{doacao.nome}</Text>
                                    </View>
                                    <View style={{ flexDirection: 'row', gap: 70, padding: 28 }}>
                                        <View>
                                            <View style={styles.doacaoInfo}>
                                                <Text style={styles.cardText}>CPF: {cpf}</Text>
                                                <Text style={styles.cardText}>Data da doação: {doacao.dataDoacao}</Text>
                                                <Text style={styles.cardText}>Tipo sanguíneo: {doacao.tipoSanguineo}</Text>
                                                <Text style={styles.cardText}>Quantidade: {doacao.quantidade}ml</Text>
                                            </View>
                                        </View>
                                    </View>
                                    <View style={styles.bottomContainer}>
                                        <TouchableOpacity onPress={() => navigation.navigate('EdicaoDoacao', { ...doacao })} style={styles.button}>
                                            <Text style={styles.botaoTxt}>Editar informações</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity onPress={() =>
                                                handleConfirmarDoacao(
                                                    doacao.id,
                                                    doacao.userUid,
                                                    doacao.hemocentroUid,
                                                    doacao.tipoSanguineo,
                                                    doacao.quantidade,
                                                    doacao.dataDoacao
                                                )
                                            } style={styles.button}>
                                            <Text style={styles.botaoTxt}>Confirmar doação</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        ))
                    ) : (
                        <Text style={{ textAlign: 'center', fontFamily: 'DM-Sans', fontSize: 18 }}>Nenhuma doação pendente.</Text>
                    )}
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
    },
    text: {
        fontFamily: 'Poppins-Medium',
        fontSize: 22,
        marginTop: 16,
        marginBottom: 11
    },
})
