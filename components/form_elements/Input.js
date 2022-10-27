import { View } from 'react-native';
import { Controller } from 'react-hook-form';
import { TextInput, HelperText } from 'react-native-paper';

export default function Input({
  name,
  label,
  control,
  error,
  helperText,
  rules,
  inputStyle,
  wrapperStyle,
  defaultStyleOverides = {},
}) {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onBlur, onChange, value } }) => (
        <View style={wrapperStyle}>
          <TextInput
            label={label}
            style={inputStyle}
            onBlur={onBlur}
            onChangeText={onChange}
            value={value}
            error={error}
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
