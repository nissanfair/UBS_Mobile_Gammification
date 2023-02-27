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
    flexDirection: 'column-reverse',
  },
  centerbox: {
    flex: 4,
    flexDirection: 'column',
  },
  topbox: {
    flex: 3,
    flexDirection: 'row',
  },
  lefttopbox: {
    flex: 3,
  },
  monsterbox: {
    top: '10%',
    bottom: '0%',
    left: '35%',
    height: '70%',
    width: '65%',
    justifyContent: 'center',
  },
  monster: {
    alignSelf: 'center',
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
    left: '18%',
    right: '13%',
    width: '70%',
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
    fontSize: 12,
  },
  textdescheaderstyle: {
    color: 'red',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 12,
  },
  textrewardheaderstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  textrewardstyle: {
    color: 'gold',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 14,
    textAlign: 'center',
  },
  textdescstyle: {
    color: 'white',
    fontFamily: 'PressStart2P-Regular',
    fontSize: 10,
    lineHeight: 18,
  },
});

export {styles};
