import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {ProgressBar} from '@react-native-community/progress-bar-android';

export default function Progress() {
  return (
    <View style={styles.container}>
        <View style={styles.example}>
        <Text>Topic 1</Text>
        <Text>In Progress</Text>
        <ProgressBar />
      </View>
      {/* <View style={styles.example}>
        <Text>Topic 2 </Text>
        <Text>Loading...</Text>
        <ProgressBar styleAttr="Horizontal" />
      </View>
      <View style={styles.example}>
        <Text>Topic 3</Text>
        <Text>In Progress</Text>
        <ProgressBar styleAttr="Horizontal" color="#2196F3" />
      </View>  */}
      <View style={styles.example}>
        <Text>Topic 4: 50% done</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={0.5}
          color="red"
        />
      </View>
      <View style={styles.example}>
        <Text>Topic 5: 100% done</Text>
        <ProgressBar
          styleAttr="Horizontal"
          indeterminate={false}
          progress={1.0}
          color="blue"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  example: {
    marginVertical: 24,
  },
});