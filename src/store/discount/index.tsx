import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Suborgcommision';

const action = {
  ...new Action<Discount>(name),
  getDiscount: createAsyncThunk(
    name + '/getDiscount',
    async ({
      filter,
      page,
      perPage,
    }: {
      filter: { id?: string; filter: { dateFrom?: string; dateTo?: string }; status?: string };
      page?: number;
      perPage?: number;
    }) => {
      const filterDis = JSON.parse(filter.toString() || '{}');
      const data = await API.get<Discount>(
        `${routerLinks(name, 'api')}/${filterDis.id}`,
        cleanObjectKeyNull({
          page,
          perPage,
          filter: { dateFrom: filterDis.filter.dateFrom, dateTo: filterDis.filter.dateTo },
          status: filterDis.status,
        }),
      );
      let dataDiscount = Object.entries(data.data as Object)[0]?.[1];
      const totalCommissionSupplier = data.data?.totalCommissionSupplier;
      data.data = dataDiscount;
      const dataTemp = { ...data, totalCommissionSupplier };

      return dataTemp;
    },
  ),
  getIdDiscount: createAsyncThunk(name + '/getById', async ({ id }: { id: string }) => {
    const data = await API.get<Discount>(`${routerLinks(name, 'api')}/detail/${id}`);
    return { data };
  }),
};

export const DiscountSlice = createSlice(
  new Slice<Discount>(action, { result: {} }, (builder) =>
    builder
      .addCase(
        action.getDiscount.pending,
        (
          state: State<Discount>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'getDiscount.pending';
        },
      )
      .addCase(action.getDiscount.fulfilled, (state: State<Discount>, action: any) => {
        if (action.payload.data) {
          state.result = action.payload;
          state.status = 'getDiscount.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.getDiscount.rejected, (state: State) => {
        state.status = 'getDiscount.rejected';
        state.isLoading = false;
      }),
  ),
);

export const DiscountFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Discount>),
    set: (values: State<Discount>) => dispatch(action.set(values)),
    get: ({
      filter,
      page,
      perPage,
    }: {
      filter: { id?: string; filter: { dateFrom?: string; dateTo?: string }; status?: string };
      page?: number;
      perPage?: number;
    }) => dispatch(action.getDiscount({ perPage, page, filter })),
    getById: ({ id }: { id: string }) => dispatch(action.getIdDiscount({ id })),
    post: (values: Discount) => dispatch(action.post(values)),
    put: (values: Discount) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Discount extends CommonEntity {
  constructor(
    public commision?: string,
    public datefrom?: string,
    public dateto?: string,
    public noPay?: string,
    public status?: string,
    public paid?: string,
    public totalCommissionSupplier?: number,
  ) {
    super();
  }
}
