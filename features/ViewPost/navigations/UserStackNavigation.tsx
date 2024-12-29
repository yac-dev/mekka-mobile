import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { User } from '../../User';

export type UserStackParams = {
  User: undefined;
  ViewPostStackNavigator: undefined;
};

const UserStack = createNativeStackNavigator();

export type UserStackNavigatorProps = NativeStackNavigationProp<UserStackParams>;

export const UserStackNavigator: React.FC = () => {
  return (
    <UserStack.Navigator>
      <UserStack.Group>
        <UserStack.Screen
          name='User'
          component={User}
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
      </UserStack.Group>
    </UserStack.Navigator>
  );
};
