import { View, Text, ImageBackground, TouchableOpacity, Animated } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import bgImage from '../../assets/images/hero_background.png';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect, useRef } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import SwipeContainer from '../../components/swipe_container/SwipeContainer';
import SwipeArrow from '../../assets/icons/SwipeArrow';
import FadeContainer from '../../components/fade_container/FadeContainer';
import HorizontalFadeContainer from '../../components/horizontal_fade_container/HorizontalFadeContainer';

export default function OnBoarding({ navigation }) {
  const loadedFonts = loadFonts();
  const { onBoarding } = useTheme();
  const dispatch = useDispatch();
  const animationSpeed = 250;
  const slides = 5;
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState({ direction: false });

  useEffect(() => {
    if (!direction.direction) return;
    if (direction.direction === 'left') return setProgress(progress < slides ? progress + 1 : progress);
    if (direction.direction === 'right') return setProgress(progress > 1 ? progress - 1 : progress);
  }, [direction]);

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={bgImage} resizeMode='cover'>
        <SwipeContainer style={styles.swipeContainer} onSwipe={({ direction }) => setDirection(direction)}>
          <ProgressBar slideQty={slides} currentSlide={progress} animationSpeed={animationSpeed} />
          <TitleSlide isVisible={progress === 1 ? true : false} direction={direction} progressPos={progress} />
          <TitleSlide isVisible={progress === 2 ? true : false} direction={direction} progressPos={progress} />
          <TitleSlide isVisible={progress === 3 ? true : false} direction={direction} progressPos={progress} />
          <TitleSlide isVisible={progress === 4 ? true : false} direction={direction} progressPos={progress} />
          <TitleSlide isVisible={progress === 5 ? true : false} direction={direction} progressPos={progress} />
          <View style={styles.bottomContainer}>
            <View style={styles.paddingBox}></View>
            <FadeContainer isVisible={progress > 1 ? false : true} speed={animationSpeed}>
              <Text style={{ ...styles.welcomeTxt, color: onBoarding.welcomeTxt }}>Welcome</Text>
            </FadeContainer>
            <View style={styles.paddingBox}>
              <SwipeArrow />
            </View>
          </View>
        </SwipeContainer>
      </ImageBackground>
    </View>
  );
}

function TitleSlide({ isVisible, animationSpeed, direction }) {
  // Imported theme specific for on boarding colors
  const { onBoarding } = useTheme();

  return (
    <HorizontalFadeContainer isVisible={isVisible} speed={animationSpeed} style={styles.headerTextContainer}>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>EZ</Text>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>TRIPS</Text>
    </HorizontalFadeContainer>
  );
}

function Slide() {
  // Imported theme specific for on boarding colors
  const { onBoarding } = useTheme();

  return (
    <Animated.View style={styles.headerTextContainer}>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>EZ</Text>
      <Text style={{ ...styles.headerText, color: onBoarding.header }}>TRIPS</Text>
    </Animated.View>
  );
}

function Btn({ title, onPress }) {
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
