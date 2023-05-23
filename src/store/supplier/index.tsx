import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { Message } from '@core/message';
// import Action from '../action';
// import Slice, { State } from '../slice';
// import { useAppDispatch, useTypedSelector } from '@reducers';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { District } from '../address/district';
import { Province } from '../address/province';
import { Ward } from '../address/ward';

const name = 'Organization';
export const action = {
  ...new Action<Supplier>(name),
  getByIdSupplier: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Supplier> }) => {
      const data = await API.get<Supplier>(`${routerLinks(name, 'api')}/detail/${id}`);
      return { data, keyState };
    },
  ),
  post: createAsyncThunk(name + '/post', async (values: Supplier) => {
    const provinceId = values.provinceId?.slice(0, values.provinceId.indexOf('|'))
    const districtId = values.districtId?.slice(0, values.districtId.indexOf('|'))
    const wardId = values.wardId
    const street = values.street
    const supplierType = 'BALANCE'
    const type = 'SUPPLIER'
    const address = { provinceId, districtId, wardId, street }
    const { data, message } = await API.post<Supplier>(routerLinks(name, 'api'), { ...values, address, supplierType, type });
    if (message) await Message.success({ text: message });
    return data;
  }),
  put: createAsyncThunk(name + '/put', async ({ id, ...values }: Supplier) => {
    const provinceId = values.provinceId?.slice(0, values.provinceId.indexOf('|'))
    const districtId = values.districtId?.slice(0, values.districtId.indexOf('|'))
    const wardId = values.wardId
    const street = values.street
    const supplierType = 'BALANCE'
    const type = 'SUPPLIER'
    const address = { provinceId, districtId, wardId, street }
    const rs = {...values, address, supplierType, type }
    delete(rs.provinceId)
    delete(rs.districtId)
    delete(rs.wardId)
    console.log("rssssssssss",rs);
    
    const { data, message } = await API.put<Supplier>(`${routerLinks(name, 'api')}/${id}`, rs);
    if (message) await Message.success({ text: message });
    return data;
  }),
};
export const supplierSlice = createSlice(
  new Slice<Supplier>(action, (builder: any) => {
    builder
      .addCase(action.getByIdSupplier.pending, (state: State<Supplier>) => {
        state.isLoading = true;
        state.status = 'getById.pending';
      })
      .addCase(action.getByIdSupplier.fulfilled, (state: State<Supplier>, action: PayloadAction<{ data: Supplier; keyState: keyof State<Supplier> }>) => {
        if (action.payload) {
          const { data, keyState } = action.payload;
          if (JSON.stringify(state.data) !== JSON.stringify(data)) state.data = data;
          state[keyState] = true;
          state.status = 'getById.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
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
          console.log("state.status",state.status)
        },
      )
      .addCase(action.put.fulfilled, (state: State<Supplier>, action: PayloadAction<Supplier>) => {
        if (action.payload.toString() === '200') {
          console.log("action.payload",action.payload);
          state.isVisible = false;
          state.status = 'put.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
  }),
);


export const SupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Supplier>),
    set: (values: State<Supplier>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Supplier>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Supplier> }) =>
      dispatch(action.getByIdSupplier({ id, keyState })),
    post: (values: Supplier) => dispatch(action.post(values)),
    put: (values: Supplier) => dispatch(action.put(values)),
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
      district?: District
      province?: Province
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
        }
      }
    },
  ) {
    super();
  }
}
