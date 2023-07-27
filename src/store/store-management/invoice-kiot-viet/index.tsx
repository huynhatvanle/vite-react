import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State, storeSlice } from '@store';

const name = 'Invoicekiotviet';

const action = {
  ...new Action<InvoiceKiotViet>(name),
  getInvoiceKiotViet: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      fullTextSearch,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      fullTextSearch: string;
      sorts: {};
      filter: {
        idStore?: string;
        supplierId?: string;
        status?: string;
        categoryId?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        dateFrom: string;
        dateTo: string;
      };
    }) => {
      const filterInvoiceKiotViet = JSON.parse(filter.toString() || '{}');
      const sortInvoice = sorts ? JSON.parse(sorts.toString() || '{}') : '';
      let data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page,
          perPage,
          fullTextSearch: fullTextSearch,
          idStore: filterInvoiceKiotViet.idStore,
          status: filterInvoiceKiotViet.status,
          supplierId: filterInvoiceKiotViet.supplierId,
          categoryId: filterInvoiceKiotViet.categoryId3
            ? filterInvoiceKiotViet.categoryId3
            : filterInvoiceKiotViet.categoryId2
            ? filterInvoiceKiotViet.categoryId2
            : filterInvoiceKiotViet.categoryId1
            ? filterInvoiceKiotViet.categoryId1
            : null,
          categoryId1: filterInvoiceKiotViet.categoryId1,
          categoryId2: filterInvoiceKiotViet.categoryId2,
          categoryId3: filterInvoiceKiotViet.categoryId3,
          filter: {
            dateFrom: filterInvoiceKiotViet.dateFrom ? filterInvoiceKiotViet.dateFrom : '',
            dateTo: filterInvoiceKiotViet.dateTo ? filterInvoiceKiotViet.dateTo : '',
          },
          sort: {
            index: sortInvoice.supplier,
            productCode: sortInvoice.supplier1,
            productName: sortInvoice.supplier2,
            barcode: sortInvoice.supplier3s,
          },
        }),
      );
      data.data = Object.entries(data.data as Object)[0]?.[1];
      return data;
    },
  ),
};

export const invoiceKiotVietSlice = createSlice(
  new Slice<InvoiceKiotViet>(action, (builder: any) => {
    builder
      .addCase(
        action.getInvoiceKiotViet.pending,
        (
          state: State<InvoiceKiotViet>,
          action: PayloadAction<
            undefined,
            string,
            { arg: InvoiceKiotViet; requestId: string; requestStatus: 'pending' }
          >,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get.pending';
        },
      )
      .addCase(
        action.getInvoiceKiotViet.fulfilled,
        (state: State<InvoiceKiotViet>, action: PayloadAction<InvoiceKiotViet>) => {
          console.log(action.payload);
          if (action.payload) {
            state.data = action.payload;
            state.status = 'get.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        },
      );
  }),
);

export const InvoiceKiotVietFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InvoiceKiotViet>),
    set: (values: State<InvoiceKiotViet>) => dispatch(action.set(values)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<InvoiceKiotViet> }) =>
      dispatch(action.getById({ id, keyState })),
    get: ({
      page,
      perPage,
      fullTextSearch,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      sorts: {};
      fullTextSearch: string;
      filter: {
        idStore?: string;
        supplierId?: string;
        status?: string;
        categoryId?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        dateFrom: string;
        dateTo: string;
      };
    }) => dispatch(action.getInvoiceKiotViet({ page, perPage, fullTextSearch, filter, sorts })),
  };
};

export class InvoiceKiotViet extends CommonEntity {
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
    public productCode?: string,
    public productName?: string,
    public barcode?: string,
    public supplierName?: string,
    public revenue?: string,
    public status?: string,
  ) {
    super();
  }
}
