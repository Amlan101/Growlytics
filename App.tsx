import 'react-native-gesture-handler';
import React from 'react';
import Tabs from 'navigation/Tabs';
import { PaperProvider } from 'react-native-paper';

export default function App() {
  return (
    <PaperProvider>
      <Tabs />
    </PaperProvider>
  );
}