import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { primaryBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';
import { Ionicons } from '@expo/vector-icons';
import SpaceInfo from '../features/SpaceInfo/pages/SpaceInfo';
import { SpaceInfoContext } from '../features/SpaceInfo/contexts/SpaceInfoContext';

const SpaceInfoStackNavigator: React.FC = (props) => {
  return (
    <SpaceInfoContext.Provider value={{ spaceAndUserRelationship: props.route.params.spaceAndUserRelationship }}>
      <Stack.Navigator>
        <Stack.Screen
          name='SpaceInfo'
          component={SpaceInfo}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerShown: true,
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'rgb(30, 30, 30)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Navigator>
    </SpaceInfoContext.Provider>
  );
};

export default SpaceInfoStackNavigator;
