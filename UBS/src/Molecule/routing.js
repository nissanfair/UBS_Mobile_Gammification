
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
import Home from "./home"
import Profile from "./profile"
import Profilesetting from './profilesetting';
import Inventory from './inventory';
import HomeScreen from "./homescreen"
import LevelMap from './LevelMap';
import Progress from './progress';
import Topic from './Topic'
import Game from './Topicbundle/Gamebundle/Game'
// import { Drawer } from 'react-native-paper';


const Stack = createStackNavigator()
const Tab = createBottomTabNavigator();



function Routing() {

  // React Redux Goes Here for Protected Route 
  // let jobRoles_desc = useSelector((state) => state.login.jobrole_desc)
  // let jobRoles_id = useSelector((state) => state.jobrole.jobrole_id)
  // let jobRoles_name = useSelector((state) => state.jobrole.jobrole_name)
  return (
      <NavigationContainer options={{ headerShown: false }}>
        <Stack.Navigator initialRouteName='Game'>
          <Stack.Screen name="Topic" component={Topic} />
          <Stack.Screen name="Game" component={Game} options={{ headerShown: false }}/>

        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Routing;