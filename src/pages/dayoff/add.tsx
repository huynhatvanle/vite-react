import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Button } from '@core/button';
import { Form } from '@core/form';
import { GlobalFacade, DayoffFacade } from '@store';
import { routerLinks } from '@utils';
import { ColumnDayOffForm } from './column';

const Page = () => {
  const { t } = useTranslation();
  const { user, profile } = GlobalFacade();
  const dayoffFacade = DayoffFacade();
  const { isLoading, status, data, queryParams } = dayoffFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

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
    if (id) dayoffFacade.getById({ id });
    else dayoffFacade.set({ data: undefined });

    profile();

    return () => {
      isReload.current && dayoffFacade.get(param);
    };
  }, [id]);

  const navigateToDetail = (data: any) => {
    navigate(routerLinks('DayOff/Detail') + '/' + data.id);
  };

  useEffect(() => {
    console.log(status);
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
        if (isBack.current) navigateToDetail(data);
        else {
          isBack.current = true;
          dayoffFacade.set({ data: undefined });
        }
        profile();
        break;
    }
  }, [status, data]);

  const handleBack = () => navigate(routerLinks('DayOff/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: any) => {
    if (id) dayoffFacade.put(values);
    else dayoffFacade.post(values);
  };

  return (
    <div className={'max-w-2xl mx-auto'}>
      {!!user && (
        <Fragment>
          <div className="text-xl font-bold hidden sm:block mb-5">
            {!data?.id
              ? t('routes.admin.Layout.Apply for leave') +
                ' ( ' +
                (user!.dateLeave! - user!.dateOff! > 0 ? user!.dateLeave! - user!.dateOff! : 0) +
                ' ' +
                t('routes.admin.Layout.Day') +
                ') '
              : ''}
          </div>
          <Form
            values={{ ...data }}
            className="intro-x"
            columns={ColumnDayOffForm({
              t,
              listType,
              listTime,
              user,
            })}
            extendButton={(form) => (
              <div className="flex">
                <Button
                  text={t('components.form.modal.cancel')}
                  className="md:min-w-[12rem] !bg-red-600 w-full justify-center mr-2"
                  onClick={handleBack}
                />
                <Button
                  text={t('components.button.Save and Add new')}
                  className={'md:min-w-[12rem] w-full justify-center out-line'}
                  onClick={() => {
                    form.submit();
                    isBack.current = false;
                  }}
                />
              </div>
            )}
            handSubmit={handleSubmit}
            disableSubmit={isLoading}
            // handCancel={handleBack}
          />
        </Fragment>
      )}
    </div>
  );
};
export default Page;
