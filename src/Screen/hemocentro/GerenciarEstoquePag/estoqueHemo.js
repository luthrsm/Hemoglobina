import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, SafeAreaView, ActivityIndicator } from 'react-native';
import { FontAwesome5 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';

import MenuHemocentro from '../../../../components/menu/menuHemocentro';
import GerenciarEstoqueHemo from '../../../../components/GerenciarEstoqueHemo/gerenciarEstoqueHemo';
import { db } from '../../../Services/firebaseConfig';
import { onSnapshot, getDoc, doc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const EstoqueBancoDeSangue = ({ navigation }) => {
  const auth = getAuth();
  const [uid, setUid] = useState(null);
  const [quantidades, setQuantidades] = useState(null);
  const [loading, setLoading] = useState(true);
  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'O-', 'AB-'];
  const [selectedType, setSelectedType] = useState(null);

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

  // Quando o UID estiver disponível, busca as quantidades de sangue
  useEffect(() => {
    if (!uid) return; // Não faz a busca se o UID não estiver disponível

    const unsubscribe = onSnapshot(doc(db, 'Hemocentro', uid), (docSnapshot) => {
      if (docSnapshot.exists()) {
        const data = docSnapshot.data();

        // Verifica se o estoque está presente e cria um array de tipos sanguíneos
        if (data.estoque) {
          const tipos = data.estoque; // Supondo que "estoque" seja um mapa de tipos sanguíneos

          // Transformando o estoque em um array para renderizar
          const estoqueArray = Object.keys(tipos).map((key) => ({
            name: key,
            mililiters: parseInt(tipos[key], 10) || 0,
          }));

          setQuantidades(estoqueArray); // Atualiza as quantidades com os dados do Firestore
        } else {
          console.log('Estoque não encontrado');
        }
      } else {
        console.log('Documento não encontrado');
      }
      setLoading(false); // Após carregar os dados, removemos o loading
    });

    // Retorna a função de limpeza do listener
    return () => unsubscribe();
  }, [uid]); // Dependência no UID

  // Renderiza a tela de loading enquanto as quantidades não estiverem disponíveis
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" color="#af2b2b" />
      </View>
    );
  }

  const handleTypePress = (type) => {
    // Navega para a tela de estoque com o tipo selecionado
    navigation.navigate('GerenciarEstoqueHemo', { type });
  };


  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Banco de sangue - Hemocentro</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeHemocentro')}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <View style={styles.bloodTypeContainer}>
          <View style={styles.textoBancoSan}>
            <Text style={styles.bloodTypeTitle}>Banco de sangue</Text>
            <Text style={styles.bloodTypeTitle}>por tipo sanguíneo</Text>
          </View>

          <View style={styles.bloodTypeGrid}>
            {quantidades.map((item, index) => (
              <View key={index}>
                <Text style={styles.bloodTypeText}>{item.name}</Text>
                <TouchableOpacity
                  style={[styles.bloodTypeButton]}
                  onPress={() => handleTypePress(item.name)}>
                  <Text style={styles.bloodTypeQuantity}>{item.mililiters}ml</Text>
                </TouchableOpacity>
              </View>
            ))}
          </View>

          <TouchableOpacity onPress={() => navigation.navigate('GraficosEstoque')} style={styles.verGrafico}>
            <FontAwesome5 name="chart-bar" size={20} color="white" />
            <Text style={styles.verGraficoText}>Ver gráfico</Text>
          </TouchableOpacity>
        </View>
      </View>

      <MenuHemocentro />
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