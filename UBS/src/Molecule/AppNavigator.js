import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Stages from './Stages';
import Topic1 from './Topics/Topic1';

const Stack = createStackNavigator();

const getScreen = (route) => {
    switch (route.name) {
        case 'Stages':
            return Stages;
        case 'Topic1':
            return Topic1;
        default:
            return Stages;
    }
}

const AppNavigator = () => (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Stages" component={Stages} options={{headerShown: false}}/>
            <Stack.Screen name="Topic1" component={Topic1} />
        </Stack.Navigator>
);

export default AppNavigator;
