import { View, Text, Modal, TouchableOpacity } from 'react-native';
import { useState } from 'react';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import CrossBtn from '../../../components/close_button/CloseButton';
import FadeContainer from '../../../components/fade_container/FadeContainer';

export default function LastStep({ label, step, title, information, currentStep, containerStyle, incrementStep }) {
  const { nextStep } = useTheme();
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <>
      <FadeContainer
        style={{ ...styles.infoContainer, ...containerStyle }}
        isVisible={step === currentStep ? true : false}>
        <Text style={{ ...styles.label, color: nextStep.stepInfoText }}>{label}</Text>
        <CrossBtn
          style={styles.btn}
          iconColor={nextStep.stepInfoText}
          iconScale={0.3}
          iconStyle={{ margin: 10, transform: [{ rotate: '45deg' }] }}
          onPress={() => setModalVisible(true)}
        />
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
            <Text style={styles.title}>{title}</Text>
            <Text style={styles.information}>{information}</Text>
            <TouchableOpacity
              activeOpacity={0.8}
              style={{ ...styles.restartBtn, backgroundColor: nextStep.lastRestartBtn }}
              onPress={() => {
                incrementStep();
                setModalVisible(false);
              }}>
              <Text style={{ ...styles.restartBtnTxt, color: nextStep.lastRestartBtnTxt }}>Restart</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </>
  );
}
