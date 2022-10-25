import { View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import bgImage from '../../assets/images/hero_background.png';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import SwipeContainer from '../../components/swipe_container/SwipeContainer';

export default function OnBoarding({ navigation }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(1);
  const slides = [<TitleSlide />, <NextBtn />];

  if (!loadedFonts) return <></>;

  const incrementProgress = () => {
    setProgress(progress < slides.length ? progress + 1 : progress);
  };
  const decrementProgress = () => {
    setProgress(progress > 1 ? progress - 1 : progress);
  };

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={bgImage} resizeMode='cover'>
        <SwipeContainer
          style={styles.swipeContainer}
          onSwipe={(direction) => {
            if (direction === 'left') return incrementProgress();
            if (direction === 'right') return decrementProgress();
          }}>
          <ProgressBar slideQty={slides.length} currentSlide={progress} />
          {slides[progress - 1]}
        </SwipeContainer>
      </ImageBackground>
    </View>
  );
}

function TitleSlide() {
  // Imported theme specific for on boarding colors
  const { onBoarding } = useTheme();

  return (
    <View style={styles.headerTextContainer}>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>EZ</Text>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>TRIPS</Text>
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
