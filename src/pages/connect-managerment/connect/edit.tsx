import React, { Fragment, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { UserRoleFacade, ConnectFacade, User,GlobalFacade } from '@store';
import { language, languages, routerLinks } from '@utils';
import dayjs from 'dayjs';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const connectFacade = ConnectFacade();
  const { data, isLoading, queryParams, status } = connectFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const { formatDateTime } = GlobalFacade();

  useEffect(() => {
    if (!result?.data) get({});

    if (id) connectFacade.getById({ id });

    return () => {
      isReload.current && connectFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Connect')}?${new URLSearchParams(param).toString()}`);

  return (
    <Fragment>
      <div className='bg-white w-full px-4 rounded-xl mt-5 relative sm:pb-5' >
        <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5'}>{t('titles.requestdetail')}</div>
        <div className='w-full sm:flex sm:flex-row border-b'>
            <div className='w-full'>
                <div className='w-full flex flex-row mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36 '>Mã yêu cầu:</div>
                    <div>{data?.code}</div>
                </div>
                <div className='w-full flex flex-row mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36 '>Trạng thái:</div>
                    <div>{data?.status}</div>
                </div>
                <div className='w-full flex flex-row mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36 '>Tên sản phẩm:</div>
                    <div>{data?.productName}</div>
                </div>
            </div>
            <div className='w-full'>
            <div className='w-full flex flex-row mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Ngày yêu cầu:</div>
                    <div>{dayjs(data?.approvedAt).format(formatDateTime)}</div>
                </div>
                <div className='w-full flex flex-row mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Ngày phê duyệt:</div>
                    <div>{ dayjs(data?.requestedAt).format(formatDateTime)}</div>
                </div>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-54 flex-none '>Yêu cầu chi tiết về sản phẩm:</div>
                    <div>{data?.description}</div>
                </div>
            </div>
        </div>
        <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstore')}</div>
        <div className='flex w-full'>
            <div className='w-full'>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Cửa hàng:</div>
                    <div>{data?.store?.name}</div>
                </div>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                </div>
            </div>
            <div className='w-full'>
            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-54 flex-none'>Tên chủ cửa hàng:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                </div>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                    <div>{data?.store?.fax}</div>
                </div>
                
            </div>
        </div>
        <div className='w-full flex flex-row mb-5 text-base border-b'>
            <div className='font-bold text-teal-900 w-36  mb-5 '>Địa chỉ:</div>
            <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
        </div>
        <div className={'sm:text-xl text-base font-bold text-teal-900 py-4 mr-5 '}>{t('titles.informationstoreRequestSupplier')}</div>
        <div className='flex w-full'>
            <div className='w-full'>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Nhà cung cấp:</div>
                    <div>{data?.storeRequestSupplier?.[0]?.supplier?.name}</div>
                </div>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Số điện thoại:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                </div>
            </div>
            <div className='w-full'>
            <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-54 flex-none'>Chủ nhà cung cấp:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                </div>
                <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base'>
                    <div className='font-bold text-teal-900 w-36'>Số fax:</div>
                    <div>{data?.store?.fax}</div>
                </div>
                
            </div>
        </div>
        <div className='w-full flex flex-row mb-5 text-base'>
            <div className='font-bold text-teal-900 w-36'>Địa chỉ:</div>
            <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
