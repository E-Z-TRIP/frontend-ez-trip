import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomToolbar from "../../components/bottom-toolbar/bottom-toolbar";
import { TextInput, HelperText } from 'react-native-paper';
import { useState } from "react";


export default function Profile() {

const [textEmail, setTextEmail] = useState("dribble@hotmail.com")
const [textPhone, setTextPhone] = useState("")
const [textPassword, setTextPassword] = useState("")
const hasErrors = () => {
  return !text.includes('@');
};

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={{ flex: 1 }}>
     
      <ScrollView> 
        <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} /*style={styles.containerKeyboard*/>
        <View style={styles.container}>
          <View style={styles.header}>

            <View style={styles.text}>
              {/* A remplacer par le nom et prénom de l'utilisateur */}
              <Text style={styles.title}>Username</Text> 
            </View>
          </View>
        </View>


        <View style={styles.profilePhoto}></View>
        <FontAwesome name="pencil" size={20} style={styles.penIcon} />

        <View>
        <TextInput
        style={{
          backgroundColor: 'white',
          width: '80%',
          justifyContent: 'center',
          marginTop: 35,
          marginLeft: 35,
          
        }}
      label="Email" //A remplacer par l'adresse mail de l'utilisateur
      value={textEmail}
      onChangeText={textEmail => setTextEmail(textEmail)}
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
      label="Phone number" // A remplacer par le numéro de l'utilisateur
      value={textPhone}
      onChangeText={textPhone => setTextPhone(textPhone)}
    />

<TextInput
        style={{
          backgroundColor: 'white',
          width: '80%',
          justifyContent: 'center',
          marginTop: 35,
          marginLeft: 35,
          
        }}
      label="Password" // A remplacer par le numéro de l'utilisateur
      value={textPassword}
      onChangeText={textPassword => setTextPassword(textPassword)}
    />

        {/* <View style={{
          borderBottomWidth: '1px',
          width: '80%',
          justifyContent: 'center',
          marginTop: 35,
          marginLeft: 35
        }}> */}
          {/* <TextInput style={styles.textOverBorder}>Name</TextInput> */}
        {/* </View> */
 ///////////////////////////////////////////////////////////
       /*  <View style={styles.signUpFormContainer}>
          <TextInput
            name='firstName'
            label='First Name'
            wrapperStyle={styles.inputWrapper}
            inputStyle={styles.input}
            defaultStyleOverides={rnPaperTextInputTheme()}
            onFocus={() => setPasswordInputActive(false)}
          /></View>
 */}

</KeyboardAvoidingView>
      </ScrollView>
      
      <BottomToolbar />
      <View style={{ height: 70 }}></View>

    </View>
  )
}