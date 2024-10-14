import { Text, SafeAreaView, View, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import { useNavigation } from '@react-navigation/native'
import { FontAwesome6 } from '@expo/vector-icons';

import MenuDoador from '../../components/menuDoador'
import InfoCardContent from './InfoCardContent';

const InfoMain = () => {
    const navigation = useNavigation();

    const informacoes = [
        {
            id: 1,
            title: 'Como descobrir qual é o meu tipo sanguíneo?',
            imagem:  require('../../assets/img/tipoSanguineo.png'),
            descricao: 'Para descobrir qual é o seu tipo sanguíneo, é necessário fazer um exame titulado como: "tipagem sanguínea", que também é realizado em récem-nascidos, então caso você possua sua caderneta de saúde ou o sumário de alta após o seu nascimento, a resposta que você procura estará lá! \nMas, caso não consiga achar ou realizar o exame, não se preocupe! Antes da doação você será encaminhado para a triagem que irá realizar uma breve avaliação para determinar qual é a sua tipagem sanguínea. Vale ressaltar que, mesmo você já sabendo seu tipo sanguíneo, o exame ainda será realizado, visto que, faz parte do procedimento clínico.',
            referencia: 'CEDUSP, Blog da. Os 4 tipos sanguíneos principais: Conheça o seu. Disponível em: https://cedusp.com.br/os-quatro-tipos-sanguineos-principais/. Acesso em: 29 fev. 2024. '
        },
        {
            id: 2,
            title: 'Quais são os benefícios de ser um doador?',
            imagem:  require('../../assets/img/beneficios.png'),
            descricao: 'A doação de sangue apesar de ser voluntária ela trás consigo alguns beneficíos aos doadores, tais como: \n -> O doador(a) tem o direito, garantido por lei, de folga do trabalho no dia da doação de sangue; \n -> Dispõe isenção de taxas de inscrição em concursos públicos; \n -> Garante ao doador(a) meia-entrada em cinemas, teatros e demais eventos.',
            referencia: 'JUSBRASIL. Quais são os Direito de quem doa sangue no Brasil?. [S. l.], 1 nov. 2023. Disponível em: https://www.jusbrasil.com.br/artigos/quais-sao-os-direito-de-quem-doa-sangue-no-brasil/2022026887#:~:text=Segundo%20a%20Lei%20nº%201.075,devidamente%20comprovada%20a%20sua%20doação. Acesso em: 24 fev. 2024.  '
        },
        {
            id: 3,
            title: 'Qual é a diferença entre doação de reposição e voluntária?',
            imagem: require('../../assets/img/diferença.png'),
            descricao: 'A pergunta que não quer calar... Há diferenças entre as doações voluntárias e de reposição? Sim! Há diferenças sim! Porém, não é algo tão complexo assim, é mais fácil do que você imagina. Para ficar melhor vamos utilizar alguns exemplos. \n Doação voluntária: como o próprio nome já diz é quando você doa sangue e está disposto a ajudar milhares de pessoas com o mesmo tipo sangúineo que o seu, sem nem saber quem é a pessoa que você irá amparar. \n Doação de reposição: Para entender melhor, vamos imaginar a seguinte situação: Seu tio sofreu um grave acidente de carro e precisa de uma tranfusão de sangue, mas,o hospital que ele está internado não possui bolsas de sangue com o seu tipo sanguíneo, então você se oferece para doar. Isto é o que chamamos de doação de reposição, que ocorre quando alguém próximo de você - amigos ou familiares - estão precisando de uma doação de sangue e você se oferece para ajudar.',
            referencia: 'BRASIL, Andreia Verdélio Agência. Doação de sangue: 1,8% da população brasileira doa sangue; meta da OMS é 3%: campanha do ministério da saúde quer sensibilizar novos voluntários. Campanha do Ministério da Saúde quer sensibilizar novos voluntários. 2017. Disponível em: https://agenciabrasil.ebc.com.br/geral/noticia/2017-06/doacao-de-sangue-18-da-populacao-brasileira-doa-sangue-meta-da-oms-e-3. Acesso em: 29 fev. 2024.'
        },
        {
            id: 4,
            title: 'Impedimentos temporários para a doação de sangue',
            imagem: require('../../assets/img/impedimentosTemporarios.png'),
            descricao: 'Os impedimentos temporários, são aqueles que restrigem a doação por um curto período de tempo, podendo variar entre 2 - 4 semanas a 3 - 6 meses. Esses impedimentos são essenciais para manter tanto você (doador) quanto aquele que receberá a doação seguros. Para mais informações, consulte nosso questionário de pré-triagem para descobrir se você tem algum impedimento ou não, vale resaltar que, nosso questionário é só para você ter uma base se está ou não em boas condições, caso tenha dúvidas consulte seu médico ou a equipe de trigem do hemocentro mais próximo de você. \n Dentre os impedimentos temporários, podemos citar: \n -> Resfirado: aguardar 7 dias; \n -> Gravidez; \n -> Parto normal: 90 dias, cesariana: 180 dias; \n -> Vacina contra gripe: 48 horas; \n -> Vacina contra COVID-19: 7 dias; \n -> Vacina contra dengue: 4 semanas. \n Descubra se você está apto para doar sangue fazendo o Questionário de Triagem do Hemoglobina!',
            referencia: 'GOV SP. Requisitos básicos para doação de sangue. SÃO PAULO, [s.d]. Disponível em: https://www.prosangue.sp.gov.br/artigos/requisitos_basicos_para_doacao.html. Acesso em: 24 fev. 2024.'
        }
    ]

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <Text style={styles.title}> Informações</Text>
                <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
                    <FontAwesome6 name="gear" size={24} color="#EEF0EB" style={styles.config} />
                </TouchableOpacity>
            </View>
            <ScrollView contentContainerStyle={{ paddingVertical: 20 }}>
                <View style={styles.mainContainer}>
                    <Text style={styles.titleMain}> Principais informações</Text>
                    <View style={styles.cardWrap}>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image source={require('../../assets/img/chatbotIcon.png')} style={styles.cardImage} />
                                <Text style={styles.titleCard}>HemoAssistent IA: tire suas dúvidas</Text>
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.descriptionTxtCard}>Uma IA treinada pela equipe do Hemoglobina responderá as dúvidas mais frequentes.</Text>
                                <TouchableOpacity style={styles.cardBt}>
                                    <Text style={styles.cardTxtBt}> Experimentar </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={styles.card}>
                            <View style={styles.cardHeader}>
                                <Image source={require('../../assets/img/questionarioIcon.png')} style={styles.cardImage} />
                                <Text style={styles.titleCard}>Questionário de triagem</Text>
                            </View>
                            <View style={styles.cardContent}>
                                <Text style={styles.descriptionTxtCard}>Requisitos para doar sangue: verifique se você está apto a doação.</Text>
                                <TouchableOpacity style={styles.cardBt} onPress={() => navigation.navigate('QuestionarioTriagem')}>
                                    <Text style={styles.cardTxtBt}> Realizar teste </Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                    <View style={{ marginTop: 20 }}>
                        <Text style={styles.titleMain}>Informações adicionais</Text>
                        <FlatList
                            data={informacoes}
                            renderItem={({ item }) => (
                                <TouchableOpacity style={styles.Infocard} onPress={() => navigation.navigate('InfoCardContent', { informacoes: item })}>
                                    <View style={styles.cardHeader}>
                                        <Text style={styles.titleInfoCard}>{item.title}</Text>
                                    </View>
                                    <View style={styles.InfoCardContent}>
                                        <Text style={styles.descriptionInfoCard} numberOfLines={2}>
                                            {item.descricao}
                                        </Text>
                                        <Text style={styles.infoBt}>Continuar lendo...</Text>
                                    </View>
                                </TouchableOpacity>
                            )}
                            keyExtractor={(item) => item.id.toString()}
                        />

                    </View>
                </View>

            </ScrollView>

            <MenuDoador />
        </View>
    )
}

