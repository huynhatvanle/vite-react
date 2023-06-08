import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { lang, keyRole, routerLinks } from '@utils';
import { GlobalFacade, CodeFacade, CodeTypeFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { TableRefObject } from '@models';
import { Popconfirm, Spin, Tooltip } from 'antd';
import { useNavigate } from 'react-router';
import classNames from "classnames";

const Page = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  const { result, get, isLoading } = CodeTypeFacade();
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));
  useEffect(() => {
    if (!result?.data) get({});
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Code', link: '' },
    ]);
  }, []);

  const codeFacade = CodeFacade();
  useEffect(() => {
    switch (codeFacade.status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [codeFacade.status]);

  const request = JSON.parse(codeFacade.queryParams || '{}');
  request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const dataTableRef = useRef<TableRefObject>(null);
  const navigate = useNavigate();
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Type Code</h3>
            {/*<div className="flex items-center">*/}
            {/*  <Button*/}
            {/*    icon={<Plus className="icon-cud !h-5 !w-5" />}*/}
            {/*    text={t('routes.admin.Layout.Add')}*/}
            {/*    onClick={() => navigate(`/${lang}${routerLinks('Code/Add')}`)}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <Spin spinning={isLoading}>
            <div className="h-[calc(100vh-13rem)] overflow-y-auto relative scroll">
              {result?.data?.map((data, index) => (
                <div
                  key={data.id}
                  className={classNames({'bg-gray-100': request.filter.type === data.code},'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group')}
                >
                  <div
                    onClick={() => {
                      if (request.filter.type !== data.code) request.filter.type = data.code;
                      else delete request.filter.type;
                      dataTableRef?.current?.onChange(request)
                    }}
                    className="truncate cursor-pointer flex-1 hover:text-blue-500 item-text px-4 py-2"
                  >
                    {index + 1}. {data.name}
                  </div>
                  {/*<span className="w-16 flex justify-end gap-1">*/}
                  {/*  {user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_UPDATE) && (*/}
                  {/*    <Tooltip title={t('routes.admin.Layout.Edit')}>*/}
                  {/*      <button*/}
                  {/*        className={'opacity-0 group-hover:opacity-100 transition-all duration-300 '}*/}
                  {/*        title={t('routes.admin.Layout.Edit') || ''}*/}
                  {/*        onClick={() => navigate(`/${lang}${routerLinks('Code')}/${data.id}/edit`)}*/}
                  {/*      >*/}
                  {/*        <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />*/}
                  {/*      </button>*/}
                  {/*    </Tooltip>*/}
                  {/*  )}*/}
                  {/*  {user?.role?.permissions?.includes(keyRole.P_CODE_TYPE_DELETE) && (*/}
                  {/*    <Tooltip title={t('routes.admin.Layout.Delete')}>*/}
                  {/*      <Popconfirm*/}
                  {/*        placement="left"*/}
                  {/*        title={t('components.datatable.areYouSureWant')}*/}
                  {/*        onConfirm={() => dataTableRef?.current?.handleDelete!(data.id || '')}*/}
                  {/*        okText={t('components.datatable.ok')}*/}
                  {/*        cancelText={t('components.datatable.cancel')}*/}
                  {/*      >*/}
                  {/*        <button*/}
                  {/*          className={'opacity-0 group-hover:opacity-100 transition-all duration-300'}*/}
                  {/*          title={t('routes.admin.Layout.Delete') || ''}*/}
                  {/*        >*/}
                  {/*          <Trash className="icon-cud bg-red-600 hover:bg-red-400" />*/}
                  {/*        </button>*/}
                  {/*      </Popconfirm>*/}
                  {/*    </Tooltip>*/}
                  {/*  )}*/}
                  {/*</span>*/}
                </div>
              ))}
            </div>
          </Spin>
        </div>
      </div>
      <div className="col-span-12 md:col-span-8 lg:col-span-9 intro-x">
        <div className="shadow rounded-xl w-full overflow-auto bg-white">
          <div className="h-[calc(100vh-9.5rem)] overflow-y-auto p-3">
            <DataTable
              facade={codeFacade}
              ref={dataTableRef}
              onRow={() => ({
                onDoubleClick: () => null,
              })}
              pageSizeRender={(sizePage: number) => sizePage}
              pageSizeWidth={'50px'}
              paginationDescription={(from: number, to: number, total: number) =>
                t('routes.admin.Layout.Pagination', { from, to, total })
              }
              columns={[
                {
                  title: 'titles.Code',
                  name: 'code',
                  tableItem: {
                    width: 100,
                    filter: { type: 'search' },
                    sorter: true,
                  },
                },
                {
                  title: 'Code.Name',
                  name: 'name',
                  tableItem: {
                    filter: { type: 'search' },
                    sorter: true,
                  },
                },
                {
                  title: 'Code.Type',
                  name: 'type',
                  tableItem: {
                    width: 110,
                    sorter: true,
                    render: (text: string) => text && listType.filter((item) => item.value === text)[0]?.label,
                  },
                },
                {
                  title: 'user.Description',
                  name: 'description',
                  tableItem: {
                    filter: { type: 'search' },
                    sorter: true,
                  },
                },
                {
                  title: 'user.Action',
                  tableItem: {
                    width: 100,
                    align: 'center',
                    onCell: () => ({
                      style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
                    }),
                    render: (text: string, data) => (
                      <div className={'flex gap-2'}>
                        {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (
                          <Tooltip title={t('routes.admin.Layout.Edit')}>
                            <button
                              title={t('routes.admin.Layout.Edit') || ''}
                              onClick={() => navigate(`/${lang}${routerLinks('Code')}/${data.id}/edit`)}
                            >
                              <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />
                            </button>
                          </Tooltip>
                        )}
                        {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (
                          <Tooltip title={t('routes.admin.Layout.Delete')}>
                            <Popconfirm
                              placement="left"
                              title={t('components.datatable.areYouSureWant')}
                              onConfirm={() => dataTableRef?.current?.handleDelete!(data.id)}
                              okText={t('components.datatable.ok')}
                              cancelText={t('components.datatable.cancel')}
                            >
                              <button title={t('routes.admin.Layout.Delete') || ''}>
                                <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                              </button>
                            </Popconfirm>
                          </Tooltip>
                        )}
                      </div>
                    ),
                  },
                },
              ]}
              rightHeader={
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_CODE_CREATE) && (
                    <Button
                      icon={<Plus className="icon-cud !h-5 !w-5" />}
                      text={t('routes.admin.Layout.Add')}
                      onClick={() => navigate(`/${lang}${routerLinks('Code/Add')}`)}
                    />
                  )}
                </div>
              }
            />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
