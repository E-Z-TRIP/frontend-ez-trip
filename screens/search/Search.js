import {Button, TextInput, Modal, ScrollView, SafeAreaView, View, Text, ImageBackground, TouchableOpacity } from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import React, { useState, useEffect, useCallback } from 'react';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RangeSlider } from '@sharcoux/slider'

export default function Search({ navigation }) {
    const loadedFonts = loadFonts();
    const dispatch = useDispatch(); 
    //fait apparaître / disparaître la Modal
    const [modalVisible, setModalVisible] = useState(false);
    //écoute le slider Budget dans les filtres
    const [minBudget, setMinBudget] = useState(0);
    const [maxBudget, setMaxBudget] = useState(15000);
    const [nbTravelers, setnbTravelers] = useState(1);

    const increment = () => setnbTravelers(c => c + 1);
    const decrement = () => setnbTravelers(c => c - 1);

    if (!loadedFonts) return <></>;

    //petite fonction qui s'exécute quand le slider Budget est bougé
    const budgetChange = (value) => {
        setMinBudget(value[0]);
        setMaxBudget(value[1])
    }
       
    return (
      <View style ={{flex: 1}}>
        <ScrollView style ={styles.scrollView}>
          <View style = {styles.container}>
            <View style= {styles.header}>
              <View style={styles.text}>
                <Text style={styles.title}>Search</Text>
                <View style = {styles.searchContainer}>
                    <TextInput style= {styles.input} placeholder="Where are you heading?"></TextInput>
                    <AntDesign name='search1' size={20} color='black'/>
                </View>
              </View>
              <View style = {styles.border}>
              </View>
            </View>  
        <View style = {styles.catalogue}>
            <View style={{flexDirection: 'row', justifyContent:'space-between'}}>
            <Text style= {styles.text}>XXX results</Text>
            <AntDesign name='filter' size={20} color='black' onPress={() => setModalVisible(!modalVisible)} />
            </View>
      <View style = {styles.tripContainer}>
            <Trip></Trip>
            <Trip></Trip>
            <Trip></Trip>
      </View>
      <Modal
        transparent={true}
        animationType="slide"
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.modal}>
            <View name="firstSection" style={{flexDirection:'row', alignItems:'center', justifyContent:'space-between'}}>
                <Text style={{fontFamily:'txt', fontSize: 24}}>Filters</Text>
                <AntDesign name='close' size={30} color='black' onPress={() => setModalVisible(!modalVisible)}/>
            </View>

            <View name="secondSection" style = {{marginTop: 40}}>
                <Text style={styles.filterText}>Budget</Text>
                <View name="sectionContent" style={{flexDirection: 'row', justifyContent:'space-between'}}>
                    <View name="field">
                        <Text>Min</Text>
                        <TextInput placeholder="0">{minBudget}</TextInput>
                    </View>
                    <View name="field">
                        <Text>Max</Text>
                        <TextInput placeholder="15 000">{maxBudget}</TextInput>
                    </View>      
                </View>

            <View>

                <RangeSlider
                range={[0, 15000]}                // set the current slider's value
                minimumValue={0}                  // Minimum value
                maximumValue={15000}              // Maximum value
                step={50}                         // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                minimumRange={50}                 // Minimum range between the two thumbs
                crossingAllowed={false}           // If true, the user can make one thumb cross over the second thumb
                outboundColor='#FFEAE3'           // The track color outside the current range value
                inboundColor='#C46B4D'            // The track color inside the current range value
                thumbTintColor='#C46B4D'         // The color of the slider's thumb
                thumbStyle={undefined}            // Override the thumb's style
                trackStyle={undefined}            // Override the tracks' style
                minTrackStyle={undefined}         // Override the tracks' style for the minimum range
                midTrackStyle={undefined}         // Override the tracks' style for the middle range
                maxTrackStyle={undefined}         // Override the tracks' style for the maximum range
                vertical={false}                  // If true, the slider will be drawn vertically
                inverted={false}                  // If true, min value will be on the right, and max on the left
                enabled={true}                    // If false, the slider won't respond to touches anymore
                trackHeight={2}                   // The track's height in pixel
                thumbSize={18}                    // The thumb's size in pixel
                thumbImage={undefined}            // An image that would represent the thumb
                slideOnTap={true}                 // If true, touching the slider will update it's value. No need to slide the thumb.
                onValueChange={budgetChange}         // Called each time the value changed. The type is (range: [number, number]) => void
                onSlidingStart={undefined}        // Called when the slider is pressed. The type is (range: [number, number]) => void
                onSlidingComplete={undefined}     // Called when the press is released. The type is (range: [number, number]) => void             
                />
          </View>
            </View>

            <View name="travelersSection" style = {{marginTop: 30, height: 50, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}}>
                <Text style={styles.filterText}>Number of travelers</Text>
                <View style={{alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row', width: '20%' }}>
                    <TouchableOpacity style={styles.button} title="Decrement" onPress={() => decrement()}><Text style={{textAlign:'center', color: 'black'}}>-</Text></TouchableOpacity>
                    <Text>{nbTravelers}</Text>
                    <TouchableOpacity style={styles.button} title="Increment" onPress={() => increment()}><Text style={{textAlign:'center', color: 'black'}}>+</Text></TouchableOpacity>
                    </View>
                </View>

            <View name="calendar" style = {{marginTop: 30}}>
                <Text style={styles.filterText}>Departure dates</Text>
            </View>
        </View>

      </Modal>
        </View>
        </View>
        
      </ScrollView>
      <BottomToolbar></BottomToolbar>
      <View style={{height: 70}}></View>
      </View>
    )
  }