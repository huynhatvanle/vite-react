import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

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
      console.log('datadata', data);
      const dataDiscount = Object.entries(data.data as Object)[0]?.[1];
      data.data = dataDiscount;

      return data;
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
  constructor(public id?: string, public name?: string, public code?: string) {
    super();
  }
}
