import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'District';
const action = {
  ...new Action<District>(name),
  getDistrict: createAsyncThunk(
    name + '/get',
    async (code: string) => await API.get(routerLinks(name, 'api') + '/' + code)
  )
};

export const districtSlice = createSlice(new Slice<District>(action));

export const DistrictFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<District>),
    get: ({ fullTextSearch, code }: { fullTextSearch: string, code: string }) => dispatch(action.getDistrict(code)),
  };
};
export class District extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public name?: string,

  ) {
    super();
  }
}
