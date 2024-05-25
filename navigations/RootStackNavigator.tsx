import { useContext } from 'react';
import { AuthContext } from '../providers';
import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackNavigator } from './HomeStackNavigator';
import { LoginStackNavigator } from './LoginStackNavigator';
import { VectorIcon } from '../Icons';
import Signup from '../features/NotAuthenticated/pages/Signup';
import { AppButton } from '../components/Button';
import { Colors } from '../themes';
import { ForgotPasswordStackNavigator } from './ForgotPasswordStackNavigator';
import { NonAuthNavigator } from './NonAuthNavigator';
import { SnackBarContext } from '../providers';
import FlashMessage from 'react-native-flash-message';

const RootStack = createNativeStackNavigator<RootStackParams>();

// NOTE: こっちのParams使ってない。消そう。
export type RootStackParams = {
  HomeStackNavigator: undefined;
  NonAuthNavigator: undefined;
  // Signup: undefined;
  // ForgotPasswordStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const RootStackNavigator = () => {
  const { auth } = useContext(AuthContext);

  return (
    <NavigationContainer>
      <RootStack.Navigator>
        {auth ? (
          <RootStack.Screen
            name='HomeStackNavigator'
            component={HomeStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        ) : (
          <RootStack.Screen
            name='NonAuthNavigator'
            component={NonAuthNavigator}
            options={({ navigation }) => ({
              headerShown: false,
            })}
          />
        )}
      </RootStack.Navigator>
    </NavigationContainer>
  );
};

{
  /* <RootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <RootStack.Screen
            name='Signup'
            component={Signup}
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
            })}
          />
          <RootStack.Screen
            name='ForgotPasswordStackNavigator'
            component={ForgotPasswordStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
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
            })}
          />
        </RootStack.Group> */
}
