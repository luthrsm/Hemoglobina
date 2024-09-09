import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

//icons
import { FontAwesome6 } from '@expo/vector-icons';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import Ionicons from '@expo/vector-icons/Ionicons';

const MenuHemo = () => {
  const navigation = useNavigation();
    return (
        <View style={styles.menuContainer}>
            <TouchableOpacity style={styles.divLink}>
                <FontAwesome name="home" size={28} color="#EEF0EB" style={styles.icons} />
                <Text style={styles.txtMenu}> Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink}>
                <Ionicons name="eyedrop-outline" size={28} color="#EEF0EB" style={styles.icons} />
                <Text style={styles.txtMenu}> Doações</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.divLink}>
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

export default MenuHemo;

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

    },
    txtMenu: {
        color: '#EEF0EB',
        fontSize: 13,
        textAlign: 'center',
    },
    icons: {
        textAlign: 'center'
    }
});