import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '@core/data-table';
import { ModalForm } from '@core/modal/form';
import { Button } from '@core/button';
import { GlobalFacade, UserFacade, UserTeamFacade } from '@store';

import { keyRole } from '@utils';
import { Edit, Plus, Trash } from 'src/assets/svgs';
import { Avatar } from '@core/avatar';
import { Popconfirm, Tooltip } from 'antd';

const Page = () => {
  const { t } = useTranslation();
  const { user } = GlobalFacade();
  const userTeamFacade = UserTeamFacade();
  const { status } = userTeamFacade;
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef.current.onChange();
        break;
    }
  }, [status]);

  const dataTableRef = useRef<any>();

  const modalFormRef = useRef<any>();
  return (
    <Fragment>
      <DataTable
        facade={userTeamFacade}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) => t('team.Pagination', { from, to, total })}
        columns={[
          {
            title: 'team.Name',
            name: 'name',
            tableItem: {
              sorter: true,
            },
          },
          {
            title: 'dayoff.Manager',
            name: 'manager',
            tableItem: {
              render: (text: any) => text && <Avatar src={text.avatar} text={text.name} />,
            },
          },
          {
            title: 'user.Description',
            name: 'description',
            tableItem: {},
          },
          {
            title: 'user.Action',
            tableItem: {
              width: 90,
              align: 'center',
              onCell: () => ({
                style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
              }),
              render: (text: string, data: any) => (
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_USER_TEAM_UPDATE) && (
                    <Tooltip title={t('routes.admin.Layout.Edit')}>
                      <Edit
                        className="icon-cud bg-blue-600 w-9 h-7 fill-white rounded"
                        onClick={() => modalFormRef?.current?.handleEdit(data)}
                      />
                    </Tooltip>
                  )}

                  {user?.role?.permissions?.includes(keyRole.P_USER_TEAM_DELETE) && (
                    <Tooltip title={t('routes.admin.Layout.Delete')}>
                      <Popconfirm
                        placement="left"
                        title={t('components.datatable.areYouSureWant')}
                        onConfirm={() => modalFormRef?.current?.handleDelete(data.id)}
                        okText={t('components.datatable.ok')}
                        cancelText={t('components.datatable.cancel')}
                      >
                        <Trash className="icon-cud bg-red-500 w-9 h-7 fill-white rounded" />
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
            {user?.role?.permissions?.includes(keyRole.P_USER_TEAM_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        facade={userTeamFacade}
        ref={modalFormRef}
        title={(data: any) => (!data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        columns={[
          {
            title: 'team.Name',
            name: 'name',
            formItem: {
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'user.Description',
            name: 'description',
            formItem: {
              type: 'textarea',
            },
          },
          {
            title: 'dayoff.Manager',
            name: 'managerId',
            formItem: {
              rules: [{ type: 'required' }],
              type: 'select',
              get: {
                facade: UserFacade,
                params: (fullTextSearch) => ({
                  fullTextSearch,
                  filter: { roleCode: 'manager' },
                  extend: {},
                }),
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
              },
            },
          },
        ]}
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
