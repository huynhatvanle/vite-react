import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'ConnectSupplier';

const action = {
  ...new Action<StoreConnectSupplier>(name),
  getStoreConnectSupplier: createAsyncThunk(
    name + '/getStoreConnectSupplier',
    async ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch?: string, filter: { idSuppiler?: string, supplierType?: string } }) => {
      const filterStoreConnectSupplier = typeof filter != 'object' ? JSON.parse(filter || '{}') : filter
      const data = await API.get(routerLinks(name, 'api'), cleanObjectKeyNull({
        page,
        perPage,
        idSuppiler: filterStoreConnectSupplier.idSuppiler,
        supplierType: filterStoreConnectSupplier.supplierType,
        fullTextSearch
      }))
      return data
    }
  ),
}

export const connectSupplierSlice = createSlice(
  new Slice<StoreConnectSupplier>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getStoreConnectSupplier.pending,
        (
          state: State<StoreConnectSupplier>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getStoreConnectSupplier.pending';
        },
      )
      .addCase(action.getStoreConnectSupplier.fulfilled, (state: State<StoreConnectSupplier>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getStoreConnectSupplier.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getStoreConnectSupplier.rejected, (state: State) => {
        state.status = 'getStoreConnectSupplier.rejected';
        state.isLoading = false;
      })
  )
);

export const ConnectSupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<StoreConnectSupplier>),
    set: (values: State<StoreConnectSupplier>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<StoreConnectSupplier>) => dispatch(action.get(params)),
    get: ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch?: string, filter: { idSuppiler?: string, supplierType?: string } }) => dispatch(action.getStoreConnectSupplier({ page, perPage, filter, fullTextSearch })),
  };
};

export class StoreConnectSupplier extends CommonEntity {
  constructor(
    public id?: string,
    public supplier?: {
      id: string,
      code: string,
      fax: string,
      name: string,
      address: {}
    },
  ) {
    super();
  }
}

