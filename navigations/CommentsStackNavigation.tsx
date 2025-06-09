import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
  createNativeStackNavigator,
} from '@react-navigation/native-stack';
import { Platform, View, Text } from 'react-native';
import { AppButton } from '../components';
import { VectorIcon } from '../Icons';
import { Colors } from '../themes';
import { Replies } from '../features/Replies';
import { CommentsPage } from '../features/ViewPost';

// postsなりcurrentPOstなりなんなりをparamasで渡す感じになだろう。。。。
export type CommentsStackNavigatorParams = {
  Comments: {
    postId: string;
  };
  Replies: {
    commentId: string;
  };
};
// ここら辺やっぱrecoil使ったほうがいいかね。。。

const CommentsStack = createNativeStackNavigator<CommentsStackNavigatorParams>();

export type CommentsStackNavigatorProps = NativeStackNavigationProp<CommentsStackNavigatorParams>;

type CommentsStackNavigatorScreenProps = NativeStackScreenProps<CommentsStackNavigatorParams, 'Comments'>;

export const CommentsStackNavigator = ({ route }: CommentsStackNavigatorScreenProps) => {
  const { postId } = route.params;

  return (
    <CommentsStack.Navigator
      // screenOptions={{
      //   headerStyle: {
      //     backgroundColor: 'black',
      //   },
      // }}
      screenOptions={{
        headerShown: false,
        presentation: 'transparentModal',
        contentStyle: { backgroundColor: 'rgba(0,0,0,0.1)' },
      }}
    >
      <CommentsStack.Group>
        <CommentsStack.Screen
          name='Comments'
          options={({ navigation }) => ({
            headerShown: true,
            headerStyle: {
              backgroundColor: 'rgba(0,0,0,0.1)',
            },
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
            // headerTransparent: true,
            headerTitleStyle: {
              fontWeight: 'bold',
              color: 'white',
            },
          })}
        >
          {({ route }) => (
            <View style={{ flex: 1, backgroundColor: 'rgba(0,0,0,0.1)' }}>
              <Text style={{ color: 'white' }}>Hello</Text>
            </View>
          )}
        </CommentsStack.Screen>
        {/* というか、そもそもここってstacknavigatorにする必要なくない。。？ */}
        <CommentsStack.Screen
          name='Replies'
          component={Replies}
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
      </CommentsStack.Group>
    </CommentsStack.Navigator>
  );
};
