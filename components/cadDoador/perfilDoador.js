import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';
import { auth, db } from '../../src/Services/firebaseConfig';
import { collection, doc, setDoc, updateDoc } from 'firebase/firestore';

import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';

// Defina o esquema de validação com Yup
const validationSchema = yup.object().shape({
    nome: yup.string().required("Nome é obrigatório"),
    sobrenome: yup.string().required("Sobrenome é obrigatório"),
    cpf: yup.string().required("CPF é obrigatório").matches(/^[0-9]{11}$/, "CPF inválido"),
    tipoSanguineo: yup.string().required("Tipo sanguíneo é obrigatório"),
    dataNascimento: yup.date().required("Data de nascimento é obrigatória").max(new Date(), "Data inválida"),
});

const PerfilDoador = ({ route }) => {
    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(validationSchema),
    });
    const { uid } = route.params;
    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);
    const [formData, setFormData] = useState({});
    const navigation = useNavigation();

    // Define o comportamento do DateTimePicker
    const onChangeDate = (event, selectedDate) => {
        setShow(false); // Fecha o DatePicker
        if (selectedDate) {
            setDate(selectedDate);
        }
    };

    // Formatação da data
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    // Lista de tipos sanguíneos
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

    const onSubmit = async (data) => {
        const { nome, sobrenome, cpf, tipoSanguineo, dataNascimento } = data;

        // Buscar o valor do tipo sanguíneo usando a chave selecionada
        const tipoSelecionado = tipos.find(item => item.key === tipoSanguineo);

        if (!tipoSelecionado) {
            console.error("Tipo sanguíneo inválido");
            return;
        }

        const tipoSanguineoValue = tipoSelecionado.value; 

        try {
            const doadorRef = doc(db, 'doador', uid); 

            await updateDoc(doadorRef, {  
                nome,
                sobrenome,
                cpf,
                tipoSanguineo: tipoSanguineoValue,  
                dataNascimento: formatDate(dataNascimento),
            });

            // Sucesso, pode navegar ou mostrar uma mensagem
            console.log("Dados atualizados com sucesso!");
            // Exemplo de navegação para a próxima tela
            navigation.navigate('AdressForm', { uid });
        } catch (error) {
            console.error("Erro ao atualizar dados:", error);
        }
    };



    return (
        <View style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={styles.logo} source={require('../../assets/img/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                <Text style={styles.txtSecundario}>Perfil do doador</Text>
            </View>

            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="nome"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Nome"
                            placeholderTextColor="#000"
                            onChangeText={text => {
                                onChange(text);
                                setFormData(prevData => ({ ...prevData, nome: text }));
                            }}
                            onBlur={onBlur}
                            value={value || ''}
                        />
                    )}
                />
                {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}

                <Controller
                    control={control}
                    name="sobrenome"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Sobrenome"
                            placeholderTextColor="#000"
                            onChangeText={text => {
                                onChange(text);
                                setFormData(prevData => ({ ...prevData, sobrenome: text }));
                            }}
                            onBlur={onBlur}
                            value={value || ''}
                        />
                    )}
                />
                {errors.sobrenome && <Text style={styles.labelError}>{errors.sobrenome.message}</Text>}

                <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                                <Text>{value ? formatDate(value) : 'Data de Nascimento'}</Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()}
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShow(false); // Fecha o DateTimePicker após selecionar a data
                                        if (selectedDate) {
                                            onChange(selectedDate);
                                            setFormData(prevData => ({ ...prevData, dataNascimento: selectedDate }));
                                        }
                                    }}
                                />
                            )}
                        </>
                    )}
                />
                {errors.dataNascimento && <Text style={styles.labelError}>{errors.dataNascimento.message}</Text>}

                <Controller
                    control={control}
                    name="cpf"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="CPF"
                            placeholderTextColor="#000"
                            onChangeText={text => {
                                onChange(text);
                                setFormData(prevData => ({ ...prevData, cpf: text }));
                            }}
                            keyboardType="numeric"
                            onBlur={onBlur}
                            value={value || ''}
                        />
                    )}
                />
                {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}

                <Controller
                    control={control}
                    name="tipoSanguineo"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <SelectList
                            setSelected={onChange}
                            onBlur={onBlur}
                            value={value}
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder="Tipo Sanguíneo"
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                        />
                    )}
                />
                {errors.tipoSanguineo && <Text style={styles.labelError}>{errors.tipoSanguineo.message}</Text>}
            </View>

            <TouchableOpacity onPress={handleSubmit(onSubmit)} style={styles.BtProx}>
                <Text style={styles.txtBtProx}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default PerfilDoador;

const styles = StyleSheet.create({
    // Styles remain the same
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
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
        marginTop: '-20%',
    },
    txtTopContainer: {
        marginBottom: 20,
    },
    txtPrincipal: {
        fontSize: 24,
        color: '#470404',
        fontFamily: 'Poppins-Medium',
        textAlign: 'center',
    },
    txtSecundario: {
        fontSize: 16,
        color: '#470404',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
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
        justifyContent: 'center',
    },
    BtProx: {
        backgroundColor: '#AF2B2B',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: '15%',
        width: '60%',
        alignSelf: 'center',
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
    boxStyles: {
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',
    },
    dropdownStyles: {
        borderColor: '#EEF0EB',
        borderRadius: 7,
        backgroundColor: '#EEF0EB',
        marginTop: '',
        marginBottom: '5%',
    },
});
