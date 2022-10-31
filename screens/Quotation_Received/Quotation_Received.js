import {

    ScrollView,
    View,
    Text,
    Animated,
    TouchableOpacity,
  } from 'react-native';
  import { loadFonts } from '../../assets/fonts/fonts';
  import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
  import Contact from '../../components/icons/contact';
  import styles from './style.css';



  export default function Quotation_Received() {

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
      <Text> ADD THE TRAVEL CARD </Text>
    </View>
{/* ---------------- OFFERED BY TRAVEL AGENCY ---------------- */}
    <View style={styles.offeredByContainer}>
      <Text style={styles.offeredBy}> Quotation offered by : EZ-TRIP</Text>
    </View>

{/* ---------------- SUMMARY ---------------- */}
  <View style={styles.summaryContainer}>
    <Text style={styles.smallTitle}> Summary :</Text>
    <Animated.FlatList
              data={[
                { key: `10 days - 9 nights stay` },
                { key: `4 travelers` },
                { key: `From 15th to 25th of August 2023` },
                { key: `Special requests : Vegeterian` },
              ]}
              renderItem={({ item }) => <Text style={styles.recapTravel}>{item.key}</Text>}
              />
  </View>

{/* ---------------- TOTAL COST ---------------- */}
  <View style={styles.totalCostContainer}>
    <Text style={styles.totalCostTitle}> Total cost : </Text>
    <Text style={styles.cost}> 12 500 € including taxes </Text>
  </View>

{/* ---------------- BUTTONS ---------------- */}
  <View style={styles.buttonsContainer}>

{/* ------ Program button ------ */}
  <TouchableOpacity style={styles.programButton}>
      <Text style={styles.textButtons}> Download program (PDF)</Text>
  </TouchableOpacity>

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
    </ScrollView>
    </View>
  <View style={{ height: 90 }}></View>
  <BottomToolbar></BottomToolbar>
</View>

  )}