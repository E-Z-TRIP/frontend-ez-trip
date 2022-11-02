import { TouchableOpacity, View, Dimensions } from 'react-native';
import styles from './styles.css';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';

export default function BottomToolbar() {
  const navigation = useNavigation();
  const route = useRoute();

  return (
    <View style={styles.toolBar}>
      <Entypo
        name='compass'
        size={35}
        color={route.name === 'Discover' ? '#C46B4D' : 'black'}
        onPress={() => navigation.navigate('Discover')}
      />
      <Entypo
        name='heart-outlined'
        size={35}
        color={route.name === 'MyTrips' ? '#C46B4D' : 'black'}
        onPress={() => navigation.navigate('MyTrips')}
      />

      <TouchableOpacity style={styles.searchBtn} onPress={() => navigation.navigate('Search')}>
        <AntDesign color={route.name === 'Search' ? '#C46B4D' : 'black'} name='search1' size={35} />
      </TouchableOpacity>

      <Entypo
        color={route.name === 'MyQuotations' ? '#C46B4D' : 'black'}
        name='text-document'
        size={35}
        onPress={() => navigation.navigate('MyQuotations')}
      />
      <FontAwesome5 color={route.name === 'User' ? '#C46B4D' : 'black'} name='user-circle' size={35}  onPress={() => navigation.navigate('Profile')} />
    </View>
  );
}
