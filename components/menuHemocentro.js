import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//icons
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

//navigation
import { useNavigation } from '@react-navigation/native'
import * as React from 'react';

const MenuHemocentro = () => {
    const navigation = useNavigation();

    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('HomeHemocentro')}>
                <FontAwesome name="home" size={28} color="#EEF0EB" style={styles.icons} />
                <Text style={styles.txtMenu}> Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('HistoricoHemocentro')}>
                <MaterialIcons name="bloodtype" size={28} color="#EEF0EB"/>
                <Text style={styles.txtMenu}> Doações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('CampanhaMainHemocentro')}>
                <Ionicons name="chatbubbles" size={28} color="#EEF0EB" style={styles.icons} />
                <Text style={styles.txtMenu}> Campanhas</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink} onPress={() => navigation.navigate('ConfiguracoesHemo')}>
                <FontAwesome6 name="gear" size={28} color="#EEF0EB" style={styles.icons} />
                <Text style={styles.txtMenu}> Configurações</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuHemocentro

const styles = StyleSheet.create({
    menuContainer: {
        backgroundColor: '#AF2B2B',
        height: 80,
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        padding: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 35,
        marginTop: 'auto',
        
    },
    divLink: {
        alignItems: "center",
        justifyContent: "center",
    },
    txtMenu: {
        color: '#EEF0EB',
        fontSize: 13,
        textAlign: 'center',

    },
    icons: {
        textAlign: 'center',
    }
});