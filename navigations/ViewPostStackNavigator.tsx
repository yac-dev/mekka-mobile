import React, { useContext } from 'react';
import { TouchableOpacity } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewPost from '../features/ViewPost/pages/ViewPost';
import CommentsPage from '../features/Comments/pages/CommentsPage';
import ReportPost from '../features/ViewPost/pages/ReportPost';
import { Ionicons } from '@expo/vector-icons';
import { CurrentTagContext } from '../providers';

type ViewPostStackNavigatotParams = {
  ViewPost: undefined;
  CommentsPage: undefined;
  ReportPost: undefined;
};

const ViewPostStack = createNativeStackNavigator<ViewPostStackNavigatotParams>();

export const ViewPostStackNavigator = () => {
  const { currentTag } = useContext(CurrentTagContext);

  return (
    <ViewPostStack.Navigator
    // screenOptions={({ navigation, route }) => ({
    //   tabBarStyle: {
    //     backgroundColor: 'black',
    //     headerStyle: {
    //       backgroundColor: 'black',
    //     },
    //   },
    // })}
    >
      <ViewPostStack.Group>
        <ViewPostStack.Screen
          name='ViewPost'
          component={ViewPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='close-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTransparent: true,
            // headerTitle: () => (
            //   <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            //     <ExpoImage
            //       style={{ width: 20, height: 20, marginRight: 10 }}
            //       source={{ uri: currentTag.icon }}
            //       contentFit='contain'
            //       tintColor={currentTag.iconType === 'icon' ? currentTagObject.tag.color : null}
            //     />
            //     <Text style={{ color: 'white', fontSize: 20 }}>{currentTagObject.tag.name}</Text>
            //   </View>
            // ),
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        <ViewPostStack.Screen
          name='CommentsPage'
          component={CommentsPage}
          options={({ navigation }) => ({
            headerShown: true,
            headerLeft: () => (
              <TouchableOpacity onPress={() => navigation.goBack()}>
                <Ionicons name='arrow-back-circle-sharp' size={30} color={'white'} />
              </TouchableOpacity>
            ),
            headerTitle: '',
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          })}
        />
      </ViewPostStack.Group>
      <ViewPostStack.Group screenOptions={{ presentation: 'modal', gestureEnabled: false }}>
        <ViewPostStack.Screen
          name='ReportPost'
          component={ReportPost}
          options={({ navigation }) => ({
            headerShown: true,
            // headerTransparent: true,
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
      </ViewPostStack.Group>
    </ViewPostStack.Navigator>
  );
};
