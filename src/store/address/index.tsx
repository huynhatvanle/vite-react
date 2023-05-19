import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { API, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity } from '@models';

const name = 'Province';
export const action = {
  ...new Action<Province>(name),
  getProvince: createAsyncThunk(
    name + '/get',
    async (code: string) => await API.get(routerLinks(name, 'api'), code),
  ),
  // getDistrict: createAsyncThunk(
  //     'District' + '/get',
  //     async (provinceCode: string) => await API.get(`${routerLinks('District', 'api')}/${provinceCode}`)
  // ),
  // getWard: createAsyncThunk(
  //     name + '/get',
  //     async (districCode: string) => await API.get(`${routerLinks(name, 'api')}/${districCode}`),
  // )
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
//     constructor(
//         public id?: string,
//         public code?: string,
//         public name?: string,
//         public provinceCode?: string,
//     ) {
//         super();
//     }
// }
// export class Ward extends CommonEntity {
//     constructor(
//         public id?: string,
//         public code?: string,
//         public name?: string,
//         public districtCode?: string,
//     ) {
//         super();
//     }
// }
