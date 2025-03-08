import React from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { MyPage } from '../pages';
import {
  ViewPostStackNavigator,
  ViewPostStackNavigatorParams,
} from '../../ViewPost/navigations/ViewPostStackNavigator';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { NavigatorScreenParams } from '@react-navigation/native';

export type MyPageStackNavigatorParams = {
  MyPage: undefined;
  ViewPostStackNavigator: NavigatorScreenParams<ViewPostStackNavigatorParams>;
};

const MyPageStack = createNativeStackNavigator();

export type MyPageStackNavigatorProps = NativeStackNavigationProp<MyPageStackNavigatorParams>;

type MyPageStackNavigatorPropss = NativeStackScreenProps<ViewPostStackNavigatorParams, 'MyPageStackNavigator'>;

// ここでuser idを受け取りたいよな。。idをuser pageに渡してそのidを使いたいわな。。。
export const MyPageStackNavigator: React.FC<MyPageStackNavigatorPropss> = ({ route }) => {
  return (
    <MyPageStack.Navigator>
      <MyPageStack.Group>
        <MyPageStack.Screen
          name='MyPage'
          component={MyPage}
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
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
            // headerTransparent: true,
          })}
        />
      </MyPageStack.Group>
      {/* ここでもViewPostが必要になるからな。。。 */}
      <MyPageStack.Group screenOptions={{ presentation: 'fullScreenModal', gestureEnabled: false }}>
        <MyPageStack.Screen
          name='ViewPostStackNavigator'
          component={ViewPostStackNavigator}
          options={{ headerShown: false }}
        />
      </MyPageStack.Group>
    </MyPageStack.Navigator>
  );
};
