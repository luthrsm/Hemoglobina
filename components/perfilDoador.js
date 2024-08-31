import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';





const PerfilDoador = ({ control, errors, formData, onDataChange, onNext, onBack }) => {
    
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

    const [date, setDate] = useState(null);
    const [show, setShow] = useState(false);

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

    const handleValueChange = (field, value) => {
        onDataChange({ [field]: value });
    };

    const [value, setValue] = useState('');

    return (
        <View style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={onBack}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={styles.logo} source={require('../assets/img/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                <Text style={styles.txtSecundario}>Perfil do doador</Text>
            </View>

            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name='nome'
                    render={({ field: { onChange, onBlur, value } }) =>
                        <TextInput
                            style={styles.input}
                            placeholder='Nome'
                            placeholderTextColor='#000'
                            onChangeText={text => {
                                onChange(text);
                                handleValueChange('nome', text)
                            }}
                            onBlur={onBlur}
                            value={formData.nome || ''}
                        />
                    }
                />
                {errors.nome && <Text style={styles.labelError}>{errors.nome.message}</Text>}

                <Controller
                    control={control}
                    name='sobrenome'
                    render={({ field: { onChange, onBlur, value } }) =>
                        <TextInput
                            style={styles.input}
                            placeholder='Sobrenome'
                            placeholderTextColor='#000'
                            onChangeText={text => {
                                onChange(text);
                                handleValueChange('sobrenome', text)
                            }}
                            value={formData.sobrenome || ''}
                            onBlur={onBlur}
                        />
                    }
                />
                {errors.sobrenome && <Text style={styles.labelError}>{errors.sobrenome.message}</Text>}

                <Controller
                    control={control}
                    name="dataNascimento"
                    render={({ field: { onChange, value } }) => (
                        <>
                            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                                <Text>
                                    {value ? formatDate(value) : 'Data de Nascimento'}
                                </Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    value={value ? new Date(value) : new Date()} // Assegura que 'value' seja uma data válida
                                    mode="date"
                                    display="default"
                                    onChange={(event, selectedDate) => {
                                        setShow(false); // Fecha o DateTimePicker após selecionar a data
                                        if (selectedDate) {
                                            onChange(selectedDate); // Atualiza o valor do Controller com a nova data
                                            handleValueChange('dataNascimento', selectedDate); // Atualiza o estado geral do formulário
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
                    name='cpf'
                    render={({ field: { onChange, onBlur, value } }) =>
                        <TextInput
                            style={styles.input}
                            placeholder='CPF'
                            placeholderTextColor='#000'
                            onBlur={onBlur}
                            keyboardType='numeric'
                            onChangeText={text => {
                                onChange(text);
                                handleValueChange('cpf', text)
                            }}
                            value={formData.cpf || ''}
                        />
                    }
                />
                {errors.cpf && <Text style={styles.labelError}>{errors.cpf.message}</Text>}

                <Controller
                    control={control}
                    name='tipoSanguineo'
                    render={({ field: { onChange, onBlur, value } }) =>
                        <SelectList
                            setSelected={onChange}
                            onBlur={onBlur}
                            value={value}
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder='Tipo Sanguíneo'
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                        />
                    }
                />
                {errors.tipoSanguineo && <Text style={styles.labelError}>{errors.tipoSanguineo.message}</Text>}
            </View>
            <TouchableOpacity onPress={onNext} style={styles.BtProx}>
                <Text style={styles.txtBtProx}>Avançar</Text>
            </TouchableOpacity>
        </View>
    )
}

export default PerfilDoador;

const styles = StyleSheet.create({
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
        marginTop: '15%',
        width: '60%',
        alignSelf: 'center'
    },
    txtBtProx: {
        color: '#fff',
        fontSize: 16,
    },
    inputBottomContainer: {
        flexDirection: "row",
        gap: 20,
    },
    inputBottom: {
        height: 50,
        width: '47%',
        backgroundColor: '#EEF0EB',
        marginBottom: '6%',
        paddingHorizontal: 8,
        borderRadius: 7,
        paddingLeft: 20,
        fontFamily: 'DM-Sans'
    },
    termos: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    checkboxContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    label: {
        marginLeft: 8,
    },
    link: {
        textDecorationLine: 'underline',
        color: '#326771',
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
        marginBottom: '5%'
    },
});