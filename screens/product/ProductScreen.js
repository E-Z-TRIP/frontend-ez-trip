import {Animated, createAnimatedComponent,SafeAreaView, View, FlatList, Text, ImageBackground, TouchableOpacity, Modal} from 'react-native';
import styles from './style.css';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { serverURL } from '../../api/backend_request';
import { Directions, ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Cross from '../../components/icons/cross';
import * as Network from 'expo-network';
import Scroll from '../../components/icons/scrollDown';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { addFavorites, deleteFavorite } from '../../reducers/user';
import { getMonthName } from '../../assets/helpers';
import Slideshow from 'react-native-image-slider-show';



export default function ProductScreen({ navigation, route: { params: props } }) {
  //collapsible header 
  // const scrollY = new Animated.Value(0);
  // const diffClamp = Animated.diffClamp(scrollY, 0,405)
  // const translateY = diffClamp.interpolate({
  //   inputRange:[0,300],
  //   outputRange:[0,-300]
  // })
  
     /* ---------------- INITIALISATION DES CONSTANTES ----------------  */
  const dispatch = useDispatch();
    //store toutes les données du trip fetché au chargement du composant
  const [trip, setTrip] = useState(null);
  const [lat, setLat] = useState(48.866667)
  const [lon, setLon] = useState(2.333333)
  const loadedFonts = loadFonts();
  //fait apparaître / disparaître la Modal
  const [modalVisible, setModalVisible] = useState(false);
  //détermine le programme à display
  const [detailedProgram, setDetailedProgram] = useState(null);
  //gère les likes
  const [favorite, setFavorite] = useState(false)
  const favorites = useSelector((state) => state.user.favorites);
  //Token utilisateur
  const TOKEN = useSelector((state) => state.user.value.token);

   /* ---------------- IMPORT DES PROPS A L'INITIALISATION DU COMPOSANT ----------------  */

   useEffect(() => {
  //importe l'état favorite du trip
  setFavorite(props.isFavorite);
  //fetch le trip grâce à l'id reçu en props
  fetch(`${serverURL}/trips/tripById/${props.id}`)
  .then(response => response.json())
  .then(data => {
    if (data.result) {
      setTrip(data.trip)
    }
    else {
      console.log('no trip received')
    }
  })
    //fetch les coordonnées géographiques de la ville de départ du trip
  // .then(data => {
  //   if (trip) {
  //     fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${trip.addressDeparture}&appid=7cecadeb80528d114d059361830568c1`)
  //     .then(response => response.json())
  //     .then(data => {
  //       console.log(data[0].lat, data[0].lon )
  //       setLat(Number(data[0].lat))
  //       setLon(Number(data[0].lon))
  //       console.log(lat, lon);
  //     })
  //     }
  //   })
  }, []);
  
  if (!loadedFonts) return <></>;

  if (!trip) return <></>;


  /* ---------------- DECLARATION DES VARIABLES DYNAMIQUES ----------------  */
  const name = trip.name;
  const price = trip.program[0].price;
  const photos = trip.photos;
  const minDay = trip.program[0].nbday
  const maxDay = trip.program[trip.program.length - 1].nbday
  const startMonth = getMonthName(trip.travelPeriod[0].start);
  const endMonth = getMonthName(trip.travelPeriod[0].end);
  const heart = <AntDesign name='heart' size={25}  borderOuterOutlined='black' color={favorite? "#F5612F" : "white"} onPress={() => handleLike()}/>
  
    /* ---------------- DISPLAY PROGRAM DYNAMICALLY ----------------  */

// to display buttons for programs
const programSetter = (data) => {
  detailedProgram ? setDetailedProgram(data.nbday) : setDetailedProgram(null)
//selon le jour cliqué, afficher le detailed program correspondant
}

//displaying the right program dynamically. 
///!\ goodProgram est asynchrone, s'il ne s'affiche pas encore programDisplay est une View vide (évite les bugs)
const goodProgram = trip.program.find(e => e.nbday === detailedProgram);
let programDisplay = () => {
  return (<View></View>)
}
if (goodProgram) {
  programDisplay =  
  goodProgram.detailedProgram.map((day, i) => {
  return(
    <View key={i} style={styles.program}>
      <Text style={styles.programKey}>Day : <Text style={styles.programValue}>{day.day}</Text></Text>
      <Text style={styles.programKey}>Activities : <Text style={styles.programValue}>{day.activities}</Text></Text>
    </View>
  )
 })
}

// DISPLAY NBDAYS PROGRAM FORMAT BOUTON 
  const nbDaysButtons = trip.program.map((data, i) => {

    return (
      <TouchableOpacity 
      onPress={() => programSetter(data)} 
       style={styles.nbDaysModal} key={i}>
        <Text>{data.nbday} days</Text>
      </TouchableOpacity>
    );
  });

    /* ---------------- DISPLAY TAGS DYNAMICALLY ----------------  */

  const tags = trip.tags.map((data, i) => {
    return (
      <TouchableOpacity
      //  onPress={() => programDisplay(data)} 
       style={styles.tagsModal} key={i}>
        <Text>{data}</Text>
      </TouchableOpacity>
    );
  });

      /* ---------------- DISPLAY INCLUDED / NON-INCLUDED DYNAMICALLY ----------------  */
  const included = trip.included.map((e,i) => {
    return(<Text key={i}>{e}</Text>)
  })

  const nonIncluded = trip.nonIncluded.map((e,i) => {
    return(<Text key={i}>{e}</Text>)
  })
    /* ---------------- HANDLE LIKE/UNLIKE DYNAMICALLY ----------------  */

  const handleLike = () => {
    if (favorite)  {
      console.log('déjà liké!')
      //supprime en BDD
      fetch(`${serverURL}/users/like`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: TOKEN, tripID: props.id }),
    })
    .then(response => response.json())
    .then(data => {

      if (data.result) {
        //une fois supprimé en BDD, supprime dans le reducer 
        dispatch(deleteFavorite(props.id));
        console.log('fetch successful + supprimé du reducer');
        setFavorite(false);
      }

      else {
        console.log('no data from fetch'); 
      }
    });
    }
    else {
      console.log('trip liked');
      //rajout dans la BDD
      fetch(`http://192.168.131.88:3000/users/addlike`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token: TOKEN, tripID: props.id }),
    }).then(response => response.json())
      .then(data => {
        console.log(data)
        if (data.result) {
          //rajout dans le reducer
          dispatch(addFavorites(data.tripLiked))
          setFavorite(true)
        }
        else {
          console.log('no data from fetch'); 
        }
      });
    }
  }
    /* ---------------- PHOTOS CARROUSSEL ----------------  */

