import { createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Province';
const action = {
  ...new Action<Province>(name),
};
export const provinceSlice = createSlice(new Slice<Province>(action));
export const ProvinceFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Province>),
    get: (params: PaginationQuery<Province>) => dispatch(action.get(params)),
  };
};
export class Province extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
  ) {
    super();
  }
}
