import { CheckboxOptionType } from 'antd';
import { DefaultTFuncReturn } from 'i18next';

export class DataTableModel {
  name?: string;
  title?: string | DefaultTFuncReturn;
  tableItem?: TableItem;
}

export class TableItem {
  filter?: TableItemFilter;
  width?: number;
  fixed?: string;
  sorter?: boolean;
  onCell?: () => { style: any; onClick?: any };
  align?: 'left' | 'right' | 'center' | null;
  onClick?: any;
  render?: (text: any, item: any) => JSX.Element | string;
  defaultSortOrder?: string;
  defaultFilteredValue?: string;
}

export class TableItemFilter {
  type?: 'search' | 'checkbox' | 'radio' | 'date';
  list?: TableItemFilterList[];
  get?: TableGet;
  name?: string;
}

export class TableGet {
  facade?: any;
  key?: string;
  method?: string;
  format?: (item: any) => CheckboxOptionType;
  params?: (fullTextSearch: string, value?: any) => any;
}

export class TableItemFilterList {
  label?: string;
  value?: string | number;
}
export class TableRefObject {
  constructor(public onChange: (request?: any) => void, public handleDelete: (id: string) => void) {}
}
