import React, { Fragment, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { UserRoleFacade, ConnectFacade, User, GlobalFacade } from '@store';
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
      <div className=' bg-white rounded-2xl' >
        <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 '}>{t('titles.requestdetail')}</div>
        <div className='flex'>
            <div className=''>
                <div className='flex'>
                    <div>Mã yêu cầu:</div>
                    <div>{data?.code}</div>
                </div>
                <div className='flex'>
                    <div>Trạng thái:</div>
                    <div>{data?.status}</div>
                </div>
                <div className='flex'>
                    <div>Tên sản phẩm:</div>
                    <div>{data?.productName}</div>
                </div>
            </div>
            <div>
            <div className='flex'>
                    <div>Ngày yêu cầu:</div>
                    <div>{ dayjs(data?.approvedAt).format(formatDateTime)}</div>
                </div>
                <div className='flex'>
                    <div>Ngày phê duyệt:</div>
                    <div>{ dayjs(data?.requestedAt).format(formatDateTime)}</div>
                </div>
                <div className='flex'>
                    <div>Yêu cầu chi tiết về sản phẩm:</div>
                    <div>{data?.description}</div>
                </div>
            </div>
        </div>
        <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 '}>{t('titles.informationstore')}</div>
        <div className='flex'>
            <div className=''>
                <div className='flex'>
                    <div>Cửa hàng:</div>
                    <div>{data?.store?.name}</div>
                </div>
                <div className='flex'>
                    <div>Số điện thoại:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                </div>
            </div>
            <div>
            <div className='flex'>
                    <div>Tên chủ cửa hàng:</div>
                    <div>{data?.store?.userRole?.[0]?.userAdmin?.name}</div>
                </div>
                <div className='flex'>
                    <div>Số fax:</div>
                    <div>{data?.store?.fax}</div>
                </div>
                
            </div>
        </div>
        <div className='flex'>
            <div>Địa chỉ:</div>
            <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
        </div>
        <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 '}>{t('titles.informationstoreRequestSupplier')}</div>
        <div className='flex'>
            <div className=''>
                <div className='flex'>
                    <div>Nhà cung cấp:</div>
                    <div>{data?.storeRequestSupplier?.[0]?.supplier?.name}</div>
                </div>
                <div className='flex'>
                    <div>Số điện thoại:</div>
                    <div>{data?.storeRequestSupplier?.[0]?.supplier?.userRole?.[0]?.userAdmin?.phoneNumber}</div>
                </div>
            </div>
            <div>
            <div className='flex'>
                    <div>Chủ nhà cung cấp:</div>
                    <div>{data?.storeRequestSupplier?.[0]?.supplier?.userRole?.[0]?.userAdmin?.name}</div>
                </div>
                <div className='flex'>
                    <div>Số fax:</div>
                    <div>{data?.storeRequestSupplier?.[0]?.supplier?.fax}</div>
                </div>
                
            </div>
        </div>
        <div className='flex'>
            <div>Địa chỉ:</div>
            <div>{data?.storeRequestSupplier?.[0]?.supplier?.address?.street},{data?.storeRequestSupplier?.[0]?.supplier?.address?.ward?.name},{data?.storeRequestSupplier?.[0]?.supplier?.address?.district?.name},{data?.storeRequestSupplier?.[0]?.supplier?.address?.province?.name}</div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
