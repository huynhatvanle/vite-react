import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import slug from 'slug';

import { CodeFacade, Code, CodeTypeFacade } from '@store';
import { routerLinks, language, languages } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';

const Page = () => {
  const { id } = useParams();
  const codeFacade = CodeFacade();
  const param = JSON.parse(codeFacade.queryParams || '{}');
  const isReload = useRef(false);
  useEffect(() => {
    if (id) codeFacade.getById({ id });
    else codeFacade.set({ data: undefined });

    return () => {
      isReload.current && codeFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const isBack = useRef(true);
  useEffect(() => {
    switch (codeFacade.status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Code')}/${codeFacade.data?.id}`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Code/Add')}`);
        }
        break;
    }
  }, [codeFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Code')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: Code) => {
    if (id) codeFacade.put({ ...values, id });
    else codeFacade.post(values);
  };

  const { result } = CodeTypeFacade();
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));
  const { t } = useTranslation();
  return (
    <div className={'max-w-4xl mx-auto'}>
      <Form
        values={{ ...codeFacade.data }}
        className="intro-x"
        columns={[
          {
            title: 'Code.Name',
            name: 'name',
            formItem: {
              col: 4,
              rules: [{ type: 'required' }],
              onBlur: (e, form) => {
                if (e.target.value && !form.getFieldValue('code')) {
                  form.setFieldValue('code', slug(e.target.value).toUpperCase());
                }
              },
            },
          },
          {
            title: 'Code.Type',
            name: 'type',
            formItem: {
              type: 'select',
              col: 4,
              rules: [{ type: 'required' }],
              list: listType || [],
            },
          },
          {
            title: 'titles.Code',
            name: 'code',
            formItem: {
              col: 4,
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
        disableSubmit={codeFacade.isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
