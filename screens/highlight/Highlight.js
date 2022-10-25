import { Image, SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import highlightImg from '../../assets/images/highlightImg.jpeg';

export default function Highlight({ navigation }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();

  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
        <Text style={{fontFamily: 'txt'}}>Highlight</Text>
        <View style = {styles.highlightContainer}>
            <Image source = {highlightImg} style = {styles.img}></Image>
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