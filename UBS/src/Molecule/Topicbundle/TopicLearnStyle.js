/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  main: {
    width: '100%',
    height: '100%',
    flexDirection: 'column',
  },
  backgroundContainer: { 
    position: 'absolute',
    top: '0%',
    bottom: '0%',
    left: '0%',
    right: '0%',
  },
  titleContainer:{
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: "row"

  },
  middleContainer:{
    flex: 2,
    flexDirection: 'row',
  },
  firstContainer:{
    flex: 1,
    alignItems: "center"
  },
  secondContainer:{
    flex: 1,
    alignItems: "center"
  },
  thirdContainer:{
    flex: 1,
    alignItems: "center"
  },
  fourthContainer:{
    flex: 1,
    alignItems: "center"
  },
  origins:{
    width:"90%",
    height: "70%",
  },
  bottomContainer:{
    flex: 3,
    alignItems: "center",    
  },
  backButtonContainer:{
    flex:1,
    
  },
  exitContainer:{
    alignSelf: "flex-end"
  },
  speechText:{
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 18,
    lineHeight: 25,
    alignSelf: "center"
  },
  speechImage:{
    width:"100%",
    height: "100%",
    flexDirection: "row",
  },
  textstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 20,
  },
  titleText: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 20,
    flex:5,
  },
  avatar:{
    flex: 1,
    marginLeft: "12%",
    marginBottom: "6%",
    justifyContent: "center",
  },
  avatarText:{
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 15,
    alignSelf: 'center',
    marginBottom: "5%"
  },
  speechBox:{
    flex: 5,
    marginRight: "12%",
    marginBottom: "5%",
    alignItems: "center",
    justifyContent: "center"
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  teacher:{
    width: "140%",
    height: "90%",
    alignSelf: "center",
    marginBottom: "10%"
  },
  //END OF INDEX 0 STYLE SHEET 

  //Start of INDEX 1 Style Sheet
  mainfirst: {
    width: '100%',
    height: '100%',
    flexDirection: 'row',
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
    right:'0%'
   
  }
  
});

export {styles};
