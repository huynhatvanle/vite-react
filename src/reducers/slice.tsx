import {createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@components';
import action from "./user/action";

export default class Slice {
  name: string;
  initialState: any;
  reducers: any;
  extraReducers: any;
  defaultState: State = {
    result: {},
    data: {},
    isLoading: false,
    isVisible: false,
    status: 'idle',
    queryParams: '',
    keepUnusedDataFor: 60,
    time: 0,
  };
  constructor(action: any, initialState: object = {}) {
    this.name = action.name
    this.initialState = {...this.defaultState, initialState}
    this.reducers = {
      setIsVisible: (state: State, action: PayloadAction<boolean | { isVisible: boolean; data: object }>) => {
        if (typeof action.payload === 'boolean') {
          state.isVisible = action.payload;
        } else {
          state.isVisible = action.payload.isVisible;
          state.data = action.payload.data;
        }
      },
      setQueryParams: (state: State, action: PayloadAction<{ queryParams: object }>) => {
        state.time = new Date().getTime() + (state.keepUnusedDataFor * 1000);
        state.queryParams = JSON.stringify(action.payload.queryParams);
      }
    };
    this.extraReducers = (builder: any) => {
      builder
        .addCase(action.get.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'get.pending';
        })
        .addCase(action.get.fulfilled, (state: State, action: PayloadAction<any[]>) => {
          state.result = action.payload;
          state.isLoading = false;
          state.status = 'get.fulfilled';
        })
        .addCase(action.get.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'get.rejected';
        })

        .addCase(action.getById.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'getById.pending';
        })
        .addCase(action.getById.fulfilled, (state: State, action: PayloadAction<any>) => {
          state.data = action.payload.data;
          state.isLoading = false;
          state.isVisible = true;
          state.status = 'getById.fulfilled';
        })
        .addCase(action.getById.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'getById.rejected';
        })

        .addCase(action.post.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'post.pending';
        })
        .addCase(action.post.fulfilled, (state: State, action: PayloadAction<any[]>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.isVisible = false;
          state.status = 'post.fulfilled';
        })
        .addCase(action.post.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'post.rejected';
        })

        .addCase(action.put.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'put.pending';
        })
        .addCase(action.put.fulfilled, (state: State, action: PayloadAction<any[]>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.isVisible = false;
          state.status = 'put.fulfilled';
        })
        .addCase(action.put.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'put.rejected';
        })

        .addCase(action.delete.pending, (state: State) => {
          state.isLoading = true;
          state.status = 'delete.pending';
        })
        .addCase(action.delete.fulfilled, (state: State, action: PayloadAction<any[]>) => {
          state.data = action.payload;
          state.isLoading = false;
          state.status = 'delete.fulfilled';
        })
        .addCase(action.delete.rejected, (state: State) => {
          state.isLoading = false;
          state.status = 'delete.rejected';
        });
    };
  }
}
interface State {
  result: any;
  data: any;
  isLoading: boolean;
  isVisible: boolean;
  status: string;
  queryParams: string;
  keepUnusedDataFor: number;
  time: number;
}
