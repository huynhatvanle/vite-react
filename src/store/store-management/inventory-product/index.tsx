import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';
import { Category } from '../../category/index';

const name = 'InventoryProduct';

export const action = {
  ...new Action<IventoryProduct>(name),
  getInventoryProduct: createAsyncThunk(
    name + '/get',
    async (params: PaginationQuery<IventoryProduct>) => {
      const { data } = await API.get(routerLinks(name, 'api'), params);
      console.log(data)
      console.log((data as any).inventory[0])
      return (data as any).inventory[0];
    }
  )
}
export const inventoryProductSlice = createSlice(
  new Slice<IventoryProduct>(action, (builder: any) => {
    builder
      .addCase(
        action.getInventoryProduct.pending,
        (
          state: State<IventoryProduct>,
          action: PayloadAction<undefined, string, { arg: IventoryProduct; requestId: string; requestStatus: 'pending' }>,
        ) => {
          console.log(state.status)
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get.pending';
        },
      )
      // .addCase(action.getInventoryProduct.fulfilled, (state: State<IventoryProduct>, action: PayloadAction<{ data: IventoryProduct; keyState: keyof State<IventoryProduct> }>) => {
      //   if (action.payload) {
      //     const { data, keyState } = action.payload;
      //     if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
      //     state[keyState] = true;
      //     state.status = 'getById.fulfilled';
      //   } else state.status = 'idle';
      //   state.isLoading = false;
      // })
      .addCase(action.getInventoryProduct.fulfilled, (state: State<IventoryProduct>, action: PayloadAction<Responses<IventoryProduct>>) => {
        if (action.payload.data) {
          state.data = action.payload.data;
          console.log(action.payload.data)
          state.status = 'get.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
  }));

export const InventoryProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<IventoryProduct>),
    set: (values: State<IventoryProduct>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<IventoryProduct>) => dispatch(action.getInventoryProduct(params)),
  };
};

export class IventoryProduct extends CommonEntity {
  constructor(
    public inventory: IventoryProduct1
  ) {
    super();
  }
}
export class IventoryProduct1 extends CommonEntity {
  constructor(
    public category?: string,
    public inventoryPrice?: string,
    public numberInBal?: string,
    public numberInKiot?: string,
    public productCode?: string,
    public productId?: string,
    public productName?: string,
    public storeBarcode?: string,
    public supplierBarcode?: string,
    public supplierName?: string,
    public units?: {
      value?: string;
      name?: string;
      isDefault?: boolean
    },
    public id?: string,
    public inventory?: Product,
  ) {
    super();
  }
}


