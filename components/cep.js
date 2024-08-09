import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity } from 'react-native';
import React, { useState, useEffect } from 'react';
import { useNavigation } from '@react-navigation/native';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { SelectList } from 'react-native-dropdown-select-list';
import DateTimePicker from '@react-native-community/datetimepicker';
import axios from 'axios';

import InputSenhaCad from '../components/inputSenhaCad';


import FontAwesome from '@expo/vector-icons/FontAwesome';
import AntDesign from '@expo/vector-icons/AntDesign';
import { Ionicons } from '@expo/vector-icons';


const AddressForm = () => {


    return(
        <View>
            <Controller

control={control}
                            name='cep'
                            render={({ field: { onChange, onBlur, value } }) => (
                                <TextInput
                                style={styles.input}
                                placeholder='CEP'
                                keyboardType='numeric'
                                onBlur={onBlur}
                                maxLength={8}
                                value={value} // Usa o valor do Controller
                                onChangeText={(text) => {
                                    setCep(text);
                                    onChange(text); // Atualiza o valor do formulário
                                }}
                                placeholderTextColor='#000'
                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='endereco'
                            render={({ field: { value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder= 'Endereço'
                                    value={value || ''} // Garante que o valor seja sempre uma string
                                    editable={false}
                                    placeholderTextColor='#000'

                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='bairro'
                            render={({ field: { value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder='Bairro'
                                    value={value || ''} // Garante que o valor seja sempre uma string
                                    editable={false}
                                    placeholderTextColor='#000'

                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='cidade'
                            render={({ field: { value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder= 'Cidade'
                                    value={value || ''} // Garante que o valor seja sempre uma string
                                    editable={false}
                                    placeholderTextColor='#000'

                                />
                            )}
                        />
                        <Controller
                            control={control}
                            name='estado'
                            render={({ field: { value } }) => (
                                <TextInput
                                    style={styles.input}
                                    placeholder= 'Estado'
                                    value={value || ''} // Garante que o valor seja sempre uma string
                                    editable={false}
                                    placeholderTextColor='#000'
                                />
                            )}
                        />
        </View>
    )
}

export default AddressForm;


