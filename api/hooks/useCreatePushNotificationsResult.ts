import { useState } from 'react';
import { ApiResultType } from '../../types';
import { CreatePushNotificationsInputType, CreatePushNotificationsOutputType } from '../types';
import { createPushNotifications } from '../apis';

export const useCreatePushNotificationsResult = () => {
  const [apiResult, setApiResult] = useState<ApiResultType<CreatePushNotificationsInputType>>({
    status: 'idling',
    data: void 0,
    message: '',
  });

  const requestCreatePushNotifications = async (input: CreatePushNotificationsInputType) => {
    try {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'loading',
          data: undefined,
        };
      });

      await createPushNotifications(input);
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'success',
          data: undefined,
        };
      });
    } catch (error) {
      setApiResult((previous) => {
        return {
          ...previous,
          status: 'error',
          data: void 0,
          message: 'OOPS. Something went wrong...',
        };
      });
    }
  };

  return {
    requestCreatePushNotifications,
  };
};
