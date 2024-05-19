import * as React from 'react';
import { View } from 'react-native';
import { RadioButton } from 'react-native-paper';

export function Radio () {
  const [checked, setChecked] = React.useState('first');

  return (
    <View className='text-base text-yellow-950'>
      <RadioButton
        value="first"
        status={ checked === 'first' ? 'checked' : 'unchecked' }
        onPress={() => setChecked('first')}
      />
      
    </View>
  );
};

