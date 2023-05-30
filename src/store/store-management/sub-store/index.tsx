import { createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'SubStore';

const action = new Action<SubStore>(name);

export const subStoreSlice = createSlice(new Slice<SubStore>(action));

export const SubStoreFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<SubStore>),
    set: (values: State<SubStore>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<SubStore>) => dispatch(action.get(params)),
  };
};

export class SubStore extends CommonEntity {
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

