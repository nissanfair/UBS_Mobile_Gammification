import React from 'react'
import { SafeAreaView, ScrollView, StatusBar, StyleSheet, Text, useColorScheme, View, Section, Pressable, Image } from 'react-native';

const styles = StyleSheet.create({
  background: {
    width: "100%",
    height: "100%"
  }
})

export default function LevelMap() {
  return (
    <PaperProvider>
      <SafeAreaView>
        <View>
          <Image source={require("../../media/Environment/s4m_ur4i-bg_clouds.png")} style={styles.background} />
        </View>
      </SafeAreaView>
    </PaperProvider>
  )
}
