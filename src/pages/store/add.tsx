import React, { Fragment, ReactNode, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { DistrictFacade, ProvinceFacade, StoreFacade, WardFacade } from '@store';
import { Switch } from 'antd';
import { Button } from '@core/button';
import { language, languages } from '@utils';

const Page = () => {
  const { t } = useTranslation();

  const navigate = useNavigate();
  const isReload = useRef(false);

  const storeFace = StoreFacade();
  const { isLoading, queryParams, status, data } = storeFace;
  const param = JSON.parse(queryParams || '{}');
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    storeFace.set({ data: undefined });
    return () => {
      isReload.current && storeFace.get(param);
    };
  }, []);

  useEffect(() => {
    if (status === 'post.fulfilled')
    navigate(`/${lang}${routerLinks('Store')}`)
  }, [status]);

  const handleBack = () =>  navigate(`/${lang}${routerLinks('Store')}`)
 // navigate(`/${lang}${routerLinks('Store')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: any) => {
    storeFace.post(values);
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  return (
    <Fragment>
      <div className='bg-white rounded-xl'>
        <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5'}>{t('titles.Storeinformation')}</div>
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
                rules: [{ type: 'fax', min: 8 , max: 12 }],
              },
            },
            {
              title: '',
              name: 'address',
              formItem: {
                // rules: [{ type: 'required' }],
                render() {
                  return (
                    <h3 className='mb-2.5 text-base text-black font-medium'>{t('store.Store Address')}</h3>
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
                    <div className='text-xl text-teal-900 font-bold mb-2.5'>{t('store.Representative information')}</div>
                  )
                }
              }
            },
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
                rules: [{ type: 'required' },{ type: 'phone', min: 8 , max: 12 }],
              },
            },
            {
              name: 'emailContact',
              title: 'store.Contact Email',
              formItem: {
                col: 4,
                rules: [{ type: 'required' },{ type: 'email' }],
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

          extendFormSwitch=
          {<div className='flex items-center justify-between mb-2.5 '>
            <div className='flex'>
              <div className='text-xl text-teal-900 font-bold mr-6'>{t('store.Connect KiotViet')}</div>
              <Switch onClick={handleClick} />
            </div>
            {isChecked && (
              <Button className='!font-normal' text={t('store.Get branch DS')} />
            )}
          </div>}

          extendForm=
          {isChecked ? () => (
            <Form
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

            />
          )
            :
            undefined
          }

          handSubmit={handleSubmit}
          disableSubmit={isLoading}
          handCancel={handleBack}
        />
      </div>
    </Fragment>
  );
};
export default Page;
