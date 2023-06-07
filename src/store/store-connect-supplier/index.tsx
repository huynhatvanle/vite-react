import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { Supplier } from '@store/supplier';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'ConnectSupplier';

const action = {
  ...new Action<StoreConnectSupplier>(name),
  getStoreConnectSupplier: createAsyncThunk(
    name + '/get',
    async ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch: string, filter: { idSuppiler: string, supplierType: string } }) => {
      const filterStoreConnectSupplier = JSON.parse(filter.toString() || '{}')
      return await API.get(routerLinks(name, 'api'), { 
        page, 
        perPage, 
        idSuppiler: filterStoreConnectSupplier.idSuppiler, 
        supplierType: filterStoreConnectSupplier.supplierType ? filterStoreConnectSupplier.supplierType : '',
        fullTextSearch
      })
    }
  ),
}

export const connectSupplierSlice = createSlice(new Slice<StoreConnectSupplier>(action));

export const ConnectSupplierFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<StoreConnectSupplier>),
    set: (values: State<StoreConnectSupplier>) => dispatch(action.set(values)),
    // get: (params: PaginationQuery<StoreConnectSupplier>) => dispatch(action.get(params)),
    get: ({ page, perPage, filter, fullTextSearch }: { page: number, perPage: number, fullTextSearch: string, filter: { idSuppiler: string, supplierType: string } }) => dispatch(action.getStoreConnectSupplier({ page, perPage, filter, fullTextSearch })),
  };
};

export class StoreConnectSupplier extends CommonEntity {
  constructor(
    public id?: string,
    public supplier?: {
      id: string,
      code: string,
      fax: string,
      name: string,
      address: {}
    },
  ) {
    super();
  }
}

