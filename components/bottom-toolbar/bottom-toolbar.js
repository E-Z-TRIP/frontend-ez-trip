import { TouchableOpacity, View, Text } from 'react-native';
import styles from './styles.css';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';


export default function BottomToolbar({}) {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        
      </TouchableOpacity>
      <View style={styles.footer}>
        <View style={styles.icons1}>
          <Entypo name='compass' size={35} color='black' />
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
