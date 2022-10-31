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



  export default function MyTrips() {

    const TOKEN = 'OG7sCHy8L3Ht6CF6h-IXd3twF9QGkVRR';

    // A REMPLACER PAR UN FETCH 
const data = [{
        photo : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/Bali1_bat19s.jpg',
        titre : 'Bali the pretty',
        prix: 'from 2500€'
    },
    {
        photo : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/QuetenaChico_rf9h4j.jpg',
        titre : 'Quetena Chico',
        prix: 'from 2500€'
    },
    {
        photo : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/flamants_laguna_colorada_dkspjf.jpg',
        titre : 'Laguna Colorada',
        prix: 'from 2500€'
    },
    {
        photo : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/incahuasi_wx6a2w.jpg',
        titre : 'Incahuasi',
        prix: 'from 2500€'
    },
    {
        photo : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666626183/machu-picchu_fc90cz.jpg',
        titre : 'Machu Picchu',
        prix: 'from 2500€'
    },
]
    // FIN 

//---------------- MAP LIKED TRIPS  ----------------
 const likedTrips = data.map((data, i) => {
    return (
        <View style={styles.pdfContainer}>
            <TouchableOpacity  >
                <ImageBackground  imageStyle={{ borderRadius: 15}} style={styles.imgBackground} source={{uri: data.photo, width:500, height:300}} alt={data.titre}>
                <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
            <View style = {styles.topInfos}>
            <Text style={styles.titleCard} >{data.titre}</Text>
            </View>
 </LinearGradient>
 <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        start={[1, 1]}
        end={[1, 0]}
        style={{height : '33%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style= {styles.bottomInfo}>
            <Text style = {styles.cardInfos}>from December to July</Text>
            <Text style = {styles.cardInfos}>From {data.prix}</Text>
        </View>
        </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
 })
//  useEffect(() => {
//  fetch(`${serverURL}/users/like/${TOKEN}`)
//  .then((response) => response.json())
//  .then((data) => {
//    if (data.result) {
//      console.log(data)
//    } else {
//      console.log('reducer failed on initialisation');
//    }
//  });
// }, []);
 

 // ---------------- map TravelAgencyDocuments ----------------
 const planedTrips = data.map((data, i) => {
    return (
        <View style={styles.pdfContainer}>
            <TouchableOpacity  >
                <ImageBackground  imageStyle={{ borderRadius: 15}} style={styles.imgBackground} source={{uri: data.photo, width:500, height:300}} alt={data.titre}>
                <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        style={{height : '40%', width : '100%', padding: 15, borderRadius: 15}}>
            <View style = {styles.topInfos}>
            <Text style={styles.titleCard} >{data.titre}</Text>
            </View>
 </LinearGradient>
 <LinearGradient 
        colors={['rgba(0,0,0,0.8)', 'transparent']}
        start={[1, 1]}
        end={[1, 0]}
        style={{height : '33%', width : '100%', padding: 15, borderRadius: 15}}>
        <View style= {styles.bottomInfo}>
            <Text style = {styles.cardInfos}>from December to July</Text>
            <Text style = {styles.cardInfos}>From {data.prix}</Text>
        </View>
        </LinearGradient>
                </ImageBackground>
            </TouchableOpacity>
        </View>
    )
 })


//*FONT CODE
    const loadedFonts = loadFonts();
    if (!loadedFonts) return <></>;

return (

<View style={{ flex: 1 }}>
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
        <View>
            <ScrollView horizontal={true} style={styles.galleryContainer}>
                {likedTrips}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -150, left: 380, }} >
            <SwipeLeft />
            </View>
           
        </View>
    </View>

{/* ---------------- PLANED TRIPS ---------------- */}
<View style={styles.cont}>
    <View style={styles.sousHeader} >
        <TripPlaned/>
        <Text style={styles.smallTitle}>Planed trips</Text>
    </View>
        <View>
        <ScrollView horizontal={true} style={styles.galleryContainer}>

                {planedTrips}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -150, left: 380, }} >
            <SwipeLeft />
            </View>
        </View>
    </View>

{/* ---------------- FOOTER BOTTOM BAR ---------------- */}
    </View>
  <View style={{ height: 90 }}></View>
  <BottomToolbar></BottomToolbar>
</View>

  )}