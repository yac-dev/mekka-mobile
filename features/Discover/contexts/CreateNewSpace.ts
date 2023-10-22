import { createContext } from 'react';

// stateとactionのtypeをまず設定すると。
type FormDataStateType = {
  name: string;
  icon: string;
  contentType: string;
  isPublic: boolean;
  isCommentAvailable: boolean;
  isReactionAvailable: boolean;
  // reactions: string[];
  // tags: string[];
};

// type CreateNewSpaceActionType =
//   | { type: 'SET_NAME'; payload: string }
//   | { type: 'SET_CONTENT_TYPE'; payload: string }
//   | { type: 'SET_IS_PUBLIC'; payload: boolean }
//   | { type: 'SET_IS_COMMENT_AVAILABLE'; payload: boolean }
//   | { type: 'SET_IS_REACTION_AVAILABLE'; payload: boolean };

// //　上で設定したstate type, dsipatchのtypeをここで使う。
// export const CreateNewSpaceReducer = (
//   state: CreateNewSpaceStateType,
//   action: CreateNewSpaceActionType
// ): CreateNewSpaceStateType => {
//   switch (action.type) {
//     case 'SET_NAME':
//       return { ...state, name: action.payload };
//     case 'SET_CONTENT_TYPE':
//       return { ...state, contentType: action.payload };
//     case 'SET_IS_PUBLIC':
//       return { ...state, isPublic: action.payload };
//     case 'SET_IS_COMMENT_AVAILABLE':
//       return { ...state, isCommentAvailable: action.payload };
//     case 'SET_IS_REACTION_AVAILABLE':
//       return { ...state, isReactionAvailable: action.payload };
//     default:
//       return state;
//   }
// };

// contextの設定。
// ここら辺のfileわけがすげー煩わしいんだよな。。。どうしようか。
interface CreateNewSpaceProps {
  formData: FormDataStateType; // ここのstateの形というかtypeか。これを直さなきゃなんだね。。。
  setFormData: React.Dispatch<React.SetStateAction<FormDataStateType>>;
}

export const CreateNewSpaceContext = createContext<CreateNewSpaceProps>({
  formData: {
    name: '',
    icon: '',
    contentType: '',
    isPublic: true,
    isCommentAvailable: true,
    isReactionAvailable: true,
  },
  setFormData: () => {},
});
