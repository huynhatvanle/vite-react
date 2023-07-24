import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { Message } from '@core/message';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { Action, Slice, State, useAppDispatch, useTypedSelector } from '@store';

const name = 'Inventory';
export const action = {
  ...new Action<Inventory>(name),
  post: createAsyncThunk(name + '/post', async (values: Inventory) => {
    const { data, message } = await API.post<Inventory>(`${routerLinks(name, 'api')}/register`, {
      ...values,
    });
    if (message) Message.success({ text: message });
    return data;
  }),
  put: createAsyncThunk(name + '/put', async ({ id, ...values }: Inventory) => {
    const { data, message } = await API.put<Inventory>(`${routerLinks(name, 'api')}/${id}`, values);
    if (message) Message.success({ text: message });
    return data;
  }),
};
export const userSlice = createSlice(new Slice<Inventory>(action));

export const UserFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Inventory>),
    set: (values: State<Inventory>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Inventory>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Inventory> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Inventory) => dispatch(action.post(values)),
    put: (values: Inventory) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};


export class Inventory extends CommonEntity {
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
    ) {
      super();
    }
  }
  