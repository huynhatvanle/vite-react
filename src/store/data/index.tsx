import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Data';
const action = {
  ...new Action<Data>(name),
  getArray: createAsyncThunk(name + '/array', async (params: { array: string[] }) => {
    const { data } = await API.get<Data>(routerLinks(name, 'api') + '/array', params);
    return data;
  }),
  showDetail: createAsyncThunk(name + '/showDetail', async (data: Data) => data),
  hideDetail: createAsyncThunk(name + '/hideDetail', async () => null),
};
export const dataSlice = createSlice(
  new Slice<Data>(action, { mission: [], services: [], value: [], member: [], partner: [] }, (builder) => {
    builder
      .addCase(action.getArray.pending, (state: State) => {
        state.isLoading = true;
        state.status = 'getArray.pending';
      })
      .addCase(action.getArray.fulfilled, (state: State, action: PayloadAction<State>) => {
        for (const [key, value] of Object.entries(action.payload)) state[key] = value;
        state.isLoading = false;
        state.status = 'getArray.fulfilled';
      })
      .addCase(action.getArray.rejected, (state: State) => {
        state.isLoading = false;
        state.status = 'getArray.rejected';
      })
      .addCase(action.showDetail.fulfilled, (state: State, action: PayloadAction<State>) => {
        state.data = action.payload;
        state.isVisible = true;
        state.status = 'showDetail.fulfilled';
      })
      .addCase(action.hideDetail.fulfilled, (state: State) => {
        state.data = undefined;
        state.isVisible = false;
        state.status = 'hideDetail.fulfilled';
      });
  }),
);
interface StateData extends State<Data> {
  mission: Data[];
  services: Data[];
  value: Data[];
  member: Data[];
  partner: Data[];
  tech: Data[];
}
export const DataFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as StateData),
    set: (values: StateData) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Data>) => dispatch(action.get(params)),
    getArray: (params: { array: string[] }) => dispatch(action.getArray(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof StateData }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Data) => dispatch(action.post(values)),
    put: (values: Data) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
    showDetail: (data: Data) => dispatch(action.showDetail(data)),
    hideDetail: () => dispatch(action.hideDetail()),
  };
};
export class Data extends CommonEntity {
  constructor(
    public name?: string,
    public type?: string,
    public image?: string,
    public order?: number,
    public translations?: {
      language: string;
      name: string;
      description?: string;
      position?: string;
      slug: string;
      seoTitle: string;
      seoDescription: string;
      content?: {
        blocks: Record<string, object>[];
      };
      dataId?: string;
      data?: Data;
    }[],
  ) {
    super();
  }
}
