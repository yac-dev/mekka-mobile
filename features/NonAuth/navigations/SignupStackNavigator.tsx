import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { Signup, EULA, EnterInvitationKey } from '../..';
import { SpaceType } from '../../../types';

export type SignupStackNavigatorParams = {
  Signup: {
    space?: SpaceType;
  };
  EULA: undefined;
  EnterInvitationKey: undefined;
};

export type SignupStackNavigatorProp = NativeStackNavigationProp<SignupStackNavigatorParams>;

const SignupStack = createNativeStackNavigator<SignupStackNavigatorParams>();

export const SignupStackNavigator = () => {
  return (
    <SignupStack.Navigator>
      <SignupStack.Group>
        <SignupStack.Screen
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
        <SignupStack.Screen
          name='EULA'
          component={EULA}
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
        />
      </SignupStack.Group>
      <SignupStack.Group screenOptions={{ presentation: 'modal' }}>
        <SignupStack.Screen
          name='EnterInvitationKey'
          component={EnterInvitationKey}
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
      </SignupStack.Group>
    </SignupStack.Navigator>
  );
};
