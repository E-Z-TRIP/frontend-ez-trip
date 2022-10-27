import {ListHeaderComponent, ListFooterComponent, SafeAreaView, View, FlatList, Text, ImageBackground, TouchableOpacity, Modal} from 'react-native';
import styles from './style.css';
import { useTheme } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { loadFonts } from '../../assets/fonts/fonts';
import { useState, useEffect, useCallback } from 'react';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';

import { ScrollView } from 'react-native-gesture-handler';
import MapView, { Marker } from 'react-native-maps';
import Coeur from '../../components/icons/coeur';
import Cross from '../../components/icons/cross';
// import * as Network from 'expo-network';
import Scroll from '../../components/icons/scrollDown';

export default function ProductScreen() {
  const loadedFonts = loadFonts();
  //fait apparaître / disparaître la Modal
  const [modalVisible, setModalVisible] = useState(false);
  if (!loadedFonts) return <></>;

  const image = { uri: 'https://res.cloudinary.com/dxq6tt9ur/image/upload/v1666688082/balibackground_zhvjoa.jpg' };
  const program = [
    {
      nbday: 3,
      detailedProgram: [
        {
          day: 1,
          activities: `Accueil à Lima. Transfert vers notre famille d'accueil. Dîner et nuit à Lima.`,
        },
        {
          day: 2,
          activities: `Bus vers Paracas (village pêcheur). Accueillis par Lourdes et Juan (ancien pêcheur) pour visiter la région, la réserve de Paracas et ses plages. Diner et nuit chez eux. `,
        },
        {
          day: 3,
          activities: `Visite en bateau des îles Ballestas, réserve de la faune maritime. Transfert à Huacachina, oasis aux milieux des dunes au coeur d'un des déserts péruviens. Bus de nuit pour Arequipa.`,
        },
      ],
    },
    {
      nbday: 2,
      detailedProgram: [
        {
          day: 1,
          activities: `Accueil à Lima. Transfert vers notre famille d'accueil. Dîner et nuit à Lima.`,
        },
        {
          day: 2,
          activities: `Bus vers Paracas (village pêcheur). Accueillis par Lourdes et Juan (ancien pêcheur) pour visiter la région, la réserve de Paracas et ses plages. Diner et nuit chez eux. `,
        },
      ],
    },
  ];

  const buttons = program.map((data, i) => {
    return (
      <TouchableOpacity style={styles.nbDaysModal} key={i}>
        <Text>{data.nbday} days</Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.scrollView}>
      <ImageBackground style={styles.landing} source={image} resizeMode='cover'>
        <View style={styles.header}>
          <TouchableOpacity style={styles.coeurBox}>
            <Coeur />
          </TouchableOpacity>
          <TouchableOpacity style={styles.crossBox}>
            <Cross />
          </TouchableOpacity>
        </View>

        <View style={styles.recapTrip}>
          <Text style={styles.title}>Beaches and farniente</Text>
          <Text style={styles.text}>Bali </Text>
          <Text style={styles.text}>Min 12 jours - Max 27 jours</Text>
          <Text style={styles.text}>A partir de 1500€ </Text>
        </View>
        <TouchableOpacity style={styles.details} onPress={() => setModalVisible(!modalVisible)}>
          <Text style={styles.textDetail}>More details</Text>
          <Scroll />
        </TouchableOpacity>
      </ImageBackground>

      <Modal
        animationType='slide'
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>

          <View  style={styles.modal}>
              <ScrollView style={styles.scrollViewModal}>
            <View style={styles.caroussel}>
              <TouchableOpacity
                name='close'
                style={styles.crossBoxModal}
                size={30}
                color='black'
                onPress={() => setModalVisible(!modalVisible)}>
                <Cross />
              </TouchableOpacity>
            </View>
            <View style={styles.headerModal}>
              <Text style={styles.title}>Beaches and farniente</Text>
              <TouchableOpacity style={styles.heartBoxModal}>
                <Coeur />
              </TouchableOpacity>
            </View>
            <View style={styles.infoContainerModal}>
              <FlatList
                data={[
                  { key: 'Bali' },
                  { key: 'Séjour de 12 jours - Max 27 jours' },
                  { key: 'Départ de Janvier à Juin ' },
                  { key: 'A partir de 1500€' },
                ]}
                renderItem={({ item }) => <Text style={styles.flatListModal}>{item.key}</Text>}
              />
              <Text style={styles.offeredByModal}>Offered by EZTRIP</Text>
            </View>

            <Text style={styles.smallTitle}>Included :</Text>
            <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
              numColumns={3}
              data={[
                { key: 'Vol Paris/Bali' },
                { key: 'Les réservations' },
                { key: 'Les transferts ' },
                { key: 'Le guide local' },
                { key: 'La demi-pension' },
                { key: 'Les hébergements' },
              ]}
              renderItem={({ item }) => <Text style={styles.inclusModal}>{item.key}</Text>}
            />

            <Text style={styles.smallTitle}>Not included :</Text>
            <FlatList
              columnWrapperStyle={{ flexWrap: 'wrap', flex: 1 }}
              numColumns={3}
              data={[{ key: 'Les pourboires' }, { key: 'Les boissons' }]}
              renderItem={({ item }) => <Text style={styles.inclusModal}>{item.key}</Text>}
            />
            <Text style={styles.smallTitle}>Localisation :</Text>
            <MapView
              style={styles.map}
              mapType='hybrid'
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}></MapView>
            <Text style={styles.smallTitle}>Description :</Text>
            <Text numberOfLines={5} ellipsizeMode='tail' style={styles.inclusModal}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia, molestiae quas vel sint commodi
              repudiandae consequuntur voluptatum laborum numquam blanditiis harum quisquam eius sed odit fugiat iusto
              fuga praesentium optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis obcaecati
              tenetur iure eius earum ut molestias architecto voluptate aliquam nihil, eveniet aliquid culpa officia
              aut!{' '}
            </Text>
            <View style={styles.nbDaysContainer}>{buttons}</View>

            {/* ALL THE CODE HAS TO GO OVER THIS LINE */}
            <View style={{ height: 90 }}></View>
          </ScrollView>
        </View>
        <BottomToolbar></BottomToolbar>
      </Modal>
    </View>
  );
}
