import React, { useState, useRef, useEffect} from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import MenuDoador from '../../components/menuDoador';
import AntDesign from '@expo/vector-icons/AntDesign';

import Ionicons from '@expo/vector-icons/Ionicons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const ProfileScreen = ({ navigation, route }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const handleEmailChange = (text) => setEmail(text);
  const handlePasswordChange = (text) => setPassword(text);
  const handleNameChange = (text) => setName(text);

  const handleSave = () => {
    // Aqui você pode enviar os dados do usuário para o backend
    // ...
    console.log('Nome:', name);
    console.log('Email:', email);
    console.log('Senha:', password);
    navigation.navigate('ConfiguracoesDoador') ; // Voltar para a tela anterior
  };

  const tipos = [
    { key: "1", value: "Não sei" },
    { key: "2", value: "A+" },
    { key: "3", value: "A-" },
    { key: "4", value: "B+" },
    { key: "5", value: "B-" },
    { key: "6", value: "AB+" },
    { key: "7", value: "AB-" },
    { key: "8", value: "O+" },
    { key: "9", value: "O-" },
  ];

  const [userData] = useState({
    name: 'Juliana Ferreira',
    email: 'juferreira27@gmail.com',
  });

  const { control, errors, handleSubmit } = useForm();

  const scrollViewRef = useRef(null);

  const [image, setImage] = useState(require('../../assets/img/configImages/userimage.png'));

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

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações</Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.goBack()}>
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
            <TextInput
              style={styles.input}
              onChangeText={handleEmailChange}
              value={email}
            />
          </View>

          <View style={styles.inputSection}>
            <View style={styles.icon}>
              <Ionicons name="key-outline" size={20} color="#AF2B2B" style={styles.icons} />
              <Text style={styles.inputLabel}>Alterar senha:</Text>
            </View>
            <TextInput
              style={styles.input}
              onChangeText={handlePasswordChange}
              value={password}
              secureTextEntry
            />
          </View>

          <View style={styles.inputSection}>
            <View style={styles.icon}>
              <MaterialCommunityIcons name="water-outline" size={23} color="#AF2B2B" style={styles.icons} />
              <Text style={styles.inputLabel}>Tipo sanguíneo:</Text>
            </View>
            <Controller
              control={control}
              name='tipoSanguineo'
              render={({ field: { onChange, onBlur, value } }) => (
                <SelectList
                  setSelected={onChange}
                  onBlur={onBlur}
                  value={value}
                  data={tipos}
                  arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                  search={false}
                  placeholder='Tipo Sanguíneo'
                  boxStyles={styles.input}
                  dropdownItemStyles={styles.dropdownItemStyles}
                  dropdownStyles={styles.dropdownStyles}
                />
              )}
            />
          </View>

          <TouchableOpacity style={styles.BtProx} onPress={handleSave}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>
        </ScrollView>
      </View>

      <MenuDoador />
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
  profilePic: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
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
  changePhotoButton: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
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
  dropdownStyles: {
    borderColor: '#053A45',
    borderRadius: 7,
    backgroundColor: '#EEF0EB',
    marginTop: '',
    marginBottom: '5%'
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
});

export default ProfileScreen;