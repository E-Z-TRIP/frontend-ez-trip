import { Platform, View, Text, ImageBackground, TouchableOpacity, SliderBase, TextInput } from 'react-native';
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
  const loadedFonts = loadFonts();
  const { theme } = useTheme();

  // ///// BUTTON TRAVELERS && DATEPICKER
  const [nbTravelers, setnbTravelers] = useState(1);
  const [selectedRange, setRange] = useState({});
  const [value, setValue] = useState('');

  if (!loadedFonts) return <></>;

  ////////////////////////////////////////////////////////////MODAL FILTER - FUNCTIONS////////////////////////////////////////////////////////////
  //gère l'incrémentation du filter Nb Travelers
  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

  return (
    <>
      <View style={styles.mainContainer}>
        <ScrollView style={styles.scrollView}>
          <View style={styles.container}>
            <View style={styles.header}>
              <Text style={styles.title}>Quotation request</Text>
            </View>
            {/* //////Card du voyage selectionné avec le nom a l'intérieur : supprimer Amazonie-EZ Trip*/}
            {/* <Trip /> */}
            <View style={styles.numberTripsBtnsContainer}>
              <Text style={styles.numberTripsBtnsLabel}>Number of travelers</Text>
              <View style={styles.numberTripsBtnsWrapper}>
                <TouchableOpacity
                  style={{ ...styles.numberTripsBtn, ...styles.countButton, marginRight: 20 }}
                  onPress={() => decrement()}>
                  <Text style={styles.numberTripsBtnTxt}>-</Text>
                </TouchableOpacity>
                <Text style={styles.numberTripsValue}>{nbTravelers}</Text>
                <TouchableOpacity
                  style={{ ...styles.numberTripsBtn, ...styles.countButton, marginLeft: 20 }}
                  onPress={() => increment()}>
                  <Text style={styles.numberTripsBtnTxt}>+</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={styles.calendarContainer}>
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat='YYYY-MM-DD'
                minDate={moment().subtract(100, 'days')}
              />
            </View>
            <View style={styles.inputContainer}>
              <TextInput
                style={styles.textArea}
                placeholder='Need to tell us more ?'
                name='email'
                onChangeText={(text) => setValue(text)}
                multiline={true}
                numberOfLines={1}
              />
              <TouchableOpacity style={{ ...styles.buttonConfirm, backgroundColor: theme.pa1 }}>
                <Text style={styles.confirmBtnTxt}>Confirm</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
        <View style={{ height: 75 }}></View>
      </View>
      <BottomToolbar />
    </>
  );
}
