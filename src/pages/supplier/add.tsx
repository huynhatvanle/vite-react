import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';


import { Form } from '@core/form';
import { WardFacade } from '@store/address/ward';
import { ProvinceFacade } from '@store/address/province';
import { DistrictFacade } from '@store/address/district';
import { Supplier, SupplierFacade } from '@store/supplier';
import { language, languages, routerLinks } from '@utils';


const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const supplierFace = SupplierFacade();
  const { isLoading, queryParams, status } = supplierFace;
  const param = JSON.parse(queryParams || '{}');

  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  console.log('statusSupplier', status);

  const data = Supplier;

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Supplier')}`);
        break;
    }
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Supplier')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: any) => {
    supplierFace.post(values);
  };

  return (
    <div>
      <div className={'w-full mx-auto bg-white rounded-xl p-5'}>
        <div className={'text-xl text-teal-900 font-bold block pb-5'}>{t('titles.Supplierinformation')}</div>
        <Form
          values={{ ...data }}
          className="intro-x"
          columns={[
            {
              title: 'supplier.Name',
              name: 'name',
              formItem: {
                rules: [{ type: 'required' }],
                tabIndex: 2,
                col: 6,
              },
            },
            {
              title: 'supplier.Fax',
              name: 'fax',
              formItem: {
                tabIndex: 3,
                col: 6,
              },
            },
            {
              title: '',
              name: 'address',
              formItem: {
                rules: [{ type: 'required' }],
                render() {
                  return <h3 className="mb-2.5 text-base ">{t('supplier.Supplier Address')}</h3>;
                },
              },
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
                  form.resetFields(['districtId', 'wardId']);
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
                  form.resetFields(['wardId']);
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
                  }),
                },
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
                col: 4,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'store.Contact Phone Number',
              name: 'phoneNumber',
              formItem: {
                col: 4,
                rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 12 }],
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
          ]}
          handSubmit={handleSubmit}
          handCancel={handleBack}
          disableSubmit={isLoading}
        />
      </div>
    </div>
  );
};
export default Page;
