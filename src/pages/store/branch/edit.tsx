import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Form as AntForm, Switch } from 'antd';

import { Form } from '@core/form';
import { Button } from '@core/button';
import { routerLinks, language, languages } from '@utils';
import { DistrictFacade, ProvinceFacade, StoreFacade, WardFacade } from '@store';
import { Message } from '@core/message';

const Page = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isReload = useRef(false);
  const isBack = useRef(true);
  const storeFace = StoreFacade();
  const { isLoading, queryParams, status, data, putbranchtrue, putbranchfalse } = storeFace;
  const param = JSON.parse(queryParams || '{}');
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const [forms] = AntForm.useForm();

  const { id } = useParams();

  useEffect(() => {
    if (id) storeFace.getById({ id });

    return () => {
      isReload.current && storeFace.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=3`)
        break;
      case 'putbranchtrue.fulfilled':
        navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}`)
        break;
      case 'putbranchfalse.fulfilled':
        navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}`)
        break;
    }
  }, [status]);


  const handleBack = () => navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=3`)
  // navigate(`/${lang}${routerLinks('Store')}?${new URLSearchParams(param).toString()}`);

  const handleSubmit = (values: any) => {
    const connectKiot = forms.getFieldsValue()
    const storeId = id ? id : '';
    const isStore = storeId
    storeFace.put({ ...values, connectKiot, isStore, id });
  };


  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Fragment>
      <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 bg-white rounded-t-2xl'}>{t('titles.Storeinformation')}</div>
      <Form
        formAnt={forms}
        values={{
          ...data,
          emailContact: data?.userRole?.[0].userAdmin?.email,
          phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
          nameContact: data?.userRole?.[0].userAdmin.name,
        }}
        className="intro-x form-responsive"
        columns={[
          {
            title: 'store.Code',
            name: 'code',
            formItem: {
              tabIndex: 1,
              col: 4,
              disabled: () => true,
            },
          },
          {
            title: 'store.Name',
            name: 'name',
            formItem: {
              tabIndex: 2,
              col: 4,
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'store.Fax',
            name: 'fax',
            formItem: {
              tabIndex: 3,
              col: 4,
              rules: [{ type: 'phone', min: 8, max: 12 }],
            },
          },
          {
            title: '',
            name: 'address',
            formItem: {
              rules: [{ type: 'required' }],
              render() {
                return (
                  <h3 className="mb-2.5 text-base text-black font-medium">{t('store.Store Address')}</h3>
                );
              },
            },
          },
          {
            title: 'store.Province',
            name: 'provinceId',
            formItem: {
              firstLoad: () => ({}),
              tabIndex: 4,
              col: 3,
              rules: [{ type: 'requiredSelect' }],
              type: 'select',
              get: {
                facade: ProvinceFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id + '|' + item.code,
                }),
              },
              onChange(value, form) {
                form.resetFields(['districtId', 'wardId']);
              },
            },
          },
          {
            title: 'store.District',
            name: 'districtId',
            formItem: {
              firstLoad: () => ({ fullTextSearch: '', code: `${data?.address?.province?.code}` }),
              type: 'select',
              rules: [{ type: 'requiredSelect' }],
              tabIndex: 5,
              col: 3,
              get: {
                facade: DistrictFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id + '|' + item.code,
                }),
                params: (fullTextSearch, value) => ({
                  fullTextSearch,
                  code: value().provinceId.slice(value().provinceId.indexOf('|') + 1),
                }),
              },
              onChange(value, form) {
                form.resetFields(['wardId']);
              },
            },
          },
          {
            title: 'store.Ward',
            name: 'wardId',
            formItem: {
              firstLoad: () => ({ fullTextSearch: '', code: `${data?.address?.district?.code}` }),
              type: 'select',
              rules: [{ type: 'requiredSelect' }],
              tabIndex: 6,
              col: 3,
              get: {
                facade: WardFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
                params: (fullTextSearch, value) => ({
                  fullTextSearch,
                  code: value().districtId.slice(value().districtId.indexOf('|') + 1),
                }),
              },
            },
          },
          {
            title: 'store.Street',
            name: 'street',
            formItem: {
              rules: [{ type: 'required' }],
              tabIndex: 7,
              col: 3,
            },
          },
          {
            title: '',
            name: '',
            formItem: {
              render() {
                return (
                  <div className="text-xl text-teal-900 font-bold mb-2.5">
                    {t('store.Representative information')}
                  </div>
                );
              },
            },
          },
          {
            title: 'store.ContactName',
            name: 'nameContact',
            formItem: {
              tabIndex: 8,
              col: 4,
              type: 'name',
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'store.Contact Phone Number',
            name: 'phoneNumber',
            formItem: {
              tabIndex: 9,
              col: 4,
              rules: [{ type: 'required' }, { type: 'phone', min: 8, max: 12 }],
            },
          },
          {
            title: 'store.Contact Email',
            name: 'emailContact',
            formItem: {
              tabIndex: 10,
              col: 4,
              rules: [{ type: 'required' }, { type: 'email' }],
            },
          },
          {
            name: 'note',
            title: 'store.Note',
            formItem: {
              tabIndex: 11,
              type: 'textarea',
            },
          },
        ]}

        extendForm=
        {(values) => (
          <>
            <div className='sm:flex block items-center justify-between mb-2.5'>
              <div className='flex'>
                <div className='text-xl text-teal-900 font-bold mr-6'>{t('store.Connect KiotViet')}</div>
                <Switch className='mt-1' onClick={handleClick} />
              </div>
              {isChecked && (
                <Button className='!font-normal mt-2 sm:mt-0' text={t('store.Get branch DS')} />
              )}
            </div>
            {isChecked && (
              <Form
                formAnt={forms}
                values={{ ...data }}
                columns={[
                  {
                    title: 'client_id',
                    name: 'clientid',
                    formItem: {
                      tabIndex: 1,
                      col: 6,
                      rules: [{ type: 'required' },],
                    },
                  },
                  {
                    title: 'client_secret',
                    name: 'clientsecret',
                    formItem: {
                      tabIndex: 2,
                      col: 6,
                      rules: [{ type: 'required' },],
                    },
                  },
                  {
                    title: 'retailer',
                    name: 'retailer',
                    formItem: {
                      tabIndex: 1,
                      col: 6,
                      rules: [{ type: 'required' },],
                    },
                  },
                  {
                    title: 'branchId',
                    name: 'branchid',
                    formItem: {
                      tabIndex: 2,
                      col: 6,
                      rules: [{ type: 'required' },],
                    },
                  },
                ]} />
            )}
          </>
        )}
        extendButton={(form) => (
          <div className='flex gap-2 !w-full justify-between sm:flex-row  flex-col text-center items-center'>
            <Button
              text={'Trở về'}
              className={'sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
              onClick={handleBack}
            />
            {storeFace?.data?.isActive ? (
              <Button
                text={t('components.button.CancelAction')}
                className={'md:min-w-[8rem] justify-center !bg-red-500 max-sm:w-3/5'}
                onClick={() => Message.confirm({
                  text: 'Bạn có chắc muốn kích hoạt chi nhánh này ?',
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '',
                  showCloseButton: true,
                  showCancelButton: true,
                  showConfirmButton: true,
                  onConfirm: () => {
                    (putbranchfalse({ id: data?.id }), navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=3`))
                  },
                })}
              />
            ) : (
              <Button
                text={t('components.button.Action')}
                className={'md:min-w-[8rem] justify-center !bg-yellow-500 max-sm:w-3/5 '}//ml-[60rem]
                onClick={() => Message.confirm({
                  text: 'Bạn có chắc hủy kích hoạt chi nhánh này ?',
                  confirmButtonColor: '#d33',
                  cancelButtonColor: '',
                  showCloseButton: true,
                  showCancelButton: true,
                  showConfirmButton: true,
                  onConfirm: () => {
                    (putbranchtrue({ id: data?.id }), navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=3`))
                  },
                })}
              />
            )}
          </div>
        )}
        handSubmit={handleSubmit}
        disableSubmit={isLoading}
      // handCancel={handleBack}
      />
    </Fragment>
  );
};
export default Page;
