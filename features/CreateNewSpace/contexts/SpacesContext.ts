import { createContext } from 'react';

type SpaceType = {
  _id: string;
  name: string;
  contentType: string;
  // thumbnail: string;
};

type SpacesContextProps = {
  spaces: SpaceType[];
  setSpaces: React.Dispatch<React.SetStateAction<SpaceType[]>>;
  // ここのsetSpaceの書き方がいまいちよく分からんがまあ、これでいいだろう。
};

export const SpacesContext = createContext<SpacesContextProps>({
  spaces: [],
  setSpaces: () => {},
});
