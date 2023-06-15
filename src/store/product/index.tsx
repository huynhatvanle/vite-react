import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

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
      filter: {
        storeId?: string;
        type: string;
        supplierId?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
      };
    }) => {
      const filterProduct = JSON.parse(filter.toString() || '{}');
      const data = await API.get(routerLinks(name, 'api'), {
        page,
        perPage,
        storeId: filterProduct.storeId,
        type: filterProduct.type ? filterProduct.type : '',
        supplierId: filterProduct.supplierId ? filterProduct.supplierId : '',
        categoryId: filterProduct.categoryId3
          ? filterProduct.categoryId3
          : filterProduct.categoryId2
          ? filterProduct.categoryId2
          : filterProduct.categoryId1
          ? filterProduct.categoryId1
          : '',
        categoryId1: filterProduct.categoryId1 ? filterProduct.categoryId1 : '',
        categoryId2: filterProduct.categoryId2 ? filterProduct.categoryId2 : '',
        categoryId3: filterProduct.categoryId3 ? filterProduct.categoryId3 : '',
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
      filter: {
        supplierId?: string;
        storeId?: string;
        type: string;
        categoryId1: string;
        categoryId2: string;
        categoryId3: string;
      };
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
    public barcode?: string,
    public name?: string,
    public description?: string,
    public brand?: string,
    public isOnlineBusinessWay?: boolean,
    public status?: string,
    public stockQuantity?: string,
    public supplierName?: string,
    public basicUnit?: string,
    public productPrice?: {
      0: {
        price: string;
      };
    },
    public approveStatus?: string,
    public category?: {
      child?: {
        child?: {
          id?: string;
          name?: string;
        };
        id?: string;
        name?: string;
      };
      id?: string;
      name?: string;
    },
    public photos?: {
      0: {
        isCover: boolean;
        url: string;
      };
    },
  ) {
    super();
  }
}
