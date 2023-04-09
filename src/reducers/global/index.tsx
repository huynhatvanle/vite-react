import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import viVN from 'antd/lib/locale/vi_VN';
import enUS from 'antd/lib/locale/en_US';
import dayjs from 'dayjs';
import i18n from 'i18next';

import { API, keyRefreshToken, keyToken, keyUser, routerLinks } from '@utils';
import { Message } from '@components';

const name = 'Auth';
export const globalAction = {
  name,
  set: createAsyncThunk(name + '/set', async (values: any) => values),
  logout: createAsyncThunk(name + '/logout', async () => {
    // if (localStorage.getItem(keyRefreshToken)) {
    //   return await API.get(`${routerLinks(name, 'api')}/logout`);
    // }
    return true;
  }),
  profile: createAsyncThunk(name + '/profile', async () => {
    const { data } = await API.get(`${routerLinks(name, 'api')}/profile`);
    return data;
  }),
  putProfile: createAsyncThunk(name + '/putProfile', async (values: any) => {
    if (values.avatar && typeof values.avatar === 'object') {
      values.avatar = values.avatar[0].url;
    }
    const { data } = await API.put(`${routerLinks(name, 'api')}/profile`, values);
    return data;
  }),
  login: createAsyncThunk(name + '/post', async (values: any) => {
    const data = await API.post(`${routerLinks(name, 'api')}/login`, values);
    if (data) {
      if (data.message) await Message.success({ text: data.message });
      const { user, accessToken, refreshToken } = data.data;
      localStorage.setItem(keyToken, accessToken);
      localStorage.setItem(keyRefreshToken, refreshToken);
      return user;
    }
    return data;
  }),
  forgottenPassword: createAsyncThunk(name + '/forgotten-password', async (values: any) => {
    const data = await API.post(`${routerLinks(name, 'api')}/forgotten-password`, values);
    if (data) {
      if (data.message) await Message.success({ text: data.message });
    }
    return !!data.data;
  }),
  resetPassword: createAsyncThunk(name + '/reset-password', async (values: any) => {
    const token = values.token;
    delete values.token;
    const data = await API.post(
      `${routerLinks(name, 'api')}/reset-password`,
      values,
      {},
      { authorization: 'Bearer ' + token },
    );
    if (data) {
      if (data.message) await Message.success({ text: data.message });
    }
    return !!data;
  }),
};
const checkLanguage = (language: string) => {
  const formatDate = language === 'vn' ? 'DD-MM-YYYY' : 'YYYY-MM-DD';
  const locale = language === 'vn' ? viVN : enUS;
  dayjs.locale(language === 'vn' ? 'vi' : language);
  localStorage.setItem('i18nextLng', language);
  return { language, formatDate, locale };
};
const initialState: State = {
  data: {},
  user: JSON.parse(localStorage.getItem(keyUser) || '{}'),
  isLoading: false,
  isVisible: false,
  status: 'idle',
  title: '',
  ...checkLanguage(localStorage.getItem('i18nextLng') || 'en'),
};
export const globalSlice = createSlice({
  name: globalAction.name,
  initialState,
  reducers: {
    setLanguage: (state: State, action: PayloadAction<string>) => {
      if (action.payload !== state.language) {
        const { language, formatDate, locale } = checkLanguage(action.payload);
        i18n.changeLanguage(language);
        state.language = language;
        state.formatDate = formatDate;
        state.locale = locale;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(globalAction.set.fulfilled, (state: State, action: PayloadAction<object>) => {
        Object.keys(action.payload).forEach((key) => {
          // @ts-ignore
          state[key] = action.payload[key];
        });
      })
      // .addCase(globalAction.logout.pending, (state: State) => {
      //   state.isLoading = true;
      //   state.status = 'logout.pending';
      // })
      .addCase(globalAction.logout.fulfilled, (state) => {
        state.user = {};
        localStorage.removeItem(keyUser);
        localStorage.removeItem(keyToken);
        localStorage.removeItem(keyRefreshToken);
        clearTempLocalStorage();
        state.isLoading = false;
        state.status = 'logout.fulfilled';
      })

      .addCase(globalAction.profile.pending, (state: State) => {
        state.isLoading = true;
        state.status = 'profile.pending';
      })
      .addCase(globalAction.profile.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'profile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(globalAction.putProfile.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'putProfile.pending';
      })
      .addCase(globalAction.putProfile.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          state.user = action.payload;
          state.status = 'putProfile.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(globalAction.login.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'login.pending';
      })
      .addCase(globalAction.login.fulfilled, (state: State, action: PayloadAction<object>) => {
        if (action.payload) {
          localStorage.setItem(keyUser, JSON.stringify(action.payload));
          clearTempLocalStorage();
          state.user = action.payload;
          state.data = {};
          state.status = 'login.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(globalAction.forgottenPassword.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'forgottenPassword.pending';
      })
      .addCase(globalAction.forgottenPassword.fulfilled, (state: State, action: PayloadAction<any>) => {
        if (action.payload) {
          state.data = {};
          state.status = 'forgottenPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })

      .addCase(globalAction.resetPassword.pending, (state: State, action: any) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'resetPassword.pending';
      })
      .addCase(globalAction.resetPassword.fulfilled, (state: State, action: PayloadAction<any>) => {
        if (action.payload) {
          state.data = {};
          state.status = 'resetPassword.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      });
  },
});
interface State {
  user: any;
  data: any;
  isLoading: boolean;
  isVisible: boolean;
  status: string;
  title: string;
  formatDate: string;
  language: string;
  locale: any;
}

const clearTempLocalStorage = () => {
  const arr = [];
  for (let i = 0; i < localStorage.length; i++) {
    if (localStorage.key(i)?.indexOf('temp-') === 0) {
      arr.push(localStorage.key(i));
    }
  }
  for (let i = 0; i < arr.length; i++) {
    localStorage.removeItem(arr[i] || '');
  }
};