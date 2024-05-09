import { useState } from 'react';
import { ApiResultType, AuthType } from '../../../types';
import { getMembersBySpaceId } from '../apis/getSpaceMembers';
import { GetMembersBySpaceIdInputType, GetMembersBySpaceIdOutputType } from '../types';

export const useGetMembersBySpaceId = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<GetMembersBySpaceIdOutputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestApi = async (input: GetMembersBySpaceIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });

      const response = await getMembersBySpaceId(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
          data: void 0,
        };
      });
    }
  };

  const loadMore = async (input: GetMembersBySpaceIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'paging',
        };
      });

      const response = await getMembersBySpaceId(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'fail',
          data: void 0,
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
    loadMore,
  };
};
