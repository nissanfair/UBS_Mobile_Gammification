import React from 'react';
import { View, Text } from 'react-native';

const HealthBar = ({ numWrongAnswers, timeState }) => {
  const maxHealth = 3;
  const currentHealth = timeState == "END"? maxHealth - numWrongAnswers - 1 : maxHealth - numWrongAnswers;

//   Still have yet to account if it is less than 0


  return (
    <View>
      <Text>Current health: {currentHealth} / {maxHealth} </Text>
    </View>
  );
};

export default HealthBar;
