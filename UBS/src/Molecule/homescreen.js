import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})


export default function HomeScreen({navigation}) {
  const GoogleSSO = () => {
    navigation.navigate("Topic")
  }

  return (
    <View>
        <TouchableHighlight onPress={GoogleSSO}>
          <Image source={require("../../media/Environment/SSO.png")} style={styles.background} />
        </TouchableHighlight>
    </View>
  )
}
