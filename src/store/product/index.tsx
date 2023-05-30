import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'Product';

const action = new Action<Product>(name);

export const productSlice = createSlice(new Slice<Product>(action));

export const ProductFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Product>),
        set: (values: State<Product>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Product>) => dispatch(action.get(params)),
        getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Product> }) =>
            dispatch(action.getById({ id, keyState })),
        post: (values: Product) => dispatch(action.post(values)),
        put: (values: Product) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class Product extends CommonEntity {
    constructor(
        public id?: string,
        public code?: string,
        public barCode?: string,
        public name?: string,
        public description?: string,
        public brand?: string,
        public isOnlineBusinessWay?: boolean,
        public status?: string,
        public stockQuantity?: string,
        public supplierName?: string,
        public basicUnit?: string,
        public price?: number,
    ) {
        super();
    }
}

