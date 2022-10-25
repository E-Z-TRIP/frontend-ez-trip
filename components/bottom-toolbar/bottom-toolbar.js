import { TouchableOpacity, View, Text, StyleSheet } from 'react-native';
import styles from './styles.css';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import DropShadow from "react-native-drop-shadow";

export default function BottomToolbar() {
  const style = StyleSheet.create({

  shadowProp: {
    shadowColor: '#17171' ,
    shadowOffset: {width: 0, height: -4},
    shadowOpacity: 0.7,
    shadowRadius: -3.5,
  }
})

const navigation = useNavigation(); 




  return (
    <View style={styles.container}>
      
      <TouchableOpacity style = {styles.searchBtn} onPress={() => navigation.navigate('Search')}>
        <AntDesign name='search1' size={35} color='black'  />
      </TouchableOpacity>
      
      <View style={styles.footer}>
        <View style={styles.icons1}>
          <Entypo name='compass' size={35} color='black' onPress={() => navigation.navigate('Discover')} />
          <FontAwesome5 name='house-user' size={35} color='black' />
        </View>
        <View style= {styles.icons2}>
          <Entypo name='heart-outlined' size={35} color='black' />
          <FontAwesome5 name='user-circle' size={35} color='black' />
        </View> 
       
        </View>
        </View>
    
  );
}
