import React, { Fragment, useEffect, useRef, useState } from 'react';
import { Select, Tabs } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { Button } from '@core/button';
import { CategoryFacade, ProductFacade, SupplierAdminFacade } from '@store';
import { getFilter, language, languages, routerLinks } from '@utils';
import { DataTable } from '@core/data-table';
import classNames from 'classnames';
import { Download } from '@svgs';
import { Excel } from 'antd-table-saveas-excel';
import { TableRefObject } from '@models';
import { notApprovedFacade } from '@store/product/product-not-approved';

const Page = () => {
  const dataTableRef = useRef<TableRefObject>(null);
  const dataTableRefProduct = useRef<TableRefObject>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeStoreTab') || 'tab');

  const productFacade = ProductFacade();
  const categoryFacade = CategoryFacade();
  const supplierAdminFacade = SupplierAdminFacade();
  const notapprovedFacade = notApprovedFacade();
  const { isLoading, queryParams } = productFacade;

  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  const { id } = useParams();

  const category1 = categoryFacade.result?.data
  const category2 = categoryFacade.result2?.data
  const category3 = categoryFacade.result3?.data
  const listSupplierAdmin = supplierAdminFacade.result?.data
  const [categoryId1, setCategoryId1] = useState('')
  const [categoryId2, setCategoryId2] = useState('')

  const onChangeTab = (key: string) => {
    setActiveKey(key);
    localStorage.setItem('activeStoreTab', key);
    navigate(`/${lang}${routerLinks('merchandise')}?tab=${key}`);
  };

  useEffect(() => {
    categoryFacade.get({});
    if (activeKey == '1') {
      supplierAdminFacade.get({
        type: 'BALANCE',
      })
      dataTableRef?.current?.onChange({
        page: 1,
        perPage: 10,
        filter: { type: 'BALANCE', approveStatus: 'APPROVED' }
      });
    } if (activeKey == '2') {
      productFacade.getproduct();
      supplierAdminFacade.get({
        type: 'BALANCE',
      })
      notapprovedFacade.getnot({
        type: 'BALANCE',
        page: 1,
        perPage: 10,
        categoryId: '',
        supplierId: ''
      });
    }
  }, [activeKey])

  useEffect(() => {
    categoryFacade.get({})
    return () => {
      isReload.current && productFacade.get(param);
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

  interface IExcelColumn {
    title: string;
    key: string;
    dataIndex: string;
  }

  const columnproduct: IExcelColumn[] = [
    { title: 'STT', key: 'stt', dataIndex: 'stt' },
    { title: t('product.Code'), key: 'code', dataIndex: 'code' },
    { title: t('product.Name'), key: 'name', dataIndex: 'name' },
    { title: t('product.Storecode'), key: 'barcode', dataIndex: 'barcode' },
    { title: t('product.Category'), key: 'category', dataIndex: 'category' },
    { title: t('product.Unitproduct'), key: 'basicUnit', dataIndex: 'basicUnit' },
    { title: t('product.price'), key: 'productPrice', dataIndex: 'productPrice' },
    { title: t('product.statCANCELLEDus'), key: 'status', dataIndex: 'status' },
    { title: t('product.Image'), key: 'linkImage', dataIndex: 'linkImage' },
  ]

  const Listoption = [
    { label: t('merchant.ALL'), value: 'ALL', },
    { label: t('merchant.APPROVED'), value: 'APPROVED', },
    { label: t('merchant.WAITING_APPROVE'), value: 'WAITING_APPROVE', },
    { label: t('merchant.REJECTED'), value: 'REJECTED', },
    { label: t('merchant.OUT_OF_STOCK'), value: 'OUT_OF_STOCK', },
    { label: t('merchant.STOP_SELLING'), value: 'STOP_SELLING', },
    { label: t('merchant.CANCELLED'), value: 'CANCELLED', },
  ];

  return (
    <div className="w-full">
      <Fragment>
        <div className="tab-wrapper">
          <Tabs
            defaultActiveKey='1'
            activeKey={activeKey}
            type="card"
            size="large"
            onTabClick={(key: string) => {
              onChangeTab(key);
            }
            }
          >
            <Tabs.TabPane tab={t('Danh sách sản phẩm')} key="1" className="">
              <DataTable
                ref={dataTableRefProduct}
                facade={productFacade}
                defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'APPROVED' }, }}
                xScroll="1380px"
                className=" bg-white p-5 rounded-lg form-store-tab3 form-supplier-index"
                onRow={(data: any) => ({
                  onDoubleClick: () => navigate(`/${lang}${routerLinks('Supplier/Edit')}/${data.id}?tab=1`),
                })}
                showSearch={false}
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
                      width: 180,
                      sorter: true,
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: `product.Name`,
                    name: 'name',
                    tableItem: {
                      width: 200,
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
                        item?.category?.child
                          ? item?.category?.child?.child?.name || item?.category?.child?.name
                          : item?.category?.name,
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.PriceBalance',
                    name: 'productPrice',
                    tableItem: {
                      render: (value: any, item: any) => item?.productPrice[0]?.price.toLocaleString(),
                    },
                  },
                  {
                    title: `product.Status`,
                    name: 'approveStatus',
                    tableItem: {
                      width: 160,
                      align: 'center',
                      render: (text: string) =>
                        text == 'APPROVED' ? (
                          <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                            {t('merchant.APPROVED')}
                          </div>
                        ) : text == 'WAITING_APPROVE' ? (
                          <div className="bg-yellow-100 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                            {t('merchant.WAITING_APPROVE')}
                          </div>
                        ) : text == 'REJECTED' ? (
                          <div className="bg-blue-100 text-center p-1 border border-blue-500 text-blue-600 rounded">
                            {t('merchant.REJECTED')}
                          </div>
                        ) : text == 'OUT_OF_STOCK' ? (
                          <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                            {t('merchant.OUT_OF_STOCK')}
                          </div>
                        ) : text == 'STOP_SELLING' ? (
                          <div className="bg-gray-100 text-center p-1 border border-black text-black rounded">
                            {t('merchant.STOP_SELLING')}
                          </div>
                        ) : (
                          <div className="bg-gray-100 text-center p-1 border border-black text-black rounded">
                            {t('merchant.CANCELLED')}
                          </div>
                        ),
                    },
                  },
                ]}
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
                          let stt = 0
                          const excel = new Excel();
                          const sheet = excel.addSheet("Sheet1")
                          sheet.setTHeadStyle({ background: 'FFFFFFFF', borderColor: 'C0C0C0C0', wrapText: false, fontName: 'Calibri' })
                          sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' })
                          sheet.setRowHeight(0.8, 'cm')
                          sheet.addColumns([
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: 'DANH SÁCH SẢN PHẨM', dataIndex: '' },
                          ]);
                          sheet.addRow();
                          sheet.addColumns([
                            { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'supplierId')
                                ? `${supplierAdminFacade.result?.data?.find((item) => {
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
                              status: item.approveStatus,
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
                      approveStatus: getFilter(productFacade.queryParams, 'approveStatus'),
                    }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          col: 6,
                          type: 'select',
                          list: listSupplierAdmin?.map((item) => ({
                            label: item.name,
                            value: item.id!
                          })),
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
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
                      {
                        title: '',
                        name: 'approveStatus',
                        formItem: {
                          placeholder: 'placeholder.status',
                          col: 3,
                          type: 'select',
                          list: Listoption?.map((item) => ({
                            label: item.label,
                            value: item.value!,
                          })),
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                type: form.getFieldValue('type'),
                                approveStatus: value,
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
                  />
                )}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('Phê duyệt sản phẩm')} key="2" className="">
              <DataTable
                ref={dataTableRefProduct}
                facade={productFacade}
                defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'APPROVED' }, }}
                xScroll="1380px"
                className=" bg-white p-5 rounded-lg form-store-tab3 form-supplier-index"
                onRow={(data: any) => ({
                  onDoubleClick: () => navigate(`/${lang}${routerLinks('Supplier/Edit')}/${data.id}?tab=1`),
                })}
                showSearch={false}
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
                      width: 180,
                      sorter: true,
                      filter: { type: 'search' },
                    },
                  },
                  {
                    title: `product.Name`,
                    name: 'name',
                    tableItem: {
                      width: 200,
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
                        item?.category?.child
                          ? item?.category?.child?.child?.name || item?.category?.child?.name
                          : item?.category?.name,
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.PriceBalance',
                    name: 'productPrice',
                    tableItem: {
                      render: (value: any, item: any) => item?.productPrice[0]?.price.toLocaleString(),
                    },
                  },
                  {
                    title: `product.Status`,
                    name: 'approveStatus',
                    tableItem: {
                      width: 160,
                      align: 'center',
                      render: (text: string) =>
                        text == 'APPROVED' ? (
                          <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                            {t('merchant.APPROVED')}
                          </div>
                        ) : text == 'WAITING_APPROVE' ? (
                          <div className="bg-yellow-100 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                            {t('merchant.WAITING_APPROVE')}
                          </div>
                        ) : text == 'REJECTED' ? (
                          <div className="bg-blue-100 text-center p-1 border border-blue-500 text-blue-600 rounded">
                            {t('merchant.REJECTED')}
                          </div>
                        ) : text == 'OUT_OF_STOCK' ? (
                          <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                            {t('merchant.OUT_OF_STOCK')}
                          </div>
                        ) : text == 'STOP_SELLING' ? (
                          <div className="bg-gray-100 text-center p-1 border border-black text-black rounded">
                            {t('merchant.STOP_SELLING')}
                          </div>
                        ) : (
                          <div className="bg-gray-100 text-center p-1 border border-black text-black rounded">
                            {t('merchant.CANCELLED')}
                          </div>
                        ),
                    },
                  },
                ]}
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
                          let stt = 0
                          const excel = new Excel();
                          const sheet = excel.addSheet("Sheet1")
                          sheet.setTHeadStyle({ background: 'FFFFFFFF', borderColor: 'C0C0C0C0', wrapText: false, fontName: 'Calibri' })
                          sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' })
                          sheet.setRowHeight(0.8, 'cm')
                          sheet.addColumns([
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: '', dataIndex: '' },
                            { title: 'DANH SÁCH SẢN PHẨM', dataIndex: '' },
                          ]);
                          sheet.addRow();
                          sheet.addColumns([
                            { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                            {
                              title: getFilter(productFacade.queryParams, 'supplierId')
                                ? `${supplierAdminFacade.result?.data?.find((item) => {
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
                              status: item.approveStatus,
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
                      approveStatus: getFilter(productFacade.queryParams, 'approveStatus'),
                    }}
                    columns={[
                      {
                        title: '',
                        name: 'supplierName',
                        formItem: {
                          placeholder: 'placeholder.Choose a supplier',
                          col: 6,
                          type: 'select',
                          list: listSupplierAdmin?.map((item) => ({
                            label: item.name,
                            value: item.id!
                          })),
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
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
                      {
                        title: '',
                        name: 'approveStatus',
                        formItem: {
                          placeholder: 'placeholder.status',
                          col: 3,
                          type: 'select',
                          list: Listoption?.map((item) => ({
                            label: item.label,
                            value: item.value!,
                          })),
                          onChange(value, form) {
                            dataTableRefProduct?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                type: form.getFieldValue('type'),
                                approveStatus: value,
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
                  />
                )}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
