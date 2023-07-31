import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'TaxAdmin';

const action = {
  ...new Action<TaxAdmin>(name),
  getAll: createAsyncThunk(
    name + '/getAll',
    async ({ fullTextSearch }: { fullTextSearch: string }) => await API.get(routerLinks(name, 'api'), { fullTextSearch }),
  ),
}

export const taxAdminSlice = createSlice(
  new Slice<TaxAdmin>(action, { result: {}, result2: {} }, (builder) =>
    builder
      .addCase(
        action.getAll.pending,
        (
          state: State<TaxAdmin>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getAll.pending';
        },
      )

      .addCase(action.getAll.fulfilled, (state: State<TaxAdmin>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getAll.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getAll.rejected, (state: State) => {
        state.status = 'getAll.rejected';
        state.isLoading = false;
      })
  ),
);

export const TaxAdminFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<TaxAdmin>),
    set: (values: State<TaxAdmin>) => dispatch(action.set(values)),
    get: ({ fullTextSearch }: { fullTextSearch: string }) => dispatch(action.getAll({ fullTextSearch })),
  };
};

export class TaxAdmin extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public typeTax?: string,
    public descripton?: string,
    public orgId?: string,
    public taxRate?: number
  ) {
    super();
  }
}
