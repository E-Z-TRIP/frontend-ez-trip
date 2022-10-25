import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import perouImg from '../../assets/images/perou.jpeg';
import DropShadow from "react-native-drop-shadow";


const style = StyleSheet.create({

  shadowProp: {
    shadowColor: '#17171',
    shadowOffset: {width: 0, height: 5},
    shadowOpacity: 0.2,
    shadowRadius: 1.5,
  }
})

export default function Trip({}) {
    return (
      <View style={styles.container}>
        <DropShadow style={style.shadowProp}>
        <ImageBackground imageStyle={{ borderRadius: 15}} source={perouImg} style = {styles.imgbackground}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{height : '33%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style = {styles.topInfos}>
            <Text style = {styles.title}>Rainbow mountains</Text>
            <Text style = {{fontFamily: 'txt', fontWeight: 'bold', color: 'white'}}>Peru</Text>
        </View>
        
        </LinearGradient>

        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        start={[1, 1]}
        end={[1, 0]}
        style={{height : '33%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style= {styles.bottomInfo}>
            <Text style = {styles.text}>from May to August</Text>
            <Text style = {styles.text}>From 1200€</Text>
        </View>
        </LinearGradient>

        </ImageBackground>
        </DropShadow>
      </View>
    );
  }