import { SafeAreaView, View, Text, ImageBackground, TouchableOpacity, SliderBase } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Highlight from '../highlight/Highlight';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import { getMonthName } from '../../assets/helpers';
import { addIP } from '../../reducers/IPAddress';
import { addFavorites, setFavorites } from '../../reducers/user';

import * as Network from 'expo-network';

export default function Discover({ navigation }) {
  const dispatch = useDispatch();
  const API_ADDRESS = useSelector((state) => state.IPAdress.value);
  //STATE TO STORE ALL THE TRIPS TO DISPLAY
  const [tripsData, setTripsData] = useState([]);
  const TOKEN = 'R1jjTe76KxKzzYm3Hs2w5of88DyxZZoP';

  //GET ALL THE TRIPS WHEN LOADING THE SCREEN + IP ADDRESS + FAVORITES OF THE USER
  useEffect(() => {
    //GET THE IP ADDRESS
    const getIP = async () => {
      const IP = await Network.getIpAddressAsync();
      dispatch(addIP(IP.slice(0, 10)));
      console.log(IP.slice(0, 10));
    };
    getIP();
    console.log(API_ADDRESS);

    //GET ALL THE TRIPS
    fetch(`http://${API_ADDRESS}96:3000/trips`)
      .then((response) => response.json())
      .then((data) => {
        setTripsData(data.trips);
      });

    //SAVE ALL THE FAVORITES IN THE REDUCER
    fetch(`http://${API_ADDRESS}96:3000/users/like/token=${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        dispatch(setFavorites(data.tripsLiked));
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
      <Trip
        key={i}
        id={data.id}
        background={data.background}
        country={data.country}
        name={data.name}
        price={data.program[0].price}
        start={start}
        end={end}
      />
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
              <Text style={styles.text}>Where are you heading?</Text>
            </View>
            <View style={styles.border}></View>
          </View>

          <View style={styles.highlight}>
            <Highlight />
          </View>

          <View style={styles.catalogue}>
            <Text style={styles.text}>Our recommendations</Text>
            <View style={styles.tripContainer}>{trips}</View>
          </View>
        </View>
      </ScrollView>
      <BottomToolbar></BottomToolbar>
      <View style={{ height: 70 }}></View>
    </View>
  );
}
