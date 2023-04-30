import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { DataTable } from '@core/data-table';
import { ModalForm } from '@core/modal/form';
import { Button } from '@core/button';
import { ColumnTableUserTeam, ColumnFormUserTeam } from './column';
import { GlobalFacade, UserRoleFacade, UserTeamFacade } from '@store';

import { keyRole } from '@utils';
import { Plus } from 'src/assets/svgs';

const Page = () => {
  const { t } = useTranslation();
  const { formatDate, user } = GlobalFacade();
  const { result, get } = UserRoleFacade();
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
  useEffect(() => {
    if (!result?.data) get({});
  }, []);

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
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.Pagination', { from, to, total })
        }
        columns={ColumnTableUserTeam({
          t,
          formatDate,
          modalFormRef,
          permissions: user?.role?.permissions,
        })}
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
        columns={ColumnFormUserTeam({
          t,
          listRole: result?.data || [],
        })}
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
