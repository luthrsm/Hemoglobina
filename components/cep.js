import { Text, View, StyleSheet, TextInput } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import axios from 'axios';

// Definindo o esquema de validação usando Yup
const schemaCEP = yup.object().shape({
    cep: yup.string().required("Informe seu CEP").length(8, "O CEP deve ter 8 dígitos"),
    endereco: yup.string(),
    bairro: yup.string(),
    cidade: yup.string(),
    estado: yup.string(),
});

const AddressForm = ({ formData, onDataChange, onNext, onBack }) => {
    const handleChange = (field, value) => {
        onDataChange({ [field]: value });
    };
    
    const { control, handleSubmit, formState: { errors }, setValue, trigger } = useForm({
        resolver: yupResolver(schemaCEP),
    });

    const [cep, setCep] = useState('');

    const fetchAddress = async () => {
        if (cep.length === 8) {
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
                const data = response.data;

                if (data && !data.erro) {
                    setValue('endereco', data.logradouro || '');
                    setValue('bairro', data.bairro || '');
                    setValue('cidade', data.localidade || '');
                    setValue('estado', data.uf || '');
                } else {
                    setValue('endereco', '');
                    setValue('bairro', '');
                    setValue('cidade', '');
                    setValue('estado', '');
                }

                trigger(['endereco', 'bairro', 'cidade', 'estado']);
            } catch (error) {
                console.error("Erro ao buscar endereço:", error);
                setValue('endereco', '');
                setValue('bairro', '');
                setValue('cidade', '');
                setValue('estado', '');
                trigger(['endereco', 'bairro', 'cidade', 'estado']);
            }
        }
    };

    useEffect(() => {
        fetchAddress();
    }, [cep]);

    return (

        <View style={styles.stepContainer}>
            <View style={styles.voltarContainer}>
                <TouchableOpacity onPress={onBack}>
                    <AntDesign name="arrowleft" size={24} color="#7A0000" />
                </TouchableOpacity>
            </View>
            <View style={styles.containerImg}>
                <Image style={[styles.logo, { marginTop: '-15%' }]} source={require('../assets/img/logoHemoglobina.png')} />
            </View>
            <View style={styles.txtTopContainer}>
                <Text style={styles.txtPrincipal}>Cadastro doador</Text>
                <Text style={styles.txtSecundario}>Editar endereço</Text>
            </View>

            <View style={styles.inputContainer}>
                <Controller
                    control={control}
                    name="cep"
                    render={({ field: { onChange, onBlur, value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="CEP"
                            keyboardType="numeric"
                            onBlur={onBlur}
                            maxLength={8}
                            value={value || ''}
                            onChangeText={(text) => {
                                setCep(text);
                                onChange(text);
                            }}
                            placeholderTextColor="#000"
                        />
                    )}
                />
                {errors.cep && <Text style={styles.labelError}>{errors.cep.message}</Text>}

                <Controller
                    control={control}
                    name="endereco"
                    render={({ field: { value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Endereço"
                            value={value || ''}
                            editable={false}
                            placeholderTextColor="#000"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="bairro"
                    render={({ field: { value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Bairro"
                            value={value || ''}
                            editable={false}
                            placeholderTextColor="#000"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="cidade"
                    render={({ field: { value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Cidade"
                            value={value || ''}
                            editable={false}
                            placeholderTextColor="#000"
                        />
                    )}
                />
                <Controller
                    control={control}
                    name="estado"
                    render={({ field: { value } }) => (
                        <TextInput
                            style={styles.input}
                            placeholder="Estado"
                            value={value || ''}
                            editable={false}
                            placeholderTextColor="#000"
                        />
                    )}
                />
            </View>
            <TouchableOpacity style={styles.BtProx} onPress={onNext}>
                <Text style={styles.txtBtProx}>Próximo</Text>
            </TouchableOpacity>
        </View>
    );
};

export default AddressForm;


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
