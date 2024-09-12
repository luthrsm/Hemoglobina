import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, Modal, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native'
import { SelectList } from 'react-native-dropdown-select-list';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import supabase from '../../supabaseClient';



import MenuDoador from '../../components/menuDoador';


const CampanhaMain = () => {
    const navigation = useNavigation();

    const agulhaImage = require('./../../assets/img/agulha.jpg');
    const coracaoDoacaoImage = require('./../../assets/img/coracaoDoacao.jpg');
    const sangueImage = require('./../../assets/img/sangue.jpg');

    // Estados para armazenar tipo de doação, tipo sanguíneo e seleção de filtros
    const [tipoDoacao, setTipoDoacao] = useState('');
    const [filtro1Selecionado, setFiltro1Selecionado] = useState(false);
    const [filtro2Selecionado, setFiltro2Selecionado] = useState(false);
    const [tipoSanguineoSelecionado, setTipoSanguineoSelecionado] = useState('');
    const [selectedTipoKey, setSelectedTipoKey] = useState(''); // Para armazenar a key selecionada
    const [campaigns, setCampaigns] = useState([]);

    // Dados para a lista de tipos sanguíneos
    const tipos = [
        { key: "1", value: "A+" },
        { key: "2", value: "A-" },
        { key: "3", value: "B+" },
        { key: "4", value: "B-" },
        { key: "5", value: "AB+" },
        { key: "6", value: "AB-" },
        { key: "7", value: "O+" },
        { key: "8", value: "O-" },
        { key: "9", value: "Todos" }, // Adiciona a opção "Todos"
    ];

    // Função para lidar com clique nos filtros de tipo de doação
    const handleFiltroPress = (filtro) => {
        if (filtro === 'filtro1') {
            if (filtro1Selecionado) {
                setFiltro1Selecionado(false);
                setTipoDoacao(''); // Limpa o filtro de doação
            } else {
                setFiltro1Selecionado(true);
                setFiltro2Selecionado(false);
                setTipoDoacao('Doação de reposição');
            }
        } else if (filtro === 'filtro2') {
            if (filtro2Selecionado) {
                setFiltro2Selecionado(false);
                setTipoDoacao(''); // Limpa o filtro de doação
            } else {
                setFiltro2Selecionado(true);
                setFiltro1Selecionado(false);
                setTipoDoacao('Doação voluntária');
            }
        }
    };

    // Função para buscar campanhas do Supabase
    const fetchCampaigns = async () => {
        let query = supabase.from('campanhas').select('*');

        // Se um tipo de doação estiver selecionado, adiciona filtro para o tipo de doação
        if (tipoDoacao) {
            query = query.eq('tipoDoacao', tipoDoacao);
        }

        // Se "Todos" não estiver selecionado, aplica filtro de tipo sanguíneo
        if (tipoSanguineoSelecionado && tipoSanguineoSelecionado !== 'Todos') {
            query = query.eq('tipoSanguineo', tipoSanguineoSelecionado); // Certifique-se de que 'tipoSanguineo' exista no Supabase
        }

        const { data, error } = await query;

        if (error) {
            console.error('Error fetching campaigns:', error);
        } else {
            setCampaigns(data);
        }
    };

    // Atualiza as campanhas sempre que o tipoDoacao ou tipoSanguineoSelecionado muda
    useEffect(() => {
        fetchCampaigns();
    }, [tipoDoacao, tipoSanguineoSelecionado]);



    const imagens = [
        { id: 1, uri: agulhaImage },
        { id: 2, uri: coracaoDoacaoImage },
        { id: 3, uri: sangueImage },
    ];

    const [modalVisible, setModalVisible] = useState(false);
    const [selectedCampaign, setSelectedCampaign] = useState(null);

    const handleCampaignPress = (campaign) => {
        setSelectedCampaign(campaign); // Define a campanha selecionada
        setModalVisible(true); // Abre o modal
    };

    const handleCloseModal = () => {
        setModalVisible(false); // Fecha o modal
        setSelectedCampaign(null); // Limpa a campanha selecionada
    };

    const CampanhasDetalhes = ({ campaign, onClose }) => {
        if (!campaign) return null; // Certifica-se de que existe uma campanha selecionada

        const randomImageIndex = Math.floor(Math.random() * imagens.length);
        const randomImage = imagens[randomImageIndex];

        return (
            <SafeAreaView style={styles.CampanhaDetalhesContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={onClose}>
                        <AntDesign name="arrowleft" size={28} color="#326771" />
                    </TouchableOpacity>
                </View>
                <View style={styles.campanhaDetalhes}>

                    <Text style={styles.campanhaTitle}>{campaign.titulo}</Text>
                    <View style={[styles.detailsContainer,  { width: '40%', marginTop: 10}]}>

                        <View style={styles.infoTagTipo}>
                            <Text style={styles.infoText}>{campaign.tipoDoacao}</Text>
                        </View >
                        <View style={styles.infoTag}>
                            <Text style={styles.infoText}>{campaign.tipoSanguineo}</Text>
                        </View>
                        <Text style={styles.infoText}>{campaign.local}</Text>
                    </View>
                    <Text style={[styles.campanhaDesc, {textAlign: 'justify', marginTop: 20}]}>{campaign.descricao}</Text>
                    <Image source={randomImage.uri} style={styles.image} />
                    <View style={styles.shareContainer}>
                        <Text style={styles.shareText}>Compartilhe:</Text>
                        <TouchableOpacity>
                            <FontAwesome name="share-alt" size={16} color="#005555" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="instagram" size={16} color="#005555" style={styles.icon} />
                        </TouchableOpacity>
                        <TouchableOpacity>
                            <FontAwesome name="facebook" size={16} color="#005555" style={styles.icon} />
                        </TouchableOpacity>
                    </View>
                </View>
            </SafeAreaView>
        );
    };

    const CampanhaList = () => {
        return (
            <View style={styles.listaCampanhasContainer}>
                {campaigns.map((item) => {
                    const randomImageIndex = Math.floor(Math.random() * imagens.length);
                    const randomImage = imagens[randomImageIndex];
                    return (
                        <TouchableOpacity onPress={() => handleCampaignPress(item)} key={item.id}>
                            <View style={styles.campanhasContainer}>
                                <Text style={styles.campanhaTitle}>{item.titulo}</Text>
                                <View style={styles.detailsContainer}>
                                    <View style={styles.infoTagTipo}>
                                        <Text style={styles.infoText}>{item.tipoDoacao}</Text>
                                    </View>
                                    <View style={styles.infoTag}>
                                        <Text style={styles.infoText}>{item.tipoSanguineo}</Text>
                                    </View>
                                    <Text style={styles.infoText}>{item.local}</Text>
                                </View>
                                <Text style={styles.campanhaDesc} numberOfLines={4}>{item.descricao}</Text>
                                <Text style={styles.campanhaMais}>Ler mais...</Text>
                                <Image source={randomImage.uri} style={styles.image} />
                                <View style={styles.shareContainer}>
                                    <Text style={styles.shareText}>Compartilhe:</Text>

                                    <TouchableOpacity >
                                        <FontAwesome name="share-alt" size={16} color="#005555" style={styles.icon} />
                                    </TouchableOpacity>

                                    <TouchableOpacity >
                                        <FontAwesome name="instagram" size={16} color="#005555" style={styles.icon} />
                                    </TouchableOpacity>

                                    <TouchableOpacity >
                                        <FontAwesome name="facebook" size={16} color="#005555" style={styles.icon} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </TouchableOpacity>
                    );
                })}

            </View>
        );
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



    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Campanhas</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="gear" size={32} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.contentContainer}>
                    <View style={styles.contentTitle}>

                        <Text style={styles.titleContent}>Campanhas de doação</Text>
                        <Text style={styles.subContent}>Divulgue sua causa ou apoie uma</Text>
                    </View>

                    <View style={styles.filtroContainer}>
                        <SelectList
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder='Tipo sanguíneo'
                            inputStyles={{ fontSize: 12 }}
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                            setSelected={(val) => {
                                const selectedValue = tipos.find(tipo => tipo.key === val)?.value || '';
                                setSelectedTipoKey(val); // Atualiza a chave selecionada
                                setTipoSanguineoSelecionado(selectedValue); // Atualiza o tipo sanguíneo selecionado
                            }}
                            selected={selectedTipoKey} // Para manter o valor selecionado
                        />
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
                    <ScrollView style={styles.ScrollView} contentContainerStyle={{ paddingVertical: 20 }}>
                        <CampanhaList handleCampaignPress={handleCampaignPress} />
                    </ScrollView>
                    <Modal
                        animationType="slide"
                        visible={modalVisible}
                        onRequestClose={handleCloseModal}
                    >
                        <CampanhasDetalhes campaign={selectedCampaign} onClose={handleCloseModal} />
                    </Modal>




                    <View style={styles.campanhaCriar}>
                        <TouchableOpacity style={styles.criarBt} onPress={() => navigation.navigate('CriarCampanha')}>
                            <AntDesign name="pluscircleo" size={64} color="black" style={styles.iconCriar} />
                        </TouchableOpacity>
                    </View>

                </View>
            </View>
            
        </SafeAreaView>
    )


}

