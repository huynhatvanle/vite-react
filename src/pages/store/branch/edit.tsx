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
    const name = forms.getFieldValue('name')
    const fax = forms.getFieldValue('fax')
    const provinceId = forms.getFieldValue('provinceId')
    const districtId = forms.getFieldValue('districtId')
    const wardId = forms.getFieldValue('wardId')
    const street = forms.getFieldValue('street')
    const storeId = id ? id : '';
    const isStore = storeId
    storeFace.put({ ...values, connectKiot, isStore, id, name, fax, provinceId, districtId, wardId, street });
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
        values={{ ...data }}
        className="intro-x form-store2"
        columns={[
          {
            title: 'store.Name',
            name: 'name',
            formItem: {
              tabIndex: 1,
              col: 6,
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'store.Fax',
            name: 'fax',
            formItem: {
              tabIndex: 2,
              col: 6,
              rules: [{ type: 'phone', min: 8, max: 12 }],
            },
          },
        ]}
      />
      <div><h3 className="text-base font-medium bg-white pl-5 pb-3">{t('store.Store Address')}</h3></div>

      <Form
        formAnt={forms}
        values={{ ...data }}
        className="intro-x form-store1"
        columns={[
          // {
          //   title: '',
          //   name: 'address',
          //   formItem: {
          //     rules: [{ type: 'required' }],
          //     render() {
          //       return (
          //         <h3 className="text-base font-medium mb-3">{t('store.Store Address')}</h3>
          //       );
          //     },
          //   },
          // },
          {
            title: 'store.Province',
            name: 'provinceId',
            formItem: {
              tabIndex: 3,
              col: 3,
              type: 'select',
              rules: [{ type: 'required' }],
              get: {
                facade: ProvinceFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id + '|' + item.code,
                }),
              },
              onChange(value, form) {
                form.resetFields(['districtId', 'wardId'])
              },
            },
          },
          {
            name: 'districtId',
            title: 'store.District',
            formItem: {
              type: 'select',
              rules: [{ type: 'required' }],
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
                form.resetFields(['wardId'])
              },
            },
          },
          {
            name: 'wardId',
            title: 'store.Ward',
            formItem: {
              type: 'select',
              rules: [{ type: 'required' }],
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
                })
              }
            },
          },
          {
            name: 'street',
            title: 'store.Street',
            formItem: {
              rules: [{ type: 'required' }],
              col: 3,
            },
          }
        ]}
      />
      <div className='bg-white text-lg text-teal-900 font-bold px-5 pb-2.5'>{t('store.Representative information')}</div>
      <Form
        formAnt={forms}
        values={{
          ...data,
          emailContact: data?.userRole?.[0].userAdmin?.email,
          phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
          nameContact: data?.userRole?.[0].userAdmin.name,
        }}
        className="intro-x form-responsive form-store3"
        columns={[
          {
            name: 'nameContact',
            title: 'store.ContactName',
            formItem: {
              col: 4,
              type: 'name',
              rules: [{ type: 'required' },],
            },
          },
          {
            name: 'phoneNumber',
            title: 'store.Contact Phone Number',
            formItem: {
              col: 4,
              rules: [{ type: 'required' }, { type: 'phone', min: 8, max: 12 }],
            },
          },
          {
            name: 'emailContact',
            title: 'store.Contact Email',
            formItem: {
              col: 4,
              rules: [{ type: 'required' }, { type: 'email' }],
            },
          },
          {
            name: 'note',
            title: 'store.Note',
            formItem: {
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
                  text: 'Bạn có chắc hủy kích hoạt chi nhánh này ?',
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
                  text: 'Bạn có chắc muốn kích hoạt chi nhánh này ?',
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
      />


    </Fragment>
  );
};
export default Page;
