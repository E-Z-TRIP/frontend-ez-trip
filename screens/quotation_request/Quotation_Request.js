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


  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  ///////////////////////// Input
  const [text, setText] = useState("")

  // ///// BUTTON TRAVELERS && DATEPICKER
  const [nbTravelers, setnbTravelers] = useState(1);
  const [selectedRange, setRange] = useState({});
  const [value, onChangeText] = useState('Useless Multiline Placeholder');


  ////////////////////////////////////////////////////////////MODAL FILTER - FUNCTIONS////////////////////////////////////////////////////////////
  //gère l'incrémentation du filter Nb Travelers
  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

// //////


  return (

// ///////////

    <View style={{ flex: 1 }}>
      <View style={styles.container}>
      </View>

      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>

          <View style={styles.header}>

              <Text style={styles.title}>Quotation request</Text>
              </View>
              


{/* //////Card du voyage selectionné avec le nom a l'intérieur : supprimer Amazonie-EZ Trip*/}
          {/* <Text style={styles.texts}>Amazonie - EZ Trip</Text> */}
          <Trip></Trip>

          
          
            <View>
            
            </View>
            <Text style={styles.textNum} >Number of travelers</Text>
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
          
           
            <Text style={styles.texts}>Departure date</Text>
            <SafeAreaView>
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
            </SafeAreaView>


          <TextInput
            style={styles.input}
            label="Email"
            value={text}
            onChangeText={text => onChangeText(text)}
            multiline
            numberOfLines={4}
          />
              <TouchableOpacity style={styles.buttonConfirm}>
      <Text style={styles.text}>Confirm the quotation request</Text>
    </TouchableOpacity>
        </View>
      </ScrollView>


      <BottomToolbar></BottomToolbar>
      <View style={{ height: 70 }}></View>

    </View>
  );
            }
