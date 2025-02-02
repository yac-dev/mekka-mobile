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
      title: 'Share Var',
      message: `Access here to download Var: ${urls.appStore}${'\n'} and then enter this private key: ${
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
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingHorizontal: 15,
                  backgroundColor: 'rgb(50, 50, 50)',
                  borderRadius: 100,
                  marginRight: 10,
                  height: 28,
                }}
                activeOpacity={0.7}
                onPress={handleInvite}
              >
                <VectorIcon.MCI name='human-greeting-variant' color='white' size={15} style={{ marginRight: 10 }} />
                <Text style={{ color: 'white', fontSize: 15 }}>Invite</Text>
              </TouchableOpacity>
              <AppButton.Icon
                onButtonPress={() => navigation.goBack()}
                customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                hasShadow={false}
              >
                <VectorIcon.II name='close' size={18} color={Colors.white} />
              </AppButton.Icon>
            </View>
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
