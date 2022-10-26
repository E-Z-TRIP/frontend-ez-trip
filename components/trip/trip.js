import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites } from '../../reducers/user';


export default function Trip(props) {
  const dispatch = useDispatch();
  const TOKEN = "R1jjTe76KxKzzYm3Hs2w5of88DyxZZoP"
    const navigation = useNavigation();
    const favorites = useSelector((state) => state.user.favorites);
    const isFavorite = false;
    //favorites.some(favorite => favorite.id === props.id);

  
    //function to add the trip to the tripsLiked user database + adding it to the reducer
    const handleLike = () => {
      fetch(`http://192.168.1.96:3000/users/addlike/`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: TOKEN, tripID: '6358edc49ced89a7026c3015' }),
		}).then(response => response.json())
			.then(data => {
				dispatch(addFavorites(data))
			});
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
            <AntDesign name='heart' size={18}  color={isFavorite ? "yellow" : "white"} onPress={() => handleLike()}/>
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