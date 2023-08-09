import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Infor, Plus } from '@svgs';
import { StoreFacade } from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { language, languages, routerLinks } from '@utils';
import { Tooltip } from 'antd';

const Page = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isReload = useRef(false);
    const storeFace = StoreFacade();
    const { result, queryParams } = storeFace;
    const param = JSON.parse(queryParams || '{}');
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

    // useEffect(() => {
    //   if (!result?.data) storeFace.get({ page: 1, perPage: 10, filter: {type: 'STORE'}, })

    //   return () => {
    //     isReload.current && storeFace.get(param);
    //   };
    // }, [result?.data]);

    return (
        <DataTable
            facade={storeFace}
            defaultRequest={{ page: 1, perPage: 10, filter: { type: 'STORE' }, fullTextSearch: '' }}
            xScroll='1440px'
            className=' bg-white p-5 rounded-lg'
            onRow={(data: any) => ({
                onDoubleClick: () => {
                    navigate(`/${lang}${routerLinks('store-managerment/edit')}/${data.id}?tab=1`)
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
                    name: 'name',
                    tableItem: {
                        onCell: (data: any) => ({
                            style: { cursor: 'pointer' },
                            onClick: () => navigate(`/${lang}${routerLinks('store-managerment/edit')}/${data.id}?tab=1`)
                        })
                    },
                },
                {
                    title: 'store.Address',
                    name: 'address',
                    tableItem: {
                        render: (value: any, item: any) => {
                            const address = item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name
                            return (
                                <div className='flex'>
                                    {address.slice(0, 60)}
                                    {address.length >= 60 ?
                                        <Tooltip title={address} className='text-black' >
                                            <Infor className='w-4 h-4 mt-1 ml-1' />
                                        </Tooltip>
                                        : null
                                    }
                                </div>
                            )
                        }
                    },
                },
                {
                    title: 'store.Type',
                    name: 'isMain',
                    tableItem: {
                        render: (text: string) => text ? 'Cửa hàng chính' : 'Cửa hàng chi nhánh'
                    },
                },
                {
                    title: 'store.ContactName',
                    name: 'userRole',
                    tableItem: {
                        render: (value: any, item: any) => item.userRole[0]?.userAdmin.name,
                    },
                },
                {
                    title: 'store.Phone Number',
                    name: 'userRole',
                    tableItem: {
                        render: (value: any, item: any) => item.userRole[0]?.userAdmin.phoneNumber,
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
