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
  const { nextStep } = useTheme();
  const loadedFonts = loadFonts();
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
      label='Treatment of your request'
      title={`What's next ?`}
      information={'The travel agency is treating your request.'}
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
      label='Quotation ready!'
      title='And then...'
      information={`You'll get a notification once your quotation is ready`}
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
      label='Paiement'
      title='After that...'
      information={`After you accept the quotation, the travel agency will get in touch with you via email for the last details and to proceed with paiement`}
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
      label='Adding your documents'
      title='Finally...'
      information={`You'll find all the details of your reservation directly on EZ TRIPS in 'My trips' section. You can add your travel documents on your profile, in the section 'My Documents'`}
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
      information={'Have a nice trip!'}
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
