import { useEffect, useState, useRef } from 'react';
import { Alert, Text, TextInput, TouchableOpacity, View, ScrollView, Image, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { FontAwesome6 } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { auth, db } from '../../Services/firebaseConfig';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import * as Print from 'expo-print';
import * as Sharing from 'expo-sharing';

import MenuDoador from '../../../components/menu/menuDoador';

const SolicitarCarteirinha = () => {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carteirinhaData, setCarteirinhaData] = useState(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollViewRef = useRef(null);
  const doadorUid = auth.currentUser?.uid;
  const navigation = useNavigation();

  const handleCpfChange = (text) => {
    setCpf(text);
  };

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsProcessing(true);

    try {
      const userDocRef = doc(db, 'doador', doadorUid);
      const userDoc = await getDoc(userDocRef);

      if (userDoc.exists()) {
        const userData = userDoc.data();

        // Se a pessoa já solicitou a carteirinha (campo cartSolicitada == true)
        if (userData.cartSolicitada) {
          Alert.alert('Carteirinha já solicitada', 'Você já solicitou a sua carteirinha.');
          setIsProcessing(false);
          setIsLoading(false);
          return;
        }
        const doacoes = parseInt(userData.quantDoacoes, 10);
        if (doacoes >= 3) {
          await updateDoc(userDocRef, { cartSolicitada: true });
          setCarteirinhaData(userData); 
        } else {
          Alert.alert(
            'Número de doações insuficiente',
            'Para solicitar sua carteirinha, você precisa ter realizado 3 ou mais doações.'
          );
        }
      } else {
        Alert.alert(
          'Número de doações insuficiente',
          'Para solicitar sua carteirinha, você precisa ter realizado 3 ou mais doações.'
        );
      }

      setIsProcessing(false);
      setIsLoading(false);
    } catch (error) {
    console.error(error);
    setIsLoading(false);
    setIsProcessing(false);
  }
};


useEffect(() => {
  if (doadorUid) {
    setIsLoading(true);
    const fetchUserData = async () => {
      try {
        const userDocRef = doc(db, 'doador', doadorUid);
        const userDoc = await getDoc(userDocRef);

        if (userDoc.exists()) {
          const userData = userDoc.data();
          if (userData.cartSolicitada) {
            setCarteirinhaData(userData);  // Atualiza o estado com os dados do usuário
          }
        } else {
          console.log('Documento não encontrado');
        }
      } catch (error) {
        console.error('Erro ao buscar dados do usuário', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }
}, [doadorUid]);


// Função para gerar o PDF
const gerarPdf = async () => {
  if (!carteirinhaData) {
    Alert.alert('Erro', 'Não foi possível gerar a carteirinha.');
    return;
  }

  const htmlContent = `
    <html>
      <head>
        <style>
          body {
            font-family: Arial, sans-serif;
            padding: 20px;
          }
          .title {
            text-align: center;
            font-size: 20px;
            font-weight: bold;
          }
          .content {
            margin-top: 20px;
          }
          .content p {
            font-size: 16px;
          }
          .footer {
            text-align: center;
            font-size: 14px;
            margin-top: 30px;
          }
        </style>
      </head>
      <body>
        <div class="title">
          CARTEIRINHA DE DOADOR
        </div>
        <div class="content">
          <p><strong>Nome:</strong> ${carteirinhaData.nome}</p>
          <p><strong>Data de Nascimento:</strong> ${carteirinhaData.dataNascimento}</p>
          <p><strong>CPF:</strong> ${carteirinhaData.cpf}</p>
          <p><strong>Tipo Sanguíneo:</strong> ${carteirinhaData.tipoSanguineo}</p>
          <p><strong>Última Doação:</strong> ${carteirinhaData.ultimaDoacao}</p
        </div>
        <div class="footer">
          Doe sangue, doe vidas.
        </div>
      </body>
    </html>
  `;

  try {
    const { uri } = await Print.printToFileAsync({
      html: htmlContent,
      fileName: 'CarteirinhaDoador',
    });

    if (Sharing.isAvailableAsync()) {
      await Sharing.shareAsync(uri);
    } else {
      Alert.alert('Erro', 'Não foi possível compartilhar o PDF.');
    }
  } catch (error) {
    console.error('Erro ao gerar o PDF', error);
    Alert.alert('Erro', 'Não foi possível gerar a carteirinha em PDF.');
  }
};


const renderRequestScreen = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={styles.titlePrin}> Solicitar carteirinha</Text>

      <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
        <FontAwesome6 name="gear" size={24} color="#EEF0EB" />
      </TouchableOpacity>
    </View>

    <ScrollView ref={scrollViewRef} showsVerticalScrollIndicator={true} style={{ flex: 1, marginBottom: 10 }}>
      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('HomeDoador')}>
            <AntDesign name="arrowleft" size={24} color="#326771" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.textView}>
        <Text style={styles.title}>Solicitar a carteirinha</Text>
        <Text style={styles.text}>
          Caso você já tenha doado sangue mais de três vezes, terá o direito a uma carteirinha que te dará benefícios de ser um doador frequente. Para solicitá-la, insira o seu CPF.
        </Text>
        <Text style={styles.txtInput}>Insira seu CPF:</Text>
      </View>

      <View>
        <TextInput
          style={styles.input}
          placeholder="Digite seu CPF"
          value={cpf}
          onChangeText={handleCpfChange}
          keyboardType="numeric"
        />
      </View>
      <TouchableOpacity style={styles.BtProx} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Realizar solicitação</Text>
      </TouchableOpacity>
    </ScrollView>

    <MenuDoador />
  </View>
);

const renderProcessingScreen = () => (
  <View style={styles.containerLoading}>
    <View style={styles.headerContainer}>
      <Text style={styles.titlePrin}> Solicitar carteirinha</Text>

      <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
        <FontAwesome6 name="gear" size={24} color="#EEF0EB" />
      </TouchableOpacity>
    </View>
    <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: 'auto' }}>
      <Text style={styles.textLoading}>Isso pode demorar alguns minutos</Text>
      <Image source={require('../../../assets/img/carteirinhaLoad.png')} style={styles.processingImage} />
      <Text style={styles.textLoading}>Estamos verificando seus dados e gerando sua carteirinha</Text>
    </View>

    <MenuDoador />
  </View>
);

