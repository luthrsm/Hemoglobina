import React, { useState, useRef } from "react";
import { NavigationContainer, useNavigation } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';
import { StatusBar } from 'expo-status-bar'
import { View, Text, TouchableOpacity, Image, StyleSheet, ScrollView, Dimensions, SafeAreaView } from 'react-native';
import AnimatedPaginationDot from 'react-native-animated-pagination-dot';
import CadastroEscolha from "./cadEscolha";



const { width } = Dimensions.get('window');



const WelcomeScreen = () => {
    const [activeDotIndex, setActivateDotIndex] = useState(0);
    const ScrollViewRef = useRef(null);
    const navigation = useNavigation();
    const handleScroll = (event) => {
        const offsetX = event.nativeEvent.contentOffset.x;
        setActivateDotIndex(Math.round(offsetX / width));
    }

    const handleNext = () => {
        if (activeDotIndex < 2) { //checa se nao é a ultima pag
            ScrollViewRef.current.scrollTo({ x: (activeDotIndex + 1) * width });
        } else {
            navigation.navigate('CadastroEscolha')
            //adc else para ir pra pág de cadastro/login
        }


    }

    return (
        <SafeAreaView>
            <View style={styles.container}>
                <ScrollView
                    ref={ScrollViewRef}
                    horizontal
                    pagingEnabled
                    onScroll={handleScroll}
                    scrollEventThrottle={16}
                    showsHorizontalScrollIndicator={false}
                >
                    {/* primeira página */}
                    <View style={styles.WelcomeContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={require('../assets/img/bemvindo1.png')} />
                        </View>
                        <View style={styles.welcomeContainerInfo}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.title}> Bem-vindo ao Hemoglobina!</Text>
                                <Text style={styles.welcomeTxt}> Um aplicativo que conecta doadores de sangue e hemocentros</Text>
                            </View>
                            <View style={styles.bottomContainer}>
                                <View style={styles.paginacao}>
                                    <AnimatedPaginationDot
                                        activeDotColor="#83afb8"
                                        inactiveDotColor="white"
                                        curPage={activeDotIndex}
                                        maxPage={3}
                                        sizeRatio={1.5}
                                    />
                                </View>
                                <TouchableOpacity style={styles.botaoContinue} onPress={handleNext}>
                                    <Text style={styles.txtBotao}> próximo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* segunda página */}

                    <View style={styles.WelcomeContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={require('../assets/img/bemvindo2.png')} />
                        </View>
                        <View style={styles.welcomeContainerInfo}>
                            <View style={styles.txtContainer}>
                                <Text style={styles.title}> Faça parte da comunidade</Text>
                                <Text style={styles.welcomeTxt}> Venha fazer parte da comunidade! Seja um doador e salve vidas!</Text>
                            </View>
                            <View style={styles.bottomContainer}>
                                <View style={styles.paginacao}>
                                    <AnimatedPaginationDot
                                        activeDotColor="#83afb8"
                                        inactiveDotColor="white"
                                        curPage={activeDotIndex}
                                        maxPage={3}
                                        sizeRatio={1.5}
                                    />
                                </View>
                                <TouchableOpacity style={styles.botaoContinue} onPress={handleNext}>
                                    <Text style={styles.txtBotao}> próximo</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>

                    {/* terceira página */}

                    <View style={styles.WelcomeContainer}>
                        <View style={styles.imgContainer}>
                            <Image source={require('../assets/img/bemvindo3.png')} />
                        </View>
                        <View style={styles.welcomeContainerInfo}>
                            <View style={styles.txtContainer3}>
                                <Text style={styles.title}> Interaja e descubra</Text>
                                <Text style={styles.welcomeTxt}> Interaja com o HemoAssistent, crie campanhas e compartilhe com seus amigos!</Text>
                            </View>
                            <View style={[styles.bottomContainer, {marginTop: '29%'}]}>
                                <View style={styles.paginacao}>
                                    <AnimatedPaginationDot
                                        activeDotColor="#83afb8"
                                        inactiveDotColor="white"
                                        curPage={activeDotIndex}
                                        maxPage={3}
                                        sizeRatio={1.5}
                                    />
                                </View>
                                <TouchableOpacity style={styles.botaoContinue} onPress={handleNext}>
                                    <Text style={styles.txtBotao}> Iniciar</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ScrollView>

            </View>
        </SafeAreaView>
    );
}



export default WelcomeScreen;

//estilização

const styles = StyleSheet.create({
    WelcomeContainer: {
        flex: 1,
        flexGrow: 1,
        backgroundColor: '#EEF0EB',
        alignItems: 'center',
        justifyContent: 'flex-end',
        padding: 0,
        width: width //largura igual a da tela
    },
    imgContainer: {
        marginTop: 160,
        marginBottom: 90
    },
    welcomeContainerInfo: {
        flexShrink: 0,
        backgroundColor: '#af2b2b',
        height: '40%',
        width: '100%',
        padding: 10,
        alignItems: 'center',
        gap: 10,
        borderTopLeftRadius: 30,
        borderTopRightRadius: 30,
        marginTop: '10%',
    },
    txtContainer: {
        gap: 12,
        marginTop: 45,
        width: 260,

    },
    txtContainer3: {
        gap: 12,
        marginTop: 45,
        width: 260,      
    },
    title: {
        color: '#f5f5f5',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 24,
        marginLeft: 10,
        marginRight: 10,
        fontSize: 28,
    },
    welcomeTxt: {
        color: '#f5f5f5',
        fontFamily: 'Poppins-Regular',
        textAlign: 'center',
        alignItems: 'center',
        fontSize: 16,
        marginLeft: 5,
        marginRight: 5,
        fontSize: 18,

    },
    bottomContainer: {
        flexDirection: "row",
        gap: 150,
        marginTop: '20%'
    },
    botaoContinue: {
        backgroundColor: '#eef0eb',
        alignItems: 'center',
        justifyContent: 'center',
        width: 95,
        height: 34,
        borderRadius: 10,
        marginTop: -10
    }

});