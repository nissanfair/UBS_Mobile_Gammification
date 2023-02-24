import React from 'react';
import { View, Text } from 'react-native';

const HealthBar = ({ numWrongAnswers }) => {
  const maxHealth = 3;
  const currentHealth = maxHealth - numWrongAnswers;

  return (
    <View>
      <Text>Current health: {currentHealth} / {maxHealth} </Text>
    </View>
  );
};

export default HealthBar;
