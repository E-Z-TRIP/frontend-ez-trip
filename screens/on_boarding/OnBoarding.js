import { View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import bgImage from '../../assets/images/hero_background.png';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';

export default function OnBoarding({ navigation }) {
  // Imported theme specific for on boarding
  const { onBoarding } = useTheme();

  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(1);
  const screens = 5;

  if (!loadedFonts) return <></>;

  const incrementProgress = () => {
    setProgress(progress < 5 ? progress + 1 : progress);
  };
  const decrementProgress = () => {
    setProgress(progress > 1 ? progress - 1 : progress);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={bgImage} resizeMode='cover'>
        <ProgressBar screens={screens} currentScreen={progress} />
        <View style={styles.headerTextContainer}>
          <Text style={{ ...styles.headerText, color: onBoarding.header }}>EZ</Text>
          <Text style={{ ...styles.headerText, color: onBoarding.header }}>TRIPS</Text>
        </View>
        {/* <NextBtn onPress={decrementProgress} isVisable={progress < screens ? true : false} title={'back'} /> */}
        {progress < screens ? (
          <NextBtn onPress={incrementProgress} title={progress === 1 ? 'Bienvenue' : 'Suivant'} />
        ) : (
          <></>
        )}
      </ImageBackground>
    </View>
  );
}

function NextBtn({ title, onPress }) {
  const { onBoarding } = useTheme();

  return (
    <TouchableOpacity
      style={{ ...styles.nextBtn, backgroundColor: onBoarding.nextBtn }}
      activeOpacity={0.95}
      onPress={onPress}>
      <Text style={{ ...styles.nextBtnTxt, color: onBoarding.nextBtnTxt }}>{title}</Text>
    </TouchableOpacity>
  );
}

const ExampleWithHoc = gestureHandlerRootHOC(() => (
  <View>
    <DraggableBox />
  </View>
));
