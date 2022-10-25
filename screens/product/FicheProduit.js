import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase, Animated } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import Coeur from '../../components/icons/coeur'
import Cross from '../../components/icons/cross'
import Scroll from '../../components/icons/scrollDown';


export default function FicheProduit({ }) {
  const loadedFonts = loadFonts();
  const dispatch = useDispatch();
  const [progress, setProgress] = useState(1);

  const image = {uri : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/balibackground_zhvjoa.jpg'}
  if (!loadedFonts) return <></>;

  return (
        <View style ={styles.scrollView } fillViewport={true}>

        <ImageBackground style = {styles.landing} source={image} resizeMode='cover' >
          <View style= {styles.header}>
              <TouchableOpacity style= {styles.coeurBox}>
                <Coeur />
              </TouchableOpacity>
              <TouchableOpacity style= {styles.crossBox}>
               <Cross />
              </TouchableOpacity>
          </View>

      <View style={styles.recapTrip}>
              <Text style={styles.title}>Plages, temples et farniente</Text>
              <Text style= {styles.text}>Bali </Text>
              <Text style= {styles.text}>Min 12 jours - Max 27 jours</Text>
              <Text style= {styles.text}>A partir de 1500€ </Text>
            </View>
        <View style={styles.details}>
          <Text style={styles.textDetail}>More details</Text>
          <Scroll/>
        </View>
        </ImageBackground>

      </View>

  )
}