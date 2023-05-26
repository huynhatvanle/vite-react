import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Supplier, SupplierFacade } from '@store/supplier';
import { DistrictFacade } from '@store/address/district';
import { WardFacade } from '@store/address/ward';
import { routerLinks } from '@utils';
import {
  CategoryFacade,
  GlobalFacade,
  ProductFacade,
  OrdersFacade,
  DiscountFacade,
  inventoryOrdersFacade,
} from '@store';
import { TableRefObject } from '@models';
import { Form } from '@core/form';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { ProvinceFacade } from '@store/address/province';
import { DownArrow, Download } from '@svgs';
import { Avatar, Dropdown, Tabs } from 'antd';

const Page = () => {
  const { t } = useTranslation();

  const provinceFacade = ProvinceFacade();
  const { result } = provinceFacade;
  const supplierFacade = SupplierFacade();
  const { data, isLoading, queryParams, status } = supplierFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const [tab] = useState('tab1');
  const { user } = GlobalFacade();

  const productFacade = ProductFacade();
  const ordersFacade = OrdersFacade();
  const discountFacade = DiscountFacade();
  const inventoryOrders = inventoryOrdersFacade();

  useEffect(() => {
    if (!result?.data) provinceFacade.get({});

    if (id) supplierFacade.getById({ id });

    return () => {
      isReload.current && supplierFacade.get(param);
    };
  }, [id, data]);
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        navigate(routerLinks('Supplier'));
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
                  values={{
                    ...data, street: data?.address?.street, provinceId: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
                    username: data?.userRole?.[0].userAdmin.name, email: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber
                  }}
                  className="intro-x pt-6 rounded-lg w-full "
                  columns={[
                    {
                      title: 'supplier.SupplierCode',
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
                      title: 'supplier.Fax',
                      name: 'fax',
                      formItem: {
                        tabIndex: 2,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: '',
                      name: 'address',
                      formItem: {
                        rules: [{ type: 'required' }],
                        render() {
                          return (
                            <h3 className='mb-2.5 text-base '>Địa chỉ nhà cung cấp </h3>
                          )
                        },
                      }
                    },
                    {
                      title: 'supplier.ProvinceId',
                      name: 'provinceId',
                      formItem: {
                        tabIndex: 3,
                        col: 3,
                        type: 'select',
                        rules: [{ type: 'required', message: 'Xin vui lòng chọn tỉnh/thành phố' }],
                        get: {
                          facade: ProvinceFacade,
                          format: (item: any) => ({
                            label: item.name,
                            value: item.id + '|' + item.code,
                          }),
                        },
                        onChange(value, form) {
                          form.resetFields(['districtId', 'wardId'])
                        },
                      },
                    },
                    {
                      title: 'supplier.DistrictId',
                      name: 'districtId',
                      formItem: {
                        type: 'select',
                        rules: [{ type: 'required', message: 'Xin vui lòng chọn quận/huyện' }],
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
                          form.resetFields(['wardId'])
                        },
                      },
                    },
                    {
                      title: 'supplier.WardId',
                      name: 'wardId',
                      formItem: {
                        type: 'select',
                        rules: [{ type: 'required', message: 'Xin vui lòng chọn phường/xã' }],
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
                          })
                        }
                      },
                    },
                    {
                      title: 'supplier.Street',
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
                            <div className='text-xl text-teal-900 font-bold mb-2.5'>Thông tin người đại diện</div>
                          )
                        }
                      }
                    },
                    {
                      title: 'supplier.NameContact',
                      name: 'username',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'supplier.PhonenumberContact',
                      name: 'phoneNumber',
                      formItem: {
                        tabIndex: 2,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'supplier.EmailContact',
                      name: 'email',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'supplier.Note',
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
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab="Danh sách hàng hóa" key="2" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pb-4">
                  <DataTable
                    facade={productFacade}
                    defaultRequest={{ page: 1, perPage: 10, supplierId: id, type: "BALANCE" }}
                    xScroll='895px'
                    showSearch={false}
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: 'product.Code',
                        name: 'code',
                        tableItem: {
                          width: 170,
                        },
                      },
                      {
                        title: 'product.Name',
                        name: 'name',
                        tableItem: {
                          width: 300,
                          render: (value: any, item: any) => item?.name,
                        },
                      },
                      {
                        title: 'product.Category',
                        name: 'address',
                        tableItem: {
                          width: 205,
                          render: (value: any, item: any) => item?.category?.child?.child?.name,
                        }
                      },
                      {
                        title: 'product.Price',
                        name: 'contract',
                        tableItem: {
                          width: 280,
                          render: (value: any, item: any) => item?.productPrice[0]?.price.toLocaleString(),
                        },
                      },
                      {
                        title: 'supplier.Status',
                        name: "isActive",
                        tableItem: {
                          width: 160,
                          align: 'center',
                          render: (text: string) => (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang bán</div>)

                        },
                      },
                    ]}
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
                                  form.resetFields(['cap2', 'cap3']);
                                },
                              },
                            },
                            {
                              name: 'cap2',
                              title: '',
                              formItem: {
                                disabled: () => true,
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
                                disabled: () => true,
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
                        disableSubmit={isLoading}
                      />
                    }
                  />
                </div>
                <Button
                  text={t('Trở về')}
                  className={'md:w-32 justify-center out-line absolute mt-4'}
                  onClick={() => {
                    navigate(routerLinks('Supplier'))
                  }}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab='Quản lý đơn hàng' key='3' className='rounded-xl'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                    facade={ordersFacade}
                    defaultRequest={{ page: 1, perPage: 10, filterSupplier: id }}
                    xScroll='1400px'
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: 'supplier.CodeOrders',
                        name: 'code',
                        tableItem: {
                          width: 280,

                        },
                      },
                      {
                        title: 'store.Name',
                        name: 'name',
                        tableItem: {
                          width: 180,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: 'supplier.Receiver',
                        name: 'address',
                        tableItem: {
                          width: 180,
                          render: (value: any, item: any) => item?.storeAdmin?.name,
                        }
                      },
                      {
                        title: 'supplier.ReceiverAddress',
                        name: 'contract',
                        tableItem: {
                          width: 300,
                          render: (value: any, item: any) => item?.store?.address?.street + ', ' + item?.store?.address?.ward?.name + ', ' + item?.store?.address?.district?.name + ', ' + item?.store?.address?.province?.name,
                        },
                      },
                      {
                        title: 'supplier.TotalAmount',
                        name: 'total',
                        tableItem: {
                          width: 150,
                          render: (value: any, item: any) => item?.total.toLocaleString(),
                        },
                      },
                      {
                        title: 'supplier.BookingDate',
                        name: 'createdAt',
                        tableItem: {
                          width: 150,
                        },
                      },
                      {
                        title: 'supplier.Status',
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
              <Button
                text={t('Trở về')}
                className={'md:w-32 justify-center out-line absolute mt-4'}
                onClick={() => {
                  navigate(routerLinks('Supplier'))
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab='Doanh thu' key='4' className='rounded-xl bg-white'>
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className='px-5 pt-6 pb-4'>
                  <DataTable
                    facade={inventoryOrders}
                    defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                    xScroll='1400px'
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    rightHeader={
                      <div className='flex justify-between text-left flex-col'>
                        <Form
                          className="intro-x rounded-lg !w-full flex justify-between float-right"
                          columns={
                            [
                              {
                                title: '',
                                name: '',
                                formItem: {
                                  tabIndex: 3,
                                  col: 2,
                                  render: () => (
                                    <div>
                                      <p></p>
                                    </div>
                                  )
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
                            ]
                          }
                          disableSubmit={isLoading}
                        />
                        <Form
                          className='intro-x rounded-lg w-full flex justify-between'
                          columns={[
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className='flex h-10 items-center !w-full'>
                                    <p className='text-sm'>Từ ngày</p>
                                  </div>
                                )
                              },
                            },
                            {
                              title: '',
                              name: 'StartDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                                placeholder: 'Chọn thời điểm',
                              },
                            },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className='flex h-10 items-center !w-full'>
                                    <p className='text-sm'>Đến ngày</p>
                                  </div>
                                )
                              },
                            },
                            {
                              title: '',
                              name: 'EndDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                                placeholder: 'Chọn thời điểm',
                              },
                            },
                          ]}
                        />
                      </div>
                    }
                    searchPlaceholder='Tìm kiếm theo mã đơn hàng'
                    bottomHeader={
                      <div className='md:grid md:grid-cols-4 gap-4 w-full text-teal-900 font-bold'>
                        <div className='w-full rounded-2xl shadow-md pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-[120px] mb-5'>
                          <h1>Doanh Thu</h1>
                        </div>
                        <div className='w-full rounded-2xl shadow-md pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-[120px] mb-5'>
                          <h1>Tổng số đơn thành công</h1>
                        </div>
                        <div className='w-full rounded-2xl shadow-md pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-[120px] mb-5'>
                          <h1>Tổng số đơn trả</h1>
                        </div>
                        <div className='w-full rounded-2xl shadow-md pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-[120px] mb-5'>
                          <h1>Tổng số đơn huỷ</h1>
                        </div>
                      </div>
                    }
                    columns={[
                      {
                        title: 'STT',
                        name: 'code',
                        tableItem: {
                          //  width: 70,
                        },
                      },
                      {
                        title: 'supplier.CodeOrders',
                        name: 'code',
                        tableItem: {
                          //  width: 175,
                        },
                      },
                      {
                        title: 'store.Name',
                        name: 'name',
                        tableItem: {
                          // width: 180,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: 'supplier.BookingDate',
                        name: 'name',
                        tableItem: {
                          //  width: 135,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: 'supplier.ReceivedDate',
                        name: 'address',
                        tableItem: {
                          //  width: 150,
                          render: (value: any, item: any) => item?.storeAdmin?.name,
                        }
                      },
                      {
                        title: 'supplier.BeforeTax',
                        name: 'name',
                        tableItem: {
                          //  width: 145,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: "supplier.AfterTax",
                        name: 'name',
                        tableItem: {
                          // width: 130,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: 'supplier.Promotion',
                        name: 'name',
                        tableItem: {
                          //  width: 160,
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: 'store.Inventory management.Total amount',
                        //name: 'total',
                        name: 'name',
                        tableItem: {
                          //  width: 145,
                          //  render: (value: any, item: any) => item?.store?.address?.street + ', ' + item?.store?.address?.ward?.name + ', ' + item?.store?.address?.district?.name + ', ' + item?.store?.address?.province?.name,
                        },
                      },
                      {
                        title: 'supplier.SingleType',
                        //name: 'total',
                        name: 'name',
                        tableItem: {
                          // width: 100,
                          // render: (value: any, item: any) => item?.total.toLocaleString(),
                        },
                      },
                    ]}
                  />
                </div>
                <div className='flex sm:justify-end justify-center items-center p-5'>
                  <Button
                    disabled={true}
                    text={t('Xuất Báo Cáo')}
                    className={'md:w-[10rem] justify-center out-line !bg-red-800'}
                    onClick={() => { }}
                  />
                </div>
              </div>
              <Button
                text={t('Trở về')}
                className={'md:w-32 justify-center out-line absolute mt-4'}
                onClick={() => {
                  navigate(routerLinks('Supplier'))
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chiết khấu" key="5" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pt-6 pb-4">
                  <DataTable
                    facade={inventoryOrders.data}
                    defaultRequest={{ page: 1, perPage: 10 }}
                    xScroll='1370px'
                    pageSizeRender={(sizePage: number) => sizePage}
                    showSearch={false}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: 'STT',
                        name: 'code',
                        tableItem: {
                          width: 110,
                        },
                      },
                      {
                        title: t(`Thời gian`),
                        name: 'name',
                        tableItem: {
                          width: 300,
                        },
                      },
                      {
                        title: t(`Chiết khấu (VND)`),
                        name: ('address'),
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
                        }
                      },
                      {
                        title: t(`Đã thanh toán (VND)`),
                        name: 'contract',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.contract[0].name,
                        },
                      },
                      {
                        title: t(`Chưa thanh toán (VND)`),
                        name: 'userRole',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                      {
                        title: t(`Trạng thái`),
                        name: "isActive",
                        tableItem: {
                          width: 240,
                          align: 'center',
                          render: (text: string) => text
                            ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã ký</div>)
                            : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Chờ ký</div>),
                        },
                      },
                    ]}
                    leftHeader={
                      <div className=''>
                        <Form
                          className='intro-x rounded-lg w-full flex justify-between'
                          columns={[
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 2,
                                render: () => (
                                  <div className='flex h-10 items-center !w-full'>
                                    <p className='text-sm'>Kì hạn từ</p>
                                  </div>
                                )
                              },
                            },
                            {
                              title: '',
                              name: 'StartDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                                placeholder: 'Chọn thời điểm',
                              },
                            },
                            {
                              title: '',
                              name: '',
                              formItem: {
                                tabIndex: 3,
                                col: 1,
                                render: () => (
                                  <div className='flex h-10 items-center !w-full'>
                                    <p className='text-sm'>đến</p>
                                  </div>
                                )
                              },
                            },
                            {
                              title: '',
                              name: 'EndDate',
                              formItem: {
                                tabIndex: 3,
                                col: 4,
                                type: 'date',
                                placeholder: 'Chọn thời điểm',
                              },
                            },
                          ]}
                        />
                      </div>
                    }
                    rightHeader={
                      <div className='!w-full'>
                        <Form
                          className='w-full float-right'
                          columns={[
                            {
                              title: '',
                              name: '',
                              formItem: {
                                placeholder: 'Chọn trạng thái',
                                type: 'select',
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                              }
                            },
                          ]}
                        />
                      </div>
                    }
                    bottomHeader={
                      <div className='md:grid md:grid-cols-3 gap-4 text-black font-bold'>
                        <div className='col-span-1 rounded-xl shadow-lg pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-[120px] mb-5'>
                          <h1>Chiết khấu cần thanh toán</h1>
                        </div>
                      </div>
                    }
                  />
                </div>
                <div className='flex sm:justify-end justify-center items-center p-5'>
                  <Button
                    disabled={true}
                    text={t('Xuất Báo Cáo')}
                    className={'md:w-[10rem] justify-center out-line'}
                    onClick={() => { }}
                  />
                </div>
              </div>
              <Button
                text={t('Trở về')}
                className={'md:w-32 justify-center out-line absolute mt-4'}
                onClick={() => {
                  navigate(routerLinks('Supplier'))
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab="Hợp đồng" key="6" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className=''>
                  <div className={'text-xl text-teal-900 font-bold block pb-5'}>
                    Chi tiết hợp đồng
                  </div>
                  <div className='grid grid-cols-3 w-full gap-4'>
                    <div className='col-span-1 flex flex-row mt-5 gap-3'>
                      <div className={' text-teal-900 font-semibold block '}>
                        Mã hợp đồng:
                      </div>
                      <div>
                        HD00329
                      </div>
                    </div>
                    <div className='col-span-1 flex flex-row mt-5 gap-3 '>
                      <div className={' text-teal-900 font-semibold block '}>
                        Ngày tạo:
                      </div>
                      <div>
                        16/05/2023 - 17:29
                      </div>
                    </div>
                    <div className='col-span-1 flex mt-5 gap-3 items-center bg-red-200'>
                      <div className={' text-teal-900 font-semibold block '}>
                        Trạng thái:
                      </div>
                      <div className=" bg-blue-300 items-center flex justify-center">
                        <Form
                          className=''
                          columns={[
                            {
                              title: '',
                              name: '',
                              formItem: {
                                placeholder: 'Chờ kí',
                                type: 'select',
                                get: {
                                  facade: CategoryFacade,
                                  format: (item: any) => ({
                                    label: item.name,
                                    value: item.id,
                                  }),
                                },
                              }
                            },
                          ]}
                        />
                      </div>
                    </div>
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
