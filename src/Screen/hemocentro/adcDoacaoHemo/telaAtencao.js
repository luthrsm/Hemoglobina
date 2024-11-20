import React from 'react';
import { Text, SafeAreaView, View, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import MenuHemocentro from '../../../../components/menu/menuHemocentro';
import { db } from '../../../Services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';

const AtencaoScreen = ({ route, navigation }) => {
    // Verificando se route.params existe
    const { data, quantidade, cpf, tipoSanguineo, nome, donationId, doadorUid, hemocentroId } = route.params || {};

    // Se algum parâmetro importante estiver faltando, exibe um alerta e retorna para a tela anterior
    if (!donationId) {
        Alert.alert('Erro', 'O ID da doação não foi encontrado.', [
            { text: 'OK', onPress: () => navigation.goBack() }
        ]);
        return null;
    }

    const handlePendente = async () => {
        // Atualiza o status da doação para "pendente"
        await updateDonationStatus(donationId, 'pendente');
        navigation.navigate('RegistrosPendentes', { data, quantidade, cpf, tipoSanguineo, nome, donationId });
    };

    const handleConfirmar = async () => {
        Alert.alert('Atenção!', 'Você tem certeza que deseja confirmar essa doação?', [
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
                onPress: { handlePendente },
                style: 'cancel',
            },
            {
                text: 'Confirmar doação',
                onPress: async () => {
                    // Atualiza o status da doação para "confirmada"
                    await handleConfirmarDoacao(
                        donationId,
                        doadorUid,
                        hemocentroId,
                        tipoSanguineo,
                        quantidade,
                        data
                    );
                }
            },
            { cancelable: true }
        ]);
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
        marginLeft: 10
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
});
