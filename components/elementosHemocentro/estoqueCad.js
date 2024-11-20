import React, { useEffect, useState } from 'react';
import { SafeAreaView, View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { db, auth } from '../../src/Services/firebaseConfig';
import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


import LoadingScreen from '../../src/Screen/geral/LoadingScreen';

const HemocentroScreen = ({ onNext, onBack }) => {
  const [selectedType, setSelectedType] = useState(null);
  const [quantidades, setQuantidades] = useState(null);
  const [allQuantitiesDefined, setAllQuantitiesDefined] = useState(false);
  const navigation = useNavigation();

  const bloodTypes = ['A+', 'B+', 'AB+', 'O+', 'A-', 'B-', 'O-', 'AB-'];

  useEffect(() => {
    const fetchQuantidades = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'Hemocentro'));
  
        // Lista dos tipos sanguíneos válidos
        const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  
        // Inicializa as quantidades somente com os tipos sanguíneos
        const newQuantidades = bloodTypes.reduce((acc, type) => {
          acc[type] = 0;
          return acc;
        }, {});
  
        // Processa os documentos retornados do Firestore
        querySnapshot.forEach((doc) => {
          const data = doc.data();
  
          if (data.estoque) {
            const tipos = data.estoque; // Acessa o mapa "estoque"
  
            Object.keys(tipos).forEach((key) => {
              if (newQuantidades.hasOwnProperty(key)) {
                newQuantidades[key] += parseInt(tipos[key], 10) || 0;
              }
            });
          } else {
            console.warn(`Documento ${doc.id} não possui o campo "estoque".`);
          }
        });
  
        console.log('Quantidades do Firestore:', newQuantidades);
        setQuantidades(newQuantidades);
      } catch (error) {
        console.error('Erro ao buscar os dados: ', error);
      }
    };
  
    fetchQuantidades();
  }, []);
  


  useEffect(() => {
    // Verifica se todas as quantidades são maiores que 0
    if (quantidades) {
      setAllQuantitiesDefined(Object.values(quantidades).every((q) => q > 0));
    }
  }, [quantidades]);


  const handleTypePress = (type) => {
    setSelectedType(type);
    navigation.navigate('EstoqueScreen', { type });
  };


  

  const finalizarCadastro = async (updateTipoUsuario) => {
    const uid = auth.currentUser?.uid;
    if (!uid) {
      console.error("UID não definido. Não é possível finalizar o cadastro.");
      alert("Erro interno. Por favor, tente novamente.");
      return;
    }
  
    try {
      const hemocentroRef = doc(db, 'Hemocentro', uid);
      await updateDoc(hemocentroRef, { cadastroCompleto: true });
      
      // Atualiza o tipo de usuário no App.js através da função callback
      updateTipoUsuario("hemocentro");
      
      console.log("Cadastro finalizado com sucesso!");
      navigation.navigate('HomeHemocentro');
    } catch (error) {
      console.error("Erro ao finalizar cadastro:", error);
    }
};


  


  if (!quantidades) {
    return (
      <LoadingScreen/>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.stepContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={onBack}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>
        <View style={styles.containerImg}>
          <Image style={styles.logo} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} />
        </View>
        <View style={styles.txtTopContainer}>
          <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
          <Text style={styles.txtSecundario}>Registrar banco de sangue</Text>
        </View>

        <View style={styles.inputContainer}>
          <View style={styles.regSangue}>
            {bloodTypes.map((type) => (
              <TouchableOpacity
                key={type}
                style={[styles.botaoSangue, selectedType === type && styles.selectedButton]}
                onPress={() => handleTypePress(type)}
              >
                <Text style={styles.buttonText}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <TouchableOpacity
            style={[styles.BtProx, !allQuantitiesDefined && styles.disabledButton]}
            onPress={() => {
              if (allQuantitiesDefined) {
                finalizarCadastro()
              } else {
                alert("Certifique-se de que todas as quantidades estão definidas.");
              }
            }}
            disabled={!allQuantitiesDefined}
          >
            <Text style={styles.txtBtProx}>Próximo</Text>
          </TouchableOpacity>

        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  selectedButton: {
    backgroundColor: '#AF2B2B', // Define a cor para o botão selecionado
    borderColor: '#AF2B2B',
  },
  disabledButton: {
    backgroundColor: '#C0C0C0', // Cor do botão desabilitado
  },
  buttonText: {
    fontSize: 18,
    color: '#000', // Cor do texto no botão selecionado
  },
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarContainer: {
    position: 'absolute',
    top: 15,
    left: 3,
  },
  containerImg: {
    marginBottom: 10,
  },
  logo: {
    width: 50,
    height: 50,
    marginTop: 30,
  },
  txtTopContainer: {
    marginBottom: 20,
  },
  txtPrincipal: {
    fontSize: 24,
    color: '#470404',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
  },
  txtSecundario: {
    fontSize: 16,
    color: '#470404',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center',
  },
  inputContainer: {
    marginTop: '5%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    height: '70%',
  },
  BtProx: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: '15%',
    width: '60%',
    alignSelf: 'center',
  },
  txtBtProx: {
    color: '#fff',
    fontSize: 16,
  },
  regSangue: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 30,
    width: '90%',
    alignSelf: 'center',
    marginTop: 10,
  },
  botaoSangue: {
    backgroundColor: '#EEF0EB',
    width: 90,
    height: 90,
    borderRadius: 80,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
});

export default HemocentroScreen 
