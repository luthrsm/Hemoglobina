import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import MenuHemocentro from '../../components/menuHemocentro';


import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const FaleConoscoH = ({ navigation, route }) => {
  const { control, handleSubmit } = useForm();
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [pergunta, setPergunta] = useState('');

  const [text, setText] = useState('');

  const handleEmailChange = (text) => setEmail(text);
  const handleNameChange = (text) => setName(text);
  const handlePerguntaChange = (text) => setPergunta(text);

  const handleSave = async (data) => {
    console.log('Nome:', data.name);
    console.log('Email:', data.email);
    console.log('Pergunta', data.pergunta);
    navigation.navigate('ConfiguracoesHemo'); // Voltar para a tela anterior
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}>Configurações</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesHemo')}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <View style={styles.inputSection}>
          <Text style={styles.textoFale}>Fale conosco</Text>
          <View style={styles.icon}>
            <Text style={styles.inputLabel}>Nome completo:</Text>
          </View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="name"
          />
        </View>

        <View style={styles.inputSection}>
          <View style={styles.icon}>
            <Text style={styles.inputLabel}>Email:</Text>
          </View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
              />
            )}
            name="email"
          />
        </View>

        <View style={styles.inputSection}>
          <View style={styles.icon}>
            <Text style={[styles.inputLabel, { textAlignVertical: 'top', paddingTop: 15 }]}>Mensagem:</Text>
          </View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                multiline={true}
                numberOfLines={5}
              />
            )}
            name="pergunta"
          />
        </View>
        <TouchableOpacity style={styles.BtProx} onPress={handleSubmit(handleSave)}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity>
      </View>

      <MenuHemocentro />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
    justifyContent: 'flex-end',
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
  title: {
    color: '#EEF0EB',
    marginLeft: 30,
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1,
  },
  textoFale: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 40,
  },
  icon: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 16,
  },
  inputSection: {
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 16,
    marginBottom: 5,
    marginTop: 20,
    fontWeight: '600',
  },
  input: {
    borderWidth: 1,
    borderColor: '#053A45',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EEF0EB'
  },
  BtProx: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: '4%',
    width: '60%',
    alignSelf: 'center'
  },
});

export default FaleConoscoH;