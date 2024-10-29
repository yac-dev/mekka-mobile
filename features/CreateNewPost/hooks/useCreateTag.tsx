import { useContext, useState } from 'react';
import { IconType } from '../../../types';
import { CreateNewPostContext } from '../contexts';
import { CreatedTagType } from '../contexts';
import { Colors } from '../../../themes';
// export type CreatingTagType = {
//   _id: Date;
//   iconType: 'icon';
//   icon: IconType;
//   name: string;
//   color: string;
//   created: boolean;
// };

const colors = Object.keys(Colors.iconColors);

export const useCreateTag = () => {
  const { defaultTagIcon } = useContext(CreateNewPostContext);
  const [creatingTag, setCreatingTag] = useState<CreatedTagType>({
    _id: new Date(),
    iconType: 'icon',
    icon: defaultTagIcon,
    name: '',
    color: colors[Math.floor(Math.random() * colors.length)],
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
