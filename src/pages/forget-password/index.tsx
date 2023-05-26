import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';

const Page = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const globalFacade = GlobalFacade();

  const { isLoading, status, data, forgotPassword } = globalFacade;
  useEffect(() => {
    if (status === 'forgotPassword.fulfilled') {
      navigate(routerLinks('VerifyForotPassword'));
    }
  }, [status]);

  return (
    <Fragment>
      <div className="text-center mb-8">
        <h1 className="intro-x text-3xl mb-8 font-bold text-green-900 leading-8 md:text-5xl lg:leading-10" id={'title-login'}>
          {'Quên Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-normal text-green-900 ">{t('routes.auth.reset-password.subTitle')}</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-forgetPassword"
            columns={[
              {
                name: 'email',
                title: t('columns.auth.reset-password.Recovery Email'),
                formItem: {
                  placeholder: 'Email khôi phục',
                  rules: [{ type: 'required' }, { type: 'email' }],
                },
              },
            ]}
            textSubmit={'routes.auth.reset-password.OTP'}
            handSubmit={(values) => forgotPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="text-center mt-3">
          <button className={'text-sky-600 font-normal underline hover:no-underline hover:text-sky-500'} onClick={() => navigate(routerLinks('Login'))}>
            {' '}
            {'Quay trở lại Đăng nhập'}
          </button>
        </div>
      </div>
    </Fragment>
  );
};

export default Page;
