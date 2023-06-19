import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Category';

const action = {
  ...new Action<Category>(name),
  getByIdCategory: createAsyncThunk(name + '/getById', async (id: string) => {
    const data = await API.get<Category>(`${routerLinks(name, 'api')}/${id}`);
    return { data };
  }),
  // get1: createAsyncThunk(
  //   name + '/get',
  //   async (params: PaginationQuery<Category>) => await API.get(routerLinks(name, 'api'), params),
  // ),
  get2: createAsyncThunk(name + '/get2', async (id: string) => await API.get(routerLinks(name, 'api'), { id })),
  get3: createAsyncThunk(name + '/get3', async (id: string) => await API.get(routerLinks(name, 'api'), { id })),
};

export const categorySlice = createSlice(
  new Slice<Category>(action, { result2: {}, result3: {} }, (builder) =>
    builder
      .addCase(
        action.get2.pending,
        (
          state: State<Category>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get2.pending';
        },
      )

      .addCase(action.get2.fulfilled, (state: State<Category>, action: any) => {
        if (action.payload.data) {
          state.result2 = action.payload;
          state.status = 'get2.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.get2.rejected, (state: State) => {
        state.status = 'get2.rejected';
        state.isLoading = false;
      })

      .addCase(
        action.get3.pending,
        (
          state: State<Category>,
          action: PayloadAction<undefined, string, { arg: any; requestId: string; requestStatus: 'pending' }>,
        ) => {
          state.time = new Date().getTime() + (state.keepUnusedDataFor || 60) * 1000;
          state.queryParams = JSON.stringify(action.meta.arg);
          state.isLoading = true;
          state.status = 'get3.pending';
        },
      )
      .addCase(action.get3.fulfilled, (state: State<Category>, action: any) => {
        if (action.payload.data) {
          state.result3 = action.payload;
          state.status = 'get3.fulfilled';
        } else state.status = 'idle';
        state.isLoading = false;
      })
      .addCase(action.get3.rejected, (state: State) => {
        state.status = 'get3.rejected';
        state.isLoading = false;
      }),
  ),
);

export const CategoryFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Category>),
    set: (values: State<Category>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Category>) => dispatch(action.get(params)),
    get2: ({ id }: { id: string }) => dispatch(action.get2(id)),
    get3: ({ id }: { id: string }) => dispatch(action.get3(id)),
    getById: ({ fullTextSearch, id }: { fullTextSearch: string; id: string }) => dispatch(action.getByIdCategory(id)),
    post: (values: Category) => dispatch(action.post(values)),
    put: (values: Category) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Category extends CommonEntity {
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
