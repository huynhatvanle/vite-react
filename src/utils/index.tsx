import { CheckboxOptionType } from 'antd';
import { language, languages } from './variable';

export * from './init/reportWebVitals';
export * from './api';
export * from './variable';
export * from '../router-links';
export * from './convertFormValue';

export const cleanObjectKeyNull = (obj: { [selector: string]: any }) => {
  for (const propName in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, propName)) {
      if (
        obj[propName] === null ||
        obj[propName] === undefined ||
        (typeof obj[propName] === 'object' && Object.keys(obj[propName]).length === 0)
      ) {
        delete obj[propName];
      } else if (typeof obj[propName] === 'object') {
        const keys = Object.keys(obj[propName]);
        let check = true;
        keys.forEach((key: string) => {
          if (check && obj[propName][key] !== undefined) {
            check = false;
          }
        });
        if (check) {
          delete obj[propName];
        }
      }
    }
  }
  return obj;
};

export const getSizePageByHeight = (height = 39, minusNumber = 3) =>
  Math.floor(
    (document.body.getBoundingClientRect().height -
      document.getElementsByTagName('tbody')[0].getBoundingClientRect().top) /
      height,
  ) - minusNumber;
export const getFilter = (queryParams = '{}', key = 'id') =>
  JSON.parse(JSON.parse(queryParams || '{}').filter || '{}')[key] || null;

export const loopMapSelect = (array?: any[], label = 'name', value = 'id'): CheckboxOptionType[] =>
  array?.length
    ? array.map((item) => ({
        label: item[label],
        value: item[value],
        isLeaf: !item.children.length,
        children: item.children ? loopMapSelect(item.children, label, value) : undefined,
      }))
    : [];

export const lang =
  languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
