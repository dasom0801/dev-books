import { Keyboard, KeyboardAvoidingView, Platform, Pressable } from 'react-native';
import { KeyboardAvoidingViewProps } from 'react-native/Libraries/Components/Keyboard/KeyboardAvoidingView';
import { ReactNode } from 'react';

type SafeInputViewProps = {
  children: ReactNode;
}

const SafeInputView = ({ children }: SafeInputViewProps) => {
  const behavior = Platform.select({ ios: 'padding' }) as KeyboardAvoidingViewProps['behavior'];

  return (
    <KeyboardAvoidingView style={{ flex: 1 }} behavior={behavior}>
      <Pressable style={{ flex: 1}} onPress={() => Keyboard.dismiss()}>
        { children }
      </Pressable>
    </KeyboardAvoidingView>
  );
}

export default SafeInputView;

