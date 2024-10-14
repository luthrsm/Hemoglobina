import React, { useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import * as ImagePicker from 'expo-image-picker';
import MenuHemocentro from '../../components/menuHemocentro';


import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const ProfileScreenHemo = ({ navigation, route }) => {
  
  const { control, handleSubmit, errors } = useForm({
  defaultValues: userData,
});
  
  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const handleNameChange = (text) => setName(text);

  const handleSave = async (data) => {
  console.log('Nome:', data.name);
  console.log('Email:', data.email);
  console.log('Senha:', data.password);
  console.log('Telefone:', data.telefone);
  console.log('Endereço:', data.endereco);
  console.log('Horário de funcionamento:', data.horarioFuncionamento);
  navigation.navigate('ConfiguracoesHemo'); // Voltar para a tela anterior
};

  const [userData] = useState({
    name: 'Hospital Geral',
    email: 'hgpirajussara@gmail.com',
  });

  const scrollViewRef = useRef(null);

  const [image, setImage] = useState(require('../../assets/img/configImages/hemocentro.png'));

    const handleImagePicker = async () => {
      const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });

    if (!result.canceled){
      setImage(result.assets[0].uri);
    }
  };

  const [mondayFridayHours, setMondayFridayHours] = useState('');
  const [saturdayHours, setSaturdayHours] = useState('');
  const [sundayHours, setSundayHours] = useState('');
  const [saturdaySunHours, setSaturdaySunHours] = useState('');
  const [hourspecific, setHourspecific] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesHemo')}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>

        <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >
          <View style={styles.profileSection}>
            <Image source={image} style={styles.profileImage} />
              
            <Text style={styles.profileName}>{userData.name}</Text>
            <Text style={styles.profileEmail}>{userData.email}</Text>

            <TouchableOpacity style={styles.BtProxAlterar} onPress={handleImagePicker}>
              <Text style={styles.buttonText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <View style={styles.icon}>
              <Ionicons name="mail-outline" size={21} color="#AF2B2B" style={styles.icons} />
              <Text style={styles.inputLabel}>Alterar email:</Text>
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
              rules={{ required: true, pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/ }}
              defaultValue=""
            />
            

          </View> 

        <View style={styles.inputSection}>
          <View style={styles.icon}>
            <Ionicons name="key-outline" size={20} color="#AF2B2B" style={styles.icons} />
            <Text style={styles.inputLabel}>Alterar senha:</Text>
          </View>
          <Controller
            control={control}
            render={({ onChange, onBlur, value }) => (
              <TextInput
                style={styles.input}
                onBlur={onBlur}
                onChangeText={(text) => onChange(text)}
                value={value}
                secureTextEntry
              />
            )}
            name="password"
            rules={{ required: true, minLength: 8 }}
            defaultValue=""
          />
        
      </View>

      <View style={styles.inputSection}>
        <View style={styles.icon}>
          <Ionicons name="call-outline" size={20} color="#AF2B2B" style={styles.icons} />
          <Text style={styles.inputLabel}>Telefone:</Text>
        </View>
        <Controller
          control={control}
          render={({ onChange, onBlur, value }) => (
            <TextInput
              style={styles.input}
              onBlur={onBlur}
              onChangeText={(text) => onChange(text)}
              value={value}
              keyboardType="phone-pad"
            />
          )}
          name="telefone"
          rules={{ required: true, pattern: /^\d{10,11}$/ }}
          defaultValue=""
        />
        
      </View>

      <View style={styles.inputSection}>
        <View style={styles.icon}>
          <Ionicons name="time-outline" size={20} color="#AF2B2B" style={styles.icons} />
          <Text style={styles.inputLabel}>Horário de funcionamento:</Text>
        </View>
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
                <TouchableOpacity onPress={() => setMondayFridayHours('Não abre')} style={{marginBottom: 10}}>
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
                <TouchableOpacity onPress={() => setSundayHours('Não abre')} style={{marginBottom: 10}}>
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

      <View style={styles.inputSection}>
        <View style={styles.icon}>
          <Ionicons name="location-outline" size={20} color="#AF2B2B" style={styles.icons} />
          <Text style={styles.inputLabel}>Endereço:</Text>
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
          name="endereco"
          rules={{ required: true }}
          defaultValue=""
        />
        
      </View>

        <TouchableOpacity style={styles.BtProx} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </TouchableOpacity>
      </ScrollView>
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
    flexDirection: 'row', 
    justifyContent: 'space-between'
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