let urls = []
let photoDisplayed = trip.photos.map((e, i) => {
  urls.push({url: e})
})


/////////FINAL RETURN//////////

  return (
    <View style={styles.scrollView} key={props.propsKey}> 
{/* ---------------- LANDING PAGE PHOTO BACKGROUND + INFOS PRINCIPALES ---------------- */}
      <ImageBackground style={styles.landing} source={{uri: trip.background}} resizeMode='cover'>

{/* ---------------- HEADER BOUTONS LIKE ET RETOUR PAGE RECHERCHE ---------------- */}
        <View style={styles.header}>
          <TouchableOpacity style={{marginRight: 20}} >
            {heart}
          </TouchableOpacity>
          <TouchableOpacity style={styles.crossBox}>
            <Cross onPress={() => setTimeout(navigation.goBack(null), 0)} />
          </TouchableOpacity>
        </View>

{/* ---------------- RECAP TRIP  ---------------- */}
        <View style={styles.recapTrip}>
          <Text style={styles.title}>{name}</Text>
          <Text style={styles.country}>{trip.country}</Text>
          {(minDay == maxDay) ? <Text style={styles.text}>{minDay} days</Text> : <Text style={styles.text}>From {minDay} days to {maxDay} days</Text>}
          <Text style={styles.text}>Starting from {price}€ </Text>
        </View>
        <TouchableOpacity style={styles.details} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textDetail}>More details</Text>
          <Scroll />
        </TouchableOpacity>
      </ImageBackground>
{/* ---------------- MODAL = FICHE PRODUIT ---------------- */}

      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

          <View  style={styles.modal}>
      <ScrollView
      style={styles.scrollViewModal}>
      {/* header modal */}
        {/* <Animated.View style={{
          transform:[{translateY:translateY}],
          elevation: 4,
          zIndex:-1,
        }}> */}
{/* ---------------- CAROUSSEL PHOTOS ---------------- */}

          <Slideshow scrollEnabled={false} height={250} style={styles.caroussel}
          dataSource={urls}></Slideshow>

