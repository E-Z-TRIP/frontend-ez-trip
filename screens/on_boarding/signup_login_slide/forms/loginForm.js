import { KeyboardAvoidingView, View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { mountUser } from '../../../../reducers/user';
import Input from '../../../../components/form_elements/Input';
import PasswordInput from '../../../../components/form_elements/PasswordInput';
import SubmitBtn from '../../../../components/form_elements/SubmitBtn';
import CloseBtn from '../../../../components/close_button/CloseButton';
import { rnPaperTextInputTheme } from './sharedProps';
import { postData } from '../../../../api/backend_request';
import { HelperText } from 'react-native-paper';
import styles from './style.css';
import { useNavigation } from '@react-navigation/native';

export default function LoginForm({ onClosePress, navigation }) {
  const { onBoarding } = useTheme();
  const dispatch = useDispatch();
  const [notFoundError, setNotFoundError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <KeyboardAvoidingView
      style={{ ...styles.modalInnerContainer, backgroundColor: onBoarding.formModalBackground }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      enabled={true}>
      <CloseBtn
        style={styles.closeBtn}
        iconColor={onBoarding.closeBtnIcon}
        activeOpacity={0.6}
        iconScale={0.6}
        onPress={onClosePress}
      />
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.loginFormContainer}>
          <Input
            name='email'
            label='Email'
            control={control}
            error={errors.email && true}
            helperText={
              errors.email?.type &&
              (() => {
                const type = errors.email.type;
                if (type === 'required') return 'Email is required';
              })()
            }
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            defaultStyleOverides={rnPaperTextInputTheme()}
            rules={{
              required: true,
            }}
          />
          <PasswordInput
            name='password'
            label='Password'
            control={control}
            error={errors.password && true}
            helperText={
              errors.password?.type &&
              (() => {
                const type = errors.password.type;
                if (type === 'required') return 'Password is required';
              })()
            }
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            iconColor={onBoarding.inputIcon}
            defaultStyleOverides={rnPaperTextInputTheme()}
            rules={{
              required: true,
            }}
          />
          <HelperText type='error' visible={true}>
            {notFoundError && 'User not found'}
          </HelperText>
          <SubmitBtn
            text='Login'
            onSubmit={() =>
              handleSubmit(async (formData) => {
                const res = await postData('/users/signin', formData);
                if (res.error) return setNotFoundError(true);
                const { firstName, lastName, email, token } = res;
                dispatch(mountUser({ firstName, lastName, email, token }));
                setNotFoundError(false);
                navigation.navigate('Discover');
              })
            }
            activeOpacity={0.8}
            btnStyle={{ ...styles.submitBtn, backgroundColor: onBoarding.submitBtn }}
            textStyle={{ ...styles.submitBtnText, color: onBoarding.submitBtnText }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}
