import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'documentsuborganiztion';

const action = {
  ...new Action<Documentsub>(name),
  getSub: createAsyncThunk(name + '/get', async ({ id }: { id?: string }) => {
    let data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);
    return data;
  }),
  getByIdSub: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Documentsub> }) => {
      const data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);
      return { data, keyState };
    },
  ),
  putSub: createAsyncThunk(name + '/putSub', async ({ id }: Documentsub) => {
    const status = 'SIGNED_CONTRACT';
    const { statusCode, message } = await API.put<Documentsub>(`${routerLinks(name, 'api')}/${id}`, {
      status: 'SIGNED_CONTRACT',
    });
    if (message) await Message.success({ text: message });
    return statusCode;
  }),
  uploadSub: createAsyncThunk(name + '/uploadSub', async (values: Documentsub) => {
    const { data, message } = await API.put<Documentsub>(`/file-doc-contract`, { ...values });
    if (message) await Message.success({ text: message });
    return data || {};
  }),
};

export const documentsubSlice = createSlice(
  new Slice<Documentsub>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.putSub.pending,
        (
          state: State<Documentsub>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'putSub.pending';
        },
      )

      .addCase(action.putSub.fulfilled, (state: State<Documentsub>, action: any) => {
        if (action.payload) {
          state.result = action.payload;
          state.status = 'putSub.fulfilled';
          console.log(state.status);
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.putSub.rejected, (state: State) => {
        state.status = 'putSub.rejected';
        state.isLoading = false;
      }),
  ),
);

export const DocumentsubFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Documentsub>),
    set: (values: State<Documentsub>) => dispatch(action.set(values)),
    get: ({ id }: { id?: string }) => dispatch(action.getSub({ id })),
    putSub: (values: Documentsub) => dispatch(action.putSub(values)),
    uploadSub: (values: Documentsub) => dispatch(action.uploadSub(values)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Documentsub> }) =>
      dispatch(action.getByIdSub({ id, keyState })),
  };
};

export class Documentsub extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public code?: string,
    public subOrgId?: string,
    public docSubOrgId?: string,
    public files?: string,
    public filePhoto?: {
      length: string;
      0: {
        url: string;
      };
    },
    public totalCommissionSupplier?: number,
  ) {
    super();
  }
}
