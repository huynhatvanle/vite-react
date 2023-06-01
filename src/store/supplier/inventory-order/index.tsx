import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';

const name = 'InventoryOrders';

const action = {
  ...new Action<InventoryOrders>(name),
  getOrder: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { idSupplier?: string; filterDate?: any };
      fullTextSearch: string;
    }) => {
      const filterInven = JSON.parse(filter.toString() || '{}');
      const data = await API.get(routerLinks(name, 'api'), {
        page,
        perPage,
        idSupplier: filterInven.idSupplier,
        filterDate: filterInven.filterDate,
        fullTextSearch: fullTextSearch,
      });
      return data;
    },
  ),
};

export const inventoryOrdersSlice = createSlice(new Slice<InventoryOrders>(action));

export const inventoryOrdersFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InventoryOrders>),
    set: (values: State<InventoryOrders>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { idSupplier?: string; filterDate?: any };
      fullTextSearch: string;
    }) => dispatch(action.getOrder({ page, perPage, filter, fullTextSearch })),
  };
};

export class InventoryOrders extends CommonEntity {
  constructor(
    public units?: {
      value?: string;
      name?: string;
      isDefault?: boolean;
    },
    public id?: string,
    public iventory?: Product,
  ) {
    super();
  }
}
