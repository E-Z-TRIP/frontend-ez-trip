import {

    ScrollView,
    View,
    Text,
    TouchableOpacity,
    Linking,
  } from 'react-native';
  import React, { useState, useEffect, } from 'react';
import { convertibleStartDate, getnbDays, getNbNights } from '../../assets/helpers';
  import { loadFonts } from '../../assets/fonts/fonts';
  import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
  import Contact from '../../components/icons/contact';
  import styles from './style.css';
  import Trip from '../../components/trip/trip';
  import { serverURL } from '../../api/backend_request';



  export default function Quotation_Received({ navigation, route: { params: props } }) {
    const [order, setOrder]= useState(null)
    const [startDate, setStartDate] = useState(null)
    const [endDate, setEndDate] = useState(null)
    const [nbDays, setNbDays] = useState(null)
    const [nbNights, setNbNights] = useState(null)

    //*fetch
    useEffect(() => {
    fetch(`${serverURL}/orders/offer/6360e414ea1a41d73f22a830`)
    .then(response => response.json())
    .then(data => {
      if (data.result) {
        setOrder(data.data)
        setStartDate(convertibleStartDate(data.data.start))
        setEndDate(convertibleStartDate(data.data.end))
        setNbDays(getnbDays(data.data.start, data.data.end))
        setNbNights(getNbNights(data.data.start, data.data.end))
      } else {
        console.log('oupsi')
      }
    })
    }, [])

//*FONT CODE
    const loadedFonts = loadFonts();
    if (!loadedFonts) return <></>;


return (

<View style={{ flex: 1 }}>
  <View style={styles.container}>
{/* ---------------- HEADER ---------------- */}
    <Text style={styles.title}>Your future travel - Quotation offer </Text>
{/* ---------------- BODY ---------------- */}
  <ScrollView>
{/* ---------------- TRAVEL CARD  ---------------- */}
    <View style={styles.cardTravel}>
      { order ? <Trip {...order.trip}/>  : false}
    </View>
{/* ---------------- OFFERED BY TRAVEL AGENCY ---------------- */}
    <View style={styles.offeredByContainer}>
      <Text style={styles.offeredBy}> Quotation offered by : EZ-TRIP</Text>
    </View>

{/* ---------------- SUMMARY ---------------- */}
 { order ? (
  <View style={styles.summaryContainer}>
    <Text style={styles.smallTitle}> Summary :</Text>
    <Text style={styles.recapTravel}>{nbDays} days {nbNights} nights</Text>
    <Text style={styles.recapTravel}>{order.nbTravelers} travelers</Text>
    <Text style={styles.recapTravel}>From {startDate} to {endDate}</Text>
    <Text style={styles.recapTravel}>Special requests :</Text>
    <Text style={styles.recapTravel}>        {order.comments}</Text>

  </View>
 ) : <View></View>

 }

{/* ---------------- TOTAL COST ---------------- */}
{ order ? (
  <View style={styles.totalCostContainer}>
    <Text style={styles.totalCostTitle}> Total cost : </Text>
    <Text style={styles.cost}> {order.totalPrice} € including taxes </Text>
  </View>
  ) : <View></View>

}

{/* ---------------- BUTTONS ---------------- */}
  <View style={styles.buttonsContainer}>

{/* ------ Program button ------ */}
{ order ? (
  <TouchableOpacity style={styles.programButton} onPress={() => Linking.openURL(`${order.trip.program[0].programPDF}`)}>
      <Text style={styles.textButtons}> Download program (PDF)</Text>
  </TouchableOpacity>
  ) : <View></View>

}

  {/* ------ Validation button ------ */}
  <TouchableOpacity style={styles.validationButton}>
      <Text style={styles.textButtons}> Accept quotation</Text>
  </TouchableOpacity>
  
  {/* ------ Contact button ------ */}
  <TouchableOpacity style={styles.contact}>
    <Contact style={styles.contactIcon}/>
      <Text style={styles.textContact}> Contact EZ-TRIP </Text>
  </TouchableOpacity>
  </View>

{/* ---------------- FOOTER BOTTOM BAR ---------------- */}
  <View style={{ height: 170 }}></View>
    </ScrollView>
    </View>
  <BottomToolbar></BottomToolbar>
</View>

  )}