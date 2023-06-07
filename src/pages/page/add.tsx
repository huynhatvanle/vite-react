import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';
import slug from 'slug';

import { Button } from '@core/button';
import { Form } from '@core/form';
import { GlobalFacade, PageFacade } from '@store';
import { routerLinks, listStyle, loopMapSelect, lang } from '@utils';

const Page = () => {
  const { id } = useParams();
  const pageFacade = PageFacade();
  const { setBreadcrumbs } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(pageFacade.queryParams || '{}');
  useEffect(() => {
    if (id) pageFacade.getById({ id });
    else pageFacade.set({ data: undefined });
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Page', link: '' },
      { title: id ? 'pages.Page/Edit' : 'pages.Page/Add', link: '' },
    ]);
    return () => {
      isReload.current && pageFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (pageFacade.status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Page')}/${pageFacade.data?.id}`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Page')}`);
        }
        break;
    }
  }, [pageFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Page')}?${new URLSearchParams(param).toString()}`);
  const handleSubmit = (values: any) => {
    if (id) pageFacade.put({ ...values, id });
    else pageFacade.post(values);
  };

  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto'}>
      <Form
        values={{ ...pageFacade.data }}
        className="intro-x"
        columns={[
          {
            title: 'user.Name',
            name: 'name',
            formItem: {
              col: 6,
            },
          },
          {
            title: 'Page.Style',
            name: 'style',
            formItem: {
              type: 'select',
              col: 6,
              list: listStyle,
            },
          },
          {
            title: 'Data.Order',
            name: 'order',
            formItem: {
              col: 6,
              type: 'number',
            },
          },
          {
            title: 'Page.ParentId',
            name: 'parentId',
            formItem: {
              col: 6,
              type: 'tree_select',
              list: loopMapSelect(pageFacade?.result?.data),
            },
          },
          {
            name: 'translations',
            title: '',
            formItem: {
              type: 'tab',
              tab: {
                label: 'language',
                value: 'language',
              },
              list: [
                { label: 'English', value: 'en' },
                { label: 'Vietnam', value: 'vn' },
              ],
              column: [
                {
                  title: 'Page.Title',
                  name: 'title',
                  formItem: {
                    col: 6,
                    rules: [{ type: 'required' }],
                    onBlur: (e, form, name) => {
                      if (e.target.value && !form.getFieldValue(['translations', name[0], 'slug'])) {
                        form.setFieldValue(['translations', name[0], 'slug'], slug(e.target.value));
                      }
                    },
                  },
                },
                {
                  title: 'Page.Slug',
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
                  title: 'Data.Image',
                  name: 'image',
                  formItem: {
                    col: 4,
                    type: 'upload',
                  },
                },
                {
                  title: 'Page.Content',
                  name: 'content',
                  formItem: {
                    type: 'layout',
                  },
                },
              ],
            },
          },
        ]}
        extendButton={(form) => (
          <div className="flex">
            <Button
              text={t('components.form.modal.cancel')}
              className="md:min-w-[12rem] !bg-red-600 w-full justify-center mr-2"
              onClick={handleBack}
            />
            <Button
              text={t('components.button.Save and Add new')}
              className={'md:min-w-[12rem] w-full justify-center out-line'}
              onClick={() => {
                form.submit();
                isBack.current = false;
              }}
            />
          </div>
        )}
        handSubmit={handleSubmit}
        disableSubmit={pageFacade.isLoading}
      />
    </div>
  );
};
export default Page;
