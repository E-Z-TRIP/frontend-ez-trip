import { useRef, useEffect, useState } from 'react';
import { Animated } from 'react-native';

export default function HorizontalFadeContainer({ style, isVisible, children, speed, direction, progressPos }) {
  let fadeRef = useRef(new Animated.Value(1)).current;
  let slideRef = useRef(new Animated.Value(0)).current;
  const [showView, setShowView] = useState(true);

  useEffect(() => {
    if (progressPos > 1) {
      direction = 'right';
      slideIn();
    }
  }, []);

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
      toValue: 1,
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
      toValue: 500,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  return (
    <>
      {showView ? (
        <Animated.View style={[style, direction === 'left' ? { right: slideRef } : { left: slideRef }]}>
          {children}
        </Animated.View>
      ) : (
        <></>
      )}
    </>
  );
}
