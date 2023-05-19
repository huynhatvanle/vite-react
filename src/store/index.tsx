import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';

import { Action } from './action';
import { Slice, State } from './slice';
import { globalSlice, GlobalFacade, User } from './global';

const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
});

const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};

const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;

export { Action, Slice, User, setupStore, useAppDispatch, useTypedSelector, GlobalFacade };
export type { State };
