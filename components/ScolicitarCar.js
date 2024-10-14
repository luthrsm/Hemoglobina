import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
//import { faHome, faInfoCircle, faMapMarkerAlt, faHandPaper } from '@fortawesome/free-solid-svg-icons';
//import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
//import Ionicons from '@expo/vector-icons/Ionicons';
//import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuDoador from '../components/menuDoador';

// Adicionar depois a ligação com o banco de dados aqui
const data = [
  {
    cpf: '54803037523',
    name: 'Juliana Ferreira Lima',
    birthDate: '29/10/97',
    bloodType: 'O+',
    doacoes: '2',
    fotoPerfil: 'https://png.pngtree.com/png-vector/20200706/ourmid/pngtree-businessman-user-character-vector-illustration-png-image_2298565.jpg'
  },
  {
    cpf: '54803037524',
    name: 'Juliana',
    birthDate: '29/10/54',
    bloodType: 'O-',
    doacoes: '0',
    fotoPerfil: 'https://png.pngtree.com/png-vector/20200706/ourmid/pngtree-businessman-user-character-vector-illustration-png-image_2298565.jpg'
  },
  {
    cpf: '43812641852',
    name: 'Gabrielly Nataly Machado da Silva Rodrigues',
    birthDate: '08/06/06',
    bloodType: 'O+',
    doacoes: '3',
    fotoPerfil: 'https://media.istockphoto.com/id/1482199015/pt/foto/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white.jpg?s=612x612&w=0&k=20&c=XI-fFXTXEU4UbQtGwM_vWzBB4F17W4dlPtXL4wr2dmE='
  },
  {
    cpf: '54587664820',
    name: 'Nicolas dos Santos',
    birthDate: '22/10/06',
    bloodType: 'O+',
    doacoes: '3',
    fotoPerfil: 'https://media.istockphoto.com/id/1482199015/pt/foto/happy-puppy-welsh-corgi-14-weeks-old-dog-winking-panting-and-sitting-isolated-on-white.jpg?s=612x612&w=0&k=20&c=XI-fFXTXEU4UbQtGwM_vWzBB4F17W4dlPtXL4wr2dmE='
  },
];

const SolicitarCarteirinha = () => {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carteirinhaData, setCarteirinhaData] = useState(null);

  const handleCpfChange = (text) => {
    setCpf(text);
  };

  const [isProcessing, setIsProcessing] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setIsProcessing(true);
    try {
      setTimeout(() => {
        const foundData = data.find((item) => item.cpf === cpf);
        const foundDataDoacoes = data.find((item) => item.doacoes >= 3);

        if (foundData) {
          if (foundData.doacoes >= 3) {
            setCarteirinhaData(foundData);
          } else {
            Alert.alert('Número de doações inválido', 'Para solicitar sua carteirinha, você precisa ter realizado 3 ou mais doações. Verifique seu histórico de doações...');
          }
        } else {
          Alert.alert('CPF não encontrado', 'Por favor, verifique o CPF informado.');
        }
        setIsProcessing(false);
        setIsLoading(false);
      }, 2000); // simula um atraso de 2 segundos
    } catch (error) {
      console.error(error);
      setIsLoading(false); // garante que o carregamento pare em caso de erro
      setIsProcessing(false);
    }
  };


  const navigation = useNavigation();

  const renderRequestScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titlePrin}> Solicitar carteirinha</Text>

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
      </View>

      <View style={styles.textView}>
        <Text style={styles.title}>Solicitar a carteirinha</Text>

        <View>
          <Text style={styles.text}>
            Caso você já tenha doado sangue mais de três vezes, terá o direito a uma carteirinha que te dará benefícios de ser um doador frequente.
          </Text>
          <Text style={styles.text}>
            Para solicitá-la, insira o ID disponibilizado pelo hemocentro em sua última doação.
          </Text>
          <Text style={styles.txtInput}>Insira seu CPF:</Text>
        </View>
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
      <View style={{justifyContent: 'center', alignItems: 'center', marginTop: 'auto'}}>
        <Text style={styles.textLoading}>
          Isso pode demorar alguns minutos
        </Text>
        <Image
          source={require('../assets/img/carteirinhaLoad.png')}
          style={styles.processingImage}
        />
        <Text style={styles.textLoading}>
          Estamos verificando seus dados e gerando sua carteirinha
        </Text>
      </View>

      <MenuDoador />
    </View>
  );

  const renderCarteirinhaScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titlePrin}> Solicitar carteirinha</Text>
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
          <Text style={styles.carteirinhaTitle}>CARTEIRINHA DE DOADOR</Text>
        </View>

        <View style={styles.carteirinhaContent}>

          <Image source={{ uri: 'https://png.pngtree.com/png-vector/20200706/ourmid/pngtree-businessman-user-character-vector-illustration-png-image_2298565.jpg' }} style={styles.imagemPerfil} />
          <View style={styles.carteirinhaInfo}>

            <Text style={styles.carteirinhaText}>
              <Text style={styles.carteirinhaBold}>NOME DO DOADOR:</Text>{' '}
              {carteirinhaData.name}
            </Text>
            <Text style={styles.carteirinhaText}>
              <Text style={styles.carteirinhaBold}>DATA DE NASC:</Text>{' '}
              {carteirinhaData.birthDate}
            </Text>
            <Text style={styles.carteirinhaText}>
              <Text style={styles.carteirinhaBold}>CPF:</Text>{' '}
              {carteirinhaData.cpf}
            </Text>
            <Text style={styles.carteirinhaText}>
              <Text style={styles.carteirinhaBold}>TIPO SANGUÍNEO:</Text>{' '}
              {carteirinhaData.bloodType}
            </Text>
          </View>
          {/*<View style={styles.qrCodeContainer}>
            <QRCode
              value={`CPF: ${carteirinhaData.cpf}`}
              size={80}
              color="#000"
              backgroundColor="#fff"
            />
            <Text style={styles.qrCodeText}>
              Para validar a carteirinha escaneie o QR code
            </Text>
          </View>*/}
        </View>
        <Text style={styles.carteirinhaFooter}>Doe sangue, doe vidas</Text>

      </View>

      <TouchableOpacity style={styles.downloadButton} onPress={() => { }}>
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
    justifyContent: 'center',
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
    marginTop: 7,
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
    marginTop: 100
  },
  mainContainer: {
    padding: 32,
    top: 20,
  },
  btConfig: {
    marginRight: 20,
  },
  text: {
    padding: 15,
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
    alignSelf: 'center'
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
    marginBottom: 10,
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
    fontSize: 10,
    marginBottom: 5,
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