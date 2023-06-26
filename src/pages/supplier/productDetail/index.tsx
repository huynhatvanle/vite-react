import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { language, languages } from '@utils';
import {
  GlobalFacade,
  DiscountFacade,
  detailDiscountFacade,
  SupplierFacade,
  ProductFacade,
  OrdersFacade,
} from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import dayjs from 'dayjs';
import { DownArrow } from '@svgs';
import { Table } from 'antd';

const Page = () => {
  const { t } = useTranslation();
  const productFacade = ProductFacade();
  const orderFacade = OrdersFacade();
  const { data, isLoading, queryParams, status } = productFacade;
  const detailDiscountt = detailDiscountFacade();
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const { formatDate } = GlobalFacade();

  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (id) {
      productFacade.getById({ id });
    }
    return () => {
      isReload.current && productFacade.get(param);
    };
  }, [id]);

  const handleBack = () => window.history.back();
  let i = 1;

  const dl = data?.productPrice?.flat().map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      PriceType: item?.priceType,
      Quantity: item?.minQuantity,
      Price: item?.price,
    };
  });

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className={'w-full mx-auto bg-white rounded-xl'}>
          <div className="">
            <div className="flex items-left font-bold px-5 pt-4">
              <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Chi tiết chiết khấu</p>
            </div>
            <Form
              values={{
                ...data,
              }}
              className="intro-x border-b"
              columns={[
                {
                  title: '',
                  name: 'id',
                  formItem: {
                    col: 4,
                    render: (form, values) => {
                      return (
                        <div className="lg:flex w-full">
                          <div className="w-full sm:w-full  flex product-detail-left-form">
                            <div className="mb-2">
                              <div className="bg-white pr-2 rounded-xl relative warpProductImg">
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
                    col: 4,
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
                              className="w-full h-10  px-4 ant-input border rounded-xl bg-gray-100 text-gray-400"
                              placeholder="Nhập đơn vị"
                              id="basicUnit"
                              value={value.basicUnit}
                            ></input>
                          </div>
                          <p className="text-xl font-bold text-teal-900 pb-2">Trạng thái sản phẩm</p>
                          <p className="font-normal text-base text-green-600 flex items-center">
                            {' '}
                            <i className="las la-tags text-lg mr-2"></i>
                            {value?.approveStatus === 'APPROVED' ? 'Đang bán' : 'Ngưng bán'}
                          </p>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
            <Form
              values={{
                ...data,
                category: data?.category?.name,
                abilitySupply: data?.abilitySupply?.quarter,
                month: data?.abilitySupply?.month,
                year: data?.abilitySupply?.year,
                brand: data?.brand ? data?.brand : '',
                // importTax: data?.importTax?.name,
                // exportTax: data?.exportTax?.name,
              }}
              className="intro-x border-b"
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
                    placeholder: '  ',
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
                  },
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
                  name: 'importTax',
                  formItem: {
                    tabIndex: 1,
                    col: 6,
                    render: (form, values) => {
                      return (
                        <div className="h-full w-full flex items-center">
                          <div className="w-full h-10 py-2.5 px-4 bg-gray-100 rounded-xl mt-4 border-gray-200 flex justify-between cursor-not-allowed">
                            <p className="text-gray-400">
                              {' '}
                              {values?.importTax?.name + ' - ' + values?.importTax?.name + '%'}
                            </p>
                            <DownArrow className="w-4 h-5 text-gray-400 pt-1" />
                          </div>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Thuế bán',
                  name: 'exportTax',
                  formItem: {
                    tabIndex: 1,
                    col: 6,
                    render: (form, values) => {
                      return (
                        <div className="h-full w-full flex items-center">
                          <div className="w-full h-10 py-2.5 px-4 bg-gray-100 rounded-xl mt-4 border-gray-200 flex justify-between cursor-not-allowed">
                            <p className="text-gray-400">
                              {' '}
                              {values?.exportTax?.name + ' - ' + values?.exportTax?.name + '%'}
                            </p>
                            <DownArrow className="w-4 h-5 text-gray-400 pt-1" />
                          </div>
                        </div>
                      );
                    },
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
                  name: '',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Mô tả sản phẩm',
                  name: '',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    type: 'textarea',
                    col: 12,
                    render: () => {
                      return (
                        <div className="w-full">
                          <div className="mb-2">Mô tả sản phẩm</div>
                          <textarea className="bg-gray-100 w-full rounded-xl h-28" disabled={true}></textarea>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
          </div>
          <div className="flex items-left font-bold px-5">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Bảng giá dành cho cửa hàng</p>
          </div>
          <div className="px-5 pb-4">
            <Table
              // onRow={}
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
              pagination={false}
              dataSource={dl}
              // onChange={(pagination, filters, sorts) =>
              //   handleTableChange(undefined, filters, sorts as SorterResult<any>, params.fullTextSearch)
              // }
              showSorterTooltip={false}
              // scroll={{ x: xScroll, y: yScroll }}
              size="small"
              // {...prop}
            />
          </div>
          {/* <DataTable
            // ref={dataTableRefDiscount}
            data={productFacade.data?.productPrice}
            xScroll="1370px"
            pageSizeRender={(sizePage: number) => sizePage}
            pageSizeWidth={'50px'}
            paginationDescription={(from: number, to: number, total: number) =>
              t('routes.admin.Layout.PaginationDiscount', { from, to, total })
            }
            columns={[
              {
                title: `supplier.Order.STT`,
                name: 'id',
                tableItem: {
                  width: 110,
                  // render: (value: any, item: any) => item?.id && console.log(item),
                },
              },
            ]}
            showSearch={false}
          /> */}
          <div className="flex items-left font-bold px-5 pb-4">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Chiết khấu với Balance</p>
          </div>
          <div className="px-5">
            <div className="ant-space-item">
              <label className="ant-radio-wrapper ant-radio-wrapper-checked ant-radio-wrapper-disabled mb-4 discount-fixed text-base !text-gray-900">
                <span className="ant-radio ant-radio-checked ant-radio-disabled">
                  <input type="radio" className="ant-radio-input"></input>
                  <span className="ant-radio-inner"></span>
                </span>
                <span>
                  Chiết khấu cố định
                  <div className="flex items-center mt-4">
                    <span>Đề nghị chiết khấu cố định</span>
                    <input
                      className="ant-input bg-white border !not-sr-only border-gray-200 !ml-4 !rounded-[10px] !h-[44px] !w-[181px] !px-2 focus:!shadow-none focus:!border-gray-200 "
                      placeholder="Nhập giá trị"
                      type="text"
                      value="5"
                    ></input>{' '}
                    <span className="ml-4">%</span>
                  </div>
                </span>
              </label>
            </div>
            <div className="ant-space-item">
              <label className="ant-radio-wrapper ant-radio-wrapper-disabled text-base">
                <span className="ant-radio ant-radio-disabled">
                  <input type="radio"></input>
                  <span className="ant-radio-inner"></span>
                </span>
                <span>Chiết khấu linh động</span>
              </label>
            </div>
          </div>
          <div className="px-5 pb-4"></div>
        </div>
        <div className="sm:flex sm:mt-7 mt-2">
          <div className="flex flex-col items-center mt-2" onClick={handleBack}>
            <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11">
              {t('components.form.modal.cancel')}
            </button>
          </div>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