export default CampanhaMain;

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
        height: '10%',
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
        marginTop: 28,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22

    },
    config: {
        marginTop: 28,
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
    },
    contentTitle: {
        marginTop: 16,
        marginBottom: 21,
        gap: 12
    },
    titleContent: {
        fontFamily: 'DM-Sans',
        fontSize: 20,
        color: '#000',
    },
    subContent: {
        fontFamily: 'DM-Sans',
        fontSize: 15,
        color: '#000',
        paddingLeft: 5
    },
    dropdownStyles: {
        width: 120,
        borderColor: '#DAEEF2',
        borderRadius: 7,
        backgroundColor: '#DAEEF2',
        marginTop: '',
        marginBottom: '5%'
    },
    boxStyles: {
        width: 120,
        borderColor: '#DAEEF2',
        borderRadius: 7,
        backgroundColor: '#DAEEF2',
        gap: 10
    },
    dropdownItemStyles: {
        color: '#af2b2b'
    },
    filtroButton: {
        backgroundColor: '#DAEEF2',
        borderRadius: 7,
        justifyContent: 'center',
        alignItems: 'center',
        flexShrink: 1,
        maxHeight: 40,
        padding: 10,
    },
    filtroSelecionado: {
        backgroundColor: '#F2DADA',
    },
    txtFiltroBt: {
        fontSize: 11,
        textAlign: 'center',
    },
    filtroContainer: {
        flexDirection: 'row',
        gap: 10,
    },
    campanhasContainer: {
        width: '100%',
        backgroundColor: '#DAEEF2',
        top: 24,
        padding: 26,
        borderRadius: 15,
        marginBottom: 20,
        paddingBottom: 20,
        paddingTop: 20,
    },
    campanhaTitle: {
        fontSize: 23,
        marginBottom: 10,
        fontFamily: 'DM-Sans'

    },
    campanhaDesc: {
        fontSize: 13,
        marginBottom: 30,
        fontFamily: 'DM-Sans'

    },
    campanhaMais: {
        fontSize: 11,
        color: '#1e6370',
        marginBottom: 10
    },
    campanhaCriar: {
        position: 'absolute',
        bottom: -10,
        right: -10,
        zIndex: 1,
    },
    iconCriar: {
        backgroundColor: '#DAEEF2',
        borderRadius: 50
    },
    listaCampanhasContainer: {
        gap: 5,
    },
    contentContainer: {
        flexDirection: 'column',
        flex: 1,
    },
    ScrollView: {
        paddingBottom: 20,
        flexGrow: 1,
    },
    image: {
        width: 300,
        height: 150,
        borderRadius: 15,
    },
    detailsContainer: {
        flexDirection: 'row',
        gap: 10,
        marginBottom: 10,
        alignItems: 'center'
    },
    shareContainer: {
        flexDirection: 'row',
        gap: 10,
        marginTop: 20,
        alignItems: 'center'
    },
    infoTag: {
        backgroundColor: '#F2DADA',
        height: 25,
        width: 28,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    infoTagTipo: {
        backgroundColor: '#F2DADA',
        height: 25,
        width: 130,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
    },
    infoText: {
        fontSize: 12,
        fontFamily: 'DM-Sans'
    },
    shareText: {
        fontFamily: 'DM-Sans',
        fontSize: 13,
    },

    //modal
    CampanhaDetalhesContainer: {
        justifyContent: 'center',
        flex: 1,
        height: '100%',
    },
    campanhaDetalhes: {
        marginLeft: 50,
        marginTop: -150,
        marginRight: 50,
    }
})