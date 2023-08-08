import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State, District, Province, Ward } from '@store';
import { API, routerLinks } from '@utils';
import { Message } from '@core/message';
import { buildErrorMessage } from 'vite';


const name = 'Confirm';
const action = {
  ...new Action<Confirm>(name),
  putConfirm: createAsyncThunk(name + '/putConfirm', async (values: Confirm) => {
    const { statusCode, message } = await API.put<Confirm>(`${routerLinks(name, 'api')}`, values);
    if (message) Message.success({ text: message });
    return statusCode;
  })
}
export const ConfirmSlice = createSlice(new Slice<Confirm>(action, {}, (builder) =>
  builder
      .addCase(
        action.putConfirm.pending,
        (
          state: State<Confirm>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'putConfirm.pending';
        },
      )
       .addCase(action.putConfirm.fulfilled, (state: State<Confirm>, action: any) => {
        if (action.payload.toString() === '200') {
          state.result = action.payload;
          state.status = 'putConfirm.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.putConfirm.rejected, (state: State) => {
        state.status = 'putConfirm.rejected';
        state.isLoading = false;
      })
));
export const ConfirmFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Confirm>),
    set: (values: State<Confirm>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Confirm>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Confirm> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Confirm) => dispatch(action.post(values)),
    put: (values: Confirm) => dispatch(action.putConfirm(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Confirm extends CommonEntity {
  constructor(
    public storeRequestId?: string
  ) {
    super();
  }
}

