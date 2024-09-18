import { Pressable, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { DANGER, GRAY, PRIMARY, WHITE } from '../colors';

enum ButtonTypes {
  PRIMARY = 'PRIMARY',
  DANGER = 'DANGER',
}

type ButtonProps = {
  title: string;
  onPress: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  buttonType?: ButtonTypes;
};

const Button = ({
  title,
  onPress,
  disabled,
  isLoading,
  buttonType = ButtonTypes.PRIMARY,
}: ButtonProps) => {
  const colors = { PRIMARY, DANGER };
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.container,
        { backgroundColor: colors[buttonType].DEFAULT },
        pressed && {
          backgroundColor: colors[buttonType].DARK,
        },
        disabled && {
          backgroundColor: colors[buttonType].LIGHT,
          opacity: 0.6,
        },
      ]}
    >
      {isLoading ? (
        <ActivityIndicator size="small" color={GRAY.DEFAULT} />
      ) : (
        <Text style={styles.title}>{title}</Text>
      )}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: PRIMARY.DEFAULT,
  },
  title: {
    color: WHITE,
    fontSize: 16,
    fontWeight: '700',
    lineHeight: 20,
  },
});

export { ButtonTypes };
export default Button;
