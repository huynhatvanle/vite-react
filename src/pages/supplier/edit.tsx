import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import classNames from 'classnames';
import { ColumnFormSupplier, ColumnFormSupplierDetail, ColumnTableSupplierDiscount, ColumnTableSupplierOrder, ColumnTableSupplierProduct } from './column';
import { Supplier, SupplierFacade } from '@store/supplier';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';
import { routerLinks } from '@utils';
import { CategoryFacade, GlobalFacade, ProductFacade, OrdersFacade, DiscountFacade, inventoryOrdersFacade } from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { ProvinceFacade } from '@store/address/province';
import { Download } from '@svgs';
import { Tabs } from 'antd';

const Page = () => {
  const { t } = useTranslation();

  const provinceFacade = ProvinceFacade()
  const { result } = provinceFacade;
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const { user } = GlobalFacade();
  const dataTableRef = useRef<TableRefObject>(null);

  const productFacade = ProductFacade();
  const ordersFacade = OrdersFacade();
  const discountFacade = DiscountFacade();
  const inventoryOrders = inventoryOrdersFacade();


  useEffect(() => {
    if (!result?.data) provinceFacade.get({})

    if (id) supplierFacade.getById({ id });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id, data]);
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        navigate(routerLinks('Supplier'))
        break;
    }
  }, [status]);


  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: Supplier) => {
    supplierFacade.put({ ...values, id });
  };

  return (
    <div className={'w-full'}>
      <Fragment>
      <div className=''>
          <Tabs defaultActiveKey='1' type='card' size='large' className=''>
            <Tabs.TabPane tab='Thông tin nhà cung cấp' key='1' className='bg-white rounded-xl rounded-tl-none'>
              <div className='px-5'>
              <Form
              // provinceId: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
                values={{ ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
                  nameContact: data?.userRole?.[0].userAdmin.name, emailContact: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber  }}
                className="intro-x pt-6 rounded-lg w-full"
                columns={ColumnFormSupplierDetail({ t })}
                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Danh sách hàng hóa' key='2' className='rounded-xl'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pb-4'>
                  <DataTable
                  facade={productFacade}
                  defaultRequest={{page: 1, perPage: 10, supplierId: id,type: "BALANCE"}}
                  
                  xScroll = '895px'
                  pageSizeRender={(sizePage: number) => sizePage}
                  pageSizeWidth={'50px'}
                  paginationDescription={(from: number, to: number, total: number) =>
                    t('routes.admin.Layout.Pagination', { from, to, total })
                  }
                  columns={ColumnTableSupplierProduct({
                    t,
                    navigate,
                    dataTableRef,
                  })}
                  rightHeader={
                    <div className={'flex h-10 w-36 mt-6'}>
                      {
                        <Button
                          className='!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                          icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                          text={t('Xuất file excel')}
                          onClick={() => navigate(routerLinks('Supplier/Excel'))}
                        />
                      }
                    </div>
                  }
                  leftHeader={
                    <Form
                      className="intro-x pt-6 rounded-lg w-full "
                      columns={
                        [
                          {
                            title: '',
                            name: 'cap1',
                            formItem: {
                              tabIndex: 3,
                              placeholder: 'Danh mục chính',
                              col: 3,
                              type: 'select',
                              get: {
                                facade: CategoryFacade,
                                format: (item: any) => ({
                                  label: item.name,
                                  value: item.id,
                                }),
                              },
                              onChange(value, form) {
                                form.resetFields(['cap2', 'cap3'])
                              },
                            },
                          },
                          {
                            name: 'cap2',
                            title: '',
                            formItem: {
                              disabled:() => true,
                              placeholder: 'Danh mục cấp 1',
                              type: 'select',
                              col: 3,
                              get: {
                                facade: CategoryFacade,
                                format: (item: any) => ({
                                  label: item.name,
                                  value: item.id,
                                }),
                                params: (fullTextSearch, value) => ({
                                  fullTextSearch,
                                  id: value().cap1,
                                }),
                              },
                              onChange(value, form) {
                                form.resetFields(['cap3'])
                              },
                            },
                          },
                          {
                            name: 'cap3',
                            title: '',
                            formItem: {
                              disabled:() => true,
                              placeholder: 'Danh mục cấp 2',
                              type: 'select',
                              col: 3,
                              get: {
                                facade: CategoryFacade,
                                format: (item: any) => ({
                                  label: item.name,
                                  value: item.id,
                                }),
                                params: (fullTextSearch, value) => ({
                                  fullTextSearch,
                                  id: value().cap2,
                                })
                              }
                            },
                          },
                        ]
                      }
                      handSubmit={handleSubmit}
                      disableSubmit={isLoading}
                    />
                  }
                  showSearch={false}
                  />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý đơn hàng' key='3' className='rounded-xl'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                  facade={ordersFacade}
                  defaultRequest={{page: 1, perPage: 10, filterSupplier: id}}
                  xScroll = '1400px'
                  pageSizeRender={(sizePage: number) => sizePage}
                  pageSizeWidth={'50px'}
                  paginationDescription={(from: number, to: number, total: number) =>
                    t('routes.admin.Layout.Pagination', { from, to, total })
                  }
                  columns={[
                    {
                      title: t(`Mã đơn hàng`),
                      name: 'code',
                      tableItem: {
                        width: 280,

                      },
                    },
                    {
                      title: t(`Tên cửa hàng`),
                      name: 'name',
                      tableItem: {
                        width: 180,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Người nhận`),
                      name: ('address'),
                      tableItem: {
                        width: 180,
                        render: (value: any,item: any) => item?.storeAdmin?.name,
                      }
                    },
                    {
                      title: t(`Địa chỉ nhận hàng`),
                      name: 'contract',
                      tableItem: {
                        width: 300  ,
                        render: (value: any,item: any) => item?.store?.address?.street + ', ' + item?.store?.address?.ward?.name + ', ' + item?.store?.address?.district?.name + ', ' + item?.store?.address?.province?.name,
                      },
                    },
                    {
                      title: t(`Tổng tiền (VND)`),
                      name: 'total',
                      tableItem: {
                        width: 150,
                        render: (value: any,item: any) => item?.total.toLocaleString(),
                      },
                    },
                    {
                      title: t(`Ngày đặt`),
                      name: 'createdAt',
                      tableItem: {
                        width: 150,
                      },
                    },
                    {
                      title: t(`supplier.Status`),
                      name: "isActive",
                      tableItem: {
                        width: 180,
                        align: 'center',
                        render: (item: any) => !item?.isApplyTax
                        ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã giao</div>)
                        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Đang giao</div>),
                      },
                    },
                  ]}
                />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Doanh thu' key='4' className='rounded-xl bg-white'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                  facade={inventoryOrders}
                  defaultRequest={{page: 1, perPage: 10, idSuppiler: id}}
                  xScroll = '1400px'
                  pageSizeRender={(sizePage: number) => sizePage}
                  pageSizeWidth={'50px'}
                  paginationDescription={(from: number, to: number, total: number) =>
                    t('routes.admin.Layout.Pagination', { from, to, total })
                  }
                  rightHeader={
                    <div className='flex items-end justify-between'>
                      <Form
                        className="intro-x items-end rounded-lg w-full flex justify-between"
                        columns={
                          [
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (<div className='flex h-10 items-center'><p></p></div>)
                              },
                            },
                            {
                              title: '',
                              name: 'Category',
                              formItem: {
                                tabIndex: 3,
                                placeholder: 'Chọn loại đơn hàng',
                                col: 5,
                                type: 'select',
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                                onChange(value, form) {
                                  form.resetFields(['cap2', 'cap3'])
                                },
                              },
                            },
                            {
                              name: 'Store',
                              title: '',  
                              formItem: {
                                // disabled:() => true,
                                placeholder: 'Chọn cửa hàng',
                                type: 'select',
                                col: 5,
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                  params: (fullTextSearch, value) => ({
                                    fullTextSearch,
                                    code: value().id,
                                  }),
                                },
                                onChange(value, form) {
                                  form.resetFields(['cap2'])
                                },
                              },
                            },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (<div className='flex h-10 items-center'><p>Từ Ngày</p></div>)
                              },
                            },
                            {
                              title: '',
                              name: 'StartDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                              },
                            },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (<div className='flex h-10 items-center'><p>Đến ngày</p></div>)
                              },
                            },
                            {
                              title: '',
                              name: 'EndDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                              },
                            },
                          ]
                        }
                        // handSubmit={handleSubmit}
                        disableSubmit={isLoading}
                      />
                    </div>
                  }
                  searchPlaceholder='Tìm kiếm theo mã đơn hàng'
                  columns={[
                    {
                      title: t(`STT`),
                      name: 'code',
                      tableItem: {
                        width: 70,
                      
                      },
                    },
                    {
                      title: t(`Mã đơn hàng`),
                      name: 'code',
                      tableItem: {
                        width: 175,
                      
                      },
                    },
                    {
                      title: t(`Tên cửa hàng`),
                      name: 'name',
                      tableItem: {
                        width: 180,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Ngày đặt`),
                      name: 'name',
                      tableItem: {
                        width: 135,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Ngày nhận`),
                      name: ('address'),
                      tableItem: {
                        width: 150,
                        render: (value: any,item: any) => item?.storeAdmin?.name,
                      }
                    },
                    {
                      title: t(`Trước thuế`),
                      name: 'name',
                      tableItem: {
                        width: 145,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Sau thuế`),
                      name: 'name',
                      tableItem: {
                        width: 130,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Khuyến mãi`),
                      name: 'name',
                      tableItem: {
                        width: 160,
                        render: (value: any,item: any) => item?.store?.name,
                      },
                    },
                    {
                      title: t(`Thành tiền`),
                      name: 'total',
                      tableItem: {
                        width: 145  ,
                        render: (value: any,item: any) => item?.store?.address?.street + ', ' + item?.store?.address?.ward?.name + ', ' + item?.store?.address?.district?.name + ', ' + item?.store?.address?.province?.name,
                      },
                    },
                    {
                      title: t(`Loại đơn`),
                      name: 'total',
                      tableItem: {
                        width: 100,
                        render: (value: any,item: any) => item?.total.toLocaleString(),
                      },
                    },
                  ]}
                  />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Chiết khấu' key='5' className='rounded-xl'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                    facade={discountFacade}
                    
                    defaultRequest={{page: 1, perPage: 10}}
                    xScroll = '1370px'
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={ColumnTableSupplierDiscount({
                      t,
                      navigate,
                      dataTableRef,
                    })}
                    showSearch={false}
                    rightHeader={
                      <div className={'flex h-10 w-36'}>
                        {user && (
                          <Button
                            className='!bg-white flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                            icon={<Download className="icon-cud !h-6 !w-6 !fill-gray-600 group-hover:!fill-white" />}
                            text={t('Xuất file excel')}
                            onClick={() => navigate(routerLinks('Supplier/Excel'))}
                          />
                        )}
                      </div>
                    }
                  />
                </div>
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Hợp đồng' key='6' className='rounded-xl'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                    facade={discountFacade}
                    
                    defaultRequest={{page: 1, perPage: 10}}
                    xScroll = '1370px'
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={ColumnTableSupplierDiscount({
                      t,
                      navigate,
                      dataTableRef,
                    })}
                    showSearch={false}
                    rightHeader={
                      <div className={'flex h-10 w-36'}>
                        {user && (
                          <Button
                            className='!bg-white flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                            icon={<Download className="icon-cud !h-6 !w-6 !fill-gray-600 group-hover:!fill-white" />}
                            text={t('Xuất file excel')}
                            onClick={() => navigate(routerLinks('Supplier/Excel'))}
                          />
                        )}
                      </div>
                    }
                  />
                </div>
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
        {/* <div className='flex'>
          <div className='flex overflow-hidden whitespace-nowrap cursor-pointer select-none'>
            {test.map((e) => (
              <div onClick={() => setTab(e.tab)} className={classNames(
              { 'bg-white text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab === e.tab,
                'bg-gray-100 text-xl text-teal-900 px-5 py-4 font-bold rounded-t-xl' : tab !== e.tab})}>
              {e.title}
            </div>
            ))}
          </div>
          <div className='xl:hidden flex justify-center text-center'>
            <button className='py-2 px-4 cursor-pointer h-full border-l-2 border-l-gray-200 text-xl'>
              ...
            </button>
          </div>
        </div>
        <div className='bg-white px-5 rounded-xl rounded-tl-none'>

        {tab === 'tab1' && (
            <Form
              key={'tab1'}
              values={{ ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
              username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber  }}
              className="intro-x pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || []})}
              // handSubmit={handleSubmit}
              disableSubmit={isLoading}
              extendButton={() => (
                    <div className='w-full flex mt-8 justify-between'>
                      <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                      onClick={handleBack}>
                        {t('components.form.modal.cancel')}
                      </button>
                      <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                      onClick={handleSubmit}>
                        {t('components.form.modal.save')}
                      </button>
                    </div>
                  )}
            />
          )
        }
        {tab === 'tab2' && (
          <div className={'w-full mx-auto bg-white rounded-xl'}>
            <div className='px-1 pt-6 pb-4'>
              <DataTable
              facade={productFacade}
              defaultRequest={{page: 1, perPage: 10, supplierId: id,type: "BALANCE"}}
              
              xScroll = '895px'
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={ColumnTableSupplierProduct({
                t,
                navigate,
                dataTableRef,
              })}
              rightHeader={
                <div className={'flex h-10 w-36'}>
                  {
                    <Button
                      className='!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                      icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                      text={t('Xuất file excel')}
                      onClick={() => navigate(routerLinks('Supplier/Excel'))}
                    />
                  }
                </div>
              }
              showSearch={false}
              />
            </div>
          </div>)
        }
        {tab === 'tab3' && (
          <div className={'w-full mx-auto bg-white rounded-xl'}>
            <div className='px-1 pt-6 pb-4'>
              <DataTable
              facade={ordersFacade}
              
              defaultRequest={{page: 1, perPage: 10, filterSupplier: id}}
              xScroll = '1400px'
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={[
                {
                  title: t(`Mã đơn hàng`),
                  name: 'code',
                  tableItem: {
                    width: 280,

                  },
                },
                {
                  title: t(`Tên cửa hàng`),
                  name: 'name',
                  tableItem: {
                    width: 180,
                    render: (value: any,item: any) => item?.store?.name,
                  },
                },
                {
                  title: t(`Người nhận`),
                  name: ('address'),
                  tableItem: {
                    width: 180,
                    render: (value: any,item: any) => item?.storeAdmin?.name,
                  }
                },
                {
                  title: t(`Địa chỉ nhận hàng`),
                  name: 'contract',
                  tableItem: {
                    width: 300  ,
                    render: (value: any,item: any) => item?.store?.address?.street + ', ' + item?.store?.address?.ward?.name + ', ' + item?.store?.address?.district?.name + ', ' + item?.store?.address?.province?.name,
                  },
                },
                {
                  title: t(`Tổng tiền (VND)`),
                  name: 'total',
                  tableItem: {
                    width: 150,
                    render: (value: any,item: any) => item?.total.toLocaleString(),
                  },
                },
                {
                  title: t(`Ngày đặt`),
                  name: 'createdAt',
                  tableItem: {
                    width: 150,
                  },
                },
                {
                  title: t(`supplier.Status`),
                  name: "isActive",
                  tableItem: {
                    width: 180,
                    align: 'center',
                    render: (item: any) => !item?.isApplyTax
                    ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã giao</div>)
                    : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Đang giao</div>),
                  },
                },
              ]}
            />
            </div>
          </div>
          )
        }
        {tab === 'tab4' && (
            <Form
              values={{ ...data, street: data?.address?.street, province: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
              username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber  }}
              className="intro-x pt-6 rounded-lg w-full "
              columns={ColumnFormSupplierDetail({ t, listRole: result?.data || []})}
              // handSubmit={handleSubmit}
              disableSubmit={isLoading}
              extendButton={() => (
                    <div className='w-full flex mt-8 justify-between'>
                      <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
                      onClick={handleBack}>
                        {t('components.form.modal.cancel')}
                      </button>
                      <button className='sm:w-44 h-11 rounded-xl text-white bg-teal-900 hover:bg-teal-600'
                      onClick={handleSubmit}>
                        {t('components.form.modal.save')}
                      </button>
                    </div>
                  )}
            />
          )
        }
        {tab === 'tab5' && (
          <div className={'w-full mx-auto bg-white rounded-xl'}>
            <div className='px-1 pt-6 pb-4'>
              <DataTable
                facade={discountFacade}
                
                defaultRequest={{page: 1, perPage: 10}}
                xScroll = '1370px'
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.Pagination', { from, to, total })
                }
                columns={ColumnTableSupplierDiscount({
                  t,
                  navigate,
                  dataTableRef,
                })}
                showSearch={false}
                rightHeader={
                  <div className={'flex h-10 w-36'}>
                    {user && (
                      <Button
                        className='!bg-white flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group'
                        icon={<Download className="icon-cud !h-6 !w-6 !fill-gray-600 group-hover:!fill-white" />}
                        text={t('Xuất file excel')}
                        onClick={() => navigate(routerLinks('Supplier/Excel'))}
                      />
                    )}
                  </div>
                }
              />
            </div>
          </div>
          )
        }
        </div>
        { tab !== 'tab1' && tab !== 'tab6' && tab !== 'tab4' && (
          <div className='w-full flex mt-8 justify-between'>
          <button className='sm:w-28 h-11 rounded-xl bg-white hover:text-teal-700 text-teal-900 border-teal-900 hover:border-teal-600 border'
          onClick={handleBack}>
            {t('components.form.modal.cancel')}
          </button>
        </div>
        )}
        <div className='h-20'>
        </div> */}
      </Fragment>
    </div>
    // <div className={'max-w-7xl mx-auto'}>
    //   <div className=' pr-5 h-full pb-10'>
    //     <div className='bg-white rounded-xl px-4 relative text-center '>
    //       <div>
    //         <p className='text-xl text-left font-bold text-teal-900 py-5'>
    //           Thông tin nhà cung cấp
    //         </p>
    //       </div>
    //       {!!result?.data && (
    //         <div>
    //           <Form
    //             values={{ ...data }}
    //             className="intro-x"
    //             columns={ColumnFormSupplierDetail({ t, listRole: result?.data || [] })}
    //             disableSubmit={isLoading}
    //             extendButton={() => (
    //               <div className='max-w-7xl flex items-center absolute -right-4 -left-4 justify-between mt-4'>
    //                 <button className={'text-teal-900 bg-white border-solid border border-teal-900 rounded-xl p-2 w-auto h-11 px-8'}
    //                 onClick={handleBack}>
    //                   {t('Trở về')}
    //                 </button>
    //                 <button className={'text-white bg-teal-900 border-solid border rounded-xl p-2 w-auto h-11 px-8'}
    //                 onClick={() => handleSubmit}>
    //                   {t('Lưu')}
    //                 </button>
    //               </div>
    //              )}
    //           />
    //         </div>
    //       )}
    //     </div>
    //   </div>
    // </div>
  );
};
export default Page;
