import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { Product } from '@store/product';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InventoryOrders';

const action = {
  ...new Action<InventoryOrders>(name),
  getOrder: createAsyncThunk(
    name + '/getOrder',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: {
        idSupplier?: string;
        filterDate?: { dateFrom?: string; dateTo?: string };
        idStore?: string;
        type?: string;
      };
      fullTextSearch: string;
    }) => {
      const filterInven = JSON.parse(filter.toString() || '{}');
      const data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page,
          perPage,
          idSupplier: filterInven.idSupplier,
          idStore: filterInven.idStore,
          type: filterInven.type,
          fullTextSearch: fullTextSearch,
          filterDate: { dateFrom: filterInven.filterDate.dateFrom, dateTo: filterInven.filterDate.dateTo },
        }),
      );

      return data;
    },
  ),
};

export const inventoryOrdersSlice = createSlice(
  new Slice<InventoryOrders>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getOrder.pending,
        (
          state: State<InventoryOrders>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getOrder.pending';
        },
      )
      .addCase(action.getOrder.fulfilled, (state: State<InventoryOrders>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getOrder.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getOrder.rejected, (state: State) => {
        state.status = 'getOrder.rejected';
        state.isLoading = false;
      }),
  ),
);

export const inventoryOrdersFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InventoryOrders>),
    set: (values: State<InventoryOrders>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { idSupplier?: string; filterDate?: any; idStore?: string; type?: string };
      fullTextSearch: string;
    }) => dispatch(action.getOrder({ page, perPage, filter, fullTextSearch })),
  };
};

export class InventoryOrders extends CommonEntity {
  constructor(
    public billType?: string,
    public invoiceCode?: string,
    public subTotal?: string,
    public storeName?: string,
    public pickUpDate?: string,
    public completedDate?: string,
    public total?: string,
    public voucherAmount?: string,
  ) {
    super();
  }
}
