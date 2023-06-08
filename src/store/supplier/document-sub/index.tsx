import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { Product } from '@store/product';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'documentsuborganiztion';

const action = {
  ...new Action<Documentsub>(name),
  getSub: createAsyncThunk(name + '/get', async ({ id }: { id?: string }) => {
    let data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);
    return data;
  }),
  getByIdSub: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<Documentsub> }) => {
      const data = await API.get<Documentsub>(`${routerLinks(name, 'api')}/${id}`);

      return { data, keyState };
    },
  ),
};

export const documentsubSlice = createSlice(new Slice<Documentsub>(action));

export const DocumentsubFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Documentsub>),
    set: (values: State<Documentsub>) => dispatch(action.set(values)),
    get: ({ id }: { id?: string }) => dispatch(action.getSub({ id })),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Documentsub> }) =>
      dispatch(action.getByIdSub({ id, keyState })),
  };
};

export class Documentsub extends CommonEntity {
  constructor(public id?: string, public name?: string, public code?: string, public totalCommissionSupplier?: number) {
    super();
  }
}
