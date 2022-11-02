import { View, Text, ScrollView, KeyboardAvoidingView } from "react-native";
import styles from './style.css';
import { loadFonts } from '../../assets/fonts/fonts';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import BottomToolbar from "../../components/bottom-toolbar/bottom-toolbar";
import { TextInput } from 'react-native-paper';
import { useState } from "react";


export default function Profile() {

const [text, setText] = useState("")

  const loadedFonts = loadFonts();
  if (!loadedFonts) return <></>;

  return (
    <View style={{ flex: 1 }}>
      <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} /*style={styles.containerKeyboard*/>
      <ScrollView>
        <View style={styles.container}>
          <View style={styles.header}>

            <View style={styles.text}>
              <Text style={styles.title}>Username</Text>
            </View>
          </View>
        </View>


        <View style={styles.profilePhoto}></View>
        <FontAwesome name="pencil" size={20} style={styles.penIcon} />

        <TextInput
        style={{
          backgroundColor: 'white',
          width: '80%',
          justifyContent: 'center',
          marginTop: 35,
          marginLeft: 35,
          
        }}
      label="Username@Eztrip.com"
      value={text}
      onChangeText={text => setText(text)}
    />

<TextInput
        style={{
          backgroundColor: 'white',
          width: '80%',
          justifyContent: 'center',
          marginTop: 35,
          marginLeft: 35,
          
        }}
      label="Username@Eztrip.com"
      value={text}
      onChangeText={text => setText(text)}
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


      </ScrollView>
      </KeyboardAvoidingView>
      <BottomToolbar />
      <View style={{ height: 70 }}></View>

    </View>
  )
}