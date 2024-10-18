import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { useState } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import DateTimePicker from '@react-native-community/datetimepicker';
import { SelectList } from 'react-native-dropdown-select-list';
import MenuHemocentro from '../../components/menuHemocentro';
import FontAwesome from '@expo/vector-icons/FontAwesome';


const AdcDoacao = ({ navigation }) => {

    const tipos = [
        { key: "1", value: "A verificar" },
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
    const [selected, setSelected] = useState("");
    const [quantidade, setQuantidade] = useState('');
    const [cpf, setCpf] = useState('');
    const [nome, setNome] = useState("")

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

    // Navegação para a próxima tela com as variáveis
    const handleNext = () => {
        navigation.navigate('AtencaoScreen', {
            data: formatDate(date),
            quantidade,
            nome,
            cpf,
            tipoSanguineo: selected,
        });
    };

    const isValidCPF = (cpf) => {
        cpf = cpf.replace(/[^\d]+/g, '');
        if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
    
        let sum = 0;
        let remainder;
        for (let i = 1; i <= 9; i++) sum += parseInt(cpf.substring(i - 1, i)) * (11 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(9, 10))) return false;
        sum = 0;
        for (let i = 1; i <= 10; i++) sum += parseInt(cpf.substring(i - 1, i)) * (12 - i);
        remainder = (sum * 10) % 11;
        if (remainder === 10 || remainder === 11) remainder = 0;
        if (remainder !== parseInt(cpf.substring(10, 11))) return false;
    
        return true;
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>Adicionar doação</Text>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={32} color="#053a45" />
                    </TouchableOpacity>
                </View>

                <View style={styles.adcDoacaoContainer}>
                    <Text style={styles.adcDoacaoTitle}>Adicionar Doação</Text>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Data da doação:</Text>
                        <>
                            <TouchableOpacity onPress={() => setShow(true)} style={styles.input}>
                                <Text style={{ color: date ? '#000' : '#999999' }}>
                                    {date ? formatDate(date) : 'Escolha a data da doação'}
                                </Text>
                            </TouchableOpacity>
                            {show && (
                                <DateTimePicker
                                    mode="date"
                                    display="default"
                                    value={date || new Date()}
                                    onChange={onChangeDate}
                                />
                            )}
                        </>
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Nome completo do doador:</Text>
                        <TextInput
                            placeholder='Digite o nome completo do doador...'
                            style={styles.input}
                            placeholderTextColor={'#999999'}
                            value={nome}
                            onChangeText={setNome}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>CPF do doador:</Text>
                        <TextInput
                            placeholder='Digite o CPF sem pontos e traços...'
                            style={styles.input}
                            placeholderTextColor={'#999999'}
                            keyboardType='numeric'
                            value={cpf}
                            onChangeText={setCpf}
                        />
                    </View>
                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Quantidade:</Text>
                        <TextInput
                            placeholder='Digite a quantidade doada em mL...'
                            style={styles.input}
                            placeholderTextColor={'#999999'}
                            value={quantidade}
                            onChangeText={setQuantidade}
                            keyboardType='numeric'
                        />
                    </View>

                    <View style={styles.inputContainer}>
                        <Text style={styles.label}>Tipo sanguíneo: </Text>
                        <SelectList
                            data={tipos}
                            arrowicon={<FontAwesome name="chevron-down" size={12} color={'black'} />}
                            search={false}
                            placeholder='Escolha o tipo sanguíneo'
                            boxStyles={styles.boxStyles}
                            dropdownItemStyles={styles.dropdownItemStyles}
                            dropdownStyles={styles.dropdownStyles}
                            maxHeight={'100'}
                            placeholderTextColor={'#999999'}
                            setSelected={(key) => {
                                const selectedTipo = tipos.find(tipo => tipo.key === key);
                                setSelected(selectedTipo.value);
                            }}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={handleNext}>
                        <Text style={styles.buttonTxt}>Adicionar doação</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <MenuHemocentro />
        </SafeAreaView>
    )
}

export default AdcDoacao;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
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
        top: 16,
        left: 16,
    },
    title: {
        color: '#EEF0EB',
        marginTop: 7,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        marginLeft: 10
    },
    mainContainer: {
        padding: 32,
        flex: 1,
        justifyContent: 'center'
    },
    adcDoacaoContainer: {
        backgroundColor: '#DAEEF2',
        borderWidth: 1.2,
        borderColor: '#053a45',
        borderRadius: 4.71,
        padding: 24,
        minHeight: '50%',
        gap: 20,
        marginTop: 20
    },
    adcDoacaoTitle: {
        fontFamily: 'DM-Sans',
        fontSize: 25,
        textAlign: 'center',
    },
    inputContainer: {
        gap: 7.4,
    },
    label: {
        fontFamily: 'DM-Sans',
        fontSize: 16,
        lineHeight: 19,
        color: '#053a45'
    },
    input: {
        backgroundColor: '#fff',
        height: 35,
        padding: 5,
        paddingLeft: 10,
        borderWidth: 0.9,
        borderColor: '#053a45',
        borderRadius: 4.71,
        justifyContent: 'center'
    },
    boxStyles: {
        backgroundColor: '#fff',
        height: 45,
        paddingLeft: 10,
        borderWidth: 0.9,
        borderColor: '#053a45',
        borderRadius: 4.71,
        alignItems: 'center'
    },
    dropdownStyles: {
        backgroundColor: '#fff',
        borderWidth: 0.9,
        borderTopWidth: 0,
        borderTopEndRadius: 0,
        borderTopStartRadius: 0,
        borderColor: '#053a45',
        marginTop: 'auto'

    },
    button: {
        backgroundColor: '#1e6370',
        height: 35,
        width: 135,
        alignSelf: 'center',
        padding: 7,
        borderWidth: 0.9,
        borderColor: '#053a50',
        borderRadius: 12,
        justifyContent: 'center',

    },
    buttonTxt: {
        fontFamily: 'DM-Sans',
        fontSize: 12,
        color: '#eef0eb',
        lineHeight: 12,
        textAlign: 'center'
    }
})


