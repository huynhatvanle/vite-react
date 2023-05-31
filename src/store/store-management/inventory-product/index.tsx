import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';

const name = 'InventoryProduct';

const action = {
  ...new Action<InventoryProduct>(name),
  getInventoryProduct: createAsyncThunk(
    name + '/get',
    async ({page, perPage, filter} : {page: number, perPage: number, filter: { idStore?: string; supplierId: string}}) => {
      const filterInventoryProduct = JSON.parse( filter.toString() || '{}' )
      let data  = await API.get(routerLinks(name, 'api'), {
        page, 
        perPage, 
        idStore: filterInventoryProduct.idStore, 
        supplierId: filterInventoryProduct.supplierId
      });
      
      const inventory = Object.entries(data.data as Object)[0]?.[1]  
      data.data = inventory
      return data ;
    }
  )
}
export const inventoryProductSlice = createSlice(
  new Slice<InventoryProduct>(action, 
    (builder: any) => {
    builder
    .addCase(
      action.getInventoryProduct.pending,
      (
        state: State<InventoryProduct>,
        action: PayloadAction<undefined, string, { arg: InventoryProduct; requestId: string; requestStatus: 'pending' }>,
      ) => {
        state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
        state.queryParams = JSON.stringify(action.meta.arg);
        state.isLoading = true;
        state.status = 'get.pending';
      },
    )
    .addCase(action.getInventoryProduct.fulfilled, (state: State<InventoryProduct>, action: PayloadAction<Responses<InventoryProduct[]>>) => {
      console.log('object')
      if (action.payload) {
        state.result = action.payload;
        state.status = 'get.fulfilled';
      } else state.status = 'idle';
      state.isLoading = false;
    })
  }
));

export const InventoryProductFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<InventoryProduct>),
    set: (values: State<InventoryProduct>) => dispatch(action.set(values)),
    get: ({page, perPage, filter} : {page: number, perPage: number, filter: {idStore?: string; supplierId: string }}) => {
      return dispatch(action.getInventoryProduct({page,perPage,filter}))
    }
  };
};

export class InventoryProduct extends CommonEntity {
  constructor(
    public inventory: InventoryProduct1
  ) {
    super();
  }
}
export class InventoryProduct1 extends CommonEntity {
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


