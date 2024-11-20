import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import React, { useState, useRef, useEffect } from 'react';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { db, auth } from '../../Services/firebaseConfig';
import { collection, getDocs, query, where, doc, updateDoc, getDoc, onSnapshot } from 'firebase/firestore';

import MenuDoador from '../../../components/menu/menuDoador';


const HistoricoDoacoes = () => {
  const scrollViewRef = useRef(null);
  const navigation = useNavigation();
  const doadorUid = auth.currentUser?.uid;
  const [doacoes, setDoacoes] = useState([]);
  const [numDoacoes, setNumDoacoes] = useState('');
  const [local, setLocal] = useState('');
  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, "doacoes"),
        where("userUid", "==", doadorUid), // Filtra doações pelo id do usuário
        where('status', '==', 'confirmada')
      ),
      async (querySnapshot) => {
        const fetchedDoacoes = await Promise.all(
          querySnapshot.docs.map(async (docSnapshot) => {
            const doacaoData = docSnapshot.data();

            // Busca a referência do hemocentro usando o hemocentroUid
            const hemocentroRef = doc(db, "Hemocentro", doacaoData.hemocentroUid);
            const hemocentroDoc = await getDoc(hemocentroRef);

            // Verifica se o documento do hemocentro existe
            if (hemocentroDoc.exists()) {
              setLocal(hemocentroDoc.data().Nome);
            } else {
              console.log("Hemocentro não encontrado!");
            }

            return {
              id: docSnapshot.id,
              ...doacaoData,
            };
          })
        );

        setDoacoes(fetchedDoacoes);
        console.log("Doações atualizadas:", fetchedDoacoes);
      },
      (error) => {
        console.error("Erro ao escutar doações:", error);
      }
    );

    return () => unsubscribe();
  }, [doadorUid]);


  useEffect(() => {

    if (doadorUid) {
      // Busque os dados do usuário no Firestore
      const userRef = doc(db, 'doador', doadorUid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setNumDoacoes(docSnap.data().quantDoacoes)

        } else {
          console.log('No such document!');
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, []);


  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Histórico de doações</Text>
        <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
          <FontAwesome6 name="gear" size={24} color="#EEF0EB" />
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
          <Text >Até agora foram feitas: {numDoacoes} doações</Text>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.doacoesContainer}>
            <View style={styles.donationList}>
              {doacoes.length > 0 ? (
                doacoes.map((doacao) => (
                  <View style={styles.doacaoContainer} key={doacao.id}>
                    <View style={styles.donationItem}>
                      <View style={styles.donationInfo}>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.donationDate, {fontFamily: 'DM-Sans Medium'}]}>Data da doação:</Text>
                          <Text style={styles.donationDate}> {doacao.dataDoacao}</Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.donationLocation, {fontFamily: 'DM-Sans Medium'}]}>Local:</Text>
                          <Text style={styles.donationDate}>{local} </Text>
                        </View>
                        <View style={{ flexDirection: 'row' }}>
                          <Text style={[styles.donationBloodType, {fontFamily: 'DM-Sans Medium'}]}>Tipo sanguíneo: </Text>
                          <Text style={styles.donationDate}>{doacao.tipoSanguineo} </Text>
                        </View>
                      </View>
                    </View>
                  </View>
                ))
              ) : (
                <Text style={{ textAlign: 'center', fontFamily: 'DM-Sans', fontSize: 18 }}>Nenhuma doação registrada.</Text>

              )}
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
    fontSize: 18,
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
    gap: 5
  },
  donationDate: {
    fontSize: 15,
    fontFamily: 'DM-Sans',
  },
  donationLocation: {
    fontSize: 15,
    fontFamily: 'DM-Sans',
  },
  donationBloodType: {
    fontSize: 15,
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