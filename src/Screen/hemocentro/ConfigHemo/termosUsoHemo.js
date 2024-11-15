import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, Image, ScrollView, Alert } from 'react-native';
import MenuHemo from '../../../../components/menu/menuHemocentro';
import AntDesign from '@expo/vector-icons/AntDesign';
import Ionicons from '@expo/vector-icons/Ionicons';


const TermosDeUsoHemo = ({ navigation }) => {

  const scrollViewRef = useRef(null);
  // const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <Text style={styles.title}> Configurações </Text>
      </View>

      <View style={styles.mainContainer}>
        <View style={styles.voltarContainer}>
          <TouchableOpacity onPress={() => navigation.navigate('ConfiguracoesHemo')}>
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
          <Text style={styles.textoFale}>Termos de uso e condições</Text>
          <Text style={styles.textSubTop}>	1.1 Aceitação dos termos </Text>
          <Text style={styles.textoPoliticas}>
            O usuário ao baixar, instalar, acessar e utilizar o software Hemoglobina, estará concordando integralmente em cumprir os seguintes Termos de Uso. Caso não concorde com estes termos, recomenda-se a não utilização do aplicativo. </Text>

          <Text style={styles.textSubTop}>1.2 Licença de uso </Text>
          <Text style={styles.textoPoliticas}>
            A licença de uso se refere à autorização e às ações de uso do usuário, que são definidas pelos desenvolvedores do sistema. </Text>

          <Text style={styles.textSubTop}>1.2.1 Restrição de uso </Text>
          <Text style={styles.textoPoliticas}>
            Ao utilizar nossa aplicação você concorda em não (a) copiar, modificar ou desenvolver obras semelhantes ou derivadas do software; (b) realizar engenharia reversa, descompilar ou extrair o código-fonte do aplicativo; (c) alugar, transferir, sublicenciar ou distribuir a aplicação para terceiros. </Text>

          <Text style={styles.textSubTop}>1.2.2 Concessão de licença  </Text>
          <Text style={styles.textoPoliticas}>
            Ao se cadastrar no aplicativo você está sujeito ao comprimento destes termos, a Hemoglobina LTDA lhe concede a licença limitada, não exclusiva, intransferível e revogável para utilizar o aplicativo Hemoglobina apenas para fins pessoais e não comerciais. </Text>

          <Text style={styles.textSubTop}>1.3 Probabilidade Intelectual </Text>
          <Text style={styles.textoPoliticas}>
            Estes Termos de Uso não lhe concedem qualquer direito de propriedade intelectual sobre o software. Todos os direitos, títulos e interesses relacionados à aplicação, incluindo, sem limitação, todos os direitos autorais, patentes, segredos comerciais, marcas registradas e demais propriedades intelectuais são exclusivamente destinados à empresa Hemoglobina LTDA.   </Text>

          <Text style={styles.textSubTop}>1.4 Coleta de dados e privacidade </Text>
          <Text style={styles.textoPoliticas}>
            A privacidade dos dados coletados segue a norma estabelecida pela LGPD (Lei Geral de Proteção de Dados), que visa regular, armazenar e processar os dados pessoais por parte da empresa, assegurando a segurança do usuário.  </Text>

          <Text style={styles.textSubTop}>1.4.1 Coleta de dados  </Text>
          <Text style={styles.textoPoliticas}>
            Ao utilizar o aplicativo Hemoglobina, você permite que a empresa Hemoglobina LTDA colete informações sobre a aplicação, incluindo dados técnicos e informações associadas ao desempenho, visando melhorar a funcionalidade do aplicativo.  </Text>

          <Text style={styles.textSubTop}>1.4.2 Política de privacidade </Text>
          <Text style={styles.textoPoliticas}>
            A utilização do aplicativo está sujeita à Política de Privacidade da Hemoglobina LTDA, que poderá ser acessada nas configurações do usuário e no cadastro. </Text>

          <Text style={styles.textSubTop}>1.5 Limitação de responsabilidade  </Text>
          <Text style={styles.textoPoliticas}>
            Em nenhuma circunstância a Hemoglobina LTDA se responsabilizará por qualquer dano direto, indireto, acidental, especial, consequências ou punitivos decorrentes do uso ou da incapacidade da utilização do aplicativo, mesmo que a Hemoglobina LTDA seja contatada sobre tais danos.  </Text>

          <Text style={styles.textSubTop}>1.6 Garantia limitada  </Text>
          <Text style={styles.textoPoliticas}>
            A aplicação será fornecida do modo que se encontra, sem a garantia de qualquer tipo, expressas ou implícitas, incluindo, mas não se limitando a, garantias de comercialização, adequação específica ou não violação.  </Text>

          <Text style={styles.textSubTop}>1.7 Rescisão do software</Text>
          <Text style={styles.textoPoliticas}>
            Os Termos de Uso são efetivos até serem revogados. A Hemoglobina LTDA tem o direito de rescindir estes Termos de Uso a qualquer momento, sem aviso prévio. Logo, caso você viole alguma das disposições aqui contidas, após a rescisão, você deverá suspender o uso do software e destruir todas as cópias do aplicativo em sua posse.  </Text>

          <Text style={styles.textSubTopSe}>1.8 Disposições gerais  </Text>
          <Text style={styles.textSubTop}>1.8.1 Alteração dos termos   </Text>
          <Text style={styles.textoPoliticas}>
            A empresa Hemoglobina LTDA reserva o direito de modificar os Termos de Uso a qualquer momento. As modificações a serem realizadas serão efetivas quando publicadas no site Hemoglobina ou notificadas através do aplicativo.  </Text>

          <Text style={styles.textSubTop}>1.8.2 Acordo Integral </Text>
          <Text style={styles.textoPoliticas}>
            Esses Termos de Uso supracitados constituem o acordo integral entre o usuário e a empresa Hemoglobina LTDA em relação ao uso da aplicação e substituem-se todos os entendimentos ou acordos anteriores, escritos ou orais, relativos ao assunto.  </Text>

          <Text style={styles.textSubTop}>1.9 Contato </Text>
          <Text style={styles.textoPoliticas}>
            Caso tenha dúvidas sobre os Termos de Uso da empresa, entre em contato com a Hemoglobina LTDA através do e-mail: hemoglobinaltda@gmail.com ou acesse as configurações do aplicativo no atalho “Fale conosco”. </Text>

        </View>

      </ScrollView>
      <MenuHemo />
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
    letterSpacing: 1.5
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
  // Parte dos Termos
  textSubTop: {
    fontSize: 19,
    marginTop: 15,
    marginBottom: 15,
    fontWeight: '700',
  },
  textSubTopSe: {
    fontSize: 19,
    marginTop: 15,
    fontWeight: '700',
  },
});

export default TermosDeUsoHemo;
