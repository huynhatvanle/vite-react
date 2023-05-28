import { CheckboxOptionType } from 'antd';

const util = (array?: any[], label = 'name', value = 'id'): CheckboxOptionType[] =>
  array?.length
    ? array.map((item) => ({
        label: item[label],
        value: item[value],
        isLeaf: !item.children,
        children: item.children && util(item.children, label, value),
      }))
    : [];
export default util;
