import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';

export default function HorizontalFadeContainer({ style, isVisible, children, speed, direction }) {
  let fadeRef = useRef(new Animated.Value(1)).current;
  let slideRef = useRef(new Animated.Value(0)).current;
  const [showView, setShowView] = useState(true);

  useEffect(() => {
    if (!isVisible) {
      slideOut();
      fadeOut();
      return setShowView(false);
    }
    slideIn();
    fadeIn();
    setShowView(true);
  }, [isVisible]);

  const fadeOut = () => {
    Animated.timing(fadeRef, {
      toValue: 0,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  const fadeIn = () => {
    Animated.timing(fadeRef, {
      toValue: 1000,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  const slideIn = () => {
    Animated.timing(slideRef, {
      toValue: 0,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  const slideOut = () => {
    Animated.timing(slideRef, {
      toValue: 1000,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {showView ? (
        <Animated.View style={[style, { position: 'relative', right: slideRef, opacity: fadeRef }]}>
          {children}
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
}
