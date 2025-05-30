import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectSpaceVisibility from '../pages/SelectSpaceVisibility';
import ContentType from '../pages/ContentType';
import Moment from '../pages/Moment';
import Reaction from '../pages/Reaction';
import Description from '../pages/Description';
import ReactionPicker from '../pages/ReactionPicker';
import { CreateNewSticker } from '../pages';
import { SnackBar, LoadingSpinner } from '../../../components';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { Colors } from '../../../themes';
import { CreateNewSpaceProvider, CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { ReactionType } from '../contexts/ReactionPickerProvider';
import { TemplateSelection, Base, Comment } from '../pages';
import { ReactionPickerStackNavigator } from './ReactionPickerStackNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import { SpaceVisibilitySelection, Following, Slot } from '../pages';

export type ReactionPickerStackParams = {
  ReactionPicker: {
    defaultReactionIndex?: number;
  };
  CreateNewSticker: undefined;
};

export type ReactionPickerStackProps = NativeStackNavigationProp<ReactionPickerStackParams>;

export type CreateNewSpaceStackParams = {
  TemplateSelection: undefined;
  Base: undefined;
  Overview: undefined;
  SelectSpaceVisibility: undefined;
  SpaceVisibilitySelection: undefined;
  ContentType: undefined;
  Moment: undefined;
  Reaction: {
    selectedReaction?: ReactionType;
  };
  Slot: undefined;
  Following: undefined;
  Comment: undefined;
  Description: undefined;
  ReactionPickerStackNavigator: NavigatorScreenParams<ReactionPickerStackParams>;
  CreateNewSticker: undefined;
};

export type CreateNewSpaceStackProps = NativeStackNavigationProp<CreateNewSpaceStackParams>;

const CreateNewSpaceStack = createNativeStackNavigator<CreateNewSpaceStackParams>();

export const CreateNewSpaceStackNavigator = () => {
  return (
    <CreateNewSpaceProvider>
      <CreateNewSpaceStack.Navigator>
        <CreateNewSpaceStack.Group>
          <CreateNewSpaceStack.Screen
            name='TemplateSelection'
            component={TemplateSelection}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
          <CreateNewSpaceStack.Screen
            name='SpaceVisibilitySelection'
            component={SpaceVisibilitySelection}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
          <CreateNewSpaceStack.Screen
            name='Base'
            component={Base}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
          <CreateNewSpaceStack.Screen
            name='SelectSpaceVisibility'
            component={SelectSpaceVisibility}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='ContentType'
            component={ContentType}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Moment'
            component={Moment}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Reaction'
            component={Reaction}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Following'
            component={Following}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Comment'
            component={Comment}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Description'
            component={Description}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='Slot'
            component={Slot}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
        </CreateNewSpaceStack.Group>
        <CreateNewSpaceStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <CreateNewSpaceStack.Screen
            name='ReactionPickerStackNavigator'
            component={ReactionPickerStackNavigator}
            options={({ navigation }) => ({
              headerShown: false, // ここtrueにすると、,,,
              // headerLeft: () => (
              //   <AppButton.Icon
              //     onButtonPress={() => navigation.goBack()}
              //     customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              //     hasShadow={false}
              //   >
              //     <VectorIcon.II name='close' size={18} color={Colors.white} />
              //   </AppButton.Icon>
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
          {/* <CreateNewSpaceStack.Screen
            name='ReactionPicker'
            component={ReactionPicker}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
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
          <CreateNewSpaceStack.Screen
            name='CreateNewSticker'
            component={CreateNewSticker}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
          /> */}
        </CreateNewSpaceStack.Group>
      </CreateNewSpaceStack.Navigator>
    </CreateNewSpaceProvider>
  );
};
