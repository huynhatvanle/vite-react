import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { keyRole, routerLinks, language, languages } from '@utils';
import { GlobalFacade, DataTypeFacade, DataFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { TableRefObject } from '@models';
import { Popconfirm, Tooltip } from 'antd';
import { useNavigate } from 'react-router';

const Page = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  const { result, get } = DataTypeFacade();
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));
  useEffect(() => {
    if (!result?.data) get({});
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Data', link: '' },
    ]);
  }, []);

  const dataFacade = DataFacade();
  useEffect(() => {
    switch (dataFacade.status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [dataFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  return (
    <Fragment>
      <DataTable
        className={'container mx-auto'}
        facade={dataFacade}
        showSearch={false}
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
            title: 'Data.Type',
            name: 'type',
            tableItem: {
              filter: {
                type: 'radio',
                list: listType || [],
              },
              width: 150,
              sorter: true,
              render: (text: string) => (text && listType.filter((item) => item.value === text)[0]?.label) || '',
            },
          },
          {
            title: 'Data.Name',
            name: 'translations',
            tableItem: {
              filter: { type: 'search' },
              sorter: true,
              render: (text) =>
                text?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].name || '',
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
                        onClick={() => navigate(`/${lang}${routerLinks('Data')}/${data.id}/edit`)}
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
            {user?.role?.permissions?.includes(keyRole.P_DATA_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => navigate(`/${lang}${routerLinks('Data/Add')}`)}
              />
            )}
          </div>
        }
      />
    </Fragment>
  );
};
export default Page;
