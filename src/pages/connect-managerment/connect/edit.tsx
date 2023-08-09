import React, { Fragment, useEffect, useRef } from 'react';
import { Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { UserRoleFacade, ConnectFacade, User, GlobalFacade, ConfirmFacade } from '@store';
import { language, languages, routerLinks } from '@utils';
import dayjs from 'dayjs';
import { Button } from '@core/button';
import { ModalForm } from '@core/modal/form';
import { DataTable } from '@core/data-table';
import { isNull } from 'cypress/types/lodash';

const Page = () => {
    let stt = 1;
    const modalFormRef = useRef<any>();
    const modalFormRefxemgia = useRef<any>();
    const { t } = useTranslation();
    const connectFacade = ConnectFacade();
    const confirmFacade = ConfirmFacade()
    const { data, isLoading, queryParams, status } = connectFacade;
    const navigate = useNavigate();
    const isBack = useRef(true);
    const isReload = useRef(false);
    const param = JSON.parse(queryParams || '{}');
    const { id } = useParams();
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
    const { formatDateTime } = GlobalFacade();
    const listReason = [
        {
            label: t('supplier.Sup-Status.Sell goods'),
            value: 'Yêu cầu không phù hợp với cửa hàng',
        },
        {
            label: t('supplier.Sup-Status.Return goods'),
            value: 'Sản phẩm chưa có nhà cung cấp',
        },
        {
            label: t('supplier.Sup-Status.Cancelled'),
            value: 'Khác',
        },
    ];
    useEffect(() => {

        if (id) connectFacade.getById({ id });

        return () => {
            isReload.current && connectFacade.get(param);
        };
    }, [id, data]);

    useEffect(() => {
        switch (confirmFacade.status) {
            case 'putConfirm.fulfilled':
                if (Object.keys(param).length > 0) isReload.current = true;

                if (isBack.current) handleBack();
                else {
                    isBack.current = true;
                }
                break;
        }
    }, [confirmFacade.status]);

    const handleBack = () => navigate(`/${lang}${routerLinks('Connect')}?${new URLSearchParams(param).toString()}`);
    const handleSubmit = () => {
        const storeRequestId = data?.id
        confirmFacade.put({ storeRequestId });
    };
    const handleDelete = () => {
        const storeRequestId = data?.id
        confirmFacade.put({ storeRequestId });
    };
    return (
        <Fragment>
            {data?.status === 'APPROVED' ? (
                <div className='bg-white w-full px-4 rounded-xl mt-5 relative sm:pb-5' >
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5'}>{t('titles.requestdetail')}</div>
                    <div className='w-full sm:flex sm:flex-row border-b'>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Mã yêu cầu:</div>
                                <div>{data?.code}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Trạng thái:</div>
                                <div>{data?.status}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Tên sản phẩm:</div>
                                <div>{data?.productName}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày yêu cầu:</div>
                                <div>{dayjs(data?.approvedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày phê duyệt:</div>
                                <div>{dayjs(data?.requestedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none '>Yêu cầu chi tiết về sản phẩm:</div>
                                <div>{data?.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5  '}>{t('titles.informationstore')}</div>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Cửa hàng:</div>
                                <div>{data?.store?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Tên chủ cửa hàng:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                                <div>{data?.store?.fax}</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base  border-b'>
                        <div className='font-bold text-teal-900 w-36  mb-5 '>Địa chỉ:</div>
                        <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
                    </div>
                    {/* <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstoreRequestSupplier')}</div> */}
                    {/* <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base '>
                                <div className='font-bold text-teal-900 w-36'>Nhà cung cấp:</div>
                                <div>{data?.storeRequestSupplier?.[0]?.supplier?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                                <div>{data?.storeRequestSupplier?.[0]?.supplier?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Chủ nhà cung cấp:</div>
                                <div>{data?.storeRequestSupplier?.[0]?.supplier?.userRole?.[0]?.userAdmin?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                                <div>{data?.storeRequestSupplier?.[0]?.supplier?.fax}</div>
                            </div>

                        </div>
                    </div>
                    <div className='w-full flex flex-row mb-5 text-base border-b'>
                        <div className='font-bold text-teal-900 w-36'>Địa chỉ:</div>
                        <div>{data?.storeRequestSupplier?.[0]?.supplier?.address?.street},{data?.storeRequestSupplier?.[0]?.supplier?.address?.ward?.name},{data?.storeRequestSupplier?.[0]?.supplier?.address?.district?.name},{data?.storeRequestSupplier?.[0]?.supplier?.address?.province?.name}</div>
                    </div> */}
                    <Button
                        text={t('components.form.modal.cancel')}
                        className={'button sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
                        onClick={handleBack}
                    />
                </div>
            ) : (data?.status === 'WAITING_ADMIN') ? (
                <div className='bg-white w-full px-4 rounded-xl mt-5 relative sm:pb-5' >
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5'}>{t('titles.requestdetail')}</div>
                    <div className='w-full sm:flex sm:flex-row border-b'>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Mã yêu cầu:</div>
                                <div>{data?.code}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Trạng thái:</div>
                                <div>{data?.status}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Tên sản phẩm:</div>
                                <div>{data?.productName}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày yêu cầu:</div>
                                <div>{dayjs(data?.approvedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày phê duyệt:</div>
                                <div>{dayjs(data?.requestedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none '>Yêu cầu chi tiết về sản phẩm:</div>
                                <div>{data?.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstore')}</div>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Cửa hàng:</div>
                                <div>{data?.store?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Tên chủ cửa hàng:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                                <div>{data?.store?.fax}</div>
                            </div>

                        </div>
                    </div>
                    <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base  border-b'>
                        <div className='font-bold text-teal-900 w-36  mb-5 '>Địa chỉ:</div>
                        <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstoreRequestSupplier')}</div>
                    {data?.storeRequestSupplier?.length === 0 ? ("") : (<div>
                        <DataTable
                            data={data.storeRequestSupplier}
                            defaultRequest={{ page: 1, perPage: 10 }}
                            xScroll='1440px'
                            className=' bg-white p-5 rounded-lg'
                            // onRow={(data: any) => ({
                            //     onDoubleClick: () => {

                            //         navigate(`/${lang}${routerLinks('connect-managerment/connect')}/${data.id}`)

                            //     },
                            // })}
                            showSearch={false}
                            showPagination={false}
                            columns={[
                                {
                                    title: 'tax.stt',
                                    name: 'stt',
                                    tableItem: {
                                        width: 70,
                                        render: () => `${stt++}`
                                    },
                                },
                                {
                                    title: 'Tên nhà cung cấp',
                                    name: 'supplier',
                                    tableItem: {
                                        render: (text, item) => item?.supplier?.name,
                                    },
                                },

                                {
                                    title: 'Địa chỉ',
                                    name: 'store',
                                    tableItem: {
                                        render: (text, item) => item?.supplier?.address?.street + ', ' + item?.supplier?.address?.ward?.name + ', ' + item?.supplier?.address?.district?.name + ', ' + item?.supplier?.address?.province?.name

                                    },
                                },
                                {
                                    title: 'store.productName',
                                    name: 'productName',
                                    tableItem: {
                                        render: (text, item) => item?.product?.name
                                    },
                                },
                                {
                                    title: 'Giá bán lẻ(VNĐ)',
                                    name: 'requestedAt',
                                    tableItem: {
                                        render: (text, item) => item?.product?.productPrice?.[0]?.price
                                    },
                                },
                                {
                                    title: 'Bảng giá',
                                    name: 'approvedAt',
                                    tableItem: {
                                        render: (text, item) =>
                                        (
                                            <>
                                                <Button
                                                    className='!bg-white !border-teal-900 hover:!border-teal-600 !border-solid !border !rounded-xl !text-teal-900 hover:!text-teal-600 p-2 priceBtn min-w-[83px]'
                                                    text={t('Xem giá')}
                                                    onClick={() => modalFormRefxemgia?.current?.handleEdit()}
                                                />
                                            </>

                                        )
                                    },

                                },
                                {
                                    title: 'Thao tác',
                                    name: 'status',
                                    tableItem: {
                                        render: (text, item) =>
                                        (

                                            <Button
                                                className='!bg-white !border-red-500 hover:!border-red-400 !border-solid !border  !rounded-xl !text-red-400 hover:!text-red-300 p-2 hover:cursor-pointer deleteBtn'
                                                text={t('Xóa')}
                                                onClick={() => modalFormRef?.current?.handleEdit()}
                                            />
                                        )
                                    },
                                },
                            ]}

                        />
                        <ModalForm
                            facade={connectFacade}
                            ref={modalFormRefxemgia}
                            title={(data: any) => t('Xem giá')}
                            className='z'
                            columns={[
                               
                            ]}
                            widthModal={600}
                            footerCustom={(handleOk, handleCancel) => (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        text={t('components.form.modal.cancel')}
                                        className="!bg-white !text-teal-900 btn-cancel"
                                        onClick={handleCancel}
                                    />
                                </div>
                            )}
                        />
                    </div>)}

                    <div className='justify-between flex'>
                        <Button
                            text={t('components.form.modal.cancel')}
                            className={'button sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto !h-[40px]'}
                            onClick={handleBack}
                        />
                        <div>
                            <>
                                <Button
                                    className=' !bg-red-500 text-white text-base p-2 rounded-xl hover:!bg-red-400 mt-1 mx-5 !h-[40px] !font-normal'
                                    text={t('Từ chối yêu cầu')}
                                    onClick={() => modalFormRef?.current?.handleEdit()}
                                />
                                <ModalForm
                                    keyState=''
                                    facade={connectFacade}
                                    ref={modalFormRef}
                                    title={(data: any) => t('Từ chối yêu cầu sản phẩm')}
                                    className='z'
                                    columns={[
                                        {
                                            title: 'Lý do',
                                            name: 'reason',
                                            formItem: {
                                                type: 'select',
                                                list: listReason,
                                            }
                                        },
                                        {
                                            title: 'Chi tiết',
                                            name: 'note',
                                            formItem: {
                                                type: 'textarea',
                                                rules: [{ type: 'textarea' }]
                                            }
                                        }
                                    ]}
                                    widthModal={600}
                                    footerCustom={(handleOk, handleCancel) => (
                                        <div className="flex justify-end gap-2">
                                            <Button
                                                text={t('components.form.modal.cancel')}
                                                className="!bg-white !text-teal-900 btn-cancel"
                                                onClick={handleCancel}
                                            />
                                            <Button
                                                isLoading={isLoading}
                                                text={'Gửi'}
                                                className="!bg-red-600 !border-red-600 "
                                                onClick={handleOk}
                                            />
                                        </div>
                                    )}
                                />
                            </>

                            <Button
                                className='!bg-teal-900 text-white text-base p-2 rounded-xl hover:!bg-teal-600 mt-1 !h-[40px] !font-normal'
                                text={t('Phê duyệt yêu cầu')}
                                onClick={() => handleSubmit()}
                            />
                        </div>
                    </div>

                </div>
            ) : (data?.status === 'WAITING_STORE') ? (
                <div className='bg-white w-full px-4 rounded-xl mt-5 relative sm:pb-5' >
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5'}>{t('titles.requestdetail')}</div>
                    <div className='w-full sm:flex sm:flex-row border-b'>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Mã yêu cầu:</div>
                                <div>{data?.code}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Trạng thái:</div>
                                <div>{data?.status}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Tên sản phẩm:</div>
                                <div>{data?.productName}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày yêu cầu:</div>
                                <div>{dayjs(data?.approvedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày phê duyệt:</div>
                                <div>{dayjs(data?.requestedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none '>Yêu cầu chi tiết về sản phẩm:</div>
                                <div>{data?.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstore')}</div>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Cửa hàng:</div>
                                <div>{data?.store?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Tên chủ cửa hàng:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                                <div>{data?.store?.fax}</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base border-b'>
                        <div className='font-bold text-teal-900 w-36  mb-5 '>Địa chỉ:</div>
                        <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.SupplierList')}</div>
                    {data?.storeRequestSupplier?.length === 0 ? ("") : (<div>
                        <DataTable
                            data={data.storeRequestSupplier}
                            defaultRequest={{ page: 1, perPage: 10 }}
                            xScroll='1440px'
                            className=' bg-white p-5 rounded-lg'
                            // onRow={(data: any) => ({
                            //     onDoubleClick: () => {

                            //         navigate(`/${lang}${routerLinks('connect-managerment/connect')}/${data.id}`)

                            //     },
                            // })}
                            showSearch={false}
                            showPagination={false}
                            columns={[
                                {
                                    title: 'tax.stt',
                                    name: 'stt',
                                    tableItem: {
                                        width: 70,
                                        render: () => `${stt++}`
                                    },
                                },
                                {
                                    title: 'Tên nhà cung cấp',
                                    name: 'supplier',
                                    tableItem: {
                                        render: (text, item) => item?.supplier?.name,
                                    },
                                },

                                {
                                    title: 'Địa chỉ',
                                    name: 'store',
                                    tableItem: {
                                        render: (text, item) => item?.supplier?.address?.street + ', ' + item?.supplier?.address?.ward?.name + ', ' + item?.supplier?.address?.district?.name + ', ' + item?.supplier?.address?.province?.name

                                    },
                                },
                                {
                                    title: 'store.productName',
                                    name: 'productName',
                                    tableItem: {
                                        render: (text, item) => item?.product?.name
                                    },
                                },
                                {
                                    title: 'Giá bán lẻ(VNĐ)',
                                    name: 'requestedAt',
                                    tableItem: {
                                        render: (text, item) => item?.product?.productPrice?.[0]?.price
                                    },
                                },
                                {
                                    title: 'Bảng giá',
                                    name: 'approvedAt',
                                    tableItem: {
                                        render: (text, item) =>
                                        (
                                            <>
                                                <Button
                                                    className='!bg-white !border-teal-900 hover:!border-teal-600 !border-solid !border !rounded-xl !text-teal-900 hover:!text-teal-600 p-2 priceBtn min-w-[83px]'
                                                    text={t('Xem giá')}
                                                    onClick={() => modalFormRefxemgia?.current?.handleEdit()}
                                                />
                                            </>

                                        )
                                    },

                                },
                            ]}

                        />
                        <ModalForm
                        keyState=''
                            facade={connectFacade}
                            ref={modalFormRefxemgia}
                            title={(data: any) => t('Xem giá')}
                            className='z'
                            columns={[
                                
                            ]}
                            
                            footerCustom={(handleOk, handleCancel) => (
                                <div className="flex justify-end gap-2">
                                    <Button
                                        text={t('components.form.modal.cancel')}
                                        className="!bg-white !text-teal-900 btn-cancel"
                                        onClick={handleCancel}
                                    />
                                </div>
                            )}
                        />
                    </div>)}                    
                    <Button
                        text={t('components.form.modal.cancel')}
                        className={'!bg-white !border-teal-900 hover:!border-teal-600 !border-solid !border !rounded-xl !text-teal-900 hover:!text-teal-600 p-2 priceBtn min-w-[83px] '}
                        onClick={handleBack}
                    />
                </div>
            ) : (
                <div className='bg-white w-full px-4 rounded-xl mt-5 relative sm:pb-5' >
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5'}>{t('titles.requestdetail')}</div>
                    <div className='w-full sm:flex sm:flex-row border-b'>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Mã yêu cầu:</div>
                                <div>{data?.code}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Trạng thái:</div>
                                <div>{data?.status}</div>
                            </div>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36 '>Tên sản phẩm:</div>
                                <div>{data?.productName}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full flex flex-row mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày yêu cầu:</div>
                                <div>{dayjs(data?.requestedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none '>Yêu cầu chi tiết về sản phẩm:</div>
                                <div>{data?.description}</div>
                            </div>
                        </div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstore')}</div>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Cửa hàng:</div>
                                <div>{data?.store?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                            </div>

                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Tên chủ cửa hàng:</div>
                                <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                                <div>{data?.store?.fax}</div>
                            </div>
                        </div>
                    </div>
                    <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base  border-b'>
                        <div className='font-bold text-teal-900 w-36  mb-5 '>Địa chỉ:</div>
                        <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
                    </div>
                    <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('Chi tiết')}</div>
                    <div className='flex w-full'>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Ngày phản hồi:</div>
                                <div>{dayjs(data?.requestedAt).format(formatDateTime)}</div>
                            </div>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-36'>Lý do:</div>
                                <div>{data?.reason}</div>
                            </div>
                        </div>
                        <div className='w-full'>
                            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                                <div className='font-bold text-teal-900 w-54 flex-none'>Từ chối bởi:</div>
                                <div>Quản trị viên</div>
                            </div>
                        </div>

                    </div>
                    <Button
                        text={t('components.form.modal.cancel')}
                        className={'button sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
                        onClick={handleBack}
                    />
                </div>

            )
            }

        </Fragment>
    );
};
export default Page;
