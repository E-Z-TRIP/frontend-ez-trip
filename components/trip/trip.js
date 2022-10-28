import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites } from '../../reducers/user';


export default function Trip(props) {
  console.log(props.isFavorite, props.id)
  const dispatch = useDispatch();
  const TOKEN = "R1jjTe76KxKzzYm3Hs2w5of88DyxZZoP"
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.user.favorites);

    //function to add the trip to the tripsLiked user database + adding it to the reducer
    const handleLike = () => {
      console.log('trip liked');
      fetch(`http://192.168.10.135:3000/users/addlike`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({ token: TOKEN, tripID: '6358edc49ced89a7026c3019' }),
		}).then(response => response.json())
			.then(data => {
        if (data.result) {
          console.log(data.tripLiked);
          console.log('reducer favorite', favorites)
          dispatch(addFavorites(data.tripLiked))
        }
        else {
          console.log('no data from fetch'); 
          console.log(data.error);
        }
			});
    }
    
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product')}>
        <ImageBackground imageStyle={{ borderRadius: 15}} source={{uri: props.background}} style = {styles.imgbackground}>
        <LinearGradient 
        colors={['rgba(0,0,0,0.5)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style = {styles.topInfos}>
            <Text style = {styles.title}>{props.name}</Text>
            <AntDesign name='heart' size={18}  color={props.isFavorite ? "#F5612F" : "white"} onPress={() => handleLike()}/>
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