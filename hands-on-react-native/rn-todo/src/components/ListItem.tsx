import { memo } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { BLACK, DANGER, GRAY, PRIMARY } from '../colors';

type TodoType = {
  id: string;
  task: string;
  isDone: boolean;
};

type ListItemProps = {
  item: TodoType;
  onDelete: (id: string) => void;
  onToggle: (id: string) => void;
};
const ListItem = memo(({ item, onDelete, onToggle }: ListItemProps) => {
  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => {
          onToggle(item.id);
        }}
        hitSlop={10}
      >
        <MaterialCommunityIcons
          name={item.isDone ? 'checkbox-marked' : 'checkbox-blank-outline'}
          color={item.isDone ? PRIMARY.DEFAULT : BLACK}
          size={20}
        />
      </Pressable>
      <View style={styles.task}>
        <Text style={item.isDone && { color: GRAY.DEFAULT }}>{item.task}</Text>
      </View>
      <Pressable
        onPress={() => {
          onDelete(item.id);
        }}
        hitSlop={10}
      >
        <MaterialCommunityIcons
          name="trash-can"
          size={20}
          color={DANGER.DEFAULT}
        />
      </Pressable>
    </View>
  );
});

ListItem.displayName = 'ListItem';

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 10,
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
  },
  task: {
    flex: 1,
    marginHorizontal: 10,
  },
});

export { TodoType };
export default ListItem;
