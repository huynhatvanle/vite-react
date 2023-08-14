
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';

const name = 'notApproved';

const action = {
  ...new Action<notApproved>(name),
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
        approveStatus?: string;
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
          approveStatus: filterProduct.approveStatus,
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
  new Slice<notApproved>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getProductnotapproved.pending,
        (
          state: State<notApproved>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getProductnotapproved.pending';
        },
      )

      .addCase(action.getProductnotapproved.fulfilled, (state: State<notApproved>, action: any) => {
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
    ...(useTypedSelector((state) => state[action.name]) as State<notApproved>),
    set: (values: State<notApproved>) => dispatch(action.set(values)),
    get: ({
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

export class notApproved extends CommonEntity {
  constructor(
    public stt?: number,
    public categoryId1?: string,
    public categoryId2?: string,
    public categoryId3?: string,
    public id?: string,
    public code?: string,
    public barcode?: string,
    public storeBarcode?: string,
    public name?: string,
    public description?: string,
    public brand?: string,
    public isOnlineBusinessWay?: boolean,
    public status?: string,
    public stockQuantity?: string,
    public supplierName?: string,
    public basicUnit?: string,
    public price?: string,
    public sellingPrice?: string,
    public exportTaxId?: string,
    public importTaxId?: string,
    public category?: {
      child: {
        child: {
          id: string;
          name: string;
        };
        id: string;
        name: string;
      };
      id: string;
      name: string;
    },
    public categoryId?: string,
    public exportTax?: {
      id: string;
      name: string;
    },
    public importTax?: {
      id: string;
      name: string;
    },
    public productPrice?: [
      {
        price: string;
        priceType: string;
        minQuantity: string;
      },
    ],
    public priceBalanceCommission?: [
      {
        amountBalance: string;
        revenue: string;
        percentBalance: string;
      },
    ],
    public child?: {},
    public photos?: [
      {
        url?: string;
      },
    ],
    public approveStatus?: string,
    public subOrg?: {
      id: string;
      name: string;
    },
    public capitalCost?: string,
    public abilitySupply?: {
      quarter: string;
      month: string;
      year: string;
    },
    public productCategory?: [
      {
        category: {
          name: string
        },
      }
    ]
  ) {
    super();
  }
}

