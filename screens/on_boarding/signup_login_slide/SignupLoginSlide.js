import { useDispatch } from 'react-redux';
import { View, Text, ImageBackground, SafeAreaView, TouchableOpacity } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import FadeContainer from '../../../components/fade_container/FadeContainer';
import Logo from '../../../components/logo/Logo';
import { useEffect } from 'react';

export default function SignupLogoinSlide({ isVisible, direction, progressPos }) {
  const { onBoarding } = useTheme();

  return (
    <FadeContainer style={styles.slideContainer} isVisible={true} speed={200}>
      <Logo containerStyle={styles.logoContainer} color={onBoarding.header} size={100} />
      <View style={styles.formBtnsContainer}>
        <FormBtn text='Login / Sign up' />
        <BtnsDivider />
        <View style={styles.alternativesContainer}>
          <FormBtn style={{ marginBottom: 10 }} text='Sign in with Google' />
          <FormBtn text='Sign in with Facebook' />
        </View>
      </View>
      <View style={styles.bottomContainer}>
        <SeeCatalogBtn />
      </View>
    </FadeContainer>
  );
}

function FormBtn({ style, text, onPress }) {
  const { onBoarding } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles.btn, backgroundColor: onBoarding.signupLoginBtn, ...style }}
      onPress={onPress}
      activeOpacity={0.8}>
      <Text style={{ ...styles.btnTxt, color: onBoarding.signupLoginBtnTxt }}>{text}</Text>
    </TouchableOpacity>
  );
}

function SeeCatalogBtn({ onPress }) {
  const { onBoarding } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Text style={{ ...styles.seeCatalogTxt, color: onBoarding.seeCatalogTxt }}>See the catalog</Text>
    </TouchableOpacity>
  );
}

function BtnsDivider() {
  const { onBoarding } = useTheme();

  const Bar = () => <View style={{ ...styles.dividerBar, backgroundColor: onBoarding.signupLoginDividerBar }}></View>;

  return (
    <View style={styles.dividerContainer}>
      <Bar />
      <Text style={{ ...styles.dividerTxt, color: onBoarding.signupLoginDividerBar }}>OR</Text>
      <Bar />
    </View>
  );
}
