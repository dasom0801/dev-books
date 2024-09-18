import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import { Pressable } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';

const HeaderRightButton = ({ tintColor }: HeaderBackButtonProps) => {
  const { navigate } = useNavigation();
  return (
    <Pressable onPress={() => navigate('Settings' as never)} hitSlop={10}>
      <MaterialCommunityIcons name="cog" size={20} color={tintColor} />
    </Pressable>
  );
};

export default HeaderRightButton;
