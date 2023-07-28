import React from 'react';
import { useNavigate } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Infor, Plus } from '@svgs';
import { SupplierFacade } from '@store';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { language, languages, routerLinks } from '@utils';
import { Tooltip } from 'antd';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  const supplierFacade = SupplierFacade();

  return (
    <DataTable
      facade={supplierFacade}
      defaultRequest={{ page: 1, perPage: 10, filter: { type: 'SUPPLIER' }, fullTextSearch: '' }}
      xScroll="1380px"
      className=" bg-white p-5 rounded-lg form-store-tab3 form-supplier-index"
      onRow={(data: any) => ({
        onDoubleClick: () => navigate(`/${lang}${routerLinks('Supplier/Edit')}/${data.id}?tab=1`),
      })}
      pageSizeRender={(sizePage: number) => sizePage}
      pageSizeWidth={'50px'}
      paginationDescription={(from: number, to: number, total: number) =>
        t('routes.admin.Layout.PaginationSupplier', { from, to, total })
      }
      columns={[
        {
          title: t(`supplier.Code`),
          name: 'code',
          tableItem: {
            width: 140,
          },
        },
        {
          title: t(`supplier.Name`),
          name: 'name',
          tableItem: {
            width: 230,
            onCell: (data: any) => ({
              style: { cursor: 'pointer' },
              onClick: () => navigate(`/${lang}${routerLinks('Supplier/Edit')}/${data.id}?tab=1`),
            }),
          },
        },
        {
          title: t(`supplier.Address`),
          name: 'address',
          tableItem: {
            width: 455,
            // render: (value: any, item: any) =>
            //   item?.address?.street +
            //   ', ' +
            //   item?.address?.ward?.name +
            //   ', ' +
            //   item?.address?.district?.name +
            //   ', ' +
            //   item?.address?.province?.name,
            render: (value: any, item: any) => {
              const address =
                item?.address?.street +
                ', ' +
                item?.address?.ward?.name +
                ', ' +
                item?.address?.district?.name +
                ', ' +
                item?.address?.province?.name;
              return (
                <div className="flex">
                  {address.slice(0, 60)}
                  {address.length >= 60 ? (
                    <Tooltip title={address} className="text-black">
                      <Infor className="w-4 h-4 mt-1 ml-1" />
                    </Tooltip>
                  ) : null}
                </div>
              );
            },
          },
        },
        {
          title: t(`supplier.Representative`),
          name: 'contract',
          tableItem: {
            width: 242,
            render: (value: any, item: any) => item?.userRole[0]?.userAdmin?.name,
          },
        },
        {
          title: t(`supplier.Phone Number`),
          name: 'userRole',
          tableItem: {
            width: 115,
            render: (value: any, item: any) => item?.userRole[0]?.userAdmin?.phoneNumber,
          },
        },
        {
          title: t(`supplier.Status`),
          name: 'isActive',
          tableItem: {
            width: 100,
            align: 'center',
            render: (value: any, item: any) =>
              item?.contract?.[0]?.status === 'SIGNED_CONTRACT' ? (
                <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                  {t('supplier.Sup-Status.Signed')}
                </div>
              ) : (
                <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                  {t('supplier.Sup-Status.Waiting')}
                </div>
              ),
          },
        },
      ]}
      rightHeader={
        <div className={'flex gap-2'}>
          {/* mt-2.5 lg:mt-0 */}
          <Button
            icon={<Plus className="icon-cud !h-5 !w-5" />}
            text={t('titles.Supplier/Add')}
            onClick={() => navigate(`/${lang}${routerLinks('Supplier/Add')}`)}
            className="!rounded-xl !font-normal"
          />
        </div>
      }
    />
  );
};
export default Page;
