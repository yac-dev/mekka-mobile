import backendAPI from '../../../apis/backend';
import { LoginInput, LoginOutput } from '../types';

export const login = async (input: LoginInput): Promise<LoginOutput> => {
  try {
    // console.log(payload);
    console.log('input??', input);
    const result = await backendAPI.post('/auth/login', { email: input.email, password: input.password });
    const response = result.data.data;
    console.log('response', response);
    // response きてへんな。。。。なんでだ？？
    return response.user;

    // setAuthData(response.user);
    // setIsAuthenticated(true);
    // setLoading(false);
    // setSnackBar({ isVisible: true, message: 'Logged in successfully.', barType: 'success', duration: 5000 });
    // await SecureStore.setItemAsync('secure_token', response.jwt);
    // props.navigation?.navigate('SpacesDrawerNavigator');
  } catch (error) {
    throw error;
    // なるほど。errorの時はここでthrow error出して、それがapi側にも行くのね。。。
    // setLoading(false);
    // setSnackBar({
    //   isVisible: true,
    //   message: 'OOPS. Something went wrong. Please try again.',
    //   barType: 'error',
    //   duration: 5000,
    // });
  }
  // ここで、secureeをさらにsetする感じか。
};
