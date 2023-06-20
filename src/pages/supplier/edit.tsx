import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Supplier, SupplierFacade } from '@store/supplier';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';
import { getFilter, language, languages, routerLinks } from '@utils';
import {
  CategoryFacade,
  GlobalFacade,
  ProductFacade,
  OrdersFacade,
  DiscountFacade,
  inventoryOrdersFacade,
  InventorySupplierFacade,
  InventoryListProductFacade,
  DocumentsubFacade,
} from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { ProvinceFacade } from '@store/address/province';
import { DownArrow, Download, UploadIcon } from '@svgs';
import { Dropdown, Select, Tabs } from 'antd';
import dayjs from 'dayjs';
import Upload from 'antd/es/upload/Upload';
import { Excel } from 'antd-table-saveas-excel';

const Page = () => {
  const { t } = useTranslation();
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const { formatDate } = GlobalFacade();

  const dataTableRefProduct = useRef<TableRefObject>(null);
  const dataTableRefDiscount = useRef<TableRefObject>(null);
  const dataTableRefRevenue = useRef<TableRefObject>(null);
  const dataTableRefListProduct = useRef<TableRefObject>(null);

  const productFacade = ProductFacade();
  const ordersFacade = OrdersFacade();
  const discountFacade = DiscountFacade();
  const inventoryOrders = inventoryOrdersFacade();
  const inventoryProduct = InventoryListProductFacade();
  const categoryFacade = CategoryFacade();
  const documentsub = DocumentsubFacade();
  const InventorySupplier = InventorySupplierFacade();
  const { putSub } = documentsub;
  // const inventorySupplier = InventorySupplierFacade();
  const [revenue, setRevenue] = useState(true);
  const [cap1, setCap1] = useState(true);
  const [cap2, setCap2] = useState(true);
  const [categoryId1, setCategoryId1] = useState('');
  const [categoryId2, setCategoryId2] = useState('');
  const category1 = categoryFacade.result?.data;
  const inven = InventorySupplier.result?.data;

  const category2 = categoryFacade.result2?.data;
  const category3 = categoryFacade.result3?.data;
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (id) {
      supplierFacade.getById({ id });
      documentsub.get({ id });
      InventorySupplier.get({ id });
    }
    categoryFacade.get({});

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    if (categoryId1) {
      categoryFacade.get2({ id: categoryId1 });
    }
  }, [categoryId1]);

  useEffect(() => {
    if (categoryId2) {
      categoryFacade.get3({ id: categoryId2 });
    }
  }, [categoryId2]);

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        navigate(`/${lang}${routerLinks('Supplier')}?${new URLSearchParams(param).toString()}`);
        break;
    }
  }, [status]);
  useEffect(() => {
    if (id) documentsub.get({ id });

    return () => {
      isReload.current && documentsub.get({ id });
    };
  }, [documentsub.data]);

  const data1 = documentsub.result?.data;
  const revenueTotal = inventoryOrders.result?.statistical?.totalRenueve?.toLocaleString();
  const discountTotal = discountFacade.result?.totalCommissionSupplier?.toLocaleString();

  const subHeader = [
    {
      title: t('supplier.Sup-Revenue.Revenue'),
      total: revenueTotal + ' VND',
    },
    {
      title: t('supplier.Sup-Revenue.Total number of successful orders'),
      total: inventoryOrders.result?.statistical?.totalOderSuccess,
    },
    {
      title: t('supplier.Sup-Revenue.Total number of returned orders'),
      total: inventoryOrders.result?.statistical?.totalOderReturn,
    },
    {
      title: t('supplier.Sup-Revenue.Total number of canceled orders'),
      total: inventoryOrders.result?.statistical?.totalOderCancel,
    },
  ];
  const listStatusDiscount = [
    {
      label: t('supplier.Order.Paid'),
      value: 'PAID',
    },
    {
      label: t('supplier.Order.Unpaid'),
      value: 'NOT_PAID',
    },
    {
      label: t('supplier.Order.Unfinish'),
      value: 'NOT_COMPLETED_PAID',
    },
  ];
  const statusCategory = [
    {
      label: t('supplier.Sup-Status.Sell goods'),
      value: 'RECIEVED',
    },
    {
      label: t('supplier.Sup-Status.Return goods'),
      value: 'RETURN',
    },
  ];
  const statusRevenue = [
    {
      label: t('supplier.Sup-Status.Selling'),
      value: 'APPROVED',
    },
    {
      label: t('supplier.Sup-Status.Discontinued'),
      value: 'STOP_SELLING',
    },
  ];
  const statusContract = [
    {
      label: t('supplier.Sup-Status.Signed'),
      value: 'SIGNED_CONTRACT',
    },
    {
      label: t('supplier.Sup-Status.Waiting'),
      value: 'STOP_SELLING',
    },
  ];

  interface IExcelColumn {
    title: string;
    key: string;
    dataIndex: string;
  }
  const columnheaderproduct: IExcelColumn[] = [
    { title: t('placeholder.Main categories'), key: 'categoryId1', dataIndex: 'categoryId1' },
    { title: t(''), key: '', dataIndex: '' },
    { title: t(''), key: '', dataIndex: '' },
    { title: t('placeholder.Category level 1'), key: 'categoryId2', dataIndex: 'categoryId2' },
    { title: t(''), key: '', dataIndex: '' },
    { title: t(''), key: '', dataIndex: '' },
    { title: t('placeholder.Category level 2'), key: 'categoryId3', dataIndex: 'categoryId3' },
    { title: t(''), key: '', dataIndex: '' },
    { title: t(''), key: '', dataIndex: '' },
  ];
  const columnproduct: IExcelColumn[] = [
    { title: t('product.STT'), key: 'stt', dataIndex: 'stt' },
    { title: t('product.Code'), key: 'code', dataIndex: 'code' },
    { title: t('product.Name'), key: 'name', dataIndex: 'name' },
    { title: t('product.Storecode'), key: 'barcode', dataIndex: 'barcode' },
    { title: t('product.Category'), key: 'category', dataIndex: 'category' },
    { title: t('product.Unit'), key: 'basicUnit', dataIndex: 'basicUnit' },
    { title: t('product.Price'), key: 'price', dataIndex: 'price' },
    { title: t('product.Status'), key: 'approveStatus', dataIndex: 'approveStatus' },
    { title: t('product.Image link'), key: 'photos', dataIndex: 'photos' },
  ];
  const columnrevenue: IExcelColumn[] = [
    { title: t('supplier.Order.STT'), key: 'stt', dataIndex: 'STT' },
    { title: t('supplier.Order.Order ID'), key: 'code', dataIndex: 'code' },
    { title: t('supplier.Order.Store Name'), key: 'name', dataIndex: 'name' },
    { title: t('supplier.Order.Order Date'), key: 'pickUpDate', dataIndex: 'pickUpDate' },
    { title: t('supplier.Order.Delivery Date'), key: 'completedDate', dataIndex: 'completedDate' },
    { title: t('supplier.Order.Before Tax'), key: 'BeforeTax', dataIndex: 'BeforeTax' },
    { title: t('supplier.Order.After Tax'), key: 'AfterTax', dataIndex: 'AfterTax' },
    { title: t('supplier.Order.Promotion'), key: 'voucherAmount', dataIndex: 'voucherAmount' },
    { title: t('supplier.Order.Total Amount'), key: 'Total', dataIndex: 'Total' },
    { title: t('supplier.Order.Order Type'), key: 'Type', dataIndex: 'Type' },
  ];
  const columnInventoryProduct: IExcelColumn[] = [
    { title: t('supplier.Order.STT'), key: 'stt', dataIndex: 'STT' },
    { title: t('product.Code'), key: 'productCode', dataIndex: 'productCode' },
    { title: t('product.Name'), key: 'productName', dataIndex: 'productName' },
    { title: t('product.Storecode'), key: 'barcode', dataIndex: 'barcode' },
    { title: t('supplier.Order.Revenue Before Tax'), key: 'subTotal', dataIndex: 'subTotal' },
    { title: t('supplier.Order.After Tax'), key: 'total', dataIndex: 'total' },
    { title: t('product.status'), key: 'status', dataIndex: 'status' },
  ];
  const columnDiscount: IExcelColumn[] = [
    { title: t('supplier.Order.STT'), key: 'stt', dataIndex: 'STT' },
    { title: t('supplier.Order.Time'), key: 'date', dataIndex: 'date' },
    { title: t('supplier.Order.Discount'), key: 'commision', dataIndex: 'commision' },
    { title: t('supplier.Order.Paid'), key: 'paid', dataIndex: 'paid' },
    { title: t('supplier.Order.Unpaid'), key: 'unPaid', dataIndex: 'unPaid' },
    { title: t('product.status'), key: 'status', dataIndex: 'status' },
  ];

  const handleBack = () => navigate(`/${lang}${routerLinks('Supplier')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: Supplier) => {
    supplierFacade.put({ ...values, id });
  };
  let stt = 1;
  let stt1 = 1;
  let stt2 = 1;
  let i = 1;

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <Tabs
            defaultActiveKey={sessionStorage.getItem('activeTab') || '1'}
            onChange={(key) => sessionStorage.setItem('activeTab', key)}
            type="card"
            size="large"
            onTabClick={(activeKey: any) => navigate(`/${lang}${routerLinks('Supplier/Edit')}/${id}?tab=${activeKey}`)}
          >
            <Tabs.TabPane tab={t('titles.Supplierinformation')} key="1" className="">
              {!isLoading && (
                <Form
                  values={{
                    ...data,
                    street: data?.address?.street,
                    nameContact: data?.userRole?.[0].userAdmin.name,
                    emailContact: data?.userRole?.[0].userAdmin.email,
                    phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
                  }}
                  className="intro-x form-responsive"
                  columns={[
                    {
                      title: 'supplier.CodeName',
                      name: 'code',
                      formItem: {
                        disabled: () => true,
                        tabIndex: 1,
                        col: 4,
                      },
                    },
                    {
                      title: 'supplier.Name',
                      name: 'name',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'store.Fax',
                      name: 'fax',
                      formItem: {
                        tabIndex: 2,
                        col: 4,
                        rules: [{ type: 'phone', min: 8, max: 12 }],
                      },
                    },
                    {
                      title: '',
                      name: 'address',
                      formItem: {
                        rules: [{ type: 'required' }],
                        render() {
                          return <h3 className="mb-2.5 text-base ">{t('store.Store Address')}</h3>;
                        },
                      },
                    },
                    {
                      title: 'store.Province',
                      name: 'provinceId',
                      formItem: {
                        firstLoad: () => ({}),
                        tabIndex: 3,
                        col: 3,
                        rules: [{ type: 'requiredSelect' }],
                        type: 'select',
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
                        firstLoad: () => ({ fullTextSearch: '', code: `${data?.address?.province?.code}` }),
                        type: 'select',
                        rules: [{ type: 'requiredSelect' }],
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
                        firstLoad: () => ({ fullTextSearch: '', code: `${data?.address?.district?.code}` }),
                        type: 'select',
                        rules: [{ type: 'requiredSelect' }],
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
                        tabIndex: 1,
                        col: 3,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: '',
                      name: '',
                      formItem: {
                        render() {
                          return (
                            <div className="text-xl text-teal-900 font-bold mb-2.5">
                              {t('store.Representative information')}
                            </div>
                          );
                        },
                      },
                    },
                    {
                      title: 'store.ContactName',
                      name: 'nameContact',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        type: 'name',
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'store.Contact Phone Number',
                      name: 'phoneNumber',
                      formItem: {
                        tabIndex: 2,
                        col: 4,
                        rules: [{ type: 'required' }, { type: 'phone', min: 8, max: 12 }],
                      },
                    },
                    {
                      title: 'store.Contact Email',
                      name: 'emailContact',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' }, { type: 'email' }],
                      },
                    },
                    {
                      title: 'store.Note',
                      name: 'note',
                      formItem: {
                        type: 'textarea',
                        tabIndex: 1,
                        col: 12,
                      },
                    },
                  ]}
                  handSubmit={handleSubmit}
                  disableSubmit={isLoading}
                  handCancel={handleBack}
                />
              )}
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Listofgoods')} key="2" className="max-lg:-mt-3">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pb-4">
                  <DataTable
                    facade={productFacade}
                    ref={dataTableRefProduct}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: { supplierId: id, type: 'BALANCE' },
                    }}
                    xScroll="895px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationProduct', { from, to, total })
                    }
                    columns={[
                      {
                        title: `product.Code`,
                        name: 'code',
                        tableItem: {
                          width: 170,
                          sorter: true,
                          filter: { type: 'search' },
                        },
                      },
                      {
                        title: `product.Name`,
                        name: 'name',
                        tableItem: {
                          width: 300,
                          sorter: true,
                          filter: { type: 'search' },
                          render: (value: any, item: any) => item?.name,
                        },
                      },
                      {
                        title: `product.Category`,
                        name: 'category',
                        tableItem: {
                          width: 205,
                          render: (value: any, item: any) =>
                            item?.category?.child?.child?.name || item?.category?.child?.name,
                        },
                      },
                      {
                        title: `product.Price`,
                        name: 'price',
                        tableItem: {
                          width: 280,
                          render: (value: any, item: any) => item?.productPrice[0]?.price.toLocaleString(),
                        },
                      },
                      {
                        title: `product.Status`,
                        name: 'isActive',
                        tableItem: {
                          width: 160,
                          align: 'center',
                          render: (text: string, item: any) =>
                            item?.approveStatus === 'APPROVED' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('supplier.Sup-Status.Selling')}
                              </div>
                            ) : (
                              <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                {t('supplier.Sup-Status.Discontinued')}
                              </div>
                            ),
                        },
                      },
                    ]}
                    subHeader={() => (
                      <div className="flex flex-col-reverse lg:flex-row">
                        <Form
                          className="intro-x rounded-lg w-full form-store form-header-category col-supplier mt-5"
                          values={{
                            categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                            categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                            categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
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
                                // firstLoad: () => ({}),
                                // get: {
                                //   facade: CategoryFacade,
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                // },
                                onChange(value, form) {
                                  setCategoryId1(value);
                                  setCategoryId2('');
                                  form.resetFields(['categoryId2', 'categoryId3']);
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      type: 'BALANCE',
                                      categoryId1: value ? value : '',
                                      supplierId: id,
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
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      supplierId: id,
                                      type: 'BALANCE',
                                      categoryId2: value ? value : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                    },
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
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      supplierId: id,
                                      type: 'BALANCE',
                                      categoryId3: value ? value : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                    },
                                  });
                                },
                              },
                            },
                          ]}
                          disableSubmit={isLoading}
                        />
                        <div className={'h-10 w-36 mt-6 lg:flex '}>
                          {
                            <Button
                              className={
                                productFacade.result?.data?.length !== 0
                                  ? '!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                                  : '!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-300 !text-gray-300 cursor-not-allowed'
                              }
                              icon={
                                <Download className="icon-cud !p-0 !h-5 !w-5 !fill-current group-hover:!fill-white" />
                              }
                              text={t('titles.Export Excel file')}
                              disabled={productFacade.result?.data?.length === 0 ? true : false}
                              onClick={() => {
                                const dataProduct = productFacade?.result?.data?.map((item) => {
                                  return {
                                    stt: i++,
                                    code: item.code,
                                    name: item.name,
                                    barcode: item.barcode,
                                    category: item.category?.child?.name || item.category?.child?.child?.name,
                                    basicUnit: item.basicUnit,
                                    price: item.productPrice?.[0]?.price.toLocaleString(),
                                    approveStatus:
                                      item.approveStatus === 'APPROVED'
                                        ? t('supplier.Sup-Status.Selling')
                                        : t('supplier.Sup-Status.Discontinued'),
                                    photos: item.photos?.[0]?.url,
                                  };
                                });
                                const excel = new Excel();

                                excel
                                  .addSheet('test')
                                  .addColumns([
                                    { title: 'Danh muc chính', dataIndex: '' },
                                    {
                                      title: getFilter(productFacade.queryParams, 'categoryId1')
                                        ? `${
                                            categoryFacade.result?.data?.find((item) => {
                                              return item.id === getFilter(productFacade.queryParams, 'categoryId1');
                                            })?.name
                                          }`
                                        : '',
                                      dataIndex: '',
                                    },
                                    { title: 'Danh muc cấp 1', dataIndex: '' },
                                    {
                                      title: getFilter(productFacade.queryParams, 'categoryId2')
                                        ? `${
                                            categoryFacade.result2?.data?.find((item) => {
                                              return item.id === getFilter(productFacade.queryParams, 'categoryId2');
                                            })?.name
                                          }`
                                        : '',
                                      dataIndex: '',
                                    },
                                    { title: 'Danh muc cấp 2', dataIndex: '' },
                                    {
                                      title: getFilter(productFacade.queryParams, 'categoryId3')
                                        ? `${
                                            categoryFacade.result3?.data?.find((item) => {
                                              return item.id === getFilter(productFacade.queryParams, 'categoryId3');
                                            })?.name
                                          }`
                                        : '',
                                      dataIndex: '',
                                    },
                                  ])
                                  .addColumns(columnproduct)
                                  .addDataSource(dataProduct ?? [], {
                                    str2Percent: true,
                                  })
                                  .saveAs(t('product.List'));
                              }}
                            />
                          }
                        </div>
                      </div>
                    )}
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
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Ordermanagement')} key="3" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pt-6 pb-4">
                  <DataTable
                    facade={ordersFacade}
                    defaultRequest={{ page: 1, perPage: 10, filter: { filterSupplier: id } }}
                    xScroll="1400px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationOrder', { from, to, total })
                    }
                    columns={[
                      {
                        title: t(`supplier.Order.Order ID`),
                        name: 'code',
                        tableItem: {
                          width: 280,
                        },
                      },
                      {
                        title: t(`supplier.Order.Store Name`),
                        name: 'name',
                        tableItem: {
                          width: 180,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: t(`supplier.Order.Recipient`),
                        name: 'storeAdmin',
                        tableItem: {
                          width: 180,
                          render: (value: any, item: any) => item?.storeAdmin?.name,
                        },
                      },
                      {
                        title: t(`supplier.Order.Delivery Address`),
                        name: 'Address',
                        tableItem: {
                          width: 300,
                          render: (value: any, item: any) =>
                            item?.store?.address?.street +
                            ', ' +
                            item?.store?.address?.ward?.name +
                            ', ' +
                            item?.store?.address?.district?.name +
                            ', ' +
                            item?.store?.address?.province?.name,
                        },
                      },
                      {
                        title: t(`supplier.Order.Total Price (VND)`),
                        name: 'total',
                        tableItem: {
                          width: 150,
                          render: (value: any, item: any) => parseInt(item?.total).toLocaleString(),
                        },
                      },
                      {
                        title: t(`supplier.Order.Order Date`),
                        name: 'createdAt',
                        tableItem: {
                          width: 150,
                          render: (text: string) => (text ? dayjs(text).format(formatDate) : ''),
                        },
                      },
                      {
                        title: t(`product.Status`),
                        name: 'isActive',
                        tableItem: {
                          width: 180,
                          align: 'center',
                          render: (value: any, item: any) =>
                            item?.status === 'DELIVERED' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('supplier.Sup-Status.Shipped')}
                              </div>
                            ) : item?.status === 'WAITING_APPROVED' ? (
                              <div className="bg-yellow-50 text-center p-1 border border-yellow-500 text-yellow-500 rounded">
                                {t('supplier.Sup-Status.WAITING APPROVED')}
                              </div>
                            ) : item?.status === 'DELIVERY_RECEIVE' || item?.status === 'DELIVERY_RECEIVING' ? (
                              <div className="bg-blue-100 text-center p-1 border border-blue-500 text-blue-600 rounded">
                                {t('supplier.Sup-Status.Shipping')}
                              </div>
                            ) : item?.status === 'WAITING_PICKUP' ? (
                              <div className="bg-orange-50 text-center p-1 border border-orange-500 text-orange-500 rounded">
                                {t('supplier.Sup-Status.WAITING PICKUP')}
                              </div>
                            ) : (
                              <div className="bg-red-100 text-center p-1 border border-red-500 text-red-500 rounded">
                                {t('supplier.Sup-Status.Cancelled')}
                              </div>
                            ),
                        },
                      },
                    ]}
                  />
                </div>
              </div>
              <div className=" flex items-center justify-center mt-2 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4'}
                  onClick={handleBack}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown
                  className=""
                  trigger={['click']}
                  menu={{
                    className: 'top-2 left-10',
                    items: [
                      {
                        key: '0',
                        className: 'hover:!bg-white !p-0 !text-base !font-semibold !text-gray-400',
                        label: (
                          <div
                            onClick={() => setRevenue(true)}
                            className={`${revenue ? 'text-gray-800 bg-gray-100 p-2 rounded-2xl' : 'p-2'}`}
                          >
                            {t('store.Revenue by order')}
                          </div>
                        ),
                      },
                      {
                        key: '1',
                        className: 'hover:!bg-white !p-0 !text-base !font-semibold !text-gray-400',
                        label: (
                          <div
                            onClick={() => setRevenue(false)}
                            className={`${!revenue ? 'text-gray-800 bg-gray-100 p-2 rounded-2xl' : 'p-2'}`}
                          >
                            {t('store.Revenue by product')}
                          </div>
                        ),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <section className="flex items-center">
                    <h1>{t('titles.Revenue')}</h1>
                    <DownArrow className="w-4 h-4 ml-2" />
                  </section>
                </Dropdown>
              }
              key="4"
              className="rounded-xl"
            >
              {revenue ? (
                <div className={'w-full mx-auto '}>
                  <div className="px-5 bg-white pt-6 pb-4 rounded-xl">
                    <DataTable
                      ref={dataTableRefRevenue}
                      facade={inventoryOrders}
                      defaultRequest={{
                        page: 1,
                        perPage: 10,
                        filter: {
                          idSupplier: id,
                          filterDate: {
                            dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                            dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                          },
                        },
                      }}
                      xScroll="1400px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.PaginationOrder', { from, to, total })
                      }
                      rightHeader={
                        <div className="flex justify-end text-left flex-col w-full">
                          <Form
                            values={{
                              dateFrom: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateFrom,
                              dateTo: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateTo,
                              type: getFilter(inventoryOrders.queryParams, 'type'),
                              Store: getFilter(inventoryOrders.queryParams, 'idStore'),
                            }}
                            className="intro-x sm:flex justify-start sm:mt-2 lg:justify-end lg:mt-0 form-store"
                            columns={[
                              {
                                title: '',
                                name: 'type',
                                formItem: {
                                  placeholder: 'placeholder.Select order type',
                                  type: 'select',
                                  tabIndex: 3,
                                  col: 6,
                                  list: statusCategory,
                                  onChange(value, form) {
                                    dataTableRefRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        },
                                        idStore: form.getFieldValue('Store') ? form.getFieldValue('Store') : '',
                                        type: value ? value : '',
                                      },
                                    });
                                  },
                                },
                              },
                              {
                                name: 'Store',
                                title: '',
                                formItem: {
                                  placeholder: 'placeholder.Choose a store',
                                  type: 'select',
                                  col: 6,
                                  list: inven?.map((item) => ({
                                    label: item?.name!,
                                    value: item?.id!,
                                  })),
                                  // get: {
                                  //   facade: InventorySupplierFacade,
                                  //   format: (item: any) => ({
                                  //     label: item.name,
                                  //     value: item.id,
                                  //   }),
                                  //   params: (fullTextSearch, value) => ({
                                  //     id: id,
                                  //   }),
                                  // },
                                  onChange(value, form) {
                                    dataTableRefRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        idStore: value ? value : '',
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        },
                                        type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                          <Form
                            values={{
                              dateFrom: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateFrom,
                              dateTo: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateTo,
                              type: getFilter(inventoryOrders.queryParams, 'type'),
                              Store: getFilter(inventoryOrders.queryParams, 'idStore'),
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
                                      <p>{t('store.Since')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        filterDate: {
                                          dateFrom: value ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/') : '',
                                          dateTo: form.getFieldValue('dateTo')
                                            ? form
                                                .getFieldValue('dateTo')
                                                .format('MM/DD/YYYY 23:59:59')
                                                .replace(/-/g, '/')
                                            : '',
                                        },
                                        idStore: form.getFieldValue('Store') ? form.getFieldValue('Store') : '',
                                        type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
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
                                      <p>{t('store.To date')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form
                                                .getFieldValue('dateFrom')
                                                .format('MM/DD/YYYY 00:00:00')
                                                .replace(/-/g, '/')
                                            : '',
                                          dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                        },
                                        idStore: form.getFieldValue('Store') ? form.getFieldValue('Store') : '',
                                        type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
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
                              JSON.parse(inventoryOrders.queryParams || '{}').page != 1
                                ? `${
                                    JSON.parse(inventoryOrders.queryParams || '{}').page *
                                      JSON.parse(inventoryOrders.queryParams || '{}').perPage +
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
                          title: `supplier.Order.Store Name`,
                          name: 'storeName',
                          tableItem: {
                            width: 180,
                          },
                        },
                        {
                          title: `supplier.Order.Order Date`,
                          name: 'pickUpDate',
                          tableItem: {
                            width: 135,
                            render: (text: string) => (text ? dayjs(text).format(formatDate).replace(/-/g, '/') : ''),
                          },
                        },
                        {
                          title: `supplier.Order.Delivery Date`,
                          name: 'completedDate',
                          tableItem: {
                            width: 150,
                            render: (text: string) => (text ? dayjs(text).format(formatDate).replace(/-/g, '/') : ''),
                          },
                        },
                        {
                          title: `supplier.Order.Before Tax`,
                          name: 'subTotal',
                          tableItem: {
                            width: 145,
                            render: (value: any, item: any) => item?.subTotal?.toLocaleString(),
                          },
                        },
                        {
                          title: `supplier.Order.After Tax`,
                          name: 'total',
                          tableItem: {
                            width: 130,
                            render: (value: any, item: any) => item?.total?.toLocaleString(),
                          },
                        },
                        {
                          title: `supplier.Order.Promotion`,
                          name: 'voucherAmount',
                          tableItem: {
                            width: 160,
                            render: (value: any, item: any) => item?.voucherAmount?.toLocaleString(),
                          },
                        },
                        {
                          title: `supplier.Order.Total Amount`,
                          name: 'total',
                          tableItem: {
                            width: 145,
                            render: (value: any, item: any) => item?.total.toLocaleString(),
                          },
                        },
                        {
                          title: `supplier.Order.Order Type`,
                          name: 'total',
                          tableItem: {
                            width: 100,
                            render: (text: string, item: any) =>
                              item?.billType === 'RECIEVED' ? (
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
                      subHeader={() => (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 mt-10 sm:mb-3 mb-4">
                          {subHeader.map((e) => (
                            <div className="w-full rounded-xl shadow-[0_0_9px_rgb(0,0,0,0.25)] pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-28 mb-4">
                              <h1 className="font-bold mb-3">{e.title}</h1>
                              <span className="text-teal-900 text-xl font-bold mt-auto">{e.total}</span>
                            </div>
                          ))}
                        </div>
                      )}
                    />
                    <div className="flex sm:justify-end justify-center items-center p-5">
                      <Button
                        disabled={inventoryOrders.result?.data?.length === 0 ? true : false}
                        text={t('titles.Export report')}
                        className={
                          'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                        }
                        onClick={() => {
                          const inventory = inventoryOrders?.result?.data?.map((item) => {
                            return {
                              STT: i++,
                              code: item.invoiceCode,
                              name: item.storeName,
                              pickUpDate: item.pickUpDate
                                ? dayjs(item.pickUpDate).format(formatDate).replace(/-/g, '/')
                                : '',
                              completedDate: item.completedDate
                                ? dayjs(item.completedDate).format(formatDate).replace(/-/g, '/')
                                : '',
                              BeforeTax: item.subTotal?.toLocaleString(),
                              AfterTax: item.total?.toLocaleString(),
                              voucherAmount: item.voucherAmount,
                              Total: item.total?.toLocaleString(),
                              Type:
                                item.billType === 'RECIEVED'
                                  ? t('supplier.Sup-Status.Sell goods')
                                  : t('supplier.Sup-Status.Return goods'),
                            };
                          });
                          const excel = new Excel();
                          excel
                            .addSheet('test')
                            .addColumns(columnrevenue)
                            .addDataSource(inventory ?? [], {
                              str2Percent: true,
                            })
                            .saveAs(t('supplier.Supplier revenue Order'));
                        }}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="px-5 pt-6 pb-4 bg-white rounded-xl">
                  <DataTable
                    ref={dataTableRefListProduct}
                    facade={inventoryProduct}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        idSupplier: data?.id,
                        filterDate: {
                          dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                          dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                        },
                      },
                    }}
                    xScroll="1400px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationProduct', { from, to, total })
                    }
                    subHeader={() => (
                      <>
                        <div className="flex justify-start text-left flex-col xl:flex-row w-full">
                          <Form
                            values={{
                              categoryId1: getFilter(inventoryProduct.queryParams, 'categoryId1'),
                              categoryId2: getFilter(inventoryProduct.queryParams, 'categoryId2'),
                              categoryId3: getFilter(inventoryProduct.queryParams, 'categoryId3'),
                              dateFrom: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateFrom,
                              dateTo: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateTo,
                              status: getFilter(inventoryProduct.queryParams, 'status'),
                            }}
                            className="intro-x sm:flex justify-start items-center rounded-lg form-store "
                            columns={[
                              {
                                title: '',
                                name: 'status',
                                formItem: {
                                  placeholder: 'placeholder.Select status',
                                  type: 'select',
                                  list: statusRevenue,
                                  onChange(value, form) {
                                    dataTableRefListProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: data?.id,
                                        categoryId: '',
                                        idStore: '',
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        status: value,
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        },
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                          <Form
                            values={{
                              categoryId1: getFilter(inventoryProduct.queryParams, 'categoryId1'),
                              categoryId2: getFilter(inventoryProduct.queryParams, 'categoryId2'),
                              categoryId3: getFilter(inventoryProduct.queryParams, 'categoryId3'),
                              dateFrom: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateFrom,
                              dateTo: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateTo,
                              status: getFilter(inventoryProduct.queryParams, 'status'),
                            }}
                            className="intro-x w-full sm:flex mt-2 form-store items-center"
                            columns={[
                              {
                                title: '',
                                name: '',
                                formItem: {
                                  tabIndex: 3,
                                  col: 2,
                                  render: () => (
                                    <div className="flex h-10 items-center xl:ml-4 ml-0">
                                      <p>{t('store.Since')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefListProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                        filterDate: {
                                          dateFrom: value ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/') : '',
                                          dateTo: form.getFieldValue('dateTo')
                                            ? form
                                                .getFieldValue('dateTo')
                                                .format('MM/DD/YYYY 23:59:59')
                                                .replace(/-/g, '/')
                                            : '',
                                        },
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
                                      <p>{t('store.To date')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefListProduct?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        categoryId1: form.getFieldValue('categoryId1')
                                          ? form.getFieldValue('categoryId1')
                                          : '',
                                        categoryId2: form.getFieldValue('categoryId2')
                                          ? form.getFieldValue('categoryId2')
                                          : '',
                                        categoryId3: form.getFieldValue('categoryId3')
                                          ? form.getFieldValue('categoryId3')
                                          : '',
                                        status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form
                                                .getFieldValue('dateFrom')
                                                .format('MM/DD/YYYY 00:00:00')
                                                .replace(/-/g, '/')
                                            : '',
                                          dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                        },
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                        </div>
                        <Form
                          className="intro-x rounded-lg w-full form-store form-header-category col-supplier"
                          values={{
                            categoryId1: getFilter(inventoryProduct.queryParams, 'categoryId1'),
                            categoryId2: getFilter(inventoryProduct.queryParams, 'categoryId2'),
                            categoryId3: getFilter(inventoryProduct.queryParams, 'categoryId3'),
                            dateFrom: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateFrom,
                            dateTo: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateTo,
                            status: getFilter(inventoryProduct.queryParams, 'status'),
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
                                // firstLoad: () => ({}),
                                // get: {
                                //   facade: CategoryFacade,
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                // },
                                onChange(value, form) {
                                  setCategoryId1(value);
                                  setCategoryId2('');
                                  form.resetFields(['categoryId2', 'categoryId3']);
                                  dataTableRefListProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idSupplier: id,
                                      categoryId1: value ? value : '',
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      filterDate: {
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                      },
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
                                // disabled: (values: any, form: any) => values.categoryId2 ? false : true,
                                // disabled: () => cap1,
                                // get: {
                                //   facade: CategoryFacade,
                                //   key: 'result2',
                                //   method: 'get2',
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                //   params: (fullTextSearch, value) => ({
                                //     fullTextSearch,
                                //     id: value().categoryId1,
                                //   }),
                                // },
                                list: category2?.map((item) => ({
                                  label: item?.name!,
                                  value: item?.id!,
                                })),
                                disabled: (values: any, form: any) =>
                                  categoryId1 ? (category2?.length === 0 ? true : category2 ? false : true) : true,
                                onChange(value, form) {
                                  setCategoryId2(value);
                                  form.resetFields(['categoryId3']);
                                  dataTableRefListProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idSupplier: id,
                                      categoryId: '',
                                      categoryId1: form.getFieldValue('categoryId1')
                                        ? form.getFieldValue('categoryId1')
                                        : '',
                                      categoryId2: value ? value : '',
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      filterDate: {
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                      },
                                      idStore: '',
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
                                // disabled: (values: any, form: any) => values.categoryId3 ? false : true,
                                // disabled: () => cap2,
                                // get: {
                                //   facade: CategoryFacade,
                                //   key: 'result3',
                                //   method: 'get3',
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                //   params: (fullTextSearch, value) => ({
                                //     fullTextSearch,
                                //     id: value().categoryId2,
                                //   }),
                                // },
                                list: category3?.map((item) => ({
                                  label: item?.name!,
                                  value: item?.id!,
                                })),
                                disabled: (values: any, form: any) =>
                                  categoryId2 ? (category3?.length === 0 ? true : category3 ? false : true) : true,
                                onChange(value, form) {
                                  dataTableRefListProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idSupplier: id,
                                      categoryId: '',
                                      categoryId1: form.getFieldValue('categoryId1')
                                        ? form.getFieldValue('categoryId1')
                                        : '',
                                      categoryId2: form.getFieldValue('categoryId2')
                                        ? form.getFieldValue('categoryId2')
                                        : '',
                                      categoryId3: value ? value : '',
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      filterDate: {
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                      },
                                      idStore: '',
                                    },
                                    fullTextSearch: '',
                                  });
                                },
                              },
                            },
                          ]}
                          disableSubmit={isLoading}
                        />
                      </>
                    )}
                    searchPlaceholder={t('placeholder.Search by order supplier')}
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'id',
                        tableItem: {
                          width: 70,
                          sorter: true,
                          render: (value: any, item: any) =>
                            JSON.parse(inventoryProduct.queryParams || '{}').page != 1
                              ? `${
                                  JSON.parse(inventoryProduct.queryParams || '{}').page *
                                    JSON.parse(inventoryProduct.queryParams || '{}').perPage +
                                  stt2++
                                }`
                              : `${stt2++}`,
                        },
                      },
                      {
                        title: `product.Code`,
                        name: 'productCode',
                        tableItem: {
                          sorter: true,
                          width: 175,
                        },
                      },
                      {
                        title: `product.Name`,
                        name: 'productName',
                        tableItem: {
                          sorter: true,
                          width: 180,
                        },
                      },
                      {
                        title: `product.Barcode`,
                        name: 'barcode',
                        tableItem: {
                          sorter: true,
                          width: 180,
                        },
                      },
                      {
                        title: `supplier.Order.Revenue Before Tax`,
                        name: 'subTotal',
                        tableItem: {
                          width: 145,
                          render: (value: any, item: any) => item?.subTotal?.toLocaleString(),
                        },
                      },
                      {
                        title: `supplier.Order.After Tax`,
                        name: 'total',
                        tableItem: {
                          width: 130,
                          render: (value: any, item: any) => item?.total?.toLocaleString(),
                        },
                      },
                      {
                        title: `supplier.Status`,
                        name: 'total',
                        tableItem: {
                          width: 100,
                          render: (text: string, item: any) =>
                            item?.status === 'APPROVED' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('supplier.Sup-Status.Selling')}
                              </div>
                            ) : (
                              <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                {t('supplier.Sup-Status.Discontinued')}
                              </div>
                            ),
                        },
                      },
                    ]}
                  />
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={inventoryProduct.result?.data?.length === 0 ? true : false}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => {
                        let tt = 1;
                        const product = inventoryProduct?.result?.data?.map((item) => {
                          return {
                            STT: tt++,
                            productName: item.productName,
                            barcode: item.barcode,
                            subTotal: item.subTotal?.toLocaleString(),
                            total: item.total?.toLocaleString(),
                            productCode: item.productCode,
                            status:
                              item.status === 'APPROVED'
                                ? t('supplier.Sup-Status.Selling')
                                : 'supplier.Sup-Status.Discontinued',
                          };
                        });
                        const excel = new Excel();
                        excel
                          .addSheet('test')
                          .addColumns(columnInventoryProduct)
                          .addDataSource(product ?? [], {
                            str2Percent: true,
                          })
                          .saveAs(t('supplier.Supplier revenue product'));
                      }}
                    />
                  </div>
                </div>
              )}
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 flex '}
                  onClick={handleBack}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Discount')} key="5" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pt-3 pb-4">
                  <DataTable
                    ref={dataTableRefDiscount}
                    facade={discountFacade}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        id: id,
                        filter: {
                          dateFrom: `${dayjs().startOf('month').format('MM/DD/YYYY 00:00:00')}`,
                          dateTo: `${dayjs().endOf('month').format('MM/DD/YYYY 23:59:59')}`,
                        },
                      },
                    }}
                    onRow={(data: any) => ({
                      onDoubleClick: () => navigate(`/${lang}${routerLinks('Discount-Detail')}/${data.id}`),
                    })}
                    xScroll="1370px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationDiscount', { from, to, total })
                    }
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'stt',
                        tableItem: {
                          width: 110,
                          render: (value: any, item: any) =>
                            JSON.parse(discountFacade.queryParams || '{}').page != 1
                              ? `${
                                  JSON.parse(discountFacade.queryParams || '{}').page *
                                    JSON.parse(discountFacade.queryParams || '{}').perPage +
                                  stt++
                                }`
                              : `${stt++}`,
                        },
                      },
                      {
                        title: `supplier.Order.Time`,
                        name: 'time',
                        tableItem: {
                          width: 300,
                          render: (value: any, item: any) =>
                            dayjs(item?.datefrom, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/') +
                            '-' +
                            dayjs(item?.dateto, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/'),
                        },
                      },
                      {
                        title: `supplier.Order.Discount`,
                        name: 'noPay',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.noPay.toLocaleString(),
                        },
                      },
                      {
                        title: t(`supplier.Order.Paid`) + ' (VND)',
                        name: 'paid',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => (item?.paid ? item?.paid.toLocaleString() : '0'),
                        },
                      },
                      {
                        title: t(`supplier.Order.Unpaid`) + ' (VND)',
                        name: 'noPay',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.noPay.toLocaleString(),
                        },
                      },
                      {
                        title: `supplier.Status`,
                        name: 'status',
                        tableItem: {
                          width: 240,
                          align: 'center',
                          render: (text: string) =>
                            text !== 'NOT_PAID' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                {t('supplier.Order.Paid')}
                              </div>
                            ) : (
                              <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                                {t('supplier.Order.Unpaid')}
                              </div>
                            ),
                        },
                      },
                    ]}
                    showSearch={false}
                    subHeader={() => (
                      <>
                        <div className="flex my-5 flex-col lg:flex-row">
                          <Form
                            values={{
                              dateFrom: getFilter(discountFacade.queryParams, 'filter')?.dateFrom,
                              dateTo: getFilter(discountFacade.queryParams, 'filter')?.dateTo,
                              status: getFilter(discountFacade.queryParams, 'status'),
                            }}
                            className="intro-x items-end rounded-lg w-full flex justify-between form-store"
                            columns={[
                              {
                                title: '',
                                name: '',
                                formItem: {
                                  tabIndex: 3,
                                  col: 2,
                                  render: () => (
                                    <div className="flex h-10 text-xs items-center">
                                      {/* whitespace-nowrap */}
                                      <p>{t('Kỳ hạn từ')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefDiscount?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        id: id,
                                        filter: {
                                          dateFrom: value ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/') : '',
                                          dateTo: form.getFieldValue('dateTo')
                                            ? form
                                                .getFieldValue('dateTo')
                                                .format('MM/DD/YYYY 23:59:59')
                                                .replace(/-/g, '/')
                                            : '',
                                        },
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
                                  col: 1,
                                  render: () => (
                                    <div className="flex h-10 text-xs items-center">
                                      <p>{t('đến')}</p>
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
                                  onChange(value, form) {
                                    dataTableRefDiscount?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        id: id,
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
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                          <div className="sm:flex lg:justify-end w-full">
                            <Form
                              values={{
                                dateFrom: getFilter(discountFacade.queryParams, 'filter')?.dateFrom,
                                dateTo: getFilter(discountFacade.queryParams, 'filter')?.dateTo,
                                status: getFilter(discountFacade.queryParams, 'status'),
                              }}
                              className="form-store"
                              columns={[
                                {
                                  title: '',
                                  name: 'status',
                                  formItem: {
                                    placeholder: 'placeholder.Select status',
                                    type: 'select',
                                    tabIndex: 3,
                                    col: 12,
                                    list: listStatusDiscount,
                                    onChange(value, form) {
                                      dataTableRefDiscount?.current?.onChange({
                                        page: 1,
                                        perPage: 10,
                                        filter: {
                                          id: id,
                                          filter: {
                                            dateFrom: form.getFieldValue('dateFrom'),
                                            dateTo: form.getFieldValue('dateTo'),
                                          },
                                          status: value,
                                        },
                                      });
                                    },
                                  },
                                },
                              ]}
                              disableSubmit={isLoading}
                            />
                          </div>
                        </div>
                        <div className="grid grid-cols-1 sm:w-64 sm:gap-4 mt-10 sm:mb-3 mb-4">
                          <div className="w-full rounded-xl shadow-[0_0_9px_rgb(0,0,0,0.25)] pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-28 mb-4">
                            <h1 className="font-bold mb-3">{t('supplier.Sup-Discount.Discounts to be paid')}</h1>
                            <span className="text-teal-900 text-xl font-bold mt-auto">{discountTotal} VND</span>
                          </div>
                        </div>
                      </>
                    )}
                  />
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={discountFacade.result?.data?.length === 0 ? true : false}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => {
                        let tt = 1;
                        const discount = discountFacade?.result?.data?.map((item) => {
                          return {
                            STT: tt++,
                            commision: item.commision ? item.commision?.toLocaleString() : '0',
                            paid: item.paid ? item.paid?.toLocaleString() : '0',
                            unPaid: item.noPay?.toLocaleString(),
                            date:
                              dayjs(item?.datefrom, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/') +
                              '-' +
                              dayjs(item?.dateto, 'YYYY-MM-DDTHH:mm:ss').format('MM/YYYY').replace(/-/g, '/'),
                            status: item.status === 'NOT_PAID' ? t('supplier.Order.Paid') : t('supplier.Order.Unpaid'),
                          };
                        });
                        const excel = new Excel();
                        excel
                          .addSheet('test')
                          .addColumns(columnDiscount)
                          .addDataSource(discount ?? [], {
                            str2Percent: true,
                          })
                          .saveAs(t('supplier.Discount supplier'));
                      }}
                    />
                  </div>
                </div>
              </div>
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 flex '}
                  onClick={handleBack}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Contract')} key="6" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl pt-6'}>
                <div className="flex items-left font-bold px-6">
                  <p className="sm:text-xl text-base text-teal-900 pt-0 mr-5">
                    {t('supplier.Contract.Contract details')}
                  </p>
                </div>
                <div className="form-supplied-tab6 items-center">
                  <Form
                    values={{ ...data1 }}
                    className="intro-x border-b form-col-tab6"
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base lg:mt-0">
                                <div className="font-semibold text-teal-900 ">
                                  {t('supplier.Contract.Contract Code')}:
                                </div>
                                <div className="ml-4">{values.code}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base lg:mt-0 mt-4">
                                <div className="font-semibold text-teal-900 ">
                                  {t('supplier.Contract.Date created')}:
                                </div>
                                <div className="ml-4">
                                  {dayjs(values.createdAt).format('DD/MM/YYYY').replace(/-/g, '/')} -{' '}
                                  {dayjs(values.createdAt).format('HH:mm')}{' '}
                                </div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'status',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full w-full lg:mt-0 mt-4">
                                <div className="font-semibold text-teal-900 text-base whitespace-nowrap">
                                  {t('supplier.Status')}:
                                </div>

                                {values?.status == 'SIGNED_CONTRACT' ? (
                                  <div className="w-60 py-2.5 px-4 bg-gray-100 rounded-2xl border-gray-200 ml-4 flex justify-between cursor-not-allowed">
                                    <p className="text-gray-400"> {t('supplier.Sup-Status.Signed')}</p>
                                    <DownArrow className="w-4 h-5 text-gray-400 pt-1" />
                                  </div>
                                ) : (
                                  <div className="w-60 py-2.5 px-4 rounded-2xl border-gray-200 ml-4 flex justify-between">
                                    <Select value={values?.status} className="py-2" style={{ width: '100%' }}>
                                      <Select.Option value="SIGNED_CONTRACT">
                                        <div onClick={() => putSub({ id: values?.id })}>
                                          {t('supplier.Sup-Status.Signed')}
                                        </div>
                                      </Select.Option>
                                      <Select.Option value="PENDING_SIGN_CONTRACT">
                                        {t('supplier.Sup-Status.Waiting')}
                                      </Select.Option>
                                    </Select>
                                  </div>
                                )}
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-10 text-base lg:mt-0 mt-4">
                                <div className="font-semibold text-teal-900">
                                  {t('supplier.Contract.Contract information')}:
                                </div>
                                <a
                                  onClick={(activeKey: any) =>
                                    navigate(`/${lang}${routerLinks('Contract-View')}/${id}`)
                                  }
                                  className="text-blue-500 ml-4 underline hover:underline hover:text-blue-500"
                                >
                                  {t('supplier.Contract.Click here')}
                                </a>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-10 text-base lg:mt-0 mt-4">
                                <div className="font-semibold text-teal-900">{t('supplier.Contract.Signed file')}:</div>
                                <a
                                  onClick={(activeKey: any) =>
                                    navigate(`/${lang}${routerLinks('Contract-View')}/${id}`)
                                  }
                                  className="text-blue-500 ml-4 underline hover:underline hover:text-blue-500"
                                >
                                  {t('supplier.Contract.Click here')}
                                </a>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <div className="flex items-left font-bold px-6 pt-1">
                    <p className="text-base text-teal-900 mt-4">{t('supplier.Contract.Supplier Information')}</p>
                  </div>
                  <Form
                    values={{ ...data1 }}
                    className="intro-x border-b form-supplier-contract"
                    columns={[
                      {
                        title: '',
                        name: 'name',
                        formItem: {
                          col: 5,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base">
                                <div className="font-semibold text-teal-900 ">
                                  {t('store.Inventory management.Supplier')}:{' '}
                                </div>
                                <div className="ml-4">{values?.subOrg?.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'name',
                        formItem: {
                          col: 7,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base sm:mt-0 mt-4">
                                <div className="font-semibold text-teal-900 ">
                                  {t('supplier.Contract.Manager name')}:{' '}
                                </div>
                                <div className="ml-4">{values?.subOrg?.userRole[0]?.userAdmin?.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'phoneNumber',
                        formItem: {
                          col: 5,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base mt-4">
                                <div className="font-semibold text-teal-900 ">{t('supplier.Phone Number')}: </div>
                                <div className="ml-4">{values?.subOrg?.userRole[0]?.userAdmin?.phoneNumber}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 7,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center h-full text-base mt-4">
                                <div className="font-semibold text-teal-900 w-16 h-full">{t('supplier.Address')}:</div>
                                <div className="ml-4 h-full">
                                  {values?.subOrg?.address?.street +
                                    ', ' +
                                    values?.subOrg?.address?.ward?.name +
                                    ', ' +
                                    values?.subOrg?.address?.district?.name +
                                    ', ' +
                                    values?.subOrg?.address?.province?.name}
                                </div>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <p className="text-base text-teal-900 font-bold px-6 pt-1 mt-4">
                    {t('supplier.Contract.Upload contract')}:
                  </p>
                  <div className="text-center border-2 p-11 border-dashed rounded-md m-5">
                    <Upload
                      style={{ border: 'none' }}
                      listType="picture"
                      type="drag"
                      accept="image/*,.pdf,.docx,.doc,.csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                      multiple
                    >
                      <div className="bg-white -my-4">
                        <UploadIcon className="w-20 h-28 text-gray-400 mx-auto" />
                        <p className="mb-4">
                          {t('supplier.Contract.Upload file')} <br />
                          {t('supplier.Contract.or')}{' '}
                        </p>
                        <Button
                          className="bg-teal-900 text-white text-[14px] px-4 py-2.5 !rounded-xl hover:bg-teal-700 inline-flex items-center"
                          text={t('supplier.Contract.Select file')}
                        />
                      </div>
                    </Upload>
                  </div>
                  <p className="text-base text-teal-900 font-bold px-6 py-4">{t('supplier.Contract.File system')}:</p>
                  <div className="text-base px-6">{t('supplier.Contract.File form system')}.</div>

                  <div className="flex-col-reverse md:flex-row flex items-center p-5 justify-between gap-2.5 mt-5">
                    <Button
                      text={t('components.form.modal.cancel')}
                      className={'z-10 !block out-line border-teal-800 !w-40 sm:!w-28 !font-normal'}
                      onClick={() => navigate(`/${lang}${routerLinks('Supplier')}`)}
                    />
                    <Button
                      disabled={true}
                      text={t('titles.Upload contract')}
                      className={
                        'flex bg-teal-900 text-white rounded-xl items-center justify-center disabled:opacity-20'
                      }
                      onClick={() => null}
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
