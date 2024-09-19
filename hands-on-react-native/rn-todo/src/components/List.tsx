import ListItem, { TodoType } from './ListItem';
import { FlatList, View, StyleSheet } from 'react-native';
import { GRAY } from '../colors';
import { Dispatch, SetStateAction } from 'react';

type ListProps = {
  data: TodoType[];
  setIsBottom: Dispatch<SetStateAction<boolean>>;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};

const Separator = () => {
  return <View style={styles.separator}></View>;
};

const List = ({ data, setIsBottom, onDelete, onToggle }: ListProps) => {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <ListItem item={item} onDelete={onDelete} onToggle={onToggle} />
      )}
      windowSize={5}
      ItemSeparatorComponent={Separator}
      ListHeaderComponent={View}
      ListHeaderComponentStyle={{ height: 10 }}
      onScroll={({
        nativeEvent: { contentSize, contentOffset, layoutMeasurement },
      }) => {
        const distance =
          contentSize.height - (contentOffset.y + layoutMeasurement.height);
        setIsBottom(!(distance > 20 || contentOffset.y === 0));
      }}
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
