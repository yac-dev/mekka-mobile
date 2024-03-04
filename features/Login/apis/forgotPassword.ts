import backendAPI from '../../../apis/backend';

export const forgotPassword = async () => {
  try {
    const response = await backendAPI.post('/');
  } catch (error) {
    throw error;
  }
};
