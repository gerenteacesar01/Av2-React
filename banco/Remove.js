import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Remove() {
  const [id, setId] = useState('');

  const remove = async () => {
    try {
      db = await create();
      let result = await db.runAsync(`DELETE FROM senhas where id = ?;`, id);
      if (result.changes > 0) {
        Alert.alert(
          'Success',
          'Senha removida',
          [
            {
              text: 'Ok'
            },
          ],
          { cancelable: false }
        );
      } else alert('Error ao remover senha');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Entre com o id da senha"
        onChangeText={
          id => setId(id)
        }
        style={styles.input}
      />
      <Button title="Delete" onPress={() => remove()} color="#F44336" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    marginTop: 20,
    marginBottom: 20,
    width: "80%",
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 40,
    width: '100%',
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
});
