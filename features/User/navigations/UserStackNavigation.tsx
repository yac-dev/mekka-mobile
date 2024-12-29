import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { User } from '../pages';
import {
  ViewPostStackNavigator,
  ViewPostStackNavigatorParams,
} from '../../ViewPost/navigations/ViewPostStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type UserStackNavigatorParams = {
  User: {
    userId: string;
  };
  ViewPostStackNavigator: NavigatorScreenParams<ViewPostStackNavigatorParams>;
};

const UserStack = createNativeStackNavigator();

export type UserStackNavigatorProps = NativeStackNavigationProp<UserStackNavigatorParams>;

type UserStackNavigatorPropss = NativeStackScreenProps<ViewPostStackNavigatorParams, 'UserStackNavigator'>;

// ここでuser idを受け取りたいよな。。idをuser pageに渡してそのidを使いたいわな。。。
export const UserStackNavigator: React.FC<UserStackNavigatorPropss> = ({ route }) => {
  return (
    <UserStack.Navigator>
      <UserStack.Group>
        <UserStack.Screen
          name='User'
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
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
        >
          {(props) => <User {...props} userId={route.params.userId} />}
        </UserStack.Screen>
      </UserStack.Group>
      {/* ここでもViewPostが必要になるからな。。。 */}
      <UserStack.Group screenOptions={{ presentation: 'fullScreenModal', gestureEnabled: false }}>
        <UserStack.Screen
          name='ViewPostStackNavigator'
          component={ViewPostStackNavigator}
          options={{ headerShown: false }}
        />
      </UserStack.Group>
    </UserStack.Navigator>
  );
};