const renderCarteirinhaScreen = () => (
  <View style={styles.container}>
    <View style={styles.headerContainer}>
      <Text style={[styles.titlePrin, {marginLeft: 5}]}> Carteirinha do Doador de Sangue</Text>
      <TouchableOpacity style={styles.btConfig} onPress={() => navigation.navigate('ConfiguracoesDoador')}>
        <FontAwesome6 name="gear" size={24} color="#EEF0EB" />
      </TouchableOpacity>
    </View>

    <View style={styles.mainContainer}>
      <View style={styles.voltarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('HomeDoador')}>
          <AntDesign name="arrowleft" size={24} color="#7A0000" />
        </TouchableOpacity>
      </View>
    </View>

    <View style={styles.carteirinhaContainer}>
      <View style={styles.carteirinhaBackColor}>
        <Text style={styles.carteirinhaTitle}>CARTEIRINHA DE DOADOR DE SANGUE</Text>
      </View>

      <View style={styles.carteirinhaContent}>
        <Image source={require('../../../assets/img/iconUser.png')} style={styles.imagemPerfil} />
        <View style={styles.carteirinhaInfo}>
          <Text style={styles.carteirinhaText}>
            <Text style={styles.carteirinhaBold}>NOME DO DOADOR:</Text> {carteirinhaData.nome} {carteirinhaData.sobrenome}
          </Text>
          <Text style={styles.carteirinhaText}>
            <Text style={styles.carteirinhaBold}>DATA DE NASC:</Text> {carteirinhaData.dataNascimento}
          </Text>
          <Text style={styles.carteirinhaText}>
            <Text style={styles.carteirinhaBold}>CPF:</Text> {carteirinhaData.cpf}
          </Text>
          <Text style={styles.carteirinhaText}>
            <Text style={styles.carteirinhaBold}>TIPO SANGUÍNEO:</Text> {carteirinhaData.tipoSanguineo}
          </Text>
          <Text style={styles.carteirinhaText}>
            <Text style={styles.carteirinhaBold}>Última Doação:</Text> {carteirinhaData.ultimaDoacao}
          </Text>
        </View>
      </View>
      <Text style={styles.carteirinhaFooter}>Doe sangue, doe vidas</Text>
    </View>

    <TouchableOpacity style={styles.downloadButton} onPress={gerarPdf}>
      <Text style={styles.buttonText}>Baixar</Text>
    </TouchableOpacity>

    <MenuDoador />
  </View>
);

