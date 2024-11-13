import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuDoador from '../../../components/menu/menuDoador';

const donationsData = [
  {
    id: '1',
    date: '23/12/202544',
    location: 'Banco de sangue paulista',
    bloodType: 'A+',
    cpf: '09876474029',
  },
  {
    id: '2',
    date: '06/08/2024',
    location: 'Hospital Geral',
    bloodType: 'A+',
    cpf: '09876474029',
  },
  {
    id: '3',
    date: '14/10/2023',
    location: 'Banco de sangue paulista',
    bloodType: 'A+',
    cpf: '09876474029',
  },
];

const DonationItem = ({ donation }) => {
  const [showDetails, setShowDetails] = useState(false);

  const toggleDetails = () => {
    setShowDetails(!showDetails);
  };

  return (
    <TouchableOpacity onPress={toggleDetails} style={styles.donationItem}>
      <View style={styles.donationInfo}>
        <Text style={styles.donationDate}>Data da doação: {donation.date}</Text>
        <Text style={styles.donationLocation}>Local: {donation.location}</Text>
        <Text style={styles.donationBloodType}>Tipo sanguíneo: {donation.bloodType}</Text>
      </View>
      {showDetails && (
        <View style={styles.donationDetails}>
          <Text style={styles.donationCpf}>CPF: {donation.cpf}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
};





const HistoricoDoacoes = () => {

    const scrollViewRef = useRef(null);

    const navigation = useNavigation();

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Histórico de doações</Text>
                <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB"  />
                </TouchableOpacity>
            </View>

            <View style={styles.mainContainer}>
              <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('HomeDoador')}>
                  <AntDesign name="arrowleft" size={24} color="#326771" />
                </TouchableOpacity>
              </View>

                <View style={styles.txtFotoContainer}>
                  <Text style={styles.txtTitle}>Últimas Doações</Text>
                  <Text >Até agora foram feitas: {donationsData.length} doações</Text>
                </View>

              <ScrollView
                ref={scrollViewRef}
                style={styles.scrollView}
                showsVerticalScrollIndicator={true}
              >
                <View style={styles.doacoesContainer}>
                    <View style={styles.donationList}>
                  {donationsData.map((donation, index) => (
                    <DonationItem key={donation.id} donation={donation} />
                  ))}
                    </View>

                </View>
              </ScrollView>
                
            </View>

            <MenuDoador />
        </View>

    )
}

export default HistoricoDoacoes;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul 

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
    justifyContent: 'flex-end',
  },
  headerContainer: {
    backgroundColor: '#AF2B2B',
    height: '7%',
    borderBottomLeftRadius: 8,
    borderBottomRightRadius: 8,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between"
  },
  voltarContainer: {
    position: 'absolute',
    left: 16,
  },
  btConfig: {
    marginRight: 20,
  },
  title: {
    color: '#EEF0EB',
    marginLeft: 25,
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5,
    fontSize: 16
  },
  scrollView: {
    flex: 1,
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1,
  },
  txtTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
  },
  txtFotoContainer: {
    marginBottom: 20,
  },
  doacoesContainer: {
    
  },
  donationList: {
    padding: 16,
  },
  donationItem: {
    backgroundColor: '#DAEEF2',
    padding: 16,
    marginBottom: 8,
    borderRadius: 8,
    borderColor: '#000',
    borderWidth: 1,
  },
  donationInfo: {
    marginBottom: 8,
  },
  donationDate: {
    fontSize: 14,
    fontFamily: 'DM-Sans',
  },
  donationLocation: {
    fontSize: 14,
    fontFamily: 'DM-Sans',
  },
  donationBloodType: {
    fontSize: 14,
    fontFamily: 'DM-Sans',
  },
  donationDetails: {
    borderRadius: 8,
    fontFamily: 'DM-Sans',
  },
  donationCpf: {
    fontSize: 14,
    fontFamily: 'DM-Sans',

  },

});
