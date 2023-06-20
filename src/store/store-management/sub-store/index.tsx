import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'SubStore';

const action = {
  ...new Action<SubStore>(name),
  getSubStore: createAsyncThunk(
    name + '/get',
    async ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch?: string, filter: { storeId?: string, supplierType?: string } }) => {
      const filterSubStore = typeof filter != 'object' ? JSON.parse(filter || '{}') : filter
      const data = await API.get(routerLinks(name, 'api'), cleanObjectKeyNull({
        page,
        perPage,
        storeId: filterSubStore.storeId,
        supplierType: filterSubStore.supplierType,
        fullTextSearch: fullTextSearch
      }))
      return data;
    }
  ),
}

export const subStoreSlice = createSlice(new Slice<SubStore>(action));

export const SubStoreFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<SubStore>),
    set: (values: State<SubStore>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<SubStore>) => dispatch(action.get(params)),
    get: ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch?: string, filter: { storeId?: string, supplierType?: string } }) => {
      return dispatch(action.getSubStore({ page, perPage, filter, fullTextSearch }))
    },
  };
};

export class SubStore extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public code?: string,
    public isActive?: boolean,
    public isParent?: boolean,
    public createdById?: string,
    public orgId?: string,
    public isKiotViet?: boolean,
    public categoryKiotId?: string,
    public parentId?: string,
  ) {
    super();
  }
}

