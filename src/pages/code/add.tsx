import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import slug from 'slug';

import { CodeFacade, Code, CodeTypeFacade, GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import { Spin } from 'antd';

const Page = () => {
  const { id, type } = useParams();
  const codeFacade = CodeFacade();
  const { set } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(codeFacade.queryParams || `{"filter":"{\\"type\\":\\"${type}\\"}"}`);
  useEffect(() => {
    if (id) codeFacade.getById({ id });
    else codeFacade.set({ data: undefined });
    set({
      breadcrumbs: [
        { title: 'titles.Setting', link: '' },
        { title: 'titles.Code', link: '' },
        { title: id ? 'pages.Code/Edit' : 'pages.Code/Add', link: '' },
      ],
    });
    return () => {
      isReload.current && codeFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (codeFacade.status) {
      case 'post.fulfilled':
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Code')}/add`);
        }
        break;
    }
  }, [codeFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Code')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: Code) => {
    if (id) codeFacade.put({ ...values, id, type });
    else codeFacade.post({ ...values, type });
  };

  const codeTypeFacade = CodeTypeFacade();
  useEffect(() => {
    if (!codeTypeFacade.result?.data?.length) codeTypeFacade.get({});
  }, []);
  useEffect(() => {
    if (codeTypeFacade.result?.data) {
      set({ titleOption: { type: codeTypeFacade.result?.data?.filter((item) => item.code === type)[0]?.name } });
    }
  }, [codeTypeFacade.result]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-2xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={codeFacade.isLoading}>
        <Form
          values={{ ...codeFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'routes.admin.Code.Name',
              name: 'name',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }],
                onBlur: (e, form) => {
                  if (e.target.value && !form.getFieldValue('code')) {
                    form.setFieldValue('code', slug(e.target.value).toUpperCase());
                  }
                },
              },
            },
            {
              title: 'titles.Code',
              name: 'code',
              formItem: {
                col: 6,
                rules: [{ type: 'required' }],
              },
            },
            {
              title: 'routes.admin.user.Description',
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
      </Spin>
    </div>
  );
};
export default Page;
