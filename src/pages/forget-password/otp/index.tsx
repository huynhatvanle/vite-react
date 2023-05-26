import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';
import { t } from 'i18next';

const Page = () => {
  // const isReload = useRef(false);
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, verifyForgotPassword } = globalFacade;

  useEffect(() => {
    console.log(status)
    if (status === 'verifyForgotPassword.fulfilled') {
      navigate(routerLinks('SetPassword'));
    }
  }, [status]);

  console.log(data)

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-3xl mb-10 font-bold text-green-900 leading-8 md:text-5xl lg:leading-10">
          {t('columns.auth.login.Forgot Password')}
        </h1>
        <h5 className="intro-x font-normal text-green-900 ">{t('routes.auth.reset-password.subEmail')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-forgetPassword"
            columns={[
              {
                name: 'otp',
                title: 'routes.auth.reset-password.Code OTP',
                formItem: {
                  placeholder: 'routes.auth.reset-password.Code OTP',
                  rules: [{ type: 'required' }, { type: 'min', value: 6 }, { type: 'max', value: 6 }],
                },
              },
              {
                title: '',
                name: 'uuid',
                formItem: {
                  type: 'hidden',
                },
              },
              {
                title: '',
                name: 'email',
                formItem: {
                  type: 'hidden',
                },
              },
            ]}
            textSubmit={t('routes.auth.reset-password.Send code')}
            handSubmit={(values) => verifyForgotPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
          <button className={'text-sky-600 font-normal underline hover:no-underline hover:text-sky-500'} onClick={() => navigate(routerLinks('Login'))}>
            {' '}
            {t('routes.auth.reset-password.Go back to login')}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
