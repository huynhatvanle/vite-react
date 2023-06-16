import React, { Fragment, useEffect, useRef } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Form } from '@core/form';
import { UserRoleFacade, UserFacade, User } from '@store';
import { language, languages, routerLinks } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (!result?.data) get({});

    if (id) userFacade.getById({ id });

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id, data]);

  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
        }
        break;
    }
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('User/List')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: User) => {
    userFacade.put({ ...values, id });
  };

  return (
    <Fragment>
      <div className='' >
        <div className={'text-xl text-teal-900 font-bold block pl-5 pt-5 bg-white rounded-t-2xl'}>{t('titles.Userinformation')}</div>
        {!!result?.data && (
          <Form
            values={{ ...data }}
            className="intro-x form-responsive"
            columns={[
              {
                title: 'user.UserId',
                name: 'code',
                formItem: {
                  disabled: () => true,
                  tabIndex: 1,
                  col: 6,
                },
              },
              {
                title: 'user.Fullname',
                name: 'name',
                formItem: {
                  tabIndex: 1,
                  col: 6,
                  type: 'name',
                  rules: [{ type: 'required' }],
                  disabled: (values) => {
                    return values?.status === 'UNACTIVE';
                  }
                },
              },
              {
                title: 'Email',
                name: 'email',
                formItem: {
                  disabled: () => true,
                  tabIndex: 1,
                  col: 6,
                },
              },
              {
                title: 'user.Phone Number',
                name: 'phoneNumber',
                formItem: {
                  col: 6,
                  rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                  disabled: (values) => {
                    return values?.status === 'UNACTIVE';
                  }
                },
              },
              {
                title: 'user.Role',
                name: 'roleCode',
                formItem: {
                  col: 12,
                  type: 'select',
                  render: (form, values) => {
                    const roleCode = values.roleCode;
                    return (
                      <div>
                        {t('user.Role')}
                        <Select value={roleCode} disabled={true} className="py-2" style={{ width: "100%" }}>
                          <Select.Option value="ADMIN">
                            {t('user.RoleUser.ADMIN')}
                          </Select.Option>
                          <Select.Option value="OWNER_SUPPLIER">
                            {t('user.RoleUser.OWNER_SUPPLIER')}
                          </Select.Option>
                          <Select.Option value="OWNER_STORE">
                            {t('user.RoleUser.OWNER_STORE')}
                          </Select.Option>
                        </Select>
                      </div>
                    );
                  },
                },
              },
              {
                title: 'user.Note',
                name: 'note',
                formItem: {
                  col: 12,
                  type: 'textarea',
                  disabled: (values) => {
                    return values?.status === 'UNACTIVE';
                  }
                },
              },
            ]}
            handSubmit={handleSubmit}
            disableSubmit={isLoading}
            handCancel={handleBack}
          />
        )}
      </div>
    </Fragment>
  );
};
export default Page;
