import { Modal, Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import supabase from '../../../../supabaseClient';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../../Services/firebaseConfig';
import MenuDoador from '../../../../components/menu/menuDoador';




const CriarCampanha = () => {

    const navigation = useNavigation();

    const [campaignName, setCampaignName] = useState('');
    const [campaignDescription, setCampaignDescription] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');
    const [local, setLocalDoacao] = useState('');

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

    //mudar a cor do filtro
    const [filtro1Selecionado, setFiltro1Selecionado] = useState(false);
    const [filtro2Selecionado, setFiltro2Selecionado] = useState(false);
    const [filtroSelecionado, setFiltroSelecionado] = useState('')

    const handleFiltroPress = (filtro) => {
        if (filtro === 'filtro1') {
            setFiltro1Selecionado(true);
            setFiltro2Selecionado(false);
            setFiltroSelecionado('Doação de reposição'); // Add this line
        } else if (filtro === 'filtro2') {
            setFiltro2Selecionado(true);
            setFiltro1Selecionado(false);
            setFiltroSelecionado('Doação voluntária'); // Add this line
        }
    };

    const FiltroButton = ({ filtro, selecionado, onPress }) => {
        return (
            <TouchableOpacity
                style={[
                    styles.filtroButton,
                    selecionado ? styles.filtroSelecionado : null,
                ]}
                onPress={onPress}
            >
                <Text style={styles.txtFiltroBt}>{filtro}</Text>
            </TouchableOpacity>
        );
    };


    // Função para criar campanha 
    const handleSubmit = async () => {
        try {
            const docRef = await addDoc(collection(db, "campanhas"), {
                titulo: campaignName,
                descricao: campaignDescription,
                tipoSanguineo: selectedCategory,
                local: local,
                tipoDoacao: filtroSelecionado,
                createdAt: new Date() // Para registrar a data de criação
            });
            console.log("Campanha criada com ID:", docRef.id);
            navigation.navigate('CampanhaDoador');
        } catch (error) {
            console.error("Erro ao criar campanha:", error);
        }
    };


    const [modalVisible, setModalVisible] = useState(false);

    const handlePress = () => {
        setModalVisible(true);
    };

    const ModalTipoDoacao = () => {
        return (
            <View>
                <Modal visible={modalVisible} animationType="slide" >
                    <View style={styles.modalTipoDoacao}>
                        <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.closeBt}>
                            <FontAwesome name="close" size={24} color="#af2b2b" />
                        </TouchableOpacity>
                        <Text style={styles.titleModal}>Qual a diferença entre doação de reposição e doação voluntária?</Text>
                        <Text style={styles.txtModal}>Doação voluntária: Feita de forma altruísta, sem um destinatário específico, para ajudar quem precisar do sangue doado.</Text>
                        <Text style={styles.txtModal}>Doação de reposição: Realizada quando um familiar ou amigo necessita de sangue, e o doador contribui para atender essa necessidade específica. </Text>
                        <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'center' }}>
                            <TouchableOpacity style={styles.btModal} onPress={() => setModalVisible(false)}>
                                <Text style={styles.txtBtModal}>Entendi</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.btModal} onPress={() => navigation.navigate("InfoMain")}>
                                <Text style={styles.txtBtModal}>Não entendi, quero saber mais</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            </View>
        );
    };




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Campanhas</Text>
                <TouchableOpacity style={styles.btConfig}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={28} color="#326771" />
                    </TouchableOpacity>
                </View>
                <View style={styles.contentContainer}>
                    <View style={styles.contentTitle}>

                        <Text style={styles.titleContent}>Criação de campanha</Text>
                        <Text style={styles.subContent}>Crie sua própria campanha</Text>
                    </View>
                    <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingVertical: 20 }}>
                        <View style={styles.formContent}>
                            <Text style={styles.txtInput}>Título da Campanha</Text>
                            <TextInput
                                value={campaignName}
                                onChangeText={(text) => setCampaignName(text)}
                                placeholder="Digite o título da Campanha..."
                                style={styles.input}
                            />
                            <Text style={styles.txtInput}>Tipo sanguíneo para doação</Text>
                            <SelectList
                                data={tipos}
                                arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                                search={false}
                                placeholder='Escolha um tipo sanguíneo'

                                boxStyles={styles.boxStyles}
                                dropdownItemStyles={styles.dropdownItemStyles}
                                dropdownStyles={styles.dropdownStyles}
                                save="value"
                                setSelected={(val) => setSelectedCategory(val)}
                            />
                            <Text style={styles.txtInput}>Local da doação</Text>
                            <TextInput
                                value={local}
                                onChangeText={(text) => setLocalDoacao(text)}
                                placeholder="Endereço do local da doação..."
                                style={styles.input}
                            />
                            <Text style={styles.txtInput}>Motivo da campanha</Text>
                            <View>
                                <TextInput
                                    value={campaignDescription}
                                    onChangeText={(text) => {
                                        if (text.length <= 1000) {
                                            setCampaignDescription(text);
                                        }
                                    }}
                                    placeholder="Digite aqui a descrição da campanha..."
                                    multiline
                                    numberOfLines={10}
                                    maxLength={1000}
                                    style={styles.TextAreainput}
                                />
                                <View style={{
                                    position: 'absolute',
                                    right: 20,
                                    fontSize: 12,
                                    bottom: 60

                                }}>
                                    <Text style={{ color: '#696969', }}>{`Caracteres restantes: ${1000 - campaignDescription.length}`}</Text>
                                </View>
                            </View>

                            <TouchableOpacity style={{ flexDirection: 'row', gap: 10, alignItems: 'center', marginTop: -70, marginBottom: -20 }} onPress={handlePress}>
                                <Text style={styles.txtInput}>
                                    Tipo de doação
                                </Text>
                                <FontAwesome name="question-circle-o" size={20} color="black" style={{ marginTop: 3, alignSelf: 'center' }} />
                            </TouchableOpacity>
                            <ModalTipoDoacao />
                            <View style={{ flexDirection: 'row', gap: 30, justifyContent: 'center' }}>
                                <FiltroButton
                                    filtro="Doação de reposição"
                                    selecionado={filtro1Selecionado}
                                    onPress={() => handleFiltroPress('filtro1')}
                                />
                                <FiltroButton
                                    filtro="Doação voluntária"
                                    selecionado={filtro2Selecionado}
                                    onPress={() => handleFiltroPress('filtro2')}
                                />
                            </View>

                            <TouchableOpacity onPress={handleSubmit} style={styles.submitButton}>
                                <Text style={styles.submitButtonTxt}>Enviar Campanha</Text>
                            </TouchableOpacity>
                        </View>
                    </ScrollView>

                </View>
            </View>
        </SafeAreaView>
    );
};

