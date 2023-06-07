import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from 'antd';

import { Form } from '@core/form';
import { ModalForm } from '@core/modal/form';
import { GlobalFacade } from '@store';
import { FormModalRefObject } from '@models';
import { lang } from '@utils';

const Page = () => {
  const globalFacade = GlobalFacade();
  const navigate = useNavigate();
  useEffect(() => {
    if (globalFacade.status === 'login.fulfilled' && globalFacade.user && Object.keys(globalFacade.user).length > 0) {
      navigate('/' + lang + '/', { replace: true });
    }
  }, [globalFacade.status]);

  const { t } = useTranslation();
  const modalFormRef = useRef<FormModalRefObject>(null);
  return (
    <Fragment>
      <div className="mb-8">
        <h1 className="intro-x text-4xl mb-3 font-bold" id={'title-login'}>
          {t('routes.auth.login.title')}
        </h1>
        <h5 className="intro-x font-medium text-gray-300">{t('routes.auth.login.subTitle')}</h5>
      </div>
      <Spin spinning={globalFacade.isLoading}>
        <Form
          values={{ ...globalFacade.data }}
          className="intro-x"
          columns={[
            {
              name: 'email',
              title: 'columns.auth.login.Username',
              formItem: {
                placeholder: 'columns.auth.login.Enter Username',
                rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
              },
            },
            {
              name: 'password',
              title: 'columns.auth.login.password',
              formItem: {
                placeholder: 'columns.auth.login.Enter Password',
                type: 'password',
                notDefaultValid: true,
                rules: [{ type: 'required' }],
              },
            },
          ]}
          textSubmit={'routes.auth.login.Log In'}
          handSubmit={globalFacade.login}
          disableSubmit={globalFacade.isLoading}
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
        title={() => t('routes.auth.login.Forgot Password')}
        textSubmit={'columns.auth.login.Send'}
        columns={[
          {
            name: 'email',
            title: 'Email',
            formItem: {
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
