import React from "react";
import { View, Text, StyleSheet, TouchableOpacity, Image } from "react-native";
import { Ionicons } from 'react-native-vector-icons';


const ChatBubble = ({ role, text, onSpeech }) => {
    return (
        <View
            style={[
                styles.chatItem,
                role === "user" ? styles.userChatItem : styles.modelChatItem,
            ]}
        >
            {role === "model" && (
                <View style={{flexDirection: "row", marginBottom: 10}}>
                    <Image
                    source={require('../../../../assets/img/iconBot.png')}
                    style={styles.avatar}
                />
        
        <Text style={{marginTop: 10, fontFamily: 'Poppins-SemiBold',}}>HemoAssistent IA</Text>
                    <TouchableOpacity style={styles.speakerIcon} onPress={onSpeech}>
                        <Ionicons name="volume-high-outline" size={24} color="#af2b2b" />
                    </TouchableOpacity>
                </View>
            )}
            <View style={styles.textContainer}>
                <Text style={styles.chatText}>{text}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    chatItem:{
        marginBottom: 10,
        padding:20,
        borderRadius: 10,
        maxWidth: "90%",
        position: "relative",
    },
    userChatItem:{
        alignSelf: "flex-end",
        backgroundColor: "#EEF0EB",
    },
    modelChatItem:{
        alignSelf: "flex-start",
        backgroundColor: "#d9d9d9",
    },
    chatText:{
        fontSize: 16,
        color: "#000",
        fontFamily: 'DM-Sans',

    },
    speakerIcon: {
        position: "absolute",
        top: 5,
        right:5,
    },
    avatar: {
        width: 40,
        height: 40,
        borderRadius: 20,
        marginRight: 8, 
    },
});

export default ChatBubble;
