import { View, Text, StyleSheet } from 'react-native';
// import styles from './style.css'


const styles = StyleSheet.create({

    heading: {
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 13,
        // alignItems: 'center',
        // justifyContent: 'center',
        
      },
      card: {
        backgroundColor: 'white',
        borderRadius: 15,
        paddingVertical: 55,
        paddingHorizontal: 35,
        width: '80%',
        marginVertical: 200,
        display: 'flex',
        justifyItems:'center',
        alignItems : 'center'
      },
      shadowProp: {
        shadowColor: '#171717',
        shadowOffset: {width: 20, height: 20},
        shadowOpacity: 0.3,
        shadowRadius: 10,
      },

    });


export default function Cards ({}) {
    return (
      <View style={[styles.card, styles.shadowProp]}>
        <View>
          <Text style ={styles.heading}>Cards here</Text>
        </View>
      </View>
    );
  }

 