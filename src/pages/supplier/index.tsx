import React from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { routerLinks } from '@utils';
import { SupplierFacade } from '@store';
import { Plus } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const supplierFacade = SupplierFacade();

  return (
    <DataTable
      facade={supplierFacade}
      defaultRequest={{ page: 1, perPage: 10, type: "SUPPLIER" }}
      xScroll='1380px'
      className=' bg-white p-5 rounded-lg'
      onRow={(data: any) => ({ onDoubleClick: () => navigate(routerLinks('Supplier/Edit') + '/' + data.id) })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.Supplier', { from, to, total })
      }
      columns={[
        {
          title: 'supplier.Code',
          name: 'code',
          tableItem: {
            width: 140,
          },
        },
        {
          title: 'supplier.Name',
          name: 'name',
          tableItem: {
            width: 230,
          },
        },
        {
          title: 'supplier.Address',
          name: 'address',
          tableItem: {
            width: 555,
            render: (value: any, item: any) => item?.address?.street + ', ' + item?.address?.ward?.name + ', ' + item?.address?.district?.name + ', ' + item?.address?.province?.name,
          }
        },
        {
          title: 'supplier.Representative',
          name: 'contract',
          tableItem: {
            width: 242,
            render: (value: any, item: any) => item?.contract[0]?.name,
          },
        },
        {
          title: 'supplier.Status',
          name: "isActive",
          tableItem: {
            width: 100,
            align: 'center',
            render: (value: any, item: any) => item?.contract?.[0]?.status === 'SIGNED_CONTRACT'
              ? (<div className='bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded'>Đã ký</div>)
              : (<div className='bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded'>Chờ ký</div>),
          },
        },
      ]}
      rightHeader={
        <div className={'flex gap-2'}>
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t('titles.Supplier/Add')}
            onClick={() => navigate(routerLinks('Supplier/Add'))}
            className='!rounded-xl !font-normal'
          />
        </div>
      }
    />
  );
};
export default Page;
