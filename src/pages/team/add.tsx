import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { Button } from '@core/button';
import { Form } from '@core/form';
import { GlobalFacade, UserFacade, UserTeamFacade } from '@store';
import { routerLinks, lang } from '@utils';

const Page = () => {
  const { id } = useParams();
  const userTeamFacade = UserTeamFacade();
  const { setBreadcrumbs } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(userTeamFacade.queryParams || '{}');
  useEffect(() => {
    if (id) userTeamFacade.getById({ id });
    else userTeamFacade.set({ data: undefined });
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Team', link: '' },
      { title: id ? 'pages.Team/Edit' : 'pages.Team/Add', link: '' },
    ]);
    return () => {
      isReload.current && userTeamFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (userTeamFacade.status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Team')}`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        break;
    }
  }, [userTeamFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Team')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: any) => {
    if (id) userTeamFacade.put({ ...values, id });
    else userTeamFacade.post(values);
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-2xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Form
        values={{ ...userTeamFacade.data }}
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
        disableSubmit={userTeamFacade.isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
