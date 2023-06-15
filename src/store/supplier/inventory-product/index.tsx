import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InventoryListProduct';

const action = {
  ...new Action<InventoryListProduct>(name),
  getProduct: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: {
        idSupplier?: string;
        categoryId?: string;
        filterDate?: { dateFrom?: string; dateTo?: string };
        idStore?: string;
        status?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
      };
      fullTextSearch: string;
    }) => {
      const filterProduct = JSON.parse(filter.toString() || '{}');

      const data = await API.get(routerLinks(name, 'api'), {
        page,
        perPage,
        idSupplier: filterProduct.idSupplier,
        categoryId: filterProduct.categoryId3
          ? filterProduct.categoryId3
          : filterProduct.categoryId2
          ? filterProduct.categoryId2
          : filterProduct.categoryId1
          ? filterProduct.categoryId1
          : '',
        idStore: filterProduct.idStore,
        status: filterProduct.status,
        categoryId1: filterProduct.categoryId1,
        categoryId2: filterProduct.categoryId2,
        categoryId3: filterProduct.categoryId3,
        fullTextSearch: fullTextSearch,
        filterDate: { dateFrom: filterProduct.filterDate.dateFrom, dateTo: filterProduct.filterDate.dateTo },
      });

      return data;
    },
  ),
};

export const inventoryListProductSlice = createSlice(new Slice<InventoryListProduct>(action));

export const InventoryListProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InventoryListProduct>),
    set: (values: State<InventoryListProduct>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: {
        idSupplier?: string;
        filterDate?: any;
        idStore?: string;
        status?: string;
        categoryId?: string;
        categoryId1: string;
        categoryId2: string;
        categoryId3: string;
      };
      fullTextSearch: string;
    }) => dispatch(action.getProduct({ page, perPage, filter, fullTextSearch })),
  };
};

export class InventoryListProduct extends CommonEntity {
  constructor(
    public productCode?: string,
    public productName?: string,
    public barcode?: string,
    public subTotal?: string,
    public total?: string,
    public status?: string,
  ) {
    super();
  }
}
