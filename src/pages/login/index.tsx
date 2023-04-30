import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form';
import { ModalForm } from '@core/modal/form';

import { GlobalFacade } from '@store';
import { FormModalRefObject } from '@models';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, user, data, login } = globalFacade;
  useEffect(() => {
    if (status === 'login.fulfilled' && user && Object.keys(user).length > 0) {
      navigate('/', { replace: true });
    }
  }, [status]);
  const modalFormRef = useRef<FormModalRefObject>(null);
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={isLoading}>
        <Form
          values={{ ...data }}
          className="intro-x"
          columns={[
            {
              name: 'email',
              title: t('columns.auth.login.Username'),
              formItem: {
                placeholder: t('columns.auth.login.Enter Username'),
                rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
              },
            },
            {
              name: 'password',
              title: t('columns.auth.login.password'),
              formItem: {
                placeholder: t('columns.auth.login.Enter Password'),
                type: 'password',
                rules: [{ type: 'required' }, { type: 'min', value: 6 }],
              },
            },
          ]}
          textSubmit={'routes.auth.login.Log In'}
          handSubmit={login}
          disableSubmit={isLoading}
        />
      </Spin>
      <div className="mt-3 intro-x">
        {t('routes.auth.login.Account')}
        <button className={'text-blue-600'} onClick={() => modalFormRef?.current?.handleEdit!()}>
          {' '}
          {t('routes.auth.login.Forgot Password')}
        </button>
      </div>
      <ModalForm
        facade={globalFacade}
        ref={modalFormRef}
        title={() => 'Quên mật khẩu'}
        columns={[
          {
            name: 'email',
            title: 'Email',
            formItem: {
              placeholder: 'Email',
              rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
            },
          },
        ]}
        widthModal={400}
        idElement={'user'}
      />
    </Fragment>
  );
};

export default Page;
