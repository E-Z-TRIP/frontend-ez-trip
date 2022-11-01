import {
    ScrollView,
    View,
    Text,
    Linking,
    Image,
    ImageBackground,
    TouchableOpacity,
  } from 'react-native';
  import { useState, useEffect } from 'react';
  import { LinearGradient } from 'expo-linear-gradient';
  import { loadFonts } from '../../assets/fonts/fonts';
  import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
  import Contact from '../../components/icons/contact';
  import SwipeLeft from '../../components/icons/swipeleft';
  import TripPlaned from '../../components/icons/tripplaned';
  import AntDesign from 'react-native-vector-icons/AntDesign';
  import Trip from '../../components/trip/trip';
  import styles from './style.css'
  import { serverURL } from '../../api/backend_request';
  import { useDispatch, useSelector } from 'react-redux';



  export default function MyTrips() {

    //constantes générales
    const tripLiked = useSelector((state) => state.user.favorites);
    const TOKEN = useSelector((state) => state.user.value.token);
    const favorites = useSelector((state) => state.user.favorites);

    //store les trips à display (liked + booked)
    const [tripsLikedData, setTripsLikedData] = useState([]);
    const [tripsBooked, setTripsBooked] = useState([]);

    useEffect(() => {
    //GET THE TRIPS LIKED BY THE USER
    fetch(`${serverURL}/trips`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
            setTripsLikedData(data.trips)
        }
        else {
          console.log('Fetch of trips failed.')
        }
      })

    //GET THE TRIPS BOOKED BY THE USER

    
    }, []);


//---------------- MAP LIKED TRIPS  ----------------
 const likedTrips = tripsLikedData.map((data, i) => {
    const isFavorite = favorites.some(favorite => favorite.id === data.id)
    return (
            <TouchableOpacity key={i} style={styles.tripContainer} >
                <Trip {...data} isFavorite={isFavorite}></Trip>
            </TouchableOpacity>
    )
 })

 

 // ---------------- MAP PLANED TRIPS ----------------
 const planedTrips = tripsLikedData.map((data, i) => {
    const isFavorite = favorites.some(favorite => favorite.id === data.id)
    return (
        <TouchableOpacity key={i} style={styles.tripContainer} >
                <Trip {...data} isFavorite={isFavorite}></Trip>
            </TouchableOpacity>
    )
 })

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
    <View style={styles.sousHeader} >
    <AntDesign name='heart' size={23}  color={"black"}/>
        <Text style={styles.smallTitle}>Liked trips</Text>
    </View>
    <View style={styles.border}></View>
            <ScrollView horizontal={true} style={styles.galleryContainer}>
            {tripsLikedData.length > 0 ? likedTrips : <Text style={{fontFamily:'txt'}}>You have no favorites yet.</Text>}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -150, left: 340, }} >
            {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
            {tripsLikedData.length > 1 ? <SwipeLeft /> : false}   
            </View>
            <LinearGradient 
        start={{x: 0.75, y: 0.75}} end={{x: 0, y: 0.75}}
        colors={['rgba(255,255,255,0.7)', 'transparent']}
        style={{position: 'absolute', width: 75, height: 210, top: 25, left: '82%'}}></LinearGradient>
    </View>

      {/* ---------------- PLANED TRIPS ---------------- */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sousHeader}>
          <TripPlaned />
          <Text style={styles.smallTitle}>Planed trips</Text>
        </View>
        <View style={styles.border}></View>

        <ScrollView horizontal={true} style={styles.galleryContainer}>
        {tripsBooked.length > 0 ? {planedTrips} : <Text style={{fontFamily:'txt'}}>You have no reservations yet.</Text>}
        </ScrollView>
        <View style={{marginTop: -16, zIndex: 1,top: -150, left: 350, }} >
        {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
         {tripsBooked.length > 1 ? <SwipeLeft /> : false}   
        </View>
        {/* ---------------- WHITE GRADIENT ON THE RIGHT OF THE SCROLL LEFT ---------------- */}
        <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 212, top: '19.5%', left: '82%' }}></LinearGradient>

        {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
      </View>
      <BottomToolbar style={{ width: '100%' }}></BottomToolbar>
      <View style={{ height: 70 }}></View>
    </View>
  );
}
