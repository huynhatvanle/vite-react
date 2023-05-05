import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { ModalForm } from '@core/modal/form';
import { keyRole } from '@utils';
import { GlobalFacade, DataTypeFacade, DataFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { FormModalRefObject, TableRefObject } from '@models';
import { Popconfirm, Tooltip } from 'antd';
import slug from 'slug';

const Page = () => {
  const { t } = useTranslation();
  const { user } = GlobalFacade();

  const { result, get } = DataTypeFacade();
  useEffect(() => {
    if (!result?.data) get({});
  }, []);
  const listType = (result?.data || []).map((item) => ({ value: item.code, label: item.name }));

  const dataFacade = DataFacade();
  const { status } = dataFacade;
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        dataTableRef?.current?.onChange!();
        break;
    }
  }, [status]);

  const dataTableRef = useRef<TableRefObject>(null);
  const modalFormRef = useRef<FormModalRefObject>(null);

  return (
    <Fragment>
      <DataTable
        facade={dataFacade}
        showSearch={false}
        ref={dataTableRef}
        onRow={() => ({
          onDoubleClick: () => null,
        })}
        pageSizeRender={(sizePage: number) => sizePage}
        pageSizeWidth={'50px'}
        paginationDescription={(from: number, to: number, total: number) =>
          t('routes.admin.Layout.Pagination', { from, to, total })
        }
        columns={[
          {
            title: 'Data.Type',
            name: 'type',
            tableItem: {
              filter: {
                type: 'radio',
                list: listType || [],
              },
              width: 110,
              sorter: true,
              render: (text: string) => (text && listType.filter((item) => item.value === text)[0]?.label) || '',
            },
          },
          {
            title: 'Data.Name',
            name: 'translations',
            tableItem: {
              filter: { type: 'search' },
              sorter: true,
              render: (text) =>
                text?.filter((item: any) => item?.language === localStorage.getItem('i18nextLng'))[0].name || '',
            },
          },
          {
            title: 'Data.Order',
            name: 'order',
            tableItem: {
              filter: { type: 'search' },
              sorter: true,
            },
          },
          {
            title: 'user.Action',
            tableItem: {
              width: 100,
              align: 'center',
              onCell: () => ({
                style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },
              }),
              render: (text: string, data) => (
                <div className={'flex gap-2'}>
                  {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (
                    <Tooltip title={t('routes.admin.Layout.Edit')}>
                      <Edit
                        className="icon-cud bg-blue-600 hover:bg-blue-400"
                        onClick={() => modalFormRef?.current?.handleEdit!(data)}
                      />
                    </Tooltip>
                  )}
                  {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (
                    <Tooltip title={t('routes.admin.Layout.Delete')}>
                      <Popconfirm
                        placement="left"
                        title={t('components.datatable.areYouSureWant')}
                        onConfirm={() => modalFormRef?.current?.handleDelete!(data.id)}
                        okText={t('components.datatable.ok')}
                        cancelText={t('components.datatable.cancel')}
                      >
                        <Trash className="icon-cud bg-red-600 hover:bg-red-400 " />
                      </Popconfirm>
                    </Tooltip>
                  )}
                </div>
              ),
            },
          },
        ]}
        rightHeader={
          <div className={'flex gap-2'}>
            {user?.role?.permissions?.includes(keyRole.P_DATA_CREATE) && (
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => modalFormRef?.current?.handleEdit!()}
              />
            )}
          </div>
        }
      />
      <ModalForm
        facade={dataFacade}
        ref={modalFormRef}
        title={() => (!dataFacade.data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
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
        widthModal={600}
        idElement={'user'}
      />
    </Fragment>
  );
};
export default Page;
