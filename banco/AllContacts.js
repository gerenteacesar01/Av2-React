import React, { useState } from 'react';
import { Alert, Button, FlatList, Text, View, StyleSheet } from 'react-native';
import { create } from './Create.js';

export function AllContacts() {
  let [flatListItems, setFlatListItems] = useState([]);
  let [flatListItems2, setFlatListItems2] = useState([]);

  const getUltimaSenha = async () => {
    try {
      db = await create();
      let allRows = await db.getAllAsync('SELECT * from senhas ORDER BY id DESC LIMIT 1;');
      setFlatListItems(allRows);
      console.log("[LOG] Data retrieved from tables senhas");
      if (allRows.length == 0) {
        Alert.alert(
          'Alerta',
          'Nenhuma senha salva',
          [
            {
              text: 'Ok'
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  const getAllSenhas = async () => {
    try {
      db = await create();
      let allRows = await db.getAllAsync('select * from senhas;');
      setFlatListItems2(allRows);
      console.log("[LOG] Data retrieved from tables senhas");
      if (allRows.length == 0) {
        Alert.alert(
          'Alerta',
          'Nenhuma senha salva',
          [
            {
              text: 'Ok'
            },
          ],
          { cancelable: false }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  let listItemView = (item) => {
    return (
      <View
        key={item.id}
        style={styles.listItem}>
        <Text style={styles.textheader}>Senha</Text>
        <Text style={styles.textbottom}>id: {item.id}</Text>
        <Text style={styles.textbottom}>senha: {item.senha}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Button title="Última Senha Gerada" onPress={() => getUltimaSenha()} color="#2196F3" />
      <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListItems}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
      <Button title="Todas as Senhas Geradas" onPress={() => getAllSenhas()} color="#2196F3" />
      <View style={{ flex: 1, backgroundColor: 'white', width: '100%' }}>
        <FlatList
          style={{ marginTop: 30 }}
          contentContainerStyle={{ paddingHorizontal: 20 }}
          data={flatListItems2}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => listItemView(item)}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    marginTop: 20,
    padding: 10,
    alignItems: 'center',
  },
  listItem: {
    backgroundColor: '#EEE',
    marginTop: 20,
    padding: 20,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  textheader: {
    color: '#111',
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 5,
  },
  textbottom: {
    color: '#111',
    fontSize: 16,
  },
});
