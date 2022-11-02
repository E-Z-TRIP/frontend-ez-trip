import { View, Text, ScrollView, KeyboardAvoidingView, TouchableOpacityBase } from 'react-native';
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomToolbar from '../../components/bottom-toolbar/bottom-toolbar';
import { TextInput, HelperText, Button } from 'react-native-paper';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { dismountUser } from '../../reducers/user';
import { TouchableOpacity } from 'react-native-gesture-handler';

export default function Profile({ navigation }) {
  const dispatch = useDispatch();
  const [textEmail, setTextEmail] = useState('dribble@hotmail.com');
  const [textPhone, setTextPhone] = useState('');
  const [textPassword, setTextPassword] = useState('');
  const hasErrors = () => {
    return !text.includes('@');
  };

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'} /*style={styles.containerKeyboard*/
        >
          <View style={styles.container}>
            <View style={styles.header}>
              <View style={styles.text}>
                {/* A remplacer par le nom et prénom de l'utilisateur */}
                <Text style={styles.title}>Username</Text>
              </View>
            </View>
          </View>

          <View style={styles.profilePhoto}></View>
          <FontAwesome name='pencil' size={20} style={styles.penIcon} />

          <View>
            <TextInput
              style={{
                backgroundColor: 'white',
                width: '80%',
                justifyContent: 'center',
                marginTop: 35,
                marginLeft: 35,
              }}
              label='Email' //A remplacer par l'adresse mail de l'utilisateur
              value={textEmail}
              onChangeText={(textEmail) => setTextEmail(textEmail)}
            />
          </View>

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '80%',
              justifyContent: 'center',
              marginTop: 35,
              marginLeft: 35,
            }}
            label='Phone number' // A remplacer par le numéro de l'utilisateur
            value={textPhone}
            onChangeText={(textPhone) => setTextPhone(textPhone)}
          />

          <TextInput
            style={{
              backgroundColor: 'white',
              width: '80%',
              justifyContent: 'center',
              marginTop: 35,
              marginLeft: 35,
            }}
            label='Password' // A remplacer par le numéro de l'utilisateur
            value={textPassword}
            onChangeText={(textPassword) => setTextPassword(textPassword)}
          />

          <TouchableOpacity
            onPress={() => {
              dispatch(dismountUser());
            }}
            style={styles.logOut}>
            <Text>Log-Out</Text>
          </TouchableOpacity>
        </KeyboardAvoidingView>
      </ScrollView>

      <BottomToolbar />
      <View style={{ height: 70 }}></View>
    </View>
  );
}
