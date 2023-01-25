import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({

    box: {
        width: '80%',
        height: 150,
        backgroundColor: 'red',
        alignSelf: 'center',
        borderRadius: 9
    },
    main: {flex: 1},

    leftbox: {
        width: '50%',
        height: '90%',
        backgroundColor: 'skyblue',
    },

    desc: {
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center' 
    }

});

export { styles }