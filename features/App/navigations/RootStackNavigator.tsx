import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackNavigator } from '../../Home/navigations/HomeStackNavigator';
import { NonAuthNavigator } from '../../NonAuth/navigations/NonAuthNavigator';
import { ApiResultType } from '../../../types';
import { LoadMeOutputType } from '../types';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeStackNavigator: undefined;
  NonAuthNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

type IRootStackNavigator = {
  loadMeApiResult: ApiResultType<LoadMeOutputType>;
};

export const RootStackNavigator: React.FC<IRootStackNavigator> = ({ loadMeApiResult }) => {
  const [auth] = useRecoilState(authAtom);

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
