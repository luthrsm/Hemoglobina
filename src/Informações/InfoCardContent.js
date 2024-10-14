import React from 'react';
import { Text, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import MenuDoador from '../../components/menuDoador';

const InfoCardContent = ({ route }) => {
    const navigation = useNavigation();
    const { informacoes } = route.params;

    const handleVoltar = () => {
        navigation.goBack(); 
    };

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Informações</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={handleVoltar}>
                        <AntDesign name="arrowleft" size={24} color="#326771" />
                    </TouchableOpacity>
                </View>
                <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                    <View style={styles.contentContainer}>
                        <Text style={styles.titleInfo}>{informacoes.title}</Text>
                        <Image source={informacoes.imagem} style={styles.image} />
                        {informacoes.descricao.split('\n').map((linha, index) => (
                            <Text key={index} style={styles.descInfo}>
                                {linha}
                            </Text>
                        ))}
                        <Text style={styles.refInfo}>Referências:</Text>
                        <Text style={styles.refTxt}>{informacoes.referencia}</Text>
                    </View>
                </ScrollView>
            </View>
            <MenuDoador />
        </View>
    );
};

export default InfoCardContent;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
    },
    voltarContainer: {
        marginTop: 25,
        marginLeft: 16,
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: '10%',
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 15,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22,
    },
    config: {
        marginTop: 15,
        marginRight: 20,
    },
    mainContainer: {
        flex: 1,
    },
    contentContainer: {
        marginTop: '8%',
        justifyContent: 'center',
        padding: 27,
    },
    titleInfo: {
        fontFamily: 'Poppins-SemiBold',
        color: '#053A45',
        fontSize: 23,
        textAlign: 'center',
    },
    image: {
        alignSelf: 'center',
        margin: 10,
    },
    descInfo: {
        fontFamily: 'DM-Sans',
        fontSize: 18,
        textAlign: 'justify',
        marginBottom: 5,
        marginTop: 10,
    },
    refInfo: {
        fontFamily: 'DM-Sans',
        fontSize: 20,
        marginTop: 30,
        color: '#053A45',
    },
    refTxt: {
        fontFamily: 'DM-Sans',
        marginTop: 10,
    },
});
