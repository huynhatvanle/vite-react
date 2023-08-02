import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Data';
const action = {
  ...new Action<Data>(name),
  getArray: createAsyncThunk(name + '/array', async (params: { array: string[] }) => {
    const { data, message } = await API.get<Data>(routerLinks(name, 'api') + '/array', params);
    return data;
  }),
};
export const dataSlice = createSlice(
  new Slice<Data>(action, { mission: [], services: [], value: [], member: [], partner: [] }, (builder) => {
    builder
      .addCase(action.getArray.pending, (state: State) => {
        state.isLoading = true;
        state.status = 'getArray.pending';
      })
      .addCase(action.getArray.fulfilled, (state: State, action: PayloadAction<State>) => {
        console.log(action);
        state.mission = action.payload.mission;
        state.services = action.payload.services;
        state.value = action.payload.value;
        state.member = action.payload.member;
        state.partner = action.payload.partner;
        state.isLoading = false;
        state.status = 'getArray.fulfilled';
      })
      .addCase(action.getArray.rejected, (state: State) => {
        state.isLoading = false;
        state.status = 'getArray.rejected';
      });
  }),
);
interface StateData extends State<Data> {
  mission: Data[];
  services: Data[];
  value: Data[];
  member: Data[];
  partner: Data[];
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
  };
};
export class Data extends CommonEntity {
  constructor(
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
      content?: Record<string, object>;
      dataId?: string;
      data?: Data;
    }[],
  ) {
    super();
  }
}
