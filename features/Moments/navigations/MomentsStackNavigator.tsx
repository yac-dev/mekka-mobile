import { useContext, useState } from 'react';
import { View, Text, Modal, StyleSheet } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Colors } from '../../../themes/colors';
import { NativeStackNavigationProp, NativeStackScreenProps } from '@react-navigation/native-stack';
import { Moments } from '../pages/Moments';
import { ViewPostStackNavigator } from '../../ViewPost/navigations/ViewPostStackNavigator';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons';
import { CreateNewPostStackNavigator } from '../..';
import { useRecoilState } from 'recoil';
import { currentSpaceAtom } from '../../../recoil';
import { Image as ExpoImage } from 'expo-image';

// navigatior系を全部一箇所のまとめた方がいいよな。。すげー面倒くさくなってきている。。。
// type MomentsStackParams = {
//   Moments: undefined;
//   ViewPostStackNavigator: undefined;
//   CreateNewPostStackNavigator: NativeStackScreenProps<CreateNewPostStackParams>;
// };

// export type MomentsStackNavigatorProps = NativeStackNavigationProp<MomentsStackParams>;
const MomentsStack = createNativeStackNavigator();

export const MomentsStackNavigator = () => {
  const [modalVisible, setModalVisible] = useState<boolean>(false);
  const [currentSpace] = useRecoilState(currentSpaceAtom);

  function convertMinutesToHoursAndMinutes(minutes: number) {
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;

    if (hours === 0) {
      return `${minutes} minutes`;
    } else if (remainingMinutes === 0) {
      return `${hours} hours`;
    } else {
      return `${hours} hours ${remainingMinutes} mins`;
    }
  }

  // momentsをcacheしておくのはいいが、開くたびにmomentsをrefreshせねばいかん。
  return (
    // ここ、providerが必要だな。。。createのapi statusをcontextで持たせよう。
    <View style={{ flex: 1 }}>
      <MomentsStack.Navigator>
        <MomentsStack.Group>
          <MomentsStack.Screen
            name='Moments'
            component={Moments}
            options={({ navigation }) => ({
              // headerShown: false,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='arrow-back' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerRight: () => (
                <AppButton.Icon
                  onButtonPress={() => setModalVisible(true)}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.AD name='question' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerTitle: () => (
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ExpoImage
                    source={{ uri: currentSpace.icon }}
                    style={{ width: 28, height: 28, borderRadius: 30, marginRight: 5 }}
                  />
                  <Text style={{ color: Colors.white, fontWeight: 'bold', fontSize: 17 }}>Moments</Text>
                </View>
              ),
              headerStyle: {
                backgroundColor: 'black',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
                fontSize: 17,
              },
            })}
          />
        </MomentsStack.Group>
        <MomentsStack.Group screenOptions={{ presentation: 'fullScreenModal' }}>
          <MomentsStack.Screen
            name='ViewPostStackNavigator'
            component={ViewPostStackNavigator}
            options={({ navigation }) => ({
              headerRight: () => (
                <AppButton.Icon
                  onButtonPress={() => navigation.goBack()}
                  customStyle={{ width: 28, height: 28, backgroundColor: 'rgb(50,50,50)' }}
                  hasShadow={false}
                >
                  <VectorIcon.II name='close' size={18} color={Colors.white} />
                </AppButton.Icon>
              ),
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'rgb(30, 30, 30)',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
          <MomentsStack.Screen
            name='CreateNewPostStackNavigator'
            component={CreateNewPostStackNavigator}
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
              headerShown: false,
              headerTitle: '',
              headerStyle: {
                backgroundColor: 'rgb(30, 30, 30)',
              },
              headerTitleStyle: {
                fontWeight: 'bold',
                color: Colors.white,
              },
            })}
          />
        </MomentsStack.Group>
      </MomentsStack.Navigator>
      <Modal
        animationType='slide'
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <View
            style={{
              width: 300,
              height: 300,
              backgroundColor: 'rgb(50,50,50)',
              borderRadius: 10,
              padding: 10,
            }}
          >
            <AppButton.Icon
              customStyle={{
                width: 28,
                height: 28,
                backgroundColor: 'rgb(50,50,50)',
                alignSelf: 'flex-end',
                marginBottom: 10,
              }}
              onButtonPress={() => setModalVisible(!modalVisible)}
              hasShadow
            >
              <VectorIcon.II name='close' size={20} color={'white'} />
            </AppButton.Icon>
            <Text
              style={{
                color: 'white',
                fontWeight: 'bold',
                fontSize: 18,
                textAlign: 'center',
                marginBottom: 30,
              }}
            >
              What is Moments?
            </Text>
            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
              <Text style={styles.modalText}>
                You can think of Moments as IG's Stories.{'\n'}By using Moments post, your photos/videos will disappear
                after a certain time after posting. Instead of 24 hours, the disappearing time depends on Space setting.
                {'\n'}In {currentSpace.name}, it is set to{'\n'}
                <Text style={{ color: 'white', fontWeight: 'bold' }}>
                  {convertMinutesToHoursAndMinutes(currentSpace.disappearAfter)}.
                </Text>
              </Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  modalView: {
    width: 500,
    height: 300,
    backgroundColor: 'rgb(50,50,50)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    color: 'white',
    lineHeight: 25,
  },
});
