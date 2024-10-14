import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'


import MenuDoador from '../components/menuDoador';

const HemocentrosMap = () => {
    const [selectedHemocentro, setSelectedHemocentro] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    const navigation =  useNavigation();


    const hemocentros = [
        {
            id: 1,
            name: 'Hospital Geral',
            description: 'O Hemocentro do Hospital Geral oferece um atendimento eficiente e acolhedor, com uma equipe profissional e dedicada. As instalações são limpas e bem organizadas, proporcionando uma experiência positiva para doadores e pacientes.',
            latitude: -23.60488889090432,
            longitude: -46.76314845503553,
        },
        {
            id: 2,
            name: 'Hospital Aldeota',
            description: 'O Hemocentro do Hospital Aldeota é conhecido por...',
            latitude: -23.604146637826567,
            longitude: -46.76351859985018,
        },
    ];

    const handleMarkerPress = (hemocentro) => {
        setSelectedHemocentro(hemocentro);
        setModalVisible(true);
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Hemocentros próximos </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>

            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: -23.60481024177061,
                    longitude: -46.763733176554325,
                    latitudeDelta: 0.005,
                    longitudeDelta: 0.005,
                }}
            >
                {hemocentros.map((hemocentro) => (
                    <Marker
                        key={hemocentro.id}
                        coordinate={{
                            latitude: hemocentro.latitude,
                            longitude: hemocentro.longitude,
                        }}
                        title={hemocentro.name}
                        onPress={() => handleMarkerPress(hemocentro)}
                        pinColor='#af2b2b'
                        style={styles.marker}
                    />
                ))}
            </MapView>

            {/* Modal para exibir detalhes do hemocentro */}
            <Modal
                visible={modalVisible}
                transparent={true}
                animationType="slide"
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={{ flex: 1, justifyContent: 'flex-end', backgroundColor: 'rgba(0,0,0,0.5)' }}>
                    <View style={styles.popup}>
                        {selectedHemocentro && (
                            <>
                                <View style={styles.viewFotos}>
                                    <Image
                                        source={require('../assets/img/hospital_image.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.popupTitle}>{selectedHemocentro.name}</Text>
                                </View>
                                <Text style={styles.popupDescription}>{selectedHemocentro.description}</Text>
                                <TouchableOpacity
                                    onPress={() => setModalVisible(false)}
                                    style={styles.closeButton}
                                >
                                    <Text style={styles.closeButtonTitle}>Fechar</Text>
                                </TouchableOpacity>
                            </>
                        )}
                    </View>
                </View>
            </Modal>
            <MenuDoador/>
        </View>
    );
};

export default HemocentrosMap;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-end',
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
    config: {
        marginTop: 7,
        marginRight: 10,
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 7,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5
    },
    map: {
        width: '100%',
        height: '100%',
    },
    marker: {
        marginBottom: 90,
    },
    popup: {
        backgroundColor: 'white',
        padding: 33,
        borderTopRightRadius: 8,
        borderTopLeftRadius: 8,
        marginTop: 'auto',
        height: '35%'
    },
    popupTitle: {
        fontSize: 18,
        fontFamily: 'DM-Sans Bold',
        marginBottom: 8,
        color: '#053A45',
        marginTop: 11
    },
    popupDescription: {
        fontSize: 14,
        textAlign: 'justify',
        marginTop: 20,
        fontFamily: 'DM-Sans',
    },
    viewFotos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 40,
        height: 40,
        marginRight: 5
    },
    closeButton: {
        backgroundColor: '#AF2B2B',
        padding: 10,
        borderRadius: 4,
        marginTop: "auto",
        textAlign: 'center',
    },
    closeButtonTitle: {
        color: '#fff',
        fontSize: 16,
        fontFamily: 'DM-Sans Bold',
        textAlign: 'center'
    },
});