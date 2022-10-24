import { View, Text, ImageBackground } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import bgImage from '../../assets/images/hero_background.png';
import { loadFonts } from '../../assets/fonts/fonts';
import { toggleTheme } from '../../reducers/theme';
import { useEffect } from 'react';

export default function OnBoarding({ navigation }) {
  const { onBoarding } = useTheme();
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      <ImageBackground style={styles.bgImage} source={bgImage} resizeMode='cover'>
        <View>
          <Text style={{ ...styles.headerText, color: onBoarding.header }}>EZ</Text>
          <Text style={{ ...styles.headerText, color: onBoarding.header }}>TRIPS</Text>
        </View>
      </ImageBackground>
    </View>
  );
}
