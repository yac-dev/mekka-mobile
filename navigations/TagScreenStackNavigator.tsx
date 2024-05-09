import React, { useContext, useEffect } from 'react';
import { View } from 'react-native';
import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../themes';
import { TagScreenContext } from '../features';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { TagScreenTopTabNavigator } from './TagScreenTopTabNavigator';
import { NavigatorScreenParams } from '@react-navigation/native';
import { CurrentTagContext } from '../providers';
import { useNavigation } from '@react-navigation/native';
import { SpaceTopTabNavigationProp } from './SpaceTopTabNavigator';
import { SpaceRootContext } from '../features/Space/providers/SpaceRootProvider';

export type TagScreenTopTabNavigatorParams = {
  GridView: undefined;
  MapView: undefined;
};

export type TagScreenStackParams = {
  TagScreenTopTabNavigator: NavigatorScreenParams<TagScreenTopTabNavigatorParams>;
  CreateNewPostStackNavigator: undefined;
  ViewPostStackNavigator: undefined;
};

export type TagScreenStackNavigatorProps = NativeStackNavigationProp<TagScreenStackParams>;

const TagScreenStack = createNativeStackNavigator<TagScreenStackParams>();

export const TagScreenStackNavigator: React.FC = () => {
  const { tag, addCreatedPost } = useContext(TagScreenContext);
  const { setLoadedScreenTable, createPostResult, loadedScreenTable } = useContext(SpaceRootContext);
  const { currentTag } = useContext(CurrentTagContext);
  const navigation = useNavigation<SpaceTopTabNavigationProp>();

  useEffect(() => {
    if (currentTag) {
      navigation.navigate(`Tag_${currentTag._id}`, { screen: 'GridView' });
    }
  }, [currentTag]);

  useEffect(() => {
    if (createPostResult.status === 'success') {
      if (loadedScreenTable[tag._id] && createPostResult.data?.addedTags.includes(tag._id)) {
        console.log('finish create post!', createPostResult.data);
        addCreatedPost(createPostResult.data?.post);
      }
    }
  }, [createPostResult.status]);

  return (
    <View
      style={{ flex: 1 }}
      onLayout={() =>
        setLoadedScreenTable((previous) => {
          return {
            ...previous,
            [tag._id]: true,
          };
        })
      }
    >
      <TagScreenStack.Navigator>
        <TagScreenStack.Group>
          <TagScreenStack.Screen
            name='TagScreenTopTabNavigator'
            options={({ navigation }) => ({
              headerShown: false,
            })}
          >
            {() => <TagScreenTopTabNavigator />}
          </TagScreenStack.Screen>
        </TagScreenStack.Group>
        <TagScreenStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <TagScreenStack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'transparent',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </TagScreenStack.Group>
      </TagScreenStack.Navigator>
    </View>
  );
};
