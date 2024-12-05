import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    FlatList,
    ActivityIndicator,
    StyleSheet,
    KeyboardAvoidingView
} from "react-native";
import axios from "axios";
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { FontAwesome6 } from '@expo/vector-icons';
import AntDesign from '@expo/vector-icons/AntDesign';
import MenuDoador from "../../../../components/menu/menuDoador";
import ChatBubble from "./ChatBubble";
import { speak, isSpeakingAsync, stop } from "expo-speech";
import { useNavigation } from '@react-navigation/native';


const Chatbot = () => {
    const [chat, setChat] = useState([
        {
            role: "model",
            parts: [{ text: "Recado dos desenvolvedores: O HemoAssistent IA ainda está em desenvolvimento e, portanto, ele ainda não pode responder suas perguntas sobre o Hemoglobina e ainda responde coisas não relacionadas à doação de sangue. Estamos trabalhando para que a sua experiencia usando o nosso sistema seja a melhor possível!" }],
        },
    ]);
    const [userInput, setUserInput] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isSpeaking, setIsSpeaking] = useState(false);
    const navigation = useNavigation();

    const API_KEY = "AIzaSyD7mayOsrEY2xmf39_LOfMEj3VPJrIBEgg";

    const handleUserInput = async () => {
        if (!userInput.trim()) {
            setError("Por favor, digite uma mensagem antes de enviar.");
            return;
        }

        const updatedChat = [
            ...chat,
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        const chatContents = [
            {
                role: "user",
                parts: [{ text: userInput }],
            },
        ];

        setLoading(true);

        try {
            const response = await axios.post(
                `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
                {
                    contents: chatContents,
                }
            );

            console.log("Resposta completa da Gemini Pro API:", JSON.stringify(response.data, null, 2));

            const modelResponse =
                response.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";

            if (modelResponse) {
                const updatedChatWithModel = [
                    ...updatedChat,
                    {
                        role: "model",
                        parts: [{ text: modelResponse }],
                    },
                ];

                setChat(updatedChatWithModel);
                setUserInput("");
            }
        } catch (error) {
            console.error("Erro ao chamar o Gemini Pro API:", error);
            console.error("Error response:", error.response);
            setError("Ocorreu um erro. Por favor tente novamente.");
        } finally {
            setLoading(false);
        }
    };

    const handleSpeech = async (text) => {
        if (isSpeaking) {
            //se já estiver falando, para
            stop();
            setIsSpeaking(false);
        } else {
            //se não estiver falando, comece a falar
            if (!(await isSpeakingAsync())) {
                speak(text);
                setIsSpeaking(true);
            }
        }
    };

    const renderChatItem = ({ item }) => (
        <ChatBubble
            role={item.role}
            text={item.parts[0].text}
            onSpeech={() => handleSpeech(item.parts[0].text)}
        />
    );

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}>HemoAssistent IA</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <View style={styles.mainContainer}>
                <View style={styles.voltarContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <AntDesign name="arrowleft" size={24} color="#326771" />
                    </TouchableOpacity>
                </View>
                {loading && <ActivityIndicator size="large" style={styles.loader} color="#326771" />}
                <KeyboardAvoidingView style={styles.contentContainer}>
                    <FlatList
                        data={chat}
                        renderItem={renderChatItem}
                        keyExtractor={(item, index) => index.toString()}
                        contentContainerStyle={styles.chatContainer}
                    />
                    
                    {error && <Text style={styles.error}>{error}</Text>}
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Digite a sua dúvida..."
                            placeholderTextColor="#000"
                            value={userInput}
                            onChangeText={setUserInput}
                        />
                        <TouchableOpacity style={styles.button} onPress={handleUserInput}>
                            <FontAwesome name="send-o" size={24} color="white" />
                        </TouchableOpacity>
                    </View>
                </KeyboardAvoidingView>
            </View>
            <MenuDoador />
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fefefe",
        justifyContent: 'flex-end',
    },
    voltarContainer: {
        position: 'absolute',
        top: 25,
        left: 16,
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: 80,
        borderBottomLeftRadius: 8,
        borderBottomRightRadius: 8,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    config: {
        marginTop: 28,
        marginRight: 20,
    },
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 15,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22
    },
    mainContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center'
    },
    contentContainer: {
        justifyContent: 'flex-end',
        flexShrink: 1,
        width: '90%',
        marginBottom: 50,
        marginTop: 25
    },
    chatContainer: {
        flexGrow: 1,
        justifyContent: "flex-end",
        marginTop: 40,
        marginBottom: 40,
        paddingBottom: 40,
    },
    inputContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: 10,
    },
    input: {
        flex: 1,
        height: 50,
        marginRight: 10,
        padding: 10,
        border: "none",
        borderRadius: 5,
        color: "#000",
        backgroundColor: "#d9d9d9",
        fontFamily: 'DM-Sans',

    },
    button: {
        padding: 10,
        backgroundColor: "#af2b2b",
        borderRadius: 25,
    },
    loader: {
        marginTop: 10,
    },
    error: {
        color: "#af2b2b",
        marginTop: 10,
    },
});

export default Chatbot;
