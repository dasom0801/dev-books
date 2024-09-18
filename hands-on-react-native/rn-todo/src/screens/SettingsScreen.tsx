import { StyleSheet, View } from 'react-native';
import { useUserContext } from '../contexts/UserContext';
import Button, { ButtonTypes } from '../components/Button';

const SettingsScreen = () => {
  const { setUser } = useUserContext();
  return (
    <View style={styles.container}>
      <Button
        title="로그아웃"
        onPress={() => setUser(null)}
        buttonType={ButtonTypes.DANGER}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  button: {
    width: '100%',
  },
});

export default SettingsScreen;
