import React, { Fragment, Ref, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Input, Select, Switch, Tabs, Dropdown } from 'antd';

import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { DistrictFacade, StoreFacade, WardFacade, ProvinceFacade, StoreManagement, SubStoreFacade, ConnectSupplierFacade, ProductFacade, InventoryProductFacade, CategoryFacade, SupplierStoreFacade, invoicekiotvietFacade } from '@store';
import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { Arrow, Download } from '@svgs';
import { TableRefObject } from '@models';


const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const storeFacade = StoreFacade()
  const { data, isLoading, queryParams, status } = storeFacade;
  const productFacede = ProductFacade()
  const subStoreFacade = SubStoreFacade()
  const connectSupplierFacade = ConnectSupplierFacade()
  const inventoryProductFacade = InventoryProductFacade()
  const invoicevietFacade = invoicekiotvietFacade()

  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const [supplier, setSupplier] = useState('')

  const dataTableRef = useRef<TableRefObject>(null);
  // useEffect(() => {
  //   console.log(supplier)
  //   productFacede.get({ page: 1, perPage: 10, storeId: data?.id, type: 'BALANCE', supplierId: supplier })
  //   // return () => {
  //   //   isReload.current && storeFacade.get(param);
  //   // };
  // }, [supplier]);

  useEffect(() => {
    if (status === 'put.fulfilled')
      navigate(routerLinks('Store'))
  }, [status]);

  useEffect(() => {
    if (id) storeFacade.getById({ id });

    return () => {
      isReload.current && storeFacade.get(param);
    };
  }, [id]);

  const handleBack = () => navigate(routerLinks('Store') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: StoreManagement) => {
    storeFacade.put({ ...values, id });
  };

  const [isChecked, setIsChecked] = useState(false);

  const handleClick = () => {
    setIsChecked(!isChecked);
  };

  const [isBalanceClicked, setIsBalanceClicked] = useState<boolean>(false);

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='tab-wrapper'>
          <Tabs defaultActiveKey='1' type='card' size='large'>
            <Tabs.TabPane tab={'Thông tin cửa hàng'} key='1' className='bg-white rounded-xl rounded-tl-none'>
              <Form
                values={{ ...data, street: data?.address?.street, emailContact: data?.userRole?.[0].userAdmin.email, phoneNumber: data?.userRole?.[0].userAdmin.phoneNumber, nameContact: data?.userRole?.[0].userAdmin.name, provinceId: data?.address?.province?.id, districtId: data?.address?.district?.id, wardId: data?.address?.ward?.id, }}
                className="intro-x rounded-lg w-full"
                columns={[
                  {
                    title: 'store.Code',
                    name: 'code',
                    formItem: {
                      tabIndex: 1,
                      col: 4,
                      disabled: () => true
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
                    },
                  },
                  {
                    title: '',
                    name: 'address',
                    formItem: {
                      rules: [{ type: 'required' }],
                      render() {
                        return (
                          <h3 className='mb-2.5 text-base text-black font-medium'>Địa chỉ cửa hàng</h3>
                        )
                      },
                    }
                  },
                  {
                    title: 'store.Province',
                    name: 'provinceId',
                    formItem: {
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
                        form.resetFields(['districtId', 'wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.District',
                    name: 'districtId',
                    formItem: {
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
                        form.resetFields(['wardId'])
                      },
                    },
                  },
                  {
                    title: 'store.Ward',
                    name: 'wardId',
                    formItem: {
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
                        })
                      }
                    },
                  },
                  {
                    title: 'store.Street',
                    name: 'street',
                    formItem: {
                      rules: [{ type: 'required' }],
                      col: 3,
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
                    title: 'store.ContactName',
                    name: 'nameContact',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Phone Number',
                    name: 'phoneNumber',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Contact Email',
                    name: 'emailContact',
                    formItem: {
                      col: 4,
                      rules: [{ type: 'required' }],
                    },
                  },
                  {
                    title: 'store.Note',
                    name: 'note',
                    formItem: {
                      type: 'textarea',
                    },
                  },
                ]}

                extendFormSwitch=
                {<div className='flex items-center justify-between mb-2.5 '>
                  <div className='flex'>
                    <div className='text-xl text-teal-900 font-bold mr-6'>Kết nối KiotViet</div>
                    <Switch onClick={handleClick} />
                  </div>
                  {isChecked && (
                    <Button className='!font-normal' text={t('Lấy DS chi nhánh')} />
                  )}
                </div>}

                extendForm=
                {isChecked ? (values: any) => (
                  <Form
                    values={{ ...data }}
                    columns={[
                      {
                        title: 'client_id',
                        name: 'clientid',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' },],
                        },
                      },
                      {
                        title: 'client_secret',
                        name: 'clientsecret',
                        formItem: {
                          tabIndex: 2,
                          col: 6,
                          rules: [{ type: 'required' },],
                        },
                      },
                      {
                        title: 'retailer',
                        name: 'retailer',
                        formItem: {
                          tabIndex: 1,
                          col: 6,
                          rules: [{ type: 'required' },],
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
                )
                  :
                  undefined
                }

                handSubmit={handleSubmit}
                disableSubmit={isLoading}
                handCancel={handleBack}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab={
              <Dropdown trigger={['click']}
                className='!rounded-xl'
                menu={{
                  items: [
                    {
                      key: '1',
                      className: '!font-semibold !text-base !text-teal-900',
                      label: (
                        <div onClick={() => {
                          setIsBalanceClicked(false);
                          dataTableRef?.current?.onChange({ page: 1, perPage: 10, storeId: data?.id, type: 'BALANCE' });
                        }} className={`${isBalanceClicked ? 'text-gray-200' : ''}`}>
                          BALANCE
                        </div>
                      ),
                    },
                    {
                      key: '2',
                      className: '!font-semibold !text-base !text-teal-900',
                      label: (
                        <div onClick={() => {
                          setIsBalanceClicked(true);
                          dataTableRef?.current?.onChange({ page: 1, perPage: 10, storeId: data?.id, type: 'NON_BALANCE' });
                        }} className={`${isBalanceClicked ? '' : 'text-gray-200'}`}>
                          Non - BALANCE
                        </div>
                      ),
                    },
                  ]
                }}
              >
                <section className="flex items-center" id={'dropdown-store'}>
                  <div className="flex">
                    <h2>Danh sách hàng hóa</h2>
                    <Arrow className='w-5 h-5 rotate-90 ml-3 mt-1 fill-green' />
                  </div>
                </section>
              </Dropdown>
            }
              key='2' className='rounded-xl'>

              <DataTable
                facade={productFacede}
                ref={dataTableRef}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, type: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                columns={[
                  {
                    title: 'product.Code',
                    name: 'code',
                    tableItem: {
                      width: 150,
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.StoreCode',
                    name: 'storeBarcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.SupplierCode',
                    name: 'barcode',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Name',
                    name: 'name',
                    tableItem: {
                      sorter: true,
                      filter: { type: 'search' }
                    },
                  },
                  {
                    title: 'product.Category',
                    name: 'category',
                    tableItem: {
                      render: (value: any, item: any) => item.category?.child?.name
                    },
                  },
                  {
                    title: 'product.SupplierName',
                    name: 'supplierName',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.Unit',
                    name: 'basicUnit',
                    tableItem: {
                    },
                  },
                  {
                    title: 'product.Price',
                    name: 'productPrice',
                    tableItem: {
                      render: (text, item) => parseInt(item.productPrice[0] ? item.productPrice[0]?.price : '0').toLocaleString()
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
                  <div className={'flex h-10 w-36 mt-6'}>
                    {
                      <Button
                        className='!bg-white !font-normal whitespace-nowrap text-left flex justify-between w-full !px-3 !border !border-gray-600 !text-gray-600 hover:!bg-teal-900 hover:!text-white group !mt-0'
                        icon={<Download className="icon-cud !p-0 !h-5 !w-5 !fill-gray-600 group-hover:!fill-white" />}
                        text={t('Xuất file excel')}
                        onClick={() => navigate(routerLinks('Supplier/Excel'))}
                      />
                    }
                  </div>
                }
                leftHeader={
                  <>
                    <Form
                      className="intro-x rounded-lg w-full"
                      columns={
                        [
                          {
                            title: '',
                            name: 'supplierName',
                            formItem: {
                              placeholder: 'Chọn nhà cung cấp',
                              col: 5,
                              type: 'select',
                              get: {
                                facade: SupplierStoreFacade,
                                format: (item: any) => ({
                                  label: item.name,
                                  value: item.id,
                                }),
                                params: (fullTextSearch) => ({
                                  fullTextSearch,
                                  storeId: id,
                                  type: 'BALANCE',
                                }),
                              },
                              onChange(value, form) {
                                setSupplier(`${value}`)
                              },
                            },
                          },
                        ]
                      }
                      // handSubmit={handleSubmit}
                      disableSubmit={isLoading}
                    />
                    <Form
                      className="intro-x rounded-lg w-full "
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
                              // disabled:() => true,
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
                              // disabled:() => true,
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
                      // handSubmit={handleSubmit}
                      disableSubmit={isLoading}
                    />
                  </>
                }
              />

            </Tabs.TabPane>

            <Tabs.TabPane tab='Danh sách chi nhánh' key='3' className='rounded-xl'>
              <DataTable
                facade={subStoreFacade}
                defaultRequest={{ page: 1, perPage: 10, storeId: data?.id, supplierType: 'BALANCE' }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store/branch/edit') + '/' + data.id);
                  },
                })}
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
                    tableItem: {
                    },
                  },
                  {
                    title: 'store.Address',
                    name: 'address',
                    tableItem: {
                      render: (value: any, item: any) => item.address?.street + ', ' + item.address?.wardName + ', ' + item.address?.districtName + ', ' + item.address?.provinceName,
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
                    title: 'Trạng thái',
                    name: 'isActive',
                    tableItem: {
                      render: (text: string) => text ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đang hoạt động</div>)
                        : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'></div>),
                    },
                  },
                ]}
              />
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown trigger={['click']}
                  className='rounded-xl'
                  menu={{
                    items: [
                      {
                        key: '0',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div onClick={() => {
                            setIsBalanceClicked(false);
                            dataTableRef?.current?.onChange({ page: 1, perPage: 10, idSuppiler: id });
                          }} className={`${isBalanceClicked ? 'text-gray-200' : ''}`}>
                            BALANCE
                          </div>
                        ),
                      },
                      {
                        key: '1',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div onClick={() => {
                            setIsBalanceClicked(true);
                            dataTableRef?.current?.onChange({ page: 1, perPage: 10, idSuppiler: id, supplierType: 'NON_BALANCE' });
                          }} className={`${isBalanceClicked ? '' : 'text-gray-200'}`}>
                            Non - BALANCE
                          </div>
                        ),
                      },
                    ]
                  }}
                >
                  <section className="flex items-center" id={'dropdown-profile'}>
                    <div className="flex">
                      <h2>Quản lý NCC</h2>
                      <Arrow className='w-5 h-5 rotate-90 ml-3 mt-1 fill-green' />
                    </div>
                  </section>
                </Dropdown>
              }
              key='4' className='rounded-xl'>
              <DataTable
                ref={dataTableRef}
                facade={connectSupplierFacade}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
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
                      render: (value: any, item: any) => item.supplier.address?.street + ', ' + item.supplier.address?.ward.name + ', ' + item.supplier.address?.district.name + ', ' + item.supplier.address?.province.name,
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
            </Tabs.TabPane>

            <Tabs.TabPane
              tab={
                <Dropdown trigger={['click']}
                  className='rounded-xl'
                  menu={{
                    items: [
                      {
                        key: '0',
                        className: '!font-semibold !text-base !text-teal-900 !w-full',
                        label: (
                          <div onClick={() => {
                            setIsBalanceClicked(false);
                            dataTableRef?.current?.onChange();
                          }} className={`${isBalanceClicked ? 'text-gray-200' : ''}`}>
                            {t('store.Revenue by product')}
                          </div>
                        ),
                      },
                      {
                        key: '1',
                        className: '!font-semibold !text-base !text-teal-900',
                        label: (
                          <div onClick={() => {
                            setIsBalanceClicked(true);
                            dataTableRef?.current?.onChange();
                          }} className={`${isBalanceClicked ? '' : 'text-gray-200'}`}>
                            {t('store.Revenue by order')}
                          </div>
                        ),
                      },
                    ]
                  }}
                >
                  <section className="flex items-center" id={'dropdown-profile'}>
                    <div className="flex">
                      <h2>Doanh Thu</h2>
                      <Arrow className='w-5 h-5 rotate-90 ml-3 mt-1 fill-green' />
                    </div>
                  </section>
                </Dropdown>
              }
              key='5' className='rounded-xl'>
              <DataTable
                facade={invoicevietFacade.data}
                defaultRequest={{ page: 1, perPage: 10, idSuppiler: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                onRow={(data: any) => ({
                  onDoubleClick: () => {
                    navigate(routerLinks('store-managerment/edit') + '/' + data.id);
                  },
                })}
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg w-full "
                    columns={
                      [
                        {
                          title: '',
                          name: 'supplierName',
                          formItem: {
                            //  tabIndex: 1,
                            placeholder: 'Chọn loại đơn hàng',
                            col: 7,
                            type: 'select',
                            get: {
                              facade: ConnectSupplierFacade,
                              format: (item: any) => ({
                                label: item.supplier?.name,
                                value: item.supplier?.id,
                              }),
                              // params: (fullTextSearch: string, getFieldValue: any) => ({
                              //   fullTextSearch,
                              //   extend: { name: getFieldValue('supplierName') || undefined },
                              // }),
                            }
                          },
                        },
                      ]
                    }
                    // handSubmit={handleSubmit}
                    disableSubmit={isLoading}
                  />
                }
                columns={[
                  {
                    title: 'store.Revenue.Serial number',
                    name: 'supplier',
                    tableItem: {
                      width: 150,
                      render: (value: any, item: any) => item.supplier?.code,
                    },
                  },
                  {
                    title: 'store.Revenue.Order code',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Revenue.Sale date',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Revenue.Value (VND)',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier?.name,
                    },
                  },
                  {
                    title: 'store.Revenue.Discount (VND)',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.name,
                    },
                  },
                  {
                    title: 'store.Revenue.Total amount (VND)',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                    },
                  },
                  {
                    title: 'store.Revenue.Order type',
                    name: 'supplier',
                    tableItem: {
                      render: (value: any, item: any) => item.supplier.userRole[0].userAdmin.phoneNumber,
                    },
                  },
                ]}
              />
            </Tabs.TabPane>

            <Tabs.TabPane tab='Quản lý kho' key='6' className='rounded-xl'>
              <DataTable
                facade={inventoryProductFacade.data?.inventory}
                defaultRequest={{ page: 1, perPage: 10, idStore: id }}
                xScroll='1440px'
                className=' bg-white p-5 rounded-lg'
                pageSizeRender={(sizePage: number) => sizePage}
                pageSizeWidth={'50px'}
                paginationDescription={(from: number, to: number, total: number) =>
                  t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                }
                showSearch={false}
                rightHeader={
                  <div className={'h-10 w-24 '}>
                    {
                      <Button
                        className='!bg-teal-800 !font-normal w-full !text-white hover:!bg-teal-700 group'
                        text={t('Đồng bộ')}
                        onClick={() => navigate(routerLinks('Supplier/Excel'))}
                      />
                    }
                  </div>
                }
                leftHeader={
                  <Form
                    className="intro-x rounded-lg w-full "
                    columns={
                      [
                        {
                          title: '',
                          name: 'supplierName',
                          formItem: {
                            //  tabIndex: 1,
                            placeholder: 'Chọn nhà cung cấp',
                            col: 7,
                            type: 'select',
                            get: {
                              facade: ConnectSupplierFacade,
                              format: (item: any) => ({
                                label: item.supplier?.name,
                                value: item.supplier?.id,
                              }),
                              // params: (fullTextSearch: string, getFieldValue: any) => ({
                              //   fullTextSearch,
                              //   extend: { name: getFieldValue('supplierName') || undefined },
                              // }),
                            }
                          },
                        },
                      ]
                    }
                    // handSubmit={handleSubmit}
                    disableSubmit={isLoading}
                  />
                }
                columns={[
                  {
                    title: 'store.Inventory management.Product code',
                    name: 'productCode',
                    tableItem: {
                      width: 120,
                      render: (text: string, item: any) => text,
                    },
                  },
                  {
                    title: 'store.Inventory management.Barcode (Supplier)',
                    name: 'supplierBarcode',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.supplierBarcode,
                    },
                  },
                  {
                    title: 'store.Inventory management.Barcode (Product)',
                    name: 'storeBarcode',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.storeBarcode,
                    },
                  },
                  {
                    title: 'store.Inventory management.Product name',
                    name: 'productName',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.productName,
                    },
                  },
                  {
                    title: 'store.Inventory management.Category',
                    name: 'category',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Supplier',
                    name: 'supplierName',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Unit',
                    name: 'name',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Quantity on KiotViet',
                    name: 'numberInKiot',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Quantity on BALANCE',
                    name: 'numberInBal',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Warehouse price',
                    name: 'inventoryPrice',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                  {
                    title: 'store.Inventory management.Total amount',
                    name: 'inventoryPrice',
                    tableItem: {
                      render: (value: any, item: any) => item.inventory?.category,
                    },
                  },
                ]}
              />
            </Tabs.TabPane>
          </Tabs>
        </div>
      </Fragment >
    </div >
  );
};
export default Page;
