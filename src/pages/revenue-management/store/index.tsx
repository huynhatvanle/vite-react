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
  const { result, queryParams, isLoading } = RevenueOderFace;
  const connectSupplierFacade = ConnectSupplierFacade();
  useEffect(() => {
    RevenueOderFace.get({});

    return () => {
      isReload.current && RevenueOderFace.get(param);
    };
  }, []);
  const storeorder = RevenueOderFace?.result?.data;
  const firstStore = storeorder?.[0]?.id;

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

  const statusCategoryOrder = [
    {
      label: t('supplier.Sup-Status.Sell goods'),
      value: 'DELEVERED',
    },
    {
      label: t('supplier.Sup-Status.Return goods'),
      value: 'REFUND',
    },
    {
      label: t('Đã huỷ'),
      value: 'CANCEL',
    },
  ];
  const statusCategoryProduct = [
    {
      label: t('Đang bán'),
      value: 'APPROVED',
    },
    {
      label: t('Ngừng bán'),
      value: 'STOP_SELLING',
    },
  ];

  useEffect(() => {
    if (activeKey == '2') {
      categoryFacade.get({});
      if (getFilter(invoiceKiotVietFacade.queryParams, 'idStore')) {
        connectSupplierFacade.get({
          page: 1,
          perPage: 1000,
          filter: { idSuppiler: getFilter(invoiceKiotVietFacade.queryParams, 'idStore') },
        });
      }
    }
  }, [activeKey, getFilter(invoiceKiotVietFacade.queryParams, 'idStore')]);

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
  const columnrevenueProduct: IExcelColumn[] = [
    { title: t('STT'), key: 'stt', dataIndex: 'STT' },
    { title: t('Mã sản phẩm'), key: 'productCode', dataIndex: 'productCode' },
    { title: t('Tên sản phẩm'), key: 'productName', dataIndex: 'productName' },
    { title: t('Mã vạch'), key: 'barcode', dataIndex: 'barcode' },
    { title: t('Nhà cung cấp'), key: 'supplierName', dataIndex: 'supplierName' },
    { title: t('Doanh thu'), key: 'revenue', dataIndex: 'revenue' },
    { title: t('Loại đơn'), key: 'status', dataIndex: 'status' },
  ];
  let i = 1;
  let sttDetail = 1;

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <Tabs
            defaultActiveKey="1"
            activeKey={activeKey}
            type="card"
            size="large"
            onTabClick={(key: string) => {
              onChangeTab(key);
            }}
          >
            <Tabs.TabPane tab={t('titles.Store-Revenue/Order')} key="1" className="">
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
                            idStore: firstStore,
                            dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                            dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
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
                        rightHeader={
                          <div className="flex justify-end text-left flex-col w-full mt-4 sm:mt-1.5 xl:mt-0">
                            <Form
                              values={{
                                dateFrom: getFilter(invoice.queryParams, 'dateFrom'),
                                dateTo: getFilter(invoice.queryParams, 'dateTo'),
                                status: getFilter(invoice.queryParams, 'status'),
                                idStore: getFilter(invoice.queryParams, 'idStore'),
                              }}
                              className="intro-x sm:flex justify-start sm:mt-2 xl:justify-end xl:mt-0 form-store"
                              columns={[
                                {
                                  title: '',
                                  name: 'status',
                                  formItem: {
                                    placeholder: 'placeholder.Select order type',
                                    type: 'select',
                                    tabIndex: 3,
                                    col: 6,
                                    list: statusCategoryOrder,
                                    onChange(value: any, form: any) {
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                          idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                          status: value ? value : '',
                                        },
                                      });
                                    },
                                  },
                                },
                                {
                                  name: 'idStore',
                                  title: '',
                                  formItem: {
                                    placeholder: 'placeholder.Choose a store',
                                    type: 'select',
                                    col: 6,
                                    list: storeorder?.map((item) => ({
                                      label: item?.name,
                                      value: item?.id!,
                                    })),
                                    onChange(value: any, form: any) {
                                      dataTableRefRevenueOder?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          idStore: value ? value : '',
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
                            <div className="w-full">
                              <Form
                                values={{
                                  dateFrom: getFilter(invoice.queryParams, 'dateFrom'),
                                  dateTo: getFilter(invoice.queryParams, 'dateTo'),
                                  status: getFilter(invoice.queryParams, 'status'),
                                  idStore: getFilter(invoice.queryParams, 'idStore'),
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
                                          <p className="whitespace-nowrap">{t('store.Since')}</p>
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
                                      type: 'date',
                                      onChange(value: any, form: any) {
                                        form.getFieldValue('dateFrom') && value > form.getFieldValue('dateTo')
                                          ? setDateOder(true)
                                          : setDateOder(false);
                                        dataTableRefRevenueOder?.current?.onChange({
                                          page: 1,
                                          perPage: 10,
                                          filter: {
                                            idSupplier: id,
                                            dateFrom: value
                                              ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/')
                                              : '',
                                            dateTo: form.getFieldValue('dateTo')
                                              ? form
                                                  .getFieldValue('dateTo')
                                                  .format('MM/DD/YYYY 23:59:59')
                                                  .replace(/-/g, '/')
                                              : '',
                                            idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
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
                                          <p className="whitespace-nowrap">{t('store.To date')}</p>
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
                                      type: 'date',
                                      onChange(value: any, form: any) {
                                        value && form.getFieldValue('dateTo') < form.getFieldValue('dateFrom')
                                          ? setDateOder(true)
                                          : setDateOder(false);
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
                                            idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                            status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                          },
                                        });
                                      },
                                    },
                                  },
                                ]}
                              />
                              {dateOrder && (
                                <div className="w-full flex">
                                  <span className="sm:w-[526px] text-center sm:text-right text-red-500">
                                    Ngày kết thúc phải lớn hơn ngày bắt đầu
                                  </span>
                                </div>
                              )}
                            </div>
                          </div>
                        }
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
                              render: (text: string) =>
                                text ? dayjs(text).format('DD/MM/YYYY').replace(/-/g, '/') : '',
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
                                  statusCategoryOrder.find((item) => {
                                    return item.value === getFilter(invoice.queryParams, 'status');
                                  })?.label
                                }`
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Chọn cửa hàng:', dataIndex: '' },
                          {
                            title: getFilter(invoice.queryParams, 'idStore')
                              ? `${
                                  storeorder?.find((item) => {
                                    return item.id === getFilter(invoice.queryParams, 'idStore');
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
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Store-Revenue/Product')} key="2" className="">
              <div className={'w-full mx-auto '}>
                <div className="px-5 bg-white pt-6 pb-4 rounded-xl rounded-tl-none">
                  {RevenueOderFace?.result?.data && (
                    <DataTable
                      className="form-supplier-tab4"
                      ref={dataTableRefRevenueProduct}
                      facade={invoiceKiotVietFacade}
                      defaultRequest={{
                        page: 1,
                        perPage: 10,
                        filter: {
                          idStore: firstStore,
                          dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                          dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                        },
                      }}
                      xScroll="1400px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.PaginationOrder', { from, to, total })
                      }
                      rightHeader={
                        <div className="flex justify-end text-left flex-col w-full mt-4 sm:mt-1.5 xl:mt-0">
                          <Form
                            values={{
                              categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                              categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                              categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                              dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                              dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                              status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                              idStore: getFilter(invoiceKiotVietFacade.queryParams, 'idStore'),
                              supplier: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                            }}
                            className="intro-x w-full xl:!flex xl:justify-end form-revenue-store form-header-category"
                            columns={[
                              {
                                title: '',
                                name: 'status',
                                formItem: {
                                  placeholder: 'Chọn trạng thái',
                                  type: 'select',
                                  tabIndex: 3,
                                  col: 4,
                                  list: statusCategoryProduct,
                                  onChange(value: any, form: any) {
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                        supplierId: form.getFieldValue('supplier')
                                          ? form.getFieldValue('supplier')
                                          : '',
                                        status: value ? value : '',
                                      },
                                    });
                                  },
                                },
                              },
                              {
                                name: 'idStore',
                                title: '',
                                formItem: {
                                  placeholder: 'placeholder.Choose a store',
                                  type: 'select',
                                  col: 4,
                                  list: storeorder?.map((item) => ({
                                    label: item?.name,
                                    value: item?.id!,
                                  })),
                                  onChange(value: any, form: any) {
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        idStore: value ? value : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                        supplierId: form.getFieldValue('supplier')
                                          ? form.getFieldValue('supplier')
                                          : '',
                                      },
                                    });
                                  },
                                },
                              },
                              {
                                name: 'supplier',
                                title: '',
                                formItem: {
                                  placeholder: 'Chọn nhà cung cấp',
                                  type: 'select',
                                  col: 4,
                                  list: supplier?.map((item) => ({
                                    label: item?.supplier?.name,
                                    value: item?.supplier?.id!,
                                  })),
                                  onChange(value: any, form: any) {
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                        supplierId: value ? value : '',
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                          />
                          <div className="w-full">
                            <Form
                              values={{
                                categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                                categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                                categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                                dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                                dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                                status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                                idStore: getFilter(invoiceKiotVietFacade.queryParams, 'idStore'),
                                supplierId: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                              }}
                              className="intro-x rounded-lg w-full xl:justify-end sm:flex justify-between form-store"
                              columns={[
                                {
                                  title: '',
                                  name: '',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 2,
                                    render: () => (
                                      <div className="flex h-10 items-center">
                                        <p className="whitespace-nowrap">{t('store.Since')}</p>
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
                                    type: 'date',
                                    onChange(value: any, form: any) {
                                      form.getFieldValue('dateFrom') && value > form.getFieldValue('dateTo')
                                        ? setDateProduct(true)
                                        : setDateProduct(false);
                                      dataTableRefRevenueProduct?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          categoryId1: form.getFieldValue('categoryId1')
                                            ? form.getFieldValue('categoryId1')
                                            : '',
                                          categoryId2: form.getFieldValue('categoryId2')
                                            ? form.getFieldValue('categoryId2')
                                            : '',
                                          categoryId3: form.getFieldValue('categoryId3')
                                            ? form.getFieldValue('categoryId3')
                                            : '',
                                          dateFrom: value ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/') : '',
                                          dateTo: form.getFieldValue('dateTo')
                                            ? form
                                                .getFieldValue('dateTo')
                                                .format('MM/DD/YYYY 23:59:59')
                                                .replace(/-/g, '/')
                                            : '',
                                          idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                          supplierId: form.getFieldValue('supplierId')
                                            ? form.getFieldValue('supplierId')
                                            : '',
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
                                        <p className="whitespace-nowrap">{t('store.To date')}</p>
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
                                    type: 'date',
                                    onChange(value: any, form: any) {
                                      value && form.getFieldValue('dateTo') < form.getFieldValue('dateFrom')
                                        ? setDateProduct(true)
                                        : setDateProduct(false);
                                      dataTableRefRevenueProduct?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          categoryId1: form.getFieldValue('categoryId1')
                                            ? form.getFieldValue('categoryId1')
                                            : '',
                                          categoryId2: form.getFieldValue('categoryId2')
                                            ? form.getFieldValue('categoryId2')
                                            : '',
                                          categoryId3: form.getFieldValue('categoryId3')
                                            ? form.getFieldValue('categoryId3')
                                            : '',
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form
                                                .getFieldValue('dateFrom')
                                                .format('MM/DD/YYYY 00:00:00')
                                                .replace(/-/g, '/')
                                            : '',
                                          dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                          idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                          status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                          supplierId: form.getFieldValue('supplierId')
                                            ? form.getFieldValue('supplierId')
                                            : '',
                                        },
                                      });
                                    },
                                  },
                                },
                              ]}
                            />
                            {dateProduct && (
                              <div className="w-full flex">
                                <span className="sm:w-[526px] text-center sm:text-right text-red-500">
                                  Ngày kết thúc phải lớn hơn ngày bắt đầu
                                </span>
                              </div>
                            )}
                          </div>
                          <Form
                            className="intro-x w-full xl:!flex xl:justify-end form-revenue-store form-header-category "
                            values={{
                              categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                              categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                              categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                              dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                              dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                              status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                              idStore: getFilter(invoiceKiotVietFacade.queryParams, 'idStore'),
                              supplier: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                            }}
                            columns={[
                              {
                                title: '',
                                name: 'categoryId1',
                                formItem: {
                                  placeholder: 'placeholder.Main categories',
                                  col: 3,
                                  type: 'select',
                                  list: category1?.map((item) => ({
                                    label: item?.name!,
                                    value: item?.id!,
                                  })),
                                  onChange(value, form) {
                                    setCategoryId1(value);
                                    setCategoryId2('');
                                    form.resetFields(['categoryId2', 'categoryId3']);
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId1: value ? value : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                        supplierId: form.getFieldValue('supplier')
                                          ? form.getFieldValue('supplier')
                                          : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      },
                                    });
                                  },
                                },
                              },
                              {
                                name: 'categoryId2',
                                title: '',
                                formItem: {
                                  placeholder: 'placeholder.Category level 1',
                                  type: 'select',
                                  col: 3,
                                  list: category2?.map((item) => ({
                                    label: item?.name!,
                                    value: item?.id!,
                                  })),
                                  disabled: (values: any, form: any) =>
                                    categoryId1 ? (category2?.length === 0 ? true : category2 ? false : true) : true,
                                  onChange(value, form) {
                                    setCategoryId2(value);
                                    form.resetFields(['categoryId3']);
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId: '',
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: value ? value : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                        supplierId: form.getFieldValue('supplier')
                                          ? form.getFieldValue('supplier')
                                          : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      },
                                      fullTextSearch: '',
                                    });
                                  },
                                },
                              },
                              {
                                name: 'categoryId3',
                                title: '',
                                formItem: {
                                  placeholder: 'placeholder.Category level 2',
                                  type: 'select',
                                  col: 3,
                                  list: category3?.map((item) => ({
                                    label: item?.name!,
                                    value: item?.id!,
                                  })),
                                  disabled: (values: any, form: any) =>
                                    categoryId2 ? (category3?.length === 0 ? true : category3 ? false : true) : true,
                                  onChange(value, form) {
                                    dataTableRefRevenueProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        categoryId: '',
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: value ? value : '',
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        idStore: form.getFieldValue('idStore') ? form.getFieldValue('idStore') : '',
                                        supplierId: form.getFieldValue('supplier')
                                          ? form.getFieldValue('supplier')
                                          : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      },
                                      fullTextSearch: '',
                                    });
                                  },
                                },
                              },
                            ]}
                          />
                        </div>
                      }
                      searchPlaceholder={t('placeholder.Search by order number')}
                      columns={[
                        {
                          title: `supplier.Order.STT`,
                          name: 'id',
                          tableItem: {
                            width: 70,
                            sorter: true,
                            render: (value: any, item: any) =>
                              JSON.parse(invoiceKiotVietFacade.queryParams || '{}').page != 1
                                ? `${
                                    JSON.parse(invoiceKiotVietFacade.queryParams || '{}').page *
                                      JSON.parse(invoiceKiotVietFacade.queryParams || '{}').perPage +
                                    stt1++
                                  }`
                                : `${stt1++}`,
                          },
                        },
                        {
                          title: `Mã sản phẩm`,
                          name: 'productCode',
                          tableItem: {
                            width: 175,
                            sorter: true,
                          },
                        },
                        {
                          title: `Tên sản phẩm`,
                          name: 'productName',
                          tableItem: {
                            width: 180,
                            sorter: true,
                          },
                        },
                        {
                          title: `Mã vạch`,
                          name: 'barcode',
                          tableItem: {
                            width: 135,
                            sorter: true,
                          },
                        },
                        {
                          title: `Nhà cung cấp`,
                          name: 'supplierName',
                          tableItem: {
                            width: 150,
                          },
                        },
                        {
                          title: `Doanh thu`,
                          name: 'revenue',
                          tableItem: {
                            width: 145,
                            render: (text: string) => text.toLocaleString(),
                          },
                        },
                        {
                          title: `Trạng thái`,
                          name: 'total',
                          tableItem: {
                            width: 100,
                            render: (text: string, item: any) =>
                              item?.status === 'APPROVED' ? (
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
                  )}
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={invoiceKiotVietFacade.result?.data?.length === 0 ? true : false}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => {
                        const Product = invoiceKiotVietFacade?.result?.data?.map((item) => {
                          return {
                            STT: i++,
                            productCode: item.productCode,
                            productName: item.productName,
                            barcode: item.barcode,
                            supplierName: item.supplierName,
                            revenue: item.revenue?.toLocaleString(),
                            status:
                              item.status === 'APPROVED'
                                ? t('Đang bán')
                                : item.status === 'STOP_SELLING'
                                ? t('Ngừng bán')
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
                          { title: 'BÁO CÁO DOANH THU CỬA HÀNG THEO SẢN PHẨM', dataIndex: '' },
                        ]);
                        sheet.addRow();
                        sheet.addColumns([
                          { title: 'Tìm kiếm:', dataIndex: '' },
                          {
                            title: JSON.parse(invoiceKiotVietFacade.queryParams || '{}').fullTextSearch || '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },
                        ]);
                        sheet.addRow();
                        sheet.addColumns([
                          { title: 'Chọn trạng thái:', dataIndex: '' },
                          {
                            title: getFilter(invoiceKiotVietFacade.queryParams, 'status')
                              ? `${
                                  statusCategoryProduct.find((item) => {
                                    return item.value === getFilter(invoiceKiotVietFacade.queryParams, 'status');
                                  })?.label
                                }`
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Chọn cửa hàng:', dataIndex: '' },
                          {
                            title: getFilter(invoiceKiotVietFacade.queryParams, 'idStore')
                              ? `${
                                  storeorder?.find((item) => {
                                    return item.id === getFilter(invoiceKiotVietFacade.queryParams, 'idStore');
                                  })?.name
                                }`
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },
                          { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                          {
                            title: getFilter(invoiceKiotVietFacade.queryParams, 'idSupplier')
                              ? `${
                                  supplier?.find((item) => {
                                    return item.id === getFilter(invoiceKiotVietFacade.queryParams, 'idSupplier');
                                  })?.supplier?.name
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
                            title: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom')
                              ? dayjs(getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom')).format('DD/MM/YYYY')
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },

                          { title: 'Đến ngày', dataIndex: '' },
                          {
                            title: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo')
                              ? dayjs(getFilter(invoiceKiotVietFacade.queryParams, 'dateTo')).format('DD/MM/YYYY')
                              : '',
                            dataIndex: '',
                          },
                          { title: '', dataIndex: '' },
                        ]);
                        sheet.addRow();
                        sheet
                          .addColumns(columnrevenueProduct)
                          .addDataSource(Product ?? [], {
                            str2Percent: true,
                          })
                          .addColumns([
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: 'Tổng cộng', dataIndex: '' },
                            { title: invoiceKiotVietFacade.result?.total?.total?.toLocaleString(), dataIndex: '' },
                            { title: '', dataIndex: '' },
                          ])
                          .saveAs(t('Doanh thu cửa hàng theo sản phẩm.xlsx'));
                      }}
                    />
                  </div>
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
