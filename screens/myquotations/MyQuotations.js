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
  import Ionicons from 'react-native-vector-icons/Ionicons';
  import Trip from '../../components/trip/trip';
  import styles from './style.css'
  import { serverURL } from '../../api/backend_request';
  import { useDispatch, useSelector } from 'react-redux';



  export default function MyTrips() {

    //constantes générales
    const tripLiked = useSelector((state) => state.user.favorites);
    const TOKEN = useSelector((state) => state.user.value.token);
    const favorites = useSelector((state) => state.user.favorites);

    //store les orders à display (sent + received)
    const [requestSent, setRequestSent] = useState([]);
    const [quotationReceived, setQuotationReceived] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
    //GET THE TRIPS BOOKED BY THE USER
    fetch(`${serverURL}/orders/${TOKEN}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.result) {
            for (let order of data.data) {
                console.log(order.status)
                //Si les orders sont en statut Requested ou Received, on les ajoute aux états React correspondant
                if(order.status === 'Requested' && !requestSent.some(e => e._id ===order._id)) {
                    setRequestSent([...requestSent, order])
                }

                else if (orders.status === 'Received' && !quotationReceived.some(e => e._id ===order._id)) {
                    setQuotationReceived([...quotationReceived, order])
                }
            }
        }
        //si data.result = false, le fetch a failed
        else {
          console.log('Fetch of orders failed.')
        }
      })
    }, []);


  // ---------------- MAP QUOTATION ASKED ----------------

let receivedDisplay
if (quotationReceived) {
    receivedDisplay = quotationReceived.map((data, i) => {
        if(data.status === 'Requested') {
            return (
                <TouchableOpacity key={i} style={styles.tripContainer} >
                        <Text>Quotation asked on XXX</Text>
                        <Trip {...data.trip}></Trip>
                    </TouchableOpacity>
            )
        }
     })
}


   // ---------------- MAP QUOTATION RECEIVED ----------------

   let sentDisplay
   if (requestSent) {
    sentDisplay = requestSent.map((data, i) => {
           if(data.status === 'Requested') {
               return (
                   <TouchableOpacity key={i} style={styles.tripContainer} >
                           <Text>Quotation asked on XXX</Text>
                           <Trip {...data.trip}></Trip>
                       </TouchableOpacity>
               )
           }
        })
   }


  //*FONT CODE
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={styles.container}>
      {/* ---------------- HEADER ---------------- */}
      <View style={styles.header}>
        <Text style={styles.title}>My quotations</Text>
      </View>
{/* ---------------- LIKED TRIPS ---------------- */}
    <View style={styles.cont}>
      <View style={styles.sousHeader} >
      <Ionicons name='send-outline' size={30}  color={"black"}/>

          <Text style={styles.smallTitle}>Request sent</Text>
      </View>
      <View style={styles.border}></View>
            <ScrollView horizontal={true} style={styles.galleryContainer}>
            {requestSent.length > 0 ? false : <Text style={{fontFamily:'txt'}}>No quotation asked yet.</Text>}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -150, left: 340, }} >
            {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
            {requestSent.length > 1 ? <SwipeLeft /> : false}   
            </View>
            <LinearGradient 
        start={{x: 0.75, y: 0.75}} end={{x: 0, y: 0.75}}
        colors={['rgba(255,255,255,0.7)', 'transparent']}
        style={{position: 'absolute', width: 75, height: 210, top: 25, left: '82%'}}></LinearGradient>
    </View>

      {/* ---------------- QUOTATIONS TO BE REVIEWED ---------------- */}
      <View style={{ marginTop: 10 }}>
        <View style={styles.sousHeader}>
        <Ionicons name='mail-unread-outline' size={30}  color={"black"}/>
          <Text style={styles.smallTitle}>Quotation received</Text>
        </View>
        <View style={styles.border}></View>

        <ScrollView horizontal={true} style={styles.galleryContainer}>
        {quotationReceived.length > 0 ? false : <Text style={{fontFamily:'txt'}}>You have no quotation to review.</Text>}
        </ScrollView>
        <View style={{marginTop: -16, zIndex: 1,top: -150, left: 350, }} >
        {/* ---------------- La flèche ne s'affiche que s'il y a plus d'une donnée et que le scroll s'active ---------------- */}
         {quotationReceived.length > 1 ? <SwipeLeft /> : false}   
        </View>
        {/* ---------------- WHITE GRADIENT ON THE RIGHT OF THE SCROLL LEFT ---------------- */}
        <LinearGradient
          start={{ x: 0.75, y: 0.75 }}
          end={{ x: 0, y: 0.75 }}
          colors={['rgba(255,255,255,0.7)', 'transparent']}
          style={{ position: 'absolute', width: 75, height: 212, top: '19.5%', left: '82%' }}></LinearGradient>
      </View>

        {/* ---------------- FOOTER BOTTOM BAR ---------------- */}
      <View style={{ height: 70 }}></View>
      <BottomToolbar/>
    </View>
  );
}
