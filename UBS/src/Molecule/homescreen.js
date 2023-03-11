import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, TouchableOpacity, ImageBackground, Button, Dimensions, Animated} from 'react-native';
import React, { useEffect, useState, useRef } from 'react'
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import { Easing, useSharedValue, withTiming } from "react-native-reanimated";
import Svg, {Path} from "react-native-svg";


// const colors = ["#FFC27A", "#7EDAB9", "#45A6E5", "#FE8777"];
// const vWidth=800;
// const vHeight=600;
// const width = Dimensions.get('window').width - 64; 
// const height = (width * vHeight) / vWidth;
// const paths = [

// "M6 42V36H0V12H6V6H12V0H36V6H18V12H12V18H36V24H42V36H36V42H6ZM12 36H30V24H12V36Z" ,
// "M96 42V0H132V6H138V18H132V24H138V36H132V42H96ZM108 18H126V6H108V18ZM108 36H126V24H108V36Z" ,
// "M150 42V36H162V6H150V0H186V6H174V36H186V42H150Z" ,
// "M210 42V6H198V0H234V6H222V42H210Z" ,

// ];

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
  image: {
    width: 400,
    height: 390,
    borderRadius: 10,
  },
})



const HomeScreen = () => {
  const [userDataID, setUserDataID] = useState()
  const [userData, setUserData] = useState()
  const [userName, setUserName] = useState()
  // const [userDataScope, setUserDataSCope] = useState()
  const [loggedIn, setloggedIn] = useState(false);
  const navigation = useNavigation();

  console.log('I am logging')

//standalone function 
  const ImageLoader = ({ style, source }) => {
    const [opacity] = useState(new Animated.Value(0));
    const scale = useRef(opacity.interpolate({
      inputRange: [0, 1],
      outputRange: [0.85, 1],
    })).current;
  
    const onLoad = () => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 1500,
        useNativeDriver: true,
      }).start();
    };
  
    return (
      <Animated.Image
        onLoad={onLoad()}
        source={source}
        style={[
          {
            opacity,
            transform: [
              {
                scale,
              },
            ],
          },
          style,
        ]}
      />
    );
  };

    
//standalone function 


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

    try{
      const { idToken, user } = await GoogleSignin.signIn();

      setUserDataID(idToken);
      setUserData(user);

      console.log("This is the TokenID" , userDataID);
      console.log("This is the User Data" , userData);
      
      if (Object.keys(userData).length !== 0) {
        console.log(userData)
        console.log(typeof userData)
        console.log(userData['givenName'])
        setloggedIn(true);
        setUserName(userData['givenName']);
        navigation.navigate('Topic')
      } 

      //firebase 
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);
      console.log(googleCredential)
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
        else{
          alert(error.message)
        }
    }
  }; 


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
    <View style={styles.backgroundMainContainer}>

        <View style={styles.backgroundContainer}>
          <TouchableHighlight>
            <ImageBackground resizeMode="cover" source={require("../../media/UI/cloud_homepage.gif")} style={styles.background} />
          </TouchableHighlight>
        </View>

        <View style={styles.layer}>
          {/* <Svg  viewBox={[0, 0, vWidth, vHeight].join(" ")}> */}
          {/* <Svg style={{width: '100%', height: "100%"}}>
            {paths.map((d, key) => (<Path d={d} stroke='white' strokeWidth={10} key={key} />))}
          </Svg> */}

            <View style={styles.container}>
              <ImageLoader
                style={styles.image}
                source={require("../../media/UI/6bit_Homepage.png")}
              />
            </View>

        </View>

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

        {/* <View style={styles.viewContainer2}></View>
        <View style={styles.viewContainer3}></View> */}

{/* for sign in */}
          {/* <View style={styles.bottomContent}>

            <TouchableOpacity onPressIn={() => signinWithGoogle()} style={styles.googleButton} >
              <Image
              style={styles.googleIcon}
              source={{
                uri: "https://i.ibb.co/j82DCcR/search.png",
              }}
              />
              <Text style={styles.googleButtonText}>Sign In with Google</Text>
            </TouchableOpacity>

          </View> */}

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

  else{
    return(
      <View>
        {/* <Button title="Let's start!" onPress={() =>
          navigation.navigate("Topic")}/> */}
        {/* <Button title="Let's start!" onPress={Forwardbutton}/> */}
        <Text>Resume Game</Text>
      </View>
    )

}
}
export default HomeScreen;

