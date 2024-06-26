import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { WelcomePage } from '../features';
import { ForgotPasswordStackNavigator } from './ForgotPasswordStackNavigator';
import { SignupStackNavigator } from './SignupStackNavigator';

// welcome pageとsignupstack, forgot my password stack.

type NonAuthStackNavigatorParams = {
  WelcomePage: undefined;
  SignupStackNavigator: undefined;
  ForgotPasswordStackNavigator: undefined;
};

export type NonAuthStackNavigatorProps = NativeStackNavigationProp<NonAuthStackNavigatorParams>;

const NonAuthStack = createNativeStackNavigator<NonAuthStackNavigatorParams>();

export const NonAuthNavigator = () => {
  return (
    <NonAuthStack.Navigator>
      <NonAuthStack.Group>
        <NonAuthStack.Screen
          name='WelcomePage'
          component={WelcomePage}
          options={({ navigation }) => ({
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
          // headerRight（headerLeft）はcomponent側で出してあげる。
        />
      </NonAuthStack.Group>
      <NonAuthStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <NonAuthStack.Screen
          name='SignupStackNavigator'
          component={SignupStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            // headerLeft: () => (
            //   <TouchableOpacity onPress={() => navigation.goBack()}>
            //     <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
            //   </TouchableOpacity>
            // ),
            // headerTitle: '',
            // headerStyle: {
            //   backgroundColor: 'black',
            // },
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   color: 'white',
            // },
          })}
        />
        <NonAuthStack.Screen
          name='ForgotPasswordStackNavigator'
          component={ForgotPasswordStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            // headerLeft: () => (
            //   <AppButton.Icon
            //     onButtonPress={() => navigation.goBack()}
            //     customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
            //     hasShadow={false}
            //   >
            //     <VectorIcon.II name='close' size={18} color={Colors.white} />
            //   </AppButton.Icon>
            // ),
            // これいらないかもな。。。
            // headerTitle: '',
            // headerStyle: {
            //   backgroundColor: Colors.black,
            // },
            // headerTitleStyle: {
            //   fontWeight: 'bold',
            //   color: Colors.white,
            // },
          })}
        />
      </NonAuthStack.Group>
    </NonAuthStack.Navigator>
  );
};
