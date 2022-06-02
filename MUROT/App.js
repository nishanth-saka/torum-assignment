import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import HomeScreen from './components/HomeScreen';
import { QueryClient, QueryClientProvider, useQuery } from 'react-query';
import { NativeBaseProvider } from 'native-base';
import { useEffect } from 'react/cjs/react.production.min';

const queryClient = new QueryClient();
export default function App() {


  return (
    <QueryClientProvider client={queryClient}>
      <NativeBaseProvider>
        <View style={styles.container}>
          <HomeScreen />
        </View>
    </NativeBaseProvider>
    </QueryClientProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#d01257',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
