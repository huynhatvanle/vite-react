import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import dayjs from 'dayjs';
import { Popconfirm, Spin, Tooltip } from 'antd';

import { Avatar } from '@core/avatar';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';

import { TableRefObject } from '@models';
import { UserFacade, GlobalFacade, CodeFacade, UserTeamFacade, ManagerFacade, UserRoleFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { keyRole, routerLinks, lang } from '@utils';
import classNames from 'classnames';

const Page = () => {
  const userRoleFacade = UserRoleFacade();
  const { formatDate, user, setBreadcrumbs } = GlobalFacade();
  useEffect(() => {
    if (!userRoleFacade?.result?.data) userRoleFacade.get({});
    setBreadcrumbs([
      { title: 'titles.User', link: '' },
      { title: 'titles.User/List', link: '' },
    ]);
  }, []);

  const userFacade = UserFacade();
  useEffect(() => {
    switch (userFacade.status) {
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [userFacade.status]);

  const request = JSON.parse(userFacade.queryParams || '{}');
  request.filter = JSON.parse(request?.filter || '{}');
  const { t } = useTranslation();
  const navigate = useNavigate();
  const dataTableRef = useRef<TableRefObject>(null);
  return (
    <div className={'container mx-auto grid grid-cols-12 gap-3 px-2.5 pt-2.5'}>
      <div className="col-span-12 md:col-span-4 lg:col-span-3 -intro-x">
        <div className="shadow rounded-xl w-full bg-white overflow-hidden">
          <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
            <h3 className={'font-bold text-lg'}>Role</h3>
            {/*<div className="flex items-center">*/}
            {/*  <Button*/}
            {/*    icon={<Plus className="icon-cud !h-5 !w-5" />}*/}
            {/*    text={t('routes.admin.Layout.Add')}*/}
            {/*    onClick={() => navigate(`/${lang}${routerLinks('Code/Add')}`)}*/}
            {/*  />*/}
            {/*</div>*/}
          </div>
          <Spin spinning={userRoleFacade.isLoading}>
            <div className="h-[calc(100vh-13rem)] overflow-y-auto relative scroll">
              {userRoleFacade?.result?.data?.map((data, index) => (
                <div
                  key={data.id}
                  className={classNames(
                    { 'bg-gray-100': request.filter.roleCode === data.code },
                    'item text-gray-700 font-medium hover:bg-gray-100 flex justify-between items-center border-b border-gray-100 w-full text-left  group',
                  )}
                >
                  <div
                    onClick={() => {
                      if (request.filter.roleCode !== data.code) request.filter.roleCode = data.code;
                      else delete request.filter.roleCode;
                      dataTableRef?.current?.onChange(request);
                    }}
                    className="truncate cursor-pointer flex-1 hover:text-blue-500 item-text px-4 py-2"
                  >
                    {index + 1}. {data.name}
                  </div>
                  {/*<span className="w-16 flex justify-end gap-1">*/}
                  {/*  {user?.role?.permissions?.includes(keyRole.P_USER_ROLE_UPDATE) && (*/}
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
                  {/*  {user?.role?.permissions?.includes(keyRole.P_USER_ROLE_DELETE) && (*/}
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
              className={'container mx-auto'}
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
                    width: 210,
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
                    width: 200,
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
                    width: 110,
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
                // {
                //   title: 'user.Date of birth',
                //   name: 'dob',
                //   tableItem: {
                //     filter: { type: 'date' },
                //     sorter: true,
                //     render: (text: string) => dayjs(text).format(formatDate),
                //   },
                // },
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
                          <Tooltip title={t('routes.admin.Layout.Edit')}>
                            <button
                              title={t('routes.admin.Layout.Edit') || ''}
                              onClick={() => navigate(`/${lang}${routerLinks('User')}/${data.id}/edit`)}
                            >
                              <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />
                            </button>
                          </Tooltip>
                        )}

                        {user?.role?.permissions?.includes(keyRole.P_USER_DELETE) && (
                          <Tooltip title={t('routes.admin.Layout.Delete')}>
                            <Popconfirm
                              placement="left"
                              title={t('components.datatable.areYouSureWant')}
                              onConfirm={() => dataTableRef?.current?.handleDelete(data.id)}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Page;
