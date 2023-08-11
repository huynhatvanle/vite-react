import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { Code } from '../';

const name = 'CodeType';
const action = new Action<CodeType>(name);
export const codeTypeSlice = createSlice(new Slice<CodeType>(action, { keepUnusedDataFor: 9999 }));
export const CodeTypeFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<CodeType>),
    set: (values: State<CodeType>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<CodeType>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<CodeType> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: CodeType) => dispatch(action.post(values)),
    put: (values: CodeType) => dispatch(action.put(values)),
    putDisable: (values: { id: string; disable: boolean }) => dispatch(action.putDisable(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class CodeType extends CommonEntity {
  constructor(
    public name: string = '',
    public code: string = '',
    public isPrimary: boolean = false,
    public createdAt?: string,
    public updatedAt?: string,
    public items?: Code[],
  ) {
    super();
  }
}
