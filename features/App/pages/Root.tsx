import { View, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import * as SecureStore from 'expo-secure-store';
import { RootStackNavigator } from '../navigations/RootStackNavigator';
import { useRecoilState } from 'recoil';
import { authAtom } from '../../../recoil';
import { useQuery } from '@tanstack/react-query';
import { queryKeys, loadMe } from '../../../query';
import { NavigationContainer } from '@react-navigation/native';
import { NonAuthNavigator } from '../../NonAuth';
import { NoConnection } from '../components';
import { PageView } from '../../../components';
import { setUpPushNotification } from '../hooks';

export type RootStackParams = {
  HomeStackNavigator: undefined;
  Signup: undefined;
  ForgotPasswordStackNavigator: undefined;
};

const NonAuthStack = createNativeStackNavigator<NonAuthStackParams>();

export type NonAuthStackParams = {
  NonAuthNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;
export const Root = () => {
  const [auth, setAuth] = useRecoilState(authAtom);

  const {
    isLoading: isLoadMeLoading,
    error: isLoadMeError,
    isSuccess: isLoadMeSuccess,
  } = useQuery({
    queryKey: [queryKeys.loadMe],
    queryFn: async () => {
      const jwt = await SecureStore.getItemAsync('secure_token');
      const response = await loadMe({ jwt });
      console.log('res is this', response);
      setAuth(response);
      return response;
    },
  });

  setUpPushNotification();

  if (isLoadMeError) {
    return <NoConnection />;
  }

  if (isLoadMeLoading) {
    return (
      <PageView>
        <ActivityIndicator />
      </PageView>
    );
  }

  if (isLoadMeSuccess && !auth) {
    return (
      <NavigationContainer>
        <NonAuthStack.Navigator>
          <NonAuthStack.Screen
            name='NonAuthNavigator'
            component={NonAuthNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        </NonAuthStack.Navigator>
      </NavigationContainer>
    );
  }

  if (isLoadMeSuccess && auth) {
    return <RootStackNavigator />;
  }

  return (
    <PageView>
      <ActivityIndicator />
    </PageView>
  );
};
