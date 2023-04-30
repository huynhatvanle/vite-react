import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';
import { userSlice, UserFacade } from './user';
import { userRoleSlice, UserRoleFacade, UserRole } from './user/role';
import { codeSlice, CodeFacade, Code } from './code';
import { codeTypeSlice, CodeTypeFacade } from './code/type';
import { dataSlice, DataFacade } from './data';
import { dataTypeSlice, DataTypeFacade } from './data/type';
import { userTeamSlice, UserTeamFacade } from './user/team';
import { dayoffSlice, DayoffFacade } from './dayoff';
import { managerSlice, ManagerFacade } from './user/manager';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [codeSlice.name]: codeSlice.reducer,
  [codeTypeSlice.name]: codeTypeSlice.reducer,
  [dataSlice.name]: dataSlice.reducer,
  [dataTypeSlice.name]: dataTypeSlice.reducer,
  [userTeamSlice.name]: userTeamSlice.reducer,
  [dayoffSlice.name]: dayoffSlice.reducer,
  [managerSlice.name]: managerSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export {
  Action,
  Slice,
  User,
  UserRole,
  Code,
  setupStore,
  useAppDispatch,
  useTypedSelector,
  GlobalFacade,
  UserFacade,
  UserRoleFacade,
  CodeFacade,
  CodeTypeFacade,
  DataFacade,
  DataTypeFacade,
  UserTeamFacade,
  DayoffFacade,
  ManagerFacade,
};
export type { State };
