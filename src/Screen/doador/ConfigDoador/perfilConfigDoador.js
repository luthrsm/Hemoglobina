import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../Services/firebaseConfig';
import { getAuth, EmailAuthProvider,reauthenticateWithCredential, updateEmail, updatePassword } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import MenuDoador from '../../../../components/menu/menuDoador';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState(require('../../../../assets/img/iconUser.png'));
  const [userTypeBlood, setUserTypeBlood] = useState('')
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [newBloodType, setNewBloodType] = useState('');

  useEffect(() => {
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user) {
      
      const userRef = doc(db, 'doador', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          setUserName(docSnap.data().nome);
          setUserEmail(docSnap.data().email);
          setUserPhoto(docSnap.data().photoUrl || require('../../../../assets/img/iconUser.png'));
          setUserTypeBlood(docSnap.data().tipoSanguineo);
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
      const userRef = doc(db, 'doador', user.uid);
      const credential = EmailAuthProvider.credential(user.email, newPassword); 

      // reautenticação se tiver senha nova
      if (newPassword) {
        const credential = EmailAuthProvider.credential(user.email, newPassword); 
        await reauthenticateWithCredential(user, credential);
      }

      //att email se for diferente e  manda link de verificação
      if (newEmail && newEmail !== user.email) {
        await updateEmail(user, newEmail);
        await sendEmailVerification(user);
        console.log('Email atualizado com sucesso! Link de verificação enviado.');
        Alert.alert('Verifique seu e-mail', 'Por favor, verifique seu novo e-mail antes de realizar a alteração.');
        return; 
      }

      //att senha se for diferente
      if (newPassword) {
        await updatePassword(user, newPassword);
        console.log('Senha atualizada com sucesso!');
      }

      try {
        await updateDoc(userRef, {
          nome: newName || userName,
          email: newEmail || userEmail,
          tipoSanguineo: newBloodType || userTypeBlood,
          
        });
        console.log('Informações atualizadas!');
        navigation.goBack(); // Volta para a tela anterior
      } catch (error) {
        console.error("Erro ao atualizar informações:", error);
        Alert.alert("Erro", error.message);
      }
    }
  };
  const scrollViewRef = useRef(null);
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

  const handleImagePicker = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 4],
      base64: true,
      quality: 1,
    });

    if (!result.canceled) {
      setUserPhoto(result.assets[0].uri);
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
            <Image source={userPhoto} style={styles.profileImage} />
            <Text style={styles.profileName}>{userName}</Text>
            <Text style={styles.profileEmail}>{userEmail}</Text>
            <TouchableOpacity style={styles.BtProxAlterar} onPress={handleImagePicker}>
              <Text style={styles.buttonText}>Alterar foto</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Nome:</Text>
            <TextInput
              style={styles.input}
              value={newName || userName}
              onChangeText={setNewName}
              placeholder="Digite seu nome"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>E-mail:</Text>
            <TextInput
              style={styles.input}
              value={newEmail || userEmail}
              onChangeText={setNewEmail}
              placeholder="Digite seu e-mail"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Alterar senha:</Text>
            <TextInput
              style={styles.input}
              secureTextEntry
              value={newPassword}
              onChangeText={setNewPassword}
              placeholder="Digite sua senha"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Tipo sanguíneo:</Text>
            <SelectList
              setSelected={setNewBloodType}
              value={newBloodType || userTypeBlood}
              data={tipos}
              placeholder={newBloodType || userTypeBlood || "Selecione seu tipo sanguíneo"}
              arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
              search={false}
              boxStyles={styles.boxStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              dropdownStyles={styles.dropdownStyles}
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
  boxStyles: {
    borderColor: '#053A45',
    borderRadius: 7,
    backgroundColor: '#EEF0EB',

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