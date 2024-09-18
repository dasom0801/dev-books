import { StyleSheet, Text, View } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';

const ListScreen = ({}: NativeStackScreenProps<ParamListBase, 'List'>) => {
  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 30 }}>List Screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ListScreen;
