import React, { Fragment, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import { Tabs } from 'antd';

import { Form } from '@core/form';
import { Spin } from '@core/spin';
import { Button } from '@core/button';
import { GlobalFacade } from '@store';
import { routerLinks } from '@utils';
import { UserSolid } from '@svgs';

const Page = () => {
  const { t } = useTranslation();
  const { user, isLoading, putProfile, setPassword, profile } = GlobalFacade();
  const navigate = useNavigate();

  useEffect(() => {
    profile();
  }, []);

  return (
    <Fragment>
      <div className='lg:grid lg:grid-cols-3 gap-5 w-full block '>
        <div className='col-span-1 lg:border lg:rounded-xl bg-white p-5'>
          <Spin spinning={isLoading}>
            <Form
              className="text-center items-centers text-2xl text-black font-bold"
              columns={[
                {
                  title: '',
                  name: 'profileImage',
                  formItem: {
                    type: 'upload',
                    mode: 'multiple',
                    onlyImage: true,
                  },
                },
                {
                  title: 'user.Fullname',
                  name: 'name',
                  formItem: {
                    render: (form, values) => {
                      return (
                        <div>
                          {values.name}
                        </div>
                      )
                    }
                  },
                },
                {
                  title: 'user.role',
                  name: 'userRole',
                  formItem: {
                    render: (text: any, item: any) => {
                      if (text = item.userRole[0].mtRole.code === "ADMIN") {
                        return (
                          <div className='flex w-full flex-row justify-center pt-2 font-medium'>
                            <div><UserSolid className='w-7 h-7 mr-2 fill-slate-500' /></div>
                            <div className='text-xl text-gray-500'>
                              {t('user.RoleUser.ADMIN')}
                            </div>
                          </div>
                        )
                      } else if (text = item.userRole[0].mtRole.code === "OWNER_SUPPLIER") {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.RoleUser.SUPPLIER')}</div>
                          </div>
                        )
                      } else {
                        return (
                          <div className='flex w-full flex-row justify-center'>
                            <div><UserSolid className='w-7 h-7 mr-2' /></div>
                            <div>{t('user.RoleUser.STORE')}</div>
                          </div>
                        )
                      }
                    }
                  },
                },
              ]}
              disableSubmit={isLoading}
              values={{ ...user }}
            />
          </Spin>

        </div>

        <div className='col-span-2 lg:border lg:rounded-xl bg-white p-5'>
          <Spin spinning={isLoading}>
            <Tabs defaultActiveKey="1" size="large">
              <Tabs.TabPane tab={t('routes.admin.Layout.My Profile')} key="1" className='mt-5'>
                <Form
                  columns={[
                    {
                      title: 'user.Fullname',
                      name: 'name',
                      formItem: {
                        col: 12,
                        rules: [{ type: 'required' }],
                      },
                    },
                    {
                      title: 'Email',
                      name: 'email',
                      formItem: {
                        tabIndex: 1,
                        col: 6,
                        rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
                      },
                    },
                    {
                      title: 'user.Phone Number',
                      name: 'phoneNumber',
                      formItem: {
                        tabIndex: 1,
                        col: 6,
                        rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                      },
                    },
                    {
                      title: 'user.Note',
                      name: 'note',
                      formItem: {
                        type: 'textarea',
                      },
                    },
                  ]}
                  disableSubmit={isLoading}
                  handSubmit={putProfile}
                  extendButton={(form) => (
                    <Button
                      text={t('components.button.Cancel')}
                      className={'md:w-32 justify-center out-line sm:w-80 w-60 '}
                      onClick={() => {
                        navigate(routerLinks('User/List'))
                      }}
                    />
                  )}
                  values={{ ...user }}
                />
              </Tabs.TabPane>

              <Tabs.TabPane tab={t('routes.admin.Layout.Change Password')} key="2" className='mt-5'>
                <Form
                  columns={[
                    {
                      title: 'columns.auth.login.Password',
                      name: 'password',
                      formItem: {
                        col: 12,
                        type: 'passConfirm',
                        rules: [{ type: 'requiredPassword' }],
                        placeholder: t('columns.auth.placeholder.Password').toString(),
                      },
                    },
                    {
                      title: 'columns.auth.login.newPassword',
                      name: 'passwordNew',
                      formItem: {
                        col: 12,
                        type: 'password',
                        condition: (value: string, form, index: number, values: any) => !values?.id,
                        rules: [{ type: 'requiredPassword' }],
                        placeholder: t('columns.auth.placeholder.newPassword').toString(),
                      },
                    },
                    {
                      title: 'columns.auth.login.Confirm Password',
                      name: 'passwordComfirm',
                      formItem: {
                        col: 12,
                        type: 'passConfirm',
                        rules: [
                          {
                            type: 'custom',
                            validator: ({ getFieldValue }) => ({
                              validator(rule, value: string) {
                                if (!value || getFieldValue('passwordNew') === value) {
                                  return Promise.resolve();
                                }
                                return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                              },
                            }),
                          },
                          { type: 'requiredPassword' }, { type: 'min', value: 1 },
                        ],
                        placeholder: t('columns.auth.placeholder.Confirm Password').toString(),
                      },
                    },
                  ]}
                  disableSubmit={isLoading}
                  extendButton={(form) => (
                    <Button
                      text={t('components.button.Cancel')}
                      className={'md:min-w-[8rem] justify-center out-line'}
                      onClick={() => {
                        navigate(routerLinks('User/List'))
                      }}
                    />
                  )}
                  extendButtonChangePassword={setPassword}
                  values={{ ...user }}
                />
              </Tabs.TabPane>
            </Tabs>
          </Spin>
        </div>
        <div>
        </div>
      </div>
    </Fragment>
  );
};
export default Page;
