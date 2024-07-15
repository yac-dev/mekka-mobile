import React, { useContext } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
// import ReportPost from '../features/ViewPost/pages/ReportPost';
import { Ionicons } from '@expo/vector-icons';
import { CurrentTagContext } from '../providers';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { ReportPost, ReportComment } from '../features';
import { ViewGridPost, ViewRegionPost } from '../features/ViewPost/pages';
import { StatusBar } from 'react-native';
import { ViewPost } from '../features/ViewPost/components';

type ViewMomentPostStackNavigatotParams = {
  ViewPost: undefined;
  ReportPost: undefined;
  ReportComment: undefined;
};

const ViewMomentPostStack = createNativeStackNavigator<ViewMomentPostStackNavigatotParams>();

export type ViewMomentPostStackNavigatorProps = NativeStackNavigationProp<ViewMomentPostStackNavigatotParams>;

export const ViewPostStackNavigator = () => {
  const { currentTag } = useContext(CurrentTagContext);

  return (
    <ViewMomentPostStack.Navigator screenOptions={{ title: '' }}>
      <ViewMomentPostStack.Group>
        <ViewMomentPostStack.Screen
          name='ViewPost'
          component={ViewPost}
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
      </ViewMomentPostStack.Group>
      <ViewMomentPostStack.Group screenOptions={{ presentation: 'fullScreenModal', gestureEnabled: false }}>
        <ViewMomentPostStack.Screen
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
        <ViewMomentPostStack.Screen
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
      </ViewMomentPostStack.Group>
    </ViewMomentPostStack.Navigator>
  );
};
