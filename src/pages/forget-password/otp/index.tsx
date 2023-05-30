import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';
import { t } from 'i18next';
import { language, languages } from '@utils';

const Page = () => {
  // const isReload = useRef(false);
  // const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();
  const { isLoading, status, data, verifyForgotPassword } = globalFacade;
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    console.log(status)
    if (status === 'verifyForgotPassword.fulfilled') {
      navigate(`/${lang}${routerLinks('SetPassword')}`)
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
      <div className='mx-auto lg:w-full'>
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
            textSubmit={'routes.auth.reset-password.Send code'}
            handSubmit={(values) => verifyForgotPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
          <button className={'text-sky-600 font-normal underline hover:no-underline hover:text-sky-500'} onClick={() => navigate(`/${lang}${routerLinks('Login')}`)}>
            {' '}
            {t('routes.auth.reset-password.Go back to login')}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
