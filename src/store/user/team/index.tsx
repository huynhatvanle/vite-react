import { createSlice } from '@reduxjs/toolkit';
import { useAppDispatch, useTypedSelector, Action, Slice, State, User } from '@store';
import { CommonEntity, PaginationQuery } from '@models';

const name = 'UserTeam';
const action = new Action<UserTeam>(name);
export const userTeamSlice = createSlice(new Slice<UserTeam>(action));

export const UserTeamFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<UserTeam>),
    set: (values: State<UserTeam>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<UserTeam>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<UserTeam> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: UserTeam) => dispatch(action.post(values)),
    put: (values: UserTeam) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class UserTeam extends CommonEntity {
  constructor(
    public name?: string,
    public description?: string,
    public managerId?: string[],
    public manager?: User,
    public users?: User[],
  ) {
    super();
  }
}
