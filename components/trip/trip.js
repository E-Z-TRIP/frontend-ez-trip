import { ImageBackground, TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import { LinearGradient } from 'expo-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { serverURL } from '../../api/backend_request';
import { getMonthName } from '../../assets/helpers';


export default function Trip(props) {
  //constantes générales
  const dispatch = useDispatch();
  const TOKEN = useSelector((state) => state.user.value.token);
  const navigation = useNavigation();
  let favorites = useSelector((state) => state.user.favorites);

  //constantes pour faciliter l'intégration des props
  //prends en compte le scénario de l'ajout de la carte via My Quotations (qui n'envoie pas les mêmes infos)
  let start = props.travelPeriod ? getMonthName(props.travelPeriod[0].start) : props.start;
  let end = props.travelPeriod ? getMonthName(props.travelPeriod[0].end) : props.end;
  let price = props.price ? props.price : props.program[0].price;

  //function to add the trip to the tripsLiked user database + adding it to the reducer
  const handleLike = () => {
    console.log('props.id in trip.js', props.id);
    //si le like se trouve déjà dans le reducer (et donc en BDD), on le supprime
    if (favorites.some((favorite) => favorite === props.id)) {
      console.log('déjà liké!');
      //supprime en BDD
      fetch(`${serverURL}/users/like`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //une fois supprimé en BDD, supprime dans le reducer
            dispatch(deleteFavorite(props.id));
            console.log('fetch successful + supprimé du reducer');
          } else {
            console.log('no data from fetch');
          }
        });
    }

    //si le trip.id n'est pas trouvé, on le rajoute en BDD + dans le reducer favorite
    else {
      console.log('trip liked');
      //rajout dans la BDD
      fetch(`${serverURL}/users/like`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token: TOKEN, tripID: props.id }),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.result) {
            //rajout dans le reducer
            dispatch(addFavorites(props.id));
          } else {
            console.log(data.error);
          }
        });
    }
  };

  // ---------------- HANDLE NAVIGATION : TO PRODUCT SCREEN OR QUOTATION DISPLAY ----------------

  const handleNavigation = () => {
    //props.price est un props directement passé quand la carte display un order, et pas un trip. Quand c'est un trip, le price est accessible à trip.program[0].price.
    if (props.price) {
      navigation.navigate({ name: 'Quotation_Display', params: { id: props.id }, merge: true });
    } else {
      navigation.navigate('Product', {
        propsKey: props.propsKey,
        key: props.propsKey,
        id: props.id,
        isFavorite: props.isFavorite,
      });
    }
  };

  const styles = StyleSheet.create({
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 0, height: 3},
        shadowOpacity: 0.4,
        shadowRadius: 2,
      },})

  return (
    <DropShadow style={styles.shadowProp}>
    <TouchableOpacity style={styles.container} onPress={() => handleNavigation()}>
      <ImageBackground
        imageStyle={{ borderRadius: 15 }}
        source={{ uri: props.background }}
        style={styles.imgbackground}>
        <LinearGradient
          colors={['rgba(0,0,0,0.6)', 'transparent']}
          style={{
            height: '40%',
            width: '100%',
            padding: 15,
            borderRadius: 15,
            position: 'absolute',
          }}></LinearGradient>

        <View name='topBlock' style={{ flex: 1, padding: 5, height: '10%', margin: 10, marginTop: 15 }}>
          <View style={styles.topInfos}>
            <View style={{ width: '85%', flexDirection: 'row', flexwrap: 'wrap' }}>
              <Text style={styles.title}>{props.name}</Text>
            </View>
            <AntDesign
              name='heart'
              size={18}
              color={props.isFavorite ? '#F5612F' : props.isFavorite === undefined ? 'transparent' : 'white'}
              onPress={() => handleLike()}
            />
          </View>
          <Text style={{ fontFamily: 'txtBold', color: 'white', marginTop: -2 }}>{props.country}</Text>
        </View>

        <LinearGradient
          colors={['rgba(0,0,0,0.5)', 'transparent']}
          start={[1, 1]}
          end={[1, 0]}
          style={{ height: '38%', width: '100%', padding: 15, borderRadius: 15 }}>
          <View style={styles.bottomInfo}>
            <Text style={{ color: 'white', width: '73%' }}>
              From {start} to {end}
            </Text>
            {props.price ? (
              <Text style={styles.text}>
                Total price: <Text style={{ fontFamily: 'txtBold' }}>{price}</Text>€
              </Text>
            ) : (
              <Text style={styles.text}>
                From <Text style={{ fontFamily: 'txtBold' }}>{price}</Text>€
              </Text>
            )}
          </View>
        </LinearGradient>
      </ImageBackground>
    </TouchableOpacity>
    </DropShadow>
  );
}
