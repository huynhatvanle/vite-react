import { createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State } from '@store';


const name = 'Page';
const action = new Action<Page>(name);
export const pageSlice = createSlice(new Slice<Page>(action));
export const PageFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Page>),
    set: (values: State<Page>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Page>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Page> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Page) => dispatch(action.post(values)),
    put: (values: Page) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Page extends CommonEntity {
  constructor(
    public name?: string,
    public style?: string,
    public order?: number,
    public parentId?: string,
    public parent?: Page,
    public children?: Page[],
    public translations?: PageTranslation[],
  ) {
    super();
  }
}
export class PageTranslation extends CommonEntity {
  constructor(
    public language?: string,
    public title?: string,
    public slug?: string,
    public seoDescription?: string,
    public content?: Record<string, any>,
    public pageId?: string,
    public page?: Page,
  ) {
    super();
  }
}
