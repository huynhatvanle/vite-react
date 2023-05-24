import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
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
    const { data, message } = await API.put<Supplier>(`${routerLinks(name, 'api')}/${id}`, { ...values, address, supplierType, type});
    if (message) await Message.success({ text: message });
    return data;
  }),
};
export const supplierSlice = createSlice(new Slice<Supplier>(action));


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
