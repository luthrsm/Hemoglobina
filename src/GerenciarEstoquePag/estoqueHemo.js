import React, { useState, useRef } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView} from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import MenuHemo from '../../components/GerenciarEstoqueHemo/menuHemo';

const sangueData1 = [
  { name: 'A+', liters: 43 },
  { name: 'A-', liters: 2 },
  { name: 'B+', liters: 85 },
  { name: 'B-', liters: 43 },
  { name: 'AB+', liters: 44 },
  { name: 'AB-', liters: 81 },
  { name: 'O+', liters: 93 },
  { name: 'O-', liters: 44 },
];


const EstoqueBancoDeSangue = ({ navigation }) => {

  const [selectedType, setSelectedType] = useState(null);

  const handleTypePress = (type) => {
    setSelectedType(type);
    // Navegar para a tela de estoque com o tipo selecionado
    navigation.navigate('GerenciarEstoqueHemo', { type }); // Implemente a navegação
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Banco de sangue - Hemocentro</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}> 
          {/* COLOCAR PARA O HOME DO HEMOCENTRO NAVO=IGATION */}
          <TouchableOpacity onPress={() => navigation.navigate('LoginEscolha')}>
              <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <View style={styles.bloodTypeContainer}>
          <View style={styles.textoBancoSan}>
            <Text style={styles.bloodTypeTitle}>Banco de sangue</Text>
            <Text style={styles.bloodTypeTitle}>por tipo sanguíneo</Text>
          </View>

        <View style={styles.bloodTypeGrid}>
          {sangueData1.map((item, index) => (
            <View key={index}>
              <Text style={styles.bloodTypeText}>{item.name}</Text>
              <TouchableOpacity
                style={[styles.bloodTypeButton, selectedType === item.name ? styles.selectedType : null]}
                onPress={() => handleTypePress(item.name)} >
                <Text style={styles.bloodTypeQuantity}>{item.liters}l</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
          <TouchableOpacity onPress={() => navigation.navigate('SangueChart')} style={styles.verGrafico}>
            <FontAwesome5 name="chart-bar" size={20} color="white" />
            <Text style={styles.verGraficoText}>Ver gráfico</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuHemo/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
  },
  mainContainer: {
    top: 20,
    flex: 1,
  },
  voltarContainer: {
    position: 'absolute',
    top: 10,
    left: 16,
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
  title: {
    color: '#EEF0EB',
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5
  },
  bloodTypeContainer: {
    padding: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
  bloodTypeTitle: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#470404'
  },
  bloodTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 20,
  },
  bloodTypeButton: {
    backgroundColor: '#AF2B2B',
    width: 90,
    height: 90,
    marginBottom: 30,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedType: {
    backgroundColor: '#470404', // Cor para o tipo selecionado
  },
  bloodTypeText: {
    fontSize: 16,
    color: 'black',
    marginBottom: 4,
    textAlign: 'center',
  },
  bloodTypeQuantity: {
    fontSize: 16,
    color: 'white',
  },
  textoBancoSan: {
    marginBottom: 16,
    marginTop: 20,
  },
  verGrafico: {
    flexDirection: 'row',
    gap: 10,
    width: '50%',
    justifyContent: 'center',
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    backgroundColor: '#AF2B2B',
  },
  verGraficoText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default EstoqueBancoDeSangue;