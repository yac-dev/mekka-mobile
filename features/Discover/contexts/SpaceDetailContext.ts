import { createContext } from 'react';

type SpaceType = {
  _id: string;
  name: string;
  contentType: string;
  // thumbnail: string;
};

type SpacesContextProps = {
  space: SpaceType;
  setSpace: React.Dispatch<React.SetStateAction<SpaceType>>;
  // ここのsetSpaceの書き方がいまいちよく分からんがまあ、これでいいだろう。
};

export const SpaceDetailContext = createContext<SpacesContextProps>({
  space: {
    _id: '',
    name: '',
    contentType: '',
  },
  setSpace: () => {},
});
