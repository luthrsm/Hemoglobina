import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../Services/firebaseConfig'; // Altere o caminho conforme necessário
import MenuHemocentro from '../../../../components/menu/menuHemocentro';

const EdicaoDoacao = () => {
    const tipos = [
        { key: "1", value: "A+" },
        { key: "2", value: "A-" },
        { key: "3", value: "B+" },
        { key: "4", value: "B-" },
        { key: "5", value: "AB+" },
        { key: "6", value: "AB-" },
        { key: "7", value: "O+" },
        { key: "8", value: "O-" },
    ];

    const route = useRoute();
    const navigation = useNavigation();
    const { id, date, quantidade, cpf, tipoSanguineo } = route.params;

    // Estados para armazenar os valores recebidos e editados
    const [editedDate, setEditedDate] = useState(date);
    const [editedQuantidade, setEditedQuantidade] = useState(quantidade);
    const [editedCpf, setEditedCpf] = useState(cpf);
    const [editedTipoSanguineo, setEditedTipoSanguineo] = useState(tipoSanguineo);

    // Função para salvar as alterações
    const handleSave = async () => {
        // Depuração: Verificar os valores antes de salvar
        console.log("Valores antes de salvar:", { editedQuantidade, editedTipoSanguineo });

        // Verificação de campos
        if (!editedQuantidade || !editedTipoSanguineo) {
            alert("Todos os campos precisam ser preenchidos corretamente!");
            return;
        }

        try {
            // Preparando os dados para atualização
            const dataToUpdate = {
                quantidade: editedQuantidade,
                tipoSanguineo: editedTipoSanguineo,
            };

            // Se a data da doação for válida, incluir no objeto
            if (editedDate) {
                dataToUpdate.dataDoacao = editedDate;
            }

            // Atualizando o documento no Firestore
            const doacaoRef = doc(db, 'doacoes', id); // Referência para o documento da doação
            await updateDoc(doacaoRef, dataToUpdate);

            // Depuração: Confirmar que o documento foi atualizado
            console.log("Doação salva com sucesso!");

            // Navegar de volta após salvar
            navigation.goBack();
        } catch (error) {
            console.error("Erro ao salvar edição da doação: ", error);
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Editar Informações da Doação</Text>
            </View>

            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={32} color="#053a45" />
                    </TouchableOpacity>
                </View>

                <View style={styles.adcDoacaoContainer}>
                    <Text style={styles.adcDoacaoTitle}>Editar dados da doação</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantidade:</Text>
                        <TextInput
                            placeholder='Digite a quantidade doada em mL...'
                            style={styles.input}
                            placeholderTextColor={'#999999'}
                            value={editedQuantidade}
                            onChangeText={setEditedQuantidade}
                            keyboardType='numeric'
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tipo sanguíneo: </Text>
                        <SelectList
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder='Escolha o tipo sanguíneo'
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                            maxHeight={'100'}
                            placeholderTextColor={'#999999'}
                            setSelected={(key) => {
                                // Atualizando o valor corretamente com base na chave selecionada
                                const selectedTipo = tipos.find(tipo => tipo.key === key);
                                console.log("Tipo sanguíneo selecionado:", selectedTipo); // Verificar qual tipo sanguíneo foi selecionado
                                if (selectedTipo) {
                                    setEditedTipoSanguineo(selectedTipo.value);
                                }
                            }}
                            value={editedTipoSanguineo}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleSave}>
                        <Text style={styles.buttonTxt}>Salvar alterações</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MenuHemocentro />
        </SafeAreaView>
    );
};

export default EdicaoDoacao;

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
    adcDoacaoContainer: {
        backgroundColor: '#DAEEF2',
        borderWidth: 1.2,
        borderColor: '#053a45',
        borderRadius: 4.71,
        padding: 24,
        minHeight: '50%',
        gap: 20,
        marginTop: 20
    },
    adcDoacaoTitle: {
        fontFamily: 'DM-Sans',
        fontSize: 23,
        textAlign: 'center',
    },
    inputContainer: {
        gap: 7.4,
    },
    label: {
        fontFamily: 'DM-Sans',
        fontSize: 16,
        lineHeight: 19,
        color: '#053a45'
    },
    input: {
        backgroundColor: '#fff',
        height: 35,
        padding: 5,
        paddingLeft: 10,
        borderWidth: 0.9,
        borderColor: '#053a45',
        borderRadius: 4.71,
        justifyContent: 'center'
    },
    boxStyles: {
        backgroundColor: '#fff',
        height: 45,
        paddingLeft: 10,
        borderWidth: 0.9,
        borderColor: '#053a45',
        borderRadius: 4.71,
        alignItems: 'center'
    },
    dropdownStyles: {
        backgroundColor: '#fff',
        borderWidth: 0.9,
        borderTopWidth: 0,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        borderColor: '#053a45',
        marginTop: 'auto'
    },
    button: {
        backgroundColor: '#1e6370',
        height: 35,
        width: 135,
        alignSelf: 'center',
        borderWidth: 0.9,
        borderColor: '#053a50',
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 30
    },
    buttonTxt: {
        fontFamily: 'DM-Sans',
        fontSize: 12,
        color: '#eef0eb',
        lineHeight: 12,
        textAlign: 'center'
    }
});
