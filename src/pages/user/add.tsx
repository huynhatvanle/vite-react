import React, { Fragment, Profiler, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router';

import { UserRoleFacade, UserFacade, User } from '@store';
import { routerLinks } from '@utils';
import { Form } from '@core/form';
import { useTranslation } from 'react-i18next';


const Page = () => {
  const { t } = useTranslation();
  const { result, get } = UserRoleFacade();
  const userFacade = UserFacade();
  const { data, isLoading, queryParams, status } = userFacade;
  const navigate = useNavigate();
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();

  useEffect(() => {
    if (!result?.data) get({});

    userFacade.set({ data: undefined });

    return () => {
      isReload.current && userFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    console.log(status)
    switch (status) {
      case 'post.fulfilled':
        navigate(routerLinks('User/List'));
        break;
    }
  }, [status]);

  const handleBack = () => navigate(routerLinks('User/List') + '?' + new URLSearchParams(param).toString());
  const handleSubmit = (values: User) => {
    userFacade.post(values);
  };

  return (
    <div className={'w-full'}>
      <Fragment>
        <div className='bg-white rounded-xl p-4'>
          <div className={'text-xl text-teal-900 font-bold block pb-5'}>{t('titles.Userinformation')}</div>
          {!!result?.data && (
            <Form
              values={{ ...data }}
              className="intro-x"
              columns={[
                {
                  title: 'user.Fullname',
                  name: 'name',
                  formItem: {
                    tabIndex: 1,
                    col: 6,
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
                    col: 6,
                    rules: [{ type: 'required' }, { type: 'phone', min: 10, max: 15 }],
                  },
                },
                {
                  title: 'user.Note',
                  name: 'note',
                  formItem: {
                    col: 12,
                    type: 'textarea',
                  },
                },
                // {
                //   title: 'fdfdf',
                //   name: 'roleId',
                //   formItem: {
                //      type: 'hidden',

                //   },
                // },
              ]}
              handSubmit={handleSubmit}
              disableSubmit={isLoading}
              handCancel={handleBack}
            />
          )}
        </div>
      </Fragment>
    </div>
  );
};
export default Page;
