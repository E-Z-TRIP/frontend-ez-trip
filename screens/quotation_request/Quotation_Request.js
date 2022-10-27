import {
  StyleSheet,
  Platform,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  SliderBase,
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
  //     const loadedFonts = loadFonts();

  //   if (!loadedFonts) return <></>;

  const [selectedRange, setRange] = useState({});

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
            <View style={styles.border}></View>
          </View>

          <Text style={styles.text}>Number of travelers</Text>
          <Text style={styles.text}>Departure date</Text>

          <SafeAreaView>
            <View style={styles.container}>
              <DateRangePicker
                onSelectDateRange={(range) => {
                  setRange(range);
                }}
                responseFormat='YYYY-MM-DD'
                maxDate={moment()}
                minDate={moment().subtract(100, 'days')}
              />
              <View style={styles.container}>
                <Text>Departure: {selectedRange.firstDate}</Text>
                <Text>Return: {selectedRange.secondDate}</Text>
              </View>
            </View>
          </SafeAreaView>

          <Text style={styles.text}>Need to give us more infos ?</Text>

          <TouchableOpacity style={styles.button}></TouchableOpacity>
        </View>
      </ScrollView>
      <BottomToolbar></BottomToolbar>
      <View style={{ height: 70 }}></View>
    </View>
  );
}
