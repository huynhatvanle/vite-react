import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';

const name = 'Supplieradmin';

const action = {
  ...new Action<SupplierAdmin>(name),
  getAll: createAsyncThunk(
    name + '/getAll',
    async ({ type, approveStatus }: { type: string, approveStatus?: string }) => await API.get(routerLinks(name, 'api'), { type, approveStatus }),
  ),
}

export const supplierAdminSlice = createSlice(
  new Slice<SupplierAdmin>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getAll.pending,
        (
          state: State<SupplierAdmin>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getAll.pending';
        },
      )

      .addCase(action.getAll.fulfilled, (state: State<SupplierAdmin>, action: any) => {
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

export const SupplierAdminFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<SupplierAdmin>),
    set: (values: State<SupplierAdmin>) => dispatch(action.set(values)),
    get: ({ type, approveStatus }: { type: string, approveStatus?: string }) => dispatch(action.getAll({ type, approveStatus })),
  };
};

export class SupplierAdmin extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {
    super();
  }
}

