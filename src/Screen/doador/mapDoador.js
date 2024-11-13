import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../Services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';


import MenuDoador from '../../../components/menu/menuDoador';

const GOOGLE_MAPS_API_KEY = 'AIzaSyAoKrjxoAFNaQLZdnVEqd2npM2bRQ-xmQE';


const HemocentrosMap = () => {
    const navigation = useNavigation();
    const [location, setLocation] = useState(null);
    const [hemocentros, setHemocentros] = useState([]);
    const [selectedHemocentro, setSelectedHemocentro] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);



    const handleMarkerPress = (hemocentro) => {
        setSelectedHemocentro(hemocentro);
        setModalVisible(true);
    };

    // Função para buscar hemocentros no Firestore
    const fetchHemocentros = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, 'Hemocentro'));
            const hemocentrosData = await Promise.all(
                querySnapshot.docs.map(async (doc) => {
                    const data = doc.data();
                    const endereco = data.Endereço;

                    if (!endereco) {
                        console.error("Erro: Endereço não encontrado para o documento", doc.id);
                        return null; // Ignora este documento se não tiver o endereço
                    }

                    // Verifica cada campo e define um valor padrão se estiver ausente
                    const rua = endereco.Rua || '';
                    const numero = endereco.Numero || '';
                    const bairro = endereco.Bairro || '';
                    const cidade = endereco.Cidade || '';
                    const estado = endereco.Estado || '';
                    const cep = endereco.CEP || '';

                    const fullAddress = `${rua}, ${numero}, ${bairro}, ${cidade} - ${estado}, ${cep}`;
                    console.log("Endereço completo:", fullAddress);

                    const coords = await geocodeAddress(fullAddress);

                    return {
                        id: doc.id,
                        name: data.Nome || 'Nome do Hemocentro',
                        fullAddress,
                        ...coords

                    };
                })
            );

            // Filtra para remover documentos nulos (sem endereço)
            setHemocentros(hemocentrosData.filter(Boolean));
        } catch (error) {
            console.error("Erro ao buscar hemocentros: ", error);
        }
    };

    // Função que usa a API do Google para geocodificar um endereço
    const geocodeAddress = async (address) => {
        try {
            const response = await axios.get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                params: {
                    address: address,
                    key: GOOGLE_MAPS_API_KEY
                }
            });

            console.log("Resposta da geocodificação:", response.data);

            // Verifica se a resposta tem resultados válidos
            if (response.data.status === "OK" && response.data.results.length > 0) {
                const location = response.data.results[0].geometry.location;

                // Verifica se o resultado é uma correspondência parcial
                if (response.data.results[0].partial_match) {
                    console.warn("Endereço parcialmente correspondido:", address);
                }

                return { latitude: location.lat, longitude: location.lng };
            } else {
                console.error("Erro ao geocodificar o endereço:", address, response.data.status);
                return { latitude: 0, longitude: 0 }; // Retorna coordenadas padrão em caso de falha
            }
        } catch (error) {
            console.error("Erro ao geocodificar o endereço: ", error);
            return { latitude: 0, longitude: 0 };
        }
    };


    useEffect(() => {
        fetchHemocentros();
    }, []);

    // Função para obter a localização atual
    useEffect(() => {
        (async () => {
            let { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert('Permissão negada', 'Permissão para acessar a localização foi negada.');
                return;
            }

            let location = await Location.getCurrentPositionAsync({});
            setLocation(location.coords);
        })();
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Hemocentros próximos </Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>

            {location && (
                <MapView
                    style={{ flex: 1 }}
                    initialRegion={{
                        latitude: location.latitude,
                        longitude: location.longitude,
                        latitudeDelta: 0.09,
                        longitudeDelta: 0.09,
                    }}
                    showsUserLocation={true}
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
            )}

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
                                        source={require('../../../assets/img/hospital_image.png')}
                                        style={styles.image}
                                    />
                                    <Text style={styles.popupTitle}>{selectedHemocentro.name}</Text>
                                </View>
                                <Text style={styles.popupDescription}>{selectedHemocentro.fullAddress}</Text>
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
            <MenuDoador />
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
        letterSpacing: 1.5,
        fontSize: 16,
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
