import { atom, atomFamily, selectorFamily } from 'recoil';
import { atomKeys } from '../../../Recoil';
import { PostType } from '../../../types';
import { ApiResult } from '../../../types';
import { getPostsByTagId } from '../../../api';
import { GetPostsByTagIdOutputType } from '../../../api/types';
// ここのposts Stateはさ、keyに加えてidも持たせたいよね。

// 複雑なstate managementは、別でhooks作ってやるしかないかなもう。
// selector内でいじることは無理みたいだし。

export const getPostsByTagIdAtomFamily = atomFamily<ApiResult<GetPostsByTagIdOutputType>, string>({
  key: 'posts',
  default: {
    status: 'loading',
    data: undefined,
  },
});
