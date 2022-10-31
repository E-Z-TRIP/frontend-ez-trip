import { View, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { useState, useEffect } from 'react';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import Input from '../../../../components/form_elements/Input';
import PasswordInput from '../../../../components/form_elements/PasswordInput';
import SubmitBtn from '../../../../components/form_elements/SubmitBtn';
import CloseBtn from '../../../../components/close_button/CloseButton';
import { emailValidator, passwordValidator } from '../../../../lib/yupValidation';
import { rnPaperTextInputTheme } from './sharedProps';
import { postData } from '../../../../api/backend_request';
import { HelperText } from 'react-native-paper';
import styles from './style.css';
import KeyboardAwareView from '../../../../components/keyboard_aware_view/KeyboardAwareView';

const validationSchema = yup
  .object({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    email: emailValidator(),
    password: passwordValidator(),
  })
  .required();

export default function SignUpForm({ onClosePress, openForm }) {
  const { onBoarding } = useTheme();
  const dispatch = useDispatch();
  const [userExistsError, setUserExistsError] = useState(false);
  const [passwordInputActive, setPasswordInputActive] = useState(false);
  const [avoidKeyboard, setAvoidKeyboard] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  return (
    <KeyboardAwareView
      style={{ ...styles.modalInnerContainer, backgroundColor: onBoarding.formModalBackground }}
      bottomPositionOnKeyboardOpen={200}
      onKeyboardOpen={() => setAvoidKeyboard(true)}
      onKeyboardClose={() => setAvoidKeyboard(false)}
      active={passwordInputActive && avoidKeyboard ? true : false}>
      <CloseBtn
        style={styles.closeBtn}
        iconColor={onBoarding.closeBtnIcon}
        activeOpacity={0.6}
        iconScale={0.6}
        onPress={onClosePress}
      />
      <TouchableWithoutFeedback
        onPress={() => {
          Keyboard.dismiss();
          setPasswordInputActive(false);
        }}>
        <View style={styles.signUpFormContainer}>
          <Input
            name='firstName'
            label='First Name'
            control={control}
            error={errors.firstName && true}
            helperText={
              errors.firstName?.type &&
              (() => {
                const type = errors.firstName.type;
                if (type === 'required') return 'First name is required';
              })()
            }
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            defaultStyleOverides={rnPaperTextInputTheme()}
            onFocus={() => setPasswordInputActive(false)}
          />
          <Input
            name='lastName'
            label='Last Name'
            control={control}
            error={errors.lastName && true}
            helperText={
              errors.lastName?.type &&
              (() => {
                const type = errors.lastName.type;
                if (type === 'required') return 'Last name is required';
              })()
            }
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            defaultStyleOverides={rnPaperTextInputTheme()}
            onFocus={() => setPasswordInputActive(false)}
          />
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
            onFocus={() => setPasswordInputActive(false)}
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
                if (type === 'matches')
                  return 'Minimum eight characters, at least one uppercase letter, one lowercase letter, one number and one special character';
              })()
            }
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            iconColor={onBoarding.inputIcon}
            defaultStyleOverides={rnPaperTextInputTheme()}
            onFocus={() => setPasswordInputActive(true)}
          />
          <HelperText type='error' visible={true}>
            {userExistsError && 'User already exists'}
          </HelperText>
          <SubmitBtn
            text='Sign up'
            onSubmit={() =>
              handleSubmit(async (formData) => {
                const res = await postData('/users/signup', formData);
                if (res.error) return setUserExistsError(true);
                setUserExistsError(false);
                openForm('login');
              })
            }
            activeOpacity={0.8}
            btnStyle={{ ...styles.submitBtn, backgroundColor: onBoarding.submitBtn }}
            textStyle={{ ...styles.submitBtnText, color: onBoarding.submitBtnText }}
          />
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAwareView>
  );
}
