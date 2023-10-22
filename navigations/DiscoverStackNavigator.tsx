import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { icons } from '../utils/icons';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
import Discover from '../features/Discover/pages/Discover';
import CreateNewSpace from '../features/CreateNewSpace/pages/CreateNewSpace';
import EmojiPicker from '../features/CreateNewSpace/pages/EmojiPicker';
import CreateSticker from '../features/CreateNewSpace/pages/CreateSticker';
import WriteDescription from '../features/CreateNewSpace/pages/WriteDescription';
import AddTag from '../features/CreateNewSpace/pages/AddTag';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import SpaceDetailStackNavigator from './SpaceDetailStackNavigator';
import { primaryBackgroundColor, modalBackgroundColor } from '../themes/color';
import { primaryTextColor } from '../themes/text';

const DiscoverStackNavigator: React.FC = () => {
  return (
    <Stack.Navigator>
      <Stack.Group>
        <Stack.Screen
          name='Discover'
          component={Discover}
          options={({ navigation }) => ({
            headerShown: false,
          })}
        />
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <Stack.Screen
          name='SpaceDetailStackNavigator'
          component={SpaceDetailStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: 'Space detail',
            headerStyle: {
              backgroundColor: 'rgb(38, 38, 38)',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='EmojiPicker'
          component={EmojiPicker}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='CreateSticker'
          component={CreateSticker}
          options={({ navigation }) => ({
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='WriteDescription'
          component={WriteDescription}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        <Stack.Screen
          name='AddTag'
          component={AddTag}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
        {/* write descriptionをここに。 */}
      </Stack.Group>
      <Stack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
        <Stack.Screen
          name='CreateNewSpace'
          component={CreateNewSpace}
          options={({ navigation }) => ({
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Text style={{ color: primaryTextColor, fontSize: 20 }}>Close</Text>
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: primaryBackgroundColor,
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              color: primaryTextColor,
            },
          })}
        />
      </Stack.Group>
    </Stack.Navigator>
  );
};

export default DiscoverStackNavigator;
