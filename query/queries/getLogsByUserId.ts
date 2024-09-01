import { axiosClient } from '../axiosClient';
import { GetLogsByUserIdInputType, GetLogsByUserIdOutputType } from '../types';

// ここら辺のuser id系は、input使って入れることにする。useで。
export const getLogsByUserId = async (input: GetLogsByUserIdInputType): Promise<GetLogsByUserIdOutputType> => {
  try {
    const result = await axiosClient.get(`/logs/${input.userId}`);
    const { logs, momentLogs } = result.data.data;
    return {
      logs,
      momentLogs,
    };
  } catch (error) {
    if (error.response && error.response.data) {
      throw new Error(error.response.data);
    } else {
      throw new Error('An error occurred fetching your logs...');
    }
  }
};
