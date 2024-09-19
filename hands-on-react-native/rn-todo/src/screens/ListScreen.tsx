import { View } from 'react-native';
import { TodoType } from '../components/ListItem';
import EmptyList from '../components/EmptyList';
import List from '../components/List';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

const ListScreen = () => {
  const { bottom } = useSafeAreaInsets();
  const todos: TodoType[] = [
    { id: 1, task: 'React Native', isDone: false },
    { id: 2, task: 'FlatList', isDone: false },
    { id: 3, task: 'React Navigation', isDone: true },
    { id: 4, task: 'TODO App', isDone: false },
    { id: 5, task: 'React.memo', isDone: true },
  ];

  return (
    <View style={{ flex: 1, paddingBottom: bottom }}>
      {todos.length ? <List data={todos} /> : <EmptyList />}
    </View>
  );
};

export default ListScreen;
