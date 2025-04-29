import React, { useState } from "react";
import { View } from "react-native";
import { Card, Text, Button } from "react-native-paper";
import DadosDeletado from "./Delete";
import DadosUpdateModal from "./DadosUpdateModal";

const DadosExibido = ({ item, onRefresh }) => {
  const [modalVisible, setModalVisible] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const abrirModal = () => {
    setItemSelecionado(item);
    setModalVisible(true);
  };

  return (
    <View style={{ paddingHorizontal: 10, paddingVertical: 5 }}>
      <Card
        style={{
          backgroundColor: "#f3e5f5", // tom claro de roxo
          borderRadius: 12,
          elevation: 4,
        }}
      >
        <Card.Content>
          <Text variant="labelLarge">ID: {item._id}</Text>
          <Text variant="titleMedium">Nome: {item.name}</Text>
          <Text variant="bodyMedium">Email: {item.email}</Text>
          <Text variant="bodyMedium">Endereço: {item.end}</Text>
        </Card.Content>

        <Card.Actions>
          <View style={{ flexDirection: "row", justifyContent: "space-between", width: "100%" }}>
            <DadosDeletado id={item._id} onDelete={onRefresh} />
            <Button onPress={abrirModal}>Editar</Button>
          </View>
        </Card.Actions>
      </Card>

      {itemSelecionado && (
        <DadosUpdateModal
          visible={modalVisible}
          onClose={() => setModalVisible(false)}
          id={itemSelecionado._id}
          nameAtual={itemSelecionado.name}
          emailAtual={itemSelecionado.email}
          endAtual={itemSelecionado.end}
          onUpdate={onRefresh}
        />
      )}
    </View>
  );
};

export default DadosExibido;
