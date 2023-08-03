import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router';
import { Spin } from 'antd';

import { Form } from '@core/form';
import { routerLinks, lang } from '@utils';
import { GlobalFacade } from '@store';

const Page = () => {
  const { isLoading, status, resetPassword } = GlobalFacade();
  const navigate = useNavigate();
  useEffect(() => {
    if (status === 'resetPassword.fulfilled') {
      navigate(`/${lang}${routerLinks('Login')}`, { replace: true });
    }
  }, [status]);

  const { t } = useTranslation();
  const { search } = useLocation();
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.reset-password.title')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={isLoading}>
        <Form
          className="intro-x"
          columns={[
            {
              name: 'password',
              title: 'columns.auth.login.password',
              formItem: {
                placeholder: 'columns.auth.login.Enter Password',
                type: 'password',
                rules: [{ type: 'required' }, { type: 'min', value: 6 }],
              },
            },
            {
              name: 'retypedPassword',
              title: 'columns.auth.register.retypedPassword',
              formItem: {
                placeholder: 'columns.auth.register.retypedPassword',
                type: 'password',
                rules: [{ type: 'required' }, { type: 'min', value: 6 }],
              },
            },
          ]}
          textSubmit={'routes.auth.reset-password.Submit'}
          handSubmit={(values) => resetPassword({ ...values, token: new URLSearchParams(search).get('token') || '' })}
          disableSubmit={isLoading}
        />
      </Spin>
    </Fragment>
  );
};

export default Page;
