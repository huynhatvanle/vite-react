import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Spin } from '@core/spin';
import { Form } from '@core/form'
import { routerLinks } from '@utils';
import { GlobalFacade } from '@store';

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
          {'Quên Mật Khẩu'}
        </h1>
        <h5 className="intro-x font-normal text-green-900 ">Vui lòng nhập mã OTP đã gửi đến email của bạn</h5>
      </div>
      <div className='mx-auto w-3/4'>
        <Spin spinning={isLoading} >
          <Form
            values={{ ...data }}
            className="intro-x form-forgetPassword"
            columns={[
                {
                    name: 'otp',
                    title: 'Mã OTP',
                    formItem: {
                        placeholder: 'Mã OTP',
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
            textSubmit={'Gửi OTP'}
            handSubmit={(values) => verifyForgotPassword({ ...values })}
            disableSubmit={isLoading}
          />
        </Spin>
        <div className="mt-3 text-center">
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
