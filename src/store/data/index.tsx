import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State, TLanguage } from '@store';

import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Data';
const action = {
  ...new Action<Data>(name),
  getArray: createAsyncThunk(name + '/array', async (array: string[]) => {
    const { data } = await API.get<Data>(routerLinks(name, 'api') + '/array', { array });
    return data;
  }),
};
export const dataSlice = createSlice(
  new Slice<Data>(action, { mission: [], services: [], value: [], member: [], partner: [], tech: [] }, (builder) => {
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
      });
  }),
);
interface StateData<T> extends State<T> {
  mission: T[];
  services: T[];
  value: T[];
  member: T[];
  partner: T[];
  tech: T[];
}
export const DataFacade = () => {
  const dispatch = useAppDispatch();
  const state = useTypedSelector((state) => state[action.name] as StateData<Data>);
  return {
    ...state,
    set: (values: StateData<Data>) => dispatch(action.set(values)),
    getArray: (array: string[]) => {
      array = array.filter((item) => state[item].length === 0);
      array.length > 0 && dispatch(action.getArray(array));
    },
    showDetail: (data: Data) => dispatch(action.set({ data, isVisible: true })),
    hideDetail: () => dispatch(action.set({ data: undefined, isVisible: false })),
  };
};
export class Data extends CommonEntity {
  constructor(
    public name?: string,
    public type?: string,
    public image?: string,
    public order?: number | null,
    public createdAt?: string,
    public updatedAt?: string,
    public translations?: {
      id: string;
      language?: TLanguage;
      name: string;
      description?: string;
      position?: string;
      content?: {
        blocks: Record<string, object>[];
      };
      dataId?: string;
      data?: Data;
      createdAt?: string;
      updatedAt?: string;
    }[],
  ) {
    super();
  }
}
