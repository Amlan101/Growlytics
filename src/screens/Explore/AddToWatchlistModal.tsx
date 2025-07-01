import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  Modal,
} from 'react-native';

export default function AddToWatchlistModal() {
  const [watchlistName, setWatchlistName] = useState('');

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.title}>Add to Watchlist</Text>

      <TextInput
        style={styles.input}
        placeholder="New Watchlist Name"
        value={watchlistName}
        onChangeText={setWatchlistName}
      />

      <View style={styles.checkboxContainer}>
        <Pressable style={styles.checkbox}><Text>☐</Text></Pressable>
        <Text style={styles.checkboxLabel}>Watchlist 1</Text>
      </View>

      <View style={styles.checkboxContainer}>
        <Pressable style={styles.checkbox}><Text>☐</Text></Pressable>
        <Text style={styles.checkboxLabel}>Watchlist 2</Text>
      </View>

      <Button title="Add" onPress={() => {}} />
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    paddingTop: 50,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  title: { fontSize: 20, fontWeight: 'bold', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    marginBottom: 20,
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  checkbox: {
    marginRight: 10,
  },
  checkboxLabel: {
    fontSize: 16,
  },
});