import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image} from 'react-native';

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})

export default function HomeScreen() {
  return (
    <View>
        <Image source={require("../../media/Environment/SSO.png")} style={styles.background} />
    </View>
  )
}
