import React, { Fragment, useEffect, useRef, useState } from 'react';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Select } from 'antd';

import { Tag } from '@svgs';
import { GlobalFacade, InventoryOrderFacade } from '@store';
import { Button } from '@core/button';
import { lang, routerLinks } from '@utils';

const Page = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isReload = useRef(false);
    const inventoryOrderFacade = InventoryOrderFacade();
    const { formatDate } = GlobalFacade();
    const { data, queryParams } = inventoryOrderFacade;
    const param = JSON.parse(queryParams || '{}');
    const { id } = useParams();

    let totalAmount = 0
    let tax = 0
    let total = 0

    useEffect(() => {
        if (id) {
            inventoryOrderFacade.getById({ id })
        }
        return () => {
            isReload.current && inventoryOrderFacade.getById(param);
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
                            <p className='text-green-600 text-base'>{data.status == 'COMPLETED' ? 'Đã hoàn tất' : ''}</p>
                        </div>
                    </div>
                    <div className='w-full lg:flex lg:flex-row text-base'>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black mr-4'>Mã đơn hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.code}</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black mr-4'>Tên cửa hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.detailProduct?.map((item) => item.supplier?.name)}</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black mr-4'>Thời gian trả hàng:</p>
                                <p className='mt-4 sm:mt-0'>{dayjs(data?.issuedAt).format(formatDate).replace(/-/g, '/')}</p>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex flex-row mb-5 opacity-0'>
                                <p className='font-bold text-black w-52'>Mã nhập hàng:</p>
                                <p className='mt-4 sm:mt-0'>15:21 - 28/12/2022</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5 opacity-0'>
                                <p className='font-bold text-black w-52'>Nhà cung cấp:</p>
                                <p className='mt-4 sm:mt-0'>45645688567</p>
                            </div>
                            <div className='w-full sm:flex flex-row mb-5'>
                                <p className='font-bold text-black mr-4 flex-none'>Lý do trả hàng:</p>
                                <p className='mt-4 sm:mt-0'>{data?.reason}</p>
                            </div>
                        </div>
                    </div>
                    <div className='flex items-center sm:justify-between flex-col sm:flex-row pt-2 border-t'>
                        <p className='text-base font-bold text-teal-900 pt-3 pb-4 sm:py-0'>Chi tiết trả hàng</p>
                        <Select value={'Áp dụng thuế'} className="w-full sm:w-60" showSearch={true} disabled>
                        </Select>
                    </div>
                    <div className="overflow-x-auto">
                        <table className=" h-16 w-[1300px] mx-5 text-gray-700 mb-auto">
                            <thead>
                                <tr className="text-left border-b gap-2">
                                    <th className="py-5 font-normal mr-1">{t('store.Inventory management.Barcode (Product)')}</th>
                                    <th className="py-5 font-normal mr-1">{t('store.Inventory management.Barcode (Supplier)')}</th>
                                    <th className="py-5 font-normal mr-1">{t('store.Inventory management.Product name')}</th>
                                    <th className="py-5 font-normal mr-1">ĐVT</th>
                                    <th className="py-5 font-normal mr-1">{t('store.Inventory management.Unit')}</th>
                                    <th className="py-5 font-normal mr-1">SL trả</th>
                                    <th className="py-5 font-normal mr-1">{t('store.Inventory management.Total amount')}</th>
                                    <th className="py-5 font-normal">{t('titles.Tax')}</th>
                                    <th className="py-5 font-normal">Tiền sau thuế</th>
                                </tr>
                            </thead>
                            <tbody>
                                {data?.detailProduct?.map((item) => {
                                    totalAmount = totalAmount + parseInt(item?.amount!)
                                    tax = tax + parseInt(item?.amount!) * parseInt(item?.tax!) / 100
                                    total = parseInt((parseInt(item?.amount!) * parseInt(item?.tax!) / 100 + parseInt(item?.amount!)).toString())
                                    return (
                                        <tr className="text-left">
                                            <td className="py-5">{item?.storeBarcode}</td>
                                            <td className="py-5">{item?.barcode}</td>
                                            <td className="py-5">{item?.name}</td>
                                            <td className="py-5">{item.unit}</td>
                                            <td className="py-5">{parseInt(item?.price!).toLocaleString()}</td>
                                            <td className="py-5">{item?.quantity}</td>
                                            <td className="py-5">{parseInt(item?.amount!).toLocaleString()}</td>
                                            <td className="py-5">{item?.tax + '%'}</td>
                                            <td className="py-5">{parseInt((parseInt(item?.amount!) * parseInt(item?.tax!) / 100 + parseInt(item?.amount!)).toString()).toLocaleString()}</td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                    <div className='flex flex-col items-end w-full sm:w-3/4 md:w-1/2 lg:w-2/5 ml-auto'>
                        <div className='flex flex-row float-right mt-7 justify-between w-full'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền hàng:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(data?.total!).toLocaleString() + ' VND'}</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tiền thuế:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(tax.toString()).toLocaleString()}</p>
                            </div>
                        </div>
                        <div className='flex flex-row float-right justify-between w-full mt-2'>
                            <div className='mr-10'>
                                <p className='text-teal-900 font-bold text-base'>Tổng tiền sau thuế:</p>
                            </div>
                            <div className='text-right'>
                                <p className="text-teal-900 font-bold text-base">{parseInt(total.toString()).toLocaleString()}</p>
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
