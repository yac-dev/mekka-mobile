import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { EditAccount } from '..';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { DeleteMyAccount } from '../../DeleteAccount';

export type EditProfileStackParams = {
  EditProfile: undefined;
  DeleteMyAccount: undefined;
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
            headerTitle: 'Edit My Account',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <EditProfileStack.Screen
          name='DeleteMyAccount'
          component={DeleteMyAccount}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.MCI name='arrow-left' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitle: '',
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
