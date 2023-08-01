import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Form as AntForm } from 'antd';

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

  const [forms] = AntForm.useForm();

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
    const name = forms.getFieldValue('name');
    const fax = forms.getFieldValue('fax');
    const provinceId = forms.getFieldValue('provinceId');
    const districtId = forms.getFieldValue('districtId');
    const wardId = forms.getFieldValue('wardId');
    const street = forms.getFieldValue('street');
    supplierFace.post({ ...values, name, fax, provinceId, districtId, wardId, street });
  };

  return (
    <div className={''}>
      <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 bg-white rounded-t-2xl'}>
        {t('titles.Supplierinformation')}
      </div>

      <Form
        formAnt={forms}
        values={{ ...data }}
        className="intro-x form-store2"
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
              rules: [{ type: 'phone', min: 8, max: 12 }],
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
        ]}
      />
      <Form
        formAnt={forms}
        values={{ ...data }}
        className="intro-x form-store1"
        columns={[
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
                  <div className="text-lg text-teal-900 font-bold mb-2.5">{t('store.Representative information')}</div>
                );
              },
            },
          },
        ]}
      />
      <div className="bg-white">
        <Form
          formAnt={forms}
          values={{ ...data }}
          className="intro-x form-responsive form-store3"
          columns={[
            {
              title: 'store.ContactName',
              name: 'nameContact',
              formItem: {
                col: 4,
                type: 'name',
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
                rules: [{ type: 'required' }, { type: 'email' }],
              },
            },
          ]}
          disableSubmit={isLoading}
        />
      </div>
      <Form
        formAnt={forms}
        values={{ ...data }}
        className="intro-x"
        columns={[
          {
            title: 'store.Note',
            name: 'note',
            formItem: {
              col: 12,
              type: 'textarea',
              rules: [{ type: 'textarea' }],
            },
          },
        ]}
        handSubmit={handleSubmit}
        handCancel={handleBack}
        disableSubmit={isLoading}
      />
    </div>
  );
};
export default Page;
