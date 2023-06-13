import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Form as AntForm, Select, Switch, Tabs, Dropdown } from 'antd';
import { useNavigate, useParams } from 'react-router';
import classNames from 'classnames';
import dayjs from 'dayjs';

import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { Arrow, Download, Plus } from '@svgs';
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

  const isBack = useRef(true);
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


  const listStatus = [
    {
      label: 'Bán hàng',
      value: 'DELEVERED',
    },
    {
      label: 'Trả hàng',
      value: 'REFUND',
    },
    {
      label: 'Đã hủy',
      value: 'CANCEL',
    },
  ];
  const listStatusProduct = [
    {
      label: 'Đang bán',
      value: 'APPROVED',
    },
    {
      label: 'Ngừng bán',
      value: 'STOP_SELLING',
    },
  ];

  useEffect(() => {
    if (id) {
      storeFacade.getById({ id })
      // console.log(dayjs().subtract(1, 'month').format('DD/MM/YYYY 00:00:00').replace(/-/g, '/'))
    }
    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    if (status === 'put.fulfilled')
      navigate(`/${lang}${routerLinks('Store')}?${new URLSearchParams(param).toString()}`);
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Store')}`);

  const handleSubmit = (values: any) => {
    const connectKiot = forms.getFieldsValue()
    storeFacade.put({ ...values, id, connectKiot });
  };

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  interface IExcelColumn {
    title: string;
    key: string;
    dataIndex: string;
  }

  const columnproduct: IExcelColumn[] = [
    { title: 'Mã sản phẩm', key: 'code', dataIndex: 'code' },
    { title: 'Mã vạch (CH)', key: 'storeBarcode', dataIndex: 'storeBarcode' },
    { title: 'Mã vạch (NCC)', key: 'barcode', dataIndex: 'barcode' },
    { title: 'Tên sản phẩm', key: 'name', dataIndex: 'name' },
    { title: 'Danh mục', key: 'category', dataIndex: 'category' },
    { title: 'Nhà cung cấp', key: 'supplierName', dataIndex: 'supplierName' },
    { title: 'Đơn vị', key: 'basicUnit', dataIndex: 'basicUnit' },
    { title: 'Giá bán lẻ (VND)', key: 'productPrice', dataIndex: 'productPrice' },
  ];

  return (
    <div className="w-full">
      <Fragment>
        <div className="tab-wrapper">
          <Tabs
            defaultActiveKey='1'
            type="card"
            size="large"
            onTabClick={(activeKey: any) => {
              activeKey === '3' ? dataTableRefBranch?.current?.onChange({
                page: 1,
                perPage: 10,
                fullTextSearch: '', filter: { storeId: id, supplierType: 'BALANCE' }
              }) : ''
              navigate(`/${lang}${routerLinks('store-managerment/edit')}/${id}?tab=${activeKey}`)
            }
            }
          >
            <Tabs.TabPane tab={t('titles.store-managerment/edit')} key="1" className="">
              {!isLoading && (
                <Form
                  formAnt={forms}
                  values={{
                    ...data,
                    emailContact: data?.userRole?.[0].userAdmin?.email,
                    phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
                    nameContact: data?.userRole?.[0].userAdmin.name,
                  }}
                  className="intro-x form-responsive"
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
                            <h3 className="mb-2.5 text-base text-black font-medium">{t('store.Store Address')}</h3>
                          );
                        },
                      },
                    },
                    {
                      title: 'store.Province',
                      name: 'provinceId',
                      formItem: {
                        firstLoad: () => ({}),
                        tabIndex: 4,
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
                        rules: [{ type: 'requiredSelect' }],
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
                          })
                        )
                        :
                        (
                          setIsBalance(false),
                          dataTableRefProduct?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: { storeId: id, type: 'NON_BALANCE' },
                          })
                        )
                    },
                  }}
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
                      width: 180,
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
                    name: 'category',
                    tableItem: {
                      render: (value: any, item: any) => item?.category?.child?.name,
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                      render: (value: any, item: any) => item?.subOrg?.name,
                    },
                  },
                  {
                    title: 'product.Unit',
                    name: 'basicUnit',
                    tableItem: {},
                  },
                  {
                    title: 'product.Price',
                    name: 'productPrice',
                    tableItem: {
                      render: (text, item) =>
                        parseInt(item.productPrice[0] ? item.productPrice[0]?.price : '0').toLocaleString(),
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
                          console.log(productFacade?.result?.data)
                          const excel = new Excel();
                          excel
                            .addSheet("test")
                            .addColumns(columnproduct)
                            .addDataSource(productFacade?.result?.data ?? [], {
                              str2Percent: true
                            })
                            .saveAs("Danh sách hàng hóa Balance.xlsx");
                        }}
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
                    }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          col: 5,
                          type: 'select',
                          get: {
                            facade: SupplierStoreFacade,
                            format: (item: any) => ({
                              label: item.name,
                              value: item.id,
                            }),
                            params: (fullTextSearch, value) => ({
                              fullTextSearch,
                              storeId: id,
                              type: value().type,
                            }),
                          },
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: value ? value : '',
                                // categoryId: form.getFieldValue('categoryId1') ? form.getFieldValue('categoryId1') : '' ,
                                categoryId1: form.getFieldValue('categoryId1') ? form.getFieldValue('categoryId1') : '',
                                categoryId2: form.getFieldValue('categoryId2') ? form.getFieldValue('categoryId2') : '',
                                categoryId3: form.getFieldValue('categoryId3') ? form.getFieldValue('categoryId3') : '',
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
                            form.resetFields(['categoryId2', 'categoryId3']);
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName')
                                  ? form.getFieldValue('supplierName')
                                  : '',
                                categoryId1: value ? value : '',
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
                          disabled: (values, form) => values.categoryId1 ? false : true,
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
                            form.resetFields(['categoryId3']);
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName')
                                  ? form.getFieldValue('supplierName')
                                  : '',
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
                          disabled: (values: any, form: any) => values.categoryId2 ? false : true,
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
                                storeId: id,
                                type: form.getFieldValue('type'),
                                supplierId: form.getFieldValue('supplierName')
                                  ? form.getFieldValue('supplierName')
                                  : '',
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
                )}
              />
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 '}
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
                defaultRequest={{ page: 1, perPage: 10, filter: { storeId: id, supplierType: 'BALANCE' } }}
                xScroll="1270px"
                className=" bg-white p-5 rounded-lg form-store"
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
                          <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded"></div>
                        ),
                    },
                  },
                ]}
                rightHeader={
                  <div className={'flex gap-2'}>
                    {
                      <Button
                        className="!bg-teal-800 !font-normal !text-white hover:!bg-teal-700 group !rounded-xl !h-9 mt-2 lg:mt-1 lg:w-full"
                        icon={<Plus className="icon-cud !h-5 !w-5" />}
                        text={t('titles.Store/SubStore')}
                      // onClick={() => navigate(`/${lang}${routerLinks('store-managerment/create')}`)}
                      />
                    }
                  </div>
                }
              />
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 '}
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
                      key === '1' ?
                        (
                          setIsBalance(true),
                          dataTableRefSupplier?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            fullTextSearch: '',
                            filter: { idSuppiler: id },
                          }))
                        :
                        (
                          setIsBalance(false),
                          dataTableRefsubStore?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            fullTextSearch: '',
                            filter: { storeId: id, supplierType: 'NON_BALANCE' },
                          })
                        )
                    },
                  }}
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
                <DataTable
                  ref={dataTableRefSupplier}
                  facade={connectSupplierFacade}
                  defaultRequest={{
                    page: 1,
                    perPage: 10,
                    fullTextSearch: '',
                    filter: { idSuppiler: id, suppilerType: '' },
                  }}
                  xScroll="1270px"
                  className=" bg-white p-5 rounded-lg"
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
                        render: (value: any, item: any) =>
                          item.supplier.address?.street +
                          ', ' +
                          item.supplier.address?.ward.name +
                          ', ' +
                          item.supplier.address?.district.name +
                          ', ' +
                          item.supplier.address?.province.name,
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
              ) : (
                <DataTable
                  ref={dataTableRefsubStore}
                  facade={subStoreFacade}
                  defaultRequest={{
                    page: 1,
                    perPage: 10,
                    fullTextSearch: '',
                    filter: { storeId: id, supplierType: 'NON_BALANCE' },
                  }}
                  xScroll="1270px"
                  className=" bg-white p-5 rounded-lg"
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
              )}
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 '}
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
                          dataTableRefInvoiceRevenue?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: {
                              idStore: id,
                              dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
                              dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
                            },
                          })
                        )
                        :
                        (
                          setIsRevenueByOrder(false),
                          dataTableRefInvoiceKiot?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: {
                              idStore: id,
                              dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
                              dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
                            },
                          })
                        )
                    }
                  }}
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
              <div className="bg-white p-5 rounded-lg">
                {isRevenueByOrder ? (
                  <DataTable
                    ref={dataTableRefInvoiceRevenue}
                    facade={invoiceRevenueFacade}
                    defaultRequest={{
                      page: 1,
                      perPage: 10,
                      filter: {
                        idStore: id,
                        dateFrom: dayjs().subtract(1, 'month').format('YYYY/MM/DD 00:00:00').replace(/-/g, '/'),
                        dateTo: dayjs().format('YYYY/MM/DD 23:59:59').replace(/-/g, '/'),
                        status: '',
                        supplierId: '',
                      },
                      fullTextSearch: ''
                    }}
                    xScroll="1270px"
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
                          // render: (value: any, item: any) => item.supplier?.code,
                        },
                      },
                      {
                        title: 'store.Revenue.Order code',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier?.name,
                        },
                      },
                      {
                        title: 'store.Revenue.Sale date',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier?.name,
                        },
                      },
                      {
                        title: 'store.Revenue.Value (VND)',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier?.name,
                        },
                      },
                      {
                        title: 'store.Revenue.Discount (VND)',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                        },
                      },
                      {
                        title: 'store.Revenue.Total amount (VND)',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                      {
                        title: 'store.Revenue.Order type',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                    ]}
                    searchPlaceholder={t('placeholder.Search by order number')}
                    rightHeader={
                      <div className="flex sm:justify-end text-left flex-col">
                        <Form
                          className="intro-x sm:flex lg:justify-end form-store mt-2 sm:mt-4 lg:mt-0"
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
                                    <p className="text-sm">{t('store.Since')}</p>
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
                                  dataTableRefInvoiceRevenue?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status'),
                                      dateFrom: value ? value.format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                      dateTo: form.getFieldValue('dateTo') ?
                                        form
                                          .getFieldValue('dateTo')
                                          .format('YYYY/MM/DD 23:59:59')
                                          .replace(/-/g, '/') : '',
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
                                    <p className="text-sm">{t('store.To date')}</p>
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
                                  dataTableRefInvoiceRevenue?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status'),
                                      dateFrom: form.getFieldValue('dateFrom') ? form
                                        .getFieldValue('dateFrom')
                                        .format('YYYY/MM/DD 00:00:00')
                                        .replace(/-/g, '/') : '',
                                      dateTo: value ? value.format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                                    },
                                  });
                                },
                              },
                            },
                          ]}
                        />
                      </div>
                    }
                  />
                ) : (
                  <DataTable
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
                      fullTextSearch: ''
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
                          // render: (value: any, item: any) => item.supplier?.code,
                        },
                      },
                      {
                        title: 'store.Inventory management.Product code',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier?.name,
                        },
                      },
                      {
                        title: 'store.Inventory management.Product name',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
                        },
                      },
                      {
                        title: 'store.Barcode',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                        },
                      },
                      {
                        title: 'titles.Revenue',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                      {
                        title: 'product.Revenue',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                      {
                        title: 'product.Status',
                        name: 'supplier',
                        tableItem: {
                          // render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                    ]}
                    searchPlaceholder={t('placeholder.Search by order number')}
                    rightHeader={
                      <div className="flex justify-end text-left flex-col w-full ">
                        <Form
                          className="intro-x sm:flex justify-start lg:justify-end lg:mt-0 form-store mt-2 sm:mt-4"
                          values={{
                            dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
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
                                      status: value ? value : '',
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : ''
                                    },
                                  });
                                },
                              },
                            },
                            {
                              title: '',
                              name: 'supplier',
                              formItem: {
                                placeholder: 'placeholder.Choose a supplier',
                                col: 6,
                                type: 'select',
                                // firstLoad: () => ({ page: 1, perPage: 100000, filter: { idSuppiler: '832' } }),
                                get: {
                                  facade: ConnectSupplierFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: () => ({
                                    page: 1,
                                    perPage: 100000,
                                    filter: {
                                      idSuppiler: '832',
                                    },
                                  }),
                                },
                              },
                            },
                          ]}
                          disableSubmit={isLoading}
                        />
                        <Form
                          className='intro-x rounded-lg w-full sm:flex justify-between form-store ml-2 mb-2 '
                          values={{
                            dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                          }}
                          columns={[
                            // {
                            //   title: '',
                            //   name: '',
                            //   formItem: {
                            //     tabIndex: 3,
                            //     col: 6,
                            //     render: () => (
                            //       <div className="h-10 items-center auto">
                            //         <p className="text-sm">{t('store.Since')}</p>
                            //         <div className='pl-2 pt-2'>
                            //           <Form
                            //             values={{
                            //               dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            //               dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            //               status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            //               categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            //               categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            //               categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                            //             }}
                            //             className='pl-2 pt-2 form-supplier-date'
                            //             columns={[{
                            //               title: '',
                            //               name: 'dateFrom',
                            //               formItem: {
                            //                 type: 'date',
                            //                 placeholder: 'placeholder.Choose a time',
                            //                 onChange(value, form) {
                            //                   dataTableRefInvoiceKiot?.current?.onChange({
                            //                     page: 1,
                            //                     perPage: 10,
                            //                     filter: {
                            //                       idStore: id,
                            //                       status: form.getFieldValue('status') ? form.getFieldValue('type') : '',
                            //                       filterDate: {
                            //                         dateFrom: value ? value.format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                            //                         dateTo: form.getFieldValue('dateFrom')
                            //                           ? form
                            //                             .getFieldValue('dateFrom')
                            //                             .format('YYYY/MM/DD 23:59:59')
                            //                             .replace(/-/g, '/')
                            //                           : '',
                            //                       },
                            //                       type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                            //                     },
                            //                     fullTextSearch: '',
                            //                   });
                            //                 },
                            //               },
                            //             },]} />
                            //         </div>
                            //       </div>
                            //     ),
                            //   },
                            // },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className="h-10 items-center !w-full">
                                    <p className="text-sm">{t('store.Since')}</p>
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
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      dateFrom: value ? value.format('YYYY/MM/DD 00:00:00').replace(/-/g, '/') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3')
                                    },
                                  });
                                },
                              },
                            },
                            // {
                            //   title: '',
                            //   name: '',
                            //   formItem: {
                            //     tabIndex: 3,
                            //     col: 6,
                            //     render: () => (
                            //       <div className="flex h-10 items-center !w-full">
                            //         <p className="text-sm">{t('store.To date')}</p>
                            //         <div>
                            //           <Form
                            //             values={{
                            //               dateFrom: getFilter(invoiceKiotVietFacade.queryParams, 'dateFrom'),
                            //               dateTo: getFilter(invoiceKiotVietFacade.queryParams, 'dateTo'),
                            //               status: getFilter(invoiceKiotVietFacade.queryParams, 'status'),
                            //               categoryId1: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId1'),
                            //               categoryId2: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId2'),
                            //               categoryId3: getFilter(invoiceKiotVietFacade.queryParams, 'categoryId3'),
                            //             }}
                            //             className='pl-2 pt-4 form-supplier-date'
                            //             columns={[{
                            //               title: '',
                            //               name: 'dateTo',
                            //               formItem: {
                            //                 type: 'date',
                            //                 placeholder: 'placeholder.Choose a time',
                            //                 onChange(value, form) {
                            //                   dataTableRefInvoiceKiot?.current?.onChange({
                            //                     page: 1,
                            //                     perPage: 10,
                            //                     filter: {
                            //                       idStore: id,
                            //                       status: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                            //                       filterDate: {
                            //                         dateFrom: form.getFieldValue('dateTo')
                            //                           ? form
                            //                             .getFieldValue('dateTo')
                            //                             .format('YYYY/MM/DD 00:00:00')
                            //                             .replace(/-/g, '/')
                            //                           : '',
                            //                         dateTo: value ? value.format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                            //                       },
                            //                       type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                            //                     },
                            //                     fullTextSearch: '',
                            //                   });
                            //                 },
                            //               },
                            //             },]} />
                            //         </div>
                            //       </div>
                            //     ),
                            //   },
                            // },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className="flex h-10 items-center !w-full">
                                    <p className="text-sm">{t('store.To date')}</p>
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
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                      dateTo: value ? value.format('YYYY/MM/DD 23:59:59').replace(/-/g, '/') : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      categoryId3: form.getFieldValue('categoryId3'),
                                    }
                                  });
                                },
                              },
                            },
                          ]}
                        />
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
                          status: getFilter(invoiceKiotVietFacade.queryParams, 'status')
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
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                                onChange(value, form) {
                                  form.resetFields(['categoryId2', 'categoryId3'])
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId1: value ? value : '',
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : ''
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
                                disabled: (values: any, form: any) => values.categoryId1 ? false : true,
                                get: {
                                  key: 'result2',
                                  method: 'get2',
                                  facade: CategoryFacade,
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
                                  form.resetFields(['categoryId3'])
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId2: value ? value : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : ''
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
                                disabled: (values: any, form: any) => values.categoryId2 ? false : true,
                                get: {
                                  key: 'result3',
                                  method: 'get3',
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    id: value().cap2,
                                  })
                                },
                                onChange(value, form) {
                                  dataTableRefInvoiceKiot?.current?.onChange({
                                    page: 1,
                                    perPage: 10,
                                    filter: {
                                      idStore: id,
                                      categoryId3: value ? value : '',
                                      categoryId1: form.getFieldValue('categoryId1'),
                                      categoryId2: form.getFieldValue('categoryId2'),
                                      status: form.getFieldValue('status') ? form.getFieldValue('status') : '',
                                      dateFrom: form.getFieldValue('dateFrom') ? form.getFieldValue('dateFrom') : '',
                                      dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : ''
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
                )}
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
              <div className=" flex items-center justify-center mt-9 sm:mt-2 sm:block">
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:w-32 justify-center out-line w-80 mt-4 '}
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
                className=" bg-white p-5 rounded-lg form-store"
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
                  <div className={'w-auto'}>
                    {
                      <Button
                        className="!bg-teal-800 !font-normal !text-white hover:!bg-teal-700 group"
                        text={t('titles.synchronized')}
                        onClick={() => inventoryProductFacade.put({ ...inventoryProductFacade?.data!, id })}
                      />
                    }
                  </div>
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg md:flex"
                    values={{ supplierName: getFilter(inventoryProductFacade.queryParams, 'supplierId') }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          type: 'select',
                          get: {
                            facade: SupplierStoreFacade,
                            format: (item: any) => ({
                              label: item.name,
                              value: item.id,
                            }),
                            params: (fullTextSearch: string) => ({
                              type: 'BALANCE',
                              storeId: id,
                            }),
                          },
                          onChange(value, form) {
                            dataTableRefInventory?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: { idStore: id, supplierId: value ? value : '' },
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
                  className={'sm:w-32 justify-center out-line w-80 mt-4 '}
                  onClick={() => {
                    handleBack();
                  }}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
