import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { API, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery, Responses } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';

const name = 'Tax';

const action = { ...new Action<Tax>(name), }

export const taxSlice = createSlice(new Slice<Tax>(action));

export const TaxFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Tax>),
        set: (values: State<Tax>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Tax>) => dispatch(action.get(params)),
        post: (values: Tax) => dispatch(action.post(values)),
        put: (values: Tax) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class Tax extends CommonEntity {
    constructor(
        public id?: string,
        public name?: string,
        public descripton?: string,
        public orgId?: string,
    ) {
        super();
    }
}
