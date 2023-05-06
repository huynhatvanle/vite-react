import React, { useState, useEffect } from 'react';
import { FormInstance, Select } from 'antd';

import { TableGet } from '@models';
import { cleanObjectKeyNull } from '@utils';

const Component = ({
  formItem,
  form,
  value,
  showSearch = true,
  maxTagCount,
  onChange,
  placeholder,
  disabled,
  tabIndex,
  get,
  ...prop
}: Type) => {
  const [_list, set_list] = useState(formItem.list ? formItem.list : []);
  const facade = get?.facade() || {};
  const list = !get ? _list : facade?.result?.data?.map(get.format).filter((item: any) => !!item.value);
  const loadData = async (fullTextSearch: string) => {
    if (get) {
      const { time, queryParams } = facade;
      const params = cleanObjectKeyNull(
        get.params ? get.params(fullTextSearch, form.getFieldValue) : { fullTextSearch },
      );
      if (!facade?.result.data || new Date().getTime() > time || JSON.stringify(params) != queryParams)
        facade.get(params);
    } else if (formItem.list) {
      set_list(
        formItem.list.filter(
          (item: any) =>
            !item?.label?.toUpperCase || item?.label?.toUpperCase().indexOf(fullTextSearch.toUpperCase()) > -1,
        ),
      );
    }
  };

  useEffect(() => {
    if (!facade?.isLoading) {
      loadData('');
    }
  }, []);

  return (
    <Select
      tabIndex={tabIndex}
      maxTagCount={maxTagCount}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      {...prop}
      listHeight={200}
      filterOption={false}
      showSearch={showSearch}
      allowClear
      // onBlur={() => loadData('')}
      onSearch={(value) => loadData(value)}
      value={value}
      maxTagPlaceholder={(array) => '+' + array.length}
      mode={formItem.mode}
      optionFilterProp="label"
      onSelect={(value) => formItem?.onSelect && formItem?.onSelect(value, form)}
    >
      {formItem &&
        list?.map((item: any, index: number) => (
          <Select.Option key={`${item.value}${index}`} value={item.value} disabled={item.disabled}>
            {item.label}
          </Select.Option>
        ))}
    </Select>
  );
};
type Type = {
  formItem: any;
  form: FormInstance;
  value?: any;
  showSearch?: boolean;
  maxTagCount: number | 'responsive';
  onChange: (e: any) => any;
  placeholder: string;
  disabled: boolean;
  tabIndex: number;
  get?: TableGet;
};
export default Component;
