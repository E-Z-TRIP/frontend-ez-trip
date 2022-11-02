import { View, Text, Dimensions } from 'react-native';
import { useRef, useEffect, useState } from 'react';
import styles from './style.css';
import BackgroundImageLayer from '../../components/background_image_layer/BackgroundImageLayer';
import mountImg from '../../assets/images/Mountain.png';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import AnimatedProgressPath from './animated_progress_path/AnimatedProgressPath';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import StepInfo from './step_info/StepInfo';

export default function NexStep() {
  const loadedFonts = loadFonts();
  const { nextStep } = useTheme();
  const currentStep = 4;
  const stepInfoComponents = stepInfoCollection(currentStep);

  if (!loadedFonts) return <></>;

  return (
    <>
      <BackgroundImageLayer source={mountImg} layerOpacity={0.1} style={styles.imageBackground} />
      <View
        style={{
          ...styles.mainContainer,
        }}>
        <AnimatedProgressPath
          containerScale={1.4}
          containerStyle={styles.animatedPathContainer}
          pathColor={nextStep.animatedPath}
          pointerColor={nextStep.animatedPointer}
          pointerScale={1}
          step={currentStep}
        />
        {stepInfoComponents.map((Component, i) => (
          <Component key={i} />
        ))}
      </View>
      <BottomToolbar />
    </>
  );
}

function stepInfoCollection(currentStep) {
  const { nextStep } = useTheme();

  return [
    (key) => (
      <StepInfo
        key={key}
        title='First step'
        step={1}
        currentStep={currentStep}
        containerStyle={{ backgroundColor: nextStep.stepInfoBg, transform: [{ translateY: -70 }, { translateX: 20 }] }}
      />
    ),
    (key) => (
      <StepInfo
        key={key}
        title='Second step'
        step={2}
        currentStep={currentStep}
        containerStyle={{
          backgroundColor: nextStep.stepInfoBg,
          width: 155,
          transform: [{ translateY: -142 }, { translateX: 190 }],
        }}
      />
    ),
    (key) => (
      <StepInfo
        key={key}
        title='Third step'
        step={3}
        currentStep={currentStep}
        containerStyle={{
          backgroundColor: nextStep.stepInfoBg,
          width: 190,
          transform: [{ translateY: -260 }],
        }}
      />
    ),
    (key) => (
      <StepInfo
        key={key}
        title='Forth step'
        step={4}
        currentStep={currentStep}
        containerStyle={{
          backgroundColor: nextStep.stepInfoBg,
          width: 190,
          transform: [{ translateY: -359 }, { translateX: 145 }],
        }}
      />
    ),
    (key) => (
      <StepInfo
        key={key}
        title='See you when you get back'
        step={5}
        currentStep={currentStep}
        containerStyle={{
          backgroundColor: nextStep.lastStepInfoBg,
          width: '80%',
          marginLeft: 0,
          left: '10%',
          transform: [{ translateY: -525 }],
        }}
      />
    ),
  ];
}
