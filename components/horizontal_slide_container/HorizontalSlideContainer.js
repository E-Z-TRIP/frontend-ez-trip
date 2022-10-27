import { useRef, useEffect, useState } from 'react';
import { Animated, Dimensions } from 'react-native';
import styles from './styles.css';

export default function HorizontalSlideContainer({ children, speed, direction, currentSlide, slideLength }) {
  const slideRef = useRef(new Animated.Value(0)).current;
  const { width } = Dimensions.get('window');

  useEffect(() => {
    if (direction.direction === 'left' && currentSlide < slideLength) slideLeft();
    else if (direction.direction === 'right' && currentSlide > 1) slideRight();
  }, [direction]);

  const slideLeft = () => {
    Animated.timing(slideRef, {
      toValue: slideRef._value - width,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  const slideRight = () => {
    Animated.timing(slideRef, {
      toValue: slideRef._value + width,
      duration: speed,
      useNativeDriver: false,
    }).start();
  };

  return <Animated.View style={[{ ...styles.slideContainer, width }, { left: slideRef }]}>{children}</Animated.View>;
}
