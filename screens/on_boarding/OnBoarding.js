import { View, Text, ImageBackground, SafeAreaView } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import bgImage from '../../assets/images/hero_background.png';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import SwipeContainer from '../../components/swipe_container/SwipeContainer';
import SwipeArrow from '../../components/icons/SwipeArrow';
import FadeContainer from '../../components/fade_container/FadeContainer';
import HorizontalSlideContainer from '../../components/horizontal_slide_container/HorizontalSlideContainer';
import SignupLoginSlide from './signup_login_slide/SignupLoginSlide';
import Logo from '../../components/logo/Logo';

export default function OnBoarding({ navigation }) {
  const loadedFonts = loadFonts();
  const { onBoarding } = useTheme();
  const animationSpeed = 250;
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState({ direction: false });
  const slides = [TitleSlide, SecondSlide, ThirdSlide, FourthSlide, SignupLoginSlide];

  useEffect(() => {
    if (!direction.direction) return;
    if (direction.direction === 'left') return setProgress(progress < slides.length ? progress + 1 : progress);
    if (direction.direction === 'right') return setProgress(progress > 1 ? progress - 1 : progress);
  }, [direction]);

  if (!loadedFonts) return <></>;

  return (
    <SafeAreaView style={styles.container}>
      <ImageBackground style={styles.bgImage} source={bgImage} resizeMode='cover'>
        <SwipeContainer style={styles.swipeContainer} onSwipe={({ direction }) => setDirection(direction)}>
          <FadeContainer isVisible={progress === slides.length ? false : true} speed={animationSpeed}>
            <ProgressBar slideQty={slides.length} currentSlide={progress} animationSpeed={animationSpeed} />
          </FadeContainer>
          <HorizontalSlideContainer
            speed={animationSpeed}
            direction={direction}
            currentSlide={progress}
            slideLength={slides.length}>
            {slides.map((Slide, i) => {
              return (
                <View key={i} style={{ width: '100%' }}>
                  <Slide
                    isVisible={progress === i + 1 ? true : false}
                    direction={direction}
                    progressPos={progress}
                    slideLength={slides.length}
                    navigation={navigation}
                  />
                </View>
              );
            })}
          </HorizontalSlideContainer>
          <View style={styles.bottomContainer}>
            <View style={styles.paddingBox}></View>
            <FadeContainer isVisible={progress > 1 ? false : true} speed={animationSpeed}>
              <Text style={{ ...styles.welcomeTxt, color: onBoarding.welcomeTxt }}>Welcome</Text>
            </FadeContainer>
            <FadeContainer
              style={styles.paddingBox}
              isVisible={progress < slides.length ? true : false}
              speed={animationSpeed}>
              <SwipeArrow />
            </FadeContainer>
          </View>
        </SwipeContainer>
      </ImageBackground>
    </SafeAreaView>
  );
}

function TitleSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <FadeContainer {...props} style={styles.slideContainer}>
      <Logo color={onBoarding.header} size={100} />
    </FadeContainer>
  );
}

function SecondSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View {...props} style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>A human adventure</Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world.
      </Text>
    </View>
  );
}

function ThirdSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View {...props} style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>Quality service</Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world.
      </Text>
    </View>
  );
}

function FourthSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View {...props} style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>A committed approach</Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world.
      </Text>
    </View>
  );
}
