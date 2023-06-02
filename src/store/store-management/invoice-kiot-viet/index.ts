import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';



const name = 'Invoicekiotviet';

const action = {
    ...new Action<InvoiceKiotViet>(name),
    getInvoiceKiotViet: createAsyncThunk(
        name + '/get',
        async ({page, perPage, filter} : {page: number, perPage: number, filter: {idStore?: string}}) => {
          const filterInvoiceKiotViet = JSON.parse( filter.toString() || '{}' )
          let  data  = await API.get(routerLinks(name, 'api'), {page, perPage, idStore: filterInvoiceKiotViet.idStore});
          data.data = Object.entries(data.data as Object)[0]?.[1]
          return data.data;
        }
      )
}

export const invoiceKiotVietSlice = createSlice(new Slice<InvoiceKiotViet>(action, (builder: any) => {
    builder
    .addCase(
        action.getInvoiceKiotViet.pending,
        (
          state: State<InvoiceKiotViet>,
          action: PayloadAction<undefined, string, { arg: InvoiceKiotViet; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get.pending';
        },
      )
      .addCase(action.getInvoiceKiotViet.fulfilled, (state: State<InvoiceKiotViet>, action: PayloadAction<InvoiceKiotViet>) => {
        console.log(action.payload)
        if (action.payload) {
          state.data = action.payload;
          state.status = 'get.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
}));

export const InvoiceKiotVietFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<InvoiceKiotViet>),
        set: (values: State<InvoiceKiotViet>) => dispatch(action.set(values)),
        // get: (params: PaginationQuery<InvoiceKiotViet>) => dispatch(action.getInvoiceKiotViet(params)),
        get: ({page, perPage, filter} : {page: number, perPage: number, filter: {idStore?: string}}) => dispatch(action.getInvoiceKiotViet({page,perPage,filter})),
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
    ) {
        super();
    }
}

