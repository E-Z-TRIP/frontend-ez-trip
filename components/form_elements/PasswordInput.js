import { View } from 'react-native';
import { useState } from 'react';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';

export default function PasswordInput({
  name,
  label,
  control,
  error,
  helperText,
  rules,
  inputStyle,
  wrapperStyle,
  iconColor,
  defaultStyleOverides = {},
}) {
  const [hidePassword, setHidePassword] = useState(true);

  return (
    <Controller
      name={name}
      control={control}
      rules={rules}
      render={({ field: { onChange, onBlur, value } }) => (
        <View style={wrapperStyle}>
          <TextInput
            label={label}
            style={inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            right={
              hidePassword ? (
                <TextInput.Icon onPress={() => setHidePassword(false)} name='eye' color={iconColor} />
              ) : (
                <TextInput.Icon onPress={() => setHidePassword(true)} name='eye-off' color={iconColor} />
              )
            }
            error={error}
            secureTextEntry={hidePassword}
            {...defaultStyleOverides}
          />
          <HelperText type='error' visible={error}>
            {helperText}
          </HelperText>
        </View>
      )}
    />
  );
}
