import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Post } from '../';

const name = 'PostType';
const action = new Action<PostType>(name);
export const postTypeSlice = createSlice(new Slice<PostType>(action, { keepUnusedDataFor: 9999 }));
export const PostTypeFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<PostType>),
    set: (values: State<PostType>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<PostType>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<PostType> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: PostType) => dispatch(action.post(values)),
    put: (values: PostType) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class PostType extends CommonEntity {
  constructor(
    public name: string,
    public code: string,
    public isPrimary?: boolean,
    public createdAt?: string,
    public updatedAt?: string,
    public items?: Post[],
  ) {
    super();
  }
}
