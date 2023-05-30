import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Suborgcommision';

const action = {
  ...new Action<Discount>(name),
  getByIdDiscount: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id?: string; keyState: keyof State<Discount> }) => {
      const data = await API.get<Discount>(`${routerLinks(name, 'api')}/${id}`);
      return { data, keyState };
    },
  ),
};

export const DiscountSlice = createSlice(new Slice<Discount>(action));

export const DiscountFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Discount>),
    set: (values: State<Discount>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Discount>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id?: string; keyState?: keyof State<Discount> }) =>
      dispatch(action.getByIdDiscount({ id, keyState })),
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
