import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { language, languages, routerLinks } from '@utils';
import {
  GlobalFacade,
  DiscountFacade,
  detailDiscountFacade,
  SupplierFacade,
  ProductFacade,
  OrdersFacade,
  CommisionPaymentFacade,
} from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import dayjs from 'dayjs';
import { ModalForm } from '@core/modal/form';
import { DownArrow } from '@svgs';
import { Button } from '@core/button';

const Page = () => {
  const { t } = useTranslation();
  const discountFacade = DiscountFacade();
  const orderFacade = OrdersFacade();
  const { data, isLoading, queryParams } = discountFacade;
  const detailDiscount = detailDiscountFacade();
  const commisionPaymentFacade = CommisionPaymentFacade();
  const { status } = commisionPaymentFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

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
  const modalFormRef = useRef<any>();
  let i = 1;

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        if (id) {
          discountFacade.getById({ id });
        }
        break;
    }
  }, [status]);

  const handleSubmit = (values: any) => {
    commisionPaymentFacade.put({ ...commisionPaymentFacade?.data, status: 'RECIVED' });
  };

  console.log(discountFacade);

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className={'w-full mx-auto bg-white rounded-xl'}>
          <div className="">
            <div className="flex items-left font-bold px-5 pt-4">
              <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Chi tiết chiết khấu</p>
            </div>
            <Form
              values={discountFacade}
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
                                {dayjs(values?.data?.dateFrom).format('DD/MM/YYYY').replace(/-/g, '/') +
                                  '-' +
                                  dayjs(values?.data?.dateTo).format('DD/MM/YYYY').replace(/-/g, '/')}
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
                                {values?.data?.status === 'NOT_PAID'
                                  ? 'Chưa thanh toán'
                                  : values?.data?.status === 'NOT_COMPLETED_PAID'
                                  ? 'Chưa hoàn tất'
                                  : 'Đã thanh toán'}
                              </div>
                            </div>
                            <div className="flex mb-5">
                              <div className="font-semibold text-black ">Đã thanh toán:</div>
                              <div className="ml-4">{values?.data?.totalPayment.toLocaleString()} VND</div>
                            </div>
                          </div>
                          <div className="flex w-full mb-5 lg:w-1/3">
                            <div className="font-semibold  text-black ">Cần thanh toán:</div>
                            <div className="ml-4">
                              {' '}
                              {(values?.data?.commisionTotal - values?.data?.totalPayment).toLocaleString()} VND
                            </div>
                          </div>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
          </div>
          <div className="flex items-left font-bold px-5">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Danh sách thanh toán</p>
          </div>
          <div className="px-5 pb-4">
            {discountFacade.data?.subOrgCommisionPayment && (
              <>
                <DataTable
                  xScroll="895px"
                  data={discountFacade?.data?.subOrgCommisionPayment}
                  showPagination={false}
                  pageSizeRender={(sizePage: number) => sizePage}
                  pageSizeWidth={'50px'}
                  paginationDescription={(from: number, to: number, total: number) =>
                    t('routes.admin.Layout.PaginationProduct', { from, to, total })
                  }
                  onRow={(data: any) => ({
                    onDoubleClick: () => modalFormRef?.current?.handleEdit(data),
                  })}
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
                      name: 'createdAt',
                      tableItem: {
                        width: 170,
                        render: (text: any) =>
                          dayjs(text, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY').replace(/-/g, '/'),
                      },
                    },
                    {
                      title: `Đã thanh toán (VND)`,
                      name: 'commisionMoney',
                      tableItem: {
                        width: 170,
                        render: (text: any) => text?.toLocaleString(),
                      },
                    },
                    {
                      title: `Phương thức`,
                      name: 'paymentMethod',
                      tableItem: {
                        width: 170,
                        render: (text: any) => (text === 'BANK_TRANSFER' ? 'Chuyển khoản' : ':D'),
                      },
                    },
                    {
                      title: `Trạng thái thanh toán`,
                      name: 'status',
                      tableItem: {
                        width: 170,
                        render: (text: any) =>
                          text === 'RECIVED' ? (
                            <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                              {t('Đẫ nhận')}
                            </div>
                          ) : text === 'DELIVERED' ? (
                            <div className="bg-green-100 text-center p-1 border border-blue-500 text-blue-600 rounded">
                              {t('Đẫ Chuyển')}
                            </div>
                          ) : (
                            <div>aaaaaaaa</div>
                          ),
                      },
                    },
                  ]}
                  showSearch={false}
                />
                <ModalForm
                  facade={commisionPaymentFacade}
                  className="form form-Payment-discount"
                  ref={modalFormRef}
                  title={() => 'Thanh toán chiết khấu'}
                  columns={[
                    {
                      title: 'tax.type',
                      name: '',
                      formItem: {
                        render: (form, values) => {
                          return (
                            <div className="sm:pt-2 border-y">
                              <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                <div className="font-semibold text-teal-900 ">Ngày thanh toán:</div>
                                <div className="ml-4">
                                  {dayjs(values?.createdAt).format('DD/MM/YYYY').replace(/-/g, '/')}
                                </div>
                              </div>
                              <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                <div className="w-1/2 flex">
                                  <div className="font-semibold text-teal-900 ">Chiết khấu cần thanh toán:</div>
                                  <div className="ml-4">0 VND</div>
                                </div>
                                <div className="w-1/2 flex">
                                  <div className="font-semibold text-teal-900 ">Phương thức thanh toán:</div>
                                  <div className="ml-4">
                                    <div className="w-60 py-2.5 px-4 bg-gray-100 rounded-2xl border-gray-200 ml-4 flex justify-between cursor-not-allowed">
                                      <p className="text-gray-400"> {t('Chuyển khoản')}</p>
                                      <DownArrow className="w-4 h-5 text-gray-400 pt-1" />
                                    </div>
                                  </div>
                                </div>
                              </div>
                              <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                <div className="w-1/2 flex">
                                  <div className="font-semibold text-teal-900">Chiết khấu đã thanh toán:</div>
                                  <div className="ml-4">{values?.commisionMoney?.toLocaleString()} VND</div>
                                </div>
                                <div className="w-1/2 flex">
                                  <div className="font-semibold text-teal-900 ">Trạng thái:</div>
                                  <div className="ml-4">
                                    {values?.status === 'RECIVED' ? (
                                      <div className="ml-4">Đã nhận</div>
                                    ) : (
                                      <div className="ml-4">Đã chuyển</div>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>
                          );
                        },
                      },
                    },
                    {
                      title: 'store.Note',
                      name: 'note',
                      formItem: {
                        // disabled: (values: any) => (values?.status === 'RECIVED' ? true : false),
                        disabled: () => true,
                        type: 'textarea',
                        rules: [{ type: 'textarea_max_length' }],
                        tabIndex: 1,
                        col: 12,
                      },
                    },
                  ]}
                  widthModal={1000}
                  footerCustom={(handleOk, handleCancel) => (
                    <div className=" w-full bg-white ">
                      <div className="w-full flex flex-col sm:flex-row sm:!justify-between mb-[33px] ml-[9px]">
                        <button
                          className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                          onClick={handleCancel}
                        >
                          {t('components.form.modal.cancel')}
                        </button>
                        {commisionPaymentFacade?.data?.status !== 'RECIVED' && (
                          <Button
                            text={t('Đã nhận thanh toán')}
                            className={
                              'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                            }
                            onClick={handleSubmit}
                          />
                        )}
                      </div>
                    </div>
                  )}
                />
              </>
            )}
          </div>
          <div className="flex items-left font-bold px-5">
            <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">Danh sách sản phẩm</p>
          </div>
          <div className="px-5 pb-4">
            <DataTable
              facade={detailDiscount}
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
                    width: 200,
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
