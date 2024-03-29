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
const Stack = createStackNavigator();

export default function App() {
  return (
    <Provider store={store}> 
      <Routing /> 
      {/* // place to add custom fonts */}
      

    </Provider>
    


    // ======= JP placeholder code, remove after the SSO is done ==========
    //   <NavigationContainer>
    //     <Stack.Navigator>
    //       <Stack.Screen name="LevelSelection" component={Stages} />
    //     </Stack.Navigator>
    // </NavigationContainer>

  )
}



