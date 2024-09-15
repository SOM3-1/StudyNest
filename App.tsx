import { appStore, persistor } from '@store/appStore';
import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

function App(): React.JSX.Element {
  return (
    <Provider store={appStore}>
      <PersistGate loading={null} persistor={persistor}>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar />
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.centeredView}>
              <Text style={{ color: 'black', fontSize: 20 }}>Demo App</Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
  },
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default App;
