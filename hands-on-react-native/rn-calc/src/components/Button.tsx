import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';

enum ButtonTypes {
  NUMBER = 'NUMBER',
  OPERATOR = 'OPERATOR',
}

type ButtonProps = {
  title: string;
  onPress: () => void;
  buttonType?: ButtonTypes;
  buttonStyle?: { [key: string]: any };
};

const Colors = {
  NUMBER: ['#71717a', '#3f3f46'],
  OPERATOR: ['#f59e0b', '#b45309'],
};

const Button = ({
  title,
  onPress,
  buttonStyle,
  buttonType = ButtonTypes.NUMBER,
}: ButtonProps) => {
  return (
    <Pressable
      style={({ pressed }) => [
        styles.button,
        {
          backgroundColor: Colors[buttonType][0],
        },
        pressed && {
          backgroundColor: Colors[buttonType][1],
        },
        buttonStyle,
      ]}
      onPressOut={onPress}
    >
      <Text style={styles.title}>{title}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    color: '#ffffff',
    fontSize: 50,
  },
});

export { ButtonTypes };
export default Button;
