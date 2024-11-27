import React from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Share } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const imagens = [
    { id: 1, uri: require('./../../assets/img/agulha.jpg') },
    { id: 2, uri: require('./../../assets/img/coracaoDoacao.jpg') },
    { id: 3, uri: require('./../../assets/img/sangue.jpg') },
];


const handleShare = async (campaign) => {
    const message = `Campanha de doação de sangue: ${campaign.titulo}\n\nTipo Sanguíneo: ${campaign.tipoSanguineo}\n\nLocal: ${campaign.local}\n\nDescrição: ${campaign.descricao}\n\nApoie essa causa!`;

    try {
        const result = await Share.share({
            message: message,
        });

        if (result.action === Share.sharedAction) {
            if (result.activityType) {
                console.log('Compartilhado com sucesso via:', result.activityType);
            } else {
                console.log('Compartilhado com sucesso!');
            }
        } else if (result.action === Share.dismissedAction) {
            console.log('Compartilhamento cancelado');
        }
    } catch (error) {
        console.log('Erro ao tentar compartilhar:', error.message);
    }
};

const CampanhasDetalhes = ({ campaign, onClose }) => {
    if (!campaign) return null;

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
                <View style={[styles.detailsContainer, { width: '40%', marginTop: 10 }]}>
                    <View style={styles.infoTagTipo}>
                        <Text style={styles.infoText}>{campaign.tipoDoacao}</Text>
                    </View>
                    <View style={styles.infoTag}>
                        <Text style={styles.infoText}>{campaign.tipoSanguineo}</Text>
                    </View>
                    <Text style={styles.infoText}>{campaign.local}</Text>
                </View>
                <Text style={[styles.campanhaDesc, { textAlign: 'justify', marginTop: 20 }]}>
                    {campaign.descricao}
                </Text>
                <Image source={randomImage.uri} style={styles.image} />
                <View style={styles.shareContainer}>
                    <Text style={styles.shareText}>Compartilhe:</Text>
                    <TouchableOpacity onPress={() => handleShare(campaign)}>
                        <FontAwesome name="share-alt" size={16} color="#005555" style={styles.icon} />
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    );
};

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
});

export default CampanhasDetalhes;
