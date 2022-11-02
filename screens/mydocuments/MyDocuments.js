import {

    ScrollView,
    View,
    Text,
    Linking,
    Image,
    TouchableOpacity,
  } from 'react-native';
  import { loadFonts } from '../../assets/fonts/fonts';
  import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
  import Contact from '../../components/icons/contact';
  import SwipeLeft from '../../components/icons/swipeleft';
  import styles from './style.css';


  export default function MyDocuments() {

    // A REMPLACER PAR UN FETCH 
    const data = [{
        document : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
        titre : 'Passeport'
    },
    {
        document : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
        titre : 'Visa'
    },
    {
        document : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
        titre : 'HackLife'
    },
    {
        document : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
        titre : 'Hubby Passeport'
    },
    {
        document : 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666685046/grande-traversee-de-laltiplano-bolivien-2022_zfix4l.pdf',
        titre : 'Mioumiou'
    },
]
    // FIN 
// --------------------- Pour appeler un numéro au clic sur contact EZ-TRIP ---------------------
    const dialCall = (number) => {
        let phoneNumber = '';
        if (Platform.OS === 'android') { phoneNumber = `tel:${number}`; }
        else {phoneNumber = `telprompt:${number}`; }
        Linking.openURL(phoneNumber);
     };

//---------------- map documents  ----------------
 const mydocuments = data.map((data, i) => {
    return (
        <View style={styles.pdfContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(data.document)} >
                <Image source={{uri:"https://blog.idrsolutions.com/wp-content/uploads/2020/10/pdf-1.png", width:150, height:150}} alt={data.titre} />
            </TouchableOpacity>
            <Text>{data.titre}</Text>
        </View>
    )
 })

 // ---------------- map TravelAgencyDocuments ----------------
 const travelAgencyDocuments = data.map((data, i) => {
    return (
        <View style={styles.pdfContainer}>
            <TouchableOpacity onPress={() => Linking.openURL(data.document)} >
                <Image source={{uri:"https://blog.idrsolutions.com/wp-content/uploads/2020/10/pdf-1.png", width:150, height:150}} alt={data.titre} />
            </TouchableOpacity>
            <Text>{data.titre}</Text>
        </View>
    )
 })


//*FONT CODE
    const loadedFonts = loadFonts();
    if (!loadedFonts) return <></>;

return (

<View style={{ flex: 1 }}>
  <View style={styles.container}>
{/* ---------------- HEADER ---------------- */}
    <View style={styles.header}>
        <Text style={styles.title}>Documents</Text>
    </View>
{/* ---------------- MY DOCUMENTS ---------------- */}
    <View style={styles.cont}>
        <Text style={styles.smallTitle}>My documents</Text>
        <View style={styles.borderie}></View>
        <View style={styles.sousContainer}>
          
            <ScrollView horizontal={true} style={styles.galleryContainer}>
                {mydocuments}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -120, left: 380, }} >
            <SwipeLeft />
            </View>
           
            <View style={styles.addContainer}>
            <Text style={styles.addText}>Add a document</Text>
            <TouchableOpacity style={styles.addButton}>
                <Text style={styles.addButtonText}> + </Text>
            </TouchableOpacity>
            </View>
        </View>
    </View>

{/* ---------------- DOCUMENTS FROM TRAVEL AGENCIES ---------------- */}
<View style={styles.cont}>
        <Text style={styles.smallTitle}>Travel Agency documents</Text>
        <View style={styles.borderie}></View>
        <View style={styles.sousContainer}>
        <ScrollView horizontal={true} style={styles.galleryContainer}>
                {travelAgencyDocuments}
            </ScrollView>
            <View style={{marginTop: -16, zIndex: 1,top: -120, left: 380, }} >
            <SwipeLeft />
            </View>
      <TouchableOpacity style={styles.addButton} onPress={() => dialCall('0650388510')}>
            <View style={styles.addContainer}>
            <Contact style={styles.addButton}/>
      <Text style={styles.addText}> Contact Travel Agency </Text>
            
            </View>
            </TouchableOpacity> 
        </View>
    </View>

{/* ---------------- FOOTER BOTTOM BAR ---------------- */}
    </View>
  <View style={{ height: 90 }}></View>
  <BottomToolbar></BottomToolbar>
</View>

  )}