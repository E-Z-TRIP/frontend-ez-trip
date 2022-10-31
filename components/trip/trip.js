import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { serverURL } from '../../api/backend_request';

export default function Trip(props) {
  const dispatch = useDispatch();
  const TOKEN = useSelector((state) => state.user.value.token);
  const navigation = useNavigation();
  const favorites = useSelector((state) => state.user.favorites);

    //function to add the trip to the tripsLiked user database + adding it to the reducer
    const handleLike = () => {
      //si le like se trouve déjà dans le reducer (et donc en BDD), on le supprime
      if (favorites.some(favorite => favorite === props.id)) {
        console.log('déjà liké!')
        //supprime en BDD
        fetch(`${serverURL}/users/like`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      })
      .then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          //une fois supprimé en BDD, supprime dans le reducer 
          dispatch(deleteFavorite(props.id))
          console.log('fetch successful + supprimé du reducer')
        }
        else {
          console.log('no data from fetch'); 
        }
      });
      }

      //si le trip.id n'est pas trouvé, on le rajoute en BDD + dans le reducer favorite
      else {
        console.log('trip liked');
        //rajout dans la BDD
        fetch(`http://192.168.131.88:3000/users/addlike`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      }).then(response => response.json())
        .then(data => {
          if (data.result) {
            //rajout dans le reducer
            dispatch(addFavorites(data.tripLiked))
          }
          else {
            console.log('no data from fetch'); 
          }
        });
      }
    }
    
    return (
      <TouchableOpacity style={styles.container} onPress={() => navigation.navigate('Product', {id: props.id, isFavorite: props.isFavorite})}>
        
        <ImageBackground imageStyle={{borderRadius: 15}} source={{uri: props.background}} style = {styles.imgbackground}>
          <LinearGradient 
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={{height : '40%', width : '100%', padding: 15, borderRadius: 15, position: 'absolute'}}>
          </LinearGradient>

          <View name="topBlock" style={{flex: 1, padding: 5, height: '10%', margin: 10, marginTop: 15}}>
            <View style = {styles.topInfos}>
                <Text style = {styles.title}>{props.name}</Text>
                <AntDesign name='heart' size={18}  color={props.isFavorite ? "#F5612F" : "white"} onPress={() => handleLike()}/>
            </View>
            <Text style = {{fontFamily: 'txt', fontWeight: 'bold', color: 'white', marginTop: 5}}>{props.country}</Text>
          </View>
         
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