import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Highlight from '../highlight/Highlight';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';


export default function Discover({ navigation }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(1);

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

      <View style = {styles.tripContainer}>
      <Text style= {styles.text}>Our recommendations</Text>
      </View>
      </View>
    </ScrollView>
    <BottomToolbar></BottomToolbar>
    </View>
  )
}