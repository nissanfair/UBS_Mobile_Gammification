import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, TouchableOpacity, ImageBackground, Button, Dimensions, Animated} from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
// import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import {setloginStatus, setuserData, setuserName} from "../Redux/loginSlice";
// import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import ImageLoader from "./ImageLoader";

// This is for Sound Module.
import adventure from '../../media/Soundtracks/main/adventure.wav';
import Sound from 'react-native-sound';
import { AppState } from 'react-native';

// Default Code to make sure the music can play.
Sound.setCategory('Playback');

var adven;


const styles = StyleSheet.create({

  backgroundMainContainer: {
    flexDirection: 'column',
    width: "100%",
    height: "100%", 
    // borderColor: 'red',
    // borderWidth: 10,  
  },

  background : {
      width: "100%",
      height: "100%", 
      // zIndex: 1
      // flex: 1
      // borderColor: 'orange',
      // borderWidth: 10,  
 
  }, 

  backgroundContainer: {
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
    // flexDirection: 'column'
    // borderColor: 'green',
    // borderWidth: 10,  
  },

  viewContainer1: {
    flex: 1, 
    alignSelf: 'center',
    // borderColor: 'blue',
    // borderWidth: 2,  
    // height: '5%', 
    width: '35%',
    marginBottom: '2%'
  }, 

   bottomContent: {
    flex: 1,
    // borderColor: 'red',
    // borderWidth: 2,  
    height: '20%', 
    justifyContent: 'flex-end'
   },

   mainText: {
    fontSize: 54,
    // color: "white",
    zIndex: 1
   },

   googleButton: {
    backgroundColor: "white",
    borderRadius: 8,
    paddingHorizontal: '5%',
    paddingVertical: '5%',
    flexDirection: 'row',
    // justifyContent: 'flex-end'
    // zIndex: 1,
    // justifyContent: 'center',
    // alignItems: 'center', 
    // flex: 1
   },

   googleButtonText: {
    marginLeft: "15%",
    fontSize: 18,
    fontWeight: '600',
    zIndex: 1
   },

   googleIcon: {
    height: 24,
    width: 24,
    zIndex: 1
   },

   layer: {
     flex: 0.5, 
     justifyContent: 'center', 
     alignItems: 'center',
    //  width: "20%"
    //  fontSize: 18,
    // borderColor: 'red',
    // borderWidth: 5,  
   }, 

   container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

})



