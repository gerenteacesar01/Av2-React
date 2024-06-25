import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Update() {
  const [id, setId] = useState('');
  const [senha, setSenha] = useState('');

  const update = async () => {
    try {
      db = await create();
      let result = await db.runAsync(`UPDATE senhas SET senha = ? WHERE id = ?;`, [senha, id]);
      if (result.changes > 0) {
        Alert.alert(
          'Sucesso',
          `Senha alterada com sucesso e salva no banco de dados: ${senha}`,
          [
            {
              text: 'Ok'
            },
          ],
          { cancelable: false }
        );
      } else alert('Erro atualizando senha');
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
      <TextInput
        placeholder="Entre com a nova senha"
        onChangeText={
          senha => setSenha(senha)
        }
        style={styles.input}
      />
      <Button title="Atualizar Senha" onPress={() => update()} color="#FF9800" />
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