{/* ---------------- ICONS TOP RIGHT ---------------- */}
            <View name="iconContainer" style={{ position: 'absolute', width: '30%', left:'70%', height: '5%', flexDirection:'row', justifyContent:'space-between', padding: 25, alignItems: 'center', marginRight: 15}}>
              {heart}
              <Cross style={{marginLeft: 15}} onPress={() => console.log('hello')} />
            </View>

        {/* </Animated.View> */}
        {/* body modal */}
              {/* // scrollEventThrottle={16}
              // onScroll={(e) =>{ */}
              {/* //   console.log("e.nativeEvent.contentOffset.y",e.nativeEvent.contentOffset.y,"scrollY",scrollY,"diffClamp",diffClamp);
              //     scrollY.setValue(e.nativeEvent.contentOffset.y)}} */}

{/* ---------------- HEADER INFOS PRINCIPALES ---------------- */}
            <View name="infosModal" style={{padding: 15}}>
              {/* ---------------- HEADER TITRE + PAYS ---------------- */}
            <View style={styles.headerModal}>
              <Text style={styles.title}>{trip.name}</Text>
              <Text style={styles.country}>{trip.country}</Text>
              <View style={styles.border}></View>
            </View>
             {/* ---------------- CARTE INFOS ORANGE + PARTENAIRE ---------------- */}
            <View style={styles.infoContainerModal}>
              <View style={{width: '60%', backgroundColor: '#C46B4D', width: '60%', padding: 10}}>
                {minDay == maxDay ?<Text style={{color: 'white'}}>{minDay} days</Text> : <Text style={{color: 'white'}}>From {minDay} days to {maxDay} days</Text>}
                <Text style={{color: 'white'}}>Travel period: {startMonth}<Text> to {endMonth}</Text></Text>
                <Text style={{color: 'white'}}>Starting from {price}€</Text>
              </View>
              <View style={{flex: 1, flexDirection: 'row', justifyContent:'flex-end'}}>
              <Text style={styles.offeredByModal}>Offered by <Text style={{textDecoration: 'underline'}}>EZTRIP</Text></Text>
              </View>
            </View>
{/* ---------------- INCLUDED/NOT INCLUDED ---------------- */}
            <View style={{flex:1, flexDirection: 'row', justifyContent:'space-between'}}>
              <View name="included" style={{width: '50%', marginRight: 5}}>
                <Text style={styles.smallTitle}>Included :</Text>
                <View style={{width: '100%'}}>{included}</View>
              </View>
            
              <View name="nonIncluded" style={{marginRight: 5, width: '50%'}}>
                <Text style={styles.smallTitle}>Not included :</Text>
                <View style={{width: '100%'}}>{nonIncluded}</View>
              </View>
            </View>
           
{/* ---------------- MAP LOCALISATION ---------------- */}
            <View name = "localisation" style={{justifyContent:'center'}}>
            <Text style={styles.smallTitle}>Localisation :</Text>
            <MapView
              loadingBackgroundColor='#C46B4D'
              tintColor='#C46B4D'
              style={styles.map}
              mapType='mutedStandard'
              initialRegion={{
                latitude: lat,
                longitude: lon,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
              </View>
{/* ---------------- DESCRIPTION TRIP ---------------- */}
{/* si on a le temps voir pour un "showmore"/"showless" pour pas avoir des descriptions a rallonge */}


            <Text style={styles.smallTitle}>Description :</Text>
            <Text numberOfLines={5} ellipsizeMode='tail' style={styles.inclusModal}>
              {trip.description}{' '}
            </Text>

{/* ---------------- PROGRAMME ---------------- */}
            <Text style={styles.smallTitle}>Program :</Text>
            <View style={styles.nbDaysContainer}>{nbDaysButtons}</View>
            {detailedProgram ? programDisplay : false}

{/* ---------------- TAGS ---------------- */}

            <Text style={styles.smallTitle}>Tags :</Text>
            <View style={styles.tagsContainer} >{tags}</View>
            <View style={styles.buttonsContainer}>

{/* ---------------- BOUTONS QUOTATION ET DOWNLOAD ---------------- */}

              <TouchableOpacity style={styles.quotationButton} >
                <Text style={styles.buttonTextQuotation}>Quotation request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.programButton}>
                <Text style={styles.buttonTextProgram}>Download program (PDF)</Text>
              </TouchableOpacity>
              </View>
            </View>

{/* ---------------- ALL THE CODE HAS TO GO OVER THIS LINE ---------------- */}

{/* ---------------- FOOTER BOTTOM BAR ---------------- */}
            <View style={{ height: 90 }}></View>
          </ScrollView>
        {/* </ScrollView> */}
        </View>
        <BottomToolbar></BottomToolbar>
      </Modal>
    </View>
  );
}
