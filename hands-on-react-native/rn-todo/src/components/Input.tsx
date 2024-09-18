import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TextInputSubmitEditingEventData,
  NativeSyntheticEvent,
} from 'react-native';
import { BLACK, GRAY, PRIMARY } from '../colors';
import { forwardRef, useState } from 'react';
import { MaterialCommunityIcons } from '@expo/vector-icons';

enum KeyboardTypes {
  DEFAULT = 'default',
  EMAIL = 'email-address',
}

enum ReturnKeyTypes {
  DONE = 'done',
  NEXT = 'next',
}

enum IconNames {
  EMAIL = 'email',
  PASSWORD = 'lock',
}

type InputProps = {
  title: string;
  placeholder?: string;
  keyboardType?: KeyboardTypes;
  returnKeyType?: ReturnKeyTypes;
  secureTextEntry?: boolean;
  value: string;
  onChangeText: ((text: string) => void) | undefined;
  iconName: IconNames;
  onSubmitEditing?:
    | ((e: NativeSyntheticEvent<TextInputSubmitEditingEventData>) => void)
    | undefined;
};

const Input = forwardRef(
  (
    {
      title,
      placeholder,
      keyboardType = KeyboardTypes.DEFAULT,
      returnKeyType = ReturnKeyTypes.DONE,
      secureTextEntry,
      value,
      onChangeText,
      iconName,
      onSubmitEditing,
    }: InputProps,
    ref,
  ) => {
    const [isFocused, setFocused] = useState<boolean>(false);

    return (
      <View style={styles.container}>
        <Text
          style={[
            styles.title,
            !!value && styles.hasValueTitle,
            isFocused && styles.focusedTitle,
          ]}
        >
          {title}
        </Text>
        <View>
          <TextInput
            style={[
              styles.input,
              !!value && styles.hasValueInput,
              isFocused && styles.focusedInput,
            ]}
            placeholder={placeholder ?? title}
            placeholderTextColor={GRAY.DEFAULT}
            autoCapitalize={'none'}
            autoCorrect={false}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            textContentType="none"
            secureTextEntry={secureTextEntry}
            keyboardAppearance="light"
            ref={ref}
            value={value}
            onChangeText={onChangeText}
            onFocus={() => setFocused(true)}
            onBlur={() => setFocused(false)}
            onSubmitEditing={onSubmitEditing}
          />
          <View style={styles.icon}>
            <MaterialCommunityIcons
              name={iconName}
              size={20}
              color={(() => {
                switch (true) {
                  case isFocused:
                    return PRIMARY.DEFAULT;
                  case !!value:
                    return BLACK;
                  default:
                    return GRAY.DEFAULT;
                }
              })()}
            />
          </View>
        </View>
      </View>
    );
  },
);

const styles = StyleSheet.create({
  container: {
    width: '100%',
    paddingHorizontal: 20,
    marginVertical: 10,
  },
  title: {
    marginBottom: 4,
    color: GRAY.DEFAULT,
  },
  hasValueTitle: {
    color: BLACK,
  },
  focusedTitle: {
    fontWeight: '600',
    color: PRIMARY.DEFAULT,
  },
  input: {
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    height: 42,
    borderColor: GRAY.DEFAULT,
    paddingLeft: 30,
  },
  hasValueInput: {
    borderColor: BLACK,
    color: BLACK,
  },
  focusedInput: {
    borderWidth: 2,
    borderColor: PRIMARY.DEFAULT,
    color: PRIMARY.DEFAULT,
  },
  icon: {
    position: 'absolute',
    left: 8,
    height: '100%',
    justifyContent: 'center',
  },
});

export { KeyboardTypes, ReturnKeyTypes, IconNames };
export default Input;
