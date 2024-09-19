import {
  Animated,
  Keyboard,
  Platform,
  Pressable,
  StyleSheet,
  TextInput,
  useWindowDimensions,
} from 'react-native';
import { BLACK, PRIMARY, WHITE } from '../colors';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useRef, useState } from 'react';

const RIGHT = 10;
const BOTTOM = 30;
const BUTTON_WIDTH = 60;

type InputFABProps = {
  onInsert: (task: string) => void;
  isBottom: boolean;
};

const InputFAB = ({ onInsert, isBottom }: InputFABProps) => {
  const [text, setText] = useState<string>('');
  const [isOpened, setIsOpened] = useState<boolean>(false);
  const inputRef = useRef<TextInput>(null);
  const windowWidth = useWindowDimensions().width;
  const [keyboardHeight, setKeyboardHeight] = useState<number>(BOTTOM);
  const inputWidth = useRef(new Animated.Value(BUTTON_WIDTH)).current;
  const buttonRotation = useRef(new Animated.Value(0)).current;
  const buttonRight = useRef(new Animated.Value(RIGHT)).current;

  useEffect(() => {
    if (Platform.OS === 'ios') {
      const show = Keyboard.addListener('keyboardWillShow', (e) => {
        setKeyboardHeight(e.endCoordinates.height + BOTTOM);
      });
      const hide = Keyboard.addListener('keyboardWillHide', () => {
        setKeyboardHeight(BOTTOM);
      });
      return () => {
        show.remove();
        hide.remove();
      };
    }
  }, []);

  useEffect(() => {
    Animated.timing(buttonRight, {
      toValue: isBottom ? RIGHT - BUTTON_WIDTH : RIGHT,
      useNativeDriver: false,
    }).start();
  }, [buttonRight, isBottom]);

  const open = () => {
    setIsOpened(true);
    Animated.timing(inputWidth, {
      toValue: windowWidth - 20,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current?.focus();
    });

    Animated.spring(buttonRotation, {
      toValue: 1,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const close = () => {
    if (!isOpened) return;
    setText('');
    setIsOpened(false);
    Animated.timing(inputWidth, {
      toValue: BUTTON_WIDTH,
      useNativeDriver: false,
      duration: 300,
    }).start(() => {
      inputRef.current?.blur();
    });

    Animated.spring(buttonRotation, {
      toValue: 0,
      useNativeDriver: false,
      bounciness: 20,
    }).start();
  };

  const spin = buttonRotation.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '315deg'],
  });

  const onPressButton = () => {
    if (isOpened) {
      close();
    } else {
      open();
    }
  };

  const onPressInsert = () => {
    const task = text.trim();
    if (task) {
      onInsert(task);
    }
  };

  return (
    <>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          styles.shadow,
          {
            justifyContent: 'center',
            bottom: keyboardHeight,
            width: inputWidth,
            right: buttonRight,
            position: 'absolute',
          },
        ]}
      >
        <TextInput
          ref={inputRef}
          onBlur={close}
          value={text}
          onChangeText={(text) => setText(text)}
          style={[styles.input]}
          autoCapitalize="none"
          autoCorrect={false}
          textContentType="none"
          keyboardAppearance="light"
          returnKeyType="done"
          onSubmitEditing={onPressInsert}
        />
      </Animated.View>
      <Animated.View
        style={[
          styles.position,
          styles.shape,
          {
            bottom: keyboardHeight,
            transform: [{ rotate: spin }],
            right: buttonRight,
            position: 'absolute',
          },
        ]}
      >
        <Pressable
          style={({ pressed }) => [
            styles.shape,
            styles.button,
            pressed && { backgroundColor: PRIMARY.DARK },
          ]}
          onPress={onPressButton}
        >
          <MaterialCommunityIcons name="plus" size={24} color={WHITE} />
        </Pressable>
      </Animated.View>
    </>
  );
};

const styles = StyleSheet.create({
  position: {
    position: 'absolute',
    bottom: 30,
    right: 10,
  },
  shape: {
    width: BUTTON_WIDTH,
    height: BUTTON_WIDTH,
    borderRadius: BUTTON_WIDTH / 2,
    backgroundColor: PRIMARY.DEFAULT,
  },
  input: {
    color: WHITE,
    paddingLeft: 20,
    paddingRight: BUTTON_WIDTH + 10,
  },
  button: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  shadow: {
    shadowColor: BLACK,
    ...Platform.select({
      ios: {
        shadowOffset: { width: 2, height: 4 },
        shadowOpacity: 0.5,
        shadowRadius: 5,
      },
      android: {
        elevation: 5,
      },
    }),
  },
});

export default InputFAB;
