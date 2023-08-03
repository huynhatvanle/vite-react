import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Infor, Plus } from '@svgs';
import {
  CategoryFacade,
  ConnectSupplierFacade,
  InvoiceKiotVietFacade,
  InvoiceRevenueFacade,
  StoreFacade,
  StoreOderFacade,
  SupplierOderFacade,
  TaxFacade,
} from '@store';
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
  const RevenueOderFace = StoreOderFacade();
  const supplierOrder = SupplierOderFacade();
  const { result, queryParams, isLoading } = RevenueOderFace;
  const connectSupplierFacade = ConnectSupplierFacade();
  useEffect(() => {
    supplierOrder.get({ supplierType: '' });

    return () => {
      isReload.current && supplierOrder.get(param);
    };
  }, []);
  const listSupplier = supplierOrder?.result?.data;
  const firstSupplier = listSupplier?.[0]?.id;

  const invoice = InvoiceRevenueFacade();

  const invoiceKiotVietFacade = InvoiceKiotVietFacade();
  const categoryFacade = CategoryFacade();
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const [categoryId1, setCategoryId1] = useState('');
  const [categoryId2, setCategoryId2] = useState('');
  const category1 = categoryFacade.result?.data;
  const category2 = categoryFacade.result2?.data;
  const category3 = categoryFacade.result3?.data;

  const dataTableRefRevenueOder = useRef<TableRefObject>(null);
  const dataTableRefRevenueProduct = useRef<TableRefObject>(null);
  const modalFormRef = useRef<any>();
  const [dateOrder, setDateOder] = useState<boolean>();
  const [dateProduct, setDateProduct] = useState<boolean>();

  const urlParams = new URLSearchParams(window.location.search);
  const handleBack = () => {
    // sessionStorage.setItem('activeTab', '1');
    navigate(`/${lang}${routerLinks('revenue-management/store')}?${new URLSearchParams(param).toString()}`);
  };

  const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeRevenueStoreTab') || '1');
  const onChangeTab = (key: string) => {
    setActiveKey(key);

    localStorage.setItem('activeRevenueStoreTab', key);

    navigate(`/${lang}${routerLinks('revenue-management/store')}?tab=${key}`);
  };
  const tab = urlParams.get('tab');
  useEffect(() => {
    if (tab) {
      setActiveKey(tab);
    } else {
      setActiveKey('1');
    }
  }, []);
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

  useEffect(() => {
    if (activeKey == '2') {
      categoryFacade.get({});
      if (getFilter(invoiceKiotVietFacade.queryParams, 'idSupplier')) {
        connectSupplierFacade.get({
          page: 1,
          perPage: 1000,
          filter: { idSuppiler: getFilter(invoiceKiotVietFacade.queryParams, 'idSupplier') },
        });
      }
    }
  }, [activeKey, getFilter(invoiceKiotVietFacade.queryParams, 'idSupplier')]);

  const supplier = connectSupplierFacade.result?.data;

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
  let i = 1;
  let sttDetail = 1;
  const [month, setMonth] = useState<boolean>();

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <div className={'w-full mx-auto '}>
            <div className="px-5 bg-white pt-6 pb-4 rounded-xl rounded-tl-none">
              {!isLoading && (
                <>
                  <DataTable
                    className="form-supplier-tab4"
                    ref={dataTableRefRevenueOder}
                    facade={invoice}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        idSupplier: firstSupplier,
                        dateFrom: `${dayjs().startOf('month').format('MM/DD/YYYY 00:00:00')}`,
                        dateTo: `${dayjs().endOf('month').format('MM/DD/YYYY 23:59:59')}`,
                        status: '',
                      },
                    }}
                    onRow={(data: any) => ({
                      onDoubleClick: () => modalFormRef?.current?.handleEdit(data),
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
                                dateFrom: getFilter(invoice.queryParams, 'dateFrom'),
                                dateTo: getFilter(invoice.queryParams, 'dateTo'),
                                status: getFilter(invoice.queryParams, 'status'),
                                idSupplier: getFilter(invoice.queryParams, 'idSupplier'),
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
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          idSupplier: id,
                                          dateFrom: value ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/') : '',
                                          dateTo: form.getFieldValue('dateTo')
                                            ? form
                                                .getFieldValue('dateTo')
                                                .format('MM/DD/YYYY 23:59:59')
                                                .replace(/-/g, '/')
                                            : '',
                                          // idSupplier: form.getFieldValue('idSupplier') ? form.getFieldValue('idSupplier') : '',
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
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
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          idSupplier: id,
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form
                                                .getFieldValue('dateFrom')
                                                .format('MM/DD/YYYY 00:00:00')
                                                .replace(/-/g, '/')
                                            : '',
                                          dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                          // idSupplier: form.getFieldValue('idSupplier') ? form.getFieldValue('idSupplier') : '',
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
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
                                dateFrom: getFilter(invoice.queryParams, 'dateFrom'),
                                dateTo: getFilter(invoice.queryParams, 'dateTo'),
                                status: getFilter(invoice.queryParams, 'status'),
                                idSupplier: getFilter(invoice.queryParams, 'idSupplier'),
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
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                          idSupplier: form.getFieldValue('idSupplier')
                                            ? form.getFieldValue('idSupplier')
                                            : '',
                                          status: value ? value : '',
                                        },
                                      });
                                    },
                                  },
                                },
                                {
                                  name: 'idSupplier',
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
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          idSupplier: value ? value : '',
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                        },
                                      });
                                    },
                                  },
                                },
                              ]}
                            />
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
                            JSON.parse(invoice.queryParams || '{}').page != 1
                              ? `${
                                  JSON.parse(invoice.queryParams || '{}').page *
                                    JSON.parse(invoice.queryParams || '{}').perPage +
                                  stt1++
                                }`
                              : `${stt1++}`,
                        },
                      },
                      {
                        title: `supplier.Order.Order ID`,
                        name: 'invoiceCode',
                        tableItem: {
                          width: 175,
                        },
                      },
                      {
                        title: `Ngày bán`,
                        name: 'completedDate',
                        tableItem: {
                          width: 180,
                          render: (text: string) => (text ? dayjs(text).format('DD/MM/YYYY').replace(/-/g, '/') : ''),
                        },
                      },
                      {
                        title: `Giá trị (VND)`,
                        name: 'total',
                        tableItem: {
                          width: 135,
                          render: (text: string) => text.toLocaleString(),
                        },
                      },
                      {
                        title: `Khuyến mãi (VND)`,
                        name: 'discount',
                        tableItem: {
                          width: 150,
                          render: (text: string) => text.toLocaleString(),
                        },
                      },
                      {
                        title: `Thành tiền (VND)	`,
                        name: 'revenue',
                        tableItem: {
                          width: 145,
                          render: (text: string) => text.toLocaleString(),
                        },
                      },
                      {
                        title: `supplier.Order.Order Type`,
                        name: 'total',
                        tableItem: {
                          width: 100,
                          render: (text: string, item: any) =>
                            item?.type === 'DELEVERED' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('supplier.Sup-Status.Sell goods')}
                              </div>
                            ) : (
                              <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                {t('supplier.Sup-Status.Return goods')}
                              </div>
                            ),
                        },
                      },
                    ]}
                  />
                  <ModalForm
                    facade={invoiceKiotVietFacade}
                    className="form"
                    ref={modalFormRef}
                    title={() => 'Thông tin chi tiết đơn hàng'}
                    columns={[
                      {
                        title: 'tax.type',
                        name: 'name',
                        formItem: {
                          render: (form, values) => {
                            return (
                              <div className="border-y">
                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                  <div className="font-semibold text-teal-900 ">Thông tin đơn hàng:</div>
                                </div>
                                <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                  <div className="w-1/2 flex">
                                    <div className="font-semibold text-teal-900 ">Mã đơn hàng:</div>
                                    <div className="ml-4">{values?.invoiceCode}</div>
                                  </div>
                                  <div className="w-1/2 flex">
                                    <div className="font-semibold text-teal-900 ">Ngày bán:</div>
                                    <div className="ml-4">
                                      {dayjs(values?.completedDate).format('DD/MM/YYYY').replace(/-/g, '/')}
                                    </div>
                                  </div>
                                </div>
                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                  <div className="font-semibold text-teal-900 ">Tổng giá trị đơn hàng:</div>
                                  <div className="ml-4">{values?.totalPayment.toLocaleString()} VND</div>
                                </div>
                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store">
                                  <div className="font-semibold text-teal-900 ">Chi tiết đơn hàng:</div>
                                </div>
                                <div className="w-full">
                                  <table className="w-full">
                                    <thead>
                                      <tr className="text-left">
                                        <th className="p-5">STT</th>
                                        <th className="p-5">Mặt hàng</th>
                                        <th className="p-5">Số lượng</th>
                                        <th className="p-5">Đơn giá (VND)</th>
                                        <th className="p-5">Thành tiền (VND)</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      {values?.detailInvoice?.map((items: any, stt1: number) => (
                                        <tr className="text-left">
                                          <td className="p-5">{sttDetail++}</td>
                                          <td className="p-5">{items?.productName}</td>
                                          <td className="p-5">{items?.quantity}</td>
                                          <td className="p-5">{items?.totalItem}</td>
                                          <td className="p-5">{items?.total}</td>
                                        </tr>
                                      ))}
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                    widthModal={830}
                    footerCustom={(handleOk, handleCancel) => (
                      <div className=" w-full bg-white ">
                        <div className="flex flex-col items-start mb-[33px] ml-[9px]">
                          <button
                            className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                            onClick={handleCancel}
                          >
                            {t('components.form.modal.cancel')}
                          </button>
                        </div>
                      </div>
                    )}
                  />
                </>
              )}
              <div className="flex sm:justify-end justify-center items-center p-5">
                <Button
                  disabled={invoice.result?.data?.length === 0 ? true : false}
                  text={t('titles.Export report')}
                  className={
                    'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                  }
                  onClick={() => {
                    const inventory = invoice?.result?.data?.map((item) => {
                      return {
                        STT: i++,
                        invoiceCode: item.invoiceCode,
                        completedDate: item.completedDate
                          ? dayjs(item.completedDate).format('DD/MM/YYYY').replace(/-/g, '/')
                          : '',
                        total: item.total?.toLocaleString(),
                        discount: item.discount?.toLocaleString(),
                        revenue: item.revenue?.toLocaleString(),
                        type:
                          item.type === 'DELEVERED'
                            ? t('Bán hàng')
                            : item.type === 'REFUND'
                            ? t('Trả hàng')
                            : item.type === 'REFUND'
                            ? t('Đã huỷ')
                            : '',
                      };
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
                        title: JSON.parse(invoice.queryParams || '{}').fullTextSearch || '',
                        dataIndex: '',
                      },
                      { title: '', dataIndex: '' },

                      { title: 'Chọn loại đơn hàng:', dataIndex: '' },
                      {
                        title: getFilter(invoice.queryParams, 'status')
                          ? `${
                              statusDiscount.find((item) => {
                                return item.value === getFilter(invoice.queryParams, 'status');
                              })?.label
                            }`
                          : '',
                        dataIndex: '',
                      },
                      { title: '', dataIndex: '' },

                      { title: 'Chọn cửa hàng:', dataIndex: '' },
                      {
                        title: getFilter(invoice.queryParams, 'idSupplier')
                          ? `${
                              listSupplier?.find((item) => {
                                return item.id === getFilter(invoice.queryParams, 'idSupplier');
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
                        title: getFilter(invoice.queryParams, 'dateFrom')
                          ? dayjs(getFilter(invoice.queryParams, 'dateFrom')).format('DD/MM/YYYY')
                          : '',
                        dataIndex: '',
                      },
                      { title: '', dataIndex: '' },

                      { title: 'Đến ngày', dataIndex: '' },
                      {
                        title: getFilter(invoice.queryParams, 'dateTo')
                          ? dayjs(getFilter(invoice.queryParams, 'dateTo')).format('DD/MM/YYYY')
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
                        { title: invoice.result?.total?.total?.toLocaleString(), dataIndex: '' },
                        {
                          title: invoice.result?.total?.totalDiscount?.toLocaleString(),
                          dataIndex: '',
                        },
                        {
                          title: invoice.result?.total?.totalRevenue?.toLocaleString(),
                          dataIndex: '',
                        },
                        { title: '', dataIndex: '' },
                      ])
                      .saveAs(t('Doanh thu cửa hàng theo đơn hàng.xlsx'));
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
