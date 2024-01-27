import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { EditAccountFormType } from '../types';
import { AuthContext } from '../../../providers';
import { GlobalContext } from '../../../contexts/GlobalContext';

export const useEditAccount = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState<EditAccountFormType>({
    name: auth.name,
    email: auth.email,
    password: auth.password,
    avatar: auth.avatar,
  }); // userのauthDataをまんま当てはめる。ここで。
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onAvatarPress = async () => {
    let pickedImage = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [16, 9],
      quality: 1,
    });
    if (!pickedImage.canceled && pickedImage.assets[0].uri) {
      setFormData((previous) => {
        return {
          ...previous,
          avatar: pickedImage.assets[0].uri,
        };
      });
    }
  };

  const onNameChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        name: text,
      };
    });
  };

  const onEmailChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        email: text,
      };
    });
  };

  const onPasswordChange = (text: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        password: text,
      };
    });
  };

  const onPasswordVisibilityChange = () => {
    setIsPasswordVisible((previous) => !previous);
  };

  return {
    formData,
    isPasswordVisible,
    onAvatarPress,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordVisibilityChange,
  };
};
