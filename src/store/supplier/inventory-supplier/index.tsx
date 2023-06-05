import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InventorySupplier';

const action = {
  ...new Action<InventorySupplier>(name),
  getInventorySupplier: createAsyncThunk(
    name + '/get',
    async ({ id, keyState = 'isVisible' }: { id?: string; keyState: keyof State<InventorySupplier> }) => {
      let data = await API.get<InventorySupplier>(`${routerLinks(name, 'api')}/${id}`);
      return { data, keyState };
    },
  ),
};

export const InventorySupplierSlice = createSlice(new Slice<InventorySupplier>(action));

export const InventorySupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InventorySupplier>),
    set: (values: State<InventorySupplier>) => dispatch(action.set(values)),
    getById: ({ id, keyState = 'isVisible' }: { id?: string; keyState?: keyof State<InventorySupplier> }) =>
      dispatch(action.getInventorySupplier({ id, keyState })),
  };
};

export class InventorySupplier extends CommonEntity {
  constructor(public id?: string, public name?: string, public code?: string, public totalCommissionSupplier?: number) {
    super();
  }
}
