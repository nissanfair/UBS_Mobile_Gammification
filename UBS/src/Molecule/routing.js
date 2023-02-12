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

// import { Drawer } from 'react-native-paper';

const Stack = createStackNavigator()




function Routing() {

  // React Redux Goes Here for Protected Route 
  // let jobRoles_desc = useSelector((state) => state.login.jobrole_desc)
  // let jobRoles_id = useSelector((state) => state.jobrole.jobrole_id)
  // let jobRoles_name = useSelector((state) => state.jobrole.jobrole_name)
  return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='TopicIntroduction'  >
          <Stack.Screen name="TopicIntroduction" component={TopicIntroduction} options={{headerShown: false}}/>
          <Stack.Screen name="TopicLearning" component={TopicLearning} options={{headerShown: false}}/>
          <Stack.Screen name="Stages" component={Stage} options={{headerShown: false}}/>
          <Stack.Screen name="Topic" component={Topic} options={{headerShown: false}}/>
        </Stack.Navigator>
      </NavigationContainer>
  );
};

export default Routing;