import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as AntForm, Select, Switch, Tabs, Dropdown, Tooltip } from 'antd';
import { useLocation, useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { Arrow, Download, Infor, Plus } from '@svgs';
import { getFilter, language, languages, routerLinks } from '@utils';
import {
  DistrictFacade,
  StoreFacade,
  WardFacade,
  ProvinceFacade,
  SubStoreFacade,
  ConnectSupplierFacade,
  ProductFacade,
  InventoryProductFacade,
  CategoryFacade,
  SupplierStoreFacade,
  InvoiceKiotVietFacade,
  InvoiceRevenueFacade,
} from '@store';
import { Excel } from "antd-table-saveas-excel";

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storeFacade = StoreFacade();
  const productFacade = ProductFacade();
  const subStoreFacade = SubStoreFacade();
  const connectSupplierFacade = ConnectSupplierFacade();
  const inventoryProductFacade = InventoryProductFacade();
  const invoiceKiotVietFacade = InvoiceKiotVietFacade();
  const invoiceRevenueFacade = InvoiceRevenueFacade()
  const { data, isLoading, queryParams, status } = storeFacade;
  const categoryFacade = CategoryFacade()
  const supplierStoreFacade = SupplierStoreFacade()
  // const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const [forms] = AntForm.useForm();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const dataTableRefProduct = useRef<TableRefObject>(null);
  const dataTableRefSupplier = useRef<TableRefObject>(null);
  const dataTableRefInventory = useRef<TableRefObject>(null);
  const dataTableRefInvoiceRevenue = useRef<TableRefObject>(null);
  const dataTableRefInvoiceKiot = useRef<TableRefObject>(null);
  const dataTableRefsubStore = useRef<TableRefObject>(null);
  const dataTableRefBranch = useRef<TableRefObject>(null);

  const [isChecked, setIsChecked] = useState(false);
  const [isBalance, setIsBalance] = useState(true);
  const [isRevenueByOrder, setIsRevenueByOrder] = useState(true);
  const [categoryId1, setCategoryId1] = useState('')
  const [categoryId2, setCategoryId2] = useState('')
  const [exportExcel, setExportExcel] = useState(false)

  const category1 = categoryFacade.result?.data
  const category2 = categoryFacade.result2?.data
  const category3 = categoryFacade.result3?.data
  const listStatus = [
    {
      label: t('supplier.Sup-Status.Sell goods'),
      value: 'DELEVERED',
    },
    {
      label: t('supplier.Sup-Status.Return goods'),
      value: 'REFUND',
    },
    {
      label: t('supplier.Sup-Status.Cancelled'),
      value: 'CANCEL',
    },
  ];
  const listStatusProduct = [
    {
      label: t('supplier.Sup-Status.Selling'),
      value: 'APPROVED',
    },
    {
      label: t('supplier.Sup-Status.Discontinued'),
      value: 'STOP_SELLING',
    },
  ];

  useEffect(() => {
    if (id) {
      storeFacade.getById({ id })
    }
    categoryFacade.get({})
    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    if (categoryId1) {
      categoryFacade.get2({ id: categoryId1 })
    }
  }, [categoryId1]);

  useEffect(() => {
    if (categoryId2) {
      categoryFacade.get3({ id: categoryId2 })
    }
  }, [categoryId2]);

  useEffect(() => {
    if (status === 'put.fulfilled')
      navigate(`/${lang}${routerLinks('Store')}?${new URLSearchParams(param).toString()}`);
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Store')}`);

  const handleSubmit = (values: any) => {
    const connectKiot = forms.getFieldsValue()
    const name = forms.getFieldValue('name')
    const fax = forms.getFieldValue('fax')
    const provinceId = forms.getFieldValue('provinceId')
    const districtId = forms.getFieldValue('districtId')
    const wardId = forms.getFieldValue('wardId')
    const street = forms.getFieldValue('street')
    storeFacade.put({ ...values, id, connectKiot, name, fax, provinceId, districtId, wardId, street });
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  interface IExcelColumn {
    title: string;
    key: string;
    dataIndex: string;
  }

  const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeStoreTab') || 'tab');

  const onChangeTab = (key: string) => {
    setActiveKey(key);
    localStorage.setItem('activeStoreTab', key);

    if (key === '3') {
      dataTableRefBranch?.current?.onChange({
        page: 1,
        perPage: 10,
        filter: { storeId: id, supplierType: 'BALANCE' }
      });
    }

    navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=${key}`);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');

  useEffect(() => {
    if (tab) {
      setActiveKey(tab);
    }
    // else {
    //   setActiveKey('1');
    // }
  }, []);

  useEffect(() => {
    if (activeKey == '2' && isBalance || activeKey == '6') {
      supplierStoreFacade.get({
        type: 'BALANCE',
        storeId: id
      })
      // dataTableRefProduct.current?.onChange({
      //   page: 1,
      //   perPage: 10,
      //   filter: { storeId: id, type: 'BALANCE' },
      // })
    }
    if (activeKey == '2' && !isBalance) {
      supplierStoreFacade.get({
        type: 'NON_BALANCE',
        storeId: id
      })
      // dataTableRefProduct.current?.onChange({
      //   page: 1,
      //   perPage: 10,
      //   filter: { storeId: id, type: 'NON_BALANCE' },
      // })
    }
  }, [activeKey, isBalance])
  const listSupplierStore = supplierStoreFacade.result?.data

  useEffect(() => {
    if (activeKey == '5' && !isRevenueByOrder) {
      dataTableRefInvoiceKiot.current?.onChange({
        page: 1,
        perPage: 10,
        filter: {
          idStore: id,
          dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
          dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
        },
      })
      connectSupplierFacade.get({
        page: 1,
        perPage: 10,
        filter: { idSuppiler: id },
      })
      subStoreFacade.get({ page: 1, perPage: 10, filter: { storeId: id, supplierType: 'NON_BALANCE' } })
    }
    if (activeKey == '5' && isRevenueByOrder) {
      dataTableRefInvoiceRevenue.current?.onChange({
        page: 1,
        perPage: 10,
        filter: {
          idStore: id,
          dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
          dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
        },
      })
    }
    setDate(false)
  }, [activeKey, isRevenueByOrder])

  useEffect(() => {
    if (activeKey == '3')
      navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=${activeKey}`);
  }, [subStoreFacade.result?.data])

  useEffect(() => {
    if (activeKey == '4')
      navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=${activeKey}`);
  }, [connectSupplierFacade.result?.data, subStoreFacade.result?.data])

  useEffect(() => {
    if (activeKey == '6')
      navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=${activeKey}`);
  }, [inventoryProductFacade.result?.data])

  const supplierInvoice = subStoreFacade.result?.data ? subStoreFacade.result?.data.map((item) => { return { id: item.id, name: item.name } }) : []
  const supplierInvoice1 = connectSupplierFacade.result?.data ? connectSupplierFacade.result?.data.map((item) => { return { id: item.supplier!.id, name: item.supplier!.name } }) : []
  const supplierInvoice2 = [...supplierInvoice, ...supplierInvoice1]

  const columnproduct: IExcelColumn[] = isBalance ? [
    { title: 'STT', key: 'stt', dataIndex: 'stt' },
    { title: t('product.Code'), key: 'code', dataIndex: 'code' },
    { title: t('product.Name'), key: 'name', dataIndex: 'name' },
    { title: t('product.StoreCode'), key: 'storeBarcode', dataIndex: 'storeBarcode' },
    // { title: t('product.SupplierCode'), key: 'barcode', dataIndex: 'barcode' },
    { title: t('product.Category'), key: 'category', dataIndex: 'category' },
    { title: t('product.SupplierName'), key: 'supplierName', dataIndex: 'supplierName' },
    { title: t('product.Unit'), key: 'basicUnit', dataIndex: 'basicUnit' },
    { title: 'Giá nhập', key: 'price', dataIndex: 'price' },
    { title: t('product.PriceBalance'), key: 'productPrice', dataIndex: 'productPrice' },
    { title: t('product.Status'), key: 'status', dataIndex: 'status' },
    { title: t('product.Image'), key: 'linkImage', dataIndex: 'linkImage' },
  ] :
    [
      { title: 'STT', key: 'stt', dataIndex: 'stt' },
      { title: t('product.Code'), key: 'code', dataIndex: 'code' },
      { title: t('product.Name'), key: 'name', dataIndex: 'name' },
      { title: t('product.StoreCode'), key: 'storeBarcode', dataIndex: 'storeBarcode' },
      { title: t('product.Category'), key: 'category', dataIndex: 'category' },
      { title: t('product.SupplierName'), key: 'supplierName', dataIndex: 'supplierName' },
      { title: t('product.Unit'), key: 'basicUnit', dataIndex: 'basicUnit' },
      { title: 'Giá nhập', key: 'price', dataIndex: 'price' },
      { title: t('product.Status'), key: 'status', dataIndex: 'status' },
      { title: t('product.Image'), key: 'linkImage', dataIndex: 'linkImage' },
    ];
  // useEffect(() => {
  //   if (productFacade.result2?.data) {
  //     let stt = 0
  //     const excel = new Excel();
  //     const sheet = excel.addSheet("Sheet1")
  //     sheet.setTHeadStyle({ background: 'FFFFFFFF', borderColor: 'C0C0C0C0', wrapText: false, fontName: 'Calibri' })
  //     sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' })
  //     sheet.setRowHeight(0.8, 'cm')
  //     // sheet.drawCell(12, 0, '')
  //     sheet.addColumns([
  //       { title: '', dataIndex: '' },
  //       { title: '', dataIndex: '' },
  //       { title: '', dataIndex: '' },
  //       { title: 'DANH SÁCH HÀNG HÓA BALANCE', dataIndex: '' },
  //     ]);
  //     sheet.addRow();
  //     sheet.addColumns([
  //       { title: 'Chọn nhà cung cấp:', dataIndex: '' },
  //       {
  //         title: getFilter(productFacade.queryParams, 'supplierId')
  //           ? `${supplierStoreFacade.result?.data?.find((item) => {
  //             return item.id === getFilter(productFacade.queryParams, 'supplierId');
  //           })?.name
  //           }`
  //           : '',
  //         dataIndex: '',
  //       },
  //     ]);
  //     sheet.addRow();
  //     sheet.addColumns([
  //       { title: 'Danh mục chính', dataIndex: '' },
  //       {
  //         title: getFilter(productFacade.queryParams, 'categoryId1')
  //           ? `${categoryFacade.result?.data?.find((item) => {
  //             return item.id === getFilter(productFacade.queryParams, 'categoryId1');
  //           })?.name
  //           }`
  //           : '',
  //         dataIndex: '',
  //       },
  //       { title: '', dataIndex: '' },
  //       { title: 'Danh mục cấp 1', dataIndex: '' },
  //       {
  //         title: getFilter(productFacade.queryParams, 'categoryId2')
  //           ? `${categoryFacade.result2?.data?.find((item) => {
  //             return item.id === getFilter(productFacade.queryParams, 'categoryId2');
  //           })?.name
  //           }`
  //           : '',
  //         dataIndex: '',
  //       },
  //       { title: '', dataIndex: '' },
  //       { title: 'Danh mục cấp 2', dataIndex: '' },
  //       {
  //         title: getFilter(productFacade.queryParams, 'categoryId3')
  //           ? `${categoryFacade.result3?.data?.find((item) => {
  //             return item.id === getFilter(productFacade.queryParams, 'categoryId3');
  //           })?.name
  //           }`
  //           : '',
  //         dataIndex: '',
  //       },
  //       { title: '', dataIndex: '' },
  //     ]);
  //     sheet.addRow()
  //     sheet
  //       .addColumns(columnproduct)
  //       .addDataSource(productFacade?.result2?.data?.map((item) => ({
  //         stt: ++stt,
  //         productPrice: item?.productPrice!.length > 0 ? item?.productPrice?.map((item) => parseInt(item?.price).toLocaleString()) : '0',
  //         basicUnit: item?.basicUnit,
  //         supplierName: item?.supplierName ? item?.supplierName : item.subOrg?.name,
  //         category: item?.productCategory!.length > 0 ? item?.productCategory!.map((item) => item.category?.name) : '',
  //         name: item?.name,
  //         barcode: item?.barcode,
  //         storeBarcode: item?.storeBarcode,
  //         code: item?.code,
  //         // sellingPrice: item?.sellingPrice ? parseInt(item?.sellingPrice).toLocaleString() : ''
  //         price: item.price ? parseInt(item?.price).toLocaleString() : '',
  //         status: item.approveStatus == 'APPROVED' ? 'Đang bán' : '',
  //         linkImage: item?.photos?.map((i) => i.url)
  //       })) ?? [], {
  //         str2Percent: true
  //       })
  //       .saveAs(t('product.List Balance'))
  //   }
  // }, [productFacade.result2?.data])

  const [date, setDate] = useState<boolean>()
  let stt = 1
  return (
    <div className="w-full">
      <Fragment>
        <div className="tab-wrapper">
          <Tabs
            defaultActiveKey='1'
            activeKey={activeKey} type="card" size="large"
            onTabClick={(key: string) => {
              setDate(false)
              onChangeTab(key)
            }
            }
          >
            <Tabs.TabPane tab={t('titles.store-managerment/edit')} key="1" className="">
              {!isLoading && (
                <div>
                  <Form
                    formAnt={forms}
                    values={{ ...data, }}
                    className="intro-x form-store2"
                    columns={[
                      {
                        title: 'store.Code',
                        name: 'code',
                        formItem: {
                          tabIndex: 1,
                          col: 4,
                          disabled: () => true,
                        },
                      },
                      {
                        title: 'store.Name',
                        name: 'name',
                        formItem: {
                          tabIndex: 2,
                          col: 4,
                          rules: [{ type: 'required' }],
                        },
                      },
                      {
                        title: 'store.Fax',
                        name: 'fax',
                        formItem: {
                          tabIndex: 3,
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
                            return (
                              <h3 className="text-base font-medium mb-3">{t('store.Store Address')}</h3>
                            );
                          },
                        },
                      },
                    ]}
                  />
                  <Form
                    formAnt={forms}
                    values={{
                      ...data,
                    }}
                    className="intro-x form-store1"
                    columns={[
                      {
                        title: 'store.Province',
                        name: 'provinceId',
                        formItem: {
                          firstLoad: () => ({}),
                          tabIndex: 4,
                          col: 3,
                          rules: [{ type: 'required' }],
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
                          rules: [{ type: 'required' }],
                          tabIndex: 5,
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
                          rules: [{ type: 'required' }],
                          tabIndex: 6,
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
                          rules: [{ type: 'required' }],
                          tabIndex: 7,
                          col: 3,
                        },
                      },
                    ]}
                  />
                  <div className='bg-white text-lg text-teal-900 font-bold px-5 pb-2.5'>{t('store.Representative information')}</div>
                  <Form
                    formAnt={forms}
                    values={{
                      ...data,
                      emailContact: data?.userRole?.[0].userAdmin?.email,
                      phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
                      nameContact: data?.userRole?.[0].userAdmin.name,
                    }}
                    className="intro-x form-responsive form-store3"
                    columns={[
                      {
                        title: 'store.ContactName',
                        name: 'nameContact',
                        formItem: {
                          tabIndex: 8,
                          col: 4,
                          type: 'name',
                          rules: [{ type: 'required' }],
                        },
                      },
                      {
                        title: 'store.Contact Phone Number',
                        name: 'phoneNumber',
                        formItem: {
                          tabIndex: 9,
                          col: 4,
                          rules: [{ type: 'required' }, { type: 'phone', min: 8, max: 12 }],
                        },
                      },
                      {
                        title: 'store.Contact Email',
                        name: 'emailContact',
                        formItem: {
                          tabIndex: 10,
                          col: 4,
                          rules: [{ type: 'required' }, { type: 'email' }],
                        },
                      },
                      {
                        name: 'note',
                        title: 'store.Note',
                        formItem: {
                          tabIndex: 11,
                          type: 'textarea',
                          rules: [{ type: 'textarea' }]
                        },
                      },
                    ]}
                    extendForm={(values) => (
                      <>
                        <div className="sm:flex block items-center justify-between mb-2.5">
                          <div className="flex">
                            <div className="text-xl text-teal-900 font-bold mr-6">{t('store.Connect KiotViet')}</div>
                            <Switch className="mt-1" onClick={handleClick} />
                          </div>
                          {isChecked && <Button className="!font-normal mt-2 sm:mt-0" text={t('store.Get branch DS')} />}
                        </div>
                        {isChecked && (
                          <Form
                            className='form-store'
                            formAnt={forms}
                            values={{ ...data }}
                            columns={[
                              {
                                title: 'client_id',
                                name: 'clientid',
                                formItem: {
                                  tabIndex: 1,
                                  col: 6,
                                  rules: [{ type: 'required' }],
                                },
                              },
                              {
                                title: 'client_secret',
                                name: 'clientsecret',
                                formItem: {
                                  tabIndex: 2,
                                  col: 6,
                                  rules: [{ type: 'required' }],
                                },
                              },
                              {
                                title: 'retailer',
                                name: 'retailer',
                                formItem: {
                                  tabIndex: 1,
                                  col: 6,
                                  rules: [{ type: 'required' }],
                                },
                              },
                              {
                                title: 'branchId',
                                name: 'branchid',
                                formItem: {
                                  tabIndex: 2,
                                  col: 6,
                                  rules: [{ type: 'required' }],
                                },
                              },
                            ]}
                          />
                        )}
                      </>
                    )}
                    handSubmit={handleSubmit}
                    disableSubmit={isLoading}
                    handCancel={handleBack}
                  />
                </div>
              )}
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown
                  trigger={['click']}
                  className="!rounded-xl"
                  menu={{
                    className: '!mt-3',
                    items: [
                      {
                        key: '1',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div className={`${!isBalance ? 'text-gray-400' : ''}`}>
                            BALANCE
                          </div>
                        ),
                      },
                      {
                        key: '2',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div className={`${!isBalance ? '' : 'text-gray-400'}`}>
                            Non - BALANCE
                          </div>
                        ),
                      },
                    ],
                    onClick: ({ key }) => {
                      key === '1' ?
                        (
                          setIsBalance(true),
                          dataTableRefProduct?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: { storeId: id, type: 'BALANCE' },
                          }),
                          setCategoryId1(''),
                          setCategoryId2('')
                        )
                        :
                        (
                          setIsBalance(false),
                          dataTableRefProduct?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: { storeId: id, type: 'NON_BALANCE' },
                          }),
                          setCategoryId1(''),
                          setCategoryId2('')
                        )
                    },
                  }}
                // open={activeKey != '2' ? false : undefined}
                >
                  <section className="flex items-center" id={'dropdown-store'}>
                    <div>{t('titles.Listofgoods')}</div>
                    <Arrow className="w-5 h-5 rotate-90 ml-3 mt-1 fill-green" />
                  </section>
                </Dropdown>
              }
              key="2"
              className="rounded-xl"
            >
              <DataTable
                ref={dataTableRefProduct}
                facade={productFacade}
                defaultRequest={{
                  page: 1,
                  perPage: 10,
                  filter: isBalance ? { storeId: id, type: 'BALANCE' } : { storeId: id, type: 'NON_BALANCE' },
                }}
                xScroll="1270px"
                className=" bg-white p-5 rounded-lg form-store form-header-category"
                columns={[
                  {
                    title: 'product.Code',
                    name: 'code',
                    tableItem: {
                      width: 140,
                      sorter: true,
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'product.StoreCode',
                    name: 'storeBarcode',
                    tableItem: {
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'product.SupplierCode',
                    name: 'barcode',
                    tableItem: {
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'product.Name',
                    name: 'name',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'product.Category',
                    name: 'productCategory',
                    tableItem: {
                      render: (value: any, item: any) => item?.productCategory[0]?.category?.name,
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                      render: (value: any, item: any) => isBalance ? item?.supplierName : item?.subOrg?.name,
                    },
                  },
                  {
                    title: 'product.UnitProduct',
                    name: 'basicUnit',
                    tableItem: {},
                  },
                  {
                    title: isBalance ? 'product.PriceBalance' : 'product.PriceNonBalance',
                    name: isBalance ? 'productPrice' : 'price',
                    tableItem: {
                      render: (text, item) =>
                        isBalance ? parseInt(item.productPrice[0] ? item.productPrice[0]?.price : '0').toLocaleString()
                          : parseInt(item?.price ? item?.price : '0').toLocaleString(),
                    },
                  },
                  {
                    title: 'product.SellingPrice',
                    name: 'sellingPrice',
                    tableItem: {
                      render: (text, item) =>
                        item.sellingPrice ? parseInt(item.sellingPrice).toLocaleString() : '',
                    },
                  },
                ]}
                showSearch={false}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationProduct', { from, to, total })
                }
                rightHeader={
                  <div className={'flex h-10 w-36 mb-2 sm:mb-0'}>
                    {
                      <Button
                        className={classNames(
                          '!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border',
                          {
                            '!border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group':
                              productFacade.result?.data?.length !== 0,
                            '!border-gray-300 !text-gray-300 cursor-not-allowed':
                              productFacade.result?.data?.length === 0,
                          },
                        )}
                        icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-current group-hover:!fill-white" />}
                        text={t('titles.Export Excel file')}
                        disabled={productFacade.result?.data?.length === 0 ? true : false}
                        onClick={() => {
                          // productFacade.get({
                          //   page: 1,
                          //   perPage: 10,
                          //   filter: {
                          //     storeId: id,
                          //     supplierId: getFilter(productFacade.queryParams, 'supplierId'),
                          //     categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                          //     categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                          //     categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                          //     type: getFilter(productFacade.queryParams, 'type'),
                          //     isGetAll: true
                          //   }
                          // })
                          let stt = 0
                          const excel = new Excel();
                          const sheet = excel.addSheet("Sheet1")
                          sheet.setTHeadStyle({ background: 'FFFFFFFF', borderColor: 'C0C0C0C0', wrapText: false, fontName: 'Calibri' })
                          sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' })
                          sheet.setRowHeight(0.8, 'cm')
                          // sheet.drawCell(12, 0, '')
                          sheet.addColumns([
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: 'DANH SÁCH HÀNG HÓA BALANCE', dataIndex: '' },
                          ]);
                          sheet.addRow();
                          sheet.addColumns([
                            { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'supplierId')
                                ? `${supplierStoreFacade.result?.data?.find((item) => {
                                  return item.id === getFilter(productFacade.queryParams, 'supplierId');
                                })?.name
                                }`
                                : '',
                              dataIndex: '',
                            },
                          ]);
                          sheet.addRow();
                          sheet.addColumns([
                            { title: 'Danh mục chính', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'categoryId1')
                                ? `${categoryFacade.result?.data?.find((item) => {
                                  return item.id === getFilter(productFacade.queryParams, 'categoryId1');
                                })?.name
                                }`
                                : '',
                              dataIndex: '',
                            },
                            { title: '', dataIndex: '' },
                            { title: 'Danh mục cấp 1', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'categoryId2')
                                ? `${categoryFacade.result2?.data?.find((item) => {
                                  return item.id === getFilter(productFacade.queryParams, 'categoryId2');
                                })?.name
                                }`
                                : '',
                              dataIndex: '',
                            },
                            { title: '', dataIndex: '' },
                            { title: 'Danh mục cấp 2', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'categoryId3')
                                ? `${categoryFacade.result3?.data?.find((item) => {
                                  return item.id === getFilter(productFacade.queryParams, 'categoryId3');
                                })?.name
                                }`
                                : '',
                              dataIndex: '',
                            },
                            { title: '', dataIndex: '' },
                          ]);
                          sheet.addRow()
                          sheet
                            .addColumns(columnproduct)
                            .addDataSource(productFacade?.result?.data?.map((item) => ({
                              stt: ++stt,
                              productPrice: item?.productPrice!.length > 0 ? item?.productPrice?.map((item) => parseInt(item?.price).toLocaleString()) : '0',
                              basicUnit: item?.basicUnit,
                              supplierName: item?.supplierName ? item?.supplierName : item.subOrg?.name,
                              category: item?.productCategory!.length > 0 ? item?.productCategory!.map((item) => item.category?.name) : '',
                              name: item?.name,
                              barcode: item?.barcode,
                              storeBarcode: item?.storeBarcode,
                              code: item?.code,
                              // sellingPrice: item?.sellingPrice ? parseInt(item?.sellingPrice).toLocaleString() : ''
                              price: item.price ? parseInt(item?.price).toLocaleString() : '',
                              status: item.approveStatus == 'APPROVED' ? 'Đang bán' : '',
                              linkImage: item?.photos?.map((i) => i.url)
                            })) ?? [], {
                              str2Percent: true
                            })
                            .saveAs(t('product.List Balance'))
                        }
                        }
                      />
                    }
                  </div>
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg w-full form-store"
                    values={{
                      supplierName: getFilter(productFacade.queryParams, 'supplierId'),
                      categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                      categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                      categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                      type: getFilter(productFacade.queryParams, 'type'),
                      productCode: getFilter(productFacade.queryParams, 'code'),
                      storeBarcode: getFilter(productFacade.queryParams, 'storeBarcode'),
                      supplierBarcode: getFilter(productFacade.queryParams, 'barcode'),
                      productName: getFilter(productFacade.queryParams, 'name'),
                    }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          col: 5,
                          type: 'select',
                          list: listSupplierStore?.map((item) => ({
                            label: item.name,
                            value: item.id!
                          })),
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: value,
                                categoryId1: form.getFieldValue('categoryId1'),
                                categoryId2: form.getFieldValue('categoryId2'),
                                categoryId3: form.getFieldValue('categoryId3'),
                                name: form.getFieldValue('productName'),
                                barcode: form.getFieldValue('supplierBarcode'),
                                storeBarcode: form.getFieldValue('storeBarcode'),
                                code: form.getFieldValue('productCode'),
                              },
                            });
                          },
                        },
                      },
                    ]}
                  />
                }
                subHeader={() => (
                  <Form
                    className="intro-x rounded-lg w-full form-store"
                    values={{
                      categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                      categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                      categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                      supplierName: getFilter(productFacade.queryParams, 'supplierId'),
                      type: getFilter(productFacade.queryParams, 'type'),
                      productCode: getFilter(productFacade.queryParams, 'code'),
                      storeBarcode: getFilter(productFacade.queryParams, 'storeBarcode'),
                      supplierBarcode: getFilter(productFacade.queryParams, 'barcode'),
                      productName: getFilter(productFacade.queryParams, 'name'),
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
                            value: item?.id!
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
                            setCategoryId1(value)
                            setCategoryId2('')
                            form.resetFields(['categoryId2', 'categoryId3']);
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName'),
                                categoryId1: value,
                                name: form.getFieldValue('productName'),
                                barcode: form.getFieldValue('supplierBarcode'),
                                storeBarcode: form.getFieldValue('storeBarcode'),
                                code: form.getFieldValue('productCode'),
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
                            value: item?.id!
                          })),
                          disabled: (values: any, form: any) => categoryId1 ?
                            category2?.length === 0 ? true
                              : category2 ? false : true
                            : true,
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
                          onChange(value, form) {
                            setCategoryId2(value)
                            form.resetFields(['categoryId3']);
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName'),
                                categoryId2: value,
                                categoryId1: form.getFieldValue('categoryId1'),
                                name: form.getFieldValue('productName'),
                                barcode: form.getFieldValue('supplierBarcode'),
                                storeBarcode: form.getFieldValue('storeBarcode'),
                                code: form.getFieldValue('productCode'),
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
                            value: item?.id!
                          })),
                          disabled: (values: any, form: any) => categoryId2 ?
                            category3?.length === 0 ? true
                              : category3 ? false : true
                            : true,
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
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName'),
                                categoryId3: value,
                                categoryId1: form.getFieldValue('categoryId1'),
                                categoryId2: form.getFieldValue('categoryId2'),
                                name: form.getFieldValue('productName'),
                                barcode: form.getFieldValue('supplierBarcode'),
                                storeBarcode: form.getFieldValue('storeBarcode'),
                                code: form.getFieldValue('productCode'),
                              },
                            });
                          },
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                  />
                )}
              />
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-[50%] mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Listofbranches')} key="3" className="rounded-xl"  >
              <DataTable
                facade={subStoreFacade}
                ref={dataTableRefBranch}
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(`/${lang}${routerLinks('store-managerment/branch-management/edit')}/${data.id}`)
                  },
                })}
                defaultRequest={{ page: 1, perPage: 10, filter: { storeId: id, supplierType: 'BALANCE' } }}
                xScroll="1270px"
                className=" bg-white p-5 rounded-lg form-store form-store-tab3 form-supplier-index"
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    tableItem: {
                      width: 120,
                    },
                  },
                  {
                    title: 'store.Name',
                    name: 'name',
                    tableItem: {},
                  },
                  {
                    title: 'store.Address',
                    name: 'address',
                    tableItem: {
                      render: (value: any, item: any) => {
                        const address = item.address?.street +
                          ', ' +
                          item.address?.wardName +
                          ', ' +
                          item.address?.districtName +
                          ', ' +
                          item.address?.provinceName
                        return (
                          <div className='flex'>
                            {address.slice(0, 60)}
                            {address.length >= 60 ?
                              <Tooltip title={address} className='text-black' >
                                <Infor className='w-4 h-4 mt-1 ml-1' />
                              </Tooltip>
                              : null
                            }
                          </div>
                        )
                      }
                    },
                  },
                  {
                    title: 'store.ContactName',
                    name: 'peopleContact',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.name,
                    },
                  },
                  {
                    title: 'store.Phone Number',
                    name: 'userpeopleContactRole',
                    tableItem: {
                      render: (value: any, item: any) => item.peopleContact?.phoneNumber,
                    },
                  },
                  {
                    title: 'supplier.Status',
                    name: 'isActive',
                    tableItem: {
                      render: (text: string) =>
                        text ? (
                          <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                            {t('store.Active')}
                          </div>
                        ) : (
                          <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">{t('store.NoActive')}</div>
                        ),
                    },
                  },
                ]}
                rightHeader={
                  <div className={'flex gap-2'}>
                    {storeFacade?.data?.storeId === null ?
                      (
                        <Button
                          className="!bg-teal-800 !font-normal !text-white hover:!bg-teal-700 group !rounded-xl !h-9"
                          icon={<Plus className="icon-cud !h-5 !w-5" />}
                          text={t('titles.Store/SubStore')}
                          onClick={() => navigate(`/${lang}${routerLinks('store-managerment/branch-management/create')}/${id}`)}
                        />
                      )
                      : null
                    }
                  </div>
                }
              />
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-[50%] mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown
                  trigger={['click']}
                  className="rounded-xl"
                  menu={{
                    items: [
                      {
                        key: '1',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div className={`${!isBalance ? 'text-gray-400' : ''}`}>
                            BALANCE
                          </div>
                        ),
                      },
                      {
                        key: '2',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div className={`${!isBalance ? '' : 'text-gray-400'}`}>
                            Non - BALANCE
                          </div>
                        ),
                      },
                    ],
                    onClick: ({ key }) => {
                      key === '1' ? setIsBalance(true) : setIsBalance(false)
                    },
                  }}
                // open={activeKey != '4' ? false : undefined}
                >
                  <section className="flex items-center">
                    <div>{t('titles.Manage')}</div>
                    <Arrow className="w-5 h-5 rotate-90 ml-3 mt-1 fill-green" />
                  </section>
                </Dropdown>
              }
              key="4"
              className="rounded-xl"
            >
              {isBalance ? (
                <div className={'w-full mx-auto '}>
                  <div className="p-5 bg-white rounded-xl">
                    <DataTable
                      ref={dataTableRefSupplier}
                      facade={connectSupplierFacade}
                      defaultRequest={{
                        page: 1,
                        perPage: 10,
                        filter: { idSuppiler: id },
                      }}
                      xScroll="1270px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                      }
                      columns={[
                        {
                          title: 'supplier.CodeName',
                          name: 'supplier',
                          tableItem: {
                            width: 150,
                            render: (value: any, item: any) => item.supplier?.code,
                          },
                        },
                        {
                          title: 'supplier.Name',
                          name: 'supplier',
                          tableItem: {
                            render: (value: any, item: any) => item.supplier?.name,
                          },
                        },
                        {
                          title: 'store.Address',
                          name: 'supplier',
                          tableItem: {
                            render: (value: any, item: any) => {
                              const address = item.supplier.address?.street +
                                ', ' +
                                item.supplier.address?.ward.name +
                                ', ' +
                                item.supplier.address?.district.name +
                                ', ' +
                                item.supplier.address?.province.name
                              return (
                                <div className='flex'>
                                  {address.slice(0, 60)}
                                  {address.length >= 60 ?
                                    <Tooltip title={address} className='text-black' >
                                      <Infor className='w-4 h-4 mt-1 ml-1' />
                                    </Tooltip>
                                    : null
                                  }
                                </div>
                              )
                            }
                          },
                        },
                        {
                          title: 'store.Name management',
                          name: 'supplier',
                          tableItem: {
                            render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                          },
                        },
                        {
                          title: 'store.Phone Number',
                          name: 'supplier',
                          tableItem: {
                            render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                          },
                        },
                      ]}
                    />
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-xl p-5'>
                  <DataTable
                    ref={dataTableRefsubStore}
                    facade={subStoreFacade}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: { storeId: id, supplierType: 'NON_BALANCE' },
                    }}
                    xScroll='1270px'
                    // onRow={(data: any) => ({
                    //   onDoubleClick: () => {
                    //     navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                    //   },
                    // })}
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                    }
                    columns={[
                      {
                        title: 'supplier.CodeName',
                        name: 'code',
                        tableItem: {
                          width: 150,
                        },
                      },
                      {
                        title: 'supplier.Name',
                        name: 'name',
                        tableItem: {
                        },
                      },
                      {
                        title: 'store.Address',
                        name: 'address',
                        tableItem: {
                          render: (value: any, item: any) =>
                            item.address?.street +
                            ', ' +
                            item.address?.wardName +
                            ', ' +
                            item.address?.districtName +
                            ', ' +
                            item.address?.provinceName,
                        },
                      },
                      {
                        title: 'store.Name management',
                        name: 'peopleContact',
                        tableItem: {
                          render: (value: any, item: any) => item.peopleContact?.name,
                        },
                      },
                      {
                        title: 'store.Phone Number',
                        name: 'peopleContact',
                        tableItem: {
                          render: (value: any, item: any) => item.peopleContact?.phoneNumber,
                        },
                      },
                    ]}
                  />
                </div>
              )}
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-[50%] mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown trigger={['click']}
                  className='rounded-xl'
                  menu={{
                    items: [
                      {
                        key: '1',
                        className: '!font-semibold !text-base !text-teal-900 !w-full',
                        label: (
                          <div className={`${!isRevenueByOrder ? 'text-gray-400' : ''}`}>
                            {t('store.Revenue by order')}
                          </div>
                        ),
                      },
                      {
                        key: '2',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div className={`${!isRevenueByOrder ? '' : 'text-gray-400'}`}>
                            {t('store.Revenue by product')}
                          </div>
                        ),
                      },
                    ],
                    onClick: ({ key }) => {
                      key === '1' ?
                        (
                          setIsRevenueByOrder(true),
                          setCategoryId1(''),
                          setCategoryId2('')
                        )
                        :
                        (
                          setIsRevenueByOrder(false),
                          setCategoryId1(''),
                          setCategoryId2('')
                        )
                    },
                  }}
                // open={activeKey != '5' ? false : undefined}
                >
                  <section className="flex items-center">
                    <div>{t('titles.Revenue')}</div>
                    <Arrow className="w-5 h-5 rotate-90 ml-3 mt-1 fill-green" />
                  </section>
                </Dropdown>
              }
              key="5"
              className="rounded-xl"
            >
              {isRevenueByOrder ? (
                <div className={'w-full mx-auto '}>
                  <div className="px-5 bg-white pt-6 pb-4 rounded-xl">
                    <DataTable
                      className='form-supplier-tab4'
                      ref={dataTableRefInvoiceRevenue}
                      facade={invoiceRevenueFacade}
                      defaultRequest={{
                        page: 1,
                        perPage: 10,
                        filter: {
                          idStore: id,
                          dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
                          dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
                        },
                      }}
                      xScroll="1270px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.PaginationOrder', { from, to, total })
                      }
                      searchPlaceholder={t('placeholder.Search by order number')}
                      columns={[
                        {
                          title: 'store.Revenue.Serial number',
                          name: 'supplier',
                          tableItem: {
                            width: 150,
                            render: () => `${stt++}`
                          },
                        },
                        {
                          title: 'store.Revenue.Order code',
                          name: 'invoiceCode',
                          tableItem: {
                            // render: (value: any, item: any) => item.supplier?.name,
                          },
                        },
                        {
                          title: 'store.Revenue.Sale date',
                          name: 'completedDate',
                          tableItem: {
                            render: (text: string) =>
                              text ? dayjs(text).format('DD/MM/YYYY').replace(/-/g, '/') : '',
                          },
                        },
                        {
                          title: 'store.Revenue.Value (VND)',
                          name: 'revenue',
                          tableItem: {
                            render: (text: string) => text.toLocaleString(),
                          },
                        },
                        {
                          title: 'store.Revenue.Discount (VND)',
                          name: 'discount',
                          tableItem: {
                            render: (text: string) => text.toLocaleString(),
                          },
                        },
                        {
                          title: 'store.Revenue.Total amount (VND)',
                          name: 'total',
                          tableItem: {
                            render: (text: string) => text.toLocaleString(),
                          },
                        },
                        {
                          title: 'store.Revenue.Order type',
                          name: 'type',
                          tableItem: {
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
                      rightHeader={
                        <div className="flex sm:justify-end text-left flex-col">
                          <Form
                            className="intro-x sm:flex xl:justify-end form-store mt-2 sm:mt-4 xl:mt-0"
                            values={{
                              status: getFilter(invoiceRevenueFacade.queryParams, 'status'),
                              dateFrom: getFilter(invoiceRevenueFacade.queryParams, 'dateFrom'),
                              dateTo: getFilter(invoiceRevenueFacade.queryParams, 'dateTo'),
                            }}
                            columns={[
                              {
                                title: '',
                                name: 'status',
                                formItem: {
                                  placeholder: 'placeholder.Select order type',
                                  type: 'select',
                                  list: listStatus,
                                  onChange(value, form) {
                                    dataTableRefInvoiceRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idStore: id,
                                        status: value,
                                        dateFrom: form.getFieldValue('dateFrom'),
                                        dateTo: form.getFieldValue('dateTo'),
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                            disableSubmit={isLoading}
                          />
                          <Form
                            className="intro-x rounded-lg w-full sm:flex justify-between form-store"
                            values={{
                              status: getFilter(invoiceRevenueFacade.queryParams, 'status'),
                              dateFrom: getFilter(invoiceRevenueFacade.queryParams, 'dateFrom'),
                              dateTo: getFilter(invoiceRevenueFacade.queryParams, 'dateTo'),
                            }}
                            columns={[
                              {
                                title: '',
                                name: '',
                                formItem: {
                                  tabIndex: 3,
                                  col: 2,
                                  render: () => (
                                    <div className="flex h-10 items-center !w-full">
                                      <p className="text-sm whitespace-nowrap">{t('store.Since')}</p>
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
                                  placeholder: 'placeholder.Choose a time',
                                  onChange(value, form) {
                                    form.getFieldValue('dateTo') && value > form.getFieldValue('dateTo') ? setDate(true) : setDate(false)
                                    dataTableRefInvoiceRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idStore: id,
                                        status: form.getFieldValue('status'),
                                        dateFrom: value ? value.format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                        dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
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
                                    <div className="flex h-10 items-center !w-full">
                                      <p className="text-sm whitespace-nowrap">{t('store.To date')}</p>
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
                                  placeholder: 'placeholder.Choose a time',
                                  onChange(value, form) {
                                    value && form.getFieldValue('dateFrom') > value ? setDate(true) : setDate(false)
                                    dataTableRefInvoiceRevenue?.current?.onChange({
                                      page: 1,
                                      perPage: 10,
                                      filter: {
                                        idStore: id,
                                        status: form.getFieldValue('status'),
                                        dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                        dateTo: value ? value.format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                                      },
                                    });
                                  },
                                },
                              },
                            ]}
                          />
                          {date && (<span className='md:w-[512px] text-center md:text-right text-red-500 -mt-2 z-40'>Ngày kết thúc phải lớn hơn ngày bắt đầu</span>)}
                        </div>
                      }
                    />
                    <div className="flex sm:justify-end justify-center items-center p-5">
                      <Button
                        disabled={true}
                        text={t('titles.Export report')}
                        className={
                          'flex bg-teal-900 text-white sm:w-[10rem] rounded-xl items-center justify-center disabled:opacity-50'
                        }
                        onClick={() => null}
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className='bg-white rounded-xl p-5'>
                  <DataTable
                    className='form-supplier-tab4'
                    ref={dataTableRefInvoiceKiot}
                    facade={invoiceKiotVietFacade}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        idStore: id,
                        dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
                        dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
                      },
                    }}
                    xScroll='1270px'
                    // onRow={(data: any) => ({
                    //   onDoubleClick: () => {
                    //     navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                    //   },
                    // })}
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                    }
                    columns={[
                      {
                        title: 'store.Revenue.Serial number',
                        name: 'supplier',
                        tableItem: {
                          width: 150,
                          sorter: true,
                          render: () => `${stt++}`
                        },
                      },
                      {
                        title: 'store.Inventory management.Product code',
                        name: 'productCode',
                        tableItem: {
                          sorter: true,
                          // render: (value: any, item: any) => item.supplier?.name,
                        },
                      },
                      {
                        title: 'store.Inventory management.Product name',
                        name: 'productName',
                        tableItem: {
                          sorter: true,
                        },
                      },
                      {
                        title: 'store.Barcode',
                        name: 'barcode',
                        tableItem: {
                          sorter: true,
                        },
                      },
                      {
                        title: 'product.SupplierName',
                        name: 'supplierName',
                        tableItem: {
                        },
                      },
                      {
                        title: 'product.Revenue',
                        name: 'revenue',
                        tableItem: {
                        },
                      },
                      {
                        title: 'product.Status',
                        name: 'status',
                        tableItem: {
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
                    // searchPlaceholder={t('placeholder.Search by order number')}
                    rightHeader={
                      <div className="flex justify-end text-left flex-col w-full ">
                        <Form
                          className="intro-x sm:flex justify-start xl:justify-end xl:mt-0 form-store mt-2 sm:mt-4"
                          values={{
                            dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                            supplierId: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                          }}
                          columns={[
                            {
                              title: '',
                              name: 'status',
                              formItem: {
                                placeholder: 'placeholder.Select status',
                                type: 'select',
                                tabIndex: 3,
                                col: 6,
                                list: listStatusProduct,
                                onChange(value, form) {
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: value,
                                      dateFrom: form.getFieldValue('dateFrom'),
                                      dateTo: form.getFieldValue('dateTo'),
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3'),
                                      supplierId: form.getFieldValue('supplierId'),
                                    },
                                  });
                                },
                              },
                            },
                            {
                              title: '',
                              name: 'supplierId',
                              formItem: {
                                placeholder: 'placeholder.Choose a supplier',
                                col: 6,
                                type: 'select',
                                list: supplierInvoice2.map((item) => ({
                                  label: item?.name,
                                  value: item?.id!
                                })),
                                onChange(value, form) {
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      supplierId: value,
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom'),
                                      dateTo: form.getFieldValue('dateTo'),
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3')
                                    },
                                  });
                                },
                              },
                            },
                          ]}
                          disableSubmit={isLoading}
                        />
                        <Form
                          className='intro-x rounded-lg w-full sm:flex justify-between form-store mb-2 '
                          values={{
                            dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                            supplierId: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                          }}
                          columns={[
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className="flex h-10 items-center !w-full">
                                    <p className="text-sm whitespace-nowrap">{t('store.Since')}</p>
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
                                placeholder: 'placeholder.Choose a time',
                                onChange(value, form) {
                                  form.getFieldValue('dateTo') && value > form.getFieldValue('dateTo') ? setDate(true) : setDate(false)
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status'),
                                      dateFrom: value ? value.format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo').format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3'),
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
                                  <div className="flex h-10 items-center !w-full">
                                    <p className="text-sm whitespace-nowrap">{t('store.To date')}</p>
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
                                placeholder: 'placeholder.Choose a time',
                                onChange(value, form) {
                                  value && form.getFieldValue('dateFrom') > value ? setDate(true) : setDate(false)
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                      dateTo: value ? value.format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3'),
                                      supplierId: form.getFieldValue('supplierId'),
                                    }
                                  });
                                },
                              },
                            },
                          ]}
                        />
                        {date && (<span className='md:w-[520px] text-center md:text-right text-red-500 -mt-4 mb-4 z-40'>Ngày kết thúc phải lớn hơn ngày bắt đầu</span>)}
                      </div>
                    }
                    subHeader={() => (
                      <Form
                        className="intro-x rounded-lg form-store form-header-category -mt-4"
                        values={{
                          categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                          categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                          categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                          dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                          dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                          status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                          supplierId: getFilter(invoiceKiotVietFacade.queryParams, 'supplierId'),
                        }}
                        columns={
                          [
                            {
                              title: '',
                              name: 'categoryId1',
                              formItem: {
                                tabIndex: 3,
                                placeholder: 'placeholder.Main categories',
                                type: 'select',
                                col: 3,
                                list: category1?.map((item) => ({
                                  label: item?.name!,
                                  value: item?.id!
                                })),
                                // get: {
                                //   facade: CategoryFacade,
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                // },
                                onChange(value, form) {
                                  setCategoryId1(value)
                                  setCategoryId2('')
                                  form.resetFields(['categoryId2', 'categoryId3'])
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId1: value,
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom'),
                                      dateTo: form.getFieldValue('dateTo'),
                                      supplierId: form.getFieldValue('supplierId'),
                                    }
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
                                  value: item?.id!
                                })),
                                disabled: (values: any, form: any) => categoryId1 ?
                                  category2?.length === 0 ? true
                                    : category2 ? false : true
                                  : true,
                                // get: {
                                //   key: 'result2',
                                //   method: 'get2',
                                //   facade: CategoryFacade,
                                //   format: (item: any) => ({
                                //     label: item.name,
                                //     value: item.id,
                                //   }),
                                //   params: (fullTextSearch, value) => ({
                                //     fullTextSearch,
                                //     id: value().categoryId1,
                                //   }),
                                // },
                                onChange(value, form) {
                                  setCategoryId2(value)
                                  form.resetFields(['categoryId3'])
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId2: value,
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom'),
                                      dateTo: form.getFieldValue('dateTo'),
                                      supplierId: form.getFieldValue('supplierId'),
                                    }
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
                                  value: item?.id!
                                })),
                                disabled: (values: any, form: any) => categoryId2 ?
                                  category3?.length === 0 ? true
                                    : category3 ? false : true
                                  : true,
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
                                onChange(value, form) {
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId3: value,
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom'),
                                      dateTo: form.getFieldValue('dateTo'),
                                      supplierId: form.getFieldValue('supplierId'),
                                    }
                                  });
                                },
                              },
                            },
                          ]}
                        disableSubmit={isLoading}
                      />
                    )}
                  />
                  <div className="flex sm:justify-end justify-center items-center p-5">
                    <Button
                      disabled={true}
                      text={t('titles.Export report')}
                      className={
                        'flex bg-teal-900 text-white sm:w-[10rem] rounded-xl items-center justify-center disabled:opacity-50'
                      }
                      onClick={() => null}
                    />
                  </div>
                </div>
              )}
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-[50%] mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>

            <Tabs.TabPane tab={t('titles.Inventory management')} key="6" className="rounded-xl">
              <DataTable
                ref={dataTableRefInventory}
                facade={inventoryProductFacade}
                defaultRequest={{ page: 1, perPage: 10, filter: { idStore: id } }}
                xScroll="1270px"
                className=" bg-white p-5 rounded-lg form-store form-store-tab3"
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationProduct', { from, to, total })
                }
                columns={[
                  {
                    title: 'store.Inventory management.Product code',
                    name: 'productCode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' },
                      width: 120,
                    },
                  },
                  {
                    title: 'store.Inventory management.Barcode (Supplier)',
                    name: 'supplierBarcode',
                    tableItem: {
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'store.Inventory management.Barcode (Product)',
                    name: 'storeBarcode',
                    tableItem: {
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'store.Inventory management.Product name',
                    name: 'productName',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: 'store.Inventory management.Category',
                    name: 'category',
                    tableItem: {},
                  },
                  {
                    title: 'store.Inventory management.Supplier',
                    name: 'supplierName',
                    tableItem: {},
                  },
                  {
                    title: 'store.Inventory management.Unit',
                    name: 'units',
                    tableItem: {
                      render(text, item) {
                        return (
                          <Select value={item?.units[0]?.name} className="w-24" showSearch={true}>
                            {item?.units.map((unit: any) => (
                              <Select.Option value={unit.value}>{unit.name}</Select.Option>
                            ))}
                          </Select>
                        );
                      },
                    },
                  },
                  {
                    title: 'store.Inventory management.Quantity on KiotViet',
                    name: 'numberInKiot',
                    tableItem: {
                      // width: 120,
                      align: 'right',
                    },
                  },
                  {
                    title: 'store.Inventory management.Quantity on BALANCE',
                    name: 'numberInBal',
                    tableItem: {
                      // width: 120,
                      align: 'right',
                      render: (value: any, item: any) => parseFloat(item?.numberInBal).toLocaleString(),
                    },
                  },
                  {
                    title: 'store.Inventory management.Warehouse price',
                    name: 'inventoryPrice',
                    tableItem: {
                      // width: 70,
                      align: 'right',
                      render: (value: any, item: any) => parseInt(item?.inventoryPrice).toLocaleString(),
                    },
                  },
                  {
                    title: 'store.Inventory management.Total amount',
                    name: 'inventoryPrice',
                    tableItem: {
                      // width: 70,
                      align: 'right',
                      render: (value: any, item: any) =>
                        parseInt(`${item?.numberInBal * item?.inventoryPrice}`).toLocaleString(),
                    },
                  },
                ]}
                showSearch={false}
                rightHeader={
                  <div className={'w-auto -mt-2 sm:mt-0'}>
                    {
                      <Button
                        className="!bg-teal-900 !font-normal !text-white hover:!bg-teal-700 group w-28 !block !py-2 !rounded-xl"
                        text={t('titles.synchronized')}
                        onClick={() => inventoryProductFacade.put({ ...inventoryProductFacade?.data!, id })}
                      />
                    }
                  </div>
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg md:flex form-store"
                    values={{
                      supplierName: getFilter(inventoryProductFacade.queryParams, 'supplierId'),
                      productCode: getFilter(inventoryProductFacade.queryParams, 'productCode'),
                      storeBarcode: getFilter(inventoryProductFacade.queryParams, 'storeBarcode'),
                      supplierBarcode: getFilter(inventoryProductFacade.queryParams, 'supplierBarcode'),
                      productName: getFilter(inventoryProductFacade.queryParams, 'productName'),
                    }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          type: 'select',
                          list: listSupplierStore?.map((item) => ({
                            label: item.name,
                            value: item.id!
                          })),
                          // get: {
                          //   facade: SupplierStoreFacade,
                          //   format: (item: any) => ({
                          //     label: item.name,
                          //     value: item.id,
                          //   }),
                          //   params: (fullTextSearch: string) => ({
                          //     type: 'BALANCE',
                          //     storeId: id,
                          //   }),
                          // },
                          onChange(value, form) {
                            dataTableRefInventory?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                idStore: id,
                                supplierId: value,
                                productName: form.getFieldValue('productName'),
                                supplierBarcode: form.getFieldValue('supplierBarcode'),
                                storeBarcode: form.getFieldValue('storeBarcode'),
                                productCode: form.getFieldValue('productCode'),
                              },
                            });
                          },
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                  />
                }
              />
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-[50%] mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment >
    </div >
  );
};
export default Page;

