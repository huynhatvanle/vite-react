import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Product } from '@store/product';

const name = 'InventoryOrders';

const action = new Action<InventoryOrders>(name);

export const inventoryOrdersSlice = createSlice(new Slice<InventoryOrders>(action));

export const inventoryOrdersFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<InventoryOrders>),
        set: (values: State<InventoryOrders>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<InventoryOrders>) => dispatch(action.get(params)),
    };
};

export class InventoryOrders extends CommonEntity {
    constructor(
        public units?: {
          value?: string;
          name?: string;
          isDefault?: boolean
        },
        public id?: string,
        public iventory?: Product,
    ) {
        super();
    }
}

