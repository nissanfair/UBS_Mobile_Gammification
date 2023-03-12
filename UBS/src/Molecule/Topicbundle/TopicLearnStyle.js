/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import {Dimensions, Platform, PixelRatio} from 'react-native';

// start of size mathing
const {
  width: SCREEN_WIDTH,
  height: SCREEN_HEIGHT,
} = Dimensions.get('window');

const scale = SCREEN_WIDTH / 500;

export function normalize(size) {
  const newSize = size * scale 
  if (Platform.OS === 'andriod') {
    return Math.round(PixelRatio.roundToNearestPixel(newSize))
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2
  }
}
// end of size mathing

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
    lineHeight: normalize(11),
    alignSelf: "center",
    fontSize: normalize(8),
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
    fontSize: normalize(10),
  },
  titleText: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(12),
    flex:5,
  },
  avatar:{
    flex: 1,
    marginLeft: "13%",
    marginBottom: "6%",
    justifyContent: "center",
  },
  avatarText:{
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(10),
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
  desc: {
    position: 'absolute',
    top: '0%',
    left: '10%',
    right: '10%',
    bottom: '0%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  exitbutton:{
    position: 'absolute',
    bottom:'0%',
    right:'0%'
   
  }

});

export {styles};
