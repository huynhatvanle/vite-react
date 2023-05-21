import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { DistrictFacade, ProvinceFacade, StoreFacade, WardFacade, StoreManagement } from '@store';
import { Switch } from 'antd';

const Page = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isReload = useRef(false);

  const data = StoreManagement

  const storeFace = StoreFacade();
  const { isLoading, queryParams } = storeFace;
  const param = JSON.parse(queryParams || '{}');
  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    storeFace.post(values);
  };

  return (
    <Fragment>
      <div className='bg-white rounded-xl p-4'>
        <div className={'text-xl text-teal-900 font-bold block pb-5'}>{t('titles.Storeinformation')}</div>
        <Form
          values={{ ...data }}
          className="intro-x"
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
              },
            },
            {
              title: '',
              name: 'address',
              formItem: {
                rules: [{ type: 'required' }],
                render() {
                  return (
                    <h3 className='mb-2.5 text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                  )
                },
              }
            },
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
              title: 'store.District',
              name: 'districtId',
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
              title: 'store.Ward',
              name: 'wardId',
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
              title: 'store.Street',
              name: 'street',
              formItem: {
                rules: [{ type: 'required' }],
                col: 3,
              },
            },
            {
              title: '',
              name: '',
              formItem: {
                render() {
                  return (
                    <div className='text-xl text-teal-900 font-bold mb-2.5'>Thông tin người đại diện</div>
                  )
                }
              }
            },
            {
              title: 'store.ContactName',
              name: 'nameContact',
              formItem: {
                col: 4,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'store.Contact Phone Number',
              name: 'phoneNumber',
              formItem: {
                col: 4,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'store.Contact Email',
              name: 'emailContact',
              formItem: {
                col: 4,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'store.Note',
              name: 'note',
              formItem: {
                type: 'textarea',
              },
            },
            {
              title: '',
              name: '',
              formItem: {
                render() {
                  return (
                    <div className='flex items-center mb-2.5'>
                      <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
                      <Switch className='bg-gray-500' />
                    </div>
                  )
                }
              }
            },

          ]}
          handSubmit={handleSubmit}
          disableSubmit={isLoading}
          handCancel={handleBack}
        />
        {/* )} */}
      </div>
    </Fragment>
  );
};
export default Page;
