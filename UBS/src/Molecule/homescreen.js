// import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, TouchableOpacity, ImageBackground, Button} from 'react-native';
import React, { useEffect, useState } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, useNavigation} from '@react-navigation/native';

const styles = StyleSheet.create({
  background : {
      // width: "100%",
      // height: "100%", 
      flex: 1
 
  }, 
  safeArea: {
    backgroundColor: "#262b2f"
    // flex: 1
   },
   container: {
    // height: Dimensions.get('window').height,
    // height: 1,
    // flex: 1,
    backgroundColor: "#262b2f",
   },
   topContent: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
   },
   bottomContent: {
    // flex: 1,
    // alignItems: 'center',
    // justifyContent: 'center'
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
    alignItems: 'center', 
    // flex: 1
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

const HomeScreen = () => {
  const [userDataID, setUserDataID] = useState()
  const [userData, setUserData] = useState()
  const [userName, setUserName] = useState()
  // const [userDataScope, setUserDataSCope] = useState()
  const [loggedIn, setloggedIn] = useState(false);
  const navigation = useNavigation();

  console.log('I am logging')

  useEffect(()=>{
    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        webClientId:'451469943802-jk2mbshpiq039uf4l4k55q1i6kip8knl.apps.googleusercontent.com',
        offlineAccess: true,
        // scopes: ["https://www.googleapis.com/auth/userinfo.profile"]
      }); 
  };
    configureGoogleSignIn();
  }, []);

  console.log('I am about to sign in')

  const signinWithGoogle = async () => {
    // const navigation = useNavigation();
    try{
      const { idToken, user } = await GoogleSignin.signIn();
      // const navigation = useNavigation();
      setUserDataID(idToken);
      setUserData(user);

      console.log("This is the TokenID" , userDataID);
      console.log("This is the User Data" , userData);
      // console.log("This is the Scopes" , userDataScope);
      
      if (Object.keys(userData).length !== 0) {
        console.log(userData)
        console.log(typeof userData)
        console.log(userData['givenName'])
        setloggedIn(true);
        setUserName(userData['givenName']);

        navigation.navigate('Topic')
        // alert('WELCOME BACK');
        } 
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(googleCredential)
      // return auth().signinWithCredential(googleCredential);
      const user_signin =  auth().signinWithCredential(googleCredential);
      user_signin.then((user) => {
        console.log(user)
      })
      .catch((error) => 
      console.log(error))

    //Catching Errors here 
    } catch(error){
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        alert('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        alert('Signin in progress');}
        // else{
        //   alert(error.message)
        // }
    }
  }; 

  // const Forwardbutton = () => {
  //   const navigation = useNavigation();
  //   navigation.navigate("Progress")
  // }


//   const signout = async () =>{
//     try {
//       await GoogleSignin.revokeAccess();
//       await auth().signOut().then(() => alert('Your are signed out!'));
//       setloggedIn(false);
//       console.log('sign out success')
//     } catch (error) {
//       console.error(error);
//     }
// };

  if(loggedIn == false){
  return (
    <View>
        <TouchableHighlight>
          <ImageBackground resizeMode="cover" source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
        <SafeAreaView style={styles.safeArea}>
          <StatusBar barStyle="light-content" />
          <View style={styles.container}>
            {/* <View style={styles.topContent}>
            <Text style={styles.mainText}>
              Cybersecurity through Gamification
            </Text>
            </View> */}

{/* for sign in */}
            <View style={styles.bottomContent}>
            {/* <TouchableOpacity style={styles.googleButton} onPress={signinWithGoogle}> */}
            <TouchableOpacity 
            // onPress={() =>signinWithGoogle()
            //   // .then(res => {console.log(res);
            //   // this.setUserData(res)}) 
            //   // .catch (error => console.log("This is the error message at sign in:", error.message)) 
            // }
            onPressIn={() =>
              signinWithGoogle()
            }
            // onPress={
            //   () => Forwardbutton()
            // }
            style={styles.googleButton} >

              <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
              />
              <Text style={styles.googleButtonText}>Sign In with Google</Text>
            </TouchableOpacity>
            </View>

{/* for sign out */}
          {/* <View style={styles.bottomContent}> */}
            {/* <TouchableOpacity style={styles.googleButton} onPress={signinWithGoogle}> */}
            {/* <TouchableOpacity 
            onPress={
              () => signout() 
              .then(res => {console.log(res);
              this.setUserData([])}) 
              .catch (error => console.log(error)) 
            }
            style={styles.googleButton} >

              <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
              />
              <Text style={styles.googleButtonText}>Sign Out with Google</Text>
            </TouchableOpacity> */}
          {/* </View> */}

            
          </View>
        </SafeAreaView>


    </View>
  )
  }

//   else{
//     return(
//       <View>
//         {/* <Button title="Let's start!" onPress={() =>
//           navigation.navigate("Topic")}/> */}
//         {/* <Button title="Let's start!" onPress={Forwardbutton}/> */}
//         <Text>kjasbcijaciajbcaijbcjacbjka</Text>
//       </View>
//     )

// }
}
export default HomeScreen;




