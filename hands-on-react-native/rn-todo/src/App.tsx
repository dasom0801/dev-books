import { StatusBar } from 'expo-status-bar';
import { StyleSheet, View } from 'react-native';
import { WHITE } from './colors';
import { UserProvider } from './contexts/UserContext';
import Navigation from './navigations/Navigation';

const App = () => {
  return (
    <UserProvider>
      <View style={styles.container}>
        <StatusBar style="dark" />
        <Navigation />
      </View>
    </UserProvider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: WHITE,
  },
});

export default App;
