import {Animated, createAnimatedComponent,SafeAreaView, View, FlatList, Text, ImageBackground, TouchableOpacity, Modal} from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import React, { useState, useRef, useEffect, useCallback } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { serverURL } from '../../api/backend_request';
import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Coeur from '../../components/icons/coeur';
import Cross from '../../components/icons/cross';
// import * as Network from 'expo-network';
import Scroll from '../../components/icons/scrollDown';
import { touchRippleClasses } from '@mui/material';
import { useIsFocused } from "@react-navigation/native";


export default function ProductScreen({ navigation, route: { params: id } }) {
  //collapsible header 
  // const scrollY = new Animated.Value(0);
  // const diffClamp = Animated.diffClamp(scrollY, 0,405)
  // const translateY = diffClamp.interpolate({
  //   inputRange:[0,300],
  //   outputRange:[0,-300]
  // })
  const isFocused = useIsFocused();
  const loadedFonts = loadFonts();
  //fait apparaître / disparaître la Modal
  const [modalVisible, setModalVisible] = useState(false);
  const [detailedProgram, setDetailedProgram] = useState(3);
  const [trip, setTrip] = useState(null);

   /* ---------------- IMPORT DES PROPS A L'INITIALISATION DU COMPOSANT ----------------  */

   useEffect(() => {
  fetch(`${serverURL}/trips/tripById/${id}`)
  .then(response => response.json())
  .then(data => {
    if (data.result) {
      setTrip(data.trip)
    }
    else {
      console.log('reducer failed on initialisation')
    }
  });
}, []);

  
    console.log(trip);

  if (!loadedFonts) return <></>;

  if (!trip) return <></>;

  if (!isFocused) {
    setTrip(null);
  }
/* ---------------- A REMPLACER PAR UN FETCH  DEBUT ----------------  */
  //image background url
  const image = { uri: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/balibackground_zhvjoa.jpg' };
  //images caroussel
  const photos = ['https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/bali3_t80vuq.jpg', 
  'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/Bali1_bat19s.jpg', 
  'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/bali2_x92gur.jpg']

  const program = [
    {
      nbday: 3,
      detailedProgram: [
        {
          day: 1,
          activities: `Accueil à Lima. Transfert vers notre famille d'accueil. Dîner et nuit à Lima.`,
        },
        {
          day: 2,
          activities: `Bus vers Paracas (village pêcheur). Accueillis par Lourdes et Juan (ancien pêcheur) pour visiter la région, la réserve de Paracas et ses plages. Diner et nuit chez eux. `,
        },
        {
          day: 3,
          activities: `Visite en bateau des îles Ballestas, réserve de la faune maritime. Transfert à Huacachina, oasis aux milieux des dunes au coeur d'un des déserts péruviens. Bus de nuit pour Arequipa.`,
        },
      ],
    },
    {
      nbday: 2,
      detailedProgram: [
        {
          day: 1,
          activities: `Accueil à Lima. Transfert vers notre famille d'accueil. Dîner et nuit à Lima.`,
        },
        {
          day: 2,
          activities: `Bus vers Paracas (village pêcheur). Accueillis par Lourdes et Juan (ancien pêcheur) pour visiter la région, la réserve de Paracas et ses plages. Diner et nuit chez eux. `,
        },
      ],
    },
  ];
 const taags = ['Culture', 'Desert', 'Flight included', 'Trek', 'Hotel', 'Latin America']

 /* ---------------- A REMPLACER PAR UN FETCH  FIN ----------------  */



 /* ---------------- FIN ESPACE TRAVAIL ----------------  */


// to display buttons for programs
const programSetter = (data) => {
//selon le jour cliqué, afficher le detailed program correspondant
  setDetailedProgram(data.nbday)
}

const goodProgram = program.find(program => program.nbday === detailedProgram)
const programDisplay = goodProgram.detailedProgram.map((day, i) => {
  return(
    <View style={styles.program}>
      <Text style={styles.programKey}>Day : <Text style={styles.programValue}>{day.day}</Text></Text>
      <Text style={styles.programKey}>Activities : <Text style={styles.programValue}>{day.activities}</Text></Text>
    </View>
  )
 })


// DISPLAY NBDAYS PROGRAM FORMAT BOUTON 
  const nbDaysButtons = program.map((data, i) => {
    return (
      <TouchableOpacity 
      onPress={() => programSetter(data)} 
       style={styles.nbDaysModal} key={i}>
        <Text>{data.nbday} days</Text>
      </TouchableOpacity>
    );
  });

// DISPLAY TAGS FORMAT BOUTON //? EST CE QU'ON FAIT QUE LES TAGS SOIENT CLIQUABLES ET RENVOIE A SEARCH PAR CE TAG LA?

  const tags = taags.map((data, i) => {
    return (
      <TouchableOpacity
      //  onPress={() => programDisplay(data)} 
       style={styles.tagsModal} key={i}>
        <Text>{data}</Text>
      </TouchableOpacity>
    );
  });

/* ---------------- CE QUI EST COMMENTE DANS LE RETURN CEST POUR LE COLLAPSIBLE HEADER ---------------- */
  return (
    <View style={styles.scrollView}> 
{/* ---------------- LANDING PAGE PHOTO BACKGROUND + INFOS PRINCIPALES ---------------- */}
      <ImageBackground style={styles.landing} source={{uri: trip.background}} resizeMode='cover'>

{/* ---------------- HEADER BOUTONS LIKE ET RETOUR PAGE RECHERCHE ---------------- */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.coeurBox}>
            <Coeur />
          </TouchableOpacity>
          <TouchableOpacity style={styles.crossBox}>
            <Cross />
          </TouchableOpacity>
        </View>

{/* ---------------- RECAP TRIP  ---------------- */}
        <View style={styles.recapTrip}>
          <Text style={styles.title}>{trip.name}</Text>
          <Text style={styles.text}>{trip.country}</Text>
          <Text style={styles.text}>Min 12 jours - Max 27 jours</Text>
          <Text style={styles.text}>A partir de {trip.program[0].price}€ </Text>
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
          <View style={styles.caroussel}>
              <TouchableOpacity
                name='close'
                style={styles.crossBoxModal}
                size={30}
                color='black'
                onPress={() => setModalVisible(!modalVisible)}>
                <Cross />
              </TouchableOpacity>
          </View>
        {/* </Animated.View> */}
        {/* body modal */}
              {/* // scrollEventThrottle={16}
              // onScroll={(e) =>{ */}
              {/* //   console.log("e.nativeEvent.contentOffset.y",e.nativeEvent.contentOffset.y,"scrollY",scrollY,"diffClamp",diffClamp);
              //     scrollY.setValue(e.nativeEvent.contentOffset.y)}} */}

{/* ---------------- HEADER INFOS PRINCIPALES ---------------- */}

            <View style={styles.headerModal}>
              <Text style={styles.title}>Beaches and farniente</Text>
              <TouchableOpacity style={styles.heartBoxModal}>
                <Coeur />
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainerModal}>
              <Animated.FlatList
                data={[
                  { key: 'Bali' },
                  { key: 'Séjour de 12 jours - Max 27 jours' },
                  { key: 'Départ de Janvier à Juin ' },
                  { key: 'A partir de 1500€' },
                ]}
                renderItem={({ item }) => <Text style={styles.flatListModal}>{item.key}</Text>}
              />
              <Text style={styles.offeredByModal}>Offered by EZTRIP</Text>
            </View>
{/* ---------------- INCLUDED/NOT INCLUDED ---------------- */}
            <Text style={styles.smallTitle}>Included :</Text>
            <Animated.FlatList
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
              numColumns={3}
              data={[
                { key: 'Vol Paris/Bali' },
                { key: 'Les réservations' },
                { key: 'Les transferts ' },
                { key: 'Le guide local' },
                { key: 'La demi-pension' },
                { key: 'Les hébergements' },
              ]}
              renderItem={({ item }) => <Text style={styles.inclusModal}>{item.key}</Text>}
            />

            <Text style={styles.smallTitle}>Not included :</Text>
            <Animated.FlatList
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
              numColumns={3}
              data={[{ key: 'Les pourboires' }, { key: 'Les boissons' }]}
              renderItem={({ item }) => <Text style={styles.inclusModal}>{item.key}</Text>}
            />
{/* ---------------- MAP LOCALISATION ---------------- */}

            <Text style={styles.smallTitle}>Localisation :</Text>
            <MapView
              style={styles.map}
              mapType='hybrid'
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
{/* ---------------- DESCRIPTION TRIP ---------------- */}
{/* si on a le temps voir pour un "showmore"/"showless" pour pas avoir des descriptions a rallonge */}


            <Text style={styles.smallTitle}>Description :</Text>
            <Text numberOfLines={5} ellipsizeMode='tail' style={styles.inclusModal}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
              repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
              fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati
              tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia
              aut!{' '}
            </Text>

{/* ---------------- PROGRAMME ---------------- */}
            <Text style={styles.smallTitle}>Program :</Text>
            <View style={styles.nbDaysContainer}>{nbDaysButtons}</View>
            {programDisplay}

{/* ---------------- TAGS ---------------- */}

            <Text style={styles.smallTitle}>Tags :</Text>
            <View style={styles.tagsContainer} >{tags}</View>
            <View style={styles.buttonsContainer}>

{/* ---------------- BOUTONS QUOTATION ET DOWNLOAD ---------------- */}

              <TouchableOpacity style={styles.quotationButton}>
                <Text style={styles.buttonText}>Quotation request</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.programButton}>
                <Text style={styles.buttonText}>Download program (PDF)</Text>
              </TouchableOpacity>
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
