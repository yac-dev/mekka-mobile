import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { EditAccount } from '../features';

export type EditProfileStackParams = {
  EditProfile: undefined;
};

const EditProfileStack = createNativeStackNavigator();

export type EditProfileStackNavigatorProps = NativeStackNavigationProp<EditProfileStackParams>;

export const EditAccountStackNavigator: React.FC = () => {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Group>
        <EditProfileStack.Screen
          name='EditProfile'
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
      </EditProfileStack.Group>
    </EditProfileStack.Navigator>
  );
};
