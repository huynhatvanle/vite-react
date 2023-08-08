import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Listconnect';

const action = {
    ...new Action<Listconnect>(name),
    getListconnect: createAsyncThunk(
        name + '/get',
        async ({ page, perPage, fullTextSearch, filter }: {
            page: number,
            perPage: number,
            fullTextSearch?: string,
            filter: { idStore?: string, supplierId?: string, status?: string, dateFrom?: string, dateTo?: string }
        }) => {
            const filterInvoiceKiotViet = JSON.parse(filter.toString() || '{}')
            let data = await API.get(routerLinks(name, 'api'), cleanObjectKeyNull({
                page,
                perPage,
                fullTextSearch: fullTextSearch,
                idStore: filterInvoiceKiotViet.idStore,
                status: filterInvoiceKiotViet.status,
                supplierId: filterInvoiceKiotViet.supplierId,
                filter: { dateFrom: filterInvoiceKiotViet.dateFrom ? filterInvoiceKiotViet.dateFrom : '', dateTo: filterInvoiceKiotViet.dateTo ? filterInvoiceKiotViet.dateTo : '' }
            }));
            data.data = Object.entries(data.data as Object)[0]?.[1]
            return data;
        }
    )
}

export const ListconnectSlice = createSlice(new Slice<Listconnect>(action, (builder: any) => {
    builder
        .addCase(
            action.getListconnect.pending,
            (
                state: State<Listconnect>,
                action: PayloadAction<undefined, string, { arg: Listconnect; requestId: string; requestStatus: 'pending' }>,
            ) => {
                state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
                state.queryParams = JSON.stringify(action.meta.arg);
                state.isLoading = true;
                state.status = 'get.pending';
            },
        )
        .addCase(action.getListconnect.fulfilled, (state: State<Listconnect>, action: PayloadAction<Listconnect>) => {
            console.log(action.payload)
            if (action.payload) {
                state.data = action.payload;
                state.status = 'get.fulfilled';
            } else state.status = 'idle';
            state.isLoading = false;
        })
}));

export const ListconnectFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Listconnect>),
        set: (values: State<Listconnect>) => dispatch(action.set(values)),
        // get: (params: PaginationQuery<InvoiceKiotViet>) => dispatch(action.getInvoiceKiotViet(params)),
        get: ({ page, perPage, fullTextSearch, filter }: { page: number, perPage: number, fullTextSearch?: string, filter: { idStore?: string, supplierId?: string, status?: string, dateFrom?: string, dateTo?: string } }) => dispatch(action.getListconnect({ page, perPage, fullTextSearch, filter })),
    };
};

export class Listconnect extends CommonEntity {
    constructor(
        public storeRequestSupplier?: {
      0: {
        id: string,
        product: {
          basicUnit: string,
          capitalCost: string,
          id: string,
          name: string,
          photo: {
            0: {
              id: string,
              url: string,
            },

          },
          price: string,
          productCategory: {
            0: {
              category: {
                id: string,
                url: string,
              },
              id: string,
            },
          },
          productPrice: {
            0: {
              defaultPrice: string,
              id: string,
              minQuantity: string,
              price: string,
              priceType: string,
              productId: string,
            },
          },

        },
        status: string,
        supplier: {
          address: {
            district: {
              code: string,
              id: string,
              name: string,
              provinceCode: string,
            },
            districtId: string,
            id: string,
            postCode: string,
            province: {
              code: string,
              id: string,
              name: string,
            },
            provinceId: string,
            street: string,
            ward: {
              code: string,
              districtCode: string,
              id: string,
              name: string,
            },
            wardId: string,
          },
          fax: string,
          id: string,
          name: string,
          userRole: {
            0: {
              id: string,
              userAdmin: {
                id: string,
                name: string,
                phoneNumber: string,
              },
            },
          },
        },
      },

    }, 
    ) {
        super();
    }
}

