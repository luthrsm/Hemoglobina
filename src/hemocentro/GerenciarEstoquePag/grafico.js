import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';

import MenuHemocentro from '../../components/menuHemocentro';
import AntDesign from '@expo/vector-icons/AntDesign';

const SangueChart = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);

  const sangueData = [
    { type: 'A+', litros: 45 },
    { type: 'A-', litros: 20 },
    { type: 'B+', litros: 80 },
    { type: 'B-', litros: 45 },
  ];
  const sangueData2 = [
    { name: 'AB+', liters: 44 },
    { name: 'AB-', liters: 81 },
    { name: 'O+', liters: 93 },
    { name: 'O-', liters: 44 },
  ]; 

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const renderChart = () => {
    if (currentPage === 1) {
      return (
        <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
          <View style={styles.chartContainer}>
            <View style={styles.yAxis}>
              <Text style={styles.yAxisLabel}>100</Text>
              <Text style={styles.yAxisLabel}>80</Text>
              <Text style={styles.yAxisLabel}>60</Text>
              <Text style={styles.yAxisLabel}>40</Text>
              <Text style={styles.yAxisLabel}>20</Text>
              <Text style={styles.yAxisLabel}>0</Text>
            </View>
            <View style={styles.xAxis}>
              {sangueData.map((data, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      { height: data.litros * 2.67},
                    ]}
                  />
                  <Text style={styles.xAxisLabel}>{data.type}</Text>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
        
      );
    } else if (currentPage === 2) {
      return (
        <SafeAreaView style={{justifyContent: 'center', alignItems: 'center', marginTop: 30,}}>
          <View style={styles.chartContainer}>
            <View style={styles.yAxis}>
              <Text style={styles.yAxisLabel}>100</Text>
              <Text style={styles.yAxisLabel}>80</Text>
              <Text style={styles.yAxisLabel}>60</Text>
              <Text style={styles.yAxisLabel}>40</Text>
              <Text style={styles.yAxisLabel}>20</Text>
              <Text style={styles.yAxisLabel}>0</Text>
            </View>
            <View style={styles.xAxis}>
              {sangueData2.map((data, index) => (
                <View key={index} style={styles.barContainer}>
                  <View
                    style={[
                      styles.bar,
                      { height: data.liters * 2.67},
                    ]}
                  />
                  <Text style={styles.xAxisLabel}>{data.name}</Text>
                </View>
              ))}
            </View>
          </View>
        </SafeAreaView>
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Banco de sangue - Hemocentro </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Estoque')}>
              <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>
        <View style={styles.textoBancoSan}>
            <Text style={styles.titleBanco}>Banco de sangue</Text>
            <Text style={styles.titleBanco}>por tipo sanguíneo</Text>
        </View>
        {renderChart()} 
        <View style={styles.contaButton}>
            <TouchableOpacity 
              style={[ styles.arrowButton, currentPage === 1 ? styles.disabledButton : null ]}
              disabled={currentPage === 1}
              onPress={() => handlePageChange(currentPage - 1)}>
                <Ionicons name="chevron-back-outline" size={28} color="#EEF0EB" />
                </TouchableOpacity>
            <TouchableOpacity 
              style={[ styles.arrowButton, currentPage === 2 ? styles.disabledButton : null ]}
              disabled={currentPage === 2}
              onPress={() => handlePageChange(currentPage + 1)} >
                <Ionicons name="chevron-forward-outline" size={28} color="#EEF0EB" />
            </TouchableOpacity>
        </View>
      </View>

        <MenuHemocentro />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
  },
  mainContainer: {
    top: 20,
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
  titleBanco: {
    fontSize: 22,
    fontWeight: '700',
    textAlign: 'center',
    color: '#470404'
  },
  chartContainer: {
    width: '80%',
    height: 300,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    flexDirection: 'row',
  },
  textoBancoSan: {
    marginBottom: 16,
    marginTop: 28,
  },
  yAxis: {
    width: 50,
    justifyContent: 'space-between',
    padding: 10,
  },
  yAxisLabel: {
    fontSize: 12,
  },
  xAxis: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    flex: 1,
  },
  barContainer: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'column-reverse'
  },
  bar: {
    width: 50,
    backgroundColor: '#AF2B2B',
    marginBottom: 5,
    borderRadius: 2,
  },
  xAxisLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  arrowButton: {
    backgroundColor: '#AF2B2B',
    padding: 8,
    borderRadius: 4,
    width: 70,
    alignItems: 'center',
  },
  contaButton: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 60,
    width: '80%',
    alignSelf: 'center',
  },
  disabledButton: {
    opacity: 1.0,
    backgroundColor: '#ccc',
  },
  disabledButton2: {
    opacity: 1.0,
    color: '#ccc'
  },
  arrowButton2: {
    padding: 8,
    borderRadius: 4,
    width: 70,
    alignItems: 'center',
  },
  icons: {
    color: '#AF2B2B',
  },
});

export default SangueChart;