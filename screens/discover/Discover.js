import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Highlight from '../highlight/Highlight';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';


export default function Discover({ navigation }) {
  const loadedFonts = loadFonts();

  if (!loadedFonts) return <></>;

  return (
    <View style ={{flex: 1}}>
      <ScrollView style ={styles.scrollView}>
        <View style = {styles.container}>
          <View style= {styles.header}>
            <View style={styles.text}>
              <Text style={styles.title}>Discover</Text>
              <Text style= {styles.text}>Where are you heading?</Text>
            </View>
            <View style = {styles.border}>
            </View>
          </View>

      <View style = {styles.highlight}><Highlight/></View>

      <View style = {styles.catalogue}>
      <Text style= {styles.text}>Our recommendations</Text>
    <View style = {styles.tripContainer}>
      <Trip></Trip>
      <Trip></Trip>
      <Trip></Trip>
    </View>
      </View>
      </View>
    </ScrollView>
    <BottomToolbar></BottomToolbar>
    <View style={{height: 70}}></View>
    </View>
  )
}