import { Image, SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import highlightImg from '../../assets/images/highlightImg.jpeg';

export default function Highlight({ navigation }) {
  const loadedFonts = loadFonts();

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      <Text style={{ fontFamily: 'txt' }}>Highlight</Text>
      <View style={styles.highlightContainer}>
        <ImageBackground imageStyle={{ borderRadius: 15 }} source={{uri: 'https://images.unsplash.com/photo-1517411032315-54ef2cb783bb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=465&q=80'}} style={styles.img}>
          <LinearGradient
            start={[1, 1]}
            end={[1, 0]}
            colors={['rgba(0,0,0,0.3)', 'transparent']}
            style={{ height: '100%', width: '100%', borderRadius: 15 }}></LinearGradient>
        </ImageBackground>

        <View style={styles.infoContainer}>
          <Text style={styles.title}>Norway fjords and northern lights</Text>
          <Text style={{ fontFamily: 'txt', fontWeight: 'bold', marginBottom: 5 }}>20 jan. - 28 feb. 2023</Text>
          <Text style={{ fontFamily: 'txt' }}>
          We have spent decades in search for the most beautiful spots in the north, come join us! 
          We bring you to the right spot at the right time. Come chase the northern lights with us.
          </Text>
        </View>
      </View>
    </View>
  );
}
