import ListItem, { TodoType } from './ListItem';
import { FlatList, View, StyleSheet } from 'react-native';
import { GRAY } from '../colors';

type ListProps = {
  data: TodoType[];
};

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const List = ({ data }: ListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => <ListItem item={item} />}
      windowSize={5}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
    />
  );
};

const styles = StyleSheet.create({
  separator: {
    height: 1,
    backgroundColor: GRAY.LIGHT,
    marginVertical: 10,
    marginHorizontal: 10,
  },
});

export default List;
