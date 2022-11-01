import {
  Button,
  TextInput,
  Modal,
  ScrollView,
  SafeAreaView,
  View,
  Text,
  ImageBackground,
  TouchableOpacity,
  KeyboardAvoidingView,
} from 'react-native';
import styles from './style.css';
import { serverURL } from '../../api/backend_request';
import { useTheme } from '@react-navigation/native';
import { loadFonts } from '../../assets/fonts/fonts';
import React, { useState, useEffect, useCallback } from 'react';
import Trip from '../../components/trip/trip';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import DateRangePicker from 'rnv-date-range-picker';
import moment from 'moment';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { RangeSlider } from '@sharcoux/slider';
import { getMonthName } from '../../assets/helpers';
import { useDispatch, useSelector } from 'react-redux';

export default function Search({ navigation }) {

  ///////////////////////////////////////////////////////////REACT STATES////////////////////////////////////////////////////////////
  //tous les trips récupérés par la route GET au chargement
  const [tripsData, setTripsData] = useState([]);
  //fait apparaître / disparaître la Modal Filtres
  const [modalVisible, setModalVisible] = useState(false);
  //input Text haut de page
  const [searchInput, setSearchInput] = useState('');
  //Tous les inputs de la Modal filtres
  const [minBudget, setMinBudget] = useState(0);
  const [maxBudget, setMaxBudget] = useState(15000);
  const [nbTravelers, setnbTravelers] = useState(1);
  const [calendarVisible, setCalendarVisible] = useState(false);
  const [selectedRange, setRange] = useState({});
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  //redux store pour récupérer les favoris et gérer la couleur du coeur
  const favorites = useSelector((state) => state.user.favorites);

  //GET ALL THE TRIPS WHEN LOADING THE SCREEN
  useEffect(() => {
    fetch(`${serverURL}/trips`)
      .then((response) => response.json())
      .then((data) => {
        setTripsData(data.trips);
      });
  }, []);
  const dispatch = useDispatch();

  //S'assure que la police est bien chargée
  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  ////////////////////////////////////////////////////////////////SEARCH RESULTS - FUNCTIONS////////////////////////////////////////////////////////////
  //variable déclarée, mais assignée que si tripsData est bien récupéré du back pour éviter les bugs
  let trips;
  //MAP TO DISPLAY ALL THE TRIPS
  if (tripsData) {
    trips = tripsData.map((data, i) => {
     
      return (
        <View key={i} style={{ height: 180 }}>
        <Trip propsKey={i} {...data} isFavorite={favorites.some((favorite) => favorite === data._id)} />
        </View>
      );
    });
  }

  //HANDLE SEARCH WHEN BUTTON IS CLICKED

  const handleSearch = () => {
    //construit un objet regroupant tous les paramètres de filtres
    let research = { minBudget, maxBudget, searchInput };
    console.log(research);
    //construit l'URL avec les query correspondants aux filtres
    var url = new URL(`${serverURL}/trips/filter`);
    Object.keys(research).forEach((key) => url.searchParams.append(key, research[key]));
    console.log(url);
    //fetch avec l'URL personnalisé à la recherche
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setTripsData(data.trips);
        setModalVisible(false);
      });
  };

  ////////////////////////////////////////////////////////////MODAL FILTER - FUNCTIONS////////////////////////////////////////////////////////////
  //gère l'incrémentation du filter Nb Travelers
  const increment = () => setnbTravelers((c) => c + 1);
  const decrement = () => (nbTravelers > 1 ? setnbTravelers((c) => c - 1) : false);

  //petite fonction qui s'exécute quand le slider Budget est bougé
  const budgetChange = (value) => {
    setMinBudget(value[0]);
    setMaxBudget(value[1]);
  };

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={styles.scrollView}>
        <View style={styles.container}>
          <View style={styles.header}>
            <View style={styles.text}>
              <Text style={styles.title}>Search</Text>
              <View style={styles.searchContainer}>
                <TextInput style={styles.input} 
                value={searchInput} 
                placeholder='Where are you heading?' 
                onChange={(e) => setSearchInput(e.target.value)}></TextInput>
                <AntDesign name='search1' size={20} color='black' />
              </View>
            </View>
            <View style={styles.border}></View>
          </View>
          <View style={styles.catalogue}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={styles.text}>{tripsData.length} results</Text>
              <AntDesign name='filter' size={20} color='black' onPress={() => setModalVisible(!modalVisible)} />
            </View>
            <View style={styles.tripContainer}>{tripsData ? trips : <View></View>}</View>
            <Modal
              transparent={true}
              animationType='slide'
              visible={modalVisible}
              onRequestClose={() => {
                setModalVisible(!modalVisible);
              }}>
              <View style={styles.modal}>
                <View
                  id='headerFilter'
                  style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                  <Text style={{ fontFamily: 'txt', fontSize: 24 }}>Filters</Text>
                  <AntDesign name='close' size={30} color='black' onPress={() => setModalVisible(!modalVisible)} />
                </View>

                <ScrollView id="Scrollview filtres" style={{padding: 5, backgroundColor: '#F2F3F5', padding: 25}}>
                  
                  <View name='sectionBudget'>
                    <Text style={styles.filterText}>Budget</Text>
                    <View name='sectionContent' style={{ flexDirection: 'row', justifyContent: 'space-between', padding: 5}}>
                      <View name='field'>
                        <Text>Min</Text>
                        <TextInput placeholder='0'>{minBudget}</TextInput>
                      </View>
                      <View name='field'>
                        <Text>Max</Text>
                        <TextInput placeholder='8000'>{maxBudget}</TextInput>
                      </View>
                    </View>

                    <View name=""style={{padding: 9}}>
                      <RangeSlider
                        range={[0, 8000]} // set the current slider's value
                        minimumValue={0} // Minimum value
                        maximumValue={7000} // Maximum value
                        step={100} // The step for the slider (0 means that the slider will handle any decimal value within the range [min, max])
                        minimumRange={50} // Minimum range between the two thumbs
                        crossingAllowed={false} // If true, the user can make one thumb cross over the second thumb
                        outboundColor='#FFEAE3' // The track color outside the current range value
                        inboundColor='#C46B4D' // The track color inside the current range value
                        thumbTintColor='#C46B4D' // The color of the slider's thumb
                        thumbStyle={undefined} // Override the thumb's style
                        trackStyle={undefined} // Override the tracks' style
                        minTrackStyle={undefined} // Override the tracks' style for the minimum range
                        midTrackStyle={undefined} // Override the tracks' style for the middle range
                        maxTrackStyle={undefined} // Override the tracks' style for the maximum range
                        vertical={false} // If true, the slider will be drawn vertically
                        inverted={false} // If true, min value will be on the right, and max on the left
                        enabled={true} // If false, the slider won't respond to touches anymore
                        trackHeight={2} // The track's height in pixel
                        thumbSize={18} // The thumb's size in pixel
                        thumbImage={undefined} // An image that would represent the thumb
                        slideOnTap={true} // If true, touching the slider will update it's value. No need to slide the thumb.
                        onValueChange={budgetChange} // Called each time the value changed. The type is (range: [number, number]) => void
                        onSlidingStart={undefined} // Called when the slider is pressed. The type is (range: [number, number]) => void
                        onSlidingComplete={undefined} // Called when the press is released. The type is (range: [number, number]) => void
                      />
                    </View>
                  </View>

                <View
                  name='travelersSection'
                  style={{
                    marginTop: 30,
                    marginBottom: 30,
                    height: 50,
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}>
                  <Text style={styles.filterText}>Number of travelers</Text>
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

                <View name='calendarSection' style={calendarVisible ? styles.bigCalendar : styles.smallCalendar}>
                  <Text style={styles.filterText}>Departure dates</Text>

                  <View name="dateInput" style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, width: '90%'}}>
                    <Text style={{fontFamily: 'txt'}}>Start:</Text><TouchableOpacity style={{width: '30%', height: '100%', borderBottomColor: 'black', borderBottomWidth: 0.5}} onPress={() => setCalendarVisible(!calendarVisible)}><Text>{startDate}</Text></TouchableOpacity>
                    <Text style={{fontFamily: 'txt'}}>End:</Text><TouchableOpacity style={{width: '30%', height: '100%', borderBottomColor: 'black', borderBottomWidth: 0.5}} onPress={() => setCalendarVisible(!calendarVisible)}><Text>{endDate}</Text></TouchableOpacity>
                  </View>

                 
                    {calendarVisible ? (
                    <View style={styles.calendar}>
                      <DateRangePicker
                    onSelectDateRange={(range) => {
                    setRange(range);
                    setStartDate(range.firstDate)
                    setEndDate(range.secondDate)
                  }}
                    backgroundColor="white"
                    responseFormat='DD-MM-YYYY'
                    maxDate={moment().add(3, 'years')}
                    minDate={moment()}
                />
                </View>): false}

                </View>

                <View name='tagsSection' style={{ marginTop: 30 }}>
                  <Text style={styles.filterText}>What are you looking for?</Text>
                  <TextInput
                    placeholder='search tags'
                    style={{
                      marginTop: 5,
                      width: '70%',
                      borderBottomColor: 'darkgrey',
                      borderBottomWidth: 1,
                      height: 25,
                    }}></TextInput>
                </View>

                <TouchableOpacity
                  style={styles.btnSearch}
                  onPress={() => handleSearch(minBudget, maxBudget, nbTravelers)}>
                  <Text style={styles.text}>Search results</Text>
                </TouchableOpacity>
              {/* </View> */}
              </ScrollView>
              </View>
            </Modal>
          </View>
        </View>
      </ScrollView>
      <BottomToolbar />
      <View style={{ height: 70 }}></View>
    </View>
  );
}
