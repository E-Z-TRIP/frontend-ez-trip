import { View } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useEffect, useState } from 'react';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Input from '../../../../components/form_elements/Input';
import PasswordInput from '../../../../components/form_elements/PasswordInput';
import SubmitBtn from '../../../../components/form_elements/SubmitBtn';
import CloseBtn from '../../../../components/close_button/CloseButton';
import { emailValidator, passwordValidator } from '../../../../lib/yupValidation';
import { rnPaperTextInputTheme } from './sharedProps';
import { postData } from '../../../../api/backend_request';
import styles from './style.css';

const validationSchema = yup
  .object({
    email: emailValidator(),
    password: passwordValidator(),
  })
  .required();

export default function LoginForm({ onClosePress }) {
  const { onBoarding } = useTheme();
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <View style={{ ...styles.modalInnerContainer, backgroundColor: onBoarding.formModalBackground }}>
      <CloseBtn
        style={styles.closeBtn}
        iconColor={onBoarding.closeBtnIcon}
        activeOpacity={0.6}
        iconScale={0.6}
        onPress={onClosePress}
      />
      <View style={styles.formContainer}>
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
              if (type === 'matches') return 'Invalid email';
            })()
          }
          wrapperStyle={styles.inputWrapper}
          inputStyle={styles.input}
          defaultStyleOverides={rnPaperTextInputTheme()}
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
              if (type === 'matches') return 'Invalid password';
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
        <SubmitBtn
          text='Login'
          onSubmit={() =>
            handleSubmit(async (formData) => {
              const data = await postData('/users/signin', formData);
              console.log(data);
            })
          }
          activeOpacity={0.8}
          btnStyle={{ ...styles.submitBtn, backgroundColor: onBoarding.submitBtn }}
          textStyle={{ ...styles.submitBtnText, color: onBoarding.submitBtnText }}
        />
      </View>
    </View>
  );
}
