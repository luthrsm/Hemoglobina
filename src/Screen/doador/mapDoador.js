import React, { useState, useEffect } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, Image, Alert } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { useNavigation } from '@react-navigation/native';
import { db } from '../../Services/firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';
import axios from 'axios';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import MenuDoador from '../../../components/menu/menuDoador';
import { ScrollView } from 'react-native-gesture-handler';

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
                    const telefone = data.Telefone || 'Não informado';


                    // Verifica se o campo "Horário" existe no documento
                    const horarioFuncionamento = data.Horário || {};

                    // Processa os horários, adicionando valores padrão caso estejam ausentes
                    const horarios = {
                        "Seg-Sex": horarioFuncionamento["Seg-Sex"] || "Não informado",
                        "Sábado": horarioFuncionamento["Sábado"] || "Não informado",
                        "Domingo": horarioFuncionamento["Domingo"] || "Não informado",
                        "Específico": horarioFuncionamento["Específico"] || "Não informado",
                    };

                    if (!endereco) {
                        console.error("Erro: Endereço não encontrado para o documento", doc.id);
                        return null;
                    }

                    const rua = endereco.Rua || '';
                    const numero = endereco.Número || '';
                    const bairro = endereco.Bairro || '';
                    const cidade = endereco.Cidade || '';
                    const estado = endereco.Estado || '';
                    const cep = endereco.CEP || '';
                    const complemento = endereco.Complemento || '';

                    const fullAddress = `${rua}, ${numero}, ${complemento}, ${bairro}, ${cidade} - ${estado}, ${cep}`;
                    const coords = await geocodeAddress(fullAddress);

                    return {
                        id: doc.id,
                        name: data.Nome || 'Nome do Hemocentro',
                        fullAddress,
                        ...coords,
                        telefone,
                        horarios,
                    };
                })
            );

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
                                <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: '20', marginBottom: '10' }}>
                                    <Ionicons name="location-outline" size={24} color="#326771" style={styles.icons} />
                                    <Text style={[styles.popupDescription, { marginTop: 10, marginLeft: 7, alignSelf: 'center', fontSize: 16, fontFamily: 'DM-Sans Medium' }]}>Endereço:</Text>
                                </View>
                                <Text style={styles.popupDescription}>Endereço: {selectedHemocentro.fullAddress}</Text>
                                <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: '10', marginBottom: '10' }}>
                                    <Ionicons name="call-outline" size={24} color="#326771" style={styles.icons} />
                                    <Text style={[styles.popupDescription, { marginTop: 10, marginLeft: 7, alignSelf: 'center', fontSize: 16, fontFamily: 'DM-Sans Medium' }]}>Telefone:</Text>
                                </View>
                                <Text style={styles.popupDescription}>Telefone: {selectedHemocentro.telefone}</Text>
                                <View style={{ flexDirection: "row", alignItems: "baseline", marginTop: '10', marginBottom: '10' }}>
                                    <Ionicons name="time-outline" size={24} color="#326771" style={styles.icons} />
                                    <Text style={[styles.popupDescription, { marginTop: 10, marginLeft: 7, alignSelf: 'center', fontSize: 16, fontFamily: 'DM-Sans Medium' }]}>Horário de funcionamento:</Text>
                                </View>
                                {Object.entries(selectedHemocentro.horarios).map(([dia, horario]) => (
                                    <Text key={dia} style={styles.popupDescription}>
                                        {dia}: {horario}
                                    </Text>
                                ))}
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
        height: '55%'
    },
    popupTitle: {
        fontSize: 22,
        fontFamily: 'DM-Sans Bold',
        marginBottom: 8,
        color: '#053A45',
        marginTop: 11
    },
    popupDescription: {
        fontSize: 14,
        textAlign: 'justify',
        fontFamily: 'DM-Sans',
    },
    viewFotos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    image: {
        width: 50,
        height: 50,
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
