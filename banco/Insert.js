import * as SQLite from 'expo-sqlite';
import { create } from './Create.js';
import { Alert, View, TextInput, Button, StyleSheet } from 'react-native';
import { useState } from 'react';

export function Insert() {
  const [senha, setSenha] = useState('');

  function gerarSenhaAleatoria() {
    const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let senha = '';
    for (let i = 0; i < 8; i++) {
      const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
      senha += caracteres.charAt(indiceAleatorio);
    }
    setSenha(senha);
    return senha;
  }

  const insert = async () => {
    try {
      db = await create();
      let senha = gerarSenhaAleatoria();
      let result = await db.runAsync(`INSERT INTO senhas (senha) VALUES (?);`, senha);
      if (result.changes > 0) {
        Alert.alert(
          'Sucesso',
          `Senha gerada com sucesso e salva no banco de dados: ${senha}`,
          [
            {
              text: 'Ok'
            },
          ],
          { cancelable: false }
        );
      } else alert('Erro registando senhas');
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <Button title="Gerar Nova Senha" onPress={() => insert()} color="#4CAF50" />
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
});
