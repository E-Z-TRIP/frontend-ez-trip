import { View, Text, TouchableOpacity } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import ProgressBar from '../../components/progressBar/progressBar';
import SwipeContainer from '../../components/swipe_container/SwipeContainer';
import SwipeArrow from '../../components/icons/SwipeArrow';
import FadeContainer from '../../components/fade_container/FadeContainer';
import PulsingContainer from '../../components/pulsing_container/PulsingContainer';
import HorizontalSlideContainer from '../../components/horizontal_slide_container/HorizontalSlideContainer';
import SignupLoginSlide from './signup_login_slide/SignupLoginSlide';
import Logo from '../../components/logo/Logo';
import VideoBackground from '../../components/video_background/VideoBackground';
import canyonVideo from '../../assets/videos/Canyon.mp4';

export default function OnBoarding({ navigation }) {
  const loadedFonts = loadFonts();
  const { onBoarding } = useTheme();
  const animationSpeed = 250;
  const [progress, setProgress] = useState(1);
  const [direction, setDirection] = useState({ direction: false });
  const slides = [TitleSlide, SecondSlide, ThirdSlide, FourthSlide, SignupLoginSlide];
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    if (animating) return;
    if (!direction.direction) return;
    if (direction.direction === 'left') return setProgress(progress < slides.length ? progress + 1 : progress);
    if (direction.direction === 'right') return setProgress(progress > 1 ? progress - 1 : progress);
  }, [direction]);

  useEffect(() => {
    if (!animating) return;
    const timeout = setTimeout(() => setAnimating(false), animationSpeed);
    return () => clearTimeout(timeout);
  }, [animating]);

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      <VideoBackground source={canyonVideo} layerOpacity={0.5}>
        {(absoluteStyle) => (
          <SwipeContainer
            style={{ ...absoluteStyle, ...styles.swipeContainer }}
            onSwipe={({ direction }) => setDirection(direction)}>
            <FadeContainer isVisible={progress === slides.length ? false : true} speed={animationSpeed}>
              <ProgressBar slideQty={slides.length} currentSlide={progress} animationSpeed={animationSpeed} />
            </FadeContainer>
            <HorizontalSlideContainer
              speed={animationSpeed}
              direction={direction}
              currentSlide={progress}
              slideLength={slides.length}
              disableAnimation={animating ? true : false}
              onAnimation={() => setAnimating(true)}>
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
              <PulsingContainer
                style={styles.paddingBox}
                isVisible={progress < slides.length ? true : false}
                speed={animationSpeed}>
                <TouchableOpacity onPress={() => setDirection({ direction: 'left' })} activeOpacity={1}>
                  <SwipeArrow />
                </TouchableOpacity>
              </PulsingContainer>
            </View>
          </SwipeContainer>
        )}
      </VideoBackground>
    </View>
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
        At E-Z TRIPS, we believe that travelling broadens the mind and has the possibility to change the way you think.  
        Through travel, we want to connect people who wouldn't have meet otherwise.
        {/* At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world. */}
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
        At EZ-TRIPS, our Mission is to perform and deliver excellent quality service to our clients.
        We hand-picked and vetted every travel agency you'll come across on our app. 
        {/* At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world. */}
      </Text>
    </View>
  );
}

function FourthSlide(props) {
  const { onBoarding } = useTheme();

  return (
    <View {...props} style={styles.slideContainer}>
      <Text style={{ ...styles.descriptionSlideHeader, color: onBoarding.text }}>Commited partners</Text>
      <Text style={{ ...styles.descriptionSlideText, color: onBoarding.text }}>
        On our app, you'll only find trips from small travel agencies. We believe in the FAIR tourism industry. A fair price to compensate equitably everyone, every step of your journey. From your travel agent, to the local guide at your destination.
        {/* At EZ TRIPS, our mission is to give you the best vacation of your life. And for that, we find you the best hosts
        around the world. */}
      </Text>
    </View>
  );
}
