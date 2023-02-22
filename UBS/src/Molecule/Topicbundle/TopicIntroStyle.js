/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
  },

  leftbox: {
    flex: 1,
    
  },
  rightbox: {
    flex: 1,
    
  },
  centerbox:{
    flex: 4,
    flexDirection: "column"

  },
  topbox:{
    borderColor: "green",
    borderWidth: 5,
    flex: 3,
  },
  innerrightbox:{
    flex: 1,
    flexDirection: 'column',
  },
  monsterbox: {
    flex: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonbox: {
    flex: 1,
    flexDirection: "row",
  },
  backgroundContainer: {
    position: 'absolute',
    width: "100%",
    height: "100%",
    justifyContent: 'center',
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
    fontFamily: 'PressStart2P-Regular',
  },
  wizard: {
    height: '50%',
    width: '50%',
  },
  start:{
    flex:3,
    flexDirection: 'row', 
    justifyContent: 'flex-end'
  },
  back:{
    flex:3,
    flexDirection: 'row', 
    justifyContent: 'flex-start'
  },
  

});

export {styles};
