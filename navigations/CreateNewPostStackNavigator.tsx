import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const CreateNewPosyStack = createNativeStackNavigator();
import { Ionicons } from '@expo/vector-icons';
import NormalPost from '../features/CreateNewPost/pages/NormalPost';
import AddTags from '../features/CreateNewPost/pages/AddTags';
import AddLocation from '../features/CreateNewPost/pages/AddLocation';
import MomentPost from '../features/CreateNewPost/pages/MomentPost';
import CreateNewTag from '../features/CreateNewPost/pages/CreateNewTag';
import CreateNewLocationTag from '../features/CreateNewPost/pages/CreateNewLocationTag';
import { SnackBar, AppButton } from '../components';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { CreateNewPostProvider } from '../features/CreateNewPost/contexts';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { CreatedTagType } from '../features/CreateNewPost/contexts';
import FlashMessage from 'react-native-flash-message';

export type CreateNewPostStackParams = {
  SelectPostType: undefined;
  NormalPost: undefined;
  AddTags?: {
    createdTag: CreatedTagType;
  };
  AddLocation: undefined;
  MomentPost: undefined;
  CreateNewTag: undefined;
};

export type CreateNewPostStackProps = NativeStackNavigationProp<CreateNewPostStackParams>;

const CreateNewPostStackNavigator = () => {
  return (
    <CreateNewPostProvider>
      <CreateNewPosyStack.Navigator>
        <CreateNewPosyStack.Group>
          <CreateNewPosyStack.Screen
            name='NormalPost'
            component={NormalPost}
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
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='AddTags'
            component={AddTags}
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
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='AddLocation'
            component={AddLocation}
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
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
          <CreateNewPosyStack.Screen
            name='MomentPost'
            component={MomentPost}
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
              title: '',
              headerStyle: {
                backgroundColor: 'black',
              },
            })}
          />
        </CreateNewPosyStack.Group>
        <CreateNewPosyStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
          <CreateNewPosyStack.Screen
            name='CreateNewTag'
            component={CreateNewTag}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
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
          <CreateNewPosyStack.Screen
            name='CreateNewLocationTag'
            component={CreateNewLocationTag}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <TouchableOpacity onPress={() => navigation.goBack()}>
                  <Ionicons name='close-circle-sharp' size={30} color={'white'} />
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
        </CreateNewPosyStack.Group>
      </CreateNewPosyStack.Navigator>
      <FlashMessage />
    </CreateNewPostProvider>
  );
};

export default CreateNewPostStackNavigator;
