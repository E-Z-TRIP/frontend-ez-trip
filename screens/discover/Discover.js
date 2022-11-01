import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import { selectUser } from '../../reducers/user';
import Highlight from '../highlight/Highlight';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import { getMonthName } from '../../assets/helpers';
import { addFavorites, setFavorites } from '../../reducers/user';
import { serverURL } from '../../api/backend_request';
import { dismountUser } from '../../reducers/user';

export default function Discover({ navigation }) {
  const dispatch = useDispatch();
  //STATE TO STORE ALL THE TRIPS TO DISPLAY
  const [tripsData, setTripsData] = useState([]);
  const favorites = useSelector((state) => state.user.favorites);
  const TOKEN = useSelector((state) => state.user.value.token);
  //GET ALL THE TRIPS WHEN LOADING THE SCREEN + FAVORITES OF THE USER TO SAVE IN THE REDUCER
  useEffect(() => {
    //GET ALL THE TRIPS
    fetch(`${serverURL}/trips`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          setTripsData(data.trips);
        } else {
          console.log('Fetch of trips failed.');
        }
      });

    //SAVE ALL THE FAVORITES IN THE REDUCER
    fetch(`${serverURL}/users/like/${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('reducer initialized successfully');
          dispatch(setFavorites(data.tripsLiked));
        } else {
          console.log('reducer failed on initialisation');
        }
      });
  }, []);

  //MAKE SURE THE FONTS ARE LOADED
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;


  //MAP TO DISPLAY ALL THE TRIPS
  const trips = tripsData.map((data, i) => {
    //convert number into month's names
    let start = getMonthName(data.travelPeriod[0].start);
    let end = getMonthName(data.travelPeriod[0].end);
    return (
      <View key={i} style={{ height: 180 }}>
        <Trip propsKey={i} id={data._id} {...data} isFavorite={favorites.some((favorite) => favorite === data._id)} />
      </View>
    );
  });

  //FINAL RETURN
  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.text}>
              <Text style={styles.title}>Discover</Text>
              <Text style={styles.text}>Choose your next adventure.</Text>
            </View>
            <View style={styles.border}></View>
          </View>

          <View style={styles.highlight}>
            <Highlight />
          </View>

          <View style={styles.catalogue}>
            <Text style={styles.text}>Our recommendations</Text>
            {trips}
          </View>
        </View>
      </ScrollView>
      <BottomToolbar />
      <View style={{ height: 70 }}></View>
    </View>
  );
}
