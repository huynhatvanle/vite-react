import { PayloadAction, createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery } from '@models';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { Message } from '@core/message';

const name = 'CommisionPayment';
const action = {
  ...new Action<CommisionPayment>(name),
  getByIdDiscount: createAsyncThunk(
    name + '/getById',
    async ({ id, keyState = 'isVisible' }: { id: string; keyState: keyof State<CommisionPayment> }) => {
      const data = await API.get<CommisionPayment>(`${routerLinks(name, 'api')}/${id}`);
      return { data, keyState };
    },
  ),
  putPayment: createAsyncThunk(name + '/put', async ({ id, ...values }: CommisionPayment) => {
    const { statusCode, message } = await API.put<CommisionPayment>(`${routerLinks(name, 'api')}/${id}`, values);
    if (message) Message.success({ text: message });
    return statusCode;
  }),
};
export const commisionPaymentSlice = createSlice(new Slice<CommisionPayment>(action));
export const CommisionPaymentFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<CommisionPayment>),
    set: (values: State<CommisionPayment>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<CommisionPayment>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<CommisionPayment> }) =>
      dispatch(action.getByIdDiscount({ id, keyState })),
    post: (values: CommisionPayment) => dispatch(action.post(values)),
    put: (values: CommisionPayment) => dispatch(action.putPayment(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class CommisionPayment extends CommonEntity {
  constructor(public id?: string, public status?: string) {
    super();
  }
}
