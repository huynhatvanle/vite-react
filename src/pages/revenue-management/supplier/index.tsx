import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Infor, Plus } from '@svgs';
import {
    CategoryFacade,
    ConnectSupplierFacade,
    GlobalFacade,
    InventorySupplierFacade,
    InvoiceKiotVietFacade,
    InvoiceRevenueFacade,
    SupplierOderFacade,
    inventoryOrdersFacade,
    InventoryListProductFacade,
    StoreOderFacade,
} from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { getFilter, language, languages, routerLinks } from '@utils';
import { Form } from '@core/form';
import { Form as AntForm, Dropdown, Select, Tabs, Tooltip, UploadFile } from 'antd';
import dayjs from 'dayjs';
import { TableRefObject } from '@models';
import { Excel } from 'antd-table-saveas-excel';
import { ModalForm } from '@core/modal/form';

const Page = () => {
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isReload = useRef(false);
    const { formatDate, formatDateTime } = GlobalFacade();
    const inventoryOrders = inventoryOrdersFacade();
    const supplierOrderFacade = SupplierOderFacade()
    const { isLoading } = supplierOrderFacade;
    const inventorySupplier = InventorySupplierFacade();
    const inventoryListProductFacade = InventoryListProductFacade();
    const categoryFacade = CategoryFacade();
    const dataTableRefRevenue = useRef<TableRefObject>(null);
    const dataTableRefInventory = useRef<TableRefObject>(null);
    const [date, setDate] = useState<boolean>();

    const revenueTotal = inventoryOrders.result?.statistical?.totalRenueve?.toLocaleString();

    useEffect(() => {
        supplierOrderFacade.get({ supplierType: 'BALANCE' });
        return () => {
            isReload.current && supplierOrderFacade.get({ supplierType: 'BALANCE' });
        };
    }, []);

    const [idSupplier, setIdSupplier] = useState();
    const firstSupplier = supplierOrderFacade?.result?.data ? supplierOrderFacade.result.data[0].id : '';

    useEffect(() => {
        if (getFilter(inventoryOrders.queryParams, 'idSupplier')) {
            inventorySupplier.get({
                id: getFilter(inventoryOrders.queryParams, 'idSupplier')
            });
        }
    }, [getFilter(inventoryOrders.queryParams, 'idSupplier')]);
    const suppliers = inventorySupplier.result?.data ? inventorySupplier.result?.data : []

    const statusCategory = [
        {
            label: t('supplier.Sup-Status.Sell goods'),
            value: 'RECIEVED',
        },
        {
            label: t('supplier.Sup-Status.Return goods'),
            value: 'RETURN',
        },
    ];
    const statusProduct = [
        {
            label: t('supplier.status.on sale'),
            value: 'APPROVED',
        },
        {
            label: t('supplier.status.stop selling'),
            value: 'STOP_SELLING',
        },
    ];
    const subHeader = [
        {
            title: t('supplier.Sup-Revenue.Revenue'),
            total: revenueTotal + ' VND',
        },
        {
            title: t('supplier.Sup-Revenue.Total number of successful orders'),
            total: inventoryOrders.result?.statistical?.totalOderSuccess,
        },
        {
            title: t('supplier.Sup-Revenue.Total number of returned orders'),
            total: inventoryOrders.result?.statistical?.totalOderReturn,
        },
        {
            title: t('supplier.Sup-Revenue.Total number of canceled orders'),
            total: inventoryOrders.result?.statistical?.totalOderCancel,
        },
    ];

    const [categoryId1, setCategoryId1] = useState('');
    const [categoryId2, setCategoryId2] = useState('');

    useEffect(() => {
        if (getFilter(inventoryListProductFacade.queryParams, 'idSupplier'))
            categoryFacade.get({ subOrgId: getFilter(inventoryListProductFacade.queryParams, 'idSupplier') })
        else categoryFacade.get({})

    }, [getFilter(inventoryListProductFacade.queryParams, 'idSupplier')]);

    useEffect(() => {
        if (categoryId1) {
            categoryFacade.get2({ id: categoryId1, subOrgId: getFilter(inventoryListProductFacade.queryParams, 'idSupplier') })
        }
    }, [categoryId1]);

    useEffect(() => {
        if (categoryId2) {
            categoryFacade.get3({ id: categoryId2, subOrgId: getFilter(inventoryListProductFacade.queryParams, 'idSupplier') })
        }
    }, [categoryId2]);

    const category1 = categoryFacade.result?.data;
    const category2 = categoryFacade.result2?.data;
    const category3 = categoryFacade.result3?.data;

    let stt = 1;
    let i = 1;

    const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeRevenueStoreTab') || '1');
    const onChangeTab = (key: string) => {
        setActiveKey(key);

        localStorage.setItem('activeRevenueStoreTab', key);

        navigate(`/${lang}${routerLinks('revenue-management/supplier')}?tab=${key}`);
    };
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
    useEffect(() => {
        if (tab) {
            setActiveKey(tab);
        } else {
            setActiveKey('1');
        }
    }, []);

    interface IExcelColumn {
        title: string;
        key: string;
        dataIndex: string;
    }
    const columnrevenueOrder: IExcelColumn[] = [
        { title: t('STT'), key: 'stt', dataIndex: 'STT' },
        { title: t('Mã đơn hàng'), key: 'invoiceCode', dataIndex: 'invoiceCode' },
        { title: t('Tên cửa hàng'), key: 'name', dataIndex: 'name' },
        { title: t('Ngày đặt'), key: 'topickUpDatetal', dataIndex: 'pickUpDate' },
        { title: t('Ngày nhận'), key: 'completedDate', dataIndex: 'completedDate' },
        { title: t('Trước thuế'), key: 'subTotal', dataIndex: 'subTotal' },
        { title: t('Sau thuế'), key: 'total', dataIndex: 'total' },
        { title: t('Khuyến mãi'), key: 'voucherAmount', dataIndex: 'voucherAmount' },
        { title: t('Thành tiền'), key: 'total1', dataIndex: 'total1' },
        { title: t('Loại đơn'), key: 'billType', dataIndex: 'billType' },
    ];
    const columnrevenueProduct: IExcelColumn[] = [
        { title: t('STT'), key: 'stt', dataIndex: 'STT' },
        { title: t('Mã sản phẩm'), key: 'productCode', dataIndex: 'productCode' },
        { title: t('Tên sản phẩm'), key: 'productName', dataIndex: 'productName' },
        { title: t('Mã vạch'), key: 'barcode', dataIndex: 'barcode' },
        { title: t('Doanh thu'), key: 'subTotal', dataIndex: 'subTotal' },
        { title: t('Sau thuế'), key: 'total', dataIndex: 'total' },
        { title: t('Trạng thái'), key: 'status', dataIndex: 'status' },
    ];

    return (
        <div className={'w-full'}>
            <Fragment>
                <Tabs
                    defaultActiveKey="1"
                    activeKey={activeKey}
                    type="card"
                    size="large"
                    onTabClick={(key: string) => {
                        onChangeTab(key);
                        setDate(false);
                    }}
                >
                    <Tabs.TabPane tab={t('titles.Store-Revenue/Order')} key="1" className="">
                        <div className={'w-full mx-auto '}>
                            <div className="px-5 bg-white pt-6 pb-4 rounded-xl rounded-tl-none">
                                {!!firstSupplier && (
                                    <DataTable
                                        className="form-supplier-tab4"
                                        ref={dataTableRefRevenue}
                                        facade={inventoryOrders}
                                        defaultRequest={{
                                            page: 1,
                                            perPage: 10,
                                            filter: {
                                                idSupplier: firstSupplier,
                                                filterDate: {
                                                    dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                                                    dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                                                },
                                            },
                                        }}
                                        onRow={(data: any) => ({
                                            onDoubleClick: () => {
                                                data?.billType == "RETURN" ?
                                                    navigate(`/${lang}${routerLinks('merchandise-supplier-management/return-goods/detail')}/${data.orderId}`)
                                                    : navigate(`/${lang}${routerLinks('revenue/detail')}/${data.orderId}`)
                                            },
                                        })}
                                        xScroll="1400px"
                                        pageSizeRender={(sizePage: number) => sizePage}
                                        pageSizeWidth={'50px'}
                                        paginationDescription={(from: number, to: number, total: number) =>
                                            t('routes.admin.Layout.PaginationOrder', { from, to, total })
                                        }
                                        rightHeader={
                                            <div className="flex justify-end text-left flex-col w-full mt-4 sm:mt-1.5 xl:mt-0 2xl:flex-row 2xl:gap-3">
                                                <Form
                                                    values={{
                                                        dateFrom: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateFrom,
                                                        dateTo: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateTo,
                                                        type: getFilter(inventoryOrders.queryParams, 'type'),
                                                        supplier: getFilter(inventoryOrders.queryParams, 'idSupplier'),
                                                        store: getFilter(inventoryOrders.queryParams, 'idStore'),
                                                    }}
                                                    className="intro-x sm:flex  justify-start sm:mt-2 xl:justify-end xl:mt-0 form-store"
                                                    columns={[
                                                        {
                                                            title: '',
                                                            name: 'type',
                                                            formItem: {
                                                                placeholder: 'placeholder.Select order type',
                                                                type: 'select',
                                                                tabIndex: 3,
                                                                col: 4,
                                                                list: statusCategory,
                                                                onChange(value, form) {
                                                                    dataTableRefRevenue?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            idSupplier: form.getFieldValue('supplier') ? form.getFieldValue('supplier') : '',
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            idStore: form.getFieldValue('store') ? form.getFieldValue('store') : '',
                                                                            type: value ? value : '',
                                                                        },
                                                                    });
                                                                },
                                                            },
                                                        },
                                                        {
                                                            name: 'supplier',
                                                            title: '',
                                                            formItem: {
                                                                placeholder: 'placeholder.Choose a store',
                                                                type: 'select',
                                                                rules: [{ type: 'required', message: 'Vui lòng chọn nhà cung cấp' }],
                                                                col: 4,
                                                                list: supplierOrderFacade?.result?.data!.map((item) => ({
                                                                    label: item?.name,
                                                                    value: item?.id!,
                                                                })),
                                                                onChange(value, form) {
                                                                    setIdSupplier(value)
                                                                    value && dataTableRefRevenue?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            idSupplier: value,
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            idStore: form.getFieldValue('store') ? form.getFieldValue('store') : '',
                                                                            type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                                                        },
                                                                    });
                                                                },
                                                            },
                                                        },
                                                        {
                                                            name: 'store',
                                                            title: '',
                                                            formItem: {
                                                                placeholder: 'placeholder.Choose a store',
                                                                type: 'select',
                                                                col: 4,
                                                                // disabled: () => { console.log(idSupplier); return true },
                                                                list: suppliers.map((item) => ({
                                                                    label: item?.name!,
                                                                    value: item?.id!,
                                                                })),
                                                                onChange(value, form) {
                                                                    dataTableRefRevenue?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            idSupplier: form.getFieldValue('supplier') ? form.getFieldValue('supplier') : '',
                                                                            idStore: value ? value : '',
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                                                        },
                                                                    });
                                                                },
                                                            },
                                                        },
                                                    ]}
                                                    disableSubmit={isLoading}
                                                />
                                                <div className="w-full 2xl:w-auto">
                                                    <Form
                                                        values={{
                                                            dateFrom: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateFrom,
                                                            dateTo: getFilter(inventoryOrders.queryParams, 'filterDate')?.dateTo,
                                                            type: getFilter(inventoryOrders.queryParams, 'type'),
                                                            supplier: getFilter(inventoryOrders.queryParams, 'idSupplier'),
                                                            store: getFilter(inventoryOrders.queryParams, 'idStore'),
                                                        }}
                                                        className="intro-x rounded-lg w-full sm:flex md:justify-start xl:justify-end form-store"
                                                        columns={[
                                                            {
                                                                title: '',
                                                                name: '',
                                                                formItem: {
                                                                    tabIndex: 3,
                                                                    col: 2,
                                                                    render: () => (
                                                                        <div className="flex h-10 items-center -mt-3 sm:mt-0">
                                                                            <p className="whitespace-nowrap">{t('store.Since')}</p>
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
                                                                    onChange(value, form) {
                                                                        form.getFieldValue('dateTo') && value > form.getFieldValue('dateTo')
                                                                            ? setDate(true)
                                                                            : setDate(false);
                                                                        dataTableRefRevenue?.current?.onChange({
                                                                            page: 1,
                                                                            perPage: 10,
                                                                            filter: {
                                                                                idSupplier: form.getFieldValue('supplier') ? form.getFieldValue('supplier') : '',
                                                                                filterDate: {
                                                                                    dateFrom: value
                                                                                        ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/')
                                                                                        : '',
                                                                                    dateTo: form.getFieldValue('dateTo')
                                                                                        ? form
                                                                                            .getFieldValue('dateTo')
                                                                                            .format('MM/DD/YYYY 23:59:59')
                                                                                            .replace(/-/g, '/')
                                                                                        : '',
                                                                                },
                                                                                idStore: form.getFieldValue('store') ? form.getFieldValue('store') : '',
                                                                                type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                                                            },
                                                                        });
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
                                                                        <div className="flex h-10 items-center -mt-3 sm:mt-0">
                                                                            <p className="whitespace-nowrap">{t('store.To date')}</p>
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
                                                                    onChange(value, form) {
                                                                        value && value < form.getFieldValue('dateFrom')
                                                                            ? setDate(true)
                                                                            : setDate(false);
                                                                        dataTableRefRevenue?.current?.onChange({
                                                                            page: 1,
                                                                            perPage: 10,
                                                                            filter: {
                                                                                idSupplier: form.getFieldValue('supplier') ? form.getFieldValue('supplier') : '',
                                                                                filterDate: {
                                                                                    dateFrom: form.getFieldValue('dateFrom')
                                                                                        ? form
                                                                                            .getFieldValue('dateFrom')
                                                                                            .format('MM/DD/YYYY 00:00:00')
                                                                                            .replace(/-/g, '/')
                                                                                        : '',
                                                                                    dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                                                                },
                                                                                idStore: form.getFieldValue('store') ? form.getFieldValue('store') : '',
                                                                                type: form.getFieldValue('type') ? form.getFieldValue('type') : '',
                                                                            },
                                                                        });
                                                                    },
                                                                },
                                                            },
                                                        ]}
                                                        disableSubmit={isLoading}
                                                    />
                                                    {date && (
                                                        <div className="w-full flex">
                                                            <span className="sm:w-[526px] xl:w-full -mt-2 z-10 text-center sm:text-right text-red-500">
                                                                Ngày kết thúc phải lớn hơn ngày bắt đầu
                                                            </span>
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        }
                                        searchPlaceholder={t('placeholder.Search by order number')}
                                        columns={[
                                            {
                                                title: `supplier.Order.STT`,
                                                name: 'id',
                                                tableItem: {
                                                    width: 70,
                                                    sorter: true,
                                                    render: (value: any, item: any) =>
                                                        JSON.parse(inventoryOrders.queryParams || '{}').page != 1
                                                            ? `${JSON.parse(inventoryOrders.queryParams || '{}').page *
                                                            JSON.parse(inventoryOrders.queryParams || '{}').perPage +
                                                            stt++
                                                            }`
                                                            : `${stt++}`,
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
                                                },
                                            },
                                            {
                                                title: `supplier.Order.Order Date`,
                                                name: 'pickUpDate',
                                                tableItem: {
                                                    width: 135,
                                                    render: (text: string) => (text ? dayjs(text).format(formatDate).replace(/-/g, '/') : ''),
                                                },
                                            },
                                            {
                                                title: `supplier.Order.Delivery Date`,
                                                name: 'completedDate',
                                                tableItem: {
                                                    width: 150,
                                                    render: (text: string) => (text ? dayjs(text).format(formatDate).replace(/-/g, '/') : ''),
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
                                                    render: (value: any, item: any) => item?.voucherAmount?.toLocaleString(),
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
                                                        item?.billType === 'RECIEVED' ? (
                                                            <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                                                {t('supplier.Sup-Status.Sell goods')}
                                                            </div>
                                                        ) : (
                                                            <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                                                {t('supplier.Sup-Status.Return goods')}
                                                            </div>
                                                        ),
                                                },
                                            },
                                        ]}
                                        subHeader={() => (
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 sm:gap-4 mt-4 sm:mb-3 mb-4">
                                                {subHeader.map((e) => (
                                                    <div className="w-full rounded-xl shadow-[0_0_9px_rgb(0,0,0,0.25)] pt-3 pb-5 px-5 text-center flex flex-col items-center justify-center h-28 mb-4">
                                                        <h1 className="font-bold mb-3">{e.title}</h1>
                                                        <span className="text-teal-900 text-xl font-bold mt-auto">{e.total}</span>
                                                    </div>
                                                ))}
                                            </div>
                                        )}
                                    />
                                )}
                                <div className="flex sm:justify-end justify-center items-center p-5">
                                    <Button
                                        disabled={inventoryOrders.result?.data?.length === 0 ? true : false}
                                        text={t('titles.Export report')}
                                        className={
                                            'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                                        }
                                        onClick={() => {
                                            const inventory = inventoryOrders?.result?.data?.map((item) => {
                                                return {
                                                    STT: i++,
                                                    invoiceCode: item.invoiceCode,
                                                    name: item.storeName,
                                                    pickUpDate: item.pickUpDate
                                                        ? dayjs(item.pickUpDate).format('DD/MM/YYYY').replace(/-/g, '/')
                                                        : '',
                                                    completedDate: item.completedDate
                                                        ? dayjs(item.completedDate).format('DD/MM/YYYY').replace(/-/g, '/')
                                                        : '',
                                                    subTotal: parseInt(item.subTotal!).toLocaleString(),
                                                    total: parseInt(item.total!).toLocaleString(),
                                                    voucherAmount: parseInt(item.voucherAmount!).toLocaleString(),
                                                    total1: parseInt(item.total!).toLocaleString(),
                                                    billType:
                                                        item.billType === 'RECIEVED'
                                                            ? t('Bán hàng')
                                                            : t('Trả hàng')
                                                };
                                            });

                                            const excel = new Excel();
                                            const sheet = excel.addSheet('Sheet1');
                                            sheet.setTHeadStyle({
                                                background: 'FFFFFFFF',
                                                borderColor: 'C0C0C0C0',
                                                wrapText: false,
                                                fontName: 'Calibri',
                                            });
                                            sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' });
                                            sheet.setRowHeight(0.8, 'cm');
                                            sheet.addColumns([
                                                { title: '', dataIndex: '' },
                                                { title: '', dataIndex: '' },
                                                { title: 'BÁO CÁO DOANH THU NHÀ CUNG CẤP THEO ĐƠN HÀNG', dataIndex: '' },
                                            ]);
                                            // sheet.drawCell(10, 0, '');
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Tìm kiếm:', dataIndex: '' },
                                                {
                                                    title: JSON.parse(inventoryOrders.queryParams || '{}').fullTextSearch || '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Chọn loại đơn hàng:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryOrders.queryParams, 'status')
                                                        ? `${statusCategory.find((item) => {
                                                            return item.value === getFilter(inventoryOrders.queryParams, 'status');
                                                        })?.label
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                                { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryOrders.queryParams, 'idSupplier')
                                                        ? `${supplierOrderFacade?.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryOrders.queryParams, 'idSupplier');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },

                                                { title: '', dataIndex: '' },

                                                { title: 'Chọn cửa hàng:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryOrders.queryParams, 'idStore')
                                                        ? `${inventorySupplier.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryOrders.queryParams, 'idStore');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Từ ngày', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryOrders.queryParams, 'filterDate')['dateFrom']
                                                        ? dayjs(getFilter(inventoryOrders.queryParams, 'filterDate')['dateFrom']).format('DD/MM/YYYY')
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Đến ngày', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryOrders.queryParams, 'filterDate')['dateTo']
                                                        ? dayjs(getFilter(inventoryOrders.queryParams, 'filterDate')['dateTo']).format('DD/MM/YYYY')
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Doanh thu', dataIndex: '' },
                                                {
                                                    title: inventoryOrders?.result?.statistical?.totalRenueve?.toString(),
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Tổng số đơn thành công', dataIndex: '' },
                                                {
                                                    title: inventoryOrders?.result?.statistical?.totalOderSuccess?.toString(),
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Tổng số đơn trả', dataIndex: '' },
                                                {
                                                    title: inventoryOrders?.result?.statistical?.totalOderReturn?.toString(),
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Tổng số đơn bị hủy', dataIndex: '' },
                                                {
                                                    title: inventoryOrders?.result?.statistical?.totalOderCancel?.toString(),
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addRow();
                                            sheet
                                                .addColumns(columnrevenueOrder)
                                                .addDataSource(inventory ?? [], {
                                                    str2Percent: true,
                                                })
                                                .addColumns([
                                                    { title: '', dataIndex: '' },
                                                    { title: '', dataIndex: '' },
                                                    { title: '', dataIndex: '' },
                                                    { title: '', dataIndex: '' },
                                                    { title: 'Tổng', dataIndex: '' },
                                                    { title: inventoryOrders.result?.total?.sumSubTotal?.toLocaleString(), dataIndex: '' },
                                                    {
                                                        title: inventoryOrders.result?.total?.sumMoney?.toLocaleString(),
                                                        dataIndex: '',
                                                    },
                                                    {
                                                        title: inventoryOrders.result?.total?.sumVoucherAmount?.toLocaleString(),
                                                        dataIndex: '',
                                                    },
                                                    {
                                                        title: inventoryOrders.result?.total?.sumTotal?.toLocaleString(),
                                                        dataIndex: '',
                                                    },
                                                    { title: '', dataIndex: '' },
                                                ])
                                                .saveAs(t('Doanh thu nhà cung cấp theo đơn hàng.xlsx'));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Tabs.TabPane>

                    <Tabs.TabPane tab={t('titles.Store-Revenue/Product')} key="2" className="">
                        <div className={'w-full mx-auto '}>
                            <div className="px-5 bg-white pt-6 pb-4 rounded-xl rounded-tl-none">
                                {firstSupplier && (
                                    <DataTable
                                        className='form-supplier-tab4'
                                        ref={dataTableRefInventory}
                                        facade={inventoryListProductFacade}
                                        defaultRequest={{
                                            page: 1,
                                            perPage: 10,
                                            filter: {
                                                idSupplier: firstSupplier,
                                                filterDate: {
                                                    dateFrom: `${dayjs().subtract(1, 'month').format('MM/DD/YYYY 00:00:00')}`,
                                                    dateTo: `${dayjs().format('MM/DD/YYYY 23:59:59')}`,
                                                },
                                            },
                                        }}
                                        xScroll='1270px'
                                        pageSizeRender={(sizePage: number) => sizePage}
                                        pageSizeWidth={'50px'}
                                        paginationDescription={(from: number, to: number, total: number) =>
                                            t('routes.admin.Layout.PaginationSupplier', { from, to, total })
                                        }
                                        columns={[
                                            // {
                                            //     title: `supplier.Order.STT`,
                                            //     name: 'id',
                                            //     tableItem: {
                                            //       width: 70,
                                            //       sorter: true,
                                            //       render: (value: any, item: any) =>
                                            //         JSON.parse(inventoryListProductFacade.queryParams || '{}').page != 1
                                            //           ? `${
                                            //               JSON.parse(inventoryListProductFacade.queryParams || '{}').page *
                                            //                 JSON.parse(inventoryListProductFacade.queryParams || '{}').perPage +
                                            //               stt1++
                                            //             }`
                                            //           : `${stt1++}`,
                                            //     },
                                            //   },
                                            {
                                                title: `Mã sản phẩm`,
                                                name: 'productCode',
                                                tableItem: {
                                                    sorter: true,
                                                },
                                            },
                                            {
                                                title: `Tên sản phẩm`,
                                                name: 'productName',
                                                tableItem: {
                                                    sorter: true,
                                                },
                                            },
                                            {
                                                title: `Mã vạch`,
                                                name: 'barcode',
                                                tableItem: {
                                                    sorter: true,
                                                },
                                            },
                                            {
                                                title: `Doanh thu trước thuế`,
                                                name: 'subTotal',
                                                tableItem: {
                                                    render: (text: string) => text.toLocaleString(),
                                                },
                                            },
                                            {
                                                title: `Sau thuế`,
                                                name: 'total',
                                                tableItem: {
                                                    render: (text: string) => text.toLocaleString(),
                                                },
                                            },
                                            {
                                                title: `Trạng thái`,
                                                name: 'status',
                                                tableItem: {
                                                    width: 120,
                                                    render: (text: string, item: any) =>
                                                        item?.status === 'APPROVED' ? (
                                                            <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                                                {t('supplier.Sup-Status.Sell goods')}
                                                            </div>
                                                        ) : (
                                                            <div className="bg-red-50 text-center p-1 border border-red-500 text-red-600 rounded">
                                                                {t('supplier.Sup-Status.Return goods')}
                                                            </div>
                                                        ),
                                                },
                                            },
                                        ]}
                                        searchPlaceholder={'Tìm kiếm mã sản phẩm, tên, mã vạch'}
                                        rightHeader={
                                            <div className="flex justify-end text-left flex-col w-full 2xl:flex-row 2xl:gap-3 ">
                                                <Form
                                                    className="intro-x sm:flex justify-start xl:justify-end xl:mt-0 form-store mt-2 sm:mt-4 2xl:mb-2"
                                                    values={{
                                                        dateFrom: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateFrom,
                                                        dateTo: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateTo,
                                                        status: getFilter(inventoryListProductFacade.queryParams, 'status'),
                                                        categoryId1: getFilter(inventoryListProductFacade.queryParams, 'categoryId1'),
                                                        categoryId2: getFilter(inventoryListProductFacade.queryParams, 'categoryId2'),
                                                        categoryId3: getFilter(inventoryListProductFacade.queryParams, 'categoryId3'),
                                                        idSupplier: getFilter(inventoryListProductFacade.queryParams, 'idSupplier'),
                                                    }}
                                                    columns={[
                                                        {
                                                            title: '',
                                                            name: 'status',
                                                            formItem: {
                                                                placeholder: 'placeholder.Select status',
                                                                type: 'select',
                                                                tabIndex: 3,
                                                                col: 6,
                                                                list: statusProduct,
                                                                onChange(value, form) {
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            status: value,
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            categoryId2: form.getFieldValue('categoryId2'),
                                                                            categoryId3: form.getFieldValue('categoryId3'),
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        },
                                                                    });
                                                                },
                                                            },
                                                        },
                                                        {
                                                            title: '',
                                                            name: 'idSupplier',
                                                            formItem: {
                                                                placeholder: 'placeholder.Choose a supplier',
                                                                col: 6,
                                                                type: 'select',
                                                                list: supplierOrderFacade?.result?.data!.map((item) => ({
                                                                    label: item?.name,
                                                                    value: item?.id!
                                                                })),
                                                                onChange(value, form) {
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            idSupplier: value,
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            categoryId2: form.getFieldValue('categoryId2'),
                                                                            categoryId3: form.getFieldValue('categoryId3')
                                                                        },
                                                                    });
                                                                },
                                                            },
                                                        },
                                                    ]}
                                                    disableSubmit={isLoading}
                                                />
                                                <Form
                                                    className='intro-x rounded-lg w-full sm:flex justify-start form-store mb-2 xl:justify-end 2xl:w-auto'
                                                    values={{
                                                        dateFrom: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateFrom,
                                                        dateTo: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateTo,
                                                        status: getFilter(inventoryListProductFacade.queryParams, 'status'),
                                                        categoryId1: getFilter(inventoryListProductFacade.queryParams, 'categoryId1'),
                                                        categoryId2: getFilter(inventoryListProductFacade.queryParams, 'categoryId2'),
                                                        categoryId3: getFilter(inventoryListProductFacade.queryParams, 'categoryId3'),
                                                        idSupplier: getFilter(inventoryListProductFacade.queryParams, 'idSupplier'),
                                                    }}
                                                    columns={[
                                                        {
                                                            title: '',
                                                            name: '',
                                                            formItem: {
                                                                tabIndex: 3,
                                                                col: 2,
                                                                render: () => (
                                                                    <div className="flex h-10 items-center !w-full -mt-3 sm:mt-0">
                                                                        <p className="text-sm whitespace-nowrap">{t('store.Since')}</p>
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
                                                                placeholder: 'placeholder.Choose a time',
                                                                onChange(value, form) {
                                                                    form.getFieldValue('dateTo') && value > form.getFieldValue('dateTo') ? setDate(true) : setDate(false)
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: value
                                                                                    ? value.format('MM/DD/YYYY 00:00:00').replace(/-/g, '/')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo')
                                                                                    ? form
                                                                                        .getFieldValue('dateTo')
                                                                                        .format('MM/DD/YYYY 23:59:59')
                                                                                        .replace(/-/g, '/')
                                                                                    : '',
                                                                            },
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            categoryId2: form.getFieldValue('categoryId2'),
                                                                            categoryId3: form.getFieldValue('categoryId3'),
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        },
                                                                    });
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
                                                                    <div className="flex h-10 items-center !w-full -mt-3 sm:mt-0">
                                                                        <p className="text-sm whitespace-nowrap">{t('store.To date')}</p>
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
                                                                placeholder: 'placeholder.Choose a time',
                                                                onChange(value, form) {
                                                                    value && form.getFieldValue('dateFrom') > value ? setDate(true) : setDate(false)
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form
                                                                                        .getFieldValue('dateFrom')
                                                                                        .format('MM/DD/YYYY 00:00:00')
                                                                                        .replace(/-/g, '/')
                                                                                    : '',
                                                                                dateTo: value ? value.format('MM/DD/YYYY 23:59:59').replace(/-/g, '/') : '',
                                                                            },
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            categoryId2: form.getFieldValue('categoryId2'),
                                                                            categoryId3: form.getFieldValue('categoryId3'),
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        }
                                                                    });
                                                                },
                                                            },
                                                        },
                                                    ]}
                                                />
                                                {date && (<span className='sm:w-[520px] text-center md:text-right text-red-500 -mt-4 mb-4 z-40'>Ngày kết thúc phải lớn hơn ngày bắt đầu</span>)}
                                            </div>
                                        }
                                        subHeader={() => (
                                            <Form
                                                className="intro-x rounded-lg form-store form-header-category -mt-4"
                                                values={{
                                                    categoryId1: getFilter(inventoryListProductFacade.queryParams, 'categoryId1'),
                                                    categoryId2: getFilter(inventoryListProductFacade.queryParams, 'categoryId2'),
                                                    categoryId3: getFilter(inventoryListProductFacade.queryParams, 'categoryId3'),
                                                    dateFrom: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateFrom,
                                                    dateTo: getFilter(inventoryListProductFacade.queryParams, 'filterDate')?.dateTo,
                                                    status: getFilter(inventoryListProductFacade.queryParams, 'status'),
                                                    idSupplier: getFilter(inventoryListProductFacade.queryParams, 'idSupplier'),
                                                }}
                                                columns={
                                                    [
                                                        {
                                                            title: '',
                                                            name: 'categoryId1',
                                                            formItem: {
                                                                tabIndex: 3,
                                                                placeholder: 'placeholder.Main categories',
                                                                type: 'select',
                                                                col: 3,
                                                                list: category1?.map((item) => ({
                                                                    label: item?.name!,
                                                                    value: item?.id!
                                                                })),
                                                                onChange(value, form) {
                                                                    setCategoryId1(value)
                                                                    setCategoryId2('')
                                                                    form.resetFields(['categoryId2', 'categoryId3'])
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            categoryId1: value,
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        }
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
                                                                    value: item?.id!
                                                                })),
                                                                disabled: (values: any, form: any) => categoryId1 ?
                                                                    category2?.length === 0 ? true
                                                                        : category2 ? false : true
                                                                    : true,
                                                                onChange(value, form) {
                                                                    setCategoryId2(value)
                                                                    form.resetFields(['categoryId3'])
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            categoryId2: value,
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        }
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
                                                                    value: item?.id!
                                                                })),
                                                                disabled: (values: any, form: any) => categoryId2 ?
                                                                    category3?.length === 0 ? true
                                                                        : category3 ? false : true
                                                                    : true,
                                                                onChange(value, form) {
                                                                    dataTableRefInventory?.current?.onChange({
                                                                        page: 1,
                                                                        perPage: 10,
                                                                        filter: {
                                                                            categoryId3: value,
                                                                            categoryId1: form.getFieldValue('categoryId1'),
                                                                            categoryId2: form.getFieldValue('categoryId2'),
                                                                            status: form.getFieldValue('status'),
                                                                            filterDate: {
                                                                                dateFrom: form.getFieldValue('dateFrom')
                                                                                    ? form.getFieldValue('dateFrom')
                                                                                    : '',
                                                                                dateTo: form.getFieldValue('dateTo') ? form.getFieldValue('dateTo') : '',
                                                                            },
                                                                            idSupplier: form.getFieldValue('idSupplier'),
                                                                        }
                                                                    });
                                                                },
                                                            },
                                                        },
                                                    ]}
                                                disableSubmit={isLoading}
                                            />
                                        )}
                                    />
                                )}
                                <div className="flex sm:justify-end justify-center items-center p-5">
                                    <Button
                                        disabled={inventoryListProductFacade.result?.data?.length === 0 ? true : false}
                                        text={t('titles.Export report')}
                                        className={
                                            'flex bg-teal-900 text-white sm:w-44 w-[64%] rounded-xl items-center justify-center disabled:opacity-50'
                                        }
                                        onClick={() => {
                                            const inventory = inventoryListProductFacade?.result?.data?.map((item) => {
                                                return {
                                                    STT: i++,
                                                    productCode: item?.productCode,
                                                    productName: item?.productName,
                                                    barcode: item?.barcode,
                                                    subTotal: parseInt(item?.subTotal!).toLocaleString(),
                                                    total: parseInt(item?.total!).toLocaleString(),
                                                    status:
                                                        item?.status === 'APPROVED'
                                                            ? t('Đang bán')
                                                            : t('')
                                                };
                                            });

                                            const excel = new Excel();
                                            const sheet = excel.addSheet('Sheet1');
                                            sheet.setTHeadStyle({
                                                background: 'FFFFFFFF',
                                                borderColor: 'C0C0C0C0',
                                                wrapText: false,
                                                fontName: 'Calibri',
                                            });
                                            sheet.setTBodyStyle({ wrapText: false, fontSize: 12, fontName: 'Calibri' });
                                            sheet.setRowHeight(0.8, 'cm');
                                            sheet.addColumns([
                                                { title: '', dataIndex: '' },
                                                { title: '', dataIndex: '' },
                                                { title: 'BÁO CÁO DOANH THU NHÀ CUNG CẤP THEO SẢN PHẨM', dataIndex: '' },
                                            ]);
                                            // sheet.drawCell(10, 0, '');
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Tìm kiếm:', dataIndex: '' },
                                                {
                                                    title: JSON.parse(inventoryListProductFacade.queryParams || '{}').fullTextSearch || '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Chọn loại đơn hàng:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'status')
                                                        ? `${statusProduct.find((item) => {
                                                            return item.value === getFilter(inventoryListProductFacade.queryParams, 'status');
                                                        })?.label
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                                { title: 'Chọn nhà cung cấp:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'idSupplier')
                                                        ? `${supplierOrderFacade?.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryListProductFacade.queryParams, 'idSupplier');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                            ]);
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Từ ngày', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'filterDate')['dateFrom']
                                                        ? dayjs(getFilter(inventoryListProductFacade.queryParams, 'filterDate')['dateFrom']).format('DD/MM/YYYY')
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },

                                                { title: 'Đến ngày', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'filterDate')['dateTo']
                                                        ? dayjs(getFilter(inventoryListProductFacade.queryParams, 'filterDate')['dateTo']).format('DD/MM/YYYY')
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addColumns([
                                                { title: 'Danh mục chính:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'categoryId1')
                                                        ? `${supplierOrderFacade?.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryListProductFacade.queryParams, 'categoryId1');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                                { title: 'Danh mục 1:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'categoryId2')
                                                        ? `${supplierOrderFacade?.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryListProductFacade.queryParams, 'categoryId2');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                                { title: 'Danh mục 2:', dataIndex: '' },
                                                {
                                                    title: getFilter(inventoryListProductFacade.queryParams, 'categoryId3')
                                                        ? `${supplierOrderFacade?.result?.data?.find((item) => {
                                                            return item.id === getFilter(inventoryListProductFacade.queryParams, 'categoryId3');
                                                        })?.name
                                                        }`
                                                        : '',
                                                    dataIndex: '',
                                                },
                                                { title: '', dataIndex: '' },
                                            ]);
                                            sheet.addRow();
                                            sheet.addRow();
                                            sheet
                                                .addColumns(columnrevenueProduct)
                                                .addDataSource(inventory ?? [], {
                                                    str2Percent: true,
                                                })
                                                .addColumns([
                                                    { title: '', dataIndex: '' },
                                                    { title: '', dataIndex: '' },
                                                    { title: '', dataIndex: '' },
                                                    { title: 'Tổng', dataIndex: '' },
                                                    { title: inventoryListProductFacade.result?.total?.subTotal?.toLocaleString(), dataIndex: '' },
                                                    {
                                                        title: inventoryListProductFacade.result?.total?.total?.toLocaleString(),
                                                        dataIndex: '',
                                                    },
                                                    { title: '', dataIndex: '' },
                                                ])
                                                .saveAs(t('Doanh thu nhà cung cấp theo sản phẩm.xlsx'));
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    </Tabs.TabPane>
                </Tabs>
            </Fragment>
        </div>
    );
};
export default Page;
