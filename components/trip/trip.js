import { ImageBackground, TouchableOpacity, View, Text } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import perouImg from '../../assets/images/perou.jpeg';


export default function Trip({}) {
    return (
      <View style={styles.container}>
        <ImageBackground imageStyle={{ borderRadius: 15}} source={perouImg} style = {styles.imgbackground}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
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
      </View>
    );
  }