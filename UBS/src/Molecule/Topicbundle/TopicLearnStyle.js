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
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
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
  },
  middlebox:{
    width: '100%',
    height: '100%',
    flex: 4,
  },
  rightbox: {
    width: '100%',
    height: '100%',
    flex: 1,
    flexDirection: 'column',
    justifyContent: "center",
    alignItems: 'center',
  },
  forwardbutton:{
    flex:3,
    alignItems: 'center',
    justifyContent: "flex-end",
  },
  exitbutton:{
    position: 'absolute',
    bottom:'0%',
    right:'2%'
   
  }
  
});

export {styles};
