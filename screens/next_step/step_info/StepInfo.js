import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import OpenCrossBtn from '../../../components/close_button/CloseButton';
import FadeContainer from '../../../components/fade_container/FadeContainer';

export default function StepInfo({ title, step, currentStep, containerStyle, onIconPress }) {
  const { nextStep } = useTheme();

  return (
    <FadeContainer
      style={{ ...styles.infoContainer, ...containerStyle }}
      isVisible={step === currentStep ? true : false}>
      <View style={styles.textContainer}>
        <Text style={{ ...styles.infoTitle, color: nextStep.stepInfoText }}>{title}</Text>
      </View>
      <View style={styles.btnContainer}>
        <OpenCrossBtn
          iconColor={nextStep.stepInfoText}
          iconScale={0.3}
          iconStyle={{ padding: 6, transform: [{ rotate: '45deg' }] }}
          onPress={onIconPress}
        />
      </View>
    </FadeContainer>
  );
}
