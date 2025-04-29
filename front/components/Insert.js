import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import { TextInput, Button, Text } from "react-native-paper";

const DadosInsert = ({ onInsert }) => {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [end, setEnd] = useState('');

  const [erros, setErros] = useState({ nome: '', email: '', end: '' });

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
  

  const Add = () => {
    if (!validarCampos()) return;

    const url = 'http://192.168.56.1:3000/add/';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: nome,
        email: email,
        end: end,
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (onInsert) onInsert();
        setNome('');
        setEmail('');
        setEnd('');
        setErros({ nome: '', email: '', end: '' });
      });
  };

  return (
    <View style={styles.container}>
      <Text variant="titleMedium" style={styles.label}>Nome:</Text>
      <TextInput
        mode="outlined"
        value={nome}
        onChangeText={setNome}
        placeholder="Digite o nome"
        style={styles.input}
        outlineColor="#ce93d8"
        activeOutlineColor="#ab47bc"
        error={!!erros.nome}
      />
      {erros.nome ? <Text style={styles.error}>{erros.nome}</Text> : null}

      <Text variant="titleMedium" style={styles.label}>Email:</Text>
      <TextInput
        mode="outlined"
        value={email}
        onChangeText={setEmail}
        placeholder="Digite o email"
        style={styles.input}
        outlineColor="#ce93d8"
        activeOutlineColor="#ab47bc"
        error={!!erros.email}
      />
      {erros.email ? <Text style={styles.error}>{erros.email}</Text> : null}

      <Text variant="titleMedium" style={styles.label}>Endereço:</Text>
      <TextInput
        mode="outlined"
        value={end}
        onChangeText={setEnd}
        placeholder="Digite o endereço"
        style={styles.input}
        outlineColor="#ce93d8"
        activeOutlineColor="#ab47bc"
        error={!!erros.end}
      />
      {erros.end ? <Text style={styles.error}>{erros.end}</Text> : null}

      <Button
        mode="contained"
        buttonColor="#ce93d8"
        textColor="#4a148c"
        style={styles.button}
        onPress={Add}
      >
        Cadastrar
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#f3e5f5",
    margin: 20,
    padding: 15,
    borderRadius: 10,
  },
  input: {
    marginBottom: 4,
    backgroundColor: "#fff",
  },
  label: {
    marginBottom: 4,
    color: "#6a1b9a",
  },
  button: {
    marginTop: 16,
    borderRadius: 20,
    elevation: 0,
  },
  error: {
    color: 'red',
    fontSize: 12,
    marginBottom: 8,
    marginLeft: 4,
  },
});

export default DadosInsert;
