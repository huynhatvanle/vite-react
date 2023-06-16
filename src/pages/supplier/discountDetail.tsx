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

const Page = () => {
  const { t } = useTranslation();
  const discountFacade = DiscountFacade();
  const orderFacade = OrdersFacade();
  const { data, isLoading, queryParams, status } = discountFacade;
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
      discountFacade.getById({ id });
    }
    return () => {
      isReload.current && discountFacade.get(param);
    };
  }, [id]);

  const handleBack = () => window.history.back();
  let i = 1;

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className={'w-full mx-auto bg-white rounded-xl'}>
          <div className="">
            <div className="flex items-left font-bold px-5 pt-4">
              <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Chi tiết chiết khấu</p>
            </div>
            <Form
              values={{ ...data }}
              className="intro-x border-b"
              columns={[
                {
                  title: '',
                  name: 'id',
                  formItem: {
                    col: 12,
                    render: (form, values) => {
                      return (
                        <div className="lg:flex w-full">
                          <div className=" w-full lg:w-1/3">
                            <div className="flex mb-5">
                              <div className="font-semibold text-black ">Thời gian:</div>
                              <div className="ml-4">
                                {dayjs(values?.data?.dateFrom, 'YYYY-MM-DDTHH:mm:ss')
                                  .format('DD/MM/YYYY')
                                  .replace(/-/g, '/') +
                                  '-' +
                                  dayjs(values?.data?.dateTo, 'YYYY-MM-DDTHH:mm:ss')
                                    .format('DD/MM/YYYY')
                                    .replace(/-/g, '/')}
                              </div>
                            </div>
                            <div className="flex mb-5">
                              <div className="font-semibold text-black ">Chiết khấu:</div>
                              <div className="ml-4">{values?.data?.commisionTotal.toLocaleString()} VND</div>
                            </div>
                          </div>
                          <div className=" w-full lg:w-1/3">
                            <div className="flex mb-5">
                              <div className="font-semibold text-black ">Trạng thái:</div>
                              <div className="ml-4">
                                {values?.data?.status === 'NOT_PAID' ? 'Chưa thanh toán' : 'Đã thanh toán'}
                              </div>
                            </div>
                            <div className="flex mb-5">
                              <div className="font-semibold text-black ">Đã thanh toán:</div>
                              <div className="ml-4">{values?.data?.totalPayment.toLocaleString()} VND</div>
                            </div>
                          </div>
                          <div className="flex w-full mb-5 lg:w-1/3">
                            <div className="font-semibold  text-black ">Cần thanh toán:</div>
                            <div className="ml-4">{values?.data?.commisionTotal.toLocaleString()} VND</div>
                          </div>
                        </div>
                      );
                    },
                  },
                },
                // {
                //   title: '',
                //   name: 'createdAt',
                //   formItem: {
                //     col: 4,
                //     render: (form, values) => {
                //       return (
                //         <div className="flex items-center h-full text-base sm:mt-0 mt-4">
                //           <div className="font-semibold text-teal-900 ">Trạng thái:</div>
                //           <div className="ml-4">
                //             {dayjs(values.createdAt).format('DD/MM/YYYY').replace(/-/g, '/')} -{' '}
                //             {dayjs(values.createdAt).format('HH:mm')}{' '}
                //           </div>
                //         </div>
                //       );
                //     },
                //   },
                // },
                // {
                //   title: '',
                //   name: 'createdAt',
                //   formItem: {
                //     col: 4,
                //     render: (form, values) => {
                //       return (
                //         <div className="flex items-center h-full text-base sm:mt-0 mt-4">
                //           <div className="font-semibold text-teal-900 ">Cần thanh toán:</div>
                //           <div className="ml-4">
                //             {dayjs(values.createdAt).format('DD/MM/YYYY').replace(/-/g, '/')} -{' '}
                //             {dayjs(values.createdAt).format('HH:mm')}{' '}
                //           </div>
                //         </div>
                //       );
                //     },
                //   },
                // },
                // {
                //   title: '',
                //   name: 'code',
                //   formItem: {
                //     col: 12,
                //     render: (form, values) => {
                //       return (
                //         <div className="flex items-center h-10 text-base sm:mt-0 mt-4">
                //           <div className="font-semibold text-teal-900">Thông tin hợp đồng:</div>
                //           <a
                //             onClick={(activeKey: any) => navigate(`/${lang}${routerLinks('Contract-View')}/${id}`)}
                //             className="text-blue-500 ml-4 underline hover:underline hover:text-blue-500"
                //           >
                //             Nhấn vào đây
                //           </a>
                //           <div className="font-semibold text-teal-900 ml-4">Tệp đã ký:</div>
                //           <a
                //             onClick={(activeKey: any) => navigate(`/${lang}${routerLinks('Contract-View')}/${id}`)}
                //             className="text-blue-500 ml-4 underline hover:underline hover:text-blue-500"
                //           >
                //             Nhấn vào đây
                //           </a>
                //         </div>
                //       );
                //     },
                //   },
                // },
              ]}
            />
          </div>
          <div className="flex items-left font-bold px-5">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Danh sách thanh toán</p>
          </div>
          <div className="px-5 pb-4">
            <DataTable
              facade={orderFacade}
              defaultRequest={{
                page: 1,
                perPage: 10,
                filter: { filterSupplier: 1056 },
              }}
              xScroll="895px"
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.PaginationProduct', { from, to, total })
              }
              columns={[
                {
                  title: `Mã thanh toán`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                  },
                },
                {
                  title: `Ngày thanh toán`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                  },
                },
                {
                  title: `Đã thanh toán (VND)`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                  },
                },
                {
                  title: `Phương thức`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                  },
                },
                {
                  title: `Trạng thái thanh toán`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                  },
                },
              ]}
              showSearch={false}
            />
          </div>
          <div className="flex items-left font-bold px-5">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Danh sách sản phẩm</p>
          </div>
          <div className="px-5 pb-4">
            <DataTable
              facade={detailDiscountt}
              // ref={dataTableRefProduct}
              defaultRequest={{
                page: 1,
                perPage: 10,
                filter: { id: id },
              }}
              xScroll="895px"
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.PaginationProduct', { from, to, total })
              }
              columns={[
                {
                  title: `STT`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => `${i++}`,
                  },
                },
                {
                  title: `Mã sản phẩm`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.product?.code,
                  },
                },
                {
                  title: `Tên sản phẩm`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.product?.name,
                  },
                },
                {
                  title: `Số lượng`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.quantity,
                  },
                },
                {
                  title: `Đơn vị`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.product?.basicUnit,
                  },
                },
                {
                  title: `Doanh thu (VND)`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.revenueCommission.toLocaleString(),
                  },
                },
                {
                  title: `Loại chiết khấu`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) =>
                      item?.product?.balancePriceType === 'PERCENT_COMMISSION'
                        ? 'Chiết khấu phần trăm'
                        : 'Chiết khấu cố định',
                  },
                },
                {
                  title: `Chiết khấu (VND)`,
                  name: 'code',
                  tableItem: {
                    width: 170,
                    render: (value: any, item: any) => item?.commisionMoney.toLocaleString(),
                  },
                },
              ]}
              showSearch={false}
            />
          </div>
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
