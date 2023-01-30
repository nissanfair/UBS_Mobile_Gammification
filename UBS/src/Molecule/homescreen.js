import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';
import {Dimensions,TouchableOpacity, ImageBackground,} from 'react-native';
import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%", 
    }, 
    safeArea: {
      backgroundColor: "#262b2f"
     },
     container: {
      // height: Dimensions.get('window').height,
      height: 1,
      // backgroundColor: "#262b2f",
     },
     topContent: {
      // flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
     },
     bottomContent: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
     },
     mainText: {
      fontSize: 54,
      color: "white",
     },
     googleButton: {
      backgroundColor: "white",
      borderRadius: 4,
      paddingHorizontal: 34,
      paddingVertical: 15,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center'
     },
     googleButtonText: {
      marginLeft: 16,
      fontSize: 18,
      fontWeight: '600'
     },
     googleIcon: {
      height: 24,
      width: 24
     }
})

GoogleSignin.configure({
  webClientId:'451469943802-skhjd4i129udvodkadu714qlnq7peoa4.apps.googleusercontent.com',
  offlineAccess: true,
});

const HomeScreen = () => {
  // const GoogleSSO = () => {
  //   console.log("Testing Google SSO")
  // }

  //Just now when u click 3 times, then the Google thing pop up 3 times instead of once, i think can be fix with AbortController -- to be fixed WT 

  async function signinWithGoogle(){
    const { idToken } = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signinWithCredential(googleCredential)
  }

    // signOut = async () => {
    //   try {
    //     await GoogleSignin.revokeAccess();
    //     await GoogleSignin.signOut();
    //     setloggedIn(false);
    //     setuserInfo([]);
    //   } catch (error) {
    //     console.error(error);
    //   }
    // };

  return (
    <View>
        <TouchableHighlight>
          <ImageBackground source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {/* <View style={styles.topContent}>
            <Text style={styles.mainText}>
              Cybersecurity through Gamification
            </Text>
            </View> */}
            <View style={styles.bottomContent}>
            <TouchableOpacity style={styles.googleButton} onPress={signinWithGoogle}>
              <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
              />
              <Text style={styles.googleButtonText}>Sign in with Google</Text>
            </TouchableOpacity>
            </View>
          </View>
        </SafeAreaView>


    </View>
  )
}

export default HomeScreen;
