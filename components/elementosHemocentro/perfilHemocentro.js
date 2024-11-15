import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect, useRef } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { DatePickerAndroid } from 'react-native';

import InputSenhaCad from './inputSenhaCad';
import AddressForm from './cep'

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

import { auth, db } from "../../src/Services/firebaseConfig";
import { updateDoc, doc } from "firebase/firestore";

const PHONE_NUMBER_REGEX = /^\(?([0-9]{2})\)?[-. ]?([0-9]{4})[-. ]?([0-9]{4})$/;
const CNPJ_REGEX = /^\d{2}\.?\d{3}\.?\d{3}\/?\d{4}-?\d{2}$/;
const TIME_REGEX = /^([0-1][0-9]|2[0-3]):([0-5][0-9])$/;

const PerfilHemocentro = ({ formData, onDataChange, onNext, onBack }) => {

  const horariosDeFuncionamentoRegex = /^((Segunda-feira|Terça-feira|Quarta-feira|Quinta-feira|Sexta-feira|Sábado|Domingo): (?:[0-1][0-9]|2[0-3]):[0-5][0-9]-(?:[0-1][0-9]|2[0-3]):[0-5][0-9]|não abre)(, (Segunda-feira|Terça-feira|Quarta-feira|Quinta-feira|Sexta-feira|Sábado|Domingo): (?:[0-1][0-9]|2[0-3]):[0-5][0-9]-(?:[0-1][0-9]|2[0-3]):[0-5][0-9]|não abre)*$/;
  const navigation = useNavigation();


  const [mondayFridayHours, setMondayFridayHours] = useState('');
  const [saturdayHours, setSaturdayHours] = useState('');
  const [sundayHours, setSundayHours] = useState('');
  const [hourspecific, setHourspecific] = useState('');
  const [saturdaySunHours, setSaturdaySunHours] = useState('');

  const [nome, setNome] = useState('');
  const [phone, setPhone] = useState('');
  const [cnpj, setCNPJ] = useState('');


  const schemaPerfilDoador = yup.object().shape({
    nome: yup.string().required("Informe seu nome"),
    cpf: yup.string().required("Informe seu CPF"),
    tipoSanguineo: yup.string().required("Selecione um tipo sanguíneo"),
    horariosDeFuncionamento: yup.string().required("Informe os horários de funcionamento"),
  });

  const { control, handleSubmit, formState: { errors }, trigger } = useForm({
    resolver: yupResolver(schemaPerfilDoador)
  });

  // const { control, handleSubmit, formState: { errors }, trigger } = useForm({
  //     resolver: yupResolver(schemaPerfilDoador),
  //     defaultValues: {
  //       phoneNumber: '',
  //     },
  //     defaultValues2: {
  //       cnpj: '',
  //     },
  //     defaultValues3: {
  //       time: '',
  //   },
  // });

  // Função para garantir que o valor é um número
  const handleChange = (text) => {
    // Permite apenas números
    const numericValue = text.replace(/[^0-9]/g, '');
    setValue(numericValue);
  };

  const onSubmit = async (data) => {
    // Submit the form data
  };

  const onSubmit2 = async (data) => {
    // Submit the form data
  };

  const [value, setValue] = useState('');

  const scrollViewRef = useRef(null);

  //função para adicionar no BD, para criar é outro código
  const atualizarDados = async () => {
    const uid = auth.currentUser?.uid;
    const clienteRef = doc(db, "Hemocentro", uid);

    try {
      await updateDoc(clienteRef, {
        Nome: nome,
        Telefone: phone,
        CNPJ: cnpj,
        Horário: {
          "Seg-Sex": mondayFridayHours,
          "Sábado": saturdayHours,
          "Domingo": sundayHours,
          "Específico": hourspecific
        }
      });
      navigation.navigate('AddressForm', uid);
    } catch {

    }
  }

  return (
    <View style={styles.stepContainer}>
      <View style={styles.voltarContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('CadastroEscolha')}>
          <AntDesign name="arrowleft" size={24} color="#7A0000" />
        </TouchableOpacity>
      </View>

      <View style={styles.containerImg}>
        <Image style={styles.logo} source={require('../../assets/img/hemoCadImages/logoHemoglobina.png')} />
      </View>
      <View style={styles.txtTopContainer}>
        <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
        <Text style={styles.txtSecundario}>Perfil do hemocentro</Text>
      </View>

      <View style={styles.inputContainer}>

        <Controller
          control={control}
          name='nome'
          render={({ field: { onBlur } }) =>
            <TextInput
              style={styles.input}
              onChangeText={setNome}
              placeholder='Nome da instituição/razão social'
              placeholderTextColor='#000'
              onBlur={onBlur}
              value={nome} // esse é o problema do input n funcionar, arrumar
            />
          }
        />
        {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}

        <Controller
          control={control}
          name="phoneNumber"
          render={({ onBlur }) => (
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor='#000'
              value={phone}
              onChangeText={setPhone}
              onBlur={onBlur}
              keyboardType="phone-pad"
            />
          )}
          rules={{
            required: true,
            pattern: PHONE_NUMBER_REGEX,
          }}
        />
        {errors.phoneNumber && <Text>Número de telefone inválido</Text>}

        <Controller
          control={control}
          name="cnpj"
          render={({ onBlur }) => (
            <TextInput
              style={styles.input}
              placeholder="CNPJ"
              placeholderTextColor='#000'
              value={cnpj}
              onChangeText={setCNPJ}
              onBlur={onBlur}
            />
          )}
          rules={{
            required: true,
            pattern: CNPJ_REGEX,
          }}
        />
        {errors.cnpj && <Text>CNPJ inválido</Text>}


        <Text style={styles.label}>Horários de funcionamento</Text>

        <View style={styles.hourContainer}>

          <View style={styles.conteudoHoras}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Segunda à Sexta</Text>
              <TextInput
                style={styles.hourInput}
                placeholder="08:00-18:00"
                value={mondayFridayHours}
                onChangeText={(text) => setMondayFridayHours(text)}
              />
              <TouchableOpacity onPress={() => setMondayFridayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Sábado</Text>
              <TextInput
                style={styles.hourInput}
                placeholder="08:00-18:00"
                value={saturdayHours}
                onChangeText={(text) => setSaturdayHours(text)}
              />
              <TouchableOpacity onPress={() => setSaturdayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.conteudoHoras}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Domingo</Text>
              <TextInput
                style={styles.hourInput}
                placeholder="08:00-18:00"
                value={sundayHours}
                onChangeText={(text) => setSundayHours(text)}
              />
              <TouchableOpacity onPress={() => setSundayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Específico</Text>
              <TextInput
                style={styles.hourInput}
                placeholder="Quarta: Não abre"
                value={hourspecific}
                onChangeText={(text) => setHourspecific(text)}
              />
              <TouchableOpacity onPress={() => setHourspecific('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>


      </View>
      <TouchableOpacity onPress={atualizarDados} style={styles.BtProx}>
        <Text style={styles.txtBtProx}>Avançar</Text>
      </TouchableOpacity>

    </View>
  )
}

export default PerfilHemocentro;

const styles = StyleSheet.create({
  stepContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  voltarContainer: {
    position: 'absolute',
    top: 25,
    left: 16,
  },
  containerImg: {
    marginBottom: 20,
  },
  logo: {
    width: 50,
    height: 50,
  },
  txtTopContainer: {
    marginBottom: 20,
  },
  txtPrincipal: {
    fontSize: 24,
    color: '#470404',
    fontFamily: 'Poppins-Medium',
    textAlign: 'center'
  },
  txtSecundario: {
    fontSize: 16,
    color: '#470404',
    fontFamily: 'Poppins-Regular',
    textAlign: 'center'
  },
  inputContainer: {
    marginTop: '5%',
    width: '95%',
  },
  input: {
    height: 50,
    width: '100%',
    backgroundColor: '#EEF0EB',
    marginBottom: '6%',
    paddingHorizontal: 8,
    borderRadius: 7,
    paddingLeft: 20,
    fontFamily: 'DM-Sans',
    justifyContent: 'center'
  },
  BtProx: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    width: '60%',
    alignSelf: 'center'
  },
  txtBtProx: {
    color: '#fff',
    fontSize: 16,
  },
  labelError: {
    alignSelf: 'flex-start',
    color: '#AF2B2B',
    marginBottom: 8,
  },
  label: {
    fontSize: 18,
    textAlign: 'center',
    marginBottom: 20,
  },
  hourContainer: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'space-around'
  },

  dayContainer: {
    width: '100%',
    marginBottom: 20,

  },

  dayLabel: {
    fontSize: 16,
    color: '#000',
    justifyContent: 'center',
    // fontFamily: 'Poppins-Regular',
    marginBottom: 5,
  },
  hourInput: {
    height: 40,
    width: '100%',
    backgroundColor: '#EEF0EB',
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 7,
    fontFamily: 'DM-Sans',
    justifyContent: 'center',
  },

  noOpenLabel: {
    fontSize: 14,
    color: '#AF2B2B',
    textDecorationLine: 'underline',
  },

});