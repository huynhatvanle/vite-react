import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'Orders';

const action = new Action<Orders>(name);

export const OrdersSlice = createSlice(new Slice<Orders>(action));

export const OrdersFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Orders>),
        set: (values: State<Orders>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Orders>) => dispatch(action.get(params)),
        getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Orders> }) =>
            dispatch(action.getById({ id, keyState })),
        post: (values: Orders) => dispatch(action.post(values)),
        put: (values: Orders) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class Orders extends CommonEntity {
    constructor(
        public id?: string,
        public code?: string,
        public confirmAt?: string,
        public createdAt?: string,
        public deliveredAt?: string,
        public total?: number,
    ) {
        super();
    }
}