export default InfoMain;

//Cores do App
//#AF2B2B Vermelho principal
//#EEF0EB branco do funco e dos textos
//#000000 preto
//#7A0000 vinho
//#326771 azul 

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FDFEFF',
    },
    headerContainer: {
        backgroundColor: '#AF2B2B',
        height: '10%',
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
        marginTop: 15,
        fontFamily: 'DM-Sans',
        letterSpacing: 1.5,
        fontSize: 22
    },
    config: {
        marginTop: 15,
        marginRight: 20,
    },
    mainContainer: {
        padding: 32,
    },
    titleMain: {
        fontFamily: 'Poppins-SemiBold',
        fontSize: 24,
        textAlign: 'center',
        color: '#053a45',
        marginBottom: 26,
    },
    cardWrap: {
        gap: 17
    },
    card: {
        backgroundColor: '#DAEEF2',
        borderWidth: 1,
        borderColor: '#053a45',
        borderRadius: 10,
        padding: 23,
        height: 210
    },
    cardHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        width: '85%',
        marginBottom: 10
    },
    titleCard: {
        fontFamily: 'DM-Sans',
        fontSize: 16,
        color: '#053a45',
        fontWeight: 'bold',
    },
    cardContent: {
        gap: 24,
        justifyContent: 'center',
        alignItems: 'center'
    },
    descriptionTxtCard: {
        fontFamily: 'DM-Sans',
        fontSize: 16,
        textAlign: 'justify'
    },
    cardBt: {
        backgroundColor: '#1E6370',
        width: 205,
        height: 31,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 'auto'
    },
    cardTxtBt: {
        color: '#fff',
    },
    Infocard: {
        backgroundColor: '#DAEEF2',
        borderWidth: 1,
        borderColor: '#053a45',
        borderRadius: 10,
        padding: 23,
        height: 190,
        marginBottom: 24
    },
    titleInfoCard: {
        fontFamily: 'DM-Sans',
        fontSize: 17,
        color: '#053a45',
        fontWeight: 'bold',
    },
    InfoCardContent: {
        gap: 7,
        justifyContent: 'center',
    },
    descriptionInfoCard: {
        fontFamily: 'DM-Sans',
        fontSize: 15,
        textAlign: 'justify',
    },
    infoBt: {
        color: '#4A1802',
        fontSize: 14,
        fontFamily: 'DM-Sans',
    }

})


