import React, { useState, useEffect } from 'react';
import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DadosUpdateModal = ({ visible, onClose, id, nameAtual, emailAtual, endAtual, onUpdate }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [end, setEnd] = useState('');

  const [erros, setErros] = useState({ nome: '', email: '', end: '' });

  useEffect(() => {
    setNome(nameAtual);
    setEmail(emailAtual);
    setEnd(endAtual);
    setErros({ nome: '', email: '', end: '' }); // limpa erros ao abrir modal
  }, [nameAtual, emailAtual, endAtual]);

  const validarCampos = () => {
    let valido = true;
    let novosErros = { nome: '', email: '', end: '' };

    if (!nome.trim()) {
      novosErros.nome = 'Nome é obrigatório';
      valido = false;
    }

    if (!email.trim()) {
      novosErros.email = 'Email é obrigatório';
      valido = false;
    } else {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email)) {
        novosErros.email = 'Email inválido';
        valido = false;
      }
    }

    if (!end.trim()) {
      novosErros.end = 'Endereço é obrigatório';
      valido = false;
    }

    setErros(novosErros);
    return valido;
  };

  const atualizar = () => {
    if (!validarCampos()) return;

    let url = `http://192.168.56.1:3000/update/${id}`;
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({ name: nome, email: email, end: end }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then(response => response.json())
      .then(json => {
        console.log(json);
        onUpdate(); // atualiza a lista
        onClose();  // fecha o modal
      });
  };

  return (
    <Modal visible={visible} animationType="slide" transparent={true}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text>Atualizar Nome:</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={setNome}
            placeholder="Nome"
          />
          {erros.nome ? <Text style={styles.erro}>{erros.nome}</Text> : null}

          <Text>Atualizar Email:</Text>
          <TextInput
            style={styles.input}
            value={email}
            onChangeText={setEmail}
            placeholder="Email"
            keyboardType="email-address"
          />
          {erros.email ? <Text style={styles.erro}>{erros.email}</Text> : null}

          <Text>Atualizar Endereço:</Text>
          <TextInput
            style={styles.input}
            value={end}
            onChangeText={setEnd}
            placeholder="Endereço"
          />
          {erros.end ? <Text style={styles.erro}>{erros.end}</Text> : null}

          <Button title="Atualizar" onPress={atualizar} />
          <Button title="Cancelar" color="red" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

export default DadosUpdateModal;

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.3)',
  },
  modalView: {
    backgroundColor: 'white',
    margin: 20,
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 6,
    padding: 8,
    borderRadius: 6,
  },
  erro: {
    color: 'red',
    marginBottom: 10,
    fontSize: 12,
  },
});
