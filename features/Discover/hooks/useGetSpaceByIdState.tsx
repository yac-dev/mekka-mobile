import React, { useState } from 'react';
import { ApiResultType } from '../../../types';
import { GetSpaceByIdInputType, GetSpaceByIdOutputType } from '../types';
import { getSpaceById } from '../apis';
import { GetSpaceByIdState } from '../states';
import { useRecoilState } from 'recoil';

type useGetSpaceByIdStateOutputType = {
  apiResult: ApiResultType<GetSpaceByIdOutputType>;
  requestApi: (input: GetSpaceByIdInputType) => void;
};

export const useGetSpaceByIdState = (): useGetSpaceByIdStateOutputType => {
  const [apiResult, setApiResult] = useRecoilState(GetSpaceByIdState);

  const requestApi = async (input: GetSpaceByIdInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
        };
      });
      const response = await getSpaceById(input);
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
          message: 'OOPS. Something went wrong.',
        };
      });
    }
  };

  return {
    apiResult,
    requestApi,
  };
};
