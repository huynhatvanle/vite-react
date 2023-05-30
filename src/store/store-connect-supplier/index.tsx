import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Supplier } from '@store/supplier';

const name = 'ConnectSupplier';

const action = new Action<StoreConnectSupplier>(name);

export const connectSupplierSlice = createSlice(new Slice<StoreConnectSupplier>(action));

export const ConnectSupplierFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<StoreConnectSupplier>),
        set: (values: State<StoreConnectSupplier>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<StoreConnectSupplier>) => dispatch(action.get(params)),
    };
};

export class StoreConnectSupplier extends CommonEntity {
    constructor(
        public id?: string,
        public supplier?: Supplier,
    ) {
        super();
    }
}

