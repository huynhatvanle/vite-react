import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';


const name = 'Ward';
const action = {
  ...new Action<Ward>(name),
  getWard: createAsyncThunk(
    name + '/get',
    async (code: string) => await API.get(routerLinks(name, 'api') + '/' + code),
  )
};

export const wardSlice = createSlice(new Slice<Ward>(action));

export const WardFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Ward>),
    get: ({ fullTextSearch, code }: { fullTextSearch: string, code: string }) => dispatch(action.getWard(code)),
  };
};
export class Ward extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,
  ) {
    super();
  }
}
