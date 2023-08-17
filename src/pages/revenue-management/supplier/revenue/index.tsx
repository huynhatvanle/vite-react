import React, { Fragment, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Tag } from '@svgs';
import { GlobalFacade, OrdersFacade } from '@store';
import { Button } from '@core/button';
import Select from 'antd/es/select';
import { lang, routerLinks } from '@utils';

const Page = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();
    const isReload = useRef(false);
    const ordersFacade = OrdersFacade();
    const { formatDate } = GlobalFacade();
    const { data, queryParams } = ordersFacade;
    const param = JSON.parse(queryParams || '{}');
    const { id } = useParams();

    useEffect(() => {
        if (id) {
            ordersFacade.getById({ id })
        }
        return () => {
            isReload.current && ordersFacade.getById(param);
        };
    }, [id]);

    return (
        <div className='bg-white w-full p-5 pt-0 rounded-xl relative'>
            {!!data && (
                <>
                    <div className='flex flex-col sm:flex-row items-center'>
                        <p className='text-xl font-bold text-teal-900 pt-4 sm:py-4 mr-5'>Thông tin đơn hàng</p>
                        <div className='flex gap-1'>
                            <Tag className='w-5 h-5 fill-green-600' />
                            <p className='text-green-600'>{data.status == 'DELIVERED' ? 'Đã giao' : ''}</p>
                        </div>
                    </div>
                    <div className='w-full lg:flex lg:flex-row text-base'>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black lg:w-40 w-52'>Mã đơn hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.code}</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black lg:w-40 w-52'>Tên cửa hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.store?.name}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black w-52'>Thời gian đặt hàng:</p>
                                <p className='mt-4 sm:mt-0'>{dayjs(data?.createdAt).format('hh:mm - DD/MM/YYYY')}</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black w-52'>Số điện thoại:</p>
                                <p className='mt-4 sm:mt-0'>{data?.storeAdmin?.phoneNumber}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-full lg:flex lg:flex-row text-base'>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black lg:w-40 w-52'>Ngày nhận hàng:</p>
                                <p className='mt-4 sm:mt-0'>{dayjs(data?.deliveredAt).format(formatDate).replace(/-/g, '/')}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black w-52 flex-none'>Địa chỉ giao hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.store?.address?.street + ', ' + data?.store?.address?.ward?.name + ', ' + data?.store?.address?.district?.name + ', ' + data?.store?.address?.province?.name}</p>
                            </div>
                        </div>
                    </div>
                    <div className='w-1/2 lg:flex lg:flex-row text-base'>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black lg:w-40 w-52'>Vouchers:</p>
                                <p className='mt-4 sm:mt-0'></p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center sm:justify-between flex-col sm:flex-row pt-2 border-t'>
                        <p className='text-base font-bold text-teal-900 pt-3 pb-4 sm:py-0'>Chi tiết đơn hàng</p>
                        <Select value={'Áp dụng thuế'} className="w-full sm:w-60" showSearch={true} disabled>
                        </Select>
                    </div>
                    <div className="overflow-x-auto">
                        {/* <DataTable
                            data={data?.orderLineItem}
                            xScroll='1024px'
                            className='table-custom'
                            columns={[
                                {
                                    title: 'product.Code',
                                    name: 'product',
                                    tableItem: {
                                        render: (text, item) => item?.product?.code
                                    }
                                },
                                {
                                    title: 'product.Name',
                                    name: 'product',
                                    tableItem: {
                                        render: (text, item) => item?.product?.name
                                    }
                                },
                                {
                                    title: 'product.Unit',
                                    name: 'product',
                                    tableItem: {
                                        render: (text, item) => item?.product?.basicUnit
                                    }
                                },
                                {
                                    title: 'product.UnitPrice',
                                    name: 'price',
                                    tableItem: {
                                        render: (text, item) => parseInt(text).toLocaleString()
                                    }
                                },
                                {
                                    title: 'product.Quantity',
                                    name: 'quantity',
                                    tableItem: {
                                    }
                                },
                                {
                                    title: 'store.Revenue.Total amount (VND)',
                                    name: 'subTotal',
                                    tableItem: {
                                        render: (text, item) => parseInt(text).toLocaleString()
                                    }
                                },
                                {
                                    title: 'titles.Tax',
                                    name: 'tax',
                                    tableItem: {
                                        render: (text, item) => text + '%'
                                    }
                                },
                                {
                                    title: 'product.TotalAmount',
                                    name: 'total',
                                    tableItem: {
                                        render: (text, item) => parseInt(text).toLocaleString()
                                    }
                                },
                            ]}
                            showSearch={false}
                            showPagination={false}
                        /> */}
                        <table className="lg:table-auto w-[850px] sm:w-[900px] lg:w-[95%] mx-5 text-gray-700">
                            <thead>
                                <tr className="text-left border-b gap-2">
                                    <th className="py-5 font-normal mr-1">{t('product.Code')}</th>
                                    <th className="py-5 font-normal mr-1">{t('product.Name')}</th>
                                    <th className="py-5 font-normal mr-1">{t('product.Unit')}</th>
                                    <th className="py-5 font-normal mr-1">{t('product.UnitPrice')}</th>
                                    <th className="py-5 font-normal mr-1">{t('product.Quantity')}</th>
                                    <th className="py-5 font-normal mr-1">{t('supplier.Order.Total Amount')}</th>
                                    <th className="py-5 font-normal mr-1">{t('titles.Tax')}</th>
                                    <th className="py-5 font-normal">{t('product.TotalAmount')}</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.orderLineItem?.map((item) => (
                                    <tr className="text-left">
                                        <td className="py-5">{item?.product?.code}</td>
                                        <td className="py-5">{item?.product?.name}</td>
                                        <td className="py-5">{item?.product?.basicUnit}</td>
                                        <td className="py-5">{parseInt(item?.price!).toLocaleString()}</td>
                                        <td className="py-5">{item?.quantity}</td>
                                        <td className="py-5">{parseInt(item?.subTotal ? item.subTotal : '0').toLocaleString()}</td>
                                        <td className="py-5">{item?.tax + '%'}</td>
                                        <td className="py-5">{parseInt(item?.total ? item.total : '0').toLocaleString()}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col items-end w-full sm:w-3/4 md:w-1/2 lg:w-2/5 ml-auto'>
                        <div className='flex flex-row float-right mt-7 justify-between w-full'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền trước thuế:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(data?.totalReceived!).toLocaleString() + ' VND'}</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền thuế:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(data?.totalTax!).toLocaleString() + ' VND'}</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền sau thuế:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(data?.totalReceived!).toLocaleString() + ' VND'}</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Chiết khấu:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">0 VND</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(data?.total!).toLocaleString() + ' VND'}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex mx-auto sm:justify-between justify-center sm:w-auto mt-10 '>
                        <Button
                            text={t('components.form.modal.cancel')}
                            className={'sm:w-32 justify-center out-line w-1/2 mt-4 '}
                            onClick={() => {
                                navigate(`/${lang}${routerLinks('revenue-management/supplier')}`)
                            }}
                        />
                    </div>
                </>
            )
            }
        </div>
    );
};
export default Page;
