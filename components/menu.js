import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

//icons
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

//navigation
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';

const MenuDoador = () => {
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.divLink}>
                <FontAwesome name="home" size={28} color="#EEF0EB"  style={styles.icons}/>
                <Text style={styles.txtMenu}> Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink}>
                <Ionicons name="information-circle-outline" size={28} color="#EEF0EB" style={styles.icons}/>
                <Text style={styles.txtMenu}> Informações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink}>
                <MaterialCommunityIcons name="hospital-marker" size={28} color="#EEF0EB" style={styles.icons}/>
                <Text style={styles.txtMenu}> Hemocentros</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink}>
                <FontAwesome name="bullhorn" size={28} color="#EEF0EB" style={styles.icons}/>
                <Text style={styles.txtMenu}> Campanhas</Text>
            </TouchableOpacity>
        </View>
    )
}

export default MenuDoador

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
    },
    divLink:{
        
    },
    txtMenu:{
        color: '#EEF0EB',
        fontSize: 10,
        textAlign: 'center',
    },
    icons:{
        textAlign: 'center'
    }
});