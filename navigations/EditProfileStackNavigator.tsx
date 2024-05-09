import React, { useContext } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { EditAccount } from '../features/EditAccount';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';

export type EditProfileStackParams = {
  EditProfile: undefined;
};

const EditProfileStack = createNativeStackNavigator();

export type EditProfileStackNavigatorProps = NativeStackNavigationProp<EditProfileStackParams>;

export const EditProfileStackNavigator: React.FC = () => {
  return (
    <EditProfileStack.Navigator>
      <EditProfileStack.Group>
        <EditProfileStack.Screen
          name='EditProfile'
          component={EditAccount}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: 'Edit my info',
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
