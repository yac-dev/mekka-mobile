import backendAPI from '../../../apis/backend';

export const createPost = async () => {
  try {
    const result = await backendAPI.post('/posts', payload, {
      headers: { 'Content-type': 'multipart/form-data' },
    });
  } catch (error) {
    throw error;
  }
};
