import backendAPI from '../../../apis/backend';
import { GetLogsByUserIdInputType, GetLogsByUserIdOutputType } from '../types';

// ここら辺のuser id系は、input使って入れることにする。useで。
export const getLogsByUserId = async (input: GetLogsByUserIdInputType): Promise<GetLogsByUserIdOutputType> => {
  try {
    const result = await backendAPI.get(`/logs/${input.userId}`);
    const { logs, momentLogs } = result.data.data;
    return {
      logs,
      momentLogs,
    };
  } catch (error) {
    throw error;
  }
};
