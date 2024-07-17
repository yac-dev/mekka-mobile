import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
const CreateNewSpaceStack = createNativeStackNavigator();
import Overview from '../features/CreateNewSpace/pages/Overview';
import SelectSpaceVisibility from '../features/CreateNewSpace/pages/SelectSpaceVisibility';
import ContentType from '../features/CreateNewSpace/pages/ContentType';
import Moment from '../features/CreateNewSpace/pages/Moment';
import Reaction from '../features/CreateNewSpace/pages/Reaction';
import Description from '../features/CreateNewSpace/pages/Description';
import ReactionPicker from '../features/CreateNewSpace/pages/ReactionPicker';
import CreateNewSticker from '../features/CreateNewSpace/pages/CreateSticker';
import { SnackBar, LoadingSpinner } from '../components';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons/VectorIcons';
import { Colors } from '../themes';
import {
  CreateNewSpaceProvider,
  CreateNewSpaceContext,
} from '../features/CreateNewSpace/contexts/CreateNewSpaceProvider';
import { ReactionType } from '../features/CreateNewSpace/contexts/ReactionPickerProvider';
import { showMessage } from 'react-native-flash-message';
import FlashMessage from 'react-native-flash-message';
import { useContext } from 'react';
import { SnackBarContext } from '../providers';
import { TemplateSelection, Base } from '../features/CreateNewSpace/pages';

export type CreateNewSpaceStackParams = {
  TemplateSelection: undefined;
  Base: undefined;
  Overview: undefined;
  SelectSpaceVisibility: undefined;
  ContentType: undefined;
  Moment: undefined;
  Reaction: {
    selectedReaction?: ReactionType;
  };
  Description: undefined;
  ReactionPicker: {
    index?: number;
  };
  CreateNewSticker: undefined;
};

export type CreateNewSpaceStackProps = NativeStackNavigationProp<CreateNewSpaceStackParams>;

const CreateNewSpaceStackNavigator = () => {
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
            name='Overview'
            component={Overview}
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
        </CreateNewSpaceStack.Group>
        <CreateNewSpaceStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <CreateNewSpaceStack.Screen
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
        </CreateNewSpaceStack.Group>
      </CreateNewSpaceStack.Navigator>
    </CreateNewSpaceProvider>
  );
};

export default CreateNewSpaceStackNavigator;
