import { ScrollView, View, Text, Linking, Image, ImageBackground, TouchableOpacity } from 'react-native';
import { useState, useEffect } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import Contact from '../../components/icons/contact';
import SwipeLeft from '../../components/icons/swipeleft';
import TripPlaned from '../../components/icons/tripplaned';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Trip from '../../components/trip/trip';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useDispatch, useSelector } from 'react-redux';

export default function MyTrips({ navigation }) {
  //constantes générales
  const tripLiked = useSelector((state) => state.user.favorites);
  const TOKEN = useSelector((state) => state.user.value.token);
  const favorites = useSelector((state) => state.user.favorites);

  //store les trips à display (liked + booked)
  const [tripsLiked, setTripsLiked] = useState([]);
  const [tripsBooked, setTripsBooked] = useState([]);

  useEffect(() => {
    //GET THE TRIPS LIKED BY THE USER
    fetch(`${serverURL}/users/like/${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
          console.log('fetch of liked trips successful on MyTrips');
          setTripsLiked(data.tripsLiked);
        } else {
          console.log('Fetch of trips failed on MyTrips.');
        }
      });

    //GET THE TRIPS BOOKED BY THE USER
    fetch(`${serverURL}/orders/${TOKEN}`)
      .then((response) => response.json())
      .then((response) => {
        if (response.result) {
          const bookedTrips = []
          console.log('Fetch of booked trips successful on MyTrips');
          for (let order of response.data) {
            //Si les orders sont en statut Validated, on les ajoute à tripsBooked.
            if (order.status === 'Validated') {
              bookedTrips.push(order)
            }
          }
          setTripsBooked(bookedTrips);
        }
        //si data.result = false, le fetch a failed
        else {
          console.log('Fetch of booked trips failed on MyTrips.');
        }
      });
  }, []);

  // useEffect(() => {
  // }, [tripsLiked])

  //---------------- MAP LIKED TRIPS  ----------------

  //if tripsLiked is empty, just show a default Text div.
  let likedTrips = <Text style={{ fontFamily: 'txt' }}>No liked trip yet. Book one now! </Text>;
  if (tripsLiked) {
    likedTrips = tripsLiked.map((data, i) => {
      const isFavorite = favorites.some((favorite) => favorite.id === data.id);
      return (
        <View key={i} style={styles.tripContainer}>
          <Trip {...data} id={data._id} isFavorite={isFavorite}></Trip>
        </View>
      );
    });
  }

  // ---------------- MAP PLANED TRIPS ----------------

  //if tripsBooked is empty, just show a default Text div.
  let planedTrips = <Text style={{ fontFamily: 'txt' }}>No planned trip yet. Book one now! </Text>;
  if (tripsBooked && tripsBooked.length > 0) {
    planedTrips = tripsBooked.map((data, i) => {
      let start = data.start.slice(5, 10);
      let end = data.end.slice(5, 10);
      return (
        <View key={i} style={styles.tripContainer}>
          <Trip
            id={data._id}
            price={data.totalPrice}
            country={data.trip.country}
            background={data.trip.background}
            name={data.trip.name}
            start={start}
            end={end}></Trip>
        </View>
      );
    });
  }

  //*FONT CODE
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <Text style={styles.title}>My trips</Text>
      </View>
      {/* ---------------- LIKED TRIPS ---------------- */}
      <View style={styles.cont}>
        <View style={styles.sousHeader}>
          <AntDesign name='heart' size={23} color={'black'} />
          <Text style={styles.smallTitle}>Liked trips</Text>
        </View>
        <View style={styles.border}></View>
        <ScrollView horizontal={true} style={styles.galleryContainer}>
          {likedTrips}
        </ScrollView>
        <View style={{ marginTop: -16, zIndex: 1, top: -150, left: 340 }}>
          {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
          {/* {tripsLiked.length > 1 ? <SwipeLeft /> : false}    */}
        </View>
        <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 210, top: 25, left: '82%' }}></LinearGradient>
      </View>

      {/* ---------------- PLANED TRIPS ---------------- */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sousHeader}>
          <TripPlaned />
          <Text style={styles.smallTitle}>Planned trips</Text>
        </View>
        <View style={styles.border}></View>
        <ScrollView horizontal={true} style={styles.galleryContainer}>
          {planedTrips}
        </ScrollView>
        <View style={{ marginTop: -16, zIndex: 1, top: -150, left: 350 }}>
          {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
          {/* {tripsBooked.length > 1 ? <SwipeLeft /> : false} */}
        </View>
        {/* ---------------- WHITE GRADIENT ON THE RIGHT OF THE SCROLL LEFT ---------------- */}
        <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 212, top: '19.5%', left: '82%' }}></LinearGradient>
         <TouchableOpacity style={styles.documentBtn} onPress={() => navigation.navigate('MyDocuments')}>
          <Text style={styles.documentBtnTxt}>View documents</Text>
          </TouchableOpacity>
      </View>

      {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
      <View style={{ height: 70 }}></View>
      <BottomToolbar />
    </View>
  );
}
