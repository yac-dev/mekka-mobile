import { useState } from 'react';
import { IconType } from '../../../types';

export type CreatingTagType = {
  _id: Date;
  iconType: 'icon';
  icon: IconType;
  name: string;
  color: string;
  added: boolean;
  created: boolean;
  image: string;
};

export const useCreateTag = () => {
  const [creatingTag, setCreatingTag] = useState<CreatingTagType>({
    _id: new Date(),
    iconType: 'icon',
    icon: '',
    image: '',
    name: '',
    color: 'white',
    added: true,
    created: true,
  });

  const onCreatingTagNameChange = (text: string) => {
    setCreatingTag((previous) => {
      return {
        ...previous,
        name: text,
      };
    });
  };

  return {
    creatingTag,
    onCreatingTagNameChange,
  };
};
