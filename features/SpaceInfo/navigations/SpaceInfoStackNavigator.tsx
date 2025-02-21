import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SpaceInfo } from '../pages/SpaceInfo';
import { Colors } from '../../../themes/colors';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { TouchableOpacity, Text, View, Share } from 'react-native';
import { urls } from '../../../settings/urls';
import { currentSpaceAtom } from '../../../recoil/atoms/currentSpaceAtom';
import { useRecoilState } from 'recoil';
import { Members } from '../components/Members';
import { UserStackNavigator } from '../../User';

type SpaceInfoStackParams = {
  SpaceInfo: undefined;
  UserStackNavigator: {
    userId: string;
  };
};
export type SpaceInfoStackNavigatorProps = NativeStackNavigationProp<SpaceInfoStackParams>;
const SpaceInfoStack = createNativeStackNavigator();

// : React.FC<NativeStackScreenProps<HomeStackParams, 'SpaceInfoStackNavigator'>>

export const SpaceInfoStackNavigator = () => {
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  const handleInvite = async () => {
    Share.share({
      title: 'Share Lampole',
      message: `Access here to download Lampole: ${urls.appStore}${'\n'} and then enter this private key: ${
        currentSpace.secretKey
      }`,
    });
  };

  return (
    <SpaceInfoStack.Navigator>
      <SpaceInfoStack.Screen
        name='SpaceInfo'
        component={SpaceInfo}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity activeOpacity={0.7} onPress={handleInvite}>
              <Text style={{ color: 'white', fontSize: 20, fontWeight: 'bold' }}>Invite</Text>
            </TouchableOpacity>
          ),
          headerLeft: () => (
            <AppButton.Icon
              onButtonPress={() => navigation.goBack()}
              customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
              hasShadow={false}
            >
              <VectorIcon.II name='close' size={18} color={Colors.white} />
            </AppButton.Icon>
          ),
          headerShown: true,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
          },
        })}
      />
      <SpaceInfoStack.Screen
        name='UserStackNavigator'
        component={UserStackNavigator}
        options={({ navigation }) => ({
          headerShown: false,
          headerTitle: '',
          headerStyle: {
            backgroundColor: 'black',
          },
          headerTitleStyle: {
            fontWeight: 'bold',
            color: Colors.white,
          },
        })}
      />
    </SpaceInfoStack.Navigator>
  );
};
