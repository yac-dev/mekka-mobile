import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerContentComponentProps,
} from '@react-navigation/drawer';
import { EditAccount } from '../../EditAccount';
import { View, Text, TouchableOpacity, Dimensions, ScrollView } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { HomeDrawerNavigatorParams } from './HomeStackNavigator';
import { HomeDrawerNavigatorProps } from './HomeStackNavigator';
import { Home } from '../../Home/pages';
import { authAtom } from '../../../recoil';
import { useRecoilState } from 'recoil';
import { Image as ExpoImage } from 'expo-image';
import { VectorIcon } from '../../../Icons';
import { Colors } from '../../../themes';

const Drawer = createDrawerNavigator<HomeDrawerNavigatorParams>();

// これpropsないとあかんな。

const CustomDrawerContent: React.FC<DrawerContentComponentProps> = (props) => {
  const { state, descriptors, navigation } = props;
  const [auth] = useRecoilState(authAtom);
  return (
    // <DrawerContentScrollView>
    <View
      style={{
        flex: 1,
        // backgroundColor: 'rgb(50,50,50)',
        borderTopLeftRadius: 20,
        borderBottomLeftRadius: 20,
        paddingTop: 30,
        // paddingHorizontal: 10,
      }}
    >
      <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
        <VectorIcon.MCI name='arrow-left' size={20} color={Colors.white} style={{ marginRight: 20 }} />
        <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Back</Text>
      </TouchableOpacity>
      <View
        style={{
          alignSelf: 'center',
          marginBottom: 20,
        }}
      >
        <View
          style={{
            backgroundColor: 'rgb(70,70,70)',
            justifyContent: 'center',
            alignItems: 'center',
            width: 80,
            height: 80,
            borderRadius: 80 / 2,
            marginBottom: 20,
          }}
        >
          {auth.avatar ? (
            <View style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}>
              <ExpoImage
                style={{ width: '100%', height: '100%', borderRadius: 80 / 2 }}
                source={{ uri: auth.avatar }}
                contentFit='cover'
              />
            </View>
          ) : (
            <Text style={{ color: 'white', fontSize: 23, textAlign: 'center', fontWeight: 'bold' }}>
              {auth.name.slice(0, 2).toUpperCase()}
            </Text>
          )}
        </View>
        <Text style={{ color: 'white', fontSize: 23, fontWeight: 'bold' }}>{auth.name}</Text>
      </View>

      {/* {state.routes.map((route, index) => {
        return (
          <TouchableOpacity
            key={route.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              padding: 20,
              backgroundColor: 'rgb(70,70,70)',
              // backgroundColor: isFocused ? '#e0e0e0' : 'transparent', // Apply background color for the selected tab
            }}
            onPress={() => navigation.navigate(route.name)}
          >
            <Text style={{ color: 'white' }}>{route.name}</Text>
          </TouchableOpacity>
        );
      })} */}
      <ScrollView>
        <View>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <VectorIcon.MCI name='account' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Edit My Account</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <VectorIcon.II name='settings' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Settings</Text>
          </TouchableOpacity>
        </View>
        <View style={{ height: 0.3, backgroundColor: 'rgb(100,100,100)', marginHorizontal: 15 }}></View>
        <View style={{ marginTop: 10 }}>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <VectorIcon.MCI name='rocket-launch' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Create New Space</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <VectorIcon.MCI name='key' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Enter Private Space</Text>
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
            <VectorIcon.MCI name='compass' size={20} color={Colors.white} style={{ marginRight: 20 }} />
            <Text style={{ color: 'white', fontSize: 18, fontWeight: 'bold' }}>Discover</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
      <View style={{ position: 'absolute', bottom: 0, width: '100%' }}>
        <TouchableOpacity activeOpacity={0.7} style={{ padding: 15, flexDirection: 'row', alignItems: 'center' }}>
          <VectorIcon.II
            name='information-circle-outline'
            size={20}
            color={'rgb(150,150,150)'}
            style={{ marginRight: 20 }}
          />
          <Text style={{ color: 'rgb(150,150,150)', fontSize: 13, fontWeight: 'bold' }}>What's Var by the way?</Text>
        </TouchableOpacity>
      </View>
    </View>
    // </DrawerContentScrollView>
  );
};

export const HomeDrawerNavigator = () => {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={({ navigation }) => ({
        headerShown: false,
        // swipeEnabled: true,
        drawerType: 'slide',
        drawerPosition: 'right',
        drawerStyle: {
          backgroundColor: 'black',
          borderLeftColor: 'rgb(50,50,50)',
          borderLeftWidth: 1,
          width: Dimensions.get('screen').width * 0.8,
        },
        // tabBarStyle: {
        //   backgroundColor: 'black',
        //   borderTopWidth: 0,
        //   width: 'auto',
        // },
        // tabBarLabelStyle: {
        //   fontSize: 12,
        // },
        // headerTintColor: 'white',
        // headerStyle: {
        //   backgroundColor: 'black',
        //   borderBottomWidth: 0,
        //   borderBottomColor: 'black',
        //   height: 80,
        // },
        // tabBarLabel: 'Home',
      })}
      // defaultStatus='open'
    >
      <Drawer.Screen name='Home' component={Home} />
      <Drawer.Screen name='EditAccount' component={EditAccount} />
      <Drawer.Screen name='Settings' component={DummyComponent} />
    </Drawer.Navigator>
  );
};

const DummyComponent = () => {
  return <View style={{ flex: 1, backgroundColor: 'red' }} />;
};
