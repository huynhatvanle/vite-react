import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Popconfirm, Tooltip } from 'antd';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { TableRefObject } from '@models';
import { GlobalFacade, PageFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { lang, keyRole, routerLinks } from '@utils';
import { useNavigate } from 'react-router';

const Page = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  useEffect(() => {
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Page', link: '' },
    ]);
  }, []);

  const pageFacade = PageFacade();
  useEffect(() => {
    switch (pageFacade.status) {
      case 'delete.fulfilled':
        pageTableRef?.current?.onChange!();
        break;
    }
  }, [pageFacade.status]);

  const pageTableRef = useRef<TableRefObject>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  return (
    <Fragment>
      <DataTable
        className={'container mx-auto'}
        facade={pageFacade}
        showSearch={false}
        ref={pageTableRef}
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
            title: 'user.Name',
            name: 'name',
            tableItem: {
              filter: { type: 'search' },
              sorter: true,
            },
          },
          {
            title: 'Data.Order',
            name: 'order',
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
                        onClick={() => navigate(`/${lang}${routerLinks('Page')}/${data.id}/edit`)}
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
                        onConfirm={() => pageTableRef?.current?.handleDelete!(data.id)}
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
            {user?.role?.permissions?.includes(keyRole.P_PAGE_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => navigate(`/${lang}${routerLinks('Page/Add')}`)}
              />
            )}
          </div>
        }
      />
    </Fragment>
  );
};
export default Page;
