import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Ward } from '../address/ward';
import { District } from '../address/district';
import { Province } from '../address/province';
import { Message } from '@core/message';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Organization';
const action = {
  ...new Action<Supplier>(name),
  getSup: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { type?: string };
      fullTextSearch: string;
    }) => {
      const filterSup = JSON.parse(filter.toString() || '{}');
      return await API.get(routerLinks(name, 'api'), {
        page,
        perPage,
        type: filterSup.type,
        fullTextSearch: fullTextSearch,
      });
    },
  ),
  getByIdSupplier: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Supplier> }) => {
      let data = await API.get<Supplier>(`${routerLinks(name, 'api')}/detail/${id}`);
      data = {
        ...data,
        provinceId: data?.address?.province?.id + '|' + data?.address?.province?.code,
        districtId: data?.address?.district?.id + '|' + data?.address?.district?.code,
        wardId: data?.address?.ward?.id,
      };

      return { data, keyState };
    },
  ),
  postSup: createAsyncThunk(name + '/post', async (values: Supplier) => {
    const provinceId = values.provinceId?.slice(0, values.provinceId.indexOf('|'));
    const districtId = values.districtId?.slice(0, values.districtId.indexOf('|'));
    const wardId = values.wardId;
    const street = values.street;
    const supplierType = 'BALANCE';
    const type = 'SUPPLIER';
    const address = { provinceId, districtId, wardId, street };
    const { statusCode, message } = await API.post<Supplier>(routerLinks(name, 'api'), {
      ...values,
      address,
      supplierType,
      type,
    });
    if (message) Message.success({ text: message });
    return statusCode;
  }),
  putSup: createAsyncThunk(name + '/put', async ({ id, ...values }: Supplier) => {
    const provinceId = values.provinceId?.slice(0, values.provinceId.indexOf('|'));
    const districtId = values.districtId?.slice(0, values.districtId.indexOf('|'));
    const wardId = values.wardId;
    const street = values.street;
    const supplierType = 'BALANCE';
    const type = 'SUPPLIER';
    const address = { provinceId, districtId, wardId, street };
    const rs = { ...values, address, supplierType, type };
    delete rs.provinceId;
    delete rs.districtId;
    delete rs.wardId;

    const { statusCode, message } = await API.put<Supplier>(`${routerLinks(name, 'api')}/${id}`, rs);
    if (message) Message.success({ text: message });
    return statusCode;
  }),
};
export const supplierSlice = createSlice(
  new Slice<Supplier>(action, (builder: any) => {
    builder
      .addCase(action.getByIdSupplier.pending, (state: State<Supplier>) => {
        state.isLoading = true;
        state.status = 'getById.pending';
      })
      .addCase(
        action.getByIdSupplier.fulfilled,
        (state: State<Supplier>, action: PayloadAction<{ data: Supplier; keyState: keyof State<Supplier> }>) => {
          if (action.payload) {
            const { data, keyState } = action.payload;
            if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
            state[keyState] = true;
            state.status = 'getById.fulfilled';
          } else state.status = 'idle';
          state.isLoading = false;
        },
      )
      .addCase(
        action.post.pending,
        (
          state: State<Supplier>,
          action: PayloadAction<undefined, string, { arg: Supplier; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'post.pending';
        },
      )
      .addCase(action.post.fulfilled, (state: State<Supplier>, action: PayloadAction<Supplier>) => {
        if (action.payload.toString() === '200') {
          state.isVisible = false;
          state.status = 'post.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(
        action.put.pending,
        (
          state: State<Supplier>,
          action: PayloadAction<undefined, string, { arg: Supplier; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.data = action.meta.arg;
          state.isLoading = true;
          state.status = 'put.pending';
        },
      )
      .addCase(action.put.fulfilled, (state: State<Supplier>, action: PayloadAction<Supplier>) => {
        if (action.payload.toString() === '200') {
          state.isVisible = false;
          state.status = 'put.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      });
  }),
);

export const SupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Supplier>),
    set: (values: State<Supplier>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { type?: string };
      fullTextSearch: string;
    }) => dispatch(action.getSup({ page, perPage, filter, fullTextSearch })),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Supplier> }) =>
      dispatch(action.getByIdSupplier({ id, keyState })),
    post: (values: Supplier) => dispatch(action.postSup(values)),
    put: (values: Supplier) => dispatch(action.putSup(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Supplier extends CommonEntity {
  constructor(
    public code?: string,
    public fax?: string,
    public id?: string,
    public informationConnect?: boolean,
    public isActive?: boolean,
    public name?: string,
    public note?: string,
    public storeId?: number,
    public supplierType?: string,
    public type?: string,
    public districtId?: string,
    public provinceId?: string,
    public street?: string,
    public wardId?: string,
    public address?: {
      id?: number;
      street?: string;
      district?: District;
      province?: Province;
      ward?: Ward;
    },
    public userRole?: {
      0: {
        createdAt: string;
        isDeleted: boolean;
        roleId: number;
        subOrgId: string;
        id: string;
        userAdminId: string;
        userAdmin: {
          id: string;
          email: string;
          name: string;
          phoneNumber: string;
        };
      };
    },
  ) {
    super();
  }
}
