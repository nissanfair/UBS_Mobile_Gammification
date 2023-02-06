import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import Stages from './Stages';
import Topic   from './Topicbundle/Topic';
import TopicLearning from './Topicbundle/TopicLearning';
import TopicIntroduction from './Topicbundle/TopicIntroduction';
import Progress from './progress';
// Creation of the navigation structure, all the screens of the stages and topics and learnings are defined here. 
const Stack = createStackNavigator();

// Screens for the individual topic routes
const getScreen = (route) => {
    switch (route.name) {
        // case "Stages":
        //     return Stages;
        // case "Topic":
        //     return Topic;
        // case "TopicLearning":
        //     return TopicLearning;  
        // case "TopicIntroduction":
        //     return TopicIntroduction;
        case "Progress":
            return Progress;
        // default:
        //     return Stages;
    }
}

const AppNavigator = () => (
        <Stack.Navigator initialRouteName="Home">
            {/* <Stack.Screen name="Stages" component={Stages} options={{headerShown: false}}/>
            <Stack.Screen name="Topic" component={Topic} />
            <Stack.Screen name="TopicIntroduction" component={TopicIntroduction} />
            <Stack.Screen name="TopicLearning" component={TopicLearning} /> */}
            <Stack.Screen name="Progress" component={Progress} />
        </Stack.Navigator>
);

export default AppNavigator;
