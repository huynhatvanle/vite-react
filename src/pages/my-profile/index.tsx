import React, { Fragment, useEffect, useRef } from 'react';
import { Spin } from 'antd';

import { Form } from '@core/form';
import { GlobalFacade } from '@store';

const Page = () => {
  const { user, isLoading, putProfile, profile, setBreadcrumbs } = GlobalFacade();
  const listPosition = useRef([]);
  useEffect(() => {
    profile();
    setBreadcrumbs([]);
  }, []);

  return (
    <Spin spinning={isLoading}>
      <Form
        className="intro-x w-[550px] mx-auto bg-white p-4 shadow rounded-xl"
        columns={[
          {
            title: 'user.Fullname',
            name: 'name',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'columns.auth.login.password',
            name: 'password',
            formItem: {
              col: 6,
              type: 'password',
              rules: [{ type: 'min', value: 6 }],
            },
          },
          {
            title: 'Email',
            name: 'email',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
            },
          },
          {
            title: 'columns.auth.register.retypedPassword',
            name: 'retypedPassword',
            formItem: {
              placeholder: 'columns.auth.register.retypedPassword',
              col: 6,
              type: 'password',
              rules: [
                {
                  type: 'custom',
                  validator: ({ getFieldValue }) => ({
                    validator(rule, value: string) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Hai mật khẩu không giống nhau!'));
                    },
                  }),
                },
              ],
            },
          },
          {
            title: 'user.Phone Number',
            name: 'phoneNumber',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
            },
          },
          {
            title: 'user.Date of birth',
            name: 'dob',
            formItem: {
              col: 6,
              type: 'date',
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'user.Position',
            name: 'positionCode',
            formItem: {
              col: 6,
              type: 'select',
              rules: [{ type: 'required' }],
              list: listPosition.current.map((item: any) => ({ value: item.code, label: item.name })),
            },
          },
          {
            title: 'user.Description',
            name: 'description',
            formItem: {
              col: 8,
              type: 'textarea',
            },
          },
          {
            name: 'avatar',
            title: 'user.Upload avatar',
            formItem: {
              col: 4,
              type: 'upload',
            },
          },
        ]}
        handSubmit={putProfile}
        disableSubmit={isLoading}
        values={{ ...user }}
      />
    </Spin>
  );
};
export default Page;
