// React Imports 
import React from 'react'
import { SafeAreaView,ScrollView,StatusBar,StyleSheet,Text,useColorScheme,View,Section, Pressable, Image, TouchableHighlight} from 'react-native';
import { useDispatch, useSelector,useStore } from 'react-redux'

// Redux Toolkit Variables 

const styles = StyleSheet.create({
    background : {
        width: "100%",
        height: "100%"
    }
})


export default function Summary() {
    
    // Get the Total Score 
    const total_question = useSelector((state) => state.question.total_question);

    // Get the Answered Correctly
    const answer_correctly = useSelector((state) => state.question.answered_correctly);

    // Get the Answer Wrongly
    const answered_wrongly = useSelector((state) => state.question.answered_wrongly);

    // Get the health of the user 
    

  return (
    <View>
        <TouchableHighlight >
          <Text>This is the Summary Page
            Out of {total_question}, correctly:  {answer_correctly}, wrong: {answered_wrongly}
          </Text>
        </TouchableHighlight>
    </View>
  )
}
