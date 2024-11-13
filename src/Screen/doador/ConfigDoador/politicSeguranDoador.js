import React, { useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, FlatList } from 'react-native';

import MenuDoador from '../../../../components/menu/menuDoador';
import AntDesign from '@expo/vector-icons/AntDesign';

const topicoQuatro = [
  {
    id: '1',
    title: 'Confidencialidade: Através da confidencialidade buscamos manter todos os dados sensíveis dos usuários em completo sigilo, evitando assim que haja o roubo dos dados.',

  },
  {
    id: '2',
    title: 'Integridade: Trazemos a Integridade como maneira de prever que pessoas não autorizadas acessem nosso sistema e modifiquem as informações contidas.',

  },
  {
    id: '3',
    title: 'Disponibilidade: Em nossa estrutura, a disponibilidade do sistema entra como fundamento na garantia de que os dados estarão disponíveis para pessoas que estão seguindo as regras de confidencialidade. ',

  },
  {
    id: '4',
    title: 'Autenticidade: Através da autenticidade ocorrerá a validação das informações, garantindo que sejam verdadeiras, seguras e confiáveis. No aplicativo Hemoglobina, algumas ferramentas usufruem da autenticidade, tais como, criar campanhas e divulgar pesquisas na aba de informações. ',
    
  },
  {
    id: '5',
    title: 'Irretratabilidade: A irretratabilidade busca estabelecer normas no qual os usuários não neguem a autoria de suas informações, garantindo assim a sua autenticidade. ',
  },

];

const topicoCinco = [
  {
    id: '1',
    title: 'Informação pública: As informações classificadas como públicas coincidem com conteúdos que podem ser divulgados a todos, independente da sua classificação dentro da aplicação. Em nossa plataforma, essas informações se encaixam no conteúdo das campanhas, onde todos possuem o acesso para ler e publicar. ',

  },
  {
    id: '2',
    title: 'Informação confidencial: As informações confidenciais são dados no qual sua exposição fora do ambiente da organização pode acarretar em perdas de diversas formas. Na aplicação do Hemoglobina, essas informações entram no sigilo dos dados dos usuários, como CPF, CEP, CNPJ, entre outros.',

  },
  {
    id: '3',
    title: 'Informação restrita: As informações classificadas como restritas englobam informações que precisam ser protegidas tanto internamente (administradores), como externamente. No sistema do Hemoglobina, dados sensíveis serão mantidos em sigilo, até mesmo da própria equipe administradora. ',

  },

];

