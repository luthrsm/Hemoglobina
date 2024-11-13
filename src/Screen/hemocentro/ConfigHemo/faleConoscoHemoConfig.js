import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as MailComposer from 'expo-mail-composer';
import MenuHemocentro from '../../../../components/menu/menuHemocentro';

import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const FaleConoscoH = ({ navigation, route }) => {
  const [isAvailable, setIsAvailable] = useState(false);
  const [subject, setSubject] = useState(undefined);
  const [body, setBody] = useState(undefined);
  const [email, setEmail] = useState(undefined);

  useEffect(() => {
    async function checkAvailability() {
      const isMailAvailable = await MailComposer.isAvailableAsync();
      setIsAvailable(isMailAvailable);
    }

    checkAvailability();
  }, []);

  const sendMail = async () => {

    MailComposer.composeAsync({
      subject: subject,
      body: body,
      recipients: ['hemoglobinaltda@gmail.com'],
    });
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
            <Text style={[styles.inputLabel, { textAlignVertical: 'top', paddingTop: 15 }]}>Nome completo:</Text>
          </View>
            <TextInput
              style={styles.input}
              onChangeText={setSubject}
              value={subject}
            />
      </View>

        <View style={styles.inputSection}>
          <View style={styles.icon}>
            <Text style={[styles.inputLabel, { textAlignVertical: 'top', paddingTop: 15 }]}>Email:</Text>
          </View>
            <TextInput
              style={styles.input}
              onChangeText={setEmail}
              value={email}
            />
        </View>

      <View style={styles.inputSection}>
          <View style={styles.icon}>
            <Text style={[styles.inputLabel, { textAlignVertical: 'top', paddingTop: 15 }]}>Mensagem:</Text>
          </View>
            <TextInput
              style={styles.input}
              onChangeText={setBody}
              value={body}
              multiline={true}
              numberOfLines={5}
            />
        </View>

        {isAvailable ? <TouchableOpacity style={styles.BtProx} onPress={sendMail}>
          <Text style={styles.buttonText}>Enviar</Text>
        </TouchableOpacity> : <Text>Email não </Text>}
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
