import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight, TouchableOpacity, ImageBackground, Button, Dimensions, Animated} from 'react-native';
import React, { useEffect, useState, useRef } from 'react'

const styles = StyleSheet.create({
  image: {
    height: 220,
    aspectRatio:1,
    borderRadius: 10,
  },
})

const ImageLoader = () => {

  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(-500)).current;


  useEffect(() => { Animated.timing(opacity, {
    toValue: 1,
    duration: 1500,
    useNativeDriver: true,
  }).start()}
  ,[])

 
  return (
    <>
    <Animated.View
      style={{opacity: opacity}}
    >
      <Image style={styles.image}
 source={require("../../media/UI/6bit_Homepage_new.png")}
/>
    </Animated.View>
    </>
);
};

export default ImageLoader;