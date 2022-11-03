import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacityBase, Image } from 'react-native';
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { dismountUser, selectUser } from '../../reducers/user';
import { TouchableOpacity } from 'react-native';
import ValidateUserForm from './form/ValidateUserForm';
import KeyboardAwareView from '../../components/keyboard_aware_view/KeyboardAwareView';

export default function Profile({ navigation }) {
  const { user } = useSelector(selectUser);
  const loadedFonts = loadFonts();
  const [lowerInputActive, setLowerInputActive] = useState(false);
  const [avoidKeyboard, setAvoidKeyboard] = useState(false);

  if (!loadedFonts) return <></>;

  return (
    <>
      <KeyboardAwareView
        style={styles.mainContainer}
        bottomPositionOnKeyboardOpen={200}
        onKeyboardOpen={() => setAvoidKeyboard(true)}
        onKeyboardClose={() => setAvoidKeyboard(false)}
        active={lowerInputActive && avoidKeyboard ? true : false}>
        <View style={styles.header}>
          <Text style={styles.username}>{user.firstName}</Text>
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
        <ValidateUserForm
          navigation={navigation}
          onEmailInputFocus={() => setLowerInputActive(true)}
          onPasswordInputFocus={() => setLowerInputActive(true)}
        />
      </KeyboardAwareView>
      <View style={{ height: 70 }}></View>
      <BottomToolbar />
    </>
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
