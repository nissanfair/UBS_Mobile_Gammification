import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Stages from './Stages';
import Topic1 from './Topics/Topic1';
import Topic1Learning from './Learningcontent/Topic1Learning'
// Creation of the navigation structure, all the screens of the stages and topics and learnings are defined here. 
const Stack = createStackNavigator();

const getScreen = (route) => {
    switch (route.name) {
        case "Stages":
            return Stages;
        case "Topic1":
            return Topic1;
        case "Topic1Learning":
            return Topic1Learning;  
        default:
            return Stages;
    }
}

const AppNavigator = () => (
        <Stack.Navigator initialRouteName="Home">
            <Stack.Screen name="Stages" component={Stages} options={{headerShown: false}}/>
            <Stack.Screen name="Topic1" component={Topic1} />
            <Stack.Screen name="Topic1Learning" component={Topic1Learning} />

        </Stack.Navigator>
);

export default AppNavigator;
