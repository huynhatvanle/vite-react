import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'InventoryOrder';

const action = {
    ...new Action<InventoryOrder>(name),
    // getByIdInventoryOrder: createAsyncThunk(name + '/getById',
    //     async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<InventoryOrder> }) => {
    //         let result = await API.get<InventoryOrder>(`${routerLinks(name, 'api')}/${id}`);
    //         // const InventoryOrderRate = parseFloat(result.data?.InventoryOrderRate || '');
    //         // result.data = { ...result.data, InventoryOrderRate }
    //         const data = result.data
    //         console.log(typeof data?.InventoryOrderRate)
    //         return { data, keyState };
    //     },
    // ),
    // putInventoryOrder: createAsyncThunk(name + '/put', async ({ id, ...values }: InventoryOrder) => {
    //     const { statusCode, message } = await API.put<InventoryOrder>(`${routerLinks(name, 'api')}/${id}`, values);
    //     if (message) Message.success({ text: message });
    //     return statusCode;
    // }),
    // postInventoryOrder: createAsyncThunk(name + '/post', async (values: InventoryOrder) => {
    //     const { message } = await API.post<InventoryOrder>(`${routerLinks(name, 'api')}`, values);
    //     if (message) Message.success({ text: message });
    //     return message;
    // }),
    // deleteInventoryOrder: createAsyncThunk(name + '/delete', async (id: string) => {
    //     const { statusCode, message } = await API.delete<InventoryOrder>(`${routerLinks(name, 'api')}/${id}`);
    //     if (message) Message.success({ text: message });
    //     return statusCode;
    // })
}

export const inventoryOrderSlice = createSlice(new Slice<InventoryOrder>(action));

export const InventoryOrderFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<InventoryOrder>),
        set: (values: State<InventoryOrder>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<InventoryOrder>) => dispatch(action.get(params)),
        getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<InventoryOrder> }) =>
            dispatch(action.getById({ id, keyState })),
        post: (values: InventoryOrder) => dispatch(action.post(values)),
        put: (values: InventoryOrder) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class InventoryOrder extends CommonEntity {
    constructor(
        public code?: string,
        public detailProduct?: DetailProduct[],
        public id?: string,
        public isApplyTax?: boolean,
        public issuedAt?: string,
        public order?: {},
        public reason?: string,
        public status?: string,
        public store?: {
            id?: string,
            name?: string,
            adsress?: {
                district?: string,
                province?: string,
                street?: string,
                ward?: string
            }
        },
        public storeReceived?: {
            adsress?: {
                district?: string,
                province?: string,
                street?: string,
                ward?: string
            }
        },
        public street?: string,
        public supplierType?: string,
        public total?: string,
        public type?: string,
        public url?: string
    ) {
        super();
    }
}

export class DetailProduct extends CommonEntity {
    constructor(
        public amount?: string,
        public barcode?: string,
        public code?: string,
        public id?: string,
        public idProduct?: string,
        public name?: string,
        public photo?: string,
        public price?: string,
        public quantity?: string,
        public storeBarcode?: string,
        public supplier?: {
            id?: string,
            name?: string,
        },
        public tax?: string,
        public unit?: string,
    ) {
        super();
    }
}