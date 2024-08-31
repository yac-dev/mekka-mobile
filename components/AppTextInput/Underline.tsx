import { View, TextInput, StyleSheet } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Colors } from '../../themes';
import { VectorIcon } from '../../Icons';

type KeyBoardType = 'default' | 'numeric' | 'email-address' | 'number-pad';

type UnderlineTextInputProps = {
  placeholder: string;
  value: string;
  labelIcon: React.ReactNode;
  keyboardType: KeyBoardType;
  onTextChange: (text: string) => void;
  isValueSecured?: boolean;
  secureTextEntry?: boolean;
  onTextEntryVisibilityChange?: () => void;
};

export const UnderlineTextInput: React.FC<UnderlineTextInputProps> = ({
  placeholder,
  value,
  onTextChange,
  labelIcon,
  keyboardType,
  secureTextEntry,
  onTextEntryVisibilityChange,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.labelIconContainer}>{labelIcon}</View>
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={Colors.white170}
        style={styles.textInput}
        autoCapitalize='none'
        keyboardType={keyboardType}
        value={value}
        secureTextEntry={secureTextEntry}
        onChangeText={onTextChange}
        textContentType='oneTimeCode'
      />
      {secureTextEntry !== undefined && (
        <TouchableOpacity
          activeOpacity={1}
          style={styles.viewSecureEntryContainer}
          onPress={() => onTextEntryVisibilityChange()}
        >
          <VectorIcon.II name={`${secureTextEntry ? 'eye' : 'eye-off'}`} color='white' size={20} />
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
    borderBottomWidth: 0.3,
    borderBottomColor: Colors.white170,
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
    color: Colors.white,
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
