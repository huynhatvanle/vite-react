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
} from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { ProvinceFacade } from '@store/address/province';
import { DownArrow, Download } from '@svgs';
import { Dropdown, Select, Tabs } from 'antd';
import dayjs from 'dayjs';
import { format } from 'echarts';
import { DraggableLayout } from '@core/draggable/layout';

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
  // const inventorySupplier = InventorySupplierFacade();
  const [revenue, setRevenue] = useState(true);
  const [cap1, setCap1] = useState(true);
  const [cap2, setCap2] = useState(true);
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const [dateFrom, setDateFrom] = useState(() => {
    const storedDateFrom = sessionStorage.getItem('dateFrom');
    return storedDateFrom && dayjs(storedDateFrom).isValid() ? storedDateFrom : '';
  });
  const [dateTo, setDateTo] = useState(() => {
    const storedDateTo = sessionStorage.getItem('dateTo');
    return storedDateTo && dayjs(storedDateTo).isValid() ? storedDateTo : '';
  });

  useEffect(() => {
    if (id) supplierFacade.getById({ id });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id]);
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        navigate(`/${lang}${routerLinks('Supplier')}?${new URLSearchParams(param).toString()}`);
        break;
    }
  }, [status]);

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
      label: 'Chưa thanh toán',
      value: 'NOT_PAID',
    },
    {
      label: 'Đã thanh toán',
      value: 'PAID',
    },
    {
      label: 'Chưa hoàn tất',
      value: 'NOT_COMPLETED_PAID',
    },
  ];
  const statusCategory = [
    {
      label: 'Bán hàng',
      value: 'RECIEVED',
    },
    {
      label: 'Trả hàng',
      value: 'RETURN',
    },
  ];
  const statusRevenue = [
    {
      label: 'Đang bán',
      value: 'APPROVED',
    },
    {
      label: 'Ngưng bán',
      value: 'STOP_SELLING',
    },
  ];

  const handleBack = () => navigate(`/${lang}${routerLinks('Supplier')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: Supplier) => {
    supplierFacade.put({ ...values, id });
  };
  let i = 1;

  console.log(getFilter(inventoryProduct.queryParams, 'categoryId'));

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <Tabs
            defaultActiveKey="1"
            // defaultActiveKey={sessionStorage.getItem('activeTab') || '1'}
            // onChange={(key) => sessionStorage.setItem('activeTab', key)}
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
                      filter: { supplierId: id, type: 'BALANCE', storeId: '' },
                    }}
                    xScroll="895px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: `product.Code`,
                        name: 'code',
                        tableItem: {
                          width: 170,
                          sorter: true,
                        },
                      },
                      {
                        title: `product.Name`,
                        name: 'name',
                        tableItem: {
                          width: 300,
                          render: (value: any, item: any) => item?.name,
                        },
                      },
                      {
                        title: `product.Category`,
                        name: 'address',
                        tableItem: {
                          width: 205,
                          render: (value: any, item: any) =>
                            item?.category?.child?.child?.name || item?.category?.child?.name,
                        },
                      },
                      {
                        title: `product.Price`,
                        name: 'contract',
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
                                firstLoad: () => ({}),
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                                onChange(value, form) {
                                  value ? setCap1(false) : setCap1(true);
                                  form.resetFields(['categoryId2', 'categoryId3']);
                                  setCap2(true);
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      storeId: '',
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
                                // disabled: (values: any, form: any) => values.categoryId2 ? false : true,
                                disabled: () => cap1,
                                get: {
                                  facade: CategoryFacade,
                                  key: 'result2',
                                  method: 'get2',
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    id: value().categoryId1,
                                  }),
                                },
                                onChange(value, form) {
                                  value ? setCap2(false) : setCap2(true);
                                  form.resetFields(['categoryId3']);
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      storeId: '',
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
                                // disabled: (values: any, form: any) => values.categoryId3 ? false : true,
                                disabled: () => cap2,
                                get: {
                                  facade: CategoryFacade,
                                  key: 'result3',
                                  method: 'get3',
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    id: value().categoryId2,
                                  }),
                                },
                                onChange(value, form) {
                                  dataTableRefProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      storeId: '',
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
                              onClick={() => navigate(`/${lang}${routerLinks('Supplier/Exce')}`)}
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
                    defaultRequest={{ page: 1, perPage: 10, filter: { filterSupplier: id }, fullTextSearch: '' }}
                    xScroll="1400px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
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
                        title: t(`supplier.Status`),
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
                            dateFrom: `${dayjs().startOf('month').format('MM/DD/YYYY 00:00:00')}`,
                            dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                          },
                          idStore: '',
                          type: '',
                        },

                        fullTextSearch: '',
                      }}
                      xScroll="1400px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.Pagination', { from, to, total })
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
                            className="intro-x sm:flex justify-start sm:mt-4 lg:justify-end lg:-mr-20 lg:mt-0 form-store"
                            columns={[
                              {
                                title: '',
                                name: 'type',
                                formItem: {
                                  placeholder: 'placeholder.Select status',
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
                                        type: value,
                                      },
                                      fullTextSearch: '',
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
                                  get: {
                                    facade: InventorySupplierFacade,
                                    format: (item: any) => ({
                                      label: item.name,
                                      value: item.id,
                                    }),
                                    params: (fullTextSearch, value) => ({
                                      id: id,
                                    }),
                                  },
                                  onChange(value, form) {
                                    dataTableRefRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idSupplier: id,
                                        idStore: value,
                                        filterDate: {
                                          dateFrom: form.getFieldValue('dateFrom')
                                            ? form.getFieldValue('dateFrom')
                                            : '',
                                          dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                        },
                                        type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                      },
                                      fullTextSearch: '',
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
                                      fullTextSearch: '',
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
                                    console.log('From', form.getFieldValue('dateFrom'));

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
                                      fullTextSearch: '',
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
                            render: (value: any, item: any) => i++,
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
                        onClick={() => null}
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
                        categoryId: '',
                        idStore: '',
                        status: '',
                        categoryId1: '',
                        categoryId2: '',
                        categoryId3: '',
                        filterDate: {
                          dateFrom: `${dayjs().startOf('month').format('MM/DD/YYYY 00:00:00')}`,
                          dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                        },
                      },
                      fullTextSearch: '',
                    }}
                    xScroll="1400px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    subHeader={() => (
                      <>
                        <div className="flex justify-start text-left flex-col lg:flex-row lg:justify-between w-full">
                          <Form
                            values={{
                              categoryId1: getFilter(inventoryProduct.queryParams, 'categoryId1'),
                              categoryId2: getFilter(inventoryProduct.queryParams, 'categoryId2'),
                              categoryId3: getFilter(inventoryProduct.queryParams, 'categoryId3'),
                              dateFrom: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateFrom,
                              dateTo: getFilter(inventoryProduct.queryParams, 'filterDate')?.dateTo,
                              status: getFilter(inventoryProduct.queryParams, 'status'),
                            }}
                            className="intro-x sm:flex justify-start mt-2 w-48 form-store items-center"
                            columns={[
                              {
                                title: '',
                                name: 'status',
                                formItem: {
                                  placeholder: 'placeholder.Select status',
                                  type: 'select',
                                  col: 12,
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
                                      fullTextSearch: '',
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
                                        idStore: '',
                                      },
                                      fullTextSearch: '',
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
                                        categoryId: '',
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
                        </div>
                        <Form
                          className="intro-x rounded-lg w-full form-store form-header-category col-supplier mt-5"
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
                                firstLoad: () => ({}),
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                                onChange(value, form) {
                                  value ? setCap1(false) : setCap1(true);
                                  form.resetFields(['categoryId2', 'categoryId3']);
                                  setCap2(true);
                                  dataTableRefListProduct?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idSupplier: id,
                                      categoryId: '',
                                      categoryId1: value ? value : '',
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
                              name: 'categoryId2',
                              title: '',
                              formItem: {
                                placeholder: 'placeholder.Category level 1',
                                type: 'select',
                                col: 3,
                                // disabled: (values: any, form: any) => values.categoryId2 ? false : true,
                                disabled: () => cap1,
                                get: {
                                  facade: CategoryFacade,
                                  key: 'result2',
                                  method: 'get2',
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    id: value().categoryId1,
                                  }),
                                },
                                onChange(value, form) {
                                  value ? setCap2(false) : setCap2(true);
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
                                disabled: () => cap2,
                                get: {
                                  facade: CategoryFacade,
                                  key: 'result3',
                                  method: 'get3',
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    id: value().categoryId2,
                                  }),
                                },
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
                    searchPlaceholder={t('placeholder.Search by order number')}
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'id',
                        tableItem: {
                          width: 70,
                          render: (value: any, item: any) => i++,
                        },
                      },
                      {
                        title: `product.Code`,
                        name: 'productCode',
                        tableItem: {
                          width: 175,
                        },
                      },
                      {
                        title: `product.Name`,
                        name: 'productName',
                        tableItem: {
                          width: 180,
                        },
                      },
                      {
                        title: `product.Barcode`,
                        name: 'barcode',
                        tableItem: {
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
                    footer={() => (
                      <div className="w-full flex sm:justify-end justify-center mt-4">
                        <button className="bg-teal-900 hover:bg-teal-700 text-white sm:w-44 w-[64%] px-4 py-2.5 rounded-xl">
                          {t('titles.Export report')}
                        </button>
                      </div>
                    )}
                  />
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
              {/* lấy về đc data/ tạo 1 cái data mới /lấy 1 cái key tạo 1 row mới trong table */}
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
                        status: '',
                      },
                    }}
                    xScroll="1370px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'stt',
                        tableItem: {
                          width: 110,
                          render: (value: any, item: any) => `${i++}`,
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
                          render: (value: any, item: any) =>
                            item?.status === 'NOT_PAID' ? 0 : item?.noPay - item?.paid,
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
                              // dayjs(getFilter(discountFacade.queryParams, 'filter')?.dateFrom).format('MM/YYYY').replace(/-/g, '/')
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
                                    <div className="flex h-10 text-xs whitespace-nowrap items-center">
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
                                  type: 'date',
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
                                      fullTextSearch: '',
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
                                  type: 'date',
                                  onChange(value, form) {
                                    console.log('From', form.getFieldValue('dateFrom'));

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
                                      fullTextSearch: '',
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                          <div className="flex justify-start lg:justify-end w-full">
                            <div className=" flex justify-end">
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
                                      col: 6,
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
                      disabled={true}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => null}
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
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                {/* <div className="p-6 font-semibold">
                  <div className="flex items-left">
                    <p className="sm:text-xl text-base text-teal-900 pb-4 pt-0 mr-5">Chi tiết hợp đồng</p>
                  </div>
                  <div className="mb-1 text-base">
                    <div className="lg:flex lg:items-center justify-between text-teal-900">
                      <div className="flex flex-row mb-5 gap-5">
                        <div>Mã hợp đồng:</div>
                        <div>HD00261</div>
                      </div>
                      <div className=" flex flex-row mb-5 gap-5">
                        <div>Ngày tạo:</div>
                        <div>12/01/2023 - 15:27</div>
                      </div>
                      <div className=" flex flex-row mb-5 gap-5">
                        <div>Trạng thái</div>
                        <Form
                          className="intro-x pt-1 -mx-5 rounded-lg w-full "
                          columns={[
                            {
                              title: '',
                              name: 'Status',
                              formItem: {
                                disabled: () => true,
                                tabIndex: 3,
                                placeholder: 'Đã ký',
                                col: 12,
                                type: 'select',
                              },
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </div> */}
                <div className="flex items-left font-bold pl-5 pt-5">
                  <p className="sm:text-xl text-base text-teal-900 pb-4 pt-0 mr-5">Chi tiết hợp đồng</p>
                </div>
                <div className="form-supplied-tab6">
                  <Form
                    values={{ ...data }}
                    className="intro-x"
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Mã hợp đồng:</div>
                                <div>{values.name}</div>
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
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Ngày tạo:</div>
                                <div>{values.name}</div>
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
                          type: 'select',
                          render: (form, values) => {
                            return (
                              <div className="flex">
                                <div className="font-semibold text-teal-900 text-base w-[150px]">Trạng thái:</div>
                                <Select style={{ width: '100%' }}>
                                  <Select.Option value="PENDING_SIGN_CONTRACT"> Chờ ký</Select.Option>
                                  <Select.Option value="SIGNED_CONTRACT"> Đã ký</Select.Option>
                                </Select>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <Form
                    values={{ ...data }}
                    className="intro-x !border-b-slate-300 border-b !rounded-none"
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 4,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Thông tin hợp đồng:</div>
                                <div>{values.name}</div>
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
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Tệp đã ký:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <p className="text-base text-teal-900 font-bold pl-3">Thông tin nhà cung cấp</p>
                  <Form
                    values={{ ...data }}
                    className="intro-x"
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Nhà cung cấp:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Tên chủ quản lý:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <Form
                    values={{ ...data }}
                    className="intro-x"
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Số điện thoại:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className="font-semibold text-teal-900 text-base">Địa chỉ:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <p className="text-base text-teal-900 font-bold pl-3 pt-5">Tải lên hợp đồng đăng ký:</p>
                  <div className="text-center border-2 p-[110px] border-dashed rounded-md m-5"></div>
                  <p className="text-base text-teal-900 font-bold pl-3">Tệp trên hệ thống:</p>
                  <div className="text-base pl-3">Chưa có hình hợp đồng trên hệ thống.</div>
                  <div className="sm:flex sm:mt-7 mt-2 justify-between p-4">
                    <div className="flex flex-col items-center mt-2" onClick={handleBack}>
                      <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11">
                        {t('components.form.modal.cancel')}
                      </button>
                    </div>
                    <div className="flex sm:justify-end justify-center items-center p-5">
                      <Button
                        disabled={true}
                        text={t('titles.Upload contract')}
                        className={
                          'flex bg-teal-900 text-white sm:w-52 w-[64%] rounded-xl items-center justify-center disabled:opacity-30'
                        }
                        onClick={() => null}
                      />
                    </div>
                  </div>
                </div>
                {/* <p className="text-base text-teal-900 font-bold pl-3">Thông tin nhà cung cấp</p>
                <div className='form-supplied-tab6'>
                  <Form
                    values={{ ...data }}
                    className='intro-x'
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className='font-semibold text-teal-900 text-base'>Nhà cung cấp:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          }
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className='font-semibold text-teal-900 text-base'>Tên chủ quản lý:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          }
                        },
                      },
                    ]}
                  />
                  <Form
                    values={{ ...data }}
                    className='intro-x'
                    columns={[
                      {
                        title: '',
                        name: 'code',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className='font-semibold text-teal-900 text-base'>Số điện thoại:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          }
                        },
                      },
                      {
                        title: '',
                        name: 'createdAt',
                        formItem: {
                          col: 6,
                          render: (form, values) => {
                            return (
                              <div className="flex items-center gap-2">
                                <div className='font-semibold text-teal-900 text-base'>Địa chỉ:</div>
                                <div>{values.name}</div>
                              </div>
                            );
                          }
                        },
                      },
                    ]}
                  />
                </div> */}
                {/* <p className='text-base text-teal-900 font-bold pl-3 pt-5'>Tải lên hợp đồng đăng ký:</p>
                <div className='text-center border-2 p-[110px] border-dashed rounded-md m-5'></div>
                <p className="text-base text-teal-900 font-bold pl-3">Tệp trên hệ thống:</p>
                <div className="text-base pl-3">Chưa có hình hợp đồng trên hệ thống.</div>
                <div className="sm:flex sm:mt-7 mt-2 justify-between p-4">
                  <div className="flex flex-col items-center mt-2" onClick={handleBack}>
                    <button className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11">
                      {t('components.form.modal.cancel')}
                    </button>
                  </div>
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={true}
                      text={t('titles.Upload contract')}
                      className={
                        'flex bg-teal-900 text-white sm:w-52 w-[64%] rounded-xl items-center justify-center disabled:opacity-30'
                      }
                      onClick={() => null}
                    />
                  </div>
                </div> */}
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
