import React from 'react';
import dayjs from 'dayjs';
import { Popconfirm, Tooltip } from 'antd';

import { Avatar } from '@core/avatar';
import { DataTableModel, FormModel } from '@models';
import { keyRole } from '@utils';
import { CheckCircle, Times, Trash } from 'src/assets/svgs';

export const ColumnDayOffTable = ({ t, formatDate, listType, listTime, permissions, dataTableRef, user }: any) => {
  const col: DataTableModel[] = [
    {
      title: t('dayoff.Fullname'),
      name: 'staff',
      tableItem: {
        sorter: true,
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: () => null,
        }),
        render: (value, item) => item.staff?.name && <Avatar src={item.staff?.avatar} text={item.staff?.name} />,
      },
    },
    {
      title: t('dayoff.Manager'),
      name: 'manager',
      tableItem: {
        // filter: {
        //   type: 'checkbox',
        //   name: 'teams',
        //   api: {
        //     link: () => routerLinks('UserTeam', 'api') + '/',
        //     format: (item: any) => ({
        //       label: item.name,
        //       value: item.id,
        //     }),
        //   },
        // },
        render: (text: any, item) =>
          item.manager?.name && <Avatar src={item.manager?.avatar} text={item.manager?.name} />,
      },
    },
    {
      title: t('dayoff.Type'),
      name: 'type',
      tableItem: {
        width: 190,
        sorter: true,
        render: (text: string) => text !== undefined && listType.filter((item: any) => item.value === text)[0].label,
      },
    },
    {
      title: t('dayoff.Time'),
      name: 'time',
      tableItem: {
        width: 110,
        sorter: true,
        render: (text: string) => text !== undefined && listTime.filter((item: any) => item.value === text)[0].label,
      },
    },
    {
      title: t('dayoff.Leave Date'),
      name: 'dateLeaveStart',
      tableItem: {
        width: 210,
        filter: { type: 'date' },
        sorter: true,
        render: (text: string, item: any) => {
          const startDate = dayjs(text).format(formatDate);
          const endDate = dayjs(item.dateLeaveEnd).format(formatDate);
          return startDate + (startDate !== endDate ? ' => ' + endDate : '');
        },
      },
    },
    {
      title: t('dayoff.Status'),
      name: 'status',
      tableItem: {
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' } }),
        filter: {
          type: 'radio',
          list: [
            { label: 'Pending', value: 0 },
            { label: 'Approved', value: 1 },
            { label: 'Rejected', value: -1 },
          ],
        },
        width: 130,
        sorter: true,
        render: (text: number) =>
          text !== 0 ? (
            text === 1 ? (
              <CheckCircle className="w-5 h-5 fill-green-500 !flex !justify-center" />
            ) : (
              <Times className="w-5 h-5 fill-red-500 !flex !justify-center" />
            )
          ) : (
            ''
          ),
      },
    },
    {
      title: t('dayoff.Approved Date'),
      name: 'approvedAt',
      tableItem: {
        width: 180,
        filter: { type: 'date' },
        sorter: true,
        render: (text: string) => (text ? dayjs(text).format(formatDate) : ''),
      },
    },
    {
      title: t('dayoff.Approved By'),
      name: 'approvedBy',
      tableItem: {
        onCell: () => ({
          style: { paddingTop: '0.25rem', paddingBottom: 0 },
          onClick: async () => null,
        }),
        render: (value, item) =>
          item.approvedBy?.name && <Avatar src={item.approvedBy?.avatar} text={item.approvedBy?.name} />,
      },
    },
    {
      title: t('user.Action'),
      tableItem: permissions?.includes(keyRole.P_DAYOFF_DELETE) && {
        width: 90,
        fixed: window.innerWidth > 767 && 'right',
        align: 'center',
        onCell: () => ({ style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' } }),
        render: (text: string, data: any) => (
          <div className={'flex justify-center'}>
            {/* {permissions?.includes(keyRole.P_DAYOFF_UPDATE) && data.staff?.id === user.id && data.status === 0 && (
              <Tooltip title={t('routes.admin.Layout.Edit')}>
                <Edit
                  className="icon-cud bg-blue-600 hover:bg-blue-400"
                  onClick={() => navigate(routerLinks('DayOff') + '/' + data.id)}
                />
              </Tooltip>
            )} */}

            {permissions?.includes(keyRole.P_DAYOFF_DELETE) && data.staff?.id === user.id && data.status === 0 && (
              <Tooltip title={t('routes.admin.Layout.Delete')}>
                <Popconfirm
                  placement="left"
                  title={t('components.datatable.areYouSureWant')}
                  onConfirm={() => {
                    dataTableRef?.current?.handleDelete(data.id);
                  }}
                  okText={t('components.datatable.ok')}
                  cancelText={t('components.datatable.cancel')}
                >
                  <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
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
export const ColumnDayOffForm = ({ t, listType, listTime, user }: any) => {
  const col: FormModel[] = [
    {
      name: 'type',
      title: t('dayoff.register.Leave Type'),
      formItem: {
        type: 'select',
        col: 6,
        rules: [{ type: 'required' }],
        list: listType || [],
        onChange: (value: number, form: any) => {
          const dateLeave = form.getFieldValue('dateLeave');
          if (
            value === 1 &&
            dateLeave &&
            user.dateLeave > user.dateOff &&
            dateLeave[1].diff(dateLeave[0], 'days') > user.dateLeave - user.dateOff
          ) {
            listTime[0].disabled = value === 1 ? user.dateLeave - user.dateOff < 1 : false;
            form.resetFields(['dateLeave', 'time']);
          }
        },
      },
    },
    {
      name: 'time',
      title: t('dayoff.register.Time'),
      formItem: {
        type: 'select',
        col: 6,
        rules: [{ type: 'required' }],
        disabled: (values: any, form: any) =>
          form.getFieldValue('date') && form.getFieldValue('date')[1].diff(form.getFieldValue('date')[0], 'days') > 0,
        onChange: (value: number, form: any) => {
          form.resetFields(['dateLeave']);
        },
        list: listTime || [],
      },
    },
    {
      title: t('dayoff.Leave Date'),
      name: 'dateLeave',
      formItem: {
        type: 'date_range',
        rules: [{ type: 'required' }],
        disabledDate: (current: any, form: any) => {
          if (
            current.startOf('day').toString() !== current.startOf('week').toString() &&
            current.endOf('day').toString() !== current.endOf('week').toString()
          ) {
            const dateLeave = form.getFieldValue('dateLeave');
            if (dateLeave && !dateLeave[0]) {
              return false;
            }
            const type = form.getFieldValue('type');
            if (dateLeave && (!type || type === 1)) {
              let number;
              const floorLeave = Math.floor(user.dateLeave - user.dateOff);

              if (floorLeave < 7 && dateLeave[0].get('day') + floorLeave < 7) number = -1;
              else number = Math.floor((dateLeave[0].get('day') + 1 + floorLeave) / 7);
              console.log(number);
              if (number > 1) {
                number = number - 1 + (number - 1) * 2;
              }
              const day = dateLeave[0].add(floorLeave + number, 'days').get('day');
              if (day === 6 || day === 0) {
                number += day === 6 ? 2 : 1;
              }

              if (floorLeave > 12 && floorLeave < 15 && dateLeave[0].get('day') === 5) {
                number += 1;
              }
              if (floorLeave > 13 && floorLeave < 15 && dateLeave[0].get('day') === 5) {
                number += 1;
              }
              if (floorLeave > 14 && floorLeave < 17 && dateLeave[0].get('day') === 5) {
                number -= 1;
              }

              if (floorLeave > 13 && floorLeave < 16 && dateLeave[0].get('day') === 4) {
                number += 1;
              }
              if (floorLeave > 14 && floorLeave < 16 && dateLeave[0].get('day') === 4) {
                number += 1;
              }
              if (floorLeave > 15 && dateLeave[0].get('day') === 4) {
                number -= 1;
              }
              if (floorLeave > 16 && dateLeave[0].get('day') === 4) {
                number -= 1;
              }

              if (floorLeave > 14 && floorLeave < 17 && dateLeave[0].get('day') === 3) {
                number += 1;
              }
              if (floorLeave > 15 && floorLeave < 17 && dateLeave[0].get('day') === 3) {
                number += 1;
              }
              if (floorLeave > 16 && dateLeave[0].get('day') === 3) {
                number -= 1;
              }

              if (floorLeave > 15 && dateLeave[0].get('day') === 2) {
                number += 1;
              }
              if (floorLeave > 16 && dateLeave[0].get('day') === 2) {
                number += 1;
              }

              if (floorLeave > 16 && dateLeave[0].get('day') === 1) {
                number += 1;
              }

              return dateLeave[0] && current.diff(dateLeave[0], 'days') > floorLeave + number;
            }
            return false;
          }
          return true;
        },
        onChange: (value: any[], form: any) => {
          if (value && value.length === 2 && value[1].diff(value[0], 'days') > 0) {
            form.setFieldValue('time', 0);
          }
        },
      },
    },
    {
      name: 'reason',
      title: t('dayoff.Reason'),
      formItem: {
        col: 8,
        type: 'textarea',
        rules: [{ type: 'required' }],
      },
    },
    {
      name: 'image',
      title: t('dayoff.register.Upload screenshot'),
      formItem: {
        col: 4,
        type: 'upload',
      },
    },
  ];
  return col;
};
