import { PayloadAction } from '@reduxjs/toolkit';
import { CommonEntity, Responses } from '@models';
import { Action } from '@store';
export class Slice<T extends CommonEntity> {
  name: string;
  initialState: State<T>;
  reducers: any;
  extraReducers: (builder: any) => void;
  defaultState: State<T> = {
    result: {},
    data: undefined,
    isLoading: false,
    isVisible: false,
    status: 'idle',
    queryParams: '',
    keepUnusedDataFor: 60,
    time: 0,
  };
  constructor(
    action: Action<T>,
    initialState: State<T> = {},
    // extraReducers?: (builder: ActionReducerMapBuilder<State<T>>) => void,
    extraReducers?: (builder: any) => void,
  ) {
    this.name = action.name;
    this.initialState = { ...this.defaultState, ...initialState };
    this.reducers = {};
    this.extraReducers = (builder: any) => {
      builder
        .addCase(action.set.fulfilled, (state: State<T>, action: PayloadAction<State<T>>) => {
          Object.keys(action.payload).forEach((key) => {
            state[key] = action.payload[key as keyof State<T>];
          });
          state.status = 'idle';
        })
        .addCase(
          action.get.pending,
          (
            state: State<T>,
            action: PayloadAction<undefined, string, { arg: T; requestId: string; requestStatus: 'pending' }>,
          ) => {
            state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
            state.queryParams = JSON.stringify(action.meta.arg);
            state.isLoading = true;
            state.status = 'get.pending';
          },
        )
        .addCase(action.get.fulfilled, (state: State<T>, action: PayloadAction<Responses<T[]>>) => {
          if (action.payload.data) {
            state.result = action.payload;
            state.status = 'get.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })
        .addCase(action.get.rejected, (state: State) => {
          state.status = 'get.rejected';
          state.isLoading = false;
        })

        .addCase(action.getById.pending, (state: State<T>) => {
          state.isLoading = true;
          state.status = 'getById.pending';
        })
        .addCase(
          action.getById.fulfilled,
          (state: State<T>, action: PayloadAction<{ data: T; keyState: keyof State<T> }>) => {
            if (action.payload) {
              const { data, keyState } = action.payload;
              if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
              // @ts-ignore
              state[keyState] = true;
              state.status = 'getById.fulfilled';
            } else state.status = 'idle';
            state.isLoading = false;
          },
        )
        .addCase(action.getById.rejected, (state: State) => {
          state.status = 'getById.rejected';
          state.isLoading = false;
        })

        .addCase(
          action.post.pending,
          (
            state: State<T>,
            action: PayloadAction<undefined, string, { arg: T; requestId: string; requestStatus: 'pending' }>,
          ) => {
            state.data = action.meta.arg;
            state.isLoading = true;
            state.status = 'post.pending';
          },
        )
        .addCase(action.post.fulfilled, (state: State<T>, action: PayloadAction<T>) => {
          if (action.payload) {
            if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) state.data = action.payload;
            state.isVisible = false;
            state.status = 'post.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })
        .addCase(action.post.rejected, (state: State) => {
          state.status = 'post.rejected';
          state.isLoading = false;
        })

        .addCase(
          action.put.pending,
          (
            state: State<T>,
            action: PayloadAction<undefined, string, { arg: T; requestId: string; requestStatus: 'pending' }>,
          ) => {
            state.data = action.meta.arg;
            state.isLoading = true;
            state.status = 'put.pending';
          },
        )
        .addCase(action.put.fulfilled, (state: State<T>, action: PayloadAction<T>) => {
          if (action.payload) {
            if (JSON.stringify(state.data) !== JSON.stringify(action.payload)) state.data = action.payload;
            state.isVisible = false;
            state.status = 'put.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        })
        .addCase(action.put.rejected, (state: State) => {
          state.status = 'put.rejected';
          state.isLoading = false;
        })

        .addCase(action.putDisable.pending, (state: State<T>) => {
          state.isLoading = true;
          state.status = 'putDisable.pending';
        })
        .addCase(action.putDisable.fulfilled, (state: State<T>, action: PayloadAction<T>) => {
          state.isVisible = false;
          state.status = action.payload ? 'putDisable.fulfilled' : 'idle';
          state.isLoading = false;
        })
        .addCase(action.putDisable.rejected, (state: State) => {
          state.status = 'putDisable.rejected';
          state.isLoading = false;
        })

        .addCase(action.delete.pending, (state: State<T>) => {
          state.isLoading = true;
          state.status = 'delete.pending';
        })
        .addCase(action.delete.fulfilled, (state: State<T>, action: PayloadAction<T>) => {
          if (action.payload) state.status = 'delete.fulfilled';
          else state.status = 'idle';
          state.isLoading = false;
        })
        .addCase(action.delete.rejected, (state: State) => {
          state.status = 'delete.rejected';
          state.isLoading = false;
        });
      extraReducers && extraReducers(builder);
    };
  }
}
export interface State<T = object> {
  [selector: string]: any;
  result?: Responses<T[]>;
  data?: T;
  isLoading?: boolean;
  isVisible?: boolean;
  status?: string;
  queryParams?: string;
  keepUnusedDataFor?: number;
  time?: number;
}
