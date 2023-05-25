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


  console.log("statusSupplier",status);


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
      <div className={'w-full mx-auto bg-white rounded-xl'}>
        <div className='px-5'>
          <p className='text-xl font-bold text-teal-900 py-4'>
            Thông tin nhà cung cấp
          </p>
        </div>
        <div className='bg-white px-5 rounded-2xl w-full'>
            {/* {!!result?.data && ( */}
              <div className='w-full'>
                <Form
                  values={{ ...data }}
                  className="rounded-lg w-full "
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
                      title: 'store.Fax',
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
                      title: 'store.Province',
                      name: 'provinceId',
                      formItem: {
                        tabIndex: 3,
                        col: 3,
                        type: 'select',
                        rules: [{ type: 'required',message: 'Xin vui lòng chọn tỉnh/thành phố' }],
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
                      name: 'wardId',
                      title: 'store.Ward',
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
                      name: 'street',
                      title: 'store.Street',
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
                      name: 'nameContact',
                      title: 'store.ContactName',
                      formItem: {
                        col: 4,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập họ và tên đại diện' }],
                      },
                    },
                    {
                      name: 'phoneNumber',
                      title: 'store.Contact Phone Number',
                      formItem: {
                        col: 4,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập số điện thoại đại diện' }],
                      },
                    },
                    {
                      name: 'emailContact',
                      title: 'store.Contact Email',
                      formItem: {
                        col: 4,
                        rules: [{ type: 'required', message: 'Xin vui lòng nhập email đại diện' }],
                      },
                    },
                    {
                      name: 'store.Note',
                      title: 'Ghi chú',
                      formItem: {
                        type: 'textarea',
                      },
                    },

                  ]}
                  handSubmit={handleSubmit}
                  handCancel={handleBack}
                  disableSubmit={isLoading}
                  // extendButton={() => (
                  //   <div className='w-full flex mt-8 justify-between'>
                  //     <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                  //     onClick={handleBack}>
                  //       {t('components.form.modal.cancel')}
                  //     </button>
                  //     <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                  //     onClick={handleSubmit}>
                  //       {t('components.form.modal.save')}
                  //     </button>
                  //   </div>
                  // )}
                />
              </div>
            {/* } */}
        </div>
      </div>
      <div className='h-20'>
      </div>
    </div>

  );
};
export default Page;
