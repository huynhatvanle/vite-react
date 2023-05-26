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
  const [test, setTest] = useState('1');

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

  const a = inventoryOrders.result?.statistical?.totalRenueve?.toLocaleString();

  const subHeader = [
    {
      title: 'Doanh thu',
      total: a + ' VND',
    },
    {
      title: 'Tổng số đơn thành công',
      total: inventoryOrders.result?.statistical?.totalOderSuccess,
    },
    {
      title: 'Tổng số đơn trả',
      total: inventoryOrders.result?.statistical?.totalOderReturn,
    },
    {
      title: 'Tổng số đơn bị hủy',
      total: inventoryOrders.result?.statistical?.totalOderCancel,
    },
  ];

  const handleBack = () => navigate(routerLinks('Supplier') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: Supplier) => {
    supplierFacade.put({ ...values, id });
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className="">
          <Tabs defaultActiveKey="1" type="card" size="large" className="">
            <Tabs.TabPane tab={t('titles.Supplierinformation')} key="1" className="bg-white rounded-xl rounded-tl-none">
              <div className="px-5">
                <Form
                  // provinceId: data?.address?.province?.name, district: data?.address?.district?.name, ward: data?.address?.ward?.name,
                  values={{
                    ...data,
                    street: data?.address?.street,
                    provinceId: data?.address?.province?.name,
                    districtId: data?.address?.district?.name,
                    wardId: data?.address?.ward?.name,
                    nameContact: data?.userRole?.[0].userAdmin.name,
                    emailContact: data?.userRole?.[0].userAdmin.email,
                    phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber,
                  }}
                  className="intro-x pt-6 rounded-lg w-full"
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
                      },
                    },
                    {
                      title: '',
                      name: 'address',
                      formItem: {
                        rules: [{ type: 'required' }],
                        render() {
                          return (
                            <h3 className='mb-2.5 text-base '>{t('supplier.Supplier Address')}</h3>
                          )
                        },
                      },
                    },
                    {
                      title: 'store.Province',
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
                          form.resetFields(['districtId', 'wardId']);
                        },
                      },
                    },
                    {
                      title: 'store.District',
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
                          form.resetFields(['wardId']);
                        },
                      },
                    },
                    {
                      title: 'store.Ward',
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
                          return <div className="text-xl text-teal-900 font-bold mb-2.5">{t('store.Representative information')}</div>;
                        },
                      },
                    },
                    {
                      title: 'store.ContactName',
                      name: 'nameContact',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'store.Contact Phone Number',
                      name: 'phoneNumber',
                      formItem: {
                        tabIndex: 2,
                        col: 4,
                        rules: [{ type: 'required' },{ type: 'phone', min: 8, max: 12 }],
                      },
                    },
                    {
                      title: 'store.Contact Email',
                      name: 'emailContact',
                      formItem: {
                        tabIndex: 1,
                        col: 4,
                        rules: [{ type: 'required' },{ type: 'email' }],
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
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('titles.Listofgoods')} key="2" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pb-4">
                  <DataTable
                    facade={productFacade}
                    defaultRequest={{ page: 1, perPage: 10, supplierId: id, type: 'BALANCE' }}
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
                                Đang bán
                              </div>
                            ) : (
                              <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                Ngưng bán
                              </div>
                            ),
                        },
                      },
                    ]}
                    rightHeader={
                      <div className={'flex h-10 w-36 mt-6'}>
                        {
                          <Button
                            className="!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group"
                            icon={
                              <Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />
                            }
                            text={t('Xuất file excel')}
                            onClick={() => navigate(routerLinks('Supplier/Excel'))}
                          />
                        }
                      </div>
                    }
                    leftHeader={
                      <Form
                        className="intro-x pt-6 rounded-lg w-full "
                        columns={[
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
                                form.resetFields(['cap3']);
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
                                }),
                              },
                            },
                          },
                        ]}
                      />
                    }
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
            <Tabs.TabPane tab="Quản lý đơn hàng" key="3" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pt-6 pb-4">
                  <DataTable
                    facade={ordersFacade}
                    defaultRequest={{ page: 1, perPage: 10, filterSupplier: id }}
                    xScroll="1400px"
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
                          render: (value: any, item: any) => item?.store?.name,
                        },
                      },
                      {
                        title: t(`Người nhận`),
                        name: 'address',
                        tableItem: {
                          width: 180,
                          render: (value: any, item: any) => item?.storeAdmin?.name,
                        },
                      },
                      {
                        title: t(`Địa chỉ nhận hàng`),
                        name: 'contract',
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
                        title: t(`Tổng tiền (VND)`),
                        name: 'total',
                        tableItem: {
                          width: 150,
                          render: (value: any, item: any) => parseInt(item?.total).toLocaleString(),
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
                        name: 'isActive',
                        tableItem: {
                          width: 180,
                          align: 'center',
                          render: (value: any, item: any) =>
                            item?.status === 'DELIVERED' ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                Đã giao
                              </div>
                            ) : item?.status === 'WAITING_APPROVED' ? (
                              <div className="bg-yellow-50 text-center p-1 border border-yellow-500 text-yellow-500 rounded">
                                Chờ xác nhận
                              </div>
                            ) : item?.status === 'DELIVERY_RECEIVE' || item?.status === 'DELIVERY_RECEIVING' ? (
                              <div className="bg-blue-100 text-center p-1 border border-blue-500 text-blue-600 rounded">
                                Đang giao
                              </div>
                            ) : item?.status === 'WAITING_PICKUP' ? (
                              <div className="bg-orange-50 text-center p-1 border border-orange-500 text-orange-500 rounded">
                                Chờ lấy hàng
                              </div>
                            ) : (
                              <div className="bg-red-100 text-center p-1 border border-red-500 text-red-500 rounded">
                                Đã huỷ
                              </div>
                            ),
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
                  navigate(routerLinks('Supplier'));
                }}
              />
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
                        className: 'hover:!bg-white !py-2 !px-2.5',
                        label: (
                          <div className="text-base text-gray-400" onClick={() => setTest('1')}>
                            Doanh thu theo đơn hàng
                          </div>
                        ),
                      },
                      {
                        key: '1',
                        className: 'hover:!bg-white !py-2 !px-2.5',
                        label: (
                          <div className="text-base text-gray-400" onClick={() => setTest('2')}>
                            Doanh thu theo sản phẩm
                          </div>
                        ),
                      },
                    ],
                  }}
                  placement="bottomRight"
                >
                  <section className="flex items-center">
                    <h1>Doanh thu</h1>
                    <DownArrow className="w-4 h-4 ml-2" />
                  </section>
                </Dropdown>
              }
              key="4"
              className="rounded-xl"
            >
              {test === '1' ? (
                <div className={'w-full mx-auto bg-white rounded-xl'}>
                  <div className="px-5 pt-6 pb-4">
                    <DataTable
                      facade={inventoryOrders}
                      defaultRequest={{
                        page: 1,
                        perPage: 10,
                        idSuppiler: id,
                        filterDate: { dateFrom: '2023/05/01 00:00:00', dateTo: '2023/05/24 23:59:59' },
                      }}
                      xScroll="1400px"
                      pageSizeRender={(sizePage: number) => sizePage}
                      pageSizeWidth={'50px'}
                      paginationDescription={(from: number, to: number, total: number) =>
                        t('routes.admin.Layout.Pagination', { from, to, total })
                      }
                      rightHeader={
                        <div className="flex items-end justify-between">
                          <Form
                            values={{ dateFrom: '05/01/2023', dateTo: '05/24/2023' }}
                            className="intro-x items-end rounded-lg w-full flex justify-between"
                            columns={[
                              {
                                title: '',
                                name: '',
                                formItem: {
                                  tabIndex: 3,
                                  col: 2,
                                  render: () => (
                                    <div className="flex h-10 items-center">
                                      <p></p>
                                    </div>
                                  ),
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
                                    form.resetFields(['cap2', 'cap3']);
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
                                    form.resetFields(['cap2']);
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
                                      <p>Từ Ngày</p>
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
                                      <p>Đến ngày</p>
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
                                },
                              },
                            ]}
                            // handSubmit={handleSubmit}
                            disableSubmit={isLoading}
                          />
                        </div>
                      }
                      searchPlaceholder="Tìm kiếm theo mã đơn hàng"
                      columns={[
                        {
                          title: `supplier.Order.STT`,
                          name: 'id',
                          tableItem: {
                            width: 70,
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
                            // render: (value: any, item: any) => item?.store?.name,
                          },
                        },
                        {
                          title: `supplier.Order.Order Date`,
                          name: 'pickUpDate',
                          tableItem: {
                            width: 135,
                            // render: (value: any, item: any) => item?.store?.name,
                          },
                        },
                        {
                          title: `supplier.Order.Delivery Date`,
                          name: 'completedDate',
                          tableItem: {
                            width: 150,
                            // render: (value: any, item: any) => item?.storeAdmin?.name,
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
                              // RETURN
                              item?.billType === 'RECIEVED' ? (
                                <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                  Bán hàng
                                </div>
                              ) : (
                                <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                  Trả hàng
                                </div>
                              ),
                          },
                        },
                      ]}
                      footer={() => (
                        <div className="w-full flex sm:justify-end justify-center mt-4">
                          <button className="bg-teal-900 hover:bg-teal-700 text-white sm:w-44 w-[64%] px-4 py-2.5 rounded-xl">
                            Xuất báo cáo
                          </button>
                        </div>
                      )}
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
                  </div>
                </div>
              ) : (
                test === '2' && (
                  <div className={'w-full mx-auto bg-white rounded-xl'}>
                    <div className="px-5 pt-6 pb-4">
                      <Form
                        className="intro-x pt-6 rounded-lg w-full "
                        columns={[
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
                                form.resetFields(['cap3']);
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
                                }),
                              },
                            },
                          },
                        ]}
                      />
                      <DataTable
                        facade={inventoryOrders}
                        defaultRequest={{
                          page: 1,
                          perPage: 10,
                          idSuppiler: id,
                          filterDate: { dateFrom: '2023/05/01 00:00:00', dateTo: '2023/05/24 23:59:59' },
                        }}
                        xScroll="1400px"
                        pageSizeRender={(sizePage: number) => sizePage}
                        pageSizeWidth={'50px'}
                        paginationDescription={(from: number, to: number, total: number) =>
                          t('routes.admin.Layout.Pagination', { from, to, total })
                        }
                        rightHeader={
                          <div className="flex items-end justify-between">
                            <Form
                              values={{ dateFrom: '05/01/2023', dateTo: '05/24/2023' }}
                              className="intro-x items-end rounded-lg w-full flex justify-between"
                              columns={[
                                {
                                  title: '',
                                  name: '',
                                  formItem: {
                                    tabIndex: 3,
                                    col: 2,
                                    render: () => (
                                      <div className="flex h-10 items-center">
                                        <p></p>
                                      </div>
                                    ),
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
                                      form.resetFields(['cap2', 'cap3']);
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
                                      form.resetFields(['cap2']);
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
                                        <p>Từ Ngày</p>
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
                                        <p>Đến ngày</p>
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
                                  },
                                },
                              ]}
                              // handSubmit={handleSubmit}
                              disableSubmit={isLoading}
                            />
                          </div>
                        }
                        searchPlaceholder="Tìm kiếm theo mã đơn hàng"
                        columns={[
                          {
                            title: `supplier.Order.STT`,
                            name: 'id',
                            tableItem: {
                              width: 70,
                            },
                          },
                          {
                            title: `product.Code`,
                            name: 'invoiceCode',
                            tableItem: {
                              width: 175,
                            },
                          },
                          {
                            title: `product.Name`,
                            name: 'storeName',
                            tableItem: {
                              width: 180,
                              // render: (value: any, item: any) => item?.store?.name,
                            },
                          },
                          {
                            title: `product.Barcode`,
                            name: 'storeName',
                            tableItem: {
                              width: 180,
                              // render: (value: any, item: any) => item?.store?.name,
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
                                // RETURN
                                item?.billType === 'RECIEVED' ? (
                                  <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                    Bán hàng
                                  </div>
                                ) : (
                                  <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                    Trả hàng
                                  </div>
                                ),
                            },
                          },
                        ]}
                        footer={() => (
                          <div className="w-full flex sm:justify-end justify-center mt-4">
                            <button className="bg-teal-900 hover:bg-teal-700 text-white sm:w-44 w-[64%] px-4 py-2.5 rounded-xl">
                              Xuất báo cáo
                            </button>
                          </div>
                        )}
                      />
                    </div>
                  </div>
                )
              )}
            </Tabs.TabPane>
            <Tabs.TabPane tab="Chiết khấu" key="5" className="rounded-xl">
              {/* lấy về đc data/ tạo 1 cái data mới /lấy 1 cái key tạo 1 row mới trong table */}
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="px-5 pt-6 pb-4">
                  <DataTable
                    facade={discountFacade}
                    defaultRequest={{ page: 1, perPage: 10 }}
                    xScroll="1370px"
                    pageSizeRender={(sizePage: number) => sizePage}
                    pageSizeWidth={'50px'}
                    paginationDescription={(from: number, to: number, total: number) =>
                      t('routes.admin.Layout.Pagination', { from, to, total })
                    }
                    columns={[
                      {
                        title: `supplier.Order.STT`,
                        name: 'code',
                        tableItem: {
                          width: 110,
                        },
                      },
                      {
                        title: `supplier.Order.Time`,
                        name: 'name',
                        tableItem: {
                          width: 300,
                        },
                      },
                      {
                        title: `supplier.Order.Discount`,
                        name: 'address',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) =>
                            item?.address?.street +
                            ', ' +
                            item?.address?.ward?.name +
                            ', ' +
                            item?.address?.district?.name +
                            ', ' +
                            item?.address?.province?.name,
                        },
                      },
                      {
                        title: `supplier.Order.Paid`,
                        name: 'contract',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.contract[0].name,
                        },
                      },
                      {
                        title: `supplier.Order.Unpaid`,
                        name: 'userRole',
                        tableItem: {
                          width: 245,
                          render: (value: any, item: any) => item?.userRole[0].userAdmin.phoneNumber,
                        },
                      },
                      {
                        title: `supplier.Status`,
                        name: 'isActive',
                        tableItem: {
                          width: 240,
                          align: 'center',
                          render: (text: string) =>
                            text ? (
                              <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                Đã ký
                              </div>
                            ) : (
                              <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                                Chờ ký
                              </div>
                            ),
                        },
                      },
                    ]}
                    showSearch={false}
                    rightHeader={
                      <div className={'flex h-10 w-36'}>
                        {user && (
                          <Button
                            className="!bg-white flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group"
                            icon={<Download className="icon-cud !h-6 !w-6 !fill-gray-600 group-hover:!fill-white" />}
                            text={t('Xuất file excel')}
                            onClick={() => navigate(routerLinks('Supplier/Excel'))}
                          />
                        )}
                      </div>
                    }
                    subHeader={() => (
                      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 mt-10 sm:mb-3 mb-4">
                        <div className="w-full rounded-xl shadow-[0_0_9px_rgb(0,0,0,0.25)] pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-28 mb-4">
                          <h1 className="font-bold mb-3">Chiết khấu cần thanh toán</h1>
                          <span className="text-teal-900 text-xl font-bold mt-auto">0 VND</span>
                        </div>
                      </div>
                    )}
                  />
                </div>
                <div className="flex sm:justify-end justify-center items-center p-5">
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
                  navigate(routerLinks('Supplier'));
                }}
              />
            </Tabs.TabPane>
            <Tabs.TabPane tab={t('titles.Contract')} key="6" className="rounded-xl">
              <div className={'w-full mx-auto bg-white rounded-xl'}>
                <div className="">
                  <div className={'text-xl text-teal-900 font-bold block pb-5'}>Chi tiết hợp đồng</div>
                  <div className="grid grid-cols-3 w-full gap-4">
                    <div className="col-span-1 flex flex-row mt-5 gap-3">
                      <div className={' text-teal-900 font-semibold block '}>Mã hợp đồng:</div>
                      <div>HD00329</div>
                    </div>
                    <div className="col-span-1 flex flex-row mt-5 gap-3 ">
                      <div className={' text-teal-900 font-semibold block '}>Ngày tạo:</div>
                      <div>16/05/2023 - 17:29</div>
                    </div>
                    <div className="col-span-1 flex mt-5 gap-3 items-center bg-red-200">
                      <div className={' text-teal-900 font-semibold block '}>Trạng thái:</div>
                      <div className=" bg-blue-300 items-center flex justify-center">
                        <Form
                          className=""
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
                              },
                            },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
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
          </Tabs>
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
