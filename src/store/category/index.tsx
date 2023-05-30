import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';
import { CommonEntity, PaginationQuery } from '@models';
import { API, routerLinks } from '@utils';

const name = 'Category';

const action = {
    ...new Action<Category>(name),
    getByIdCategory: createAsyncThunk(
      name + '/getById',
      async (id:string) => {
        const data = await API.get<Category>(`${routerLinks(name, 'api')}/${id}`);
        return { data };
      },
    ),
}

export const categorySlice = createSlice(new Slice<Category>(action));

export const CategoryFacade = () => {
    const dispatch = useAppDispatch();
    return {
        ...(useTypedSelector((state) => state[action.name]) as State<Category>),
        set: (values: State<Category>) => dispatch(action.set(values)),
        get: (params: PaginationQuery<Category>) => dispatch(action.get(params)),
        getById: ({ fullTextSearch, id }: { fullTextSearch: string; id: string;}) =>
            dispatch(action.getByIdCategory(id)),
        post: (values: Category) => dispatch(action.post(values)),
        put: (values: Category) => dispatch(action.put(values)),
        delete: (id: string) => dispatch(action.delete(id)),
    };
};

export class Category extends CommonEntity {
    constructor(
        public id?: string,
        public name?: string,
        public code?: string,
        public isActive?: boolean,
        public isParent?: boolean,
        public createdById?: string,
        public orgId?: string,
        public isKiotViet?: boolean,
        public categoryKiotId?: string,
        public parentId?: string,
    ) {
        super();
    }
}

