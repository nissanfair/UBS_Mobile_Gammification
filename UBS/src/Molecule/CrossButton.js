import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

const BackButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        <View style={styles.arrowContainer}>
          <View style={[styles.line, styles.line1]} />
          <View style={[styles.line, styles.line2]} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  arrowContainer: {
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  line: {
    position: 'absolute',
    width: 8,
    height: 2,
    backgroundColor: '#000',
  },
  line1: {
    transform: [{ rotate: '45deg' }],
  },
  line2: {
    transform: [{ rotate: '-45deg' }],
  },
});

export default BackButton;