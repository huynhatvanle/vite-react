import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { Product } from '@store/product';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InventoryProduct';

const action = {
  ...new Action<InventoryProduct>(name),
  getInventoryProduct: createAsyncThunk(
    name + '/get',
    async ({ page, perPage, filter, sorts }: { page: number, perPage: number, filter: { fullTextSearch: string, idStore?: string; supplierId: string }, sorts: {} }) => {
      const filterInventoryProduct = JSON.parse(filter.toString() || '{}')
      const sortInventoryProduct = sorts ? JSON.parse(sorts.toString() || '{}') : '';
      let data = await API.get(routerLinks(name, 'api'), cleanObjectKeyNull({
        page,
        perPage,
        idStore: filterInventoryProduct.idStore,
        supplierId: filterInventoryProduct.supplierId,
        fullTextSearch: filterInventoryProduct.fullTextSearch,
        productName: filterInventoryProduct.productName,
        supplierBarcode: filterInventoryProduct.supplierBarcode,
        storeBarcode: filterInventoryProduct.storeBarcode,
        productCode: filterInventoryProduct.productCode,
        sort: { productCode: sortInventoryProduct.productCode, productName: sortInventoryProduct.productName }
      }));

      const inventory = Object.entries(data.data as Object)[0]?.[1]
      data.data = inventory
      return data;
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
    get: ({ page, perPage, filter, sorts }: { page: number, perPage: number, filter: { fullTextSearch: string, idStore?: string; supplierId: string }, sorts: {} }) => {
      console.log(filter)
      return dispatch(action.getInventoryProduct({ page, perPage, filter, sorts }))
    },
    put: (values: InventoryProduct) => dispatch(action.put(values)),
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


