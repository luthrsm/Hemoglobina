import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';
import { FontAwesome6 } from '@expo/vector-icons';

import MenuDoador from '../../componentes/menu';

export default function App() {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  const markers = [
    {
      coordinate: { latitude: -3.7198, longitude: -38.5338 },
      id: 1,
      title: 'Hospital Geral',
      description: 'O Hemocentro do Hospital Geral oferece um atendimento eficiente e acolhedor, com uma equipe profissional e dedicada. As instalações são limpas e bem organizadas, proporcionando uma experiência positiva para doadores e pacientes.',
    },
    {
      coordinate: { latitude: -3.7236, longitude: -38.5373 },
      id: 2,
      title: 'Hospital Monte Klinikum',
      description: 'Hospital Monte Klinikum',
    },
    {
      coordinate: { latitude: -3.7267, longitude: -38.5323 },
      id: 3,
      title: 'Hospital Etec Taboão',
      description: 'Hospital Etec Taboão, sinta-se a vontade para sofrer, digo, estudar com Agente :0',
    },
    {
      coordinate: { latitude: -3.7283, longitude: -38.5340 },
      id: 4,
      title: 'Hospital São Carlos',
      description: 'Hospital São Carlos',
    },
    {
      coordinate: { latitude: -3.7327, longitude: -38.5283 },
      id: 5,
      title: 'Hospital São Mateus',
      description: 'Hospital São Mateus',
    },
  ];

  const handleMarkerPress = (marker) => {
    setSelectedMarker(marker);
  };

    useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permissão de localização negada.');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
         <Text style={styles.title}> Hemocentros </Text>
            <TouchableOpacity>
              <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
            </TouchableOpacity>
      </View>

      <View>
        <MapView style={styles.map} initialRegion={{
        latitude: -3.7198,
        longitude: -38.5338,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      }}>
        {markers.map((marker) => (
          <Marker
            style={styles.marker}
            key={marker.id}
            coordinate={marker.coordinate}
            title={marker.title}
            onPress={() => handleMarkerPress(marker)}
            pinColor="#AF2B2B"
          />
        ))}
      </MapView>
      {selectedMarker && (
        <View style={styles.popup}>
          <View style={styles.viewFotos}>
            <Image 
              source={require('../../assets/img/imagesMapaDoador/hospital_image.png')}
              style={styles.image}
            />
            <Text style={styles.popupTitle}>{selectedMarker.title}</Text>
          </View>
          
          <Text style={styles.popupDescription}>{selectedMarker.description}</Text>
          <TouchableOpacity style={styles.closeButton} onPress={() => setSelectedMarker(null)}>
            <Text style={styles.closeButtonTitle}>Fechar</Text>
          </TouchableOpacity>
        </View>
      )}
      </View>
      

      <MenuDoador />
    </View>
    
  );
}

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
    padding: 16,
    borderRadius: 8,
    position: 'absolute',
    bottom: 80,
    marginBottom: 90,
    left: 16,
    right: 16,
    zIndex: 10,
  },
  popupTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  popupDescription: {
    fontSize: 14,
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
    marginTop: 16,
    textAlign: 'center',
  },
  closeButtonTitle: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center'
  },
});