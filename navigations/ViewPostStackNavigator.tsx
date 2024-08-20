import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { ReportPost, ReportComment, ViewPost } from '../features';
import { PostType } from '../types';

// postsなりcurrentPOstなりなんなりをparamasで渡す感じになだろう。。。。
export type ViewPostStackNavigatorParams = {
  ViewPost: {
    posts: PostType[];
    index: number;
  };
  ViewGridPost: undefined;
  ViewRegionPost: undefined;
  CommentsPage: undefined;
  ReportPost: undefined;
  ReportComment: undefined;
};

const ViewPostStack = createNativeStackNavigator<ViewPostStackNavigatorParams>();

export type ViewPostStackNavigatorProps = NativeStackNavigationProp<ViewPostStackNavigatorParams>;

export const ViewPostStackNavigator = () => {
  return (
    <ViewPostStack.Navigator screenOptions={{ title: '' }}>
      <ViewPostStack.Group>
        <ViewPostStack.Screen
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