return (
  <View style={styles.container}>
    {isLoading && isProcessing ? (
      renderProcessingScreen()
    ) : carteirinhaData ? (
      renderCarteirinhaScreen()
    ) : (
      renderRequestScreen()
    )}
  </View>
);
};




const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
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
  titlePrin: {
    color: '#EEF0EB',
    marginLeft: 25,
    marginTop: 2,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5,
    fontSize: 16
  },
  title: {
    color: '#000',
    marginTop: 15,
    fontFamily: 'Poppins-SemiBold',
    fontSize: 25,
    marginBottom: 25
  },
  textView: {
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'justify',
    textAlignVertical: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#EEF0EB',
    marginTop: '4%',
    paddingHorizontal: 8,
    borderRadius: 7,
    paddingLeft: 20,
    fontFamily: 'Poppins-Regular',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: 25
  },
  txtInput: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 15,
    marginLeft: 10,
    marginTop: 30
  },
  mainContainer: {
    padding: 32,
    top: 20,
  },
  btConfig: {
    marginRight: 20,
  },
  text: {
    marginBottom: 20,
    fontSize: 17,
    fontFamily: 'Poppins-Regular',
    textAlign: 'justify'
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  BtProx: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: '10%',
    width: '60%',
    alignSelf: 'center',
    marginTop: 20
  },

  //loading
  containerLoading: {
    flex: 1,
  },
  textLoading: {
    fontSize: 21,
    fontFamily: 'Poppins-Medium',
    textAlign: 'center',
    marginBottom: 40,
    marginTop: 40,
    width: '80%',
    alignSelf: 'center'
  },

  processingImage: {
    width: '70%',
    height: '40%',
    alignSelf: 'center',
    marginTop: 20,
  },

  // Carteirinha parte 
  carteirinhaBackColor: {
    backgroundColor: '#AF2B2B',
    borderTopRadius: 10,
    height: 30,
    justifyContent: 'center'
  },
  carteirinhaContainer: {
    backgroundColor: '#fff',
    marginTop: '20%',
    marginHorizontal: 20,
    elevation: 5,
    marginBottom: 20,
  },
  carteirinhaTitle: {
    fontSize: 14,
    color: '#fff',
    justifyContent: 'center',
    fontWeight: 'bold',

    textAlign: 'center',
    alignItems: 'center'
  },
  carteirinhaContent: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
  },
  carteirinhaInfo: {
    flex: 1,
  },
  carteirinhaText: {
    fontSize: 12,
    marginTop:7,
    marginLeft: 5
  },
  carteirinhaBold: {
    fontWeight: 'bold',
  },
  imagemPerfil: {
    height: 100,
    width: 100,
    marginRight: 10,
  },

  // qrCodeContainer: {
  //   alignItems: 'center',
  // },
  qrCodeText: {
    fontSize: 8,
    marginTop: 5,
    width: 75,
  },
  carteirinhaFooter: {
    textAlign: 'center',
    marginTop: 15,
    marginBottom: 10,
    fontSize: 14,
    color: '#888',
  },
  downloadButton: {
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
    backgroundColor: '#AF2B2B',
    padding: 10,
    width: '60%',
    alignSelf: 'center'
  },
});

export default SolicitarCarteirinha;