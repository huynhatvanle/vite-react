import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { CategoryFacade, ProductFacade, SupplierStoreFacade } from '@store';
import { TableRefObject } from '@models';
import { DataTable } from '@core/data-table';
import { routerLinks, languages, language, getFilter } from '@utils';
import { Tabs } from 'antd';
import { Form } from '@core/form';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const productFacade = ProductFacade();
  const supplierStoreFacade = SupplierStoreFacade()
  const categoryFacade = CategoryFacade()
  const dataTableRef = useRef<TableRefObject>(null);
  const dataTableRefProduct = useRef<TableRefObject>(null);
  const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeInventoryTab') || 'tab');
  const { id } = useParams();

  const onChangeTab = (key: string) => {
    setActiveKey(key);
    localStorage.setItem('activeInventoryTab', key);

    navigate(`/${lang}${routerLinks('inventory-management/product')}?tab=${key}`);
  };

  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  const listSupplierStore = supplierStoreFacade.result?.data
  console.log(supplierStoreFacade)
  const category1 = categoryFacade.result?.data
  const category2 = categoryFacade.result2?.data
  const category3 = categoryFacade.result3?.data
  const [categoryId1, setCategoryId1] = useState('')
  const [categoryId2, setCategoryId2] = useState('')

  useEffect(() => {
    if (activeKey == '2' ) {
        productFacade.get({
        filter: { type: 'BALANCE', approveStatus: 'ALL' },
        type: 'BALANCE', 
        approveStatus: 'WAITING_APPROVE'
      })
    }
  }, [activeKey])
  
  useEffect(() => {
    if (tab) {
      setActiveKey(tab);
    }
    // else {
    //   setActiveKey('1');
    // }
  }, []);

  return (
    <div className="w-full">
      <Fragment>
        <Tabs
          defaultActiveKey="1"
          type="card"
          size="large"
          activeKey={activeKey}
          onTabClick={(key: string) => {
            //setDate(false)
            onChangeTab(key);
          }}
        >
          <Tabs.TabPane tab={'Danh sách sản phẩm'} key="1" className="">
            <DataTable
              facade={productFacade}
              ref={dataTableRef}
              onRow={(data: any) => ({
                onDoubleClick: () => {
                  navigate(`/${lang}${routerLinks('store-managerment/branch-management/edit')}/${data.id}`);
                },
              })}
              defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'ALL' } }}
              xScroll="1270px"
              className=" bg-white p-5 rounded-lg form-store form-store-tab3 form-supplier-index"
              showSearch={false}
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.PaginationSubStore', { from, to, total })
              }
              columns={[
                {
                  title: 'product.Code',
                  name: 'code',
                  tableItem: {
                    width: 120,
                  },
                },
                {
                  title: 'product.Name',
                  name: 'name',
                  tableItem: {},
                },
                {
                  title: 'product.Category',
                  name: 'category.name',
                  tableItem: {
                    render: (value: any, item: any) => item.category?.name,
                  },
                },
                {
                  title: 'product.SupplierName',
                  name: 'subOrg.name',
                  tableItem: {
                    render: (value: any, item: any) => item.subOrg?.name,
                  },
                },
                {
                  title: 'product.PriceBalance',
                  name: 'productPrice.price',
                  tableItem: {
                    render: (value: any, item: any) => item.productPrice[0]?.price.toLocaleString(),
                  },
                },
                {
                  title: 'product.status',
                  name: 'approveStatus',
                  tableItem: {
                    render: (text: string) =>
                      text == 'APPROVED' ? (
                        <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                          {t('supplier.status.on sale')}
                        </div>
                      ) : text == 'WAITING_APPROVE' ? (
                        <div className="bg-yellow-100 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                          {t('supplier.status.wait for confirmation')}
                        </div>
                      ) : text == 'REJECTED' ? (
                        <div className="bg-purple-100 text-center p-1 border border-purple-500 text-purple-600 rounded">
                          {t('supplier.status.decline')}
                        </div>
                      ) : text == 'OUT_OF_STOCK' ? (
                        <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                          {t('supplier.status.out of stock')}
                        </div>
                      ) : text == 'STOP_SELLING' ? (
                        <div className=" text-center p-1 border border-black text-black rounded">
                          {t('supplier.status.stop selling')}
                        </div>
                      ) : (
                        <div className=" text-center p-1 border border-black text-black rounded">
                          {t('supplier.status.canceled')}
                        </div>
                      ),
                  },
                },
              ]}
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
                  //disableSubmit={isLoading}
                />
              )}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab={'Phê duyệt sản phẩm'} key="2" className="">
          <DataTable
              facade={productFacade}
              ref={dataTableRef}
              onRow={(data: any) => ({
                onDoubleClick: () => {
                  navigate(`/${lang}${routerLinks('store-managerment/branch-management/edit')}/${data.id}`);
                },
              })}
              defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'WAITING_APPROVE' } }}
              xScroll="1270px"
              className=" bg-white p-5 rounded-lg form-store form-store-tab3 form-supplier-index"
              showSearch={false}
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.PaginationSubStore', { from, to, total })
              }
              columns={[
                {
                  title: 'product.Code',
                  name: 'code',
                  tableItem: {
                    width: 120,
                  },
                },
                {
                  title: 'product.Name',
                  name: 'name',
                  tableItem: {},
                },
                {
                  title: 'product.Category',
                  name: 'category.name',
                  tableItem: {
                    render: (value: any, item: any) => item.category?.name,
                  },
                },
                {
                  title: 'product.SupplierName',
                  name: 'supplierName',
                  tableItem: {
                    //render: (value: any, item: any) => item.subOrg?.name,
                  },
                },
                {
                  title: 'product.status',
                  name: 'approveStatus',
                  tableItem: {
                    render: (text: string) =>
                      text == 'APPROVED' ? (
                        <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                          {t('supplier.status.on sale')}
                        </div>
                      ) : text == 'WAITING_APPROVE' ? (
                        <div className="bg-yellow-100 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                          {t('supplier.status.wait for confirmation')}
                        </div>
                      ) : text == 'REJECTED' ? (
                        <div className="bg-purple-100 text-center p-1 border border-purple-500 text-purple-600 rounded">
                          {t('supplier.status.decline')}
                        </div>
                      ) : text == 'OUT_OF_STOCK' ? (
                        <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                          {t('supplier.status.out of stock')}
                        </div>
                      ) : text == 'STOP_SELLING' ? (
                        <div className=" text-center p-1 border border-black text-black rounded">
                          {t('supplier.status.stop selling')}
                        </div>
                      ) : (
                        <div className=" text-center p-1 border border-black text-black rounded">
                          {t('supplier.status.canceled')}
                        </div>
                      ),
                  },
                },
              ]}
              
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
                  //disableSubmit={isLoading}
                />
              )}
            />
          </Tabs.TabPane>
        </Tabs>
      </Fragment>
    </div>
  );
};
export default Page;
