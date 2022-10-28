import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SliderBase,
  TextInput
} from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect } from 'react';
import Highlight from '../highlight/Highlight';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { ScrollView } from 'react-native-gesture-handler';
import moment from 'moment';
import DateRangePicker from 'rnv-date-range-picker';

export default function Quotation_Request({ navigation }) {

///////////////////////// Input
  const [text, setText] = useState("")

  const [nbTravelers, setnbTravelers] = useState(1);
  const [selectedRange, setRange] = useState({});


  ////////////////////////////////////////////////////////////MODAL FILTER - FUNCTIONS////////////////////////////////////////////////////////////
  //gère l'incrémentation du filter Nb Travelers
  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

  
    

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <View style={styles.container}></View>
      </View>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.text}>
              <Text style={styles.title}>Quotation request</Text>
              <Text style={styles.text}>Amazonie - EZ Trip</Text>
            </View>

          </View>


          <View
            name='travelersSection'
            style={{
              marginTop: 30,
              height: 50,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
            <Text style={styles.texts}>Number of travelers</Text>
            <View
              style={{
                alignItems: 'center',
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '20%',
              }}>
              <TouchableOpacity style={styles.button} title='Decrement' onPress={() => decrement()}>
                <Text style={{ textAlign: 'center', color: 'black' }}>-</Text>
              </TouchableOpacity>
              <Text>{nbTravelers}</Text>
              <TouchableOpacity style={styles.button} title='Increment' onPress={() => increment()}>
                <Text style={{ textAlign: 'center', color: 'black' }}>+</Text>
              </TouchableOpacity>
            </View>
          </View>


          <Text style={styles.texts}>Departure date</Text>

          <SafeAreaView>
            <View style={styles.containerDate}>
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat='YYYY-MM-DD'
                maxDate={moment()}
                minDate={moment().subtract(100, 'days')}
              />
              <View style={styles.container}>
         
              </View>
            </View>
          </SafeAreaView>

                 <Text style={styles.texts}>Departure: {selectedRange.firstDate}</Text>
                <Text style={styles.texts}>Return: {selectedRange.secondDate}</Text>


          
                <TextInput
                style={styles.buttons}
      label="Email"
      value={text}
      onChangeText={text => setText(text)}
    />
          <TouchableOpacity style={styles.buttons}>
            <Text styles={styles.texts}>Confirm the quotation request</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <BottomToolbar></BottomToolbar>
      <View style={{ height: 70 }}></View>
    </View>
  );
}
