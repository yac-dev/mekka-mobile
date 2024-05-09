import { TouchableOpacity } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { HomeStackNavigator } from './HomeStackNavigator';
import { LoginStackNavigator } from './LoginStackNavigator';
import { VectorIcon } from '../Icons';

const RootStack = createNativeStackNavigator<RootStackParams>();

export type RootStackParams = {
  HomeStackNavigator: undefined;
  LoginStackNavigator: undefined;
};

export type RootStackNavigatorProps = NativeStackNavigationProp<RootStackParams>;

export const RootStackNavigator = () => {
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
        <RootStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <RootStack.Screen
            name='LoginStackNavigator'
            component={LoginStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <VectorIcon.II name='close-circle-sharp' size={30} color={'white'} />
                </TouchableOpacity>
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
        </RootStack.Group>
      </RootStack.Navigator>
    </NavigationContainer>
  );
};