const HomeScreen = () => {

  const [userDataID, setUserDataID] = useState()
  const [userData, setUserData] = useState()
  const [userName, setUserName] = useState()
  const [loggedIn, setLoggedIn] = useState(false)

  // Use State for Music 
  const [appState, setAppState] = useState(AppState.currentState);
  const [isLoaded, setIsLoaded] = useState(false);

  // On Load to start playing
  useEffect(() => {
    adven = new Sound(adventure, (error) => {
      if (error) {
        console.log('Error loading sound: ', error);
      } else {
        console.log('Sound loaded successfully');
        setIsLoaded(true);
        adven.setVolume(0.5);
        adven.play();
        adven.setNumberOfLoops(-1);
      };
    }
    );
  }, []);

  // The Actual Listener. 
  useEffect (() => {
    const handleAppStateChange = () => {
      console.log("Sound tEst "+appState)
      console.log(appState)
      if (appState === 'active') {
        // App has come to the foreground
        // Start playing sound again
        adven.getCurrentTime((seconds) => {
          if (seconds != 0) {
            adven.setVolume(0.5);
            adven.play();
            adven.setNumberOfLoops(-1);
          }
        });
      } else if (appState === 'background' && appState==="inactive") {
        // App has gone to the background
        // Stop playing sound
        adven.pause();
      }
      setAppState(appState);
    };
    handleAppStateChange('change')
  },[appState])

  // This is the wrong piece of code. 
  // useEffect(() => {
  //   AppState.addEventListener('change', handleAppStateChange);
  //   return () => {
  //     AppState.removeEventListener('change', handleAppStateChange);
  //   };
  // }, []);


  // const handleAppStateChange = (nextAppState) => {
  //   // If the user is currently in the app 
  //   if (nextAppState === 'active') {
  //     // App has come to the foreground
  //     // Start playing sound again
  //       adven.getCurrentTime((seconds) => {
  //         if (seconds != 0) {
  //           adven.setVolume(0.5);
  //           adven.play();
  //           adven.setNumberOfLoops(-1);
  //         }
  //       });
  //   } else if (appState === 'active' && nextAppState.match(/inactive|background/)) {
  //     // App has gone to the background
  //     // Stop playing sound
  //     adven.pause();
  //   }
  //   setAppState(nextAppState);
  // };

  const navigation = useNavigation(); 
  let dispatch = useDispatch();

  console.log('I am logging')

  useEffect(()=>{
    const configureGoogleSignIn = async () => {
      await GoogleSignin.configure({
        webClientId:'451469943802-jk2mbshpiq039uf4l4k55q1i6kip8knl.apps.googleusercontent.com',
        offlineAccess: true,
        prompt: 'select_account'
        // scopes: ["https://www.googleapis.com/auth/userinfo.profile"]
      }); 
  };
    configureGoogleSignIn();
  }, []);


  console.log('I am about to sign in')

  

  const signinWithGoogle = async () => {

    try{
      const { user } = await GoogleSignin.signIn();

      // setUserDataID(idToken);
      setUserData(user);

      // console.log("This is the TokenID" , userDataID);
      console.log("This is the User Data" , userData);
      
      if (Object.keys(userData).length !== 0) {
        console.log(userData)
        console.log(typeof userData)
        console.log(userData['givenName'])
        console.log(typeof userData['givenName'])
        setLoggedIn(true)
        // console.log(loggedIn)
        setUserName(userData['givenName']);
        console.log('This is the UserName:', userName)
        // setUserData(prevState => ({...prevState,
        //   isLoggedin: loggedIn, //loggedIn stores boolean values 
        //   userName: userName
        // }));
        const updatedUserData = {...userData, isLoggedin: 'true', userName: 'yuxiang123UPDATED'};
        console.log(updatedUserData)

        //dispatching 
        dispatch(setuserData(userData))
        dispatch(setuserName(userName))
        dispatch(setloginStatus(loggedIn))

      //   // need to edit the json to add the isloggedin 
      //   // put and post 
        
      fetch('http://10.0.2.2:3000/login',  {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(updatedUserData)
        })
        .then(response => response.json())
        // .then(data => {
        //   pushIntro(data.data[`${topic}_Learning`]);
        // })
        .catch(error => {
          console.log(error);
        });
      }

        //navigate to the next page when userData is populated 
        console.log("MainScreen")
        navigation.navigate('MainScreen')
      }

      //firebase 
      // const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      // console.log(googleCredential)
      // // return auth().signinWithCredential(googleCredential);
      // const user_signin =  auth().signinWithCredential(googleCredential);
      // user_signin.then((user) => {
      //   console.log(user)
      // })
      // .catch((error) => 
      // console.log(error))

    //Catching Errors here 
    catch(error){
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('Cancel');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('Signin in progress');}
        else{
          console.log(error.message)
        }
    }
  }; 

  if(loggedIn == false){
  return (
    <View style={styles.backgroundMainContainer}>

        <View style={styles.backgroundContainer}>
          <TouchableHighlight>
            <ImageBackground resizeMode="cover" source={require("../../media/UI/cloud_homepage.gif")} style={styles.background} />
          </TouchableHighlight>
        </View>
{/* 
        <View style={styles.layer}>
            <View style={styles.container}>
              <ImageLoader/>
            </View>
        </View> */}

        <View style={styles.viewContainer1}>
          <View style={styles.bottomContent}>
              <TouchableOpacity onPressIn={() => signinWithGoogle()} style={styles.googleButton} >
                <Image
                style={styles.googleIcon}
                source={{
                  uri: "https://i.ibb.co/j82DCcR/search.png",
                }}
                />
                <Text style={styles.googleButtonText}>Sign In with Google</Text>
              </TouchableOpacity>
            </View>
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

            
          {/* </View> */}

    </View>
  )
  }

//   else{
//     return(
//       <View>
//         {/* <Button title="Let's start!" onPress={() =>
//           navigation.navigate("Topic")}/> */}
//         {/* <Button title="Let's start!" onPress={Forwardbutton}/> */}
//         <Text>Resume Game</Text>
//       </View>
//     )
// }
}
export default HomeScreen;
export { adven };


