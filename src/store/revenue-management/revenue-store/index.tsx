import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Message } from '@core/message';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'StoreOder';
const action = {
  ...new Action<StoreOrder>(name),
};
export const storeOderSlice = createSlice(new Slice<StoreOrder>(action));

export const StoreOderFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<StoreOrder>),
    set: (values: State<StoreOrder>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<StoreOrder>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<StoreOrder> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: StoreOrder) => dispatch(action.post(values)),
    put: (values: StoreOrder) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class StoreOrder extends CommonEntity {
  constructor(public code?: string, public fax?: string, public id?: string, public name?: string) {
    super();
  }
}
