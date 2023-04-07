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
    flexDirection: 'row',
  },
  leftbox: {
    flex: 1,
    flexDirection: 'column-reverse'
  },
  rightbox: {
    flex: 1,
    flexDirection: 'column-reverse',
  },
  centerbox: {
    flex: 4,
    flexDirection: 'column',
  },
  topbox: {
    flex: 4,
    flexDirection: 'row',
  },
  lefttopbox: {
    flex: 3,
    
  },
  monsterbox: {
    top: '15%',
    bottom: '0%',
    left: '35%',
    height: '80%',
    width: '68%',
    justifyContent: 'center',

  },
  monster: {
    alignSelf: 'center',
    height:"90%",
    width: "90%",
  },
  monsterr: {
    alignSelf: 'center',
    height:"85%",
    width: "90%",
  },
  righttopbox: {
    flex: 3,

  },
  reward: {
    top: '30%',
    bottom: '0%',
    width: '75%',
    height: '70%',
    justifyContent: 'center',
  
  },
  bottombox: {
    flex: 3,
   
  },
  backgroundContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    justifyContent: 'center',
  },
  backdrop: {
    width: '100%',
    height: '100%',
  },
  desc: {
    top: '0%',
    left: '20%',
    right: '13%',
    width: '65%',
    height: "45%",
   
  },
  wizard: {
    flex: 1,
  },
  start: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  
  },
  back: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  textstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(7),
    marginTop: "5%",
    textAlign: 'center'
  },
  textdescheaderstyle: {
    color: 'red',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(10),
  },
  textrewardheaderstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(10),
    textAlign: 'center',
  },
  textrewardstyle: {
    color: 'gold',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(10),
    textAlign: 'center',
  },
  textdescstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: normalize(7),
    lineHeight: normalize(11),
  },
});

export {styles};
