import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import { Spin } from 'antd';

import { PostTypeFacade, PostType, GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
const Page = () => {
  const { id } = useParams();
  const postTypeFacade = PostTypeFacade();
  const { setBreadcrumbs } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(postTypeFacade.queryParams || '{}');
  useEffect(() => {
    if (id) postTypeFacade.getById({ id });
    else postTypeFacade.set({ data: undefined });
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Post', link: '' },
      { title: id ? 'pages.Post/Edit' : 'pages.Post/Add', link: '' },
    ]);
    return () => {
      isReload.current && postTypeFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (postTypeFacade.status) {
      case 'post.fulfilled':
      case 'put.fulfilled':
        postTypeFacade.get(JSON.parse(postTypeFacade.queryParams || '{}'));
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Post')}/add`);
        }
        break;
    }
  }, [postTypeFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Post')}?${new URLSearchParams(param).toString()}`);

  const handleSubmit = (values: PostType) => {
    if (id) postTypeFacade.put({ ...values, id });
    else postTypeFacade.post(values);
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={postTypeFacade.isLoading}>
        <Form
          values={{ ...postTypeFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'Name',
              name: 'name',
              formItem: {
                col: 6,
              },
            },
            {
              title: 'Slug',
              name: 'slug',
              formItem: {
                col: 6,
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
              name: 'coverUrl',
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
          disableSubmit={postTypeFacade.isLoading}
          handCancel={handleBack}
        />
      </Spin>
    </div>
  );
};
export default Page;
