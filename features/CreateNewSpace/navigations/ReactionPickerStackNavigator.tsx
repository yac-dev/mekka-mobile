import { NativeStackNavigationProp, createNativeStackNavigator } from '@react-navigation/native-stack';
import SelectSpaceVisibility from '../pages/SelectSpaceVisibility';
import ContentType from '../pages/ContentType';
import Moment from '../pages/Moment';
import Reaction from '../pages/Reaction';
import Description from '../pages/Description';
import ReactionPicker from '../pages/ReactionPicker';
import { CreateNewSticker } from '../pages';
import { SnackBar, LoadingSpinner } from '../../../components';
import { AppButton } from '../../../components';
import { VectorIcon } from '../../../Icons/VectorIcons';
import { Colors } from '../../../themes';
import { CreateNewSpaceProvider, CreateNewSpaceContext } from '../contexts/CreateNewSpaceProvider';
import { ReactionType } from '../contexts/ReactionPickerProvider';
import { TemplateSelection, Base, Comment } from '../pages';
import { ReactionPickerStackParams } from './CreateNewSpaceStackNavigator';
import { ReactionPickerProvider } from '../contexts/ReactionPickerProvider';

const ReactionPickerStack = createNativeStackNavigator<ReactionPickerStackParams>();

export const ReactionPickerStackNavigator = () => {
  return (
    <ReactionPickerProvider>
      <ReactionPickerStack.Navigator>
        <ReactionPickerStack.Group>
          <ReactionPickerStack.Screen
            name='ReactionPicker'
            component={ReactionPicker}
            options={({ navigation }) => ({
              headerShown: true,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
        </ReactionPickerStack.Group>
        <ReactionPickerStack.Group screenOptions={{ presentation: 'modal' }}>
          <ReactionPickerStack.Screen
            name='CreateNewSticker'
            component={CreateNewSticker}
            options={({ navigation }) => ({
              headerShown: true, // ここtrueにすると、,,,
              headerLeft: () => (
                <AppButton.Icon
                  onButtonPress={() => {
                    navigation.goBack();
                  }}
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
        </ReactionPickerStack.Group>
      </ReactionPickerStack.Navigator>
    </ReactionPickerProvider>
  );
};
