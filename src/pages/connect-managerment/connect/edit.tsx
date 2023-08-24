import React, { Fragment, useEffect, useRef } from 'react';
import { Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { ProductFacade, ConnectFacade, User, GlobalFacade, ConfirmFacade } from '@store';
import { language, languages, routerLinks } from '@utils';
import dayjs from 'dayjs';
import { Button } from '@core/button';
import { ModalForm } from '@core/modal/form';
import { DataTable } from '@core/data-table';
import { isNull, values } from 'cypress/types/lodash';

const Page = () => {
    let stt = 1;
    let stt1 = 0;
    const modalFormRef = useRef<any>();
    const modalFormRefclick = useRef<any>();
    const modalFormRefxemgia = useRef<any>();
    const { t } = useTranslation();
    const connectFacade = ConnectFacade();
    const confirmFacade = ConfirmFacade();
    const productFacade = ProductFacade();
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
            case 'deleteConfirm.fulfilled':
                if (id) connectFacade.getById({ id });

                return () => {
                    isReload.current && connectFacade.get(param);
                };
        }
    }, [confirmFacade.status]);

    const handleBack = () => navigate(`/${lang}${routerLinks('Connect')}?${new URLSearchParams(param).toString()}`);
    const handleSubmit = () => {
        const storeRequestId = data?.id
        confirmFacade.put({ storeRequestId });
    };
    const handleDelete = (id: any) => {

        confirmFacade.delete({ id: id });
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
                                <div>{t('store.status.APPROVED')}</div>
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
                        className={'!z-10 !px-8 !sm:w-auto w-28 !bg-white !border-teal-900 !hover:border-teal-600 !border-solid !border !p-2 !rounded-xl !text-teal-900 !hover:text-teal-600 !sm:mt-1 !mt-2 !text-sm !h-10'}
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
                                <div>{t('store.status.WAITING_ADMIN')}</div>
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
                            onRow={(data: any) => ({
                                onDoubleClick: () => modalFormRefclick?.current?.handleEdit({ id: data.id }),
                            })}
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
                                                    onClick={() => modalFormRefxemgia?.current?.handleEdit({ id: item?.product?.id })}
                                                />
                                                <ModalForm
                                                    keyState=''
                                                    facade={productFacade}
                                                    ref={modalFormRefxemgia}
                                                    title={(data: any) => t('Xem giá')}
                                                    className='z form'
                                                    columns={[
                                                        {
                                                            title: 'STT',
                                                            name: 'reason',
                                                            formItem: {
                                                                render: (form, values) => {
                                                                    return (
                                                                        <>
                                                                            <div className="sm:pt-2 border-t">
                                                                                <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                                                    <div className="w-1/2 flex">
                                                                                        <div className="font-semibold text-teal-900 ">Tên sản phẩm:</div>
                                                                                        <div className="ml-4">{values?.name}</div>
                                                                                    </div>
                                                                                    <div className="w-1/2 flex">
                                                                                        <div className="font-semibold text-teal-900 ">Nhà cung cấp:</div>
                                                                                        <div className="ml-4">
                                                                                            {values?.subOrg?.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                                                    <div className="font-semibold text-teal-900 ">Đơn vị cơ bản:</div>
                                                                                    <div className="ml-4">{values?.basicUnit}</div>
                                                                                </div>
                                                                            </div>
                                                                            <DataTable
                                                                                data={values.productPrice}
                                                                                xScroll='1440px'
                                                                                className=' bg-white p-5 rounded-lg'
                                                                                showPagination={false}
                                                                                showSearch={false}
                                                                                columns={[
                                                                                    {
                                                                                        title: 'tax.stt',
                                                                                        name: 'stt',
                                                                                        tableItem: {
                                                                                            width: 70,
                                                                                            render: () => `${stt1++}`
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Chủng loại giá',
                                                                                        name: 'priceType',
                                                                                        tableItem: {
                                                                                            render: (text, item) => text

                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Số lượng tối thiểu',
                                                                                        name: 'minQuantity',
                                                                                        tableItem: {
                                                                                            render: (text, item) => text
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Giá bán (VND)',
                                                                                        name: 'price',
                                                                                        tableItem: {
                                                                                            render: (text, item) => parseInt(text).toLocaleString()
                                                                                        },
                                                                                    },
                                                                                ]}
                                                                            />

                                                                        </>
                                                                    );
                                                                },
                                                            }
                                                        },

                                                    ]}
                                                    widthModal={1000}
                                                    footerCustom={(handleOk, handleCancel) => (
                                                        <div className=" w-full bg-white ">
                                                            <div className="flex flex-col items-start mb-[33px] ml-[9px]">
                                                                <button
                                                                    className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                                                                    onClick={handleCancel}
                                                                >
                                                                    {t('components.form.modal.cancel')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
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
                                                onClick={() => handleDelete(item?.id)
                                                }
                                            />

                                        )
                                    },
                                },
                            ]}
                        />
                        <ModalForm
                            keyState=''
                            facade={confirmFacade}
                            ref={modalFormRefclick}
                            title={(data: any) => t('Chi tiết sản phẩm')}
                            className='z form1'
                            columns={[
                                {
                                    title: 'Chi tiết sản phẩm',
                                    name: '',
                                    formItem: {
                                        render: (form, values) => {
                                            return (
                                                <div className="sm:pt-2 ">
                                                    <div className="flex items-center h-full text-base lg:mt-0 mt-4  mb-2">
                                                        <p className="font-bold text-teal-900 w-full text-base">Thông tin nhà cung cấp</p>
                                                    </div>
                                                    <div className="sm:flex w-full  ">
                                                        <div className="sm:w-[50%] w-full flex flex-row  text-base gap-3">
                                                            <div className="font-bold text-teal-900 flex-none">Nhà cung cấp:</div>
                                                            <div className="ml-2">{values?.supplier?.name}</div>
                                                        </div>
                                                        <div className="w-full sm:flex flex-row text-base gap-4 sm:p-0 py-4">
                                                            <div className=" font-bold text-teal-900 flex-none  ">Địa chỉ:</div>
                                                            <div className="ml-2">
                                                                {values?.supplier?.address?.street},{values?.supplier?.address?.ward?.name},{values?.supplier?.address?.district?.name},{values?.supplier?.address?.province?.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:flex-row w-full mt-2 border-t pt-1.5 ">
                                                        <div className="bg-white relative pb-5 rounded-xl">
                                                            <img className='sm:max-w-[224px]  max-w-[110px] aspect-square object-cover rounded-xl shadow-md' src={values?.product?.photos?.[0]?.url} alt="" />
                                                        </div>
                                                        <div className="bg-white  w-full rounded-xl sm:pl-5 sm:ml-2">
                                                            <div className='sm:flex w-full gap-4'>
                                                                <div className='w-full flex flex-row text-base'>
                                                                    <div className='font-bold text-teal-900 flex-none'>Tên sản phẩm:</div>
                                                                    <div className='text-base text-black ml-3 '>{values?.product?.name}</div>
                                                                </div>
                                                                <div className='w-full flex flex-row mb-5 text-base'>
                                                                    <div className='font-bold text-teal-900 flex-none'>Đơn vị tính:</div>
                                                                    <div className=' text-black ml-3'>{values?.product?.basicUnit}</div>
                                                                </div>
                                                            </div>
                                                            <div className='font-bold text-teal-900 w-full text-base mt-2'>Khả năng cung ứng:</div>
                                                            {values?.product?.abilitySupply?.month === null ? ("") :
                                                                (<div className='sm:flex sm:flex-row w-full gap-4 mt-[8px] mb-[16px] sm:ml-0 ml-4'>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo quý:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.quarter}</div>
                                                                    </div>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo tháng:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.month}</div>
                                                                    </div>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo năm:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.year}</div>
                                                                    </div>

                                                                </div>)}
                                                            <div className="w-full flex flex-col mb-5">
                                                            <div className="font-bold text-teal-900 w-[180px] text-base ">Bảng giá sản phẩm:</div>
                                                                <table className="sm:table-auto table_discount h-16 sm:w-[98%] w-[400px]  mt-4  text-gray-900 mb-auto rounded-xl ">
                                                                    <thead className='text-left  '>
                                                                        <tr className="font-normal  text-[14px] border-b-[0.5px]">
                                                                            <th className=" pt-2 pb-2   !bg-white  text-center w-[10%] ">STT</th>
                                                                            <th className="pt-2 pb-2 !bg-white w-[30%] ">Chủng loại giá</th>
                                                                            <th className="pt-2 pb-2 !bg-white ">Số lượng tối thiểu</th>
                                                                            <th className="pt-2 pb-2 !bg-white ">Giá bán (VND)</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {values?.product?.productPrice?.map((items: any, stt1: number) => (
                                                                            <tr className="text-left">
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2 text-center w-[10%]">{++stt1}</td>
                                                                                <td className="font-normal  text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.priceType}</td>
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.minQuantity}</td>
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.price.toLocaleString()}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className='mt-3 w-full'>
                                                                <div className='w-full sm:flex sm:flex-row'>
                                                                    <div className='w-full'>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Mã sản phẩm:</div>
                                                                            <div>{values?.product?.code}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Thương hiệu:</div>
                                                                            <div>{values?.product?.brand}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full'>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Mã vạch:</div>
                                                                            <div>{values?.product?.barcode}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Danh mục:</div>
                                                                            <div>{values?.product?.productCategory?.[0]?.category?.name}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {values?.product?.exportMarket === null ? ("") : (
                                                                <>
                                                                    <div className='w-full flex flex-row'>
                                                                        <div className='w-full flex flex-row mb-5 text-base'>
                                                                            <div className='font-bold text-teal-900 w-48'>Thị trường xuất khẩu:</div>
                                                                            <div>{values?.product?.exportMarket}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full flex flex-col gap-2  text-base'>
                                                                        <div className='font-bold text-teal-900 text-justify'>Mô tả sản phẩm:</div>
                                                                        <div className='text-justify '>{values?.product?.description}</div>
                                                                    </div>

                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            );
                                        },
                                    },
                                },
                            ]}
                            widthModal={1000}
                            footerCustom={(handleCancel) => (
                                <div className="flex gap-2 !justify-between">
                                    <Button
                                        text={t('components.form.modal.cancel')}
                                        className="!bg-white !text-teal-900 btn-cancel"
                                        onClick={handleCancel}
                                    />
                                    <Button
                                        isLoading={isLoading}
                                        text={'Xóa nhà cung cấp'}
                                        className="!bg-red-600 !border-red-600 !w-44  "
                                        onClick={() => handleDelete(confirmFacade?.data?.id)}
                                    />
                                </div>
                            )}
                        />

                    </div>)}

                    <div className='flex flex-col-reverse sm:flex-row items-center sm:justify-between mt-10  '>
                        <Button
                            text={t('components.form.modal.cancel')}
                            className={'!z-10 !px-8 !sm:w-auto w-28 !bg-white !border-teal-900 !hover:border-teal-600 !border-solid !border !p-2 !rounded-xl !text-teal-900 !hover:text-teal-600 !sm:mt-1 !mt-2 !text-sm !h-10 '}
                            onClick={handleBack}
                        />
                        <div className='flex sm:flex-row flex-col items-center sm:w-auto w-[100%] sm:justify-end sm:items-end text-sm sm:mb-0'>
                            <>
                                <Button
                                    className=' !bg-red-500 text-white text-base p-2 !rounded-xl hover:!bg-red-400 mt-1 mx-5 !h-[40px] !font-normal w-3/5 sm:w-auto justify-center'
                                    text={t('Từ chối yêu cầu')}
                                    onClick={() => modalFormRef?.current?.handleEdit()}
                                />
                               
                            </>

                            <Button
                                className='!bg-teal-900 text-white text-base p-2 !rounded-xl hover:!bg-teal-600 mt-1 mx-5 !h-[40px] !font-normal sm:ml-4 sm:w-auto  w-3/5 justify-center '
                                text={t('Phê duyệt yêu cầu')}
                                onClick={() => handleSubmit()}
                            />
                        </div>
                        <>
                               
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
                                <div>{t('store.status.WAITING_STORE')}</div>
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
                            onRow={(data: any) => ({
                                onDoubleClick: () => modalFormRefclick?.current?.handleEdit({ id: data.id }),
                            })}
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
                                                    className='!bg-white !border-teal-900 hover:!border-teal-600 !border-solid !border !rounded-xl !text-teal-900 hover:!text-teal-600 p-2  min-w-[83px]'
                                                    text={t('Xem giá')}
                                                    onClick={() => modalFormRefxemgia?.current?.handleEdit({ id: item?.product?.id })}
                                                />
                                                <ModalForm 
                                                    keyState=''
                                                    facade={productFacade}
                                                    ref={modalFormRefxemgia}
                                                    title={(data: any) => t('Bảng giá')}
                                                    className='z form1'
                                                    columns={[
                                                        {
                                                            title: 'STT',
                                                            name: 'reason',
                                                            formItem: {
                                                                render: (form, values) => {
                                                                    return (
                                                                        <>
                                                                            <div className="sm:pt-2 border-t">
                                                                                <div className="flex items-center h-full w-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                                                    <div className="w-1/2 flex">
                                                                                        <div className="font-semibold text-teal-900 ">Tên sản phẩm:</div>
                                                                                        <div className="ml-4">{values?.name}</div>
                                                                                    </div>
                                                                                    <div className="w-1/2 flex">
                                                                                        <div className="font-semibold text-teal-900 ">Nhà cung cấp:</div>
                                                                                        <div className="ml-4">
                                                                                            {values?.subOrg?.name}
                                                                                        </div>
                                                                                    </div>
                                                                                </div>
                                                                                <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-5">
                                                                                    <div className="font-semibold text-teal-900 ">Đơn vị cơ bản:</div>
                                                                                    <div className="ml-4">{values?.basicUnit}</div>
                                                                                </div>
                                                                            </div>
                                                                            <DataTable
                                                                                data={values.productPrice}
                                                                                xScroll='1550px'
                                                                                className=' bg-white p-3 rounded-lg'
                                                                                showPagination={false}
                                                                                showSearch={false}
                                                                                columns={[
                                                                                    {
                                                                                        title: 'tax.stt',
                                                                                        name: 'stt',
                                                                                        tableItem: {
                                                                                            width: 70,
                                                                                            render: () => `${stt1++}`
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Chủng loại giá',
                                                                                        name: 'priceType',
                                                                                        tableItem: {
                                                                                            render: (text, item) => text

                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Số lượng tối thiểu',
                                                                                        name: 'minQuantity',
                                                                                        tableItem: {
                                                                                            render: (text, item) => text
                                                                                        },
                                                                                    },
                                                                                    {
                                                                                        title: 'Giá bán (VND)',
                                                                                        name: 'price',
                                                                                        tableItem: {
                                                                                            render: (text, item) => parseInt(text).toLocaleString()
                                                                                        },
                                                                                    },
                                                                                ]}
                                                                            />

                                                                        </>
                                                                    );
                                                                },
                                                            }
                                                        },

                                                    ]}

                                                    widthModal={1000}
                                                    footerCustom={(handleOk, handleCancel) => (
                                                        <div className=" w-full bg-white ">
                                                            <div className="flex flex-col items-end mb-[3px] ml-[9px]">
                                                                <button
                                                                    className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                                                                    onClick={handleCancel}
                                                                >
                                                                    {t('components.form.modal.cancel')}
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )}
                                                />
                                            </>
                                            

                                        )
                                    },

                                },
                            ]}

                        />
                        <ModalForm
                            keyState=''
                            facade={confirmFacade}
                            ref={modalFormRefclick}
                            title={(data: any) => t('Chi tiết sản phẩm')}
                            className='z form1'
                            columns={[
                                {
                                    title: 'Chi tiết sản phẩm',
                                    name: '',
                                    formItem: {
                                        render: (form, values) => {
                                            return (
                                                <div className="sm:pt-2">
                                                    <div className="flex items-center h-full text-base lg:mt-0 mt-4 form-store mb-2">
                                                        <p className="font-bold text-teal-900 w-full text-base">Thông tin nhà cung cấp</p>
                                                    </div>
                                                    <div className="sm:flex w-full  ">
                                                        <div className="sm:w-[50%] w-full flex flex-row  text-base gap-3">
                                                            <div className="font-bold text-teal-900 flex-none">Nhà cung cấp:</div>
                                                            <div className="ml-2">{values?.supplier?.name}</div>
                                                        </div>
                                                        <div className="w-full sm:flex flex-row text-base gap-4 sm:p-0 py-4">
                                                            <div className=" font-bold text-teal-900 flex-none  ">Địa chỉ:</div>
                                                            <div className="ml-2">
                                                                {values?.supplier?.address?.street},{values?.supplier?.address?.ward?.name},{values?.supplier?.address?.district?.name},{values?.supplier?.address?.province?.name}
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="sm:flex sm:flex-row w-full mt-2  border-t pt-1.5">
                                                        <div className="bg-white relative pb-5 rounded-xl">
                                                            <img className='sm:max-w-[224px]  max-w-[110px] aspect-square object-cover rounded-xl shadow-md' src={values?.product?.photos?.[0]?.url} alt="" />
                                                        </div>
                                                        <div className="bg-white  w-full rounded-xl sm:pl-5 sm:ml-2">
                                                            <div className='sm:flex w-full gap-4'>
                                                                <div className='w-full flex flex-row text-base'>
                                                                    <div className='font-bold text-teal-900 flex-none'>Tên sản phẩm:</div>
                                                                    <div className='text-base text-black ml-3 '>{values?.product?.name}</div>
                                                                </div>
                                                                <div className='w-full flex flex-row mb-5 text-base'>
                                                                    <div className='font-bold text-teal-900 flex-none'>Đơn vị tính:</div>
                                                                    <div className=' text-black ml-3'>{values?.product?.basicUnit}</div>
                                                                </div>
                                                            </div>
                                                            <div className='font-bold text-teal-900 w-full text-base mt-2'>Khả năng cung ứng:</div>
                                                            {values?.product?.abilitySupply?.month === null ? ("") :
                                                                (<div className='sm:flex sm:flex-row w-full gap-4 mt-[8px] mb-[16px] sm:ml-0 ml-4'>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo quý:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.quarter}</div>
                                                                    </div>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo tháng:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.month}</div>
                                                                    </div>
                                                                    <div className='w-full flex gap-2'>
                                                                        <div className='text-teal-900 flex-none'>Theo năm:</div>
                                                                        <div className='font-[16px] text-black'>{values?.product?.abilitySupply?.year}</div>
                                                                    </div>

                                                                </div>)}
                                                            <div className="w-full flex flex-col mb-5">
                                                            <div className="font-bold text-teal-900 w-[180px] text-base ">Bảng giá sản phẩm:</div>
                                                                <table className="sm:table-auto table_discount h-16 sm:w-[98%] w-[400px]  mt-4  text-gray-900 mb-auto rounded-xl ">
                                                                    <thead className='text-left  '>
                                                                        <tr className="font-normal  text-[14px] border-b-[0.5px]">
                                                                            <th className=" pt-2 pb-2   !bg-white  text-center w-[10%] ">STT</th>
                                                                            <th className="pt-2 pb-2 !bg-white w-[30%] ">Chủng loại giá</th>
                                                                            <th className="pt-2 pb-2 !bg-white ">Số lượng tối thiểu</th>
                                                                            <th className="pt-2 pb-2 !bg-white ">Giá bán (VND)</th>

                                                                        </tr>
                                                                    </thead>
                                                                    <tbody>
                                                                        {values?.product?.productPrice?.map((items: any, stt1: number) => (
                                                                            <tr className="text-left">
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2 text-center w-[10%]">{++stt1}</td>
                                                                                <td className="font-normal  text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.priceType}</td>
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.minQuantity}</td>
                                                                                <td className="font-normal text-[14px] sm:pt-3 pt-2 sm:pb-2 pb-2">{items?.price.toLocaleString()}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                            <div className='mt-3 w-full'>
                                                                <div className='w-full sm:flex sm:flex-row'>
                                                                    <div className='w-full'>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Mã sản phẩm:</div>
                                                                            <div>{values?.product?.code}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Thương hiệu:</div>
                                                                            <div>{values?.product?.brand}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full'>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Mã vạch:</div>
                                                                            <div>{values?.product?.barcode}</div>
                                                                        </div>
                                                                        <div className='w-full flex flex-row mb-5 gap-2 text-base'>
                                                                            <div className='font-bold text-teal-900 flex-none'>Danh mục:</div>
                                                                            <div>{values?.product?.productCategory?.[0]?.category?.name}</div>
                                                                        </div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            {values?.product?.exportMarket === null ? ("") : (
                                                                <>
                                                                    <div className='w-full flex flex-row'>
                                                                        <div className='w-full flex flex-row mb-5 text-base'>
                                                                            <div className='font-bold text-teal-900 w-48'>Thị trường xuất khẩu:</div>
                                                                            <div>{values?.product?.exportMarket}</div>
                                                                        </div>
                                                                    </div>
                                                                    <div className='w-full flex flex-col gap-2  text-base'>
                                                                        <div className='font-bold text-teal-900 text-justify'>Mô tả sản phẩm:</div>
                                                                        <div className='text-justify '>{values?.product?.description}</div>
                                                                    </div>

                                                                </>
                                                            )}
                                                        </div>
                                                    </div>

                                                </div>
                                            );
                                        },
                                    },
                                },
                            ]}
                            widthModal={1000}
                            footerCustom={(handleOk, handleCancel) => (
                                <div className=" w-full bg-white ">
                                    <div className="flex flex-col items-start mb-[2px] ml-[9px]">
                                        <button
                                            className="z-10 px-8 sm:w-auto w-3/5 bg-white border-teal-900 hover:border-teal-600 border-solid border p-2 rounded-xl text-teal-900 hover:text-teal-600 sm:mt-1 mt-2 text-sm h-11"
                                            onClick={handleCancel}
                                        >
                                            {t('components.form.modal.cancel')}
                                        </button>
                                    </div>
                                </div>
                            )}
                        />
                       
                    </div>)}   
                                     
                    <Button
                        text={t('components.form.modal.cancel')}
                        className={'!z-10 !px-8 !sm:w-auto w-28 !bg-white !border-teal-900 !hover:border-teal-600 !border-solid !border !p-2 !rounded-xl !text-teal-900 !hover:text-teal-600 !sm:mt-1 !mt-2 !text-sm !h-10 '}
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
                                <div>{t('store.status.REJECT_BY_ADMIN')}</div>
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
                        className={'!z-10 !px-8 !sm:w-auto w-28 !bg-white !border-teal-900 !hover:border-teal-600 !border-solid !border !p-2 !rounded-xl !text-teal-900 !hover:text-teal-600 !sm:mt-1 !mt-2 !text-sm !h-10'}
                        onClick={handleBack}
                    />
                </div>

            )
            }

        </Fragment>
    );
};
export default Page;
