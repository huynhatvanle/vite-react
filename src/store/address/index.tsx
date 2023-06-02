import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity } from '@models';
import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';


const name = 'Province';
export const action = {
  ...new Action<Province>(name),
  getProvince: createAsyncThunk(
    name + '/get',
    async (code: string) => await API.get(routerLinks(name, 'api'), code),
  ),
};
export const provinceSlice = createSlice(new Slice<Province>(action));
export const ProvinceFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Province>),
    get: (code: string) => dispatch(action.getProvince(code)),
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
// export class District extends CommonEntity {
//   constructor(
//     public id?: string,
//     public code?: string,
//     public name?: string,
//     public provinceId?: string,
//   ) {
//     super();
//   }
// }
// export class Ward extends CommonEntity {
//   constructor(
//     public id?: string,
//     public code?: string,
//     public name?: string,
//     public districtId?: string,
//   ) {
//     super();
//   }
// }
