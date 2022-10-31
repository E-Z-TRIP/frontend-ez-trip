import { TouchableOpacity, View, Dimensions } from 'react-native';
import styles from './styles.css';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';

export default function BottomToolbar() {
  const navigation = useNavigation();

  return (
    <View style={styles.toolBar}>
      <Entypo name='compass' size={35} color='black' onPress={() => navigation.navigate('Discover')} />
      <FontAwesome5 name='house-user' size={35} color='black' />
      <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Search')}>
        <AntDesign name='search1' size={35} color='black' />
      </TouchableOpacity>
      <Entypo name='heart-outlined' size={35} color='black' />
      <FontAwesome5 name='user-circle' size={35} color='black' />
    </View>
  );
}
