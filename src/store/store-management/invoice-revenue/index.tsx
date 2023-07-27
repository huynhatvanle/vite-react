import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InvoiceRevenue';

const action = {
  ...new Action<InvoiceRevenue>(name),
  getInvoiceRevenue: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      fullTextSearch,
      filter,
    }: {
      page: number;
      perPage: number;
      fullTextSearch?: string;
      filter: {
        idStore?: string;
        supplierId?: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
        type?: string;
      };
    }) => {
      const filterInvoiceKiotViet = JSON.parse(filter.toString() || '{}');
      let data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page,
          perPage,
          fullTextSearch: fullTextSearch,
          idStore: filterInvoiceKiotViet.idStore,
          status: filterInvoiceKiotViet.status,
          supplierId: filterInvoiceKiotViet.supplierId,
          type: filterInvoiceKiotViet.type,
          filter: {
            dateFrom: filterInvoiceKiotViet.dateFrom ? filterInvoiceKiotViet.dateFrom : '',
            dateTo: filterInvoiceKiotViet.dateTo ? filterInvoiceKiotViet.dateTo : '',
          },
        }),
      );
      data.data = Object.entries(data.data as Object)[0]?.[1];
      return data;
    },
  ),
};

export const invoiceRevenueSlice = createSlice(
  new Slice<InvoiceRevenue>(action, (builder: any) => {
    builder
      .addCase(
        action.getInvoiceRevenue.pending,
        (
          state: State<InvoiceRevenue>,
          action: PayloadAction<
            undefined,
            string,
            { arg: InvoiceRevenue; requestId: string; requestStatus: 'pending' }
          >,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getStoreOrder.pending';
        },
      )
      .addCase(
        action.getInvoiceRevenue.fulfilled,
        (state: State<InvoiceRevenue>, action: PayloadAction<InvoiceRevenue>) => {
          console.log(action.payload);
          if (action.payload) {
            state.data = action.payload;
            state.status = 'getStoreOrder.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        },
      );
  }),
);

export const InvoiceRevenueFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InvoiceRevenue>),
    set: (keyState: State<InvoiceRevenue>) => dispatch(action.set(keyState)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<InvoiceRevenue> }) =>
      dispatch(action.getById({ id, keyState })),
    get: ({
      page,
      perPage,
      fullTextSearch,
      filter,
    }: {
      page: number;
      perPage: number;
      fullTextSearch?: string;
      filter: {
        idStore?: string;
        supplierId?: string;
        status?: string;
        dateFrom?: string;
        dateTo?: string;
        type?: string;
      };
    }) => dispatch(action.getInvoiceRevenue({ page, perPage, fullTextSearch, filter })),
  };
};

export class InvoiceRevenue extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public code?: string,
    public isActive?: boolean,
    public isParent?: boolean,
    public createdById?: string,
    public orgId?: string,
    public isKiotViet?: boolean,
    public categoryKiotId?: string,
    public parentId?: string,
    public invoiceCode?: string,
    public completedDate?: string,
    public total?: string,
    public discount?: string,
    public revenue?: string,
    public type?: string,
  ) {
    super();
  }
}
