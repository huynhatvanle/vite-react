import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Edit, Infor, Plus, Trash } from '@svgs';
import { TaxFacade } from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { language, languages, routerLinks } from '@utils';
import { Popconfirm, Tooltip } from 'antd';

const Page = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const isReload = useRef(false);
    const taxFacade = TaxFacade();
    const { result, queryParams } = taxFacade;
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
            facade={taxFacade}
            defaultRequest={{ page: 1, perPage: 10, filter: { type: 'STORE' }, fullTextSearch: '' }}
            xScroll='0'
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
                    title: 'tax.stt',
                    name: 'id',
                    tableItem: {
                        width: 70,
                    },
                },
                {
                    title: 'tax.type',
                    name: 'name',
                    tableItem: {
                        render: (value: any, item: any) => {
                            return (
                                <div className='flex'>
                                    {value.slice(0, 60)}
                                    {value.length >= 60 ?
                                        <Tooltip title={item?.name} className='text-black' >
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
                    title: 'tax.taxRate',
                    name: 'taxRate',
                    tableItem: {
                    }
                },
                {
                    title: 'tax.descripton',
                    name: 'descripton',
                    tableItem: {
                    }
                },
                {
                    title: 'tax.action',
                    name: 'action',
                    tableItem: {
                        align: 'center',
                        onCell: () => ({
                            style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
                        }),
                        render: (text: string, data: any) => (
                            <div className={'flex justify-center gap-2'}>
                                <Tooltip title={t('routes.admin.Layout.Edit')}>
                                    <button
                                        title={t('routes.admin.Layout.Edit') || ''}
                                        onClick={() => navigate(`/${lang}${routerLinks('Team')}/${data.id}`)}
                                    >
                                        <Edit className="icon-cud !fill-blue-500" />
                                    </button>
                                </Tooltip>

                                <Tooltip title={t('routes.admin.Layout.Delete')}>
                                    <Popconfirm
                                        placement="left"
                                        title={t('components.datatable.areYouSureWant')}
                                        onConfirm={() => dataTableRef?.current?.handleDelete!(data.id)}
                                        okText={t('components.datatable.ok')}
                                        cancelText={t('components.datatable.cancel')}
                                    >
                                        <button title={t('routes.admin.Layout.Delete') || ''}>
                                            <Trash className="icon-cud !fill-red-500" />
                                        </button>
                                    </Popconfirm>
                                </Tooltip>
                            </div>
                        )
                    }
                },
            ]}
            rightHeader={
                <div className={'text-center !bg-teal-900 !rounded-xl mt-2.5 lg:mt-0 w-40'}>
                    <Button
                        className='!bg-teal-900 !rounded-3xl !font-normal'
                        icon={<Plus className="icon-cud !h-5 !w-5 !fill-white " />}
                        text={t('tax.add')}
                        onClick={() => navigate(`/${lang}${routerLinks('store-managerment/create')}`)}
                    />
                </div>
            }
        />
    );
};
export default Page;
