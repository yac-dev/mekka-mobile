import React, { useContext, useEffect } from 'react';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../components';
import { primaryBackgroundColor } from '../themes/color';
import SpaceDetail from '../features/Discover/pages/SpaceDetail';
import Members from '../features/Discover/pages/Members';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../themes';
import { VectorIcon } from '../Icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AuthContext } from '../providers';
import { MySpacesContext } from '../providers';
import { useGetSpaceByIdState } from '../features/Discover/hooks/useGetSpaceByIdState';

// const onJoinPress = async () => {
//   const payload = {
//     userId: auth._id,
//     space: {
//       _id: space._id,
//       name: space.name,
//       icon: space.icon,
//       contentType: space.contentType,
//     },
//   };
//   showLoadingSpinner();
//   const result = await backendAPI.post(`/spaces/${props.route.params.spaceId}/public`, payload);
//   const { spaceAndUserRelationship } = result.data;
//   setSpaceAndUserRelationships((previous) => [...previous, spaceAndUserRelationship]);
//   hideLoadingSpinner();
//   setSnackBar({
//     isVisible: true,
//     status: 'success',
//     message: `You have joined ${space.name} successfully`,
//     duration: 5000,
//   });
//   props.navigation.goBack();
// };
export type SpaceDetailStackNavigatorScreens = {
  SpaceDetail: { _id: string };
};

export type SpaceDetailStackNavigatorProp = NativeStackNavigationProp<SpaceDetailStackNavigatorScreens>;

const SpaceDetailStack = createNativeStackNavigator<SpaceDetailStackNavigatorScreens>();

type SpaceDetailStackNavigatorProps = NativeStackScreenProps<SpaceDetailStackNavigatorScreens, 'SpaceDetail'>;

export const SpaceDetailStackNavigator: React.FC<SpaceDetailStackNavigatorProps> = ({ route }) => {
  const { requestApi: requestGetSpaceById } = useGetSpaceByIdState();

  useEffect(() => {
    requestGetSpaceById({ _id: route.params?._id });
  }, []);

  return (
    <SpaceDetailStack.Navigator>
      <SpaceDetailStack.Screen
        name='SpaceDetail'
        component={SpaceDetail}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={Colors.white} />
            </AppButton.Icon>
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
      {/* <SpaceDetailStack.Screen
        name='Members'
        component={Members}
        options={({ navigation }) => ({
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerTitle: 'Detail',
          headerStyle: {
            backgroundColor: 'white',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        })}
      /> */}
    </SpaceDetailStack.Navigator>
  );
};
