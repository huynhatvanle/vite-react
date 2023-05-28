import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { UserRole } from './role';
import { UserTeam } from './team';

const name = 'UserManager';
const action = new Action<Manager>(name);
export const managerSlice = createSlice(new Slice<Manager>(action));

export const ManagerFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Manager>),
    set: (values: State<Manager>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Manager>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Manager> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Manager) => dispatch(action.post(values)),
    put: (values: Manager) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Manager extends CommonEntity {
  constructor(
    public name?: string,
    public avatar?: string,
    public password?: string,
    public email?: string,
    public phoneNumber?: string,
    public dob?: string,
    public description?: string,
    public role?: UserRole,
    public roleId?: string,
    public teams?: UserTeam[],
    public menbers?: User[],
    public positionCode?: string,
    public retypedPassword?: string,
    public dateLeave?: number,
    public dateOff?: number,
    public startDate?: Date,
  ) {
    super();
  }
}
