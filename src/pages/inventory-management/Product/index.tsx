import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { CategoryFacade, ProductFacade, SupplierFacade, SupplierAdminFacade, notApprovedFacade } from '@store';
import { TableRefObject } from '@models';
import { DataTable } from '@core/data-table';
import { routerLinks, languages, language, getFilter } from '@utils';
import { Form } from '@core/form';
import { Form as AntForm, Tabs } from 'antd';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const { id } = useParams();
  const notapprovedFacade = notApprovedFacade();
  const productFacade = ProductFacade();
  const supplierAdminFacade = SupplierAdminFacade()
  const categoryFacade = CategoryFacade()

  const dataTableRef = useRef<TableRefObject>(null);
  const dataTableRefProduct = useRef<TableRefObject>(null);

  const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeInventoryTab') || 'tab');
  const { isLoading, queryParams } = productFacade;

  const onChangeTab = (key: string) => {
    setActiveKey(key);
    localStorage.setItem('activeInventoryTab', key);

    if (key == '1') {
      supplierAdminFacade.get({
        type: 'BALANCE',
      })
      dataTableRef?.current?.onChange({
        page: 1,
        perPage: 10,
        filter: { type: 'BALANCE', approveStatus: 'APPROVED' }
      });
    }

    if (key == '2') {
      productFacade.getproduct();
      supplierAdminFacade.get({
        type: 'BALANCE',
      })
      notapprovedFacade.getproduct({
        page: 1,
        perPage: 10,
        filter: {
          type: 'BALANCE',
          categoryId: '',
          supplierId: ''
        },
      });
    }

    navigate(`/${lang}${routerLinks('inventory-management/product')}?tab=${key}`);
  };

  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const urlParams = new URLSearchParams(window.location.search);
  const tab = urlParams.get('tab');
  const listSupplierStore = supplierAdminFacade.result?.data
  const listSupplierAdmin = productFacade?.user

  const category1 = categoryFacade.result?.data
  const category2 = categoryFacade.result2?.data
  const category3 = categoryFacade.result3?.data

  const [categoryId1, setCategoryId1] = useState('')
  const [categoryId2, setCategoryId2] = useState('')

  const [forms] = AntForm.useForm();
  const [formsproduct] = AntForm.useForm();
  console.log(productFacade)

  useEffect(() => {
    categoryFacade.get({});
    supplierAdminFacade.get({
      type: 'BALANCE',
    })

    if (activeKey == '2') {
      notapprovedFacade.getproduct({
        page: 1,
        perPage: 10,
        filter: {
          type: 'BALANCE',
          categoryId: '',
          supplierId: ''
        },
      });
    }
  }, [activeKey])

  useEffect(() => {
    if (tab) {
      setActiveKey(tab);
    }
  }, [tab]);

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


  const listOption = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Đang bán', value: 'APPROVED' },
    { label: 'Chờ xác nhận', value: 'WAITING_APPROVE' },
    { label: 'Từ chối', value: 'REJECTED' },
    { label: 'Hết hàng', value: 'OUT_OF_STOCK' },
    { label: 'Ngừng bán', value: 'STOP_SELLING' },
    { label: 'Đã hủy', value: 'CANCELLED' },
  ];

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
              defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'APPROVED' } }}
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
                  formAnt={forms}
                  className="intro-x rounded-lg w-full form-store"
                  values={{
                    supplierName: getFilter(productFacade.queryParams, 'supplierId'),
                    categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                    categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                    categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                    type: getFilter(productFacade.queryParams, 'type'),
                    approveStatus: getFilter(productFacade.queryParams, 'approveStatus'),
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
                          dataTableRef?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: {
                              storeId: id,
                              type: form.getFieldValue('type'),
                              supplierId: value,
                              categoryId1: form.getFieldValue('categoryId1'),
                              categoryId2: form.getFieldValue('categoryId2'),
                              categoryId3: form.getFieldValue('categoryId3'),
                              approveStatus: form.getFieldValue('approveStatus'),
                            },
                          });
                        },
                      },
                    },
                    {
                      title: '',
                      name: 'approveStatus',
                      formItem: {
                        col: 5,
                        type: 'select',
                        list: listOption?.map((item) => ({
                          label: item.label,
                          value: item.value!
                        })),
                        onChange(value, form) {
                          dataTableRef?.current?.onChange({
                            page: 1,
                            perPage: 10,
                            filter: {
                              type: form.getFieldValue('type'),
                              approveStatus: value,
                              storeId: id,
                              supplierId: form.getFieldValue('supplierName'),
                              categoryId1: form.getFieldValue('categoryId1'),
                              categoryId2: form.getFieldValue('categoryId2'),
                              categoryId3: form.getFieldValue('categoryId3'),
                            },
                          });
                        },

                      },
                    },
                  ]}
                />
              }
              subHeader={() => (
                <div className="flex flex-col-reverse lg:flex-row">
                  <Form
                    className="intro-x rounded-lg w-full form-store form-header-category col-supplier"
                    values={{
                      categoryId1: getFilter(productFacade.queryParams, 'supplierId'),
                      categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                      categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                      //supplierName: getFilter(productFacade.queryParams, 'supplierId'),
                      // categoryId1: getFilter(productFacade.queryParams, 'categoryId1'),
                      // categoryId2: getFilter(productFacade.queryParams, 'categoryId2'),
                      // categoryId3: getFilter(productFacade.queryParams, 'categoryId3'),
                      //type: getFilter(productFacade.queryParams, 'type'),
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
                            dataTableRef?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                storeId: id,
                                //type: form.getFieldValue('type'),
                                supplierId: forms.getFieldValue('supplierName'),
                                //categoryId1: form.getFieldValue('categoryId1'),
                                categoryId2: form.getFieldValue('categoryId2'),
                                categoryId3: form.getFieldValue('categoryId3'),
                                approveStatus: forms.getFieldValue('approveStatus'),
                                type: 'BALANCE',
                                categoryId1: value ? value : '',
                                //supplierId: id,
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
                            dataTableRef?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                //supplierId: id,
                                type: 'BALANCE',
                                categoryId2: value ? value : '',
                                categoryId1: form.getFieldValue('categoryId1'),

                                storeId: id,
                                //type: form.getFieldValue('type'),
                                supplierId: forms.getFieldValue('supplierName'),
                                //categoryId1: form.getFieldValue('categoryId1'),
                                //categoryId2: form.getFieldValue('categoryId2'),
                                categoryId3: form.getFieldValue('categoryId3'),
                                approveStatus: forms.getFieldValue('approveStatus'),
                                //type: 'BALANCE',
                                //categoryId1: value ? value : '',
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
                            dataTableRef?.current?.onChange({
                              page: 1,
                              perPage: 10,
                              filter: {
                                //supplierId: id,
                                type: 'BALANCE',
                                categoryId3: value ? value : '',
                                categoryId1: form.getFieldValue('categoryId1'),
                                categoryId2: form.getFieldValue('categoryId2'),

                                storeId: id,
                                //type: form.getFieldValue('type'),
                                supplierId: forms.getFieldValue('supplierName'),
                                //categoryId1: form.getFieldValue('categoryId1'),
                                //categoryId2: form.getFieldValue('categoryId2'),
                                //categoryId3: form.getFieldValue('categoryId3'),
                                approveStatus: forms.getFieldValue('approveStatus'),
                                //type: 'BALANCE',
                                //categoryId1: value ? value : '',
                              },
                            });
                          },
                        },
                      },
                    ]}
                    disableSubmit={isLoading}
                  />

                </div>
              )}
            />
          </Tabs.TabPane>

          <Tabs.TabPane tab={'Phê duyệt sản phẩm'} key="2" className="">
            <DataTable
              facade={notapprovedFacade}
              ref={dataTableRefProduct}
              onRow={(data: any) => ({
                onDoubleClick: () => {
                  navigate(`/${lang}${routerLinks('store-managerment/branch-management/edit')}/${data.id}`);
                },
              })}
              //defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'WAITING_APPROVE' } }}
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
                  name: 'productCategory',
                  tableItem: {
                    render: (value: any, item: any) => item.productCategory[0]?.category?.name,
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
                  formAnt={formsproduct}
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
                        list: listSupplierAdmin?.map((item) => ({
                          label: item.name,
                          value: item.id!
                        })),
                        onChange(value, form) {
                          // categoryFacade.getinven({
                          //   subOrgId: value,
                          // }),
                          notapprovedFacade.getproduct({
                            page: 1,
                            perPage: 10,
                            filter: {
                              type: 'BALANCE',
                              categoryId: formsproduct.getFieldValue('categoryId1'),
                              supplierId: value
                            },
                          });
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
                        list: category1?.map((item) => ({
                          label: item?.name!,
                          value: item?.id!
                        })),
                        onChange(value, form) {
                          setCategoryId1(value)
                          setCategoryId2('')
                          form.resetFields(['categoryId2', 'categoryId3']);                          
                          notapprovedFacade.getproduct({
                            page: 1,
                            perPage: 10,
                            filter: {
                              type: 'BALANCE',
                              categoryId: value,
                              supplierId: formsproduct.getFieldValue('supplierName'),
                              categoryId1: form.getFieldValue('categoryId1'),
                              categoryId2: form.getFieldValue('categoryId2'),
                              categoryId3: form.getFieldValue('categoryId3'),
                            },
                          });
                          // dataTableRefProduct?.current?.onChange({
                          //   page: 1,
                          //   perPage: 10,
                          //   filter: {
                          //     storeId: id,
                          //     type: form.getFieldValue('type'),
                          //     supplierId: formsproduct.getFieldValue('supplierName'),
                          //     categoryId1: value, 
                          //   },
                          // });
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
                          notapprovedFacade.getproduct({
                            page: 1,
                            perPage: 10,
                            filter: {
                              type: 'BALANCE',
                              categoryId: value,
                              supplierId: formsproduct.getFieldValue('supplierName'),
                              categoryId1: form.getFieldValue('categoryId1'),
                              categoryId2: form.getFieldValue('categoryId2'),
                              categoryId3: form.getFieldValue('categoryId3'),
                            },
                          });
                          // dataTableRefProduct?.current?.onChange({
                          //   page: 1,
                          //   perPage: 10,
                          //   filter: {
                          //     storeId: id,
                          //     type: form.getFieldValue('type'),
                          //     supplierId: form.getFieldValue('supplierName'),
                          //     categoryId2: value,
                          //     categoryId1: form.getFieldValue('categoryId1'),
                          //   },
                          // });
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
                          notapprovedFacade.getproduct({
                            page: 1,
                            perPage: 10,
                            filter: {
                              type: 'BALANCE',
                              categoryId: value,
                              supplierId: formsproduct.getFieldValue('supplierName'),
                              categoryId1: form.getFieldValue('categoryId1'),
                              categoryId2: form.getFieldValue('categoryId2'),
                              categoryId3: form.getFieldValue('categoryId3'),
                            },
                          });
                          // dataTableRefProduct?.current?.onChange({
                          //   page: 1,
                          //   perPage: 10,
                          //   filter: {
                          //     storeId: id,
                          //     type: form.getFieldValue('type'),
                          //     supplierId: form.getFieldValue('supplierName'),
                          //     categoryId3: value,
                          //     categoryId1: form.getFieldValue('categoryId1'),
                          //     categoryId2: form.getFieldValue('categoryId2'),
                          //   },
                          // });
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
