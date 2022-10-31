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
import { useDispatch } from 'react-redux';
import { unmountUser } from '../../reducers/user';

export default function MyTrips() {
  // const dispatch = useDispatch(unmountUser());
  // A REMPLACER PAR UN FETCH
  const data = [
    {
      photo: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/Bali1_bat19s.jpg',
      titre: 'Bali the pretty',
      prix: '2500€',
    },
    {
      photo: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/QuetenaChico_rf9h4j.jpg',
      titre: 'Quetena Chico',
      prix: '2500€',
    },
    {
      photo: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/flamants_laguna_colorada_dkspjf.jpg',
      titre: 'Laguna Colorada',
      prix: '2500€',
    },
    {
      photo: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685797/incahuasi_wx6a2w.jpg',
      titre: 'Incahuasi',
      prix: '2500€',
    },
    {
      photo: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666626183/machu-picchu_fc90cz.jpg',
      titre: 'Machu Picchu',
      prix: '2500€',
    },
  ];
  // FIN

  //---------------- MAP LIKED TRIPS  ----------------
  const likedTrips = data.map((data, i) => {
    return (
      <View style={styles.pdfContainer}>
        <TouchableOpacity>
          <ImageBackground
            imageStyle={{ borderRadius: 15 }}
            style={styles.imgBackground}
            source={{ uri: data.photo, width: 500, height: 300 }}
            alt={data.titre}>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={{ height: '40%', width: '100%', padding: 15, borderRadius: 15 }}>
              <View style={styles.topInfos}>
                <Text style={styles.titleCard}>{data.titre}</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              start={[1, 1]}
              end={[1, 0]}
              style={{ height: '33%', width: '100%', padding: 15, borderRadius: 15 }}>
              <View style={styles.bottomInfo}>
                <Text style={styles.cardInfos}>December to July</Text>
                <Text style={styles.cardInfos}>From {data.prix}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  });

  // ---------------- map TravelAgencyDocuments ----------------
  const planedTrips = data.map((data, i) => {
    return (
      <View style={styles.pdfContainer}>
        <TouchableOpacity>
          <ImageBackground
            imageStyle={{ borderRadius: 15 }}
            style={styles.imgBackground}
            source={{ uri: data.photo, width: 500, height: 300 }}
            alt={data.titre}>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              style={{ height: '40%', width: '100%', padding: 15, borderRadius: 15 }}>
              <View style={styles.topInfos}>
                <Text style={styles.titleCard}>{data.titre}</Text>
              </View>
            </LinearGradient>
            <LinearGradient
              colors={['rgba(0,0,0,0.8)', 'transparent']}
              start={[1, 1]}
              end={[1, 0]}
              style={{ height: '33%', width: '100%', padding: 15, borderRadius: 15 }}>
              <View style={styles.bottomInfo}>
                <Text style={styles.cardInfos}>from December to July</Text>
                <Text style={styles.cardInfos}>From {data.prix}</Text>
              </View>
            </LinearGradient>
          </ImageBackground>
        </TouchableOpacity>
      </View>
    );
  });

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
        <View>
          <ScrollView horizontal={true} style={styles.galleryContainer}>
            {likedTrips}
          </ScrollView>
          <View style={{ marginTop: -16, zIndex: 1, top: -150, left: 340 }}>
            <SwipeLeft />
          </View>
          <LinearGradient
            start={{ x: 0.75, y: 0.75 }}
            end={{ x: 0, y: 0.75 }}
            colors={['rgba(255,255,255,0.7)', 'transparent']}
            style={{ position: 'absolute', width: 75, height: 210, top: 25, left: '80%' }}></LinearGradient>
        </View>
      </View>

      {/* ---------------- PLANED TRIPS ---------------- */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sousHeader}>
          <TripPlaned />
          <Text style={styles.smallTitle}>Planed trips</Text>
        </View>
        <View style={styles.border}></View>

        <ScrollView horizontal={true} style={styles.galleryContainer}>
          {planedTrips}
        </ScrollView>
        <View style={{ marginTop: -16, zIndex: 1, top: -150, left: 350 }}>
          <SwipeLeft />
        </View>
        {/* ---------------- WHITE GRADIENT ON THE RIGHT OF THE SCROLL LEFT ---------------- */}
        <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 210, top: '20.5%', left: '80%' }}></LinearGradient>

        {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
      </View>
      <BottomToolbar style={{ width: '100%' }}></BottomToolbar>
      <View style={{ height: 70 }}></View>
    </View>
  );
}
