import { ScrollView, Image, SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import { LoremIpsum, Avatar } from 'react-lorem-ipsum';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import AntDesign from 'react-native-vector-icons/AntDesign';


export default function Search({ navigation }) {
    const loadedFonts = loadFonts();
    const dispatch = useDispatch();
  
    if (!loadedFonts) return <></>;
  
    return (
      <View style ={{flex: 1}}>
        <ScrollView style ={styles.scrollView}>
          <View style = {styles.container}>
            <View style= {styles.header}>
              <View style={styles.text}>
                <Text style={styles.title}>Search</Text>
                <Text style= {styles.text}>Where are you heading?</Text>
              </View>
              <View style = {styles.border}>
              </View>
            </View>  
        <View style = {styles.catalogue}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style= {styles.text}>XXX results</Text>
            <AntDesign name='filter' size={20} color='black' />
            </View>
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