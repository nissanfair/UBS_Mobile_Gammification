/* eslint-disable prettier/prettier */

// Imported Libraries 
import React from 'react';
import store from "../Redux/store"
import {Provider} from "react-redux"
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section} from 'react-native';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useSelector} from "react-redux";


// Import External Molecules
import TopicIntroduction from "../Molecule/Topicbundle/TopicIntroduction";
import TopicLearning from "../Molecule/Topicbundle/TopicLearning";
import Progress from "../Molecule/progress";
import Game from "../Molecule/Topicbundle/Gamebundle/Game";
import HomeScreen from "../Molecule/homescreen";
import Topic from "../Molecule/Topic";
import Summary from "../Molecule/Topicbundle/Gamebundle/Summary"
import MainScreen from "../Molecule/mainMenu"
import Education from '../Molecule/Education';
import Loading from './Topicbundle/Gamebundle/Loading';

const Stack = createStackNavigator()




function Routing() {
  return (
    <NavigationContainer>
    <Stack.Navigator
      initialRouteName='HomeScreen'
      screenOptions={{
        animationEnabled: false,
        removeClippedSubviews: true,
        shouldRasterizeIOS: true,
        renderToHardwareTextureAndroid: true,
      }}
    >
      <Stack.Screen name="HomeScreen" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="MainScreen" component={MainScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Topic" component={Topic} options={{ headerShown: false }} />
      <Stack.Screen name="Education" component={Education} options={{ headerShown: false }} />
      <Stack.Screen name="TopicIntroduction" component={TopicIntroduction} options={{ headerShown: false }} />
      <Stack.Screen name="TopicLearning" component={TopicLearning} options={{ headerShown: false }} />
      <Stack.Screen name="Progress" component={Progress} options={{ headerShown: false }} />
      <Stack.Screen name="Game" component={Game} options={{ headerShown: false }} />
      <Stack.Screen name="Loading" component={Loading} options={{ headerShown: false }} />
      <Stack.Screen name="Summary" component={Summary} options={{ headerShown: false }} />
    </Stack.Navigator>
  </NavigationContainer>
  );
};

export default Routing;