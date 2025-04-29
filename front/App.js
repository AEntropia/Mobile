import { StatusBar } from 'expo-status-bar';
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, FlatList, ScrollView, SafeAreaView } from 'react-native';
import DadosExibido from './components/Exibe';
import DadosInsert from './components/Insert';
import { Provider as PaperProvider } from 'react-native-paper';




export default function App() {
  const [campos, setDados] = useState([])


  useEffect(() => {

    let url = 'http://192.168.56.1:3000/';

    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        //console.log(json);
        setDados(json);
        //console.log(campos);
      }
      );

  }, []); // <- Esse array vazio faz o useEffect rodar apenas 1x

  // get
  //'http://172.16.4.101:3000/';
  const Exibir = () => {
    let url = 'http://192.168.56.1:3000/';
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setDados(json);

      }
      );
  }

  //post

  const Add = () => {
    let url = 'http://192.168.56.11:3000/add/';
    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        name: 'Marllon',
        email: '@marllon'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  // PATCH
  const Atualizar = (id) => {
    let url = `http://192.168.56.1:3000/update/${id}`;
    fetch(url, {
      method: 'PATCH',
      body: JSON.stringify({
        name: 'Lobo',
        email: '@lobo'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }

  //PUT
  const Atualizar0 = (id) => {
    let url = `http://192.168.56.1:3000/put_update/${id}`;
    fetch(url, {
      method: 'PUT',
      body: JSON.stringify({
        name: 'Lobo',
        email: '@lobo'
      }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    })
      .then((response) => response.json())
      .then((json) => console.log(json));
  }


  const Delete = (id) => {
    let url = `http://192.168.56.1:3000/delete/${id}`;
    console.log(url);
    fetch(url, {
      method: 'DELETE',
    }).then((response) => response.json())
      .then((json) => console.log(json));
  }

  /*
  tipo de erro NOBRIDGE) ERROR  VirtualizedLists should never be nested inside plain ScrollViews with the same orientation because it can break windowing and other functionality 
  - use another VirtualizedList-backed container instead. [Component Stack]
     <View>
      <ScrollView nestedScrollEnabled={true} style={{ width: "100%" }} >
      <View>
      <ScrollView horizontal={true} style={{ width: "100%" }}>
          <FlatList />
      </ScrollView>
      </View>
      </ScrollView>
  </View>
  
  */
  return (
    <PaperProvider>
      <SafeAreaView style={styles.container}>
        <FlatList
          data={campos}
          keyExtractor={(item) => item._id}
          ListHeaderComponent={<DadosInsert onInsert={Exibir} />}
          renderItem={({ item }) => (
            <DadosExibido item={item} onRefresh={Exibir} />
          )}
        />
      </SafeAreaView>
    </PaperProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: 20,
    paddingBottom:20 // Adiciona espaço no topo
  },
});



{/* <FlatList
data={campos}
renderItem={({ item }) => {
  return (
    <View style={{ margin:20,backgroundColor:'#1E90FF', border:'1px solid #000', padding:5}}>
      <Text>ID : {item._id}</Text>
      <Text>NOME : {item.name}</Text>
    </View>

  )
}}

/> */}