import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';
import { ReportPost, ReportComment, ViewPost } from '../..';
import { PostType } from '../../../types';
import { UserStackNavigator } from '../../User';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { CommentsPage, HowDoYouFeel } from '../pages';
import { Platform } from 'react-native';

// postsなりcurrentPOstなりなんなりをparamasで渡す感じになだろう。。。。
export type ViewPostStackNavigatorParams = {
  ViewPost: {
    posts: PostType[];
    index: number;
  };
  ViewGridPost: undefined;
  ViewRegionPost: undefined;
  Comments: {
    postId: string;
  };
  HowDoYouFeel: {
    postId: string;
  };
  ReportPost: undefined;
  ReportComment: undefined;
  UserStackNavigator: {
    userId: string;
  };
};
// ここら辺やっぱrecoil使ったほうがいいかね。。。

const ViewPostStack = createNativeStackNavigator<ViewPostStackNavigatorParams>();

export type ViewPostStackNavigatorProps = NativeStackNavigationProp<ViewPostStackNavigatorParams>;

// type ViewPostStackNavigatorScreenProps = NativeStackScreenProps<ViewPostStackNavigatorParams, 'ViewPost'>;

export const ViewPostStackNavigator = () => {
  return (
    <ViewPostStack.Navigator screenOptions={{ title: '' }}>
      <ViewPostStack.Group>
        <ViewPostStack.Screen
          name='ViewPost'
          component={ViewPost}
          options={({ navigation }) => ({
            headerShown: true,
            headerRight: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{
                  width: 28,
                  height: 28,
                  backgroundColor: 'rgb(50,50,50)',
                  marginTop: 5,
                  ...Platform.select({
                    ios: {
                      shadowColor: 'black',
                      shadowOffset: { width: 5, height: 5 },
                      shadowOpacity: 0.6,
                      shadowRadius: 6,
                    },
                    android: {
                      elevation: 5,
                    },
                  }),
                }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTransparent: true,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        />
        {/* というか、そもそもここってstacknavigatorにする必要なくない。。？ */}
        <ViewPostStack.Screen
          name='UserStackNavigator'
          component={UserStackNavigator}
          options={({ navigation }) => ({
            headerShown: false,
            title: '',
            // headerLeft: () => (
            //   <AppButton.Icon
            //     onButtonPress={() => navigation.goBack()}
            //     customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
            //     hasShadow={false}
            //   >
            //     <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
            //   </AppButton.Icon>
            // ),
            headerStyle: {
              backgroundColor: 'black',
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
      <ViewPostStack.Group
        screenOptions={{ presentation: 'transparentModal', animation: 'fade', animationDuration: 200 }}
      >
        <ViewPostStack.Screen
          name='Comments'
          component={CommentsPage}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'Comments',
            headerRight: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'black',
            },
            // headerTransparent: true,
          })}
        />
        <ViewPostStack.Screen
          name='HowDoYouFeel'
          component={HowDoYouFeel}
          options={({ navigation }) => ({
            headerShown: true,
            title: 'How do you feel?',
            headerRight: () => (
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            ),
            headerTitleStyle: {
              color: 'white',
            },
            headerStyle: {
              backgroundColor: 'black',
            },
            headerTransparent: true,
          })}
        />
      </ViewPostStack.Group>
    </ViewPostStack.Navigator>
  );
};