const ProliticasDeSegurancaDoador = ({ navigation }) => {

  const [topicoQuatroSS, setTopicoQuatro] = useState(topicoQuatro);
  const [topicoCincoSS, setTopicoCinco] = useState(topicoCinco);
  const scrollViewRef = useRef(null);
  // const navigation = useNavigation();
  
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configuraçãoes </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesDoador')}>
            <AntDesign name="arrowleft" size={24} color="#7A0000" />
          </TouchableOpacity>
        </View>
      </View>

      <ScrollView
          ref={scrollViewRef}
          style={styles.scrollView}
          showsVerticalScrollIndicator={true}
        >

        <View style={styles.mainSection}>
          <Text style={styles.textoFale}>Políticas de Segurança</Text>
          <Text style={styles.textSubTop}>1.1 Introdução </Text>
          <Text style={styles.textoPoliticas}>
	A equipe do Hemoglobina LTDA procura desenvolver um aplicativo que possa manter os pilares cruciais para a segurança das informações dos nossos usuários, sendo assim, nosso sistema visa preservar a sua confidencialidade, garantindo que somente pessoas autorizadas tenham acesso aos dados sensíveis dos usuários. Ademais, nosso software trabalha com a integridade das informações de forma exata e completa, trazendo a precisão e consistência dos dados ao longo de seu ciclo de vida, ou seja, garantindo que mecanismos de segurança venham prevenir que pessoas não autorizadas alterem os dados, mesmo que de forma acidental. Além disso, buscamos manter a disponibilidade do nosso sistema, assegurando que os dados estejam sempre acessíveis aos usuários autorizados em caso de emergências ou até mesmo normais. Desta forma, a equipe Hemoglobina LTDA visa trazer todos esses pilares implementados no nosso sistema, através de ferramentas e mecanismos essenciais para tais ações. </Text>
      <Text style={styles.textSubTop}>1.2 Objetivo  </Text>
        <Text style={styles.textoPoliticas}>

        O objetivo da nossa política de segurança é garantir que todas as regras definidas pela equipe Hemoglobina LTDA estejam precisamente claras aos usuários da plataforma, garantindo que as informações e os dados mantidos no sistema sejam protegidos contra ataques. Além disso, minimizar os possíveis riscos e buscar viabilizar o cumprimento das leis e das regulamentações do sistema se torna uma prioridade da aplicação.
        </Text>

      <Text style={styles.textSubTop}>1.3 Escopo  </Text>
        <Text style={styles.textoPoliticas}>
Essa política de segurança se enquadra a todos os usuários cadastrados como doadores de sangue, instituições (Hemocentros), parceiros e administradores do sistema, que buscam usufruir da nossa plataforma e utilizar as informações e ferramentas do aplicativo Hemoglobina.
        </Text>
        
      <Text style={styles.textSubTop}>1.4 Diretrizes gerais   </Text>
        <Text style={styles.textoPoliticas}>
  
    A equipe do Hemoglobina traz diversos pilares que são essenciais para a segurança das informações dos nossos usuários, englobando assim as diretrizes gerais da nossa aplicação, sendo elas:

        </Text>

        <FlatList
            data={topicoQuatroSS}
            
            style={{ marginTop: 15, }}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

            return (
              <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <Text style={styles.textoPoliticasLista}>{`\u2022 ${item.title}`}</Text>
              </View>
            );
          }}
            />
      
      <Text style={styles.textSubTop}>1.5 Classificação da Informação   </Text>
      <FlatList
            data={topicoCincoSS}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => {

            return (
              <View style={{ marginBottom: 10, flexDirection: 'row' }}>
                <Text style={styles.textoPoliticasLista}>{`\u2022 ${item.title}`}</Text>
              </View>
            );
          }}
            />
      
      <Text style={styles.textSubTop}>1.6 Controle de acesso   </Text>
        <Text style={styles.textoPoliticas}>

	        Para gerenciar o controle de acesso ao nosso sistema, faremos um processo para autenticar aquele usuário, sendo através de senhas e um e-mail cadastrado, garantindo assim que não haja pessoas não autorizadas acessando a plataforma.
        </Text>
      
      <Text style={styles.textSubTop}>1.7 Segurança física   </Text>
        <Text style={styles.textoPoliticas}>

	      Visando garantir a segurança física do Hemoglobina, alguns mecanismos de segurança são utilizados, tais como a possibilidade de que apenas pessoas autorizadas possam acessar a área onde as informações sensíveis estão localizadas, como por exemplo no banco de dados, apenas pessoas com o devido acesso ao projeto do firebase terão acesso a esses dados. Além do mais, todos os equipamentos utilizados para a construção do projeto estão sob os devidos cuidados e segurança, utilizando do processo de controle de acesso por meio de senhas para o acesso parcial. 
        </Text>

      <Text style={styles.textSubTop}>1.8 Uso de dispositivos e redes </Text>
        <Text style={styles.textoPoliticas}>

	A equipe do Hemoglobina permite o uso de equipamentos pessoais apenas as pessoas devidamente autorizadas (administradores do sistema), caso contrário o uso de dispositivos para acessar informações da empresa são limitados e restritos. Ademais, com relação às conexões feitas ao sistema, sejam elas públicas ou de rede privada, não foram necessárias, o que se tornou uma garantia de segurança para o aplicativo.
        </Text>

      <Text style={styles.textSubTop}>1.9 Conformidade e autoria   </Text>
        <Text style={styles.textoPoliticas}>

	A empresa Hemoglobina LTDA se assegura de que todas as funcionalidades e funções do sistema estão de acordo com as leis pré definidas e com a regulamentação da nossa política de segurança também definida. 
        </Text>

      <Text style={styles.textSubTop}>1.10 Revisão política   </Text>
        <Text style={styles.textoPoliticas}>

	A equipe do Hemoglobina assegura que a política de segurança do software será revisada e atualizada anualmente, ou sempre que for necessário. Garantindo melhor eficácia e conformidade com as mudanças de ameaças cibernéticas ou nas regulamentações tecnológicas.
        </Text>

        </View>
        
      </ScrollView>
    <MenuDoador />
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDFEFF',
    justifyContent: 'flex-end',
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
    left: 16,
  },
  title: {
    color: '#EEF0EB',
    marginLeft: 25,
    marginTop: 7,
    fontFamily: 'DM-Sans',
    letterSpacing: 1.5,
    fontSize: 16,
  },
  mainContainer: {
    padding: 32,
    top: 20,
    flex: 1,
  },
  mainSection: {
    padding: 32,
    marginTop: '-8%'
  },
  textoFale: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: '700',
    marginBottom: 20,
  },
  textoPoliticas: {
    textAlign: 'justify',
    fontSize: 15,
  },

  // Parte das póliticas
  textSubTop: {
    fontSize: 19,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '700',
  },
  textoPoliticasLista: {
    fontSize: 15,
    marginLeft: 20,
    textAlign: 'justify',
  },
});

export default ProliticasDeSegurancaDoador;
