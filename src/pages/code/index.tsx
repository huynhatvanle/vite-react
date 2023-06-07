import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { lang, keyRole, routerLinks } from '@utils';
import { GlobalFacade, CodeFacade, CodeTypeFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { TableRefObject } from '@models';
import { Popconfirm, Tooltip } from 'antd';
import { useNavigate } from 'react-router';

const Page = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  const { result, get } = CodeTypeFacade();
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

  const dataTableRef = useRef<TableRefObject>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Fragment>
      <DataTable
        className={'max-w-5xl mx-auto'}
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
              filter: {
                type: 'radio',
                list: listType || [],
              },
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
    </Fragment>
  );
};
export default Page;
