import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import { db } from '../../../Services/firebaseConfig';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import MenuHemocentro from '../../../../components/menu/menuHemocentro';
import AntDesign from '@expo/vector-icons/AntDesign';

const SangueChart = ({ navigation }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sangueData, setSangueData] = useState([]); // Alterado para array vazio por padrão
  const [loading, setLoading] = useState(true);
  const [uid, setUid] = useState(null);
  const [maxValue, setMaxValue] = useState(0);
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUid(user.uid);
      } else {
        setUid(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (!uid) return;

    const unsubscribe = onSnapshot(doc(db, 'Hemocentro', uid), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();
        const estoque = data.estoque;
        const estoqueArray = Object.keys(estoque).map((key) => ({
          type: key,
          mililitros: parseInt(estoque[key], 10),
        }));

        // Filtro para garantir que não haja valores nulos ou inválidos
        const validEstoque = estoqueArray.filter(item => !isNaN(item.mililitros) && item.mililitros > 0);
        
        setSangueData(validEstoque); // Atualiza o estado com estoque válido
        setLoading(false);
      } else {
        console.log("Documento não encontrado.");
        setLoading(false);
      }
    });

    return () => unsubscribe();
  }, [uid]);

  // Calcular o valor máximo de mililitros para o eixo Y
  useEffect(() => {
    if (sangueData && sangueData.length > 0) {
      const max = Math.max(...sangueData.map((data) => data.mililitros));
      setMaxValue(max);
    }
  }, [sangueData]);

  const getYScale = (value) => {
    if (maxValue === 0) return 0; // Evitar dividir por zero
    const scale = 100; // Valor máximo para o eixo Y
    return (value / maxValue) * scale; // Ajusta a altura com base no valor máximo
  };

  const RenderChart = () => {
    if (!sangueData || sangueData.length === 0) {
      return <Text style={styles.errorMessage}>Não há dados disponíveis para exibir.</Text>;
    }

    return (
      <SafeAreaView style={{ justifyContent: 'center', alignItems: 'center', marginTop: 30 }}>
        <View style={styles.chartContainer}>
          <View style={styles.yAxis}>
            {[100, 80, 60, 40, 20, 0].map((label) => (
              <Text key={label} style={styles.yAxisLabel}>
                {label}
              </Text>
            ))}
          </View>
          <View style={styles.xAxis}>
            {sangueData.map((data, index) => (
              <View key={index} style={styles.barContainer}>
                <View
                  style={[
                    styles.bar,
                    { height: getYScale(data.mililitros) },
                  ]}
                />
                <Text style={styles.xAxisLabel}>{data.type}</Text>
              </View>
            ))}
          </View>
        </View>
      </SafeAreaView>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Banco de sangue - Hemocentro</Text>
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
        {loading ? (
          <Text>Carregando...</Text>
        ) : (
          <RenderChart />
        )}
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
    width: '95%',
    height: '70%',
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
    width: 25,
    backgroundColor: '#AF2B2B',
    marginBottom: 5,
    borderRadius: 2,
  },
  xAxisLabel: {
    fontSize: 12,
    textAlign: 'center',
  },
  errorMessage: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SangueChart;
