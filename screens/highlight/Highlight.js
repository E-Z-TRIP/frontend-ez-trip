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
        <Text style={{fontFamily: 'txt'}}>Highlight</Text>
        <View style = {styles.highlightContainer}>
        
        <ImageBackground imageStyle={{ borderRadius: 15}} source = {highlightImg} style = {styles.img}>
        <LinearGradient 
        start={[1, 1]}
        end={[1, 0]}
        colors={['rgba(0,0,0,0.3)', 'transparent']}
        style={{height: '100%', width: '100%', borderRadius: 15}}>
        </LinearGradient>
        </ImageBackground>
        
            <View style={styles.infoContainer}>
                <Text style={styles.title}>Demon island, Tonga</Text>
                <Text style={{fontFamily: 'txt', fontWeight: 'bold', marginBottom: 5}}>20 jan. - 30 fev.</Text>
                <Text style={{fontFamily: 'txt'}}>Lorem ipsum odor amet, consectetuer adipiscing elit. Ac purus in massa egestas mollis varius;
    dignissim elementum. Mollis tincidunt mattis hendrerit dolor eros enim, nisi ligula ornare.
    Hendrerit parturient.</Text>
            </View>
        </View>
    </View>
  )
}