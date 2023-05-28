import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { Popconfirm } from 'antd';

import { Avatar } from '@core/avatar';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { TableRefObject } from '@models';
import { UserFacade, GlobalFacade, CodeFacade, UserTeamFacade, ManagerFacade, UserRoleFacade } from '@store';
import { Plus } from '@svgs';
import { keyRole, routerLinks, language, languages } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const userFacade = UserFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <DataTable
      facade={userFacade}
      ref={dataTableRef}
      onRow={() => ({ onDoubleClick: () => null })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.User', { from, to, total })
      }
      columns={[
        {
          title: `user.Fullname`,
          name: 'name',
          tableItem: {
            filter: { type: 'search' },
            width: 200,
            fixed: window.innerWidth > 767 ? 'left' : '',
            sorter: true,
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: 0 },
              onClick: async () => null,
            }),
            render: (text: string, item: any) => text && <Avatar src={item.avatar} text={item.name} />,
          },
        },
        {
          title: 'user.Position',
          name: 'position',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'positionCode',
              get: {
                facade: CodeFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  filter: { type: 'POS' },
                  extend: { code: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: 'user.Role',
          name: 'role',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'roleCode',
              get: {
                facade: UserRoleFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.code,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  extend: { code: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: 'team.Manager',
          name: 'manager',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'positionCode',
              get: {
                facade: ManagerFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  filter: { roleCode: 'manager' },
                  extend: { id: value },
                }),
              },
            },
            sorter: true,
            render: (item) => item?.name,
          },
        },
        {
          title: 'user.Team',
          name: 'teams.id',
          tableItem: {
            filter: {
              type: 'checkbox',
              name: 'teams.id',
              get: {
                facade: UserTeamFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
                params: (fullTextSearch: string, value) => ({
                  fullTextSearch,
                  extend: { id: value },
                }),
              },
            },
            render: (data, item) => item.teams.map((i: any) => i.name).join(','),
          },
        },
        {
          title: 'Email',
          name: 'email',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: 'user.Phone Number',
          name: 'phoneNumber',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
          },
        },
        {
          title: 'user.Date of birth',
          name: 'dob',
          tableItem: {
            filter: { type: 'date' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: 'user.Start Date',
          name: 'startDate',
          tableItem: {
            filter: { type: 'search' },
            sorter: true,
            render: (text: string) => dayjs(text).format(formatDate),
          },
        },
        {
          title: 'user.Action',
          tableItem: {
            width: 80,
            align: 'center',
            onCell: () => ({
              style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
            }),
            render: (text: string, data) => (
              <div className={'flex gap-2'}>
                {user?.role?.permissions?.includes(keyRole.P_USER_UPDATE) && (
                  <Button
                    className={'!px-1 !py-0.5'}
                    text={t('routes.admin.Layout.Edit')}
                    onClick={() => navigate(`/${lang}${routerLinks('User')}/${data.id}`)}
                  />
                )}

                {user?.role?.permissions?.includes(keyRole.P_USER_DELETE) && (
                  <Popconfirm
                    placement="left"
                    title={t('components.datatable.areYouSureWant')}
                    onConfirm={() => dataTableRef?.current?.handleDelete(data.id)}
                    okText={t('components.datatable.ok')}
                    cancelText={t('components.datatable.cancel')}
                  >
                    <Button
                      className={'!px-1 !py-0.5 !bg-red-600 hover:!bg-red-500'}
                      text={t('routes.admin.Layout.Delete')}
                    />
                  </Popconfirm>
                )}
              </div>
            ),
          },
        },
      ]}
      rightHeader={
        <div className={'flex gap-2'}>
          {user?.role?.permissions?.includes(keyRole.P_USER_CREATE) && (
            <Button
              icon={<Plus className="icon-cud !h-5 !w-5" />}
              text={t('components.button.New')}
              onClick={() => navigate(`/${lang}${routerLinks('User/Add')}`)}
            />
          )}
        </div>
      }
    />
  );
};
export default Page;
