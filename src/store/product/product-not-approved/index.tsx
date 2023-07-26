
import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';

const name = 'notApproved';

const action = {
  ...new Action<NotProduct>(name),
  getnotapproved: createAsyncThunk(
    name + '/not-approved',
    async ({ type, page, perPage, categoryId, supplierId }: { type: string, page?: number, perPage?: number, categoryId: string, supplierId: string }) => await API.get(`${routerLinks(name, 'api')}`, { type, page, perPage, categoryId, supplierId }),
  ), 
}

export const notApprovedSlice = createSlice(
  new Slice<NotProduct>(action, { result: {} }, (builder) =>
    builder
    .addCase(
        action.getnotapproved.pending,
        (
          state: State<NotProduct>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getnotapproved.pending';
        },
      )
  
      .addCase(action.getnotapproved.fulfilled, (state: State<NotProduct>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getnotapproved.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getnotapproved.rejected, (state: State) => {
        state.status = 'getnotapproved.rejected';
        state.isLoading = false;
      })
  ),
);

export const notApprovedFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<NotProduct>),
    set: (values: State<NotProduct>) => dispatch(action.set(values)),
    getnot: ({ type, page, perPage, categoryId, supplierId }: { type: string, page?: number, perPage?: number, categoryId: string, supplierId: string }) => dispatch(action.getnotapproved({ type, page, perPage, categoryId, supplierId })),
  };
};

export class NotProduct extends CommonEntity {
  constructor(
    public id?: string,
    public name?: string,
    public type?: string
  ) {
    super();
  }
}

