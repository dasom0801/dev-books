import { Pressable, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { GRAY, PRIMARY, WHITE } from '../colors';


type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
}


const Button = ({ title, onPress, disabled, isLoading }: ButtonProps) => {
  return (
    <Pressable onPress={onPress} style={({ pressed }) => [
      styles.container,
      pressed && { backgroundColor: PRIMARY.DARK },
      disabled && {
        backgroundColor: PRIMARY.LIGHT,
        opacity: 0.6
      }
    ]}>
      {isLoading ? <ActivityIndicator size="small" color={GRAY.DEFAULT} /> : <Text style={styles.title}>{title}</Text>}

    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20
  }
});

export default Button;