import { useState } from 'react';
import { ApiResultType } from '../../../types';
import { getPostsByTagIdAndRegion } from '../apis';
import { GetPostsByTagIdAndRegionInput, GetPostsByTagIdAndRegionOutput } from '../types';
import { getPostsByTagIdAndRegionResultAtomFamily } from '../atoms';
import { useRecoilState } from 'recoil';

export const useGetPostsByTagIdAndRegion = (tagId: string) => {
  const [getPostsByTagIdAndRegionResult, setGetPostsByTagIdAndRegionResult] = useRecoilState(
    getPostsByTagIdAndRegionResultAtomFamily(tagId)
  );

  const requestGetPostsByTagIdAndRegion = async (input: GetPostsByTagIdAndRegionInput) => {
    try {
      setGetPostsByTagIdAndRegionResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      const response = await getPostsByTagIdAndRegion(input);
      setGetPostsByTagIdAndRegionResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setGetPostsByTagIdAndRegionResult((previous) => {
        return {
          ...previous,
          status: 'error',
          data: undefined,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  return {
    requestGetPostsByTagIdAndRegion,
  };
};
