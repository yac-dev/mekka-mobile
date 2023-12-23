export const INITIAL_AUTH_STATE = { _id: '', name: '', email: '', avatar: '' };
export type AuthDataType = {
  _id: string;
  name: string;
  email: string;
  avatar: string;
};

export const INITIAL_SNACK_BAR_STATE = { isVisible: false, message: '', barType: void 0, duration: void 0 }; // defaultで5000秒
export type BarType = 'SUCCESS' | 'INFO' | 'WARNING' | 'ERROR';
export type SnackBarType = {
  isVisible: boolean;
  message: string;
  barType?: BarType; // defaultではなにもなし。
  duration?: number; //
};

export const INITIAL_API_ERROR_STATE = { message: '' };
export type APIStatusType = 'idle' | 'success' | 'loading' | 'error';
export type APIErrorType =
  | {
      message: string;
    }
  | undefined;
