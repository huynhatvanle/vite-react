import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Supplier, SupplierFacade } from '@store/supplier';
import { Form } from '@core/form';
import { routerLinks } from '@utils';
import { ProvinceFacade } from '@store/address/province';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const supplierFace = SupplierFacade();
  const { isLoading, queryParams, status } = supplierFace;
  const param = JSON.parse(queryParams || '{}');


  console.log("statusSupplier", status);


  const data = Supplier;

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('Supplier'));
        break;
    }
  }, [status]);


  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
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
                tabIndex: 2,
                col: 6,
                rules: [{ type: 'required', message: 'Xin vui lòng nhập tên nhà cung cấp' }],
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
                  return (
                    <h3 className='mb-2.5 text-base '>Địa chỉ nhà cung cấp </h3>
                  )
                },
              }
            },
            {
              title: 'supplier.ProvinceId',
              name: 'provinceId',
              formItem: {
                tabIndex: 3,
                col: 3,
                type: 'select',
                rules: [{ type: 'required', message: 'Xin vui lòng chọn tỉnh/thành phố' }],
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
              title: 'supplier.DistrictId',
              name: 'districtId',
              formItem: {
                type: 'select',
                rules: [{ type: 'required', message: 'Xin vui lòng chọn quận/huyện' }],
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
              title: 'supplier.WardId',
              name: 'wardId',
              formItem: {
                type: 'select',
                rules: [{ type: 'required', message: 'Xin vui lòng chọn phường/xã' }],
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
              title: 'supplier.Street',
              name: 'street',
              formItem: {
                rules: [{ type: 'required', message: 'Xin vui lòng nhập địa chỉ cụ thể' }],
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
              title: 'supplier.NameContact',
              name: 'nameContact',
              formItem: {
                col: 4,
                rules: [{ type: 'required', message: 'Xin vui lòng nhập họ và tên đại diện' }],
              },
            },
            {
              title: 'supplier.PhonenumberContact',
              name: 'phoneNumber',
              formItem: {
                col: 4,
                rules: [{ type: 'required', message: 'Xin vui lòng nhập số điện thoại đại diện' }],
              },
            },
            {
              title: 'supplier.EmailContact',
              name: 'emailContact',
              formItem: {
                col: 4,
                rules: [{ type: 'required', message: 'Xin vui lòng nhập email đại diện' }],
              },
            },
            {
              title: 'supplier.Note',
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
