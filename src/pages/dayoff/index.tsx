import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { DataTable } from '@core/data-table';
import { Button } from '@core/button';
import { DayoffFacade, GlobalFacade } from '@store';
import { keyRole, routerLinks } from '@utils';
import { Plus } from '@svgs';
import { ColumnDayOffTable } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const navigate = useNavigate();
  const dayoffFacade = DayoffFacade();
  const { status, queryParams } = DayoffFacade();

  const dataTableRef: any = useRef();
  const param = JSON.parse(queryParams || '{}');
  const listType = [
    {
      value: 1,
      label: t('dayoff.register.Annual Leave'),
      disabled: user!.dateLeave! - user!.dateOff! <= 0,
    },
    {
      value: 2,
      label: t('dayoff.register.Leave without Pay'),
    },
    {
      value: 3,
      label: t('dayoff.register.Remote'),
    },
  ];
  const listTime = [
    {
      value: 0,
      label: t('dayoff.register.All day'),
    },
    {
      value: 1,
      label: t('dayoff.register.Morning'),
    },
    {
      value: 2,
      label: t('dayoff.register.Afternoon'),
    },
  ];

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
      case 'putStatus.fulfilled':
        dataTableRef.current.onChange();
        break;
    }
  }, [status]);

  return (
    <Fragment>
      <DataTable
        facade={dayoffFacade}
        showSearch={false}
        ref={dataTableRef}
        onRow={(data: any) => ({
          onDoubleClick: () => {
            navigate(routerLinks('DayOff/Detail') + '/' + data.id);
          },
        })}
        xScroll={'1400px'}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.DayOff', { from, to, total })
        }
        columns={ColumnDayOffTable({
          t,
          formatDate,
          dataTableRef,
          navigate,
          listType,
          listTime,
          permissions: user?.role?.permissions,
          user,
        })}
        rightHeader={
          <Fragment>
            {user?.role?.permissions?.includes(keyRole.P_DAYOFF_CREATE) && user.managerId && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => navigate(routerLinks('DayOff/Add') + '?' + new URLSearchParams(param).toString())}
              />
            )}
          </Fragment>
        }
      />
    </Fragment>
  );
};
export default Page;
