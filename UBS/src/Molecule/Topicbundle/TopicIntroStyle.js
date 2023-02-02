/* eslint-disable prettier/prettier */
import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    main: {
        width: '100%',
        height: '100%',
        flexDirection: 'row'
    },

    leftbox: {
        width: '100%',
        height: '100%',
        flex: 3,
    },
    rightbox: {
        width: '100%',
        height: '100%',
        flex:3,
        
    },
    monsterbox:{
        width: '100%',
        height: '80%',
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
        top: 0,
        left: 35,
        right: 35,
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center'
    }

});

export { styles }