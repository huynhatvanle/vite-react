
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';

const name = 'notApproved';

const action = {
  ...new Action<NotProduct>(name),
  getProductnotapproved: createAsyncThunk(
    name + '/supplierwaitingappprove',
    async ({
      page,
      perPage,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      filter: {
        storeId?: string;
        type: string;
        supplierId?: string;
        categoryId?: string;
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        isGetAll?: boolean;
      };
      sorts?: {};
    }) => {
      const filterProduct = typeof filter != 'object' ? JSON.parse(filter || '{}') : filter;
      const sortProduct = sorts ? JSON.parse(sorts.toString() || '{}') : '';
      cleanObjectKeyNull(sortProduct);
      const data = await API.get(
        `${routerLinks(name, 'api')}/not-approved`,
        cleanObjectKeyNull({
          page: page,
          perPage: perPage,
          storeId: filterProduct.storeId,
          type: filterProduct.type,
          //approveStatus: filterProduct.approveStatus,
          supplierId: filterProduct.supplierId,
          categoryId: filterProduct.categoryId3
            ? filterProduct.categoryId3
            : filterProduct.categoryId2
              ? filterProduct.categoryId2
              : filterProduct.categoryId1
                ? filterProduct.categoryId1
                : null,
          categoryId1: filterProduct.categoryId1,
          categoryId2: filterProduct.categoryId2,
          categoryId3: filterProduct.categoryId3,
          productName: filterProduct.name,
          supplierBarcode: filterProduct.barcode,
          storeBarcode: filterProduct.storeBarcode,
          productCode: filterProduct.code,
          isGetAll: filterProduct.isGetAll,
          sort: { productCode: sortProduct.code, productName: sortProduct.name },
        }),
      );
      return data;
    },
  ),
}

export const notApprovedSlice = createSlice(
  new Slice<NotProduct>(action, { result: {} }, (builder) =>
    builder
    .addCase(
        action.getProductnotapproved.pending,
        (
          state: State<NotProduct>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getProductnotapproved.pending';
        },
      )
  
      .addCase(action.getProductnotapproved.fulfilled, (state: State<NotProduct>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getProductnotapproved.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getProductnotapproved.rejected, (state: State) => {
        state.status = 'getProductnotapproved.rejected';
        state.isLoading = false;
      })
  ),
);

export const notApprovedFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<NotProduct>),
    set: (values: State<NotProduct>) => dispatch(action.set(values)),
    getproduct: ({
      page,
      perPage,
      filter,
      sorts,
    }: {
      page: number;
      perPage: number;
      filter: {
        supplierId?: string;
        storeId?: string;
        type: string;
        //approveStatus: string;
        categoryId?: string,
        categoryId1?: string;
        categoryId2?: string;
        categoryId3?: string;
        isGetAll?: boolean;
      };
      sorts?: {};
    }) => {
      return dispatch(action.getProductnotapproved({ page, perPage, filter, sorts }));
    },
   };
};

export class NotProduct extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {
    super();
  }
}

