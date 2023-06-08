import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { CommonEntity } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InvoiceRevenue';

const action = {
    ...new Action<InvoiceRevenue>(name),
    getInvoiceRevenue: createAsyncThunk(
        name + '/get',
        async ({ page, perPage, fullTextSearch, filter }: {
            page: number,
            perPage: number,
            fullTextSearch: string,
            filter: { idStore?: string, supplierId?: string, status?: string, dateFrom: string, dateTo: string }
        }) => {
            const filterInvoiceKiotViet = JSON.parse(filter.toString() || '{}')
            let data = await API.get(routerLinks(name, 'api'), {
                page,
                perPage,
                fullTextSearch: fullTextSearch ? fullTextSearch : '',
                idStore: filterInvoiceKiotViet.idStore,
                status: filterInvoiceKiotViet.status ? filterInvoiceKiotViet.status : '',
                supplierId: filterInvoiceKiotViet.supplierId ? filterInvoiceKiotViet.supplierId : '',
                filter: { dateFrom: filterInvoiceKiotViet.dateFrom ? filterInvoiceKiotViet.dateFrom : '', dateTo: filterInvoiceKiotViet.dateTo ? filterInvoiceKiotViet.dateTo : '' }
            });
            data.data = Object.entries(data.data as Object)[0]?.[1]
            return data;
        }
    )
}

export const invoiceRevenueSlice = createSlice(new Slice<InvoiceRevenue>(action, (builder: any) => {
    builder
        .addCase(
            action.getInvoiceRevenue.pending,
            (
                state: State<InvoiceRevenue>,
                action: PayloadAction<undefined, string, { arg: InvoiceRevenue; requestId: string; requestStatus: 'pending' }>,
            ) => {
                state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
                state.queryParams = JSON.stringify(action.meta.arg);
                state.isLoading = true;
                state.status = 'get.pending';
            },
        )
        .addCase(action.getInvoiceRevenue.fulfilled, (state: State<InvoiceRevenue>, action: PayloadAction<InvoiceRevenue>) => {
            console.log(action.payload)
            if (action.payload) {
                state.data = action.payload;
                state.status = 'get.fulfilled';
            } else state.status = 'idle';
            state.isLoading = false;
        })
}));

export const InvoiceRevenueFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<InvoiceRevenue>),
        set: (values: State<InvoiceRevenue>) => dispatch(action.set(values)),
        // get: (params: PaginationQuery<InvoiceKiotViet>) => dispatch(action.getInvoiceKiotViet(params)),
        get: ({ page, perPage, fullTextSearch, filter }: { page: number, perPage: number, fullTextSearch: string, filter: { idStore?: string, supplierId: string, status: string, dateFrom: string, dateTo: string } }) => dispatch(action.getInvoiceRevenue({ page, perPage, fullTextSearch, filter })),
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
    ) {
        super();
    }
}

