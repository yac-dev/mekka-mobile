import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import { Ionicons } from '@expo/vector-icons';
import { EditAccount } from '../features/EditAccount/pages/EditAccount';

const EditAccountStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='EditAccount'
          component={EditAccount}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: 'Edit my account',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}></Stack.Group>
    </Stack.Navigator>
  );
};

export default EditAccountStackNavigator;
