import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate, useParams } from 'react-router';

import { DataTypeFacade, Data, DataFacade, GlobalFacade } from '@store';
import { routerLinks, lang } from '@utils';
import { Button } from '@core/button';
import { Form } from '@core/form';
import slug from 'slug';
import { Spin } from 'antd';
const Page = () => {
  const { id, type } = useParams();
  const dataFacade = DataFacade();
  const { set } = GlobalFacade();
  const param = JSON.parse(dataFacade.queryParams || `{"filter":"{\\"type\\":\\"${type}\\"}"}`);
  useEffect(() => {
    if (id) dataFacade.getById({ id });
    else dataFacade.set({ data: undefined });
    set({
      breadcrumbs: [
        { title: 'titles.Setting', link: '' },
        { title: 'titles.Data', link: '' },
        { title: id ? 'pages.Data/Edit' : 'pages.Data/Add', link: '' },
      ],
    });
  }, [id]);

  const navigate = useNavigate();
  const isBack = useRef(true);
  useEffect(() => {
    switch (dataFacade.status) {
      case 'post.fulfilled':
      case 'put.fulfilled':
        if (isBack.current) handleBack();
        else {
          isBack.current = true;
          if (id) navigate(`/${lang}${routerLinks('Data')}/${type}/add`);
          else dataFacade.set({ data: {} });
        }
        break;
    }
  }, [dataFacade.status]);

  const handleBack = () => {
    dataFacade.set({ status: 'idle' });
    navigate(`/${lang}${routerLinks('Data')}?${new URLSearchParams(param).toString()}`);
  };

  const handleSubmit = (values: Data) => {
    if (id) dataFacade.put({ ...values, id, type });
    else dataFacade.post({ ...values, type });
  };

  const dataTypeFacade = DataTypeFacade();
  useEffect(() => {
    if (!dataTypeFacade.result?.data?.length) dataTypeFacade.get({});
  }, []);
  useEffect(() => {
    if (dataTypeFacade.result?.data?.length) {
      set({ titleOption: { type: dataTypeFacade.result?.data?.filter((item) => item.code === type)[0]?.name } });
      if (!dataTypeFacade?.result?.data?.filter((item) => item.code === type).length) {
        navigate({
          pathname: location.pathname.replace(
            `/${type}/`,
            id && dataFacade.data?.type ? `/${dataFacade.data?.type}/` : '/partner/',
          ),
        });
      }
    }
  }, [dataTypeFacade.result]);
  const { t } = useTranslation();
  return (
    <div className={'max-w-3xl mx-auto bg-white p-4 shadow rounded-xl'}>
      <Spin spinning={dataFacade.isLoading}>
        <Form
          values={{ ...dataFacade.data }}
          className="intro-x"
          columns={[
            {
              title: 'Name',
              name: 'name',
              formItem:
                type === 'partner' || type === 'tech'
                  ? {
                      col: 6,
                    }
                  : undefined,
            },
            {
              title: 'routes.admin.Data.Order',
              name: 'order',
              formItem: {
                col: 6,
                type: 'number',
              },
            },
            {
              title: 'routes.admin.Data.Image',
              name: 'image',
              formItem: {
                col: 6,
                type: 'upload',
              },
            },
            {
              name: 'translations',
              title: '',
              formItem:
                type === 'partner' || type === 'tech'
                  ? undefined
                  : {
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
                        { title: 'id', name: 'id', formItem: { type: 'hidden' } },
                        {
                          title: 'Name',
                          name: 'name',
                          formItem: {
                            col: type === 'member' ? 6 : 12,
                            rules: [{ type: 'required' }],
                            onBlur: (e, form, name) => {
                              if (e.target.value && !form.getFieldValue(['translations', name[0], 'slug'])) {
                                form.setFieldValue(['translations', name[0], 'slug'], slug(e.target.value));
                              }
                            },
                          },
                        },

                        {
                          title: 'Position',
                          name: 'position',
                          formItem:
                            type === 'member'
                              ? {
                                  col: 6,
                                }
                              : undefined,
                        },

                        {
                          title: 'Description',
                          name: 'description',
                          formItem: {
                            type: 'textarea',
                          },
                        },

                        {
                          title: 'Content',
                          name: 'content',
                          formItem:
                            type === 'member'
                              ? {
                                  type: 'editor',
                                }
                              : undefined,
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
      </Spin>
    </div>
  );
};
export default Page;
