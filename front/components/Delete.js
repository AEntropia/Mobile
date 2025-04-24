import React from "react";
import { View } from "react-native";
import { Button } from "react-native-paper";

const DadosDeletado = ({ id, onDelete }) => {

  const Delete = (id) => {
    const url = `http://192.168.56.1:3000/delete/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (onDelete) {
          onDelete(); // Atualiza a lista no componente pai
        }
      });
  };

  return (
    <View style={{ marginRight: 10 }}>
      <Button
        mode="contained"
        buttonColor="#f3e5f5" // tom claro de roxo
        textColor="#6a1b9a"   // roxo escuro
        onPress={() => Delete(id)}
      >
        Excluir
      </Button>
    </View>
  );
};

export default DadosDeletado;
