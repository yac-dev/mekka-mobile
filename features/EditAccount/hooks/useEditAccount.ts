import { useContext, useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { EditAccountFormType } from '../types';
import { AuthContext } from '../../../providers';
import { GlobalContext } from '../../../contexts/GlobalContext';

export const useEditAccount = () => {
  const { auth } = useContext(AuthContext);
  const [formData, setFormData] = useState<EditAccountFormType>({
    name: {
      hasChanged: false,
      isValidated: true,
      value: auth.name,
    },
    email: {
      hasChanged: false,
      isValidated: true,
      value: auth.email,
    },
    password: {
      hasChanged: false,
      isValidated: true,
      value: auth.password,
    },
    avatar: {
      hasChanged: false,
      isValidated: true,
      value: auth.avatar,
    },
  }); 
  const [isFormValidated, setIsFormValidates] = useState<boolean>(false);
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
          avatar: {
            hasChanged: true,
            isValidated: true,
            value: pickedImage.assets[0].uri,
          },
        };
      });
    }
  };

  const onNameChange = (newText: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        name: {
          hasChanged: newText === auth.name ? false : true,
          isValidated: newText.length ? true : false,
          value: newText,
        },
      };
    });
  };

  const onEmailChange = (newText: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        email: {
          hasChanged: newText === auth.email ? false : true,
          isValidated: newText.length ? true : false,
          value: newText,
        },
      };
    });
  };

  const onPasswordChange = (newText: string) => {
    setFormData((previous) => {
      return {
        ...previous,
        password: {
          hasChanged: newText === auth.password ? false : true,
          isValidated: newText.length ? true : false,
          value: newText,
        },
      };
    });
  };

  const onPasswordVisibilityChange = () => {
    setIsPasswordVisible((previous) => !previous);
  };

  const validateForm = () => {
    if (
      formData.name.hasChanged ||
      formData.email.hasChanged ||
      formData.password.hasChanged ||
      formData.avatar.hasChanged
    ) {
      if (
        formData.name.isValidated &&
        formData.email.isValidated &&
        formData.password.isValidated &&
        formData.avatar.isValidated
      ) {
        setIsFormValidates(true);
      }
    } else {
      setIsFormValidates(false);
    }
  };

  return {
    formData,
    isFormValidated,
    isPasswordVisible,
    onAvatarPress,
    onNameChange,
    onEmailChange,
    onPasswordChange,
    onPasswordVisibilityChange,
    validateForm,
  };
};
