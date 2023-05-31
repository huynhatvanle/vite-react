import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Product';

const action = {
  ...new Action<Product>(name),
  getProduct: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
    }: {
      page: number;
      perPage: number;
      filter: { storeId?: string; type: string; supplierId?: string; categoryId?: string };
    }) => {
      // console.log(filter.toString().slice(filter.toString().indexOf(':') + 2,filter.toString().lastIndexOf('"')))
      // console.log(filter.toString().JSON.)
      const filterProduct = JSON.parse(filter.toString() || '{}');
      // console.log(filter1)
      const data = await API.get(routerLinks(name, 'api'), {
        page,
        perPage,
        storeId: filterProduct.storeId,
        type: filterProduct.type,
        supplierId: filterProduct.supplierId,
        categoryId: filterProduct.categoryId,
      });
      return data;
    },
  ),
};

export const productSlice = createSlice(new Slice<Product>(action));

export const ProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Product>),
    set: (values: State<Product>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<Product>) => dispatch(action.get(params)),
    get: ({
      page,
      perPage,
      filter,
    }: {
      page: number;
      perPage: number;
      filter: { supplierId?: string; storeId?: string; type: string; categoryId: string };
    }) => {
      return dispatch(action.getProduct({ page, perPage, filter }));
    },
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
