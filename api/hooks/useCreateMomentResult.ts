import { useState } from 'react';
import { ApiResult, SpaceType } from '../../types';
import { CreateMomentInputType } from '../types';
import { createMoment } from '../apis';
import { useRecoilState } from 'recoil';
import { createMomentResultAtomFamily } from '../atoms';

export const useCreateMomentResult = (space: SpaceType) => {
  const [createMomentResult, setCreateMomentResult] = useRecoilState(createMomentResultAtomFamily(space._id));

  const requestCreateMoment = async (input: CreateMomentInputType) => {
    try {
      setCreateMomentResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      const response = await createMoment(input);
      setCreateMomentResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: response,
        };
      });
    } catch (error) {
      setCreateMomentResult((previous) => {
        return {
          ...previous,
          status: 'error',
          data: void 0,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  const revertCreateMomentResult = () => {
    setCreateMomentResult((previous) => {
      return {
        ...previous,
        status: 'idle',
        data: undefined,
      };
    });
  };

  return {
    requestCreateMoment,
    revertCreateMomentResult,
  };
};
