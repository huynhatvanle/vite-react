import React, { useCallback, useEffect, useRef, useState } from 'react';
import { Form as AntForm, Checkbox, Radio, Switch, Slider, DatePicker as DateAntDesign, FormInstance } from 'antd';
import { useTranslation } from 'react-i18next';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { Upload } from '../upload';
import { Button } from '../button';
import { convertFormValue } from '@utils';
import { FormItem, FormModel } from '@models';
import { GlobalFacade } from '@store';
import { Check, Times } from '@svgs';
import { Chips, SelectTag, Select, TreeSelect, TableTransfer, Password, Mask, Addable, DatePicker, Tab } from './input';

export const Form = ({
  className,
  columns,
  textSubmit = 'components.form.modal.save',
  textCancel = 'components.form.modal.cancel',
  handSubmit,
  handCancel,
  values = {},
  widthLabel,
  checkHidden = false,
  extendForm,
  extendButton,
  idSubmit = 'idSubmit',
  disableSubmit = false,
  formAnt,
}: Type) => {
  const { t } = useTranslation();
  const { formatDate } = GlobalFacade();
  const [_columns, set_columns] = useState<FormModel[]>([]);
  const timeout = useRef<any>();
  const refLoad = useRef(true);
  const [_render, set_render] = useState(false);
  const [forms] = AntForm.useForm();
  const form = formAnt || forms;

  const reRender = () => {
    set_render(!_render);
    refLoad.current = false;
  };

  const handleFilter = useCallback(() => {
    columns = columns.filter((item: any) => !!item && !!item.formItem);

    if (
      JSON.stringify(
        _columns.map(({ name, formItem }: FormModel) => ({
          name,
          formItem: {
            list: formItem?.list?.map(({ value, disabled }: any) => ({ value, disabled })) || [],
            disabled: formItem?.disabled ? formItem?.disabled(values, form) : false,
          },
        })),
      ) !==
      JSON.stringify(
        columns.map(({ name, formItem }: FormModel) => ({
          name,
          formItem: {
            list: formItem?.list?.map(({ value, disabled }: any) => ({ value, disabled })) || [],
            disabled: formItem?.disabled ? formItem?.disabled(values, form) : false,
          },
        })),
      )
    ) {
      set_columns(columns);
    }
  }, [columns, values, _columns]);

  useEffect(() => {
    if (form && refLoad.current) {
      form.resetFields();
      form.setFieldsValue(values);
    }
    refLoad.current = true;
  }, [values]);

  useEffect(() => {
    handleFilter();
  }, [handleFilter, values]);

  const generateInput = (formItem: FormItem, item: FormModel, values: any, name: string, index: number) => {
    switch (formItem.type) {
      case 'hidden':
        return <input type={'hidden'} name={item.name} tabIndex={-1} />;
      case 'tab':
        return <Tab name={item.name} generateForm={generateForm} column={formItem.column} list={formItem.list} />;
      case 'addable':
        return (
          <Addable
            name={item.name}
            column={formItem.column}
            textAdd={formItem.textAdd}
            onAdd={formItem.onAdd}
            isTable={formItem.isTable}
            showRemove={formItem.showRemove}
            idCheck={formItem.idCheck}
            generateForm={generateForm}
            form={form}
          />
        );
      case 'upload':
        return <Upload multiple={!!formItem.mode} />;
      case 'table_transfer':
        return <TableTransfer formItem={formItem} form={form} />;
      case 'password':
        return (
          <Password
            tabIndex={formItem.tabIndex || index}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        );
      case 'textarea':
        return (
          <textarea
            tabIndex={formItem.tabIndex || index}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
            className={classNames(
              'ant-input px-4 py-2.5 w-full rounded-xl text-gray-600 bg-white border border-solid input-description',
              {
                'bg-gray-100 text-gray-400': !!formItem.disabled && formItem.disabled(values, form),
              },
            )}
            rows={4}
            maxLength={1000}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            onChange={(e) => formItem.onChange && formItem.onChange(e.target.value, form, reRender)}
          />
        );
      case 'slider':
        return (
          <Slider
            tooltip={{ formatter: (value = 0) => formItem.sliderMarks && formItem.sliderMarks[value] }}
            max={formItem.max ? formItem.max : 100}
            min={formItem.min ? formItem.min : 0}
            marks={formItem.sliderMarks}
          />
        );
      case 'slider_number':
        return (
          <Slider
            range
            tooltip={{
              formatter: (value) =>
                (value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') : '0') +
                (formItem.symbol ? formItem.symbol : ''),
            }}
            max={formItem.max ? formItem.max : 9999999}
          />
        );
      case 'date':
        return (
          <DatePicker
            tabIndex={formItem.tabIndex || index}
            format={
              !formItem.picker || formItem.picker === 'date'
                ? formatDate + (formItem.showTime ? ' HH:mm' : '')
                : formatDate
            }
            onChange={(date: any) => formItem.onChange && formItem.onChange(date, form, reRender)}
            disabledDate={(current: any) => (formItem.disabledDate ? formItem.disabledDate(current, form) : false)}
            showTime={!!formItem.showTime}
            picker={formItem.picker || 'date'}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
            form={form}
            name={item.name}
            placeholder={t(formItem.placeholder || '') || t('components.form.Select Date') || ''}
          />
        );
      case 'date_range':
        return (
          <DateAntDesign.RangePicker
            onCalendarChange={(date) => {
              form.setFieldValue(
                item.name,
                date?.filter((i) => !!i),
              );
              formItem.onChange &&
                formItem.onChange(
                  date?.filter((i) => !!i),
                  form,
                  reRender,
                );
            }}
            onOpenChange={(open) => {
              if (!open && form.getFieldValue(item.name)?.length < 2) form.resetFields([item.name]);
            }}
            format={formatDate + (formItem.showTime ? ' HH:mm' : '')}
            disabledDate={(current) => (formItem.disabledDate ? formItem.disabledDate(current, form) : false)}
            defaultValue={
              formItem.initialValues && [dayjs(formItem.initialValues.start), dayjs(formItem.initialValues.end)]
            }
            showTime={formItem.showTime}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        );
      case 'checkbox':
        return formItem.list ? (
          <Checkbox.Group
            options={formItem.list}
            onChange={(value) => formItem.onChange && formItem.onChange(value, form, reRender)}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        ) : (
          <Checkbox
            onChange={(value) => formItem.onChange && formItem.onChange(value.target.checked, form, reRender)}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          >
            {formItem.label}
          </Checkbox>
        );
      case 'radio':
        return (
          <Radio.Group
            options={formItem.list}
            optionType={'button'}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
            onChange={({ target }) => formItem.onChange && formItem.onChange(target.value, form, reRender)}
          />
        );
      case 'tag':
        return (
          <SelectTag
            maxTagCount={formItem.maxTagCount || 'responsive'}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            tag={formItem.tag}
            form={form}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        );
      case 'chips':
        return (
          <Chips
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        );
      case 'select':
        return (
          <Select
            tabIndex={formItem.tabIndex || index}
            showSearch={formItem.showSearch}
            maxTagCount={formItem.maxTagCount || 'responsive'}
            onChange={(value: any) => formItem.onChange && formItem.onChange(value, form, reRender)}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            formItem={formItem}
            form={form}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
            get={formItem.get}
          />
        );
      case 'tree_select':
        return (
          <TreeSelect
            formItem={formItem}
            showSearch={formItem.showSearch}
            form={form}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
          />
        );
      case 'switch':
        return (
          <Switch
            checkedChildren={<Check className="h-5 w-5 fill-white" />}
            unCheckedChildren={<Times className="h-5 w-5 fill-white" />}
            defaultChecked={!!values && values[item.name || ''] === 1}
          />
        );
      default:
        // @ts-ignore
        return (
          <Mask
            tabIndex={formItem.tabIndex || index}
            form={form}
            mask={formItem.mask}
            addonBefore={formItem.addonBefore}
            addonAfter={formItem.addonAfter}
            maxLength={formItem.maxLength}
            placeholder={
              t(formItem.placeholder || '') || t('components.form.Enter') + ' ' + t(item.title)!.toLowerCase()
            }
            onBlur={(e: React.FocusEvent<HTMLInputElement, Element>) =>
              formItem.onBlur && formItem.onBlur(e, form, name)
            }
            onChange={(value: any) => formItem.onChange && formItem.onChange(value, form, reRender)}
            disabled={!!formItem.disabled && formItem.disabled(values, form)}
          />
        );
    }
  };
  const generateForm = (item: any, index: number, showLabel = true, name?: string) => {
    if (!!item?.formItem?.condition && !item?.formItem?.condition(values[item.name], form, index, values)) {
      return;
    }
    if (item?.formItem?.render) {
      return item?.formItem?.render(form, values, generateForm, index, reRender);
    }
    if (item.formItem) {
      const rules: any = [];

      if (item.formItem.rules) {
        item.formItem.rules
          .filter((item: any) => !!item)
          .map((rule: any) => {
            switch (rule.type) {
              case 'required':
                if (!rule.message) {
                  rule.message = t('components.form.ruleRequired');
                }
                rules.push({
                  required: true,
                  message: rule.message,
                });
                if (!item.formItem.type) {
                  rules.push({
                    whitespace: true,
                    message: t('components.form.ruleRequired'),
                  });
                }
                break;
              case 'email':
                if (!rule.message) {
                  rule.message = t('components.form.ruleEmail');
                }
                rules.push(() => ({
                  validator(_: any, value: any) {
                    const regexEmail =
                      /^(([^<>()[\]\\.,;:$%^&*\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
                    if (!value || (typeof value === 'string' && regexEmail.test(value.trim()))) {
                      return Promise.resolve();
                    } else if (
                      typeof value === 'object' &&
                      value.length > 0 &&
                      value.filter((item: any) => !regexEmail.test(item)).length === 0
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(rule.message));
                  },
                }));
                break;
              case 'phone':
                rules.push(() => ({
                  validator(_: any, value: any) {
                    if (
                      !value?.trim() ||
                      (value?.trim().length >= rule.min &&
                        value?.trim().length <= rule.max &&
                        /^\+?\d+[-\s]?[0-9]+[-\s]?[0-9]+$/.test(value))
                    ) {
                      return Promise.resolve();
                    }
                    return Promise.reject(t('components.form.rulePhone'));
                  },
                }));
                break;
              case 'min':
                if (!rule.message) {
                  switch (item.formItem.type) {
                    case 'number':
                      rule.message = t('components.form.ruleMin', {
                        min: rule.value,
                      });
                      break;
                    case 'only_number':
                      rule.message = t('components.form.ruleMinNumberLength', {
                        min: rule.value,
                      });
                      break;
                    default:
                      rule.message = t('components.form.ruleMinLength', {
                        min: rule.value,
                      });
                  }
                }
                if (item.formItem.type === 'number') {
                  rules.push(() => ({
                    validator(_: any, value: any) {
                      if (!value || /^0$|^-?[1-9]\d*(\.\d+)?$/.test(value)) {
                        if (/^0$|^-?[1-9]\d*(\.\d+)?$/.test(value)) {
                          if (parseFloat(value) < rule.value) {
                            return Promise.reject(new Error(rule.message));
                          }
                        }
                      }
                      return Promise.resolve();
                    },
                  }));
                } else {
                  rules.push({
                    type: item.formItem.type === 'number' ? 'number' : 'string',
                    min: rule.value,
                    message: rule.message,
                  });
                }

                break;
              case 'max':
                if (!rule.message) {
                  switch (item.formItem.type) {
                    case 'number':
                      rule.message = t('components.form.ruleMax', {
                        max: rule.value,
                      });
                      break;
                    case 'only_number':
                      rule.message = t('components.form.ruleMaxNumberLength', {
                        max: rule.value,
                      });
                      break;
                    default:
                      rule.message = t('components.form.ruleMaxLength', {
                        max: rule.value,
                      });
                  }
                }
                if (item.formItem.type === 'number') {
                  rules.push(() => ({
                    validator(_: any, value: any) {
                      if (!value || /^0$|^-?[1-9]\d*(\.\d+)?$/.test(value)) {
                        if (/^0$|^-?[1-9]\d*(\.\d+)?$/.test(value)) {
                          if (parseFloat(value) > rule.value) {
                            return Promise.reject(new Error(rule.message));
                          }
                        }
                      }
                      return Promise.resolve();
                    },
                  }));
                } else {
                  rules.push({
                    type: item.formItem.type === 'number' ? 'number' : 'string',
                    max: rule.value,
                    message: rule.message,
                  });
                }

                break;
              case 'url':
                if (!rule.message) {
                  rule.message = t('components.form.incorrectPathFormat');
                }
                rules.push({
                  type: 'url',
                  message: rule.message,
                });
                break;
              case 'only_text':
                if (!rule.message) {
                  rule.message = t('components.form.only text');
                }
                rules.push(() => ({
                  validator(_: any, value: any) {
                    if (!value || /^[A-Za-z]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(rule.message));
                  },
                }));
                break;
              case 'only_text_space':
                if (!rule.message) {
                  rule.message = t('components.form.only text');
                }
                rules.push(() => ({
                  validator(_: any, value: any) {
                    if (!value || /^[a-zA-Z ]+$/.test(value)) {
                      return Promise.resolve();
                    }
                    return Promise.reject(new Error(rule.message));
                  },
                }));
                break;
              case 'custom':
                rules.push(rule.validator);
                break;
              default:
            }
            return rule;
          });
      }
      switch (item.formItem.type) {
        case 'number':
          rules.push(() => ({
            validator(_: any, value: any) {
              if (!value || (/^-?[1-9]*\d+(\.\d{1,2})?$/.test(value) && parseInt(value) < 1000000000)) {
                return Promise.resolve();
              }
              return Promise.reject(t('components.form.only number'));
            },
          }));
          break;
        case 'password':
          rules.push(() => ({
            validator: async (rule: any, value: any) => {
              if (value) {
                let min = 0;
                rules.forEach((item: any) => item.min && (min = item.min));
                if (value?.trim().length > min) {
                  if (/^(?!.* )(?=.*\d)(?=.*[A-Z]).*$/.test(value)) return Promise.resolve();
                }
                return Promise.reject(t('components.form.rulePassword'));
              } else return Promise.resolve();
            },
          }));
          break;
        case 'only_number':
          rules.push(() => ({
            validator(_: any, value: any) {
              if (!value || /^[0-9]+$/.test(value)) {
                return Promise.resolve();
              }
              return Promise.reject(t('components.form.only number'));
            },
          }));
          break;
        default:
      }
      const otherProps: any = {
        key: index,
        label: showLabel && t(item.title),
        name: name || item.name,
        labelAlign: 'left',
        validateTrigger: 'onBlur',
      };
      if (rules.length) {
        otherProps.rules = rules;
      }
      if (widthLabel) {
        otherProps.labelCol = { flex: widthLabel };
      }

      if (item.formItem.type === 'switch' || item.formItem.type === 'checkbox') {
        otherProps.valuePropName = 'checked';
      }
      if (item.formItem.type === 'hidden') {
        otherProps.hidden = true;
      }
      if (item.formItem.type === 'select' || item.formItem.type === 'upload') {
        otherProps.validateTrigger = 'onChange';
      }

      return item.formItem.type !== 'addable' ? (
        <AntForm.Item {...otherProps}>
          {generateInput(item.formItem, item, values, otherProps.name, index)}
        </AntForm.Item>
      ) : (
        generateInput(item.formItem, item, values, otherProps.name, index)
      );
    }
    return null;
  };

  const handFinish = (values: any) => {
    values = convertFormValue(columns, values);
    handSubmit && handSubmit(values);
  };

  return (
    <AntForm
      className={className}
      form={form}
      layout={!widthLabel ? 'vertical' : 'horizontal'}
      onFinishFailed={(failed) =>
        failed?.errorFields?.length && form?.scrollToField(failed?.errorFields[0].name, { behavior: 'smooth' })
      }
      onFinish={handFinish}
      initialValues={convertFormValue(columns, values, false)}
      onValuesChange={async (objValue) => {
        if (form && checkHidden) {
          clearTimeout(timeout.current);
          timeout.current = setTimeout(async () => {
            for (const key in objValue) {
              if (Object.prototype.hasOwnProperty.call(objValue, key)) {
                columns.filter((_item: any) => _item.name === key);
              }
            }
            refLoad.current = false;
            set_columns(columns);
            await handleFilter();
          }, 500);
        }
      }}
    >
      <div
        className={
          'sm:col-span-1 sm:col-span-2 sm:col-span-3 sm:col-span-4 sm:col-span-5 sm:col-span-6 sm:col-span-7 sm:col-span-8 sm:col-span-9 sm:col-span-10 sm:col-span-11 sm:col-span-12' +
          'lg:col-span-1 lg:col-span-2 lg:col-span-3 lg:col-span-4 lg:col-span-5 lg:col-span-6 lg:col-span-7 lg:col-span-8 lg:col-span-9 lg:col-span-10 lg:col-span-11 lg:col-span-12 hidden'
        }
      />
      <div className={'group-input'}>
        <div className={'grid gap-x-5 grid-cols-12'}>
          {_columns.map(
            (column: any, index: number) =>
              (!column?.formItem?.condition ||
                !!column?.formItem?.condition(values[column.name], form, index, values)) && (
                <div
                  className={classNames(
                    column?.formItem?.classItem,
                    'col-span-12' +
                      (' sm:col-span-' +
                        (column?.formItem?.colTablet
                          ? column?.formItem?.colTablet
                          : column?.formItem?.col
                          ? column?.formItem?.col
                          : 12)) +
                      (' lg:col-span-' + (column?.formItem?.col ? column?.formItem?.col : 12)),
                  )}
                  key={index}
                >
                  {generateForm(column, index)}
                </div>
              ),
          )}
        </div>

        {extendForm && extendForm(values)}
      </div>

      <div
        className={classNames('gap-2 flex mt-5', {
          'justify-center': !extendButton && !handCancel,
          'md:inline-flex md:float-right': extendButton || handCancel,
        })}
      >
        {handCancel && (
          <Button
            text={t(textCancel)}
            className={'md:min-w-[12rem] w-full justify-center out-line'}
            onClick={handCancel}
          />
        )}
        {extendButton && extendButton(form)}
        {handSubmit && (
          <Button
            text={t(textSubmit)}
            id={idSubmit}
            onClick={() => form && form.submit()}
            disabled={disableSubmit}
            className={'md:min-w-[12rem] w-full justify-center'}
            type={'submit'}
          />
        )}
      </div>
    </AntForm>
  );
};
type Type = {
  className?: string;
  columns: FormModel[];
  textSubmit?: string;
  textCancel?: string;
  handSubmit?: (values: any) => void;
  handCancel?: () => void;
  values?: any;
  formAnt?: FormInstance;
  onFirstChange?: () => void;
  widthLabel?: string;
  checkHidden?: boolean;
  extendForm?: (values: any) => JSX.Element;
  extendButton?: (values: any) => JSX.Element;
  idSubmit?: string;
  disableSubmit?: boolean;
};
