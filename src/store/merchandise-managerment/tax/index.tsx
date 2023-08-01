import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'Tax';

const action = {
    ...new Action<Tax>(name),
    // getByIdTax: createAsyncThunk(name + '/getById',
    //     async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Tax> }) => {
    //         let result = await API.get<Tax>(`${routerLinks(name, 'api')}/${id}`);
    //         // const taxRate = parseFloat(result.data?.taxRate || '');
    //         // result.data = { ...result.data, taxRate }
    //         const data = result.data
    //         console.log(typeof data?.taxRate)
    //         return { data, keyState };
    //     },
    // ),
    putTax: createAsyncThunk(name + '/put', async ({ id, ...values }: Tax) => {
        const { statusCode, message } = await API.put<Tax>(`${routerLinks(name, 'api')}/${id}`, values);
        if (message) Message.success({ text: message });
        return statusCode;
    }),
    postTax: createAsyncThunk(name + '/post', async (values: Tax) => {
        const { message } = await API.post<Tax>(`${routerLinks(name, 'api')}`, values);
        if (message) Message.success({ text: message });
        return message;
    }),
    deleteTax: createAsyncThunk(name + '/delete', async (id: string) => {
        const { statusCode, message } = await API.delete<Tax>(`${routerLinks(name, 'api')}/${id}`);
        if (message) Message.success({ text: message });
        return statusCode;
    })
}

export const taxSlice = createSlice(new Slice<Tax>(action, (builder: any) =>
    builder
        .addCase(
            action.putTax.pending,
            (
                state: State<Tax>,
                action: PayloadAction<
                    undefined,
                    string,
                    { arg: Tax; requestId: string; requestStatus: 'pending' }
                >,
            ) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = 'putTax.pending';
            },
        )
        .addCase(action.putTax.fulfilled, (state: State<Tax>, action: PayloadAction<Tax>) => {
            if (action.payload.toString() === '200') {
                state.isVisible = false;
                state.status = 'putTax.fulfilled';
            } else state.status = 'idle';
            state.isLoading = false;
        })
        .addCase(
            action.postTax.pending,
            (
                state: State<Tax>,
                action: PayloadAction<
                    undefined,
                    string,
                    { arg: Tax; requestId: string; requestStatus: 'pending' }
                >,
            ) => {
                state.data = action.meta.arg;
                state.isLoading = true;
                state.status = 'postTax.pending';
            },
        )
        .addCase(action.postTax.fulfilled, (state: State<Tax>, action: PayloadAction<Tax>) => {
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
        ...(useTypedSelector((state) => state[action.name]) as State<Tax>),
        set: (values: State<Tax>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Tax>) => dispatch(action.get(params)),
        getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Tax> }) =>
            dispatch(action.getById({ id, keyState })),
        post: (values: Tax) => dispatch(action.postTax(values)),
        put: (values: Tax) => dispatch(action.putTax(values)),
        delete: (id: string) => dispatch(action.deleteTax(id)),
    };
};

export class Tax extends CommonEntity {
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
