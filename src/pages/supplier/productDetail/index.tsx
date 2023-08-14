import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { language, languages, routerLinks } from '@utils';
import { CategoryFacade, Product, ProductFacade, TaxAdminFacade } from '@store';
import { Form } from '@core/form';
import { Tags } from '@svgs';
import { Dropdown, Table } from 'antd';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { Message } from '@core/message';
import { ModalForm } from '@core/modal/form';

const Page = () => {
  const { t } = useTranslation();
  const productFacade = ProductFacade();
  const { data, isLoading, queryParams } = productFacade;
  const taxAdminFacare = TaxAdminFacade()
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const navigate = useNavigate();
  const modalformRef = useRef<any>();



  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    taxAdminFacare.get({ fullTextSearch: '' })
    if (id) {
      productFacade.getById({ id });
    }
    return () => {
      isReload.current && productFacade.getById({ id });
    };
  }, [id]);

  useEffect(() => {
    if (productFacade.status === 'putProduct.fulfilled') {
      navigate(`/${lang}${routerLinks('inventory-management/product')}`)
    }
  }, [productFacade.status]);

  useEffect(() => {
    if (productFacade.status === 'putProductreject.fulfilled') {
      navigate(`/${lang}${routerLinks('inventory-management/product')}`)
    }
  }, [productFacade.status]);

  let i = 1;

  const dl = data?.productPrice?.flat().map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      PriceType: item?.priceType,
      Quantity: item?.minQuantity.toLocaleString(),
      Price: item?.price.toLocaleString(),
    };
  });

  const dt = data?.priceBalanceCommission?.flat().map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      Revenue: parseInt(item?.revenue).toLocaleString(),
      AmountBalance: parseInt(item?.amountBalance).toLocaleString(),
      PercentBalance: item?.percentBalance ? item?.percentBalance.toLocaleString() : '',
    };
  });

  const file = data?.information?.map((item, index) => {
    return {
      key: index + 1,
      stt: index + 1,
      Content: item?.content,
      Url: item?.url
    };
  });

  const listOptionreason = [
    { label: 'Đơn vị cơ bản không đúng', value: 'Đơn vị cơ bản không đúng' },
    { label: 'Danh mục sản phẩm không đúng', value: 'Danh mục sản phẩm không đúng' },
    { label: 'Mô tả sản phẩm không phù hợp', value: 'Mô tả sản phẩm không phù hợp' },
    { label: 'Bản đánh giá cửa hàng không phù hợp', value: 'Bản đánh giá cửa hàng không phù hợp' },
    { label: 'Chiết khấu với BALANCE không phù hợp', value: 'Chiết khấu với BALANCE không phù hợp' },
    { label: 'Khác', value: 'other' },
  ];


  const [other, setOther] = useState(true);
  const [a, setA] = useState<any>()

  // const handleSubmit = () => {
  //   const id = a;
  //   const rejectReason = listOptionreason;
  //   console.log(id, rejectReason)
  //   // const rejectReason = modalformRef?.current?.getFieldValue('rejectReason');
  //   productFacade.putProductreject({ id, rejectReason });
  // };


  return (
    <div className={'w-full rounded-2xl bg-white'}>
      <Fragment>
        <div className='flex lg:flex-row flex-col'>
          <div className='flex-initial lg:rounded-xl w-auto form-merchandise2'>
            <Form
              values={{
                ...data,
              }}
              className="intro-x text-color flex flex-col lg:flex-row"
              columns={[
                {
                  title: '',
                  name: 'id',
                  formItem: {
                    render: (form, values) => {
                      return (
                        <div className="flex lg:flex-col flex-col">
                          <div className='m-auto lg:m-0'>
                            <img src={values?.photos?.[0]?.url} alt="image" className="!rounded-2xl h-52 w-52" />
                          </div>
                          <div>
                            <div className="my-2">
                              <label className='text-base text-black'>Đơn vị cơ bản</label>
                            </div>
                            <div className="mb-4 items-center ">
                              <input
                                className="w-full h-10 px-4 ant-input border rounded-xl bg-gray-100 text-gray-400"
                                placeholder="Nhập đơn vị"
                                id="basicUnit"
                                value={values.basicUnit}
                              ></input>
                            </div>
                            <p className="text-xl font-bold text-teal-900 pb-2">Trạng thái sản phẩm</p>
                            <p className="font-normal text-base flex items-center">
                              {
                                values?.approveStatus == 'APPROVED' ? (
                                  <div className="flex w-full text-green-600 ">
                                    <Tags className=" text-xs mr-2 w-5"></Tags>
                                    {t('supplier.status.on sale')}
                                  </div>
                                ) : values?.approveStatus == 'WAITING_APPROVE' ? (
                                  <div className="flex w-full text-yellow-600">
                                    <Tags className=" text-xs mr-1 w-5"></Tags>
                                    {t('supplier.status.wait for confirm')}
                                  </div>
                                ) : values?.approveStatus == 'REJECTED' ? (
                                  <div className=" flex w-full  text-red-600 ">
                                    <Tags className=" text-xs mr-1 w-5"></Tags>
                                    {t('supplier.status.Decline')}
                                  </div>
                                ) : values?.approveStatus == 'OUT_OF_STOCK' ? (
                                  <div className="">
                                  </div>
                                ) : values?.approveStatus == 'STOP_SELLING' ? (
                                  <div className="flex w-full text-red-600 ">
                                    <Tags className=" text-xs mr-1 w-5"></Tags>
                                    {t('supplier.status.stop selling')}
                                  </div>
                                ) : (
                                  <div className=" flex w-full text-black ">
                                    <Tags className=" text-xs mr-1 w-5"></Tags>
                                    {t('supplier.status.canceled')}
                                  </div>)
                              }
                            </p>
                          </div>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
          </div>
          <div className='flex-initial lg:rounded-xl w-full form-merchandise'>
            <Form
              values={{
                ...data,
                abilitySupply: data?.abilitySupply?.quarter,
                month: data?.abilitySupply?.month,
                year: data?.abilitySupply?.year,
                brand: data?.brand ? data?.brand : '',
              }}
              className="text-color"
              columns={[
                {
                  title: '',
                  name: '',
                  formItem: {
                    col: 12,
                    render: (form, value) => {
                      return (
                        <div>
                          <p className="text-lg sm:text-xl font-bold text-teal-900 pb-4">Tổng quát</p>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Tên sản phẩm',
                  name: 'name',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Thương hiệu',
                  name: 'brand',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Nhà cung cấp',
                  name: 'supplierName',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Xuất xứ',
                  name: 'origin',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Danh mục sản phẩm',
                  name: 'category',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 12,
                    render(form, item) {
                      return (
                        <div className='w-full pb-2'>
                          <div className="mb-2">Danh mục sản phẩm</div>
                          <div className='w-full h-10 py-2.5 px-4 bg-gray-100 rounded-xl border-gray-200 flex'>
                            <p className="text-gray-400"></p>
                            {item?.category?.child ? item.category.child?.child ? item?.category?.name + ' > '
                              + item.category.child.name + ' > ' + item.category.child.child.name : item.category?.name + ' > '
                            + item.category.child.name : item?.category?.name}
                          </div>
                        </div>
                      )
                    },
                  }
                },
                {
                  title: 'Mã vạch',
                  name: 'barcode',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: '',
                  name: '',
                  formItem: {
                    tabIndex: 1,
                    col: 6,
                    render() {
                      return <div></div>;
                    },
                  },
                },
                {
                  title: 'Thuế nhập',
                  name: 'importTaxId',
                  formItem: {
                    tabIndex: 1,
                    type: 'select',
                    disabled: () => true,
                    col: 6,
                    get: {
                      facade: TaxAdminFacade,
                      format: (item: any) => ({
                        label: item.name + ' - ' + item.taxRate + '%',
                        value: item.id,
                      })
                    }
                  },
                },
                {
                  title: 'Thuế bán',
                  name: 'exportTaxId',
                  formItem: {
                    tabIndex: 1,
                    type: 'select',
                    disabled: () => true,
                    col: 6,
                    get: {
                      facade: TaxAdminFacade,
                      format: (item: any) => ({
                        label: item.name + ' - ' + item.taxRate + '%',
                        value: item.id,
                      })
                    }
                  },
                },
                {
                  title: '',
                  name: '',
                  formItem: {
                    col: 12,
                    render: () => {
                      return (
                        <div>
                          <div className="text-base my-4">Khả năng cung ứng</div>
                        </div>
                      );
                    },
                  },
                },
                {
                  title: 'Theo tháng',
                  name: 'month',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Theo quý',
                  name: 'abilitySupply',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Theo năm',
                  name: 'year',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 4,
                  },
                },
                {
                  title: 'Thị trường cuất khẩu',
                  name: 'exportMarket',
                  formItem: {
                    tabIndex: 1,
                    disabled: () => true,
                    col: 6,
                  },
                },
                {
                  title: 'Mô tả sản phẩm',
                  name: 'description',
                  formItem: {
                    disabled: () => true,
                    tabIndex: 1,
                    type: 'textarea',
                    col: 12,
                  },
                },
                {
                  title: '',
                  name: '',
                  formItem: {
                    render: () => {
                      return (
                        <div className="flex items-left font-bold">
                          <div className="sm:text-xl text-base text-teal-900 pt-0">Bảng giá dành cho cửa hàng</div>
                        </div>
                      );
                    },
                  },
                },
              ]}
            />
            <Table
              pagination={false}
              dataSource={dl}
              showSorterTooltip={false}
              size="small"
              loading={isLoading}
              className='mx-5'
              columns={[
                {
                  title: 'STT',
                  dataIndex: 'stt',
                },
                {
                  title: 'Chủng loại giá',
                  dataIndex: 'PriceType',
                },
                {
                  title: 'Số lượng tối thiểu',
                  dataIndex: 'Quantity',
                },
                {
                  title: 'Giá bán (VND)',
                  dataIndex: 'Price',
                },
              ]}
            />
            <div className="flex items-left font-bold mx-5 pt-5">
              <p className="sm:text-xl text-base text-teal-900">Chiết khấu với Balance</p>
            </div>
            <div>
              {
                productFacade.data && productFacade?.data?.priceBalanceCommission?.length ?
                  (
                    <div>
                      {data && productFacade?.data?.priceBalanceCommission?.map((item) => {
                        return item?.amountBalance === null && item?.percentBalance != null ? item?.revenue == '0' ?
                          (
                            <div className="">
                              <Form
                                columns={[
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className="flex items-center h-full text-base lg:mt-0 pb-2">
                                            <input type="radio" checked className="ant-radio-input"></input>
                                            <div className='pl-2'>{('Chiết khấu cố định')}</div>
                                          </div>
                                        );
                                      },
                                    },
                                  },
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className="flex items-center my-0.5 pl-6">
                                            <div className='text-base '>Đề nghị chiết khấu cố định</div>
                                            <input
                                              className="bg-gray-200 !ml-4 !rounded-[10px] !h-[44px] !w-[150px] !px-2 "
                                              placeholder="Nhập giá trị"
                                              type="text"
                                              value={item.percentBalance}
                                            />
                                            <span className="ml-4">%</span>
                                          </div>
                                        );
                                      },
                                    },
                                  },
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className="flex items-center h-full text-base lg:mt-0 pt-2">
                                            <input type="radio" disabled className="ant-radio-input"></input>
                                            <div className='pl-2'>{('Chiết khấu linh động')}</div>
                                          </div>
                                        );
                                      },
                                    },
                                  }
                                ]}
                              />
                            </div>
                          )
                          :
                          (
                            <div className='p-5'>
                              <Form
                                className='form-store pb-2'
                                columns={[
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className=''>
                                            <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                              <input type="radio" disabled className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu cố định')}</div>
                                            </div>
                                            <div className="flex items-center h-full text-base lg:mt-0">
                                              <input type="radio" checked className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu linh động')}</div>
                                            </div>
                                          </div>
                                        );
                                      },
                                    },
                                  }
                                ]}
                              />
                              <Form
                                className='form-store pl-6 py-4'
                                columns={[
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className=''>
                                            <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                              <input type="radio" checked className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu theo %')}</div>
                                            </div>
                                            <div className="flex items-center h-full text-base lg:mt-0">
                                              <input type="radio" disabled className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu theo số tiền')}</div>
                                            </div>
                                          </div>
                                        );
                                      },
                                    },
                                  }
                                ]}
                              />
                              <Table
                                loading={isLoading}
                                pagination={false}
                                dataSource={dt}
                                // showSorterTooltip={false}
                                size="small"
                                className="pb-6"
                                columns={[
                                  {
                                    title: 'STT',
                                    dataIndex: 'stt',
                                  },
                                  {
                                    title: 'Doanh Thu (VNĐ)',
                                    dataIndex: 'Revenue',
                                  },
                                  {
                                    title: 'Chiết khấu theo doanh thu (%)',
                                    dataIndex: 'PercentBalance',
                                  }
                                ]}
                              />
                              <div>
                                {productFacade.data?.information && productFacade.data.information.length === 0 ? "" :
                                  <div>
                                    <div className="flex items-left font-bold pt-5 border-t">
                                      <p className="sm:text-xl text-base text-teal-900">Thông tin khác</p>
                                    </div>
                                    <DataTable
                                      data={file}
                                      showSearch={false}
                                      showPagination={false}
                                      className='bg-white rounded-xl'
                                      columns={[
                                        {
                                          title: 'STT',
                                          name: 'stt',
                                          tableItem: {}
                                        },
                                        {
                                          title: 'Nội dung',
                                          name: 'Content',
                                          tableItem: {}

                                        },
                                        {
                                          title: 'File đính kèm',
                                          name: 'Url',
                                          tableItem: {
                                            render(text, item) {
                                              return (
                                                <div>
                                                  <a href={text} className='text-blue-500 ml-4 underline hover:underline hover:text-blue-500'>{item.Url.slice(109)}</a>
                                                </div>
                                              )
                                            },
                                          }
                                        },
                                      ]}
                                    />
                                  </div>
                                }
                              </div>
                            </div>
                          )
                          :
                          (
                            <div className='p-5'>
                              <Form
                                className='form-store'
                                columns={[
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className=''>
                                            <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                              <input type="radio" disabled className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu cố định')}</div>
                                            </div>
                                            <div className="flex items-center h-full text-base lg:mt-0">
                                              <input type="radio" checked className="ant-radio-input"></input>
                                              <div className='pl-2'>{('Chiết khấu linh động')}</div>
                                            </div>
                                          </div>
                                        );
                                      },
                                    },
                                  }
                                ]}
                              />
                              <Form
                                className='form-store pl-6 pt-4'
                                columns={[
                                  {
                                    title: '',
                                    name: '',
                                    formItem: {
                                      render: (form, values) => {
                                        return (
                                          <div className=''>
                                            <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                              <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                                <input type="radio" disabled className="ant-radio-input"></input>
                                              </span>
                                              <div>
                                                {('Chiết khấu theo %')}
                                              </div>
                                            </div>
                                            <div className="flex items-center h-full text-base lg:mt-0">
                                              <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                                <input type="radio" checked className="ant-radio-input"></input>
                                              </span>
                                              <div>
                                                {('Chiết khấu theo số tiền')}
                                              </div>
                                            </div>
                                          </div>
                                        );
                                      },
                                    },
                                  }
                                ]}
                              />
                              <Table
                                loading={isLoading}
                                pagination={false}
                                dataSource={dt}
                                showSorterTooltip={false}
                                size="small"
                                className="py-4 pl-6"
                                columns={[
                                  {
                                    title: 'STT',
                                    dataIndex: 'stt',
                                  },
                                  {
                                    title: 'Doanh Thu (VNĐ)',
                                    dataIndex: 'Revenue',
                                  },
                                  {
                                    title: 'Số tiền chiết khấu (VNĐ)',
                                    dataIndex: 'AmountBalance',
                                  }
                                ]}
                              />
                            </div>
                          )
                      })
                      }
                    </div>
                  )
                  :
                  (
                    <div className='p-5'>
                      <Form
                        className='form-store'
                        columns={[
                          {
                            title: '',
                            name: '',
                            formItem: {
                              render: (form, values) => {
                                return (
                                  <div className=''>
                                    <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                      <input type="radio" disabled className="ant-radio-input"></input>
                                      <div className='pl-2'>{('Chiết khấu cố định')}</div>
                                    </div>
                                    <div className="flex items-center h-full text-base lg:mt-0">
                                      <input type="radio" checked className="ant-radio-input"></input>
                                      <div className='pl-2'>{('Chiết khấu linh động')}</div>
                                    </div>
                                  </div>
                                );
                              },
                            },
                          }
                        ]}
                      />
                      <Form
                        className='form-store pl-6 pt-4'
                        columns={[
                          {
                            title: '',
                            name: '',
                            formItem: {
                              render: (form, values) => {
                                return (
                                  <div className=''>
                                    <div className="flex items-center h-full text-base lg:mt-0 pb-4">
                                      <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                        <input type="radio" disabled className="ant-radio-input"></input>
                                      </span>
                                      <div>
                                        {('Chiết khấu theo %')}
                                      </div>
                                    </div>
                                    <div className="flex items-center h-full text-base lg:mt-0">
                                      <span className="ant-radio ant-radio-checked ant-radio-disabled pr-2">
                                        <input type="radio" checked className="ant-radio-input"></input>
                                      </span>
                                      <div>
                                        {('Chiết khấu theo số tiền')}
                                      </div>
                                    </div>
                                  </div>
                                );
                              },
                            },
                          }
                        ]}
                      />
                      <DataTable
                        data={dt}
                        showSearch={false}
                        showPagination={false}
                        className='bg-white rounded-xl'
                        columns={[
                          {
                            title: 'STT',
                            name: 'stt',
                            tableItem: {}

                          },
                          {
                            title: 'Doanh Thu (VNĐ)',
                            name: 'Revenue',
                            tableItem: {}
                          },
                          {
                            title: 'Số tiền chiết khấu (VNĐ)',
                            name: 'AmountBalance',
                            tableItem: {}
                          }
                        ]}
                      />
                    </div>
                  )
              }
            </div>
          </div>
        </div>
        <div className='p-5'>
          {productFacade.data && productFacade?.data?.approveStatus === 'WAITING_APPROVE' ?
            (
              <div className='sm:flex sm:justify-between flex-row-reverse'>
                <div className='mb-2 sm:mb-0 form-merchandise-detail form-merchandise-detail2'>
                  <Button
                    text={t('Từ chối yêu cầu')}
                    className={'md:min-w-[8rem] justify-center !bg-red-500 max-sm:w-3/5 sm:mr-5'}
                    onClick={() => Message.confirm({
                      title: 'Thông báo',
                      text: 'Bạn có chắc muốn từ chối sản phẩm này ?',
                      cancelButtonColor: '',
                      cancelButtonText: "Huỷ",
                      confirmButtonColor: '#134e4a',
                      showCloseButton: true,
                      showConfirmButton: true,
                      onConfirm() {
                        setA(data?.id)
                        modalformRef?.current?.handleEdit({ id: data?.id })
                      },
                    })}
                  />
                  <Button
                    text={t('Phê duyệt yêu cầu')}
                    className={'md:min-w-[8rem] justify-center !bg-teal-900 w-3/5 sm:w-auto mb-2 sm:mb-0'}
                    onClick={() => productFacade.putProduct({ id })
                    }
                  />
                </div>
                <div className='form-merchandise-detail'>
                  <Button
                    text={t('components.form.modal.cancel')}
                    className={'sm:min-w-[8rem] justify-center out-line !border-black max-sm:w-3/5'}
                    onClick={() => navigate(`/${lang}${routerLinks('inventory-management/product')}`)}
                  />
                </div>
                {/* <div>
                  <Button
                    text={t('Từ chối yêu cầu')}
                    className={'md:min-w-[8rem] justify-center !bg-red-500 max-sm:w-3/5 mr-5'}
                    onClick={() => Message.confirm({
                      title: 'Thông báo',
                      text: 'Bạn có chắc muốn từ chối sản phẩm này ?',
                      cancelButtonColor: '',
                      cancelButtonText: "Huỷ",
                      confirmButtonColor: '#134e4a',
                      showCloseButton: true,
                      showConfirmButton: true,
                      onConfirm() {
                        setA(data?.id)
                        modalformRef?.current?.handleEdit({ id: data?.id })
                      },
                    })}
                  />
                  <Button
                    text={t('Phê duyệt yêu cầu')}
                    className={'md:min-w-[8rem] justify-center !bg-teal-900 max-sm:w-3/5'}
                    onClick={() => productFacade.putProduct({ id })
                    }
                  />
                </div> */}
              </div>
            )
            : (
              <div className='flex items-center justify-center mt-9 sm:mt-2 sm:block'>
                <Button
                  text={t('components.form.modal.cancel')}
                  className={'sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
                  onClick={() => navigate(`/${lang}${routerLinks('inventory-management/product')}`)}
                />
              </div>
            )
          }
          <ModalForm
            keyState=''
            facade={productFacade}
            className="form"
            ref={modalformRef}
            keyPut='putProductreject'
            widthModal={600}
            title={(data) => ''}
            columns={[
              {
                title: '',
                name: '',
                formItem: {
                  render: (form, values) => {
                    return (
                      <div className='flex flex-col'>
                        <p className='text-5xl flex mb-2 justify-center'>Thông báo</p>
                        <div className='text-base text-gray-600 flex justify-center mb-5'>Bạn có chắc muốn từ chối phê duyệt sản phẩm này?</div>
                      </div>
                    )
                  }
                }
              },
              {
                title: 'Lý do',
                name: 'rejectReason',
                formItem: {
                  type: 'select',
                  rules: [{ type: 'required', message: '' }],
                  list: listOptionreason?.map((item) => ({
                    label: item.label,
                    value: item.value!
                  })),
                }
              },
              {
                title: '',
                name: 'reason',
                formItem: {
                  type: 'textarea',
                  placeholder: 'Vui lòng nhập lý do của bạn',
                  rules: [{ type: 'required', message: 'Hãy điền lý do của bạn !' }],
                }
              },
              {
                title: '',
                name: 'id',
                formItem: {
                  type: 'hidden',
                }
              }
            ]}
            footerCustom={(handleOk, handleCancel) => (
              <div className="flex gap-2">
                <button
                  className="!rounded-none !w-auto border-teal-900 text-teal-900 hover:bg-gray-300 bg-white"
                  onClick={handleCancel}
                >
                  {t('Hủy')}
                </button>
                <button
                  className="!rounded-none !w-auto border-teal-900 text-white hover:bg-teal-900 bg-teal-800"
                  onClick={handleOk}
                >
                  {t('Đồng ý')}
                </button>
              </div>
            )}
          />
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
