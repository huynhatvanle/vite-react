import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State, Data } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Post';
const action = {
  ...new Action<Post>(name),
  getArray: createAsyncThunk(name + '/array', async (array: string[]) => {
    const { data } = await API.get<Data>(routerLinks(name, 'api') + '/array', { array });
    return data;
  }),
  getBySlug: createAsyncThunk(name + '/getBySlug', async (slug: string) => {
    const { data } = await API.get<Post>(`${routerLinks(name, 'api')}/slug/${slug}`);
    return { data };
  }),
};
export const postSlice = createSlice(
  new Slice<Post>(action, { news: [], projects: [] }, (builder) => {
    builder
      .addCase(action.getArray.pending, (state: State<Post>) => {
        state.isLoading = true;
        state.status = 'getArray.pending';
      })
      .addCase(action.getArray.fulfilled, (state: State<Post>, action: PayloadAction<State<Post>>) => {
        for (const [key, value] of Object.entries(action.payload)) state[key] = value;
        state.isLoading = false;
        state.status = 'getArray.fulfilled';
      })
      .addCase(action.getArray.rejected, (state: State<Post>) => {
        state.isLoading = false;
        state.status = 'getArray.rejected';
      })

      .addCase(action.getBySlug.pending, (state: State<Post>) => {
        state.isLoading = true;
        state.status = 'getBySlug.pending';
      })
      .addCase(action.getBySlug.fulfilled, (state: StatePost, action: PayloadAction<StatePost>) => {
        state.data = action.payload.data;
        state.status = 'getBySlug.fulfilled';
        state.isLoading = false;
      })
      .addCase(action.getBySlug.rejected, (state: StatePost) => {
        state.status = 'getBySlug.rejected';
        state.isLoading = false;
      });
  }),
);
interface StatePost extends State<Post> {
  news: Post[];
  projects: Post[];
}
export const PostFacade = () => {
  const dispatch = useAppDispatch();
  const state = useTypedSelector((state) => state[action.name] as StatePost);
  return {
    ...state,
    getArray: (array: string[]) => {
      array = array.filter((item) => state[item].length === 0);
      array.length > 0 && dispatch(action.getArray(array));
    },
    getBySlug: (slug: string) => {
      if (!state.data || state.data?.translations?.filter((item) => item.slug === slug).length === 0)
        dispatch(action.getBySlug(slug));
    },
    nameRouter: {
      'du-an': 'projects',
      projects: 'projects',
      'tin-tuc': 'news',
      news: 'news',
    } as any,
  };
};
export class Post extends CommonEntity {
  constructor(
    public type?: string,
    public thumbnailUrl?: string,
    public createdAt?: string,
    public updatedAt?: string,
    public translations?: {
      language: string;
      name: string;
      description?: string;
      slug: string;
      content?: {
        blocks: Record<string, object>[];
      };
      postId?: string;
      post?: Post;
      createdAt?: string;
      updatedAt?: string;
    }[],
  ) {
    super();
  }
}
