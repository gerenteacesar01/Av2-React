import { StyleSheet, View, ScrollView } from 'react-native';
import { Insert } from './banco/Insert';
import { AllContacts } from './banco/AllContacts';
import { Remove } from './banco/Remove';
import { Update } from './banco/Update';

export default function App() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Insert />
      <AllContacts />
      <Remove />
      <Update />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: '#f8f9fa',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
});
