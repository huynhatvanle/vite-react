import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, routerLinks } from '@utils';

const name = 'SupplierOrder';

const action = {
  ...new Action<SupplierOder>(name),
  getSupplierOrder: createAsyncThunk(
    name + '/getSupplierOrder',
    async ({ supplierType }: { supplierType: string }) => await API.get(routerLinks(name, 'api'), { supplierType }),
  ),
}

export const supplierOderSlice = createSlice(
  new Slice<SupplierOder>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getSupplierOrder.pending,
        (
          state: State<SupplierOder>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getSupplierOrder.pending';
        },
      )

      .addCase(action.getSupplierOrder.fulfilled, (state: State<SupplierOder>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getSupplierOrder.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getSupplierOrder.rejected, (state: State) => {
        state.status = 'getSupplierOrder.rejected';
        state.isLoading = false;
      })
  ),
);

export const SupplierOderFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<SupplierOder>),
    set: (values: State<SupplierOder>) => dispatch(action.set(values)),
    get: ({ supplierType }: { supplierType: string }) => dispatch(action.getSupplierOrder({ supplierType })),
  };
};

export class SupplierOder extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {
    super();
  }
}

