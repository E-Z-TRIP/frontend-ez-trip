import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import perouImg from '../../assets/images/perou.jpeg';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function Trip(props) {
    // console.log("props", props.included)
    return (
      <View style={styles.container}>
        <ImageBackground imageStyle={{ borderRadius: 15}} source={{uri: props.background}} style = {styles.imgbackground}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style = {styles.topInfos}>
            <Text style = {styles.title}>{props.name}</Text>
            <AntDesign name='heart' size={18} color='white'/>
        </View>
        <Text style = {{fontFamily: 'txt', fontWeight: 'bold', color: 'white'}}>{props.country}</Text>
        </LinearGradient>

        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        start={[1, 1]}
        end={[1, 0]}
        style={{height : '33%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style= {styles.bottomInfo}>
            <Text style = {styles.text}>from {props.start} to {props.end}</Text>
            <Text style = {styles.text}>From {props.price}€</Text>
        </View>
        </LinearGradient>

        </ImageBackground>
      </View>
    );
  }