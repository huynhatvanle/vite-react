import React, { Fragment, useEffect, useRef } from 'react';
import {  Divider, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { UserRoleFacade, ConnectFacade, User,GlobalFacade } from '@store';
import { language, languages, routerLinks } from '@utils';
import dayjs from 'dayjs';
import { Button } from '@core/button';
import { ModalForm } from '@core/modal/form';

const Page = () => {
  const modalFormRef = useRef<any>();
  const { t } = useTranslation();
  const connectFacade = ConnectFacade();
  const { data, isLoading, queryParams, status } = connectFacade;
  console.log(data);
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const { formatDateTime } = GlobalFacade();
  const listReason = [
    {
      label: t('supplier.Sup-Status.Sell goods'),
      value: 'DELEVERED',
    },
    {
      label: t('supplier.Sup-Status.Return goods'),
      value: 'REFUND',
    },
    {
      label: t('supplier.Sup-Status.Cancelled'),
      value: 'CANCEL',
    },
  ];
  useEffect(() => {
    
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
      {data?.status === 'APPROVED' ? (
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
        <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base border-b'>
            <div className='font-bold text-teal-900 w-36  mb-5  '>Địa chỉ:</div>
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
        <div className='w-full sm:flex sm:flex-row gap-5 mb-5 text-base border-b'>
            <div className='font-bold text-teal-900 w-36 mb-5'>Địa chỉ:</div>
            <div>{data?.store?.address?.street},{data?.store?.address?.ward?.name},{data?.store?.address?.district?.name},{data?.store?.address?.province?.name}</div>
        </div>
        <Button
            text={t('components.form.modal.cancel')}
            className={'button sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
            onClick={handleBack}
       />
      </div>
      ) : (data?.status === 'WAITING_ADMIN') ?( 
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
      <Button  
        text={t('components.form.modal.cancel')}
          className={'button sm:min-w-[8rem] justify-center out-line !border-black w-3/5 sm:w-auto'}
          onClick={handleBack}/>
         <Button
            className=' bg-red-500 text-white text-base p-2 rounded-xl hover:bg-red-400 mt-1 h-[40px]-3xl !font-normal'
            text={t('Từ chối yêu cầu')}
            onClick={() => modalFormRef?.current?.handleEdit()}
        />
        
        
         </div>):("aaaa")
      }
      <ModalForm
                facade={connectFacade}
                ref={modalFormRef}
                title={(data: any) => t('Từ chối yêu cầu sản phẩm')}
                textSubmit=''
                columns={[
                    {
                        title: 'Lý do',
                        name: 'name',
                        formItem: {
                            type: 'select',
                            list: listReason,   
                        }
                    },
                    {
                        title: 'Chi tiết',
                        name: 'descripton',
                        formItem: {
                            type: 'textarea',
                            rules: [{ type: 'textarea' }]
                        }
                    }
                ]}
                widthModal={600}
            />
    </Fragment>
  );
};
export default Page;
