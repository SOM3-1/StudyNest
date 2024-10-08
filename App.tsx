import { appStore, persistor } from '@store/appStore';
import React, { useEffect } from 'react';
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
import ErrorBoundary from 'react-native-error-boundary';
import { Notifications } from 'src/commom/notifications/Notifications';
import { requestNotificationsPermission } from '@services/notifications/notificationPermissionService';
import { getFirebaseToken } from '@services/notifications/firebaseToken';
import { MenuWrapperComponent } from '@components/menu/MenuWrapper';
import { CustomError } from 'src/commom/CustomError';

function App(): React.JSX.Element {

  const CustomFallback = (props: { error: Error; resetError: Function }) => (
    <CustomError errorMessage={props.error.message} crashError={props.error} />
  );

  useEffect(() => {
    getFirebaseToken();
  }, []);

  return (
    <ErrorBoundary FallbackComponent={CustomFallback}>
      <Provider store={appStore}>
        <PersistGate loading={null} persistor={persistor}>
          <SafeAreaView style={styles.safeArea}>
            <StatusBar />
            <Notifications />
            <MenuWrapperComponent />
          </SafeAreaView>
        </PersistGate>
      </Provider>
    </ErrorBoundary>
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
