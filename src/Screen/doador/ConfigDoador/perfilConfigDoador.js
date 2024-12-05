import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert, Modal } from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { SelectList } from 'react-native-dropdown-select-list';
import * as ImagePicker from 'expo-image-picker';
import { db } from '../../../Services/firebaseConfig';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential, updatePassword, updateEmail, sendEmailVerification } from 'firebase/auth';
import { getDoc, doc, updateDoc } from 'firebase/firestore';
import MenuDoador from '../../../../components/menu/menuDoador';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import NetInfo from '@react-native-community/netinfo';

const ProfileScreen = ({ navigation }) => {
  const [userName, setUserName] = useState('');
  const [userSobrenome, setUserSobrenome] = useState('');
  const [userEmail, setUserEmail] = useState('');
  const [userPhoto, setUserPhoto] = useState(require('../../../../assets/img/iconUser.png'));
  const [userTypeBlood, setUserTypeBlood] = useState('')
  const [newName, setNewName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [newSobrenome, setNewSobrenome] = useState('');
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState('');
  const [newBloodType, setNewBloodType] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [isModalVisibleEmail, setModalVisibleEmail] = useState(false);

  const openModalEmail = () => setModalVisibleEmail(true);
  const closeModalEmail = () => setModalVisibleEmail(false);
  
  const openModal = () => setModalVisible(true);
  const closeModal = () => setModalVisible(false);

  const auth = getAuth();
  const user = auth.currentUser;

  NetInfo.fetch().then(state => {
    if (!state.isConnected) {
      Alert.alert("Erro de Conexão", "Verifique sua conexão com a internet.");
    }
  });

  useEffect(() => {
    if (user) {
      const userRef = doc(db, 'doador', user.uid);
      getDoc(userRef).then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUserName(data.nome);
          setUserSobrenome(data.sobrenome);
          setUserEmail(data.email);
          setUserPhoto(data.photoUrl || require('../../../../assets/img/iconUser.png'));
          setUserTypeBlood(data.tipoSanguineo);

          // Inicializar os campos editáveis
          setNewName(data.nome);
          setNewSobrenome(data.sobrenome);
          setNewEmail(data.email);
          setNewBloodType(data.tipoSanguineo);
        }
      }).catch((error) => {
        console.error("Error getting document:", error);
      });
    }
  }, []);

  const reauthenticateAndChangePassword = async (currentPassword, newPassword) => {
    const auth = getAuth();
    const user = auth.currentUser;

    if (!user) {
      Alert.alert("Erro", "Nenhum usuário autenticado encontrado.");
      return;
    }

    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);

      await reauthenticateWithCredential(user, credential);
      console.log("Usuário reautenticado com sucesso!");

      await updatePassword(user, newPassword);
      Alert.alert("Sucesso", "Sua senha foi alterada com sucesso!");
    } catch (error) {
      console.error("Erro ao reautenticar ou alterar senha:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Erro", "A senha atual está incorreta.");
      } else {
        Alert.alert("Erro", error.message);
      }
    }
  };

  const reauthenticateAndChangeEmail = async (currentPassword, newEmail) => {
    const auth = getAuth();
    const user = auth.currentUser;
  
    if (!user) {
      Alert.alert("Erro", "Nenhum usuário autenticado encontrado.");
      return;
    }
  
    try {
      const credential = EmailAuthProvider.credential(user.email, currentPassword);
  
      // Reautentica o usuário
      await reauthenticateWithCredential(user, credential);
      console.log("Usuário reautenticado com sucesso!");
  
      // Envia o link de verificação para o novo e-mail
      await sendEmailVerification(user);
      Alert.alert('Verifique seu e-mail', 'Por favor, verifique seu novo e-mail antes de realizar a alteração.');
  
      // Após a verificação, o e-mail pode ser atualizado
      await updateEmail(user, newEmail);
      Alert.alert("Sucesso", "O e-mail foi atualizado com sucesso!");
      console.log('Link de verificação enviado para o novo e-mail!');
    } catch (error) {
      console.error("Erro ao reautenticar ou alterar o e-mail:", error);
      if (error.code === "auth/wrong-password") {
        Alert.alert("Erro", "A senha atual está incorreta.");
      } else {
        Alert.alert("Erro", error.message);
      }
    }
};

  

  const handleSave = async () => {
    if (user) {
      const userRef = doc(db, 'doador', user.uid);
  
      try {
        // Atualizando o e-mail no Firestore
        if (newEmail && newEmail !== user.email) {
          await updateDoc(userRef, {
            nome: newName,
            sobrenome: newSobrenome,
            email: newEmail,
            tipoSanguineo: newBloodType,
          });
  
          // Atualizando o e-mail no Firebase Auth
          await updateEmail(user, newEmail);
          await sendEmailVerification(user); // Envia o link de verificação
          Alert.alert('Verifique seu e-mail', 'Por favor, verifique seu novo e-mail antes de realizar a alteração.');
  
          console.log('Email atualizado com sucesso! Link de verificação enviado.');
        } else {
          // Atualizando apenas os outros dados
          await updateDoc(userRef, {
            nome: newName,
            sobrenome: newSobrenome,
            tipoSanguineo: newBloodType,
          });
          console.log('Informações atualizadas!');
        }
  
        Alert.alert("Informações atualizadas!", "Suas informações foram atualizadas com sucesso!");
        navigation.goBack();
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
              value={newName}
              onChangeText={setNewName}
              placeholder="Digite seu nome"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Sobrenome:</Text>
            <TextInput
              style={styles.input}
              value={newSobrenome}
              onChangeText={setNewSobrenome}
              placeholder="Digite seu sobrenome"
            />
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Tipo sanguíneo:</Text>
            <SelectList
              setSelected={setNewBloodType}
              value={newBloodType}
              data={tipos}
              placeholder={newBloodType || "Selecione seu tipo sanguíneo"}
              arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
              search={false}
              boxStyles={styles.boxStyles}
              dropdownItemStyles={styles.dropdownItemStyles}
              dropdownStyles={styles.dropdownStyles}
            />
          </View>

          <View style={styles.inputSection}>
            <TouchableOpacity style={styles.inputLabel} onPress={openModalEmail}>
              <Text style={styles.inputLabelTxt}>Alterar E-mail</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isModalVisibleEmail}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModalEmail}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Alterar E-mail</Text>

                <TextInput
                  style={styles.modalInput}
                  placeholder="Senha atual"
                  secureTextEntry={true}
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />

                <TextInput
                  style={styles.modalInput}
                  placeholder="Novo e-mail"
                  value={newEmail}
                  onChangeText={setNewEmail}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={closeModalEmail}>
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      reauthenticateAndChangeEmail(currentPassword, newEmail);
                      closeModalEmail();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>

          <View style={styles.inputSection}>
            <TouchableOpacity style={styles.inputLabel} onPress={openModal}>
              <Text style={styles.inputLabelTxt}>Alterar senha</Text>
            </TouchableOpacity>
          </View>
          <Modal
            visible={isModalVisible}
            transparent={true}
            animationType="slide"
            onRequestClose={closeModal}
          >
            <View style={styles.modalOverlay}>
              <View style={styles.modalContent}>
                <Text style={styles.modalTitle}>Alterar Senha</Text>

                <TextInput
                  style={styles.modalInput}
                  secureTextEntry={true}
                  placeholder="Senha atual"
                  value={currentPassword}
                  onChangeText={setCurrentPassword}
                />

                <TextInput
                  style={styles.modalInput}
                  secureTextEntry={true}
                  placeholder="Nova senha"
                  value={newPassword}
                  onChangeText={setNewPassword}
                />

                <View style={styles.modalButtons}>
                  <TouchableOpacity style={styles.modalButton} onPress={closeModal}>
                    <Text style={styles.modalButtonText}>Cancelar</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.modalButton}
                    onPress={() => {
                      reauthenticateAndChangePassword(currentPassword, newPassword);
                      closeModal();
                    }}
                  >
                    <Text style={styles.modalButtonText}>Salvar</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>



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
  inputLabelTxt: {
    fontSize: 16,
    color: '#AF2B2B',
    textDecorationLine: 'underline'
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
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    width: "80%",
    height: '27%',
    backgroundColor: "white",
    borderRadius: 10,
    padding: 20,
    alignItems: "center",
    justifyContent: 'center'
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  modalInput: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: '#053A45',
    padding: 10,
    borderRadius: 5,
    backgroundColor: '#EEF0EB',
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  modalButton: {
    flex: 1,
    padding: 10,
    backgroundColor: "#AF2B2B",
    borderRadius: 5,
    marginHorizontal: 5,
    alignItems: "center",
  },
  modalButtonText: {
    color: "white",
    fontWeight: "bold",
  },
});

export default ProfileScreen;