export default CriarCampanha;

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
    },
    contentTitle: {
        marginTop: 32,
        alignItems: 'center',
        marginBottom: 32
    },
    titleContent: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 21
    },
    subContent: {
        fontFamily: 'Poppins-Medium',
        fontSize: 14
    },
    formContent: {
        gap: 15,
        marginTop: -25
    },
    txtInput: {
        fontFamily: 'Poppins-Medium',
        fontSize: 15,
        marginLeft: 10,
        marginBottom: -10
    },
    input: {
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
        width: '95%',
        height: 40,
        paddingLeft: 13,
        alignSelf: 'center',

    },
    TextAreainput: {
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
        width: '95%',
        alignSelf: 'center',
        paddingLeft: 13,
        textAlignVertical: 'top',
        paddingTop: 15,
        height: '40%',
        marginBottom: -60
    },
    boxStyles: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
    },
    dropdownStyles: {
        width: '95%',
        alignSelf: 'center',
        backgroundColor: '#eef0eb',
        borderColor: '#053a45',
        borderRadius: 7,
        borderWidth: 1,
        borderTopWidth: 0,
        marginTop: '',
        borderTopEndRadius: 0,
        borderTopStartRadius: 0
    },
    ScrollView: {
        paddingBottom: 20,
        flexGrow: 1,
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    submitButton: {
        backgroundColor: '#1e6370',
        borderRadius: 5,
        width: 174,
        height: 35,
        alignSelf: 'center',
        justifyContent: 'center',
    },
    submitButtonTxt: {
        color: 'white',
        textAlign: 'center'
    },
    filtroButton: {
        backgroundColor: '#DAEEF2',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
        padding: 10,
        marginTop: 20,
        marginBottom: 20
    },
    filtroSelecionado: {
        backgroundColor: '#F2DADA',
    },
    txtFiltroBt: {
        fontSize: 14,
        textAlign: 'center',
    },

    //modal
    modalTipoDoacao: {
        padding: 32,
        flex: 1,
        gap: 50
    },
    titleModal: {
        fontSize: 24,
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },
    txtModal: {
        fontFamily: 'Poppins-Regular',
        fontSize: 16,
        textAlign: 'justify'
    },
    btModal: {
        backgroundColor: '#AF2B2B',
        height: 40,
        justifyContent: 'center',
        padding: 10,
        borderRadius: 7
    },
    txtBtModal: {
        color: '#EEF0EB',
        fontFamily: 'Poppins-Regular'
    }

})
