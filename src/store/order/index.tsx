import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Orders';

const action = {
  ...new Action<Orders>(name),
  getOrder: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { filterSupplier?: string };
      fullTextSearch: string;
    }) => {
      const filterOrder = JSON.parse(filter.toString() || '{}');

      const data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page,
          perPage,
          filterSupplier: filterOrder.filterSupplier,
          fullTextSearch: fullTextSearch,
        }),
      );
      return data;
    },
  ),
};

export const OrdersSlice = createSlice(new Slice<Orders>(action));

export const OrdersFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Orders>),
    set: (values: State<Orders>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { filterSupplier?: string };
      fullTextSearch: string;
    }) => dispatch(action.getOrder({ page, perPage, filter, fullTextSearch })),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Orders> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Orders) => dispatch(action.post(values)),
    put: (values: Orders) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Orders extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public confirmAt?: string,
    public createdAt?: string,
    public deliveredAt?: string,
    public total?: number,
  ) {
    super();
  }
}
