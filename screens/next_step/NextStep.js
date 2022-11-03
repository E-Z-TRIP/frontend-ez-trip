import { View, Text, Dimensions } from 'react-native';
import { useState, useEffect } from 'react';
import styles from './style.css';
import BackgroundImageLayer from '../../components/background_image_layer/BackgroundImageLayer';
import mountImg from '../../assets/images/Mountain.png';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import AnimatedProgressPath from './animated_progress_path/AnimatedProgressPath';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import LastStep from './step_info/LastStep';
import StepInfo from './step_info/StepInfo';
import { inspect } from '../../lib/inspector';

export default function NexStep({ navigation, route: { params: data } }) {
  const loadedFonts = loadFonts();
  const { nextStep } = useTheme();
  const [currentStep, setCurrentStep] = useState(0);

  const incrementStep = () => {
    setCurrentStep((current) => (current < 5 ? current + 1 : 0));
  };

  useEffect(() => {
    if (currentStep === 0) incrementStep();
  }, [currentStep]);

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
        {stepInfoCollection(currentStep, incrementStep)[currentStep - 1]}
      </View>
      <BottomToolbar />
    </>
  );
}

function stepInfoCollection(currentStep, incrementStep) {
  const { nextStep } = useTheme();

  return [
    <StepInfo
      label='First step'
      title='First step'
      information={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      step={1}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateY: -70 }, { translateX: 50 }],
      }}
    />,
    <StepInfo
      label='Second step'
      title='Second step'
      information={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      step={2}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateY: -142 }, { translateX: 205 }],
      }}
    />,
    <StepInfo
      label='Third step'
      title='Third step'
      information={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      step={3}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateY: -260 }, { translateX: 40 }],
      }}
    />,
    <StepInfo
      label='Fourth step'
      title='Fourth step'
      information={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      step={4}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.stepInfoBg,
        width: 140,
        transform: [{ translateY: -359 }, { translateX: 170 }],
      }}
    />,
    <LastStep
      label='See you when you get back'
      title='See you when you get back'
      information={
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
      }
      step={5}
      currentStep={currentStep}
      incrementStep={incrementStep}
      containerStyle={{
        backgroundColor: nextStep.lastStepInfoBg,
        width: '80%',
        marginLeft: 0,
        left: '10%',
        transform: [{ translateY: -525 }],
      }}
    />,
  ];
}
