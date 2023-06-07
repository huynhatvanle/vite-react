import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Spin } from 'antd';

import { DataTable } from '@core/data-table';
import { GlobalFacade } from '@store';

const Page = () => {
  const { setBreadcrumbs } = GlobalFacade();
  useEffect(() => {
    setBreadcrumbs([]);
  }, []);

  const { t } = useTranslation();
  return (
    <Fragment>
      <Spin className="grid grid-cols-2 xl:grid-cols-4 2xl:grid-cols-6 gap-5 intro-x" spinning={false}>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Business Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công Ty Cổ Phần mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '16/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty đấu giá hợp danh Thuận An',
                account: '',
                package: 'Gói bạch kim',
                date: '10/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Thịnh Phát Group',
                account: '',
                package: 'Gói vàng',
                date: '9/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Nhuộm Hà Nội',
                account: 'Marybeth Lorie',
                package: '',
                date: '8/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Cơ Điện Lạnh Bkre Bách Khoa',
                account: 'India Pamula',
                package: '',
                date: '2/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: 'dashboard.Profile', name: 'name', tableItem: {} },
              { title: 'dashboard.Package', name: 'package', tableItem: {} },
              { title: 'dashboard.Start Date', name: 'date', tableItem: {} },
              { title: 'dashboard.Status', name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Franchise Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công ty CP Đá ốp lát và Xây dựng Hà Nội',
                account: '',
                package: 'Gói cơ bản',
                date: '20/09/2021',
                status: 'Approval',
              },
              {
                name: 'Ecpsilky',
                account: '',
                package: 'Gói cơ bản',
                date: '13/09/2021',
                status: 'Approval',
              },
              {
                name: 'Tập đoàn Enagic',
                account: '',
                package: 'Gói cơ bản',
                date: '10/09/2021',
                status: 'Approval',
              },
              {
                name: 'PA Enterprise Co., Ltd',
                account: '',
                package: 'Gói cơ bản',
                date: '20/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '17/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: 'dashboard.Profile', name: 'name', tableItem: {} },
              { title: 'dashboard.Package', name: 'package', tableItem: {} },
              { title: 'dashboard.Start Date', name: 'date', tableItem: {} },
              { title: 'dashboard.Status', name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Investor Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Khổng Đức Duy',
                account: '',
                package: 'Gói cơ bản',
                date: '16/09/2021',
                status: 'Approval',
              },
              {
                name: 'Vũ Phạm Hải Sơn',
                account: '',
                package: 'Gói cơ bản',
                date: '13/09/2021',
                status: 'Approval',
              },
              {
                name: 'Đặng Thanh Ngà',
                account: '',
                package: 'Gói cơ bản',
                date: '19/08/2021',
                status: 'Approval',
              },
              {
                name: 'Phạm Mạnh Tân',
                account: '',
                package: 'Gói cơ bản',
                date: '12/08/2021',
                status: 'Approval',
              },
              {
                name: 'Kevin Nguyen',
                account: '',
                package: 'Gói cơ bản',
                date: '10/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: 'dashboard.Profile', name: 'name', tableItem: {} },
              { title: 'dashboard.Package', name: 'package', tableItem: {} },
              { title: 'dashboard.Start Date', name: 'date', tableItem: {} },
              { title: 'dashboard.Status', name: 'status', tableItem: {} },
            ]}
          />
        </div>
        <div className="rounded-xl shadow bg-gray-50 col-span-2 2xl:col-span-3">
          <div className="p-5 flex justify-between items-center">
            <h2 className="text-lg font-bold">{t('dashboard.Monthly Profiles Activity')}</h2>
          </div>
          <DataTable
            save={false}
            showPagination={false}
            showSearch={false}
            data={[
              {
                name: 'Công Ty Cổ Phần mật ong Bồ Đề Hoa',
                account: '',
                package: 'Gói bạc',
                date: '16/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty đấu giá hợp danh Thuận An',
                account: '',
                package: 'Gói bạch kim',
                date: '10/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Thịnh Phát Group',
                account: '',
                package: 'Gói vàng',
                date: '9/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Nhuộm Hà Nội',
                account: 'Marybeth Lorie',
                package: '',
                date: '8/08/2021',
                status: 'Approval',
              },
              {
                name: 'Công Ty Cổ Phần Cơ Điện Lạnh Bkre Bách Khoa',
                account: 'India Pamula',
                package: '',
                date: '2/08/2021',
                status: 'Approval',
              },
            ]}
            columns={[
              { title: 'dashboard.Profile', name: 'name', tableItem: {} },
              { title: 'dashboard.Package', name: 'package', tableItem: {} },
              { title: 'dashboard.Start Date', name: 'date', tableItem: {} },
              { title: 'dashboard.Status', name: 'status', tableItem: {} },
            ]}
          />
        </div>
      </Spin>
    </Fragment>
  );
};
export default Page;
