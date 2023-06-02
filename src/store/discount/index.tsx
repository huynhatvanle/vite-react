import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';


const name = 'Suborgcommision';

const action = {
  ...new Action<Discount>(name),
  getDiscount: createAsyncThunk(
    name + '/get',
    async ({ filter, page, perPage }: { filter: { id?: string }; page?: number; perPage?: number }) => {
      const filterDis = JSON.parse(filter.toString() || '{}');
      const data = await API.get<Discount>(`${routerLinks(name, 'api')}/${filterDis.id}`, {
        page,
        perPage,
      });
      let dataDiscount = Object.entries(data.data as Object)[0]?.[1];
      const totalCommissionSupplier = data.data?.totalCommissionSupplier;
      data.data = dataDiscount;
      const dataTemp = { ...data, totalCommissionSupplier };

      return dataTemp;
    },
  ),
  getByIdDiscount: createAsyncThunk(
    name + '/getById',
    async ({ id, page, perPage }: { id?: string; page?: number; perPage?: number }) => {
      const data = await API.get<Discount>(`${routerLinks(name, 'api')}/${id}`, { page, perPage });
      return { data };
    },
  ),
};

export const DiscountSlice = createSlice(new Slice<Discount>(action));

export const DiscountFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Discount>),
    set: (values: State<Discount>) => dispatch(action.set(values)),
    get: ({ filter, page, perPage }: { filter: { id?: string }; page?: number; perPage?: number }) =>
      dispatch(action.getDiscount({ perPage, page, filter })),
    getById: ({ id, page, perPage }: { id?: string; page?: number; perPage?: number }) =>
      dispatch(action.getByIdDiscount({ id, page, perPage })),
    post: (values: Discount) => dispatch(action.post(values)),
    put: (values: Discount) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Discount extends CommonEntity {
  constructor(public id?: string, public name?: string, public code?: string, public totalCommissionSupplier?: number) {
    super();
  }
}
