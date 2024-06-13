import { useContext } from 'react';
import { AuthContext } from '../providers';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackNavigator } from './HomeStackNavigator';
import { NonAuthNavigator } from './NonAuthNavigator';
import { ApiResultType } from '../types';
import { LoadMeOutputType } from '../features/App/types';

const RootStack = createNativeStackNavigator<RootStackParams>();

// NOTE: こっちのParams使ってない。消そう。
export type RootStackParams = {
  HomeStackNavigator: undefined;
  NonAuthNavigator: undefined;
  // Signup: undefined;
  // ForgotPasswordStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

type IRootStackNavigator = {
  loadMeApiResult: ApiResultType<LoadMeOutputType>;
};

export const RootStackNavigator: React.FC<IRootStackNavigator> = ({ loadMeApiResult }) => {
  const { auth } = useContext(AuthContext);

  if (!auth) {
    return (
      <NavigationContainer>
        <RootStack.Navigator>
          <RootStack.Screen
            name='NonAuthNavigator'
            component={NonAuthNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </RootStack.Navigator>
      </NavigationContainer>
    );
  }

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        <RootStack.Screen
          name='HomeStackNavigator'
          component={HomeStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
