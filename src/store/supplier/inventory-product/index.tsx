import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity, Responses } from '@models';
import { Product } from '@store/product';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'InventoryListProduct';

const action = {
  ...new Action<InventoryListProduct>(name),
  getProduct: createAsyncThunk(
    name + '/getInventoryListProduct',
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

      const data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
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
        }),
      );

      return data;
    },
  ),
};

export const inventoryListProductSlice = createSlice(
  new Slice<InventoryListProduct>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getProduct.pending,
        (
          state: State<InventoryListProduct>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getInventoryListProduct.pending';
        },
      )
      .addCase(action.getProduct.fulfilled, (state: State<InventoryListProduct>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getInventoryListProduct.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getProduct.rejected, (state: State) => {
        state.status = 'getInventoryListProduct.rejected';
        state.isLoading = false;
      }),
  ),
);

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
