import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Avatar } from '@core/avatar';
import { UserFacade, UserTeamFacade } from '@store';
import { routerLinks, language, languages } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';

const Page = () => {
  const { t } = useTranslation();
  const userTeamFacade = UserTeamFacade();
  const { data, isLoading, queryParams, status } = userTeamFacade;
  const navigate = useNavigate();
  const isBack = useRef(true);
  const isReload = useRef(false);
  const param = JSON.parse(queryParams || '{}');
  const { id } = useParams();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (id) userTeamFacade.getById({ id });
    else userTeamFacade.set({ data: undefined });

    return () => {
      isReload.current && userTeamFacade.get(param);
    };
  }, [id]);

  useEffect(() => {
    switch (status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Team')}/${data?.id}`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        break;
    }
  }, [status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Team')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: any) => {
    if (id) userTeamFacade.put({ ...values, id });
    else userTeamFacade.post(values);
  };

  return (
    <div className={'max-w-4xl mx-auto'}>
      <Form
        values={{ ...data }}
        className="intro-x"
        columns={[
          {
            title: 'team.Name',
            name: 'name',
            formItem: {
              rules: [{ type: 'required' }],
            },
          },
          {
            title: 'user.Description',
            name: 'description',
            formItem: {
              type: 'textarea',
            },
          },
          {
            title: 'dayoff.Manager',
            name: 'managerId',
            formItem: {
              rules: [{ type: 'required' }],
              type: 'select',
              get: {
                facade: UserFacade,
                params: (fullTextSearch) => ({
                  fullTextSearch,
                  filter: { roleCode: 'manager' },
                  extend: {},
                }),
                format: (item: any) => ({
                  label: item.name,
                  value: item.id,
                }),
              },
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
        disableSubmit={isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
