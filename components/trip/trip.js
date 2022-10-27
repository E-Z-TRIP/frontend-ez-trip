import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';


export default function Trip(props) {
    const navigation = useNavigation();
    //function to add the trip to the tripsLiked user database
    const handleLike = () => {

    }
    
    // console.log("props", props.included)
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Trip')}>
        <ImageBackground imageStyle={{ borderRadius: 15}} source={{uri: props.background}} style = {styles.imgbackground}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style = {styles.topInfos}>
            <Text style = {styles.title}>{props.name}</Text>
            <AntDesign name='heart' size={18} color='white' onPress={() => handleLike()}/>
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
      </TouchableOpacity>
    );
  }