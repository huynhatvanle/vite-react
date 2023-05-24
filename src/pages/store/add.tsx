import React, { Fragment, useEffect, useRef, useState } from 'react';
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

  // const provinceFacade = ProvinceFacade()
  // const { result } = provinceFacade

  // const districtFacade = DistrictFacade()
  // const wardFacade = WardFacade()


  const storeFace = StoreFacade();
  const { isLoading, queryParams, status, data } = storeFace;
  const param = JSON.parse(queryParams || '{}');

  useEffect(() => {
    storeFace.set({ data: undefined });
    return () => {
      isReload.current && storeFace.get(param);
    };
  }, []);

  useEffect(() => {
    if (status === 'post.fulfilled')
      navigate(routerLinks('Store'))
  }, [status]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());

  const handleSubmit = (values: any) => {
    storeFace.post(values);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };
  console.log(isChecked)

  return (
    <div className={'w-full mx-auto bg-white rounded-xl'}>
      <div className='text-xl text-teal-900 px-5 pt-3.5 font-bold bg-white w-max rounded-t-2xl'>
        Thông tin cửa hàng
      </div>
      <div className='bg-white'>
        {/* {!!result?.data && */}
        <Form
          values={{ ...data }}
          columns={[
            {
              title: 'store.Name',
              name: 'name',
              formItem: {
                tabIndex: 1,
                col: 6,
                rules: [{ type: 'required' },],
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
                rules: [{ type: 'requiredSelect' }],
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
                  rules: [{ type: 'requiredSelect' }],
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
                  rules: [{ type: 'requiredSelect' }],
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
                  rules: [{ type: 'requiredSelect' }],
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
                name: 'nameContact',
                title: 'store.ContactName',
                formItem: {
                  col: 4,
                  rules: [{ type: 'required' }],
                },
              },
              {
                name: 'phoneNumber',
                title: 'store.Contact Phone Number',
                formItem: {
                  col: 4,
                  rules: [{ type: 'required' }],
                },
              },
              {
                name: 'emailContact',
                title: 'store.Contact Email',
                formItem: {
                  col: 4,
                  rules: [{ type: 'required' }],
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
          />
          <div className='flex items-center mb-2.5  '>
            <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
            <Switch onClick={handleClick} className='' />
          </div>
            {isChecked ?
              (<Form
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
                ]}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />)
              :
              (<Form
                values={{ ...data }}
                columns={[]}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />)
            }
      </div>
    </div>
  );
};
export default Page;
