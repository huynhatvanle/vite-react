import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { DataTypeFacade, Data, DataFacade, GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import slug from 'slug';
const Page = () => {
  const { id } = useParams();
  const dataFacade = DataFacade();
  const { setBreadcrumbs } = GlobalFacade();
  const isReload = useRef(false);
  const param = JSON.parse(dataFacade.queryParams || '{}');
  useEffect(() => {
    if (id) dataFacade.getById({ id });
    else dataFacade.set({ data: undefined });
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Data', link: '' },
      { title: id ? 'pages.Data/Edit' : 'pages.Data/Add', link: '' },
    ]);
    return () => {
      isReload.current && dataFacade.get(param);
    };
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (dataFacade.status) {
      case 'post.fulfilled':
        navigate(`/${lang}${routerLinks('Data')}/${dataFacade.data?.id}`);
        break;
      case 'put.fulfilled':
        if (Object.keys(param).length > 0) isReload.current = true;

        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          navigate(`/${lang}${routerLinks('Data/Add')}`);
        }
        break;
    }
  }, [dataFacade.status]);

  const handleBack = () => navigate(`/${lang}${routerLinks('Data')}?${new URLSearchParams(param).toString()}`);

  const handleSubmit = (values: Data) => {
    if (id) dataFacade.put({ ...values, id });
    else dataFacade.post(values);
  };

  const { result } = DataTypeFacade();
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));
  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Form
        values={{ ...dataFacade.data }}
        className="intro-x"
        columns={[
          {
            title: 'Data.Type',
            name: 'type',
            formItem: {
              type: 'select',
              col: 4,
              rules: [{ type: 'required' }],
              list: listType || [],
            },
          },
          {
            title: 'Data.Order',
            name: 'order',
            formItem: {
              col: 4,
              type: 'number',
            },
          },
          {
            title: 'Data.Created At',
            name: 'createdAt',
            formItem: {
              col: 4,
              type: 'date',
            },
          },
          {
            title: 'Data.Image',
            name: 'image',
            formItem: {
              type: 'upload',
              mode: 'multiple',
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
                  title: 'Name',
                  name: 'name',
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
                  title: 'Slug',
                  name: 'slug',
                  formItem: {
                    col: 6,
                  },
                },
                {
                  title: 'Description',
                  name: 'description',
                  formItem: {
                    type: 'textarea',
                  },
                },
                {
                  name: 'seoTitle',
                  title: 'SEO Title',
                  formItem: {
                    col: 6,
                  },
                },
                {
                  name: 'seoDescription',
                  title: 'SEO Description',
                  formItem: {
                    col: 6,
                  },
                },

                {
                  title: 'Content',
                  name: 'content',
                  formItem: {
                    type: 'editor',
                  },
                },
              ],
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
        disableSubmit={dataFacade.isLoading}
        handCancel={handleBack}
      />
    </div>
  );
};
export default Page;
