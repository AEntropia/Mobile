import React, { useState, useEffect } from 'react';

import { Modal, View, Text, TextInput, Button, StyleSheet } from 'react-native';

const DadosUpdateModal = ({ visible, onClose, id, nameAtual, emailAtual, endAtual, onUpdate }) => {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [end, setEnd] = useState('');

    // Atualiza os campos toda vez que o modal abrir com um novo item
    useEffect(() => {
        setNome(nameAtual);
        setEmail(emailAtual);
        setEnd(endAtual);
    }, [nameAtual, emailAtual, endAtual]);


    const atualizar = () => {
        let url = `http://192.168.56.1:3000/update/${id}`;
        fetch(url, {
            method: 'PATCH',
            body: JSON.stringify({
                name: nome,
                email: email,
                end: end,
            }),
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
                    />
                    <Text>Atualizar Email:</Text>
                    <TextInput
                        style={styles.input}
                        value={email}
                        onChangeText={setEmail}
                    />
                    <Text>Atualizar Endereço:</Text>
                    <TextInput
                        style={styles.input}
                        value={end}
                        onChangeText={setEnd}
                    />
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
        marginBottom: 10,
        padding: 8,
    },
});
