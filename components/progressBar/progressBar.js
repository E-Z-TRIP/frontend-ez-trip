import { Animated, View } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useState, useEffect, useRef } from 'react';

// The progress bar for the on boarding screen
export default function ProgressBar({ slideQty, currentSlide }) {
  const { theme } = useTheme();
  const { onBoarding } = useTheme();
  const width = 300;
  let transition = new Animated.Value((width / slideQty) * currentSlide);

  return (
    <View style={styles.container}>
      <View style={{ ...styles.barBg, backgroundColor: onBoarding.progressBarBg, width: width }}>
        <Animated.View
          style={{
            ...styles.barPos,
            backgroundColor: onBoarding.progressBarPos,
            width: transition,
          }}></Animated.View>
      </View>
    </View>
  );
}
