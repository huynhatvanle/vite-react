import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Infor, Plus } from '@svgs';
import { DiscountFacade, SupplierOderFacade, TaxFacade } from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { getFilter, language, languages, routerLinks } from '@utils';
import { Form } from '@core/form';
import { Form as AntForm, Dropdown, Select, Tabs, Tooltip, UploadFile } from 'antd';
import dayjs from 'dayjs';
import { TableRefObject } from '@models';
import { Excel } from 'antd-table-saveas-excel';
import { ModalForm } from '@core/modal/form';

const Page = () => {
  const taxFacade = TaxFacade();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isReload = useRef(false);
  const discountFacade = DiscountFacade();
  const supplierOrderFacade = SupplierOderFacade();
  const { result, queryParams, isLoading } = discountFacade;
  useEffect(() => {
    supplierOrderFacade.get1({});
    return () => {
      isReload.current && supplierOrderFacade.get1(param);
    };
  }, []);
  const listSupplier = supplierOrderFacade?.result?.data;
  const firstSupplier = listSupplier?.[0]?.id;

  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const dataTableRefDiscount = useRef<TableRefObject>(null);
  const modalFormRef = useRef<any>();
  let stt1 = 1;

  const statusDiscount = [
    {
      label: t('Đã thanh toán'),
      value: 'PAID',
    },
    {
      label: t('Chưa thanh toán'),
      value: 'NOT_PAID',
    },
    {
      label: t('Chưa hoàn tất'),
      value: 'NOT_COMPLETED_PAID',
    },
  ];

  interface IExcelColumn {
    title: string;
    key: string;
    dataIndex: string;
  }
  const columnrevenueOrder: IExcelColumn[] = [
    { title: t('STT'), key: 'stt', dataIndex: 'STT' },
    { title: t('Mã đơn hàng'), key: 'invoiceCode', dataIndex: 'invoiceCode' },
    { title: t('Ngày bán'), key: 'completedDate', dataIndex: 'completedDate' },
    { title: t('Giá trị (VND)'), key: 'total', dataIndex: 'total' },
    { title: t('Khuyến mãi (VND)'), key: 'discount', dataIndex: 'discount' },
    { title: t('Thành tiền (VND)'), key: 'revenue', dataIndex: 'revenue' },
    { title: t('Loại đơn'), key: 'type', dataIndex: 'type' },
  ];
  const [month, setMonth] = useState<boolean>();
  const [supplier, setSupplier] = useState<boolean>();

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <div className={'w-full mx-auto '}>
            <div className="px-5 bg-white pt-6 pb-4 rounded-xl rounded-tl-none">
              {listSupplier && (
                <>
                  <DataTable
                    className="form-supplier-tab4"
                    ref={dataTableRefDiscount}
                    facade={discountFacade}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        id: firstSupplier,
                        filter: {
                          dateFrom: `${dayjs().startOf('month').format('MM/DD/YYYY 23:59:59')}`,
                          dateTo: `${dayjs().endOf('month').format('MM/DD/YYYY 23:59:59')}`,
                        },
                        supplierId: firstSupplier,
                      },
                    }}
                    onRow={(data: any) => ({
                      onDoubleClick: () => navigate(`/${lang}${routerLinks('Discount-Detail')}/${data.id}`),
                    })}
                    xScroll="1400px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationOrder', { from, to, total })
                    }
                    showSearch={false}
                    subHeader={() => (
                      <>
                        <div className="flex my-5 flex-col 2xl:flex-row">
                          <div className="w-full">
                            <Form
                              values={{
                                dateFrom: getFilter(discountFacade.queryParams, 'filter')?.dateFrom,
                                dateTo: getFilter(discountFacade.queryParams, 'filter')?.dateTo,
                                status: getFilter(discountFacade.queryParams, 'status'),
                                supplierId: getFilter(discountFacade.queryParams, 'supplierId'),
                              }}
                              className="intro-x rounded-lg w-full sm:flex justify-between form-store"
                              columns={[
                                {
                                  title: '',
                                  name: '',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 2,
                                    render: () => (
                                      <div className="flex h-10 items-center">
                                        <p className="whitespace-nowrap">{t('Kỳ hạn từ')}</p>
                                      </div>
                                    ),
                                  },
                                },
                                {
                                  title: '',
                                  name: 'dateFrom',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 4,
                                    type: 'month_year',
                                    onChange(value: any, form: any) {
                                      value && form.getFieldValue('dateFrom') > form.getFieldValue('dateTo')
                                        ? setMonth(true)
                                        : setMonth(false);
                                      dataTableRefDiscount?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          id: form.getFieldValue('supplierId'),
                                          filter: {
                                            dateFrom: value
                                              ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/')
                                              : '',
                                            dateTo: form.getFieldValue('dateTo')
                                              ? form
                                                  .getFieldValue('dateTo')
                                                  .format('MM/DD/YYYY 23:59:59')
                                                  .replace(/-/g, '/')
                                              : '',
                                          },
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                          supplierId: form.getFieldValue('supplierId'),
                                        },
                                      });
                                    },
                                  },
                                },
                                {
                                  title: '',
                                  name: '',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 2,
                                    render: () => (
                                      <div className="flex h-10 items-center">
                                        <p className="whitespace-nowrap">{t('Đến')}</p>
                                      </div>
                                    ),
                                  },
                                },
                                {
                                  title: '',
                                  name: 'dateTo',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 4,
                                    type: 'month_year',
                                    onChange(value: any, form: any) {
                                      value && form.getFieldValue('dateTo') < form.getFieldValue('dateFrom')
                                        ? setMonth(true)
                                        : setMonth(false);
                                      dataTableRefDiscount?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          id: form.getFieldValue('supplierId'),
                                          filter: {
                                            dateFrom: form.getFieldValue('dateFrom')
                                              ? form
                                                  .getFieldValue('dateFrom')
                                                  .format('MM/DD/YYYY 00:00:00')
                                                  .replace(/-/g, '/')
                                              : '',
                                            dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                          },
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                          supplierId: form.getFieldValue('supplierId'),
                                        },
                                      });
                                    },
                                  },
                                },
                              ]}
                            />
                            {month && (
                              <div className="w-full flex">
                                <span className="sm:w-[526px] text-center sm:text-right text-red-500">
                                  Tháng kết thúc phải lớn hơn Tháng bắt đầu
                                </span>
                              </div>
                            )}
                          </div>
                          <div className="sm:flex lg:justify-end w-full">
                            <Form
                              values={{
                                dateFrom: getFilter(discountFacade.queryParams, 'filter')?.dateFrom,
                                dateTo: getFilter(discountFacade.queryParams, 'filter')?.dateTo,
                                status: getFilter(discountFacade.queryParams, 'status'),
                                supplierId: getFilter(discountFacade.queryParams, 'supplierId'),
                              }}
                              className="intro-x sm:flex justify-start sm:mt-2 xl:justify-end xl:mt-0 form-store"
                              columns={[
                                {
                                  title: '',
                                  name: 'status',
                                  formItem: {
                                    placeholder: 'Chọn trạng thái',
                                    type: 'select',
                                    tabIndex: 3,
                                    col: 6,
                                    list: statusDiscount,
                                    onChange(value: any, form: any) {
                                      dataTableRefDiscount?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          id: form.getFieldValue('supplierId'),
                                          filter: {
                                            dateFrom: form.getFieldValue('dateFrom'),
                                            dateTo: form.getFieldValue('dateTo'),
                                          },
                                          status: value,
                                          supplierId: form.getFieldValue('supplierId'),
                                        },
                                      });
                                    },
                                  },
                                },
                                {
                                  name: 'supplierId',
                                  title: '',
                                  formItem: {
                                    placeholder: 'Chọn nhà cung cấp',
                                    type: 'select',
                                    col: 6,
                                    list: listSupplier?.map((item) => ({
                                      label: item?.name,
                                      value: item?.id!,
                                    })),
                                    onChange(value: any, form: any) {
                                      value ? setSupplier(false) : setSupplier(true);
                                      dataTableRefDiscount?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          id: value ? value : firstSupplier,
                                          filter: {
                                            dateFrom: form.getFieldValue('dateFrom'),
                                            dateTo: form.getFieldValue('dateTo'),
                                          },
                                          status: form.getFieldValue('status'),
                                          supplierId: value ? value : '',
                                        },
                                      });
                                    },
                                  },
                                },
                              ]}
                            />
                            {supplier && (
                              <div className="w-full flex">
                                <span className="sm:w-[526px] text-center sm:text-right text-red-500">
                                  Vui lòng chọn nhà cung cấp
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      </>
                    )}
                    searchPlaceholder={t('placeholder.Search by order number')}
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'id',
                        tableItem: {
                          width: 70,
                          render: (value: any, item: any) =>
                            JSON.parse(discountFacade.queryParams || '{}').page != 1
                              ? `${
                                  JSON.parse(discountFacade.queryParams || '{}').page *
                                    JSON.parse(discountFacade.queryParams || '{}').perPage +
                                  stt1++
                                }`
                              : `${stt1++}`,
                        },
                      },
                      {
                        title: `Thời gian`,
                        name: 'invoiceCode',
                        tableItem: {
                          width: 175,
                          render: (value: any, item: any) =>
                            dayjs(item?.datefrom, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/') +
                            '-' +
                            dayjs(item?.dateto, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/'),
                        },
                      },
                      {
                        title: `Chiết khấu (VND)`,
                        name: 'commision',
                        tableItem: {
                          width: 180,
                          render: (text: string) => (text ? text.toLocaleString() : '0'),
                        },
                      },
                      {
                        title: `Đã thanh toán (VND)`,
                        name: 'paid',
                        tableItem: {
                          width: 135,
                          render: (text: string) => (text ? text.toLocaleString() : '0'),
                        },
                      },
                      {
                        title: `Chưa thanh toán (VND)`,
                        name: 'noPay',
                        tableItem: {
                          width: 150,
                          render: (text: string) => text?.toLocaleString(),
                        },
                      },
                      {
                        title: `supplier.Order.Order Type`,
                        name: 'status',
                        tableItem: {
                          width: 100,
                          render: (text: string, item: any) =>
                            text === 'PAID' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('Đẫ thanh toán')}
                              </div>
                            ) : text === 'NOT_PAID' ? (
                              <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                {t('Chưa thanh toán')}
                              </div>
                            ) : (
                              <div className="bg-red-50 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                                {t('Chưa hoàn tất')}
                              </div>
                            ),
                        },
                      },
                    ]}
                  />
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={discountFacade.result?.data?.length === 0 ? true : false}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => {
                        const inventory = discountFacade?.result?.data?.map((item) => {
                          // return {
                          //   STT: i++,
                          //   discountFacadeCode: item.invoiceCode,
                          //   completedDate: item.completedDate
                          //     ? dayjs(item.completedDate).format('DD/MM/YYYY').replace(/-/g, '/')
                          //     : '',
                          //   total: item.total?.toLocaleString(),
                          //   discount: item.discount?.toLocaleString(),
                          //   revenue: item.revenue?.toLocaleString(),
                          //   type:
                          //     item.type === 'DELEVERED'
                          //       ? t('Bán hàng')
                          //       : item.type === 'REFUND'
                          //       ? t('Trả hàng')
                          //       : item.type === 'REFUND'
                          //       ? t('Đã huỷ')
                          //       : '',
                          // };
                        });

                        const excel = new Excel();
                        const sheet = excel.addSheet('Sheet1');
                        sheet.setTHeadStyle({
                          background: 'FFFFFFFF',
                          borderColor: 'C0C0C0C0',
                          wrapText: false,
                          fontName: 'Calibri',
                        });
                        sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' });
                        sheet.setRowHeight(0.8, 'cm');
                        sheet.addColumns([
                          { title: '', dataIndex: '' },
                          { title: '', dataIndex: '' },
                          { title: 'BÁO CÁO DOANH THU CỬA HÀNG THEO ĐƠN HÀNG', dataIndex: '' },
                        ]);
                        // sheet.drawCell(10, 0, '');
                        sheet.addRow();
                        sheet.addColumns([
                          { title: 'Tìm kiếm:', dataIndex: '' },
                          {
                            title: JSON.parse(discountFacade.queryParams || '{}').fullTextSearch || '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Chọn loại đơn hàng:', dataIndex: '' },
                          {
                            title: getFilter(discountFacade.queryParams, 'status')
                              ? `${
                                  statusDiscount.find((item) => {
                                    return item.value === getFilter(discountFacade.queryParams, 'status');
                                  })?.label
                                }`
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Chọn cửa hàng:', dataIndex: '' },
                          {
                            title: getFilter(discountFacade.queryParams, 'supplierId')
                              ? `${
                                  listSupplier?.find((item) => {
                                    return item.id === getFilter(discountFacade.queryParams, 'supplierId');
                                  })?.name
                                }`
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },
                        ]);
                        sheet.addRow();
                        sheet.addColumns([
                          { title: 'Từ ngày', dataIndex: '' },
                          {
                            title: getFilter(discountFacade.queryParams, 'dateFrom')
                              ? dayjs(getFilter(discountFacade.queryParams, 'dateFrom')).format('DD/MM/YYYY')
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Đến ngày', dataIndex: '' },
                          {
                            title: getFilter(discountFacade.queryParams, 'dateTo')
                              ? dayjs(getFilter(discountFacade.queryParams, 'dateTo')).format('DD/MM/YYYY')
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },
                        ]);
                        sheet.addRow();
                        sheet.addRow();
                        sheet
                          .addColumns(columnrevenueOrder)
                          .addDataSource(inventory ?? [], {
                            str2Percent: true,
                          })
                          .addColumns([
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: 'Tổng cộng', dataIndex: '' },
                            { title: discountFacade.result?.total?.total?.toLocaleString(), dataIndex: '' },
                            {
                              title: discountFacade.result?.total?.totalDiscount?.toLocaleString(),
                              dataIndex: '',
                            },
                            {
                              title: discountFacade.result?.total?.totalRevenue?.toLocaleString(),
                              dataIndex: '',
                            },
                            { title: '', dataIndex: '' },
                          ])
                          .saveAs(t('Doanh thu cửa hàng theo đơn hàng.xlsx'));
                      }}
                    />
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
