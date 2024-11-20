import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../Services/firebaseConfig';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';

import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';

const ProfileScreenHemo = ({ navigation }) => {
  const { control, handleSubmit, setValue } = useForm();
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [image, setImage] = useState(require('../../../../assets/img/iconUser.png'));
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [mondayFridayHours, setMondayFridayHours] = useState('');
  const [saturdayHours, setSaturdayHours] = useState('');
  const [sundayHours, setSundayHours] = useState('');
  const [hourspecific, setHourspecific] = useState('');
  const [telefone, setTelefone] = useState('');
  const [newTelefone, setNewTelefone] = useState('');


  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'Hemocentro', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().Nome);
          setUserEmail(docSnap.data().Email);
          setImage(docSnap.data().photoUrl || require('../../../../assets/img/iconUser.png'));
          setTelefone(docSnap.data().Telefone);

          // Carregar os horários se existirem
          const horarios = docSnap.data().Horário || {};
          setMondayFridayHours(horarios["Seg-Sex"] || '');
          setSaturdayHours(horarios["Sábado"] || '');
          setSundayHours(horarios["Domingo"] || '');
          setHourspecific(horarios["Específico"] || '');
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, []);

  const handleSave = async () => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (user) {
      const userRef = doc(db, 'Hemocentro', user.uid);
      const credential = EmailAuthProvider.credential(user.email, newPassword);

      // Reautenticação se tiver senha nova
      if (newPassword) {
        const credential = EmailAuthProvider.credential(user.email, newPassword);
        await reauthenticateWithCredential(user, credential);
      }

      // Atualizar email se for diferente e enviar link de verificação
      if (newEmail && newEmail !== user.email) {
        await updateEmail(user, newEmail);
        await sendEmailVerification(user);
        console.log('Email atualizado com sucesso! Link de verificação enviado.');
        Alert.alert('Verifique seu e-mail', 'Por favor, verifique seu novo e-mail antes de realizar a alteração.');
        return;
      }

      // Atualizar senha se for diferente
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log('Senha atualizada com sucesso!');
      }

      try {
        // Criar um objeto com os dados de horário (somente se preenchidos)
        const Horários = {};
        if (mondayFridayHours) Horários["Seg-Sex"] = mondayFridayHours;
        if (saturdayHours) Horários["Sábado"] = saturdayHours;
        if (sundayHours) Horários["Domingo"] = sundayHours;
        if (hourspecific) Horários["Específico"] = hourspecific;

        // Criar o objeto com os dados a serem atualizados
        const updatedData = {
          Nome: newName || userName,
          Email: newEmail || userEmail,
          ...(Object.keys(Horários).length > 0 && { Horário: Horários }), // Atualizar Horário apenas se houver mudanças
          Telefone: newTelefone || telefone,
        };

        // Atualizar no Firestore
        await updateDoc(userRef, updatedData);
        Alert.alert('Informações atualizadas!');
        navigation.goBack(); // Volta para a tela anterior
      } catch (error) {
        console.error("Erro ao atualizar informações:", error);
        Alert.alert("Erro", error.message);
      }
    }
  };



  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
      // Atualize a foto do usuário no Firestore, se necessário
      // updateUserPhoto(result.assets[0].uri);
    }
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

        <ScrollView style={styles.scrollView}>
          <View style={styles.profileSection}>
            <Image source={image} style={styles.profileImage} />
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>

            <TouchableOpacity style={styles.BtProxAlterar} onPress={handleImagePicker}>
              <Text style={styles.buttonText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Alterar nome:</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={setNewName}
                  value={newName || userName}
                />
              )}
              name="name"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Alterar email:</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={setNewEmail}
                  value={newEmail || userEmail}
                />
              )}
              name="email"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Alterar senha:</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  secureTextEntry
                />
              )}
              name="password"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Telefone:</Text>
            <Controller
              control={control}
              render={({ onChange, onBlur, value }) => (
                <TextInput
                  style={styles.input}
                  onBlur={onBlur}
                  onChangeText={(text) => setNewTelefone(text)}  // Atualiza o estado do telefone
                  value={newTelefone || telefone}  // Usa o estado ou o valor fallback
                  keyboardType="phone-pad"
                />
              )}
              name="telefone"
            />
          </View>

          <View style={styles.inputSection}>
            <View style={styles.icon}>
              <Ionicons name="time-outline" size={20} color="#AF2B2B" style={styles.icons} />
              <Text style={styles.inputLabel}>Horário de funcionamento:</Text>
            </View>
            <View style={styles.hourContainer}>
              {/* Horários */}
              {['Segunda à Sexta', 'Sábado', 'Domingo', 'Específico'].map((day, index) => (
                <View key={index} style={styles.dayContainer}>
                  <Text style={styles.dayLabel}>{day}</Text>
                  <Controller
                    control={control}
                    name={day.toLowerCase().replace(' ', '') + 'Hours'} // Nome do campo gerado dinamicamente
                    defaultValue=""
                    render={({ field: { onChange, value, onBlur } }) => {
                      let currentValue = ''; // Definir o valor atual com base no estado correspondente

                      // Defina o valor atual com base no nome do dia
                      switch (day) {
                        case 'Segunda à Sexta':
                          currentValue = mondayFridayHours;
                          break;
                        case 'Sábado':
                          currentValue = saturdayHours;
                          break;
                        case 'Domingo':
                          currentValue = sundayHours;
                          break;
                        case 'Específico':
                          currentValue = hourspecific;
                          break;
                        default:
                          currentValue = ''; // Valor padrão vazio
                      }

                      return (
                        <TextInput
                          style={styles.hourInput}
                          placeholder="08:00-18:00"
                          onBlur={onBlur}
                          onChangeText={(text) => {
                            // Atualiza o valor diretamente na variável de estado correspondente
                            switch (day) {
                              case 'Segunda à Sexta':
                                setMondayFridayHours(text);
                                break;
                              case 'Sábado':
                                setSaturdayHours(text);
                                break;
                              case 'Domingo':
                                setSundayHours(text);
                                break;
                              case 'Específico':
                                setHourspecific(text);
                                break;
                              default:
                                break;
                            }
                            onChange(text); // Atualiza o valor do formulário
                          }}
                          value={value || currentValue} // Exibe o valor atual ou vazio se não houver valor
                        />
                      );
                    }}
                  />
                  {/* Quando clicar em "Não abre", define o valor como "Não abre" */}
                  <TouchableOpacity onPress={() => {
                    let updatedValue = 'Não abre';

                    // Atualiza a variável de estado correspondente com o valor "Não abre"
                    switch (day) {
                      case 'Segunda à Sexta':
                        setMondayFridayHours(updatedValue);
                        break;
                      case 'Sábado':
                        setSaturdayHours(updatedValue);
                        break;
                      case 'Domingo':
                        setSundayHours(updatedValue);
                        break;
                      case 'Específico':
                        setHourspecific(updatedValue);
                        break;
                      default:
                        break;
                    }

                    // Atualiza o valor no formulário com "Não abre"
                    setValue(day.toLowerCase().replace(' ', '') + 'Hours', updatedValue);
                  }}>
                    <Text style={styles.noOpenLabel}>Não abre</Text>
                  </TouchableOpacity>
                </View>
              ))}
            </View>



          </View>

          <TouchableOpacity style={styles.BtProx} onPress={handleSubmit(handleSave)}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>
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
    marginLeft: 25,
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  profileSection: {
    alignItems: 'center',
    marginBottom: 30,
  },
  profileName: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  profileEmail: {
    fontSize: 16,
    marginTop: 5,
  },
  icon: {
    flexDirection: 'row',
    alignContent: 'center'
  },
  icons: {
    marginRight: 10,
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
  BtProxAlterar: {
    backgroundColor: '#AF2B2B',
    padding: 10,
    borderRadius: 15,
    alignItems: 'center',
    marginTop: '10%',
    width: '50%',
    alignSelf: 'center'
  },

  hourContainer: {
  },

  dayContainer: {
    width: '100%',
  },

  dayLabel: {
    fontSize: 16,
    color: '#000',
    justifyContent: 'center',
    marginBottom: 5,
  },
  hourInput: {
    height: 40,
    width: '100%',
    backgroundColor: '#EEF0EB',
    borderWidth: 1,
    borderColor: '#053A45',
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

export default ProfileScreenHemo;