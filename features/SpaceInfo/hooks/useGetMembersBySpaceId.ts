import { useQuery } from 'react-query';
import { getMembersBySpaceId } from '../../../api';
import { GetMembersBySpaceIdInputType } from '../../../api/types';

export const useGetMembersBySpaceId = (input: GetMembersBySpaceIdInputType) =>
  useQuery(['members', input.spaceId], () => getMembersBySpaceId(input));

// このkey名も外部で管理した方がいいよねおそらく。
