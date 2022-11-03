import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Input from '../../../components/form_elements/Input';
import PasswordInput from '../../../components/form_elements/PasswordInput';
import SubmitBtn from '../../../components/form_elements/SubmitBtn';
import { rnPaperTextInputTheme } from './sharedProps';
import { postData } from '../../../api/backend_request';
import { HelperText } from 'react-native-paper';
import styles from './style.css';

export default function ValidateUserForm({ navigation, onEmailInputFocus, onPasswordInputFocus }) {
  const { profile } = useTheme();
  const dispatch = useDispatch();
  const [notFoundError, setNotFoundError] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  return (
    <View style={{ ...styles.formContainer }}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.formWrapper}>
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
            autoCapitalize={'none'}
            onFocus={onEmailInputFocus}
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
            wrapperStyle={{ ...styles.inputWrapper, marginBottom: 10 }}
            inputStyle={styles.input}
            iconColor={profile.inputIcon}
            defaultStyleOverides={rnPaperTextInputTheme()}
            rules={{
              required: true,
            }}
            onFocus={onPasswordInputFocus}
          />
          <HelperText
            type='error'
            visible={true}
            style={{
              color: profile.error,
              marginBottom: 10,
              fontSize: 15,
            }}>
            {notFoundError && 'User not found'}
          </HelperText>
          <SubmitBtn
            text='View documents'
            onSubmit={() =>
              handleSubmit(async (formData) => {
                const res = await postData('/users/signin', formData);
                if (res.error) return setNotFoundError(true);
                setNotFoundError(false);
                navigation.navigate('MyDocuments');
              })
            }
            activeOpacity={0.8}
            btnStyle={{ ...styles.submitBtn, backgroundColor: profile.submitBtn }}
            textStyle={{ ...styles.submitBtnText, color: profile.submitBtnText }}
          />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}
