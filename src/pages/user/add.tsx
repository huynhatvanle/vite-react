import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Avatar } from '@core/avatar';
import { UserRoleFacade, UserFacade, CodeFacade, User, GlobalFacade, UserTeamFacade, ManagerFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';

const Page = () => {
  const userFacade = UserFacade();
  const param = JSON.parse(userFacade.queryParams || '{}');
  const { setBreadcrumbs } = GlobalFacade();
  const { id } = useParams();
  const isReload = useRef(false);
  useEffect(() => {
    if (id) userFacade.getById({ id });
    else userFacade.set({ data: undefined });
    setBreadcrumbs([
      { title: 'titles.User', link: '' },
      { title: id ? 'titles.User/Edit' : 'titles.User/Add', link: '' },
    ]);
    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (userFacade.status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('User')}/${userFacade.data?.id}/edit`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('User/Add')}`);
        }
        break;
    }
  }, [userFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('User/List')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: User) => {
    if (id) userFacade.put({ ...values, id });
    else userFacade.post(values);
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-4xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Form
        values={{ ...userFacade.data }}
        className="intro-x"
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
            title: 'Email',
            name: 'email',
            formItem: {
              col: 6,
              rules: [{ type: 'required' }, { type: 'email' }, { type: 'min', value: 6 }],
            },
          },
          {
            title: 'columns.auth.login.password',
            name: 'password',
            formItem: {
              col: 6,
              type: 'password',
              condition: (value: string, form, index: number, values: any) => !values?.id,
              rules: [{ type: 'required' }, { type: 'min', value: 6 }],
            },
          },
          {
            title: 'columns.auth.register.retypedPassword',
            name: 'retypedPassword',
            formItem: {
              placeholder: 'columns.auth.register.retypedPassword',
              col: 6,
              type: 'password',
              condition: (value: string, form, index: number, values) => !values?.id,
              rules: [
                { type: 'required' },
                {
                  type: 'custom',
                  validator: ({ getFieldValue }) => ({
                    validator(rule, value: string) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(t('components.form.ruleConfirmPassword'));
                    },
                  }),
                },
              ],
            },
          },
          {
            title: 'Số điện thoại',
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
              convert: (data) =>
                data?.map ? data.map((_item: any) => (_item?.id !== undefined ? +_item.id : _item)) : data,
              get: {
                facade: CodeFacade,
                params: (fullTextSearch: string) => ({
                  fullTextSearch,
                  filter: { type: 'POS' },
                  extend: {},
                }),
                format: (item) => ({
                  label: item.name,
                  value: item.code,
                }),
              },
            },
          },
          {
            title: 'user.Start Date',
            name: 'startDate',
            formItem: {
              col: 6,
              type: 'date',
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'user.Role',
            name: 'roleCode',
            formItem: {
              col: 6,
              type: 'select',
              rules: [{ type: 'required' }],
              showSearch: false,
              get: {
                facade: UserRoleFacade,
                format: (item) => ({
                  label: item.name,
                  value: item.code,
                }),
              },
            },
          },
          {
            title: 'user.Team',
            name: 'teams',
            formItem: {
              col: 6,
              type: 'select',
              mode: 'multiple',
              get: {
                facade: UserTeamFacade,
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
                params: (fullTextSearch: string, getFieldValue: any) => ({
                  fullTextSearch,
                  extend: { id: getFieldValue('teamId') || undefined },
                }),
              },
            },
          },
          {
            title: 'team.Manager',
            name: 'managerId',
            formItem: {
              col: 6,
              type: 'select',
              get: {
                facade: ManagerFacade,
                format: (item: any) => ({
                  label: <Avatar size={5} src={item?.avatar} text={item.name} />,
                  value: item.id,
                }),
                params: (fullTextSearch: string, getFieldValue: any) => ({
                  fullTextSearch,
                  filter: { roleCode: 'manager' },
                  skip: { id: getFieldValue('id') || undefined },
                }),
              },
            },
          },
          {
            name: 'dateLeave',
            title: 'dayoff.Leave Date',
            formItem: {
              condition: (value) => value !== undefined,
              type: 'number',
              col: 6,
              mask: {
                mask: '9{1,2}[.V{0,1}]',
                definitions: {
                  V: {
                    validator: '[05]',
                  },
                },
              },
              rules: [
                { type: 'required' },
                {
                  type: 'custom',
                  validator: () => ({
                    validator(rule, value: string) {
                      if (parseFloat(value) < 17) return Promise.resolve();
                      else return Promise.reject(t('user.Leave date cannot exceed', { day: 17 }));
                    },
                  }),
                },
              ],
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
        extendButton={(form) => (
          <Button
            text={t('components.button.Save and Add new')}
            className={'md:min-w-[12rem] w-full justify-center out-line'}
            onClick={() => {
              form.submit();
              isBack.current = false;
            }}
          />
        )}
        handSubmit={handleSubmit}
        disableSubmit={userFacade.isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
