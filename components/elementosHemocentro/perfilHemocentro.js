import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import AntDesign from '@expo/vector-icons/AntDesign';
import { auth, db } from '../../src/Services/firebaseConfig';
import { updateDoc, doc } from 'firebase/firestore';

// Regex e validações
const PHONE_NUMBER_REGEX = /^\(?\d{2}\)?\s?\d{4,5}-\d{4}$/;
const validateCNPJ = (value) => {
  const cleanedValue = value.replace(/\D/g, '');
  if (cleanedValue.length !== 14) return false;
  if (/^(\d)\1{13}$/.test(cleanedValue)) return false;

  let sum = 0;
  let weights1 = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 12; i++) {
    sum += cleanedValue[i] * weights1[i];
  }
  let remainder = sum % 11;
  let digit1 = remainder < 2 ? 0 : 11 - remainder;

  sum = 0;
  let weights2 = [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
  for (let i = 0; i < 13; i++) {
    sum += cleanedValue[i] * weights2[i];
  }
  remainder = sum % 11;
  let digit2 = remainder < 2 ? 0 : 11 - remainder;

  return cleanedValue[12] == digit1 && cleanedValue[13] == digit2;
};

const PHONE_NUMBER_MASK = (value) => {
  return value
    .replace(/\D/g, '') // Remove tudo que não for número
    .replace(/^(\d{2})(\d)/, '($1) $2') // Coloca parênteses no DDD
    .replace(/(\d{5})(\d{1,4})/, '$1-$2') // Coloca o traço depois dos 5 primeiros números
    .substring(0, 15); // Limita o número de caracteres a 14
};

const handlePhoneChange = (text) => {
  const maskedPhone = PHONE_NUMBER_MASK(text);
  setPhone(maskedPhone); // Atualiza o estado com o valor mascarado
};


const PerfilHemocentro = () => {
  const navigation = useNavigation();
  const [mondayFridayHours, setMondayFridayHours] = useState('');
  const [saturdayHours, setSaturdayHours] = useState('');
  const [sundayHours, setSundayHours] = useState('');
  const [hourspecific, setHourspecific] = useState('');

  const schemaPerfilDoador = yup.object().shape({
    nome: yup.string().required("Informe seu nome"),
    cnpj: yup
      .string()
      .required('Informe o CNPJ')
      .test('is-valid-cnpj', 'CNPJ inválido', value => validateCNPJ(value)),
    telefone: yup.string().required("Informe o telefone").matches(PHONE_NUMBER_REGEX, "Telefone inválido"),
  });

  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(schemaPerfilDoador)
  });

  const atualizarDados = async (data) => {
    const uid = auth.currentUser?.uid;
    const clienteRef = doc(db, "Hemocentro", uid);

    try {
      const horarios = {
        "Seg-Sex": data.mondayFridayHours || "Não especificado",
        "Sábado": data.saturdayHours || "Não especificado",
        "Domingo": data.sundayHours || "Não especificado",
        "Específico": data.hourspecific || "Nenhum horário específico"
      };

      await updateDoc(clienteRef, {
        Nome: data.nome,
        Telefone: data.telefone,
        CNPJ: data.cnpj,
        Horário: horarios,
      });
      navigation.navigate('AddressForm', uid);
    } catch (erro) {
      console.error("Erro ao atualizar dados:", erro);
    }
  };

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

      <Text style={styles.txtPrincipal}>Cadastro hemocentro</Text>
      <Text style={styles.txtSecundario}>Perfil do hemocentro</Text>

      <View style={styles.inputContainer}>
        {/* Nome */}
        <Controller
          control={control}
          name="nome"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Nome da instituição/razão social"
              placeholderTextColor="#000"
              onBlur={onBlur}
              value={value}
              onChangeText={onChange}
            />
          )}
        />
        {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}

        {/* Telefone */}
        <Controller
          control={control}
          name="telefone"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="Telefone"
              placeholderTextColor="#000"
              value={value}
              onChangeText={(text) => onChange(PHONE_NUMBER_MASK(text))}
              onBlur={onBlur}
              keyboardType="phone-pad"
            />
          )}
        />
        {errors.telefone && <Text style={styles.labelError}>{errors.telefone.message}</Text>}

        {/* CNPJ */}
        <Controller
          control={control}
          name="cnpj"
          render={({ field: { onChange, onBlur, value } }) => (
            <TextInput
              style={styles.input}
              placeholder="CNPJ"
              placeholderTextColor="#000"
              value={value}
              onChangeText={onChange}
              onBlur={onBlur}
            />
          )}
        />
        {errors.cnpj && <Text style={styles.labelError}>{errors.cnpj.message}</Text>}

        {/* Horários de funcionamento */}
        <Text style={styles.label}>Horários de funcionamento</Text>

        <View style={styles.hourContainer}>
          <View style={styles.conteudoHoras}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Segunda à Sexta</Text>
              <Controller
                control={control}
                name="mondayFridayHours"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.hourInput}
                    placeholder="08:00-18:00"
                    value={value || mondayFridayHours}
                    onChangeText={onChange}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setMondayFridayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Sábado</Text>
              <Controller
                control={control}
                name="saturdayHours"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.hourInput}
                    placeholder="08:00-18:00"
                    value={value || saturdayHours}
                    onChangeText={onChange}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setSaturdayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.conteudoHoras}>
            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Domingo</Text>
              <Controller
                control={control}
                name="sundayHours"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.hourInput}
                    placeholder="08:00-18:00"
                    value={value || sundayHours}
                    onChangeText={onChange}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setSundayHours('Não abre')}>
                <Text style={styles.noOpenLabel}>Não abre</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.dayContainer}>
              <Text style={styles.dayLabel}>Específico</Text>
              <Controller
                control={control}
                name="hourspecific"
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    style={styles.hourInput}
                    placeholder="Especifique o horário"
                    value={value || hourspecific}
                    onChangeText={onChange}
                  />
                )}
              />
              <TouchableOpacity onPress={() => setHourspecific('Nenhum horário específico')}>
                <Text style={styles.noOpenLabel}>Nenhum horário específico</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.BtProx}
        onPress={handleSubmit(atualizarDados)}
      >
        <Text style={styles.txtBtProx}>Continuar</Text>
      </TouchableOpacity>
    </View>
  );
};

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