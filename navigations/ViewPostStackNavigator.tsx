import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import ViewPost from '../features/ViewPost/pages/ViewPost';
// import ReportPost from '../features/ViewPost/pages/ReportPost';
import { Ionicons } from '@expo/vector-icons';
import { CurrentTagContext } from '../providers';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { ReportPost, ReportComment } from '../features';
import { ViewGridPost, ViewRegionPost } from '../features/ViewPost/pages';
import { StatusBar } from 'react-native';

type ViewPostStackNavigatotParams = {
  ViewGridPost: undefined;
  ViewRegionPost: undefined;
  CommentsPage: undefined;
  ReportPost: undefined;
  ReportComment: undefined;
};

const ViewPostStack = createNativeStackNavigator<ViewPostStackNavigatotParams>();

export type ViewPostStackNavigatorProps = NativeStackNavigationProp<ViewPostStackNavigatotParams>;

export const ViewPostStackNavigator = () => {
  const { currentTag } = useContext(CurrentTagContext);

  return (
    <ViewPostStack.Navigator screenOptions={{ title: '' }}>
      <ViewPostStack.Group>
        <ViewPostStack.Screen
          name='ViewGridPost'
          component={ViewGridPost}
          options={({ navigation }) => ({
            headerShown: true,
            // title: <Text>{currentPost.createdAt}</Text>,
            headerRight: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)', marginTop: 5 }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
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
        {/* view Region postっていうcomponentを作っておいて、そこでViewPostっていうreusable componentを消費する感じkなあ。
        そのreusableにmapの方かgridのrecoilのpostを流す感じかな。おっけ。
        */}
        <ViewPostStack.Screen
          name='ViewRegionPost'
          component={ViewRegionPost}
          options={({ navigation }) => ({
            headerShown: true,
            title: '',
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
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
      </ViewPostStack.Group>
      <ViewPostStack.Group screenOptions={{ presentation: 'fullScreenModal', gestureEnabled: false }}>
        <ViewPostStack.Screen
          name='ReportPost'
          component={ReportPost}
          options={({ navigation }) => ({
            headerShown: true,
            title: '',
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerStyle: {
              backgroundColor: 'black',
            },
            // headerTransparent: true,
          })}
        />
        <ViewPostStack.Screen
          name='ReportComment'
          component={ReportComment}
          options={({ navigation }) => ({
            headerShown: true,
            title: '',
            headerLeft: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerStyle: {
              backgroundColor: 'black',
            },
            // headerTransparent: true,
          })}
        />
      </ViewPostStack.Group>
    </ViewPostStack.Navigator>
  );
};
