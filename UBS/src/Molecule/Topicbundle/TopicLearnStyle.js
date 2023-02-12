/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  leftbackdrop: {
    width: '100%',
    height: '100%',
  },
  desc: {
    position: 'absolute',
    top: '0%',
    left: '10%',
    right: '10%',
    bottom: '0%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  leftbox: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "red",
    borderWidth: 5
  },
  middlebox:{
    width: '100%',
    height: '100%',
    flex: 4,
    borderColor: "green",
    borderWidth: 5
  },
  rightbox: {
    width: '100%',
    height: '100%',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: "yellow",
    borderWidth: 5
  },
  
});

export {styles};
