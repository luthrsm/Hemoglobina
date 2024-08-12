import { Text, SafeAreaView, StyleSheet, View, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

const handleSignup = () => {

    const navigation = useNavigation();

    navigation.navigate('HemoTela'); // Navega para a tela de cadastro
  };

export default function App() {
  return (
    <SafeAreaView style={styles.container}>

      <View style={styles.tudoJunto}>
      
        <Image style={styles.logo} source={require('../imagens/hemoglobina.png')}/>

        <View style={styles.dentroCad}>

          <Text style={styles.textoBranco1}>Faça seu login</Text>

          <View styles={styles.ordemTam}>
            <Text style={styles.textoBranco2}>E contribua com a rede de doadores</Text>
            
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('HemocentroLogin')} >
              <Text style={styles.buttonText}>Hemocentro</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button2} onPress={() => navigation.navigate('DoadorLogin')} >
              <Text style={styles.buttonText}>Doar Sangue</Text>
            </TouchableOpacity>

          </View>
        </View>
      </View>
      
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    width: '100%',
    alignItems: 'center',
    backgroundColor: '#EEF0EB',
  },
  tudoJunto: {
    top: 100,
    alignItems: 'center',
    paddingBottom: 30,
  },
  textoBranco1: {
    fontSize: 28,
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textoBranco2: {
    width: 280,
    fontSize: 17,
    marginTop: 20,
    color: 'white',
    marginBottom: 25,
    textAlign: 'center',
  },
  ordemTam: {
    width: 250,
  },
  button: {
    height: 70,
    width: 250,
    marginBottom: 25,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0EB',
  },
    button2: {
    height: 70,
    width: 250,
    marginBottom: 60,
    borderRadius: 10,
    alignSelf: 'center',
    justifyContent: 'center',
    backgroundColor: '#EEF0EB',
  },
  buttonText: {
    fontSize: 20,
    color: '#000',
    textAlign: 'center',
  },
  dentroCad: {
    top: 70,
    padding: 20,
    width: '95%',
    color: 'white',
    borderRadius: 20,
    alignItems: 'center',
    backgroundColor: '#AF2B2B',
  },
    logo: {
    width: 80,
    height: 80,
  },
});
