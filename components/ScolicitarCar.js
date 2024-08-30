import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Image, Alert, } from 'react-native';
// import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faInfoCircle, faMapMarkerAlt, faHandPaper } from '@fortawesome/free-solid-svg-icons';
import QRCode from 'react-native-qrcode-svg';
import { useNavigation } from '@react-navigation/native';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import MenuDoador from '../assets/menu';

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
];

const App = () => {
  const [cpf, setCpf] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [carteirinhaData, setCarteirinhaData] = useState(null);

  const handleCpfChange = (text) => {
    setCpf(text);
  };

  const handleSubmit = () => {
    setIsLoading(true);
    const foundData = data.find((item) => item.cpf === cpf);
    const foundDataDoacoes = data.find((item) => item.doacoes >= 3);

    if (foundData) {
      // setIsLoading(false);
        if (foundData.doacoes >= 3){
          setIsLoading(false);
          setCarteirinhaData(foundData);
        }
        else{
          Alert.alert('Número de doações inválido', 'Para solicitar sua carteirinha, você precisa ter realizado 3 ou mais doações. Verifique seu histórico de doações...');
          setIsLoading(false);
        }
    } else {
      Alert.alert('CPF não encontrado', 'Por favor, verifique o CPF informado.');
      setIsLoading(false);
    }
  };

  const navigation = useNavigation();

  const renderRequestScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.titlePrin}> Solicitar carteirinha</Text>

        <TouchableOpacity onPress={() => navigation.navigate('Testeee')}>
          <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
        </TouchableOpacity>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
        
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <AntDesign name="arrowleft" size={26} color="#7A0000" />
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
        </View>
      </View>

      
      <TextInput
        style={styles.input}
        placeholder="Digite seu CPF"
        value={cpf}
        onChangeText={handleCpfChange}
        keyboardType="numeric"
      />
      <TouchableOpacity style={styles.BtProx} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Realizar solicitação</Text>
      </TouchableOpacity>

      <MenuDoador />
    </View>
  );

  const renderProcessingScreen = () => (
    <View style={styles.container}>
      <View style={styles.header}>
        
      </View>
      <Text style={styles.text}>
        Isso pode demorar alguns minutos
      </Text>
      <Image
        source={require('../assets/snack-icon.png')} // Substitua pela imagem desejada
        style={styles.processingImage}
      />
      <Text style={styles.text}>
        Estamos verificando seus dados e gerando sua carteirinha
      </Text>

      <View style={styles.footer}>
        
      </View>
    </View>
  );

  const renderCarteirinhaScreen = () => (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
          <Text style={styles.titlePrin}> Solicitar carteirinha</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('Testeee')}>
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

      <TouchableOpacity style={styles.downloadButton} onPress={() => {}}>
          <Text style={styles.buttonText}>Baixar</Text>
      </TouchableOpacity>

      
      <MenuDoador />
    </View>
  );

  return (
    <View style={styles.container}>
      {isLoading ? (
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
    height: '9%',
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
    letterSpacing: 1.5     
  },
  title: {
    color: '#000',
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5,
    fontSize: 20,
    fontWeight: 'bold'
  },
  textView: {
    width: '85%',
    alignItems: 'center',
    alignSelf: 'center',
    textAlign: 'justify',
    marginBottom: 20,
    gap: 45,
    textAlignVertical: 'center',
  },
  input: {
    height: 50,
    width: '80%',
    backgroundColor: '#EEF0EB',
    marginTop: '16%',
    paddingHorizontal: 8,
    borderRadius: 7,
    paddingLeft: 20,
    fontFamily: 'DM-Sans',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  mainContainer: {
    padding: 32,
    top: 20,
  },
  config: {
    marginTop: 7,
    marginRight: 10,
  },
  text: {
    padding: 15,
    fontSize: 16,
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
  processingImage: {
    width: 200,
    height: 200,
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

export default App;