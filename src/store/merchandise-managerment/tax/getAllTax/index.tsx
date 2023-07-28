import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'TaxAdmin';

const action = {
  ...new Action<TaxAdmin>(name),
  putTax: createAsyncThunk(name + '/put', async ({ id, ...values }: TaxAdmin) => {
    const { statusCode, message } = await API.put<TaxAdmin>(`${routerLinks(name, 'api')}/${id}`, values);
    if (message) Message.success({ text: message });
    return statusCode;
  }),
  postTax: createAsyncThunk(name + '/post', async (values: TaxAdmin) => {
    const { message } = await API.post<TaxAdmin>(`${routerLinks(name, 'api')}`, values);
    if (message) Message.success({ text: message });
    return message;
  }),
}

export const taxSlice = createSlice(new Slice<TaxAdmin>(action, (builder: any) =>
  builder
    .addCase(
      action.putTax.pending,
      (
        state: State<TaxAdmin>,
        action: PayloadAction<
          undefined,
          string,
          { arg: TaxAdmin; requestId: string; requestStatus: 'pending' }
        >,
      ) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'putTax.pending';
      },
    )
    .addCase(action.putTax.fulfilled, (state: State<TaxAdmin>, action: PayloadAction<TaxAdmin>) => {
      if (action.payload.toString() === '200') {
        state.isVisible = false;
        state.status = 'putTax.fulfilled';
      } else state.status = 'idle';
      state.isLoading = false;
    })
    .addCase(
      action.postTax.pending,
      (
        state: State<TaxAdmin>,
        action: PayloadAction<
          undefined,
          string,
          { arg: TaxAdmin; requestId: string; requestStatus: 'pending' }
        >,
      ) => {
        state.data = action.meta.arg;
        state.isLoading = true;
        state.status = 'postTax.pending';
      },
    )
    .addCase(action.postTax.fulfilled, (state: State<TaxAdmin>, action: PayloadAction<TaxAdmin>) => {
      console.log('dsd')
      if (action.payload.toString() === 'Lưu thuế thành công.') {
        state.isVisible = false;
        state.status = 'postTax.fulfilled';
      } else state.status = 'idle';
      state.isLoading = false;
    })
));

export const TaxFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<TaxAdmin>),
    set: (values: State<TaxAdmin>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<TaxAdmin>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<TaxAdmin> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: TaxAdmin) => dispatch(action.postTax(values)),
    put: (values: TaxAdmin) => dispatch(action.putTax(values)),
    delete: (id: string) => dispatch(action.deleteTax(id)),
  };
};

export class TaxAdmin extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public typeTax?: string,
    public descripton?: string,
    public orgId?: string,
    public taxRate?: number
  ) {
    super();
  }
}
