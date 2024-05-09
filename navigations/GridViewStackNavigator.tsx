import React, { useContext, useState, useEffect, useCallback, useRef } from 'react';
import { View, Text, TouchableOpacity, Dimensions, ActivityIndicator } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../themes';
import { GridView } from '../features/Space/components/GridView';
import { ViewPostStackNavigator } from './ViewPostStackNavigator';
import { TagType } from '../types';
import { useGetPosts } from '../features/Space/hooks/useGetPosts';

const GridViewStack = createNativeStackNavigator();

type GridViewStackNavigatorProps = {
  tag: TagType;
};

export const GridViewStackNavigator: React.FC<GridViewStackNavigatorProps> = ({ tag }) => {
  const { apiResult, requestApi, loadMore } = useGetPosts();
  const [currentPage, setCurrentPage] = useState<number>(0);

  useEffect(() => {
    requestApi({ tagId: tag._id, currentPage });
  }, []);

  // postsをpropsで渡せばいいや。もう。
  return (
    <View
      style={{ flex: 1 }}
      // onLayout={() =>
      //   setScreenLoaded((previous) => {
      //     return {
      //       ...previous,
      //       [props.tagObject.tag._id]: true,
      //     };
      //   })
      // }
    >
      <GridViewStack.Navigator>
        <GridViewStack.Group>
          <GridViewStack.Screen
            name='GridView'
            options={({ navigation }) => ({
              headerShown: false,
            })}
          >
            {/* {(props) => <GridView posts={apiResult.data?.posts} apiStatus={apiResult.status} {...props} />} */}
            {(props) => (
              <View>
                <Text>Big refactoring</Text>
              </View>
            )}
          </GridViewStack.Screen>
        </GridViewStack.Group>
        <GridViewStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <GridViewStack.Screen
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
        </GridViewStack.Group>
      </GridViewStack.Navigator>
    </View>
  );
};
