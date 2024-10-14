import { Text, SafeAreaView, View, StyleSheet, Image, TouchableOpacity, ScrollView } from 'react-native';
import React, { useState, useEffect } from 'react';
import AntDesign from '@expo/vector-icons/AntDesign';
import { FontAwesome6 } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

//componentes
import MenuDoador from './menuDoador';

const questions = [
    {
        id: 1,
        question: "Você pesa mais que 50kg?",
        answers: [
            {
                text: "Sim",
                type: "allowed"
            },
            {
                text: "Não",
                type: "permanent",
                reason: "Você deve pesar no mínimo 50kg para doar."
            }
        ]
    },
    {
        id: 2,
        question: "Você consumiu bebidas alcoólicas nas últimas 12 horas?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você não pode ter ingerido bebidas alcoólicas nas últimas 12 horas."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 3,
        question: "Você apresentou lesão por herpes labial recentemente?",
        answers: [
            {
                text: "Sim, e ainda possuo lesões",
                type: "temporary",
                reason: "Você está apto para a doação após o desaparecimento total das lesões por herpes labiais."
            },
            {
                text: "Sim, mas as lesões desapareceram totalmente",
                type: "allowed",
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 4,
        question: "Você está de jejum?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você tem que estar bem alimentado antes de doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 5,
        question: "Você já teve hepatite após os 11 anos de idade?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Hepatite após o 11º aniversário: Recusa Definitiva. Hepatite B ou C após ou antes dos 10 anos: Recusa definitiva. Hepatite por Medicamento: apto após a cura e avaliado clinicamente. Hepatite viral (A): após os 11 anos de idade, se trouxer o exame do diagnóstico da doença, será avaliado pelo médico da triagem."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 6,
        question: "Você fez tatuagem, micropigmentação, piercing, brinco ou maquiagem definitiva nos últimos 6 meses a 1 ano?",
        answers: [
            {
                text: "Sim, de forma segura a menos de 6 meses",
                type: "temporary",
                reason: "Se de forma segura, você deve esperar 6 meses."
            },
            {
                text: "Sim, de forma não segura a menos de 12 meses",
                type: "temporary",
                reason: "Se de forma não segura, você deve esperar 12 meses."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 7,
        question: "Você fez parto normal ou cesariana recentemente?",
        answers: [
            {
                text: "Sim, parto normal a menos de 3 meses",
                type: "temporary",
                reason: "Você deve esperar 3 meses após o parto normal para doar sangue."
            },
            {
                text: "Sim, parto normal a mais de 90 dias",
                type: "allowed",
            },
            {
                text: "Sim, cesariana a menos de 6 meses",
                type: "temporary",
                reason: "Você deve esperar 180 dias após a cesariana."
            },
            {
                text: "Sim, cesariana a mais de 6 meses",
                type: "allowed",
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 8,
        question: "Você se vacinou contra gripe nos últimos 2 dias?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve esperar 48 horas para doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 9,
        question: "Você se vacinou contra COVID-19 nos últimos 7 dias?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve esperar 7 dias para doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 10,
        question: "Você se vacinou contra a dengue nas últimas 4 semanas?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve esperar 4 semanas para doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 11,
        question: "Você é gestante ou está amamentando um bebê com menos de 1 ano de idade?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve esperar ao menos 1 ano de amamentação para doar."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 12,
        question: "Você já teve algum tipo de câncer?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Todos os tipos de cânceres são impedimentos definitivos para a doação de sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 13,
        question: "Você tem alguma doença autoimune?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Portadores de doenças autoimune não podem doar sangue. Consulte um médico para maiores informações."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 14,
        question: "Você já teve doença de Chagas?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Pessoas que já tiveram doença de Chagas não podem doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 15,
        question: "Você é portador de HIV/AIDS?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Pessoas portadoras de HIV/AIDS não podem doar sangue"
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 16,
        question: "Você esteve em uma situação com risco de contrair IST'S nos últimos 6 meses?",
        answers: [
            {
                text: "Sim, situação de risco",
                type: "temporary",
                reason: "Você deve esperar 6 meses após a situação de risco e confirmação dos testes de IST'S."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 17,
        question: "Você já tem diabetes tipo 1, ou usa insulina?",
        answers: [
            {
                text: "Sim, tenho diabetes tipo 1 mas ela está controlada",
                type: "allowed"
            },
            {
                text: "Sim, tenho diabetes tipo 1 mas não está controlada",
                type: "temporary",
                reason: "Pessoas com diabetes tipo 1 podem doar sangue contanto que a doença esteja controlada."
            },
            {
                text: "Sim, utilizo insulina",
                type: "temporary",
                reason: "Pacientes com diabetes tipo 1 ou 2 em uso de insulina ou outras terapias injetáveis não podem doar sangue devido ao risco de reações durante ou após a doação."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 18,
        question: "Você teve gripe/resfriado nos últimos 7 dias?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve aguardar 7 dias após o desaparecimento total dos sintomas."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 19,
        question: "Você já teve um acidente vascular cerebral (AVC/derrame)?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Não, porém é preciso entender o que levou o indivíduo a ter um AVC, porque a causa pode impedir a doação. Consulte um médico para maiores informações."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 20,
        question: "Você já teve uma doença falciforme, ou outra doença do sangue?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "As pessoas que têm doença falciforme ou talassemia não podem doar sangue. Entretanto, situações específicas são avaliadas no momento da triagem clínica."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 21,
        question: "Você fez endoscopia, colonoscopia ou outro exame invasivo nos últimos 6 meses?",
        answers: [
            {
                text: "Sim",
                type: "temporary",
                reason: "Você deve esperar completar 6 meses desse procedimento para poder doar."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 22,
        question: "Você teve dengue nos últimos 6 meses?",
        answers: [
            {
                text: "Sim, dengue hemorrágica a menos de 6 meses",
                type: "temporary",
                reason: "Você deve esperar pelo menos 6 meses da recuperação da dengue hemorrágica antes de doar sangue."
            },
            {
                text: "Sim, dengue hemorrágica a pelo menos 6 meses",
                type: "allowed"
            },
            {
                text: "Sim, dengue não hemorrágica a menos de 1 mês",
                type: "temporary",
                reason: "Você deve esperar pelo menos 4 semanas da recuperação da dengue antes de doar sangue."
            },
            {
                text: "Sim, dengue não hemorrágica a pelo menos 1 mês",
                type: "allowed"
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 23,
        question: "Você teve malária?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Pessoas que já tiveram malária não podem doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    },
    {
        id: 24,
        question: "Você utiliza algum tipo de droga ilícita injetável?",
        answers: [
            {
                text: "Sim",
                type: "permanent",
                reason: "Pessoas que utilizam drogas ilícitas injetáveis não podem doar sangue."
            },
            {
                text: "Não",
                type: "allowed"
            }
        ]
    }
]


const Perguntas = () => {

    const navigation = useNavigation();

    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [blockedReasons, setBlockedReasons] = useState([]); // Armazena todos os impedimentos
    const [showResult, setShowResult] = useState(false); // Exibir o resultado

    const handleAnswer = (answer) => {
        if (answer.type !== "allowed") {
            setBlockedReasons([...blockedReasons, { type: answer.type, reason: answer.reason }]);
        }

        if (currentQuestion < questions.length - 1) {
            setCurrentQuestion(currentQuestion + 1);
        } else {
            setShowResult(true);
        }
    };

    const calculateResult = () => {
        // Filtra os impedimentos temporários e permanentes
        const temporaryBlocks = blockedReasons.filter(block => block.type === 'temporary');
        const permanentBlocks = blockedReasons.filter(block => block.type === 'permanent');

        if (blockedReasons.length > 0) {
            return (
                <View style={styles.resultContainer}>
                    <Text style={styles.resultTitle}>Ops, parece que você não possui condições de doar sangue no momento :(</Text>
                    <Image style={styles.image} source={require('../assets/img/naoApto.png')} />

                    {/* Exibe os impedimentos temporários */}
                    {temporaryBlocks.length > 0 && (
                        <View style={styles.impedimentBlock}>
                            <Text style={styles.blockTitle}>Impedimentos Temporários:</Text>
                            {temporaryBlocks.map((block, index) => (
                                <Text key={index} style={styles.resultTxt}>
                                    {`\u2022 ${block.reason}`}
                                </Text>
                            ))}
                        </View>
                    )}

                    {/* Exibe os impedimentos permanentes */}
                    {permanentBlocks.length > 0 && (
                        <View style={styles.impedimentBlock}>
                            <Text style={styles.blockTitle}>Impedimentos Permanentes:</Text>
                            {permanentBlocks.map((block, index) => (
                                <Text key={index} style={styles.resultTxt}>
                                    {`\u2022 ${block.reason}`}
                                </Text>
                            ))}
                        </View>
                    )}
                </View>
            );
        }
        return (
            <View style={styles.resultContainer}>
                <Text style={styles.resultTitle}>Parabéns, você está apto para doar de sangue! :D</Text>
                <Image style={styles.imageApto} source={require('../assets/img/apto.png')} />
                <TouchableOpacity style={styles.btResult}>
                    <Text style={styles.btResultTxt}>Mostre-me onde doar!</Text>
                </TouchableOpacity>
            </View>
        );
    };


    const result = calculateResult();

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Questionário de Triagem</Text>
                <TouchableOpacity>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <View styles={styles.mainContainer}>
                    <View style={styles.voltarContainer}>
                        <TouchableOpacity onPress={() => navigation.goBack()}>
                            <AntDesign name="arrowleft" size={24} color="#326771" />
                        </TouchableOpacity>
                    </View>
                    <View style={styles.contentContainer}>
                        {showResult ? (  // Se o showResult for true, exibe a tela de resultado
                            <View>
                                {result}
                            </View>
                        ) : (  // Caso contrário, continua exibindo as perguntas
                            <View>
                                <Text style={styles.contagemTxt}> Pergunta {questions[currentQuestion].id}/{questions.length}</Text>
                                <Text style={styles.questionTxt}>{questions[currentQuestion].question}</Text>
                                {questions[currentQuestion].answers.map((answer, index) => (
                                    <TouchableOpacity
                                        key={index}
                                        onPress={() => handleAnswer(answer)}
                                        style={styles.answerBt}
                                    >
                                        <Text style={styles.answerTxt}>{answer.text}</Text>
                                    </TouchableOpacity>
                                ))}
                            </View>
                        )}
                    </View>

                </View>

            </ScrollView>
            <MenuDoador />
        </SafeAreaView>
    )
}

export default Perguntas;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFF',
        justifyContent: 'flex-end',
    },
    scrollContainer: {
        flexGrow: 1,
        paddingBottom: 50,
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
    title: {
        color: '#EEF0EB',
        marginLeft: 25,
        marginTop: 28,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22

    },
    config: {
        marginTop: 28,
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    titleMain: {
        fontFamily: 'DM-Sans',
        fontSize: 32,
    },
    contentContainer: {
        top: 80,
        justifyContent: 'center',
        padding: 27,
    },
    answerBt: {
        backgroundColor: '#DAEEF2',
        height: 53,
        borderRadius: 15,
        width: 249,
        borderWidth: 1,
        borderColor: '#1E6370',
        marginBottom: 24,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    answerTxt: {
        color: '#053A45',
        textAlign: 'center',
        fontFamily: 'DM-Sans',
        fontSize: 16,
    },
    questionTxt: {
        fontFamily: 'DM-Sans',
        fontSize: 24,
        textAlign: 'left',
        marginBottom: 40,
    },
    contagemTxt: {
        textAlign: 'left',
        fontFamily: 'DM-Sans',
        fontSize: 16,
        fontWeight: 'medium'
    },
    resultContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    resultTitle: {
        fontFamily: 'DM-Sans',
        fontSize: 26,
        textAlign: 'center',
        marginBottom: 30,
    },
    image: {
        marginTop: 20,
        width: 300,
        height: 225
    },
    impedimentBlock: {
        flexDirection: 'row',
        width: '100%',
        padding: 10,
        marginTop: 15,
        marginBottom: 2,
        flexWrap: 'wrap',
    },
    blockTitle: {
        fontFamily: 'DM-Sans',
        fontSize: 21,
        textAlign: 'center',
        marginBottom: 10,
        color: '#7A0000',
    },
    resultTxt: {
        fontSize: 16,
        fontFamily: 'DM-Sans',
        marginBottom: 5
    },
    imageApto:{
        height: 300,
        width: 250,
        marginBottom: 70,
        marginTop: 30
    },
    btResult:{
        backgroundColor: '#DAEEF2',
        height: 53,
        borderRadius: 15,
        width: 249,
        borderWidth: 1,
        borderColor: '#1E6370',
        justifyContent: 'center',
        alignItems: 'center'
    },
    btResultTxt:{
        fontFamily: 'DM-Sans',
        color: '#1E6370',
        fontSize: 16
    },
})