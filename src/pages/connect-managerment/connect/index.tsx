import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import dayjs from 'dayjs';

import { Infor, Plus } from '@svgs';
import { ConnectFacade,GlobalFacade } from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { language, languages, routerLinks } from '@utils';
import { Tooltip } from 'antd';

const Page = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isReload = useRef(false);
    const connectFacade = ConnectFacade();
    const { result, queryParams } = connectFacade;
    const param = JSON.parse(queryParams || '{}');
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
    const { formatDateTime } = GlobalFacade();
    // useEffect(() => {
    //   if (!result?.data) storeFace.get({ page: 1, perPage: 10, filter: {type: 'STORE'}, })

    //   return () => {
    //     isReload.current && storeFace.get(param);
    //   };
    // }, [result?.data]);

    return (
        <DataTable
            facade={connectFacade}
            defaultRequest={{ page: 1, perPage: 10 }}
            xScroll='1440px'
            className=' bg-white p-5 rounded-lg'
            onRow={(data: any) => ({
                onDoubleClick: () => {
                    navigate(`/${lang}${routerLinks('connect-managerment/connect')}/${data.id}`)
                    
                },
            })}
            pageSizeRender={(sizePage: number) => sizePage}
            pageSizeWidth={'50px'}
            paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.PaginationStore', { from, to, total })
            }
            columns={[
                {
                    title: 'store.Code',
                    name: 'code',
                    tableItem: {
                        width: 150,
                    },
                },
                
                {
                    title: 'store.Name',
                    name: 'store',
                    tableItem: {
                    },
                },
                {
                    title: 'store.productName',
                    name: 'productName',
                    tableItem: {
                       
                    },
                },
                {
                    title: 'store.requestedAt',
                    name: 'requestedAt',
                    tableItem: {
                        render: (text: string) => (text ? dayjs(text).format(formatDateTime).replace(/-/g, '-') : ''),
                    },
                },
                {
                    title: 'store.approvedAt',
                    name: 'approvedAt',
                    tableItem: {
                        render: (text: string) => (text ? dayjs(text).format(formatDateTime).replace(/-/g, '-') : ''),
                    },
                },
                {
                    title: 'store.status.status',
                    name: 'status',
                    tableItem: {
                        render:(text, item) => item?.status === 'APPROVED' ? 
                        (
                         <div className="bg-green-50 text-center p-1 border border-green-500 rounded-lg text-green-500 w-[144px]">
                           {t('store.status.APPROVED')}
                         </div>
                       ) :item?.status === 'WAITING_ADMIN' ? (
                         <div className="bg-yellow-50 text-center p-1 border border-yellow-500 rounded-lg text-yellow-500 w-[144px]">
                           {t('store.status.WAITING_ADMIN')}
                         </div>
                       ):item?.status === 'WAITING_STORE'?(
                         <div className="bg-blue-50 text-center p-1 border border-blue-500 rounded-lg text-blue-500 w-[144px]">
                           {t('store.status.WAITING_STORE')}
                         </div>
                       ):(
                         <div className="bg-red-50 text-center p-1 border border-red-500 rounded-lg text-red-500 w-[144px]">
                           {t('store.status.REJECT_BY_ADMIN')}
                         </div>
                       ) ,
                       
                    },
                },
            ]}
            rightHeader={
                <div className={'flex gap-2 !bg-teal-900 !rounded-xl mt-2.5 lg:mt-0 w-48 lg:w-full'}>
                    <Button
                        className='!bg-teal-900 !rounded-3xl !font-normal'
                        icon={<Plus className="icon-cud !h-5 !w-5 !fill-white " />}
                        text={t('titles.Store/Add')}
                        onClick={() => navigate(`/${lang}${routerLinks('store-managerment/create')}`)}
                    />
                </div>
            }
        />
    );
};
export default Page;
