import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacity, Image } from 'react-native';
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismountUser, selectUser } from '../../reducers/user';

export default function Profile({ navigation }) {
  const { user } = useSelector(selectUser);
  const loadedFonts = loadFonts();
  const [lowerInputActive, setLowerInputActive] = useState(false);
  const [avoidKeyboard, setAvoidKeyboard] = useState(false);

  if (!loadedFonts) return <></>;

  return (
    <>
      <View
        style={styles.mainContainer}
        bottomPositionOnKeyboardOpen={200}
        onKeyboardOpen={() => setAvoidKeyboard(true)}
        onKeyboardClose={() => setAvoidKeyboard(false)}
        active={lowerInputActive && avoidKeyboard ? true : false}>
        <View style={styles.header}>
          <Text style={styles.username}>{`${user.firstName} ${user.lastName}`}</Text>
          <LogoutBtn navigation={navigation} />
        </View>
        <View style={styles.photoContainer}>
          <Image
            style={styles.photo}
            source={{
              uri: 'https://eijwvqaycbm.exactdn.com/wp-content/uploads/2012/09/Van-Damme-chien-1200x1799.jpg',
            }}
          />
        </View>
        <View style={styles.userInfo}>
          <Text style={styles.email}>{user.email}</Text>
        </View>
        <ViewDocumentsBtn navigation={navigation} />
      </View>
      <View style={{ height: 70 }}></View>
      <BottomToolbar />
    </>
  );
}

function ViewDocumentsBtn({ navigation }) {
  return (
    <TouchableOpacity style={styles.documentBtn} onPress={() => navigation.navigate('MyDocuments')}>
      <Text style={styles.documentBtnTxt}>View documents</Text>
    </TouchableOpacity>
  );
}

function LogoutBtn({ navigation }) {
  const dispatch = useDispatch();

  return (
    <TouchableOpacity
      style={styles.logoutBtn}
      onPress={() => {
        dispatch(dismountUser());
      }}>
      <Text style={styles.logoutBtnTxt}>Log out</Text>
    </TouchableOpacity>
  );
}
