import { Popconfirm, Tooltip } from 'antd';
import React from 'react';

import { Button } from '@components';
import { keyRole } from '@utils';
import { DataTableModel } from '@models';

const Column = ({ t, handleEdit, handleDelete, listType, permissions }: any) => {
  const col: DataTableModel[] = [
    {
      title: t('Type'),
      name: 'type',
      tableItem: {
        filter: {
          type: 'radio',
          list: listType || [],
        },
        width: 110,
        sorter: true,
        render: (text: string) => text && listType.filter((item: any) => item.value === text)[0]?.label,
      },
    },
    {
      title: t('Name'),
      name: 'translations',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
        render: (text: any[]) =>
          text?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].name || '',
      },
    },
    {
      title: t('Order'),
      name: 'order',
      tableItem: {
        filter: { type: 'search' },
        sorter: true,
      },
    },
    {
      title: t('Action'),
      tableItem: {
        width: 100,
        align: 'center',
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
        }),
        render: (text: string, data: any) => (
          <div className={'flex gap-2'}>
            {permissions?.includes(keyRole.P_CODE_UPDATE) && (
              <Tooltip title={t('routes.admin.Layout.Edit')}>
                <Button onClick={() => handleEdit(data)} icon={'las la-edit'} />
              </Tooltip>
            )}
            {permissions?.includes(keyRole.P_CODE_DELETE) && (
              <Tooltip title={t('routes.admin.Layout.Delete')}>
                <Popconfirm
                  placement="left"
                  title={t('components.datatable.areYouSureWant')}
                  icon={<i className="las la-question-circle text-2xl text-yellow-500 absolute -top-0.5 -left-1" />}
                  onConfirm={() => handleDelete(data.id)}
                  okText={t('components.datatable.ok')}
                  cancelText={t('components.datatable.cancel')}
                >
                  <Button className={'bg-red-500 text-white'} icon={'las la-trash-alt'} />
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
export default Column;
