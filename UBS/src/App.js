// Imported Libraries 
import React from 'react';
import store from "./Redux/store"
import {Provider} from "react-redux"
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section} from 'react-native';
import {Colors,DebugInstructions,Header,LearnMoreLinks,ReloadInstructions,} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import {useSelector} from "react-redux";

// Import External Molecules
import Routing from "./Molecule/routing";
import Stages from './Molecule/Stages';
import AppNavigator from './Molecule/AppNavigator';
const Stack = createStackNavigator();

export default function App() {
  return (
    // <Provider store={store}> 
    //   {/* <Routing />  */}

    // </Provider>
    // ======= JP placeholder code, remove after the SSO is done ==========
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="LevelSelection" component={Stages} />
    //     </Stack.Navigator>
    // </NavigationContainer>

    <Provider store={store}>
      <NavigationContainer>
        <AppNavigator/>
      </NavigationContainer>
    </Provider>
  )
}



