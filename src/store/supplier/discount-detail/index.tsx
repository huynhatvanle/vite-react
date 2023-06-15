import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'suborgcommisionline';

const action = {
  ...new Action<detailDiscount>(name),
  getDiscount: createAsyncThunk(
    name + '/get',
    async ({ filter, page, perPage }: { page: number; perPage: number; filter: { id?: string } }) => {
      const filterDis = JSON.parse(filter.toString() || '{}');
      const data = await API.get<detailDiscount>(`${routerLinks(name, 'api')}/${filterDis.id}`, {
        page,
        perPage,
      });
      return data;
    },
  ),
};

export const detailDiscountSlice = createSlice(new Slice<detailDiscount>(action));

export const detailDiscountFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<detailDiscount>),
    set: (values: State<detailDiscount>) => dispatch(action.set(values)),
    get: ({ filter, page, perPage }: { page: number; perPage: number; filter: { id?: string } }) =>
      dispatch(action.getDiscount({ filter, page, perPage })),
    putSub: (values: detailDiscount) => dispatch(action.put(values)),
    // getById: ({ filter, page, perPage }: { page: number; perPage: number; filter: { id?: string } }) =>
    //   dispatch(action.getIdDiscount({ filter, page, perPage })),
  };
};

export class detailDiscount extends CommonEntity {
  constructor(public id?: string, public name?: string, public code?: string, public totalCommissionSupplier?: number) {
    super();
  }
}
