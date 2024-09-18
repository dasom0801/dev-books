import { Alert, Image, Keyboard, StyleSheet, View } from 'react-native';
import Input, {
  IconNames,
  KeyboardTypes,
  ReturnKeyTypes,
} from '../components/Input';
import SafeInputView from '../components/SafeInputView';
import { useRef, useState } from 'react';
import Button from '../components/Button';
import { signIn } from '../api/auth';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useUserContext } from '../contexts/UserContext';

const SignInScreen = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const passwordRef = useRef(null);
  const disabled = !email || !password;
  const { setUser } = useUserContext();

  const onSubmit = async () => {
    if (isLoading || disabled) return;
    Keyboard.dismiss();
    try {
      setIsLoading(true);
      const data = await signIn(email, password);
      setIsLoading(false);
      setUser(data);
    } catch (error: unknown) {
      Alert.alert('로그인 실패', error, [
        {
          text: '확인',
          onPress: () => setIsLoading(false),
        },
      ]);
    }
  };

  return (
    <SafeInputView>
      <SafeAreaView style={styles.container}>
        <Image source={require('../../assets/main.png')} style={styles.image} />
        <Input
          title={'이메일'}
          placeholder={'your@email.com'}
          keyboardType={KeyboardTypes.EMAIL}
          returnKeyType={ReturnKeyTypes.NEXT}
          value={email}
          onChangeText={(email) => setEmail(email.trim())}
          iconName={IconNames.EMAIL}
          onSubmitEditing={() => passwordRef.current.focus()}
        />
        <Input
          title={'비밀번호'}
          returnKeyType={ReturnKeyTypes.DONE}
          secureTextEntry
          value={password}
          onChangeText={(password) => setPassword(password.trim())}
          iconName={IconNames.PASSWORD}
          ref={passwordRef}
          onSubmitEditing={onSubmit}
        />
        <View style={styles.buttonContainer}>
          <Button
            title="로그인"
            onPress={onSubmit}
            disabled={disabled}
            isLoading={isLoading}
          />
        </View>
      </SafeAreaView>
    </SafeInputView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 200,
    height: 200,
  },
  buttonContainer: {
    width: '100%',
    marginTop: 30,
    paddingHorizontal: 20,
  },
});

export default SignInScreen;
