import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';

const name = 'SupplierStore';

const action = {
  ...new Action<SupplierStore>(name),
  getAll: createAsyncThunk(
    name + '/getAll',
    async ({ type, storeId }: { type: string, storeId?: string }) => await API.get(routerLinks(name, 'api'), { type, storeId }),
  ),
}

export const supplierStoreSlice = createSlice(
  new Slice<SupplierStore>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getAll.pending,
        (
          state: State<SupplierStore>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getAll.pending';
        },
      )

      .addCase(action.getAll.fulfilled, (state: State<SupplierStore>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getAll.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getAll.rejected, (state: State) => {
        state.status = 'getAll.rejected';
        state.isLoading = false;
      })
  ),
);

export const SupplierStoreFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<SupplierStore>),
    set: (values: State<SupplierStore>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<SupplierStore>) => dispatch(action.get(params)),
    get: ({ type, storeId }: { type: string, storeId?: string }) => dispatch(action.getAll({ type, storeId })),
  };
};

export class SupplierStore extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {
    super();
  }
}

