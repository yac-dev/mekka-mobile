import { View, Text, TouchableOpacity } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';
import { Feature, Members, Tags, PostsByGrid } from '../components';

const Tab = createMaterialTopTabNavigator();

type TabsProps = {
  tagId: string;
  spaceId: string;
};

export const Tabs: React.FC<TabsProps> = ({ tagId, spaceId }) => {
  const CustomTabBar = ({ state, descriptors, navigation }) => {
    return (
      <View style={{ alignItems: 'center' }}>
        <View style={{ flexDirection: 'row' }}>
          {state.routes.map((route, index) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined ? options.tabBarLabel : route.name;

            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            return (
              <TouchableOpacity
                key={index}
                style={{
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  paddingVertical: 10,
                  backgroundColor: isFocused ? 'rgb(50,50,50)' : 'transparent',
                  borderRadius: 20,
                  marginHorizontal: 5,
                }}
                onPress={onPress}
              >
                <Text style={{ color: isFocused ? 'white' : 'rgb(170,170,170)', fontSize: 17, fontWeight: 'bold' }}>
                  {label}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    );
  };

  return (
    <Tab.Navigator
      tabBar={(props) => <CustomTabBar {...props} />}
      screenOptions={({ route }) => ({
        lazy: true,
        swipeEnabled: false,
      })}
    >
      <Tab.Screen name={'Posts'}>{(props) => <PostsByGrid {...props} tagId={tagId} />}</Tab.Screen>
      <Tab.Screen name={'Features'} component={Feature} />
      <Tab.Screen name={'Members'}>{(props) => <Members {...props} spaceId={spaceId} />}</Tab.Screen>
    </Tab.Navigator>
  );
};
