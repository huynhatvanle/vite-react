import { Popconfirm, Tooltip } from 'antd';
import React from 'react';

import { Avatar } from '@core/avatar';
import { keyRole } from '@utils';
import { DataTableModel, FormModel } from '@models';
import { Edit, Trash } from 'src/assets/svgs';
import { UserFacade } from '@store';

export const ColumnTableUserTeam = ({ t, modalFormRef, permissions }: any) => {
  const col: DataTableModel[] = [
    {
      title: t('team.Name'),
      name: 'name',
      tableItem: {
        sorter: true,
      },
    },
    {
      title: t('dayoff.Manager'),
      name: 'manager',
      tableItem: {
        render: (text: any) => text && <Avatar src={text.avatar} text={text.name} />,
      },
    },
    {
      title: t('user.Description'),
      name: 'description',
      tableItem: {},
    },
    {
      title: t('user.Action'),
      tableItem: {
        width: 90,
        align: 'center',
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
        }),
        render: (text: string, data: any) => (
          <div className={'flex gap-2'}>
            {permissions?.includes(keyRole.P_USER_TEAM_UPDATE) && (
              <Tooltip title={t('routes.admin.Layout.Edit')}>
                <Edit
                  className="icon-cud bg-blue-600 w-9 h-7 fill-white rounded"
                  onClick={() => modalFormRef?.current?.handleEdit(data)}
                />
              </Tooltip>
            )}

            {permissions?.includes(keyRole.P_USER_TEAM_DELETE) && (
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
  ];
  return col;
};
export const ColumnFormUserTeam = ({ t, listRole }: any) => {
  const col: FormModel[] = [
    {
      title: t('team.Name'),
      name: 'name',
      formItem: {
        rules: [{ type: 'required' }],
      },
    },
    {
      title: t('user.Description'),
      name: 'description',
      formItem: {
        type: 'textarea',
      },
    },
    {
      title: t('dayoff.Manager'),
      name: 'managerId',
      formItem: {
        rules: [{ type: 'required' }],
        type: 'select',
        get: {
          facade: UserFacade,
          params: (form: any, fullTextSearch: string) => ({
            fullTextSearch,
            filter: { roleId: listRole.filter((item: any) => item.name == 'Manager')[0]?.id },
            extend: {},
          }),
          format: (item: any) => ({
            label: item.name,
            value: item.id,
          }),
        },
      },
    },
  ];

  return col;
};
