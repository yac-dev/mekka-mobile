import React, { useState, createContext, useContext, useMemo, useCallback } from 'react';
import { SnackBarContext } from '../../../providers';
import { emojis } from '../../../utils/Emoji/shortNameToUnicode';

type StickerType = {
  _id: string;
  url: string;
};

export type ReactionType = EmojiReactionType | StickerReactionType | undefined;

export type EmojiReactionType = {
  type: 'emoji';
  emoji: string;
  sticker: undefined;
  caption: string;
};

export type StickerReactionType = {
  type: 'sticker';
  emoji: undefined;
  sticker: StickerType;
  caption: string;
};

type SelectedReactionsType = {
  [key: string]: ReactionType;
};

type ReactionPickerContextType = {
  selectedReactions: SelectedReactionsType;
  setSelectedReactions: React.Dispatch<React.SetStateAction<SelectedReactionsType>>;
  onEmojiPress: (emoji: string) => void;
  selectedReactionOption: ReactionType | undefined;
  onEmojiChange: (emoji: string) => void;
  onCaptionChange: (caption: string) => void;
  setDefaultReaction: (reaction: ReactionType) => void;
};

export const ReactionPickerContext = createContext<ReactionPickerContextType>({
  selectedReactions: {},
  setSelectedReactions: () => {},
  onEmojiPress: () => {},
  selectedReactionOption: undefined,
  onEmojiChange: () => {},
  onCaptionChange: () => {},
  setDefaultReaction: () => {},
});

type ReactionPickerProviderProps = {
  children: React.ReactNode;
};

export const ReactionPickerProvider: React.FC<ReactionPickerProviderProps> = ({ children }) => {
  const { setSnackBar } = useContext(SnackBarContext);
  const [selectedReactions, setSelectedReactions] = useState<SelectedReactionsType>({});
  const [selectedReactionOption, setSelectedReactionOption] = useState<ReactionType | undefined>(undefined);

  // const onEmojiChange = useCallback(
  //   (emoji: string) => {
  //     setSelectedReactionOption((previous) => {
  //       return {
  //         ...previous,
  //         type: 'emoji',
  //         emoji: emojis[`:${emoji}:`],
  //         sticker: undefined,
  //       };
  //     });
  //   },
  //   [selectedReactionOption]
  // );

  const onEmojiChange = (emoji: string) => {
    console.log('happening???');
    setSelectedReactionOption((previous) => {
      return {
        ...previous,
        type: 'emoji',
        emoji: emojis[`:${emoji}:`],
        sticker: undefined,
      };
    });
  };

  const onCaptionChange = (caption: string) => {
    setSelectedReactionOption((previous) => {
      return {
        ...previous,
        caption,
      };
    });
  };

  const onEmojiPress = useCallback(
    (emoji: string) => {
      if (Object.keys(selectedReactions).length >= 7) {
        console.log('emojis number should be at most 6');
        setSnackBar({
          isVisible: true,
          status: 'warning',
          message: 'OOPS. The number of reaction options is limited to 6 at most.',
          duration: 5000,
        });
      } else {
        // このlengthが明らかにおかしい。。。というかあれかな。// このfunctionが新しいのに更新されてないよね。useCallbakc的な。。
        console.log(Object.keys(selectedReactions).length);
        setSelectedReactions((previous) => {
          return {
            ...previous,
            [emojis[`:${emoji}:`]]: {
              type: 'emoji',
              emoji: emojis[`:${emoji}:`],
              sticker: undefined,
            },
          };
        });
      }
    },
    [selectedReactions]
  );

  const setDefaultReaction = (reaction: ReactionType) => {
    setSelectedReactionOption(reaction);
  };

  return (
    <ReactionPickerContext.Provider
      value={{
        selectedReactions,
        setSelectedReactions,
        onEmojiPress,
        selectedReactionOption,
        onEmojiChange,
        onCaptionChange,
        setDefaultReaction,
      }}
    >
      {children}
    </ReactionPickerContext.Provider>
  );
};
