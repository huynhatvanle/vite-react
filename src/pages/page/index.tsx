import React, { Fragment, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Popconfirm, Tooltip } from 'antd';
import slug from 'slug';

import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { ModalForm } from '@core/modal/form';
import { FormModalRefObject, TableRefObject } from '@models';
import { GlobalFacade, PageFacade } from '@store';
import { Edit, Plus, Trash } from '@svgs';
import { keyRole, listStyle, loopMapSelect } from '@utils';

const Page = () => {
  const { t } = useTranslation();
  const { user } = GlobalFacade();

  const pageFacade = PageFacade();
  const { status } = pageFacade;
  useEffect(() => {
    switch (status) {
      case 'put.fulfilled':
      case 'post.fulfilled':
      case 'delete.fulfilled':
        pageTableRef?.current?.onChange!();
        break;
    }
  }, [status]);

  const pageTableRef = useRef<TableRefObject>(null);
  const modalFormRef = useRef<FormModalRefObject>(null);

  return (
    <Fragment>
      <DataTable
        facade={pageFacade}
        showSearch={false}
        ref={pageTableRef}
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
            title: 'Name',
            name: 'name',
            tableItem: {
              filter: { type: 'search' },
              sorter: true,
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
                      <button
                        title={t('routes.admin.Layout.Edit') || ''}
                        onClick={() => modalFormRef?.current?.handleEdit!(data)}
                      >
                        <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />
                      </button>
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
                        <button title={t('routes.admin.Layout.Delete') || ''}>
                          <Trash className="icon-cud bg-red-600 hover:bg-red-400" />
                        </button>
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
            {user?.role?.permissions?.includes(keyRole.P_PAGE_CREATE) && (
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
        facade={pageFacade}
        ref={modalFormRef}
        title={() => (!pageFacade.data?.id ? t('routes.admin.Layout.Add') : t('routes.admin.Layout.Edit'))}
        columns={[
          {
            title: 'Name',
            name: 'name',
            formItem: {
              col: 6,
            },
          },
          {
            title: 'Style',
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
            title: 'ParentId',
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
                  title: 'Title',
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
                    col: 8,
                    type: 'textarea',
                  },
                },
                {
                  title: 'Image',
                  name: 'image',
                  formItem: {
                    col: 4,
                    type: 'upload',
                  },
                },
                // {
                //   title: 'Content',
                //   name: 'content',
                //   formItem: {
                //     type: 'layout',
                //   },
                // },
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
