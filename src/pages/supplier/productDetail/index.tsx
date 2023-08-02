import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { language, languages, routerLinks } from '@utils';
import { CategoryFacade, ProductFacade, TaxAdminFacade } from '@store';
import { Form } from '@core/form';
import { DownArrow } from '@svgs';
import { Table } from 'antd';
import { Button } from '@core/button';

const Page = () => {
  const { t } = useTranslation();
  const productFacade = ProductFacade();
  const { data, isLoading, queryParams, status } = productFacade;
  const taxAdminFacare = TaxAdminFacade()
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const navigate = useNavigate();

  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    taxAdminFacare.get({ fullTextSearch: '' })
    if (id) {
      productFacade.getById({ id });
    }

    return () => {
      isReload.current && productFacade.get(param);
    };
  }, [id]);

  // const handleBack = () => window.history.back();
  let i = 1;
  let percent = '';
  const dl = data?.productPrice?.flat().map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      PriceType: item?.priceType,
      Quantity: item?.minQuantity.toLocaleString(),
      Price: item?.price.toLocaleString(),
    };
  });
  const handleBack = () => navigate(`/${lang}${routerLinks('inventory-management/product')}?tab=2`)
  const dt = data?.priceBalanceCommission?.flat().map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      Revenue: parseInt(item?.revenue).toLocaleString(),
      AmountBalance: parseInt(item?.amountBalance).toLocaleString(),
    };
  });
  return (
    <div className={'w-full rounded-2xl bg-white'}>
      <Fragment>
        <div className='flex flex-row'>
          <div className='flex-initial mr-5 lg:rounded-xl w-1/4 form-merchandise2'>
            <Form
              values={{
                ...data,
              }}
              className="intro-x text-color"
              columns={[
                {
                  title: '',
                  name: 'id',
                  formItem: {
                    render: (form, values) => {
                      return (
                        <div className="lg:flex w-full">
                          <div className="w-full sm:w-full flex product-detail-left-form">
                            <div className="mb-2">
                              <div className="pr-2 rounded-xl relative warpProductImg">
                                <div className="flex">
                                  <div className="m-auto">
                                    <div className="relative">
                                      <a href={values?.photos?.[0]?.url} className="z-1 relative glightbox w-full">
                                        <img
                                          src={values?.photos?.[0]?.url}
                                          alt="image"
                                          className="!rounded-2xl h-52 w-52 aspect-square object-cover"
                                        ></img>
                                      </a>
                                    </div>
                                  </div>
                                </div>
                                <div className="mt-4">
                                  <div className="flex justify-center gap-2"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Đơn vị cơ bản',
                  name: 'basicUnit',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    render: (form, value) => {
                      return (
                        <div>
                          <div className="mb-2">
                            <label className="" title="Đơn vị cơ bản">
                              Đơn vị cơ bản
                            </label>
                          </div>
                          <div className="mb-4 flex items-center">
                            <input
                              className="w-auto h-10 px-4 ant-input border rounded-xl bg-gray-100 text-gray-400"
                              placeholder="Nhập đơn vị"
                              id="basicUnit"
                              value={value.basicUnit}
                            ></input>
                          </div>
                          <p className="text-xl font-bold text-teal-900 pb-2">Trạng thái sản phẩm</p>
                          <p className="font-normal text-base text-green-600 flex items-center">
                            <i className="las la-tags text-lg mr-2"></i>
                            {
                              value?.approveStatus == 'APPROVED' ? (
                                <div className=" text-center p-1  text-green-600 ">
                                  {t('supplier.status.on sale')}
                                </div>
                              ) : value?.approveStatus == 'WAITING_APPROVE' ? (
                                <div className="text-center p-1 text-yellow-600">
                                  {t('supplier.status.wait for confirm')}
                                </div>
                              ) : value?.approveStatus == 'REJECTED' ? (
                                <div className=" text-center p-1  text-red-600 ">
                                  {t('supplier.status.Decline')}
                                </div>
                              ) : value?.approveStatus == 'OUT_OF_STOCK' ? (
                                <div className="">
                                </div>
                              ) : value?.approveStatus == 'STOP_SELLING' ? (
                                <div className=" text-center p-1 text-red-600 ">
                                  {t('supplier.status.stop selling')}
                                </div>
                              ) : (
                                <div className=" text-center p-1 text-black ">
                                  {t('supplier.status.canceled')}
                                </div>)
                            }
                          </p>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
          </div>
          <div className='flex-initial lg:rounded-xl w-3/4 form-merchandise'>
            <Form
              values={{
                ...data,
                abilitySupply: data?.abilitySupply?.quarter,
                month: data?.abilitySupply?.month,
                year: data?.abilitySupply?.year,
                brand: data?.brand ? data?.brand : '',
              }}
              className="text-color"
              columns={[
                {
                  title: '',
                  name: '',
                  formItem: {
                    col: 12,
                    render: (form, value) => {
                      return (
                        <div>
                          <p className="text-lg sm:text-xl font-bold text-teal-900 pb-4">Tổng quát</p>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Tên sản phẩm',
                  name: 'name',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Thương hiệu',
                  name: 'brand',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Nhà cung cấp',
                  name: 'supplierName',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Xuất xứ',
                  name: 'origin',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Danh mục sản phẩm',
                  name: 'category',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 12,
                    render(form, item) {
                      return (
                        <div className='w-full pb-2'>
                          <div className="mb-2">Danh mục sản phẩm</div>
                          <div className='w-full h-10 py-2.5 px-4 bg-gray-100 rounded-xl border-gray-200 flex'>
                            <p className="text-gray-400"></p>
                            {item?.category?.child ? item.category.child?.child ? item?.category?.name + ' > '
                              + item.category.child.name + ' > ' + item.category.child.child.name : item.category?.name + ' > '
                            + item.category.child.name : item?.category?.name}
                          </div>
                        </div>
                      )
                    },
                  }
                },
                {
                  title: 'Mã vạch',
                  name: 'barcode',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: '',
                  name: '',
                  formItem: {
                    tabIndex: 1,
                    col: 6,
                    render() {
                      return <div></div>;
                    },
                  },
                },
                {
                  title: 'Thuế nhập',
                  name: 'importTaxId',
                  formItem: {
                    tabIndex: 1,
                    type: 'select',
                    disabled: () => true,
                    col: 6,
                    get: {
                      facade: TaxAdminFacade,
                      format: (item: any) => ({
                        label: item.name + ' - ' + item.taxRate + '%',
                        value: item.id,
                      })
                    }
                  },
                },
                {
                  title: 'Thuế bán',
                  name: 'exportTaxId',
                  formItem: {
                    tabIndex: 1,
                    type: 'select',
                    disabled: () => true,
                    col: 6,
                    get: {
                      facade: TaxAdminFacade,
                      format: (item: any) => ({
                        label: item.name + ' - ' + item.taxRate + '%',
                        value: item.id,
                      })
                    }
                  },
                },
                {
                  title: '',
                  name: '',
                  formItem: {
                    col: 12,
                    render: () => {
                      return (
                        <div>
                          <div className="text-base my-4">Khả năng cung ứng</div>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Theo tháng',
                  name: 'month',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Theo quý',
                  name: 'abilitySupply',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Theo năm',
                  name: 'year',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Thị trường cuất khẩu',
                  name: 'exportMarket',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Mô tả sản phẩm',
                  name: 'description',
                  formItem: {
                    disabled: () => true,
                    tabIndex: 1,
                    type: 'textarea',
                    col: 12,
                  },
                },
              ]}
            />
            <div className="flex items-left font-bold px-5 pb-5">
              <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Bảng giá dành cho cửa hàng</p>
            </div>
            <div className="px-5 pb-4">
              <Table
                pagination={false}
                dataSource={dl}
                showSorterTooltip={false}
                size="small"
                loading={isLoading}
                columns={[
                  {
                    title: 'STT',
                    dataIndex: 'stt',
                  },
                  {
                    title: 'Chủng loại giá',
                    dataIndex: 'PriceType',
                  },
                  {
                    title: 'Số lượng tối thiểu',
                    dataIndex: 'Quantity',
                  },
                  {
                    title: 'Giá bán (VND)',
                    dataIndex: 'Price',
                  },
                ]}
              />
            </div>
            <div className="flex items-left font-bold px-5">
              <p className="sm:text-xl text-base text-teal-900">Chiết khấu với Balance</p>
            </div>
            <div>
              {productFacade.data && productFacade?.data?.priceBalanceCommission?.map((item) => {
                item.percentBalance != null ? percent = item.percentBalance : ''
                return item.percentBalance == null ? (
                  <div className='px-5 pt-2'>
                    <Form
                      className='form-store pb-2'
                      columns={[
                        {
                          title: '',
                          name: '',
                          formItem: {
                            render: (form, values) => {
                              return (
                                <div className=''>
                                  <div className="flex items-center h-full text-base lg:mt-0 pb-2">
                                    <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                      <input type="radio" className="ant-radio-input"></input>
                                    </span>
                                    <div>
                                      {('Chiết khấu cố định')}
                                    </div>
                                  </div>
                                  <div className="flex items-center h-full text-base lg:mt-0">
                                    <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                      <input type="radio" className="ant-radio-input"></input>
                                    </span>
                                    <div>
                                      {('Chiết khấu linh động')}
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          },
                        }
                      ]}
                    />
                    <Form
                      className='form-store pl-6'
                      columns={[
                        {
                          title: '',
                          name: '',
                          formItem: {
                            render: (form, values) => {
                              return (
                                <div className=''>
                                  <div className="flex items-center h-full text-base lg:mt-0 pb-2">
                                    <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                      <input type="radio" className="ant-radio-input"></input>
                                    </span>
                                    <div>
                                      {('Chiết khấu theo %')}
                                    </div>
                                  </div>
                                  <div className="flex items-center h-full text-base lg:mt-0">
                                    <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                      <input type="radio" className="ant-radio-input"></input>
                                    </span>
                                    <div>
                                      {('Chiết khấu theo số tiền')}
                                    </div>
                                  </div>
                                </div>
                              );
                            },
                          },
                        }
                      ]}
                    />
                    <Table
                      loading={isLoading}
                      pagination={false}
                      dataSource={dt}
                      showSorterTooltip={false}
                      size="small"
                      className="pt-2 pl-6 pb-6 border-b"
                      columns={[
                        {
                          title: 'STT',
                          dataIndex: 'stt',
                        },
                        {
                          title: 'Doanh Thu (VNĐ)',
                          dataIndex: 'Revenue',
                        },
                        {
                          title: 'Số tiền chiết khấu (VNĐ)',
                          dataIndex: 'AmountBalance',
                        }
                      ]}
                    />
                    <Table
                      loading={isLoading}
                      pagination={false}
                      dataSource={dt}
                      showSorterTooltip={false}
                      size="small"
                      className="pt-2 pl-6 pb-6"
                      columns={[
                        {
                          title: 'STT',
                          dataIndex: 'stt',
                        },
                        {
                          title: 'Doanh Thu (VNĐ)',
                          dataIndex: 'Revenue',
                        },
                        {
                          title: 'Số tiền chiết khấu (VNĐ)',
                          dataIndex: 'AmountBalance',
                        }
                      ]}
                    />
                  </div>
                ) : (
                  <div className="">
                    <Form
                      columns={[
                        {
                          title: '',
                          name: '',
                          formItem: {
                            render: (form, values) => {
                              return (
                                <div className="flex items-center h-full text-base lg:mt-0 pb-2">
                                  <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                    <input type="radio" className="ant-radio-input"></input>
                                  </span>
                                  <div>{('Chiết khấu cố định')}</div>
                                </div>
                              );
                            },
                          },
                        },
                        {
                          title: '',
                          name: '',
                          formItem: {
                            render: (form, values) => {
                              return (
                                <div className="flex items-center my-0.5 pl-6">
                                  <div className='text-base '>Đề nghị chiết khấu cố định</div>
                                  <input
                                    className="bg-gray-200 !ml-4 !rounded-[10px] !h-[44px] !w-[150px] !px-2 "
                                    placeholder="Nhập giá trị"
                                    type="text"
                                    value={percent != null ? percent : '1'}
                                  />
                                  <span className="ml-4">%</span>
                                </div>
                              );
                            },
                          },
                        },
                        {
                          title: '',
                          name: '',
                          formItem: {
                            render: (form, values) => {
                              return (
                                <div className="flex items-center h-full text-base lg:mt-0 pt-2">
                                  <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                    <input type="radio" className="ant-radio-input"></input>
                                  </span>
                                  <div>{('Chiết khấu linh động')}</div>
                                </div>
                              );
                            },
                          },
                        }
                      ]}
                    />
                  </div>
                )
              })}
            </div>
          </div>
        </div>
        <div className="flex w-full justify-between p-5">
          <Button
            text={t('components.form.modal.cancel')}
            className={'sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
            onClick={() => navigate(`/${lang}${routerLinks('inventory-management/product')}`)}
          />
          <div>
            <Button
              text={t('Từ chối yêu cầu')}
              className={'md:min-w-[8rem] justify-center !bg-red-500 max-sm:w-3/5 mr-5'}
              onClick={() => navigate(`/${lang}${routerLinks('Supplier')}`)}
            />
            <Button
              text={t('Phê duyệt yêu cầu')}
              className={'md:min-w-[8rem] justify-center !bg-teal-900 max-sm:w-3/5'}
              onClick={() => navigate(`/${lang}${routerLinks('Supplier')}`)}
            />
          </div>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
