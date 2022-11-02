import { View, Text, Modal } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import CrossBtn from '../../../components/close_button/CloseButton';
import FadeContainer from '../../../components/fade_container/FadeContainer';

export default function StepInfo({ title, step, currentStep, containerStyle }) {
  const { nextStep } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FadeContainer
        style={{ ...styles.infoContainer, ...containerStyle }}
        isVisible={step === currentStep ? true : false}>
        <View style={styles.textContainer}>
          <Text style={{ ...styles.infoTitle, color: nextStep.stepInfoText }}>{title}</Text>
        </View>
        <View style={styles.btnContainer}>
          <CrossBtn
            iconColor={nextStep.stepInfoText}
            iconScale={0.3}
            iconStyle={{ margin: 10, transform: [{ rotate: '45deg' }] }}
            onPress={() => setModalVisible(true)}
          />
        </View>
      </FadeContainer>
      <Modal
        transparent={true}
        presentationStyle={'overFullScreen'}
        visible={modalVisible}
        animated={true}
        animationType={'fade'}
        statusBarTranslucent={true}>
        <View style={{ ...styles.contentContainer }}>
          <View style={{ ...styles.contentWrapper, backgroundColor: nextStep.modalBg }}>
            <CrossBtn
              style={styles.modalCloseBtn}
              iconColor={nextStep.modalCloseBtn}
              iconScale={0.4}
              onPress={() => setModalVisible(false)}
            />
            <Text>Info Modal</Text>
          </View>
        </View>
      </Modal>
    </>
  );
}
