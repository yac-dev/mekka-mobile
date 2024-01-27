import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { TextColor, Color } from '../themes';
import { VectorIcon } from '../Icons';

type PrimaryTextInputProps = {
  placeholder: string;
  value: string;
  labelIcon: React.ReactNode;
  keyboardType: 'default' | 'numeric' | 'email-address' | 'number-pad';
  onTextChange: (text: string) => void;
  isValueSecured?: boolean;
  secureTextEntry?: boolean;
  isTextEntryVisible?: boolean;
  onTextEntryVisibilityChange?: () => void;
};

// 確かに、stateを持たせるとなるとなかなか面倒くさい形になるね。ただのcomponentならまだしも。。。
// primary secondary, tertiaryと、textInputの種類をここにまとめていく感じにする。
// hiddenはどうかは、親でもっておくのかな。。。多分
export namespace AppTextInput {
  export const BorderStyle: React.FC<PrimaryTextInputProps> = ({
    placeholder,
    value,
    onTextChange,
    labelIcon,
    keyboardType,
    secureTextEntry,
    isTextEntryVisible,
    onTextEntryVisibilityChange,
  }) => {
    return (
      <View style={styles.container}>
        <View style={styles.labelIconContainer}>{labelIcon}</View>
        <TextInput
          placeholder={placeholder}
          placeholderTextColor={TextColor.secondary}
          style={styles.textInput}
          autoCapitalize='none'
          keyboardType={keyboardType}
          value={value}
          secureTextEntry={secureTextEntry && isTextEntryVisible}
          onChangeText={onTextChange}
        />
        {secureTextEntry && (
          <TouchableOpacity
            activeOpacity={1}
            style={styles.viewSecureEntryContainer}
            onPress={() => onTextEntryVisibilityChange()}
          >
            <VectorIcon.II name={`${isTextEntryVisible ? 'eye' : 'eye-off'}`} color='white' size={20} />
          </TouchableOpacity>
        )}
      </View>
    );
  };
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Color.primary,
    marginLeft: 10,
    marginRight: 10,
  },
  labelIconContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: 10,
    borderBottomLeftRadius: 10,
  },
  textInput: {
    flex: 1,
    height: 50,
    padding: 10,
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
    color: TextColor.primary,
  },
  viewSecureEntryContainer: {
    width: 50,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopRightRadius: 10,
    borderBottomRightRadius: 10,
  },
});
