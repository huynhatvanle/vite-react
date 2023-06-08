import React, {Fragment, ReactNode, useEffect, useState} from 'react';
import { useTranslation } from 'react-i18next';
import { Popconfirm, Spin, Tooltip } from 'antd';

import { Button } from '@core/button';
import { GlobalFacade, PageFacade, Page } from '@store';
import { Arrow, Plus, Search, Times, Trash } from '@svgs';
import { keyRole, listType, loopMapSelect } from '@utils';

import { Tree } from 'antd';
import type { TreeProps, DataNode } from 'antd/es/tree';
import slug from 'slug';
import { Form } from '@core/form';
import classNames from 'classnames';

const PageC = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  const pageFacade = PageFacade();
  useEffect(() => {
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Page', link: '' },
    ]);
    pageFacade.get({});
  }, []);

  const [data, setData] = useState<DataNode>();
  useEffect(() => {
    switch (pageFacade.status) {
      case 'post.fulfilled':
      case 'put.fulfilled':
        setData(undefined);
        pageFacade.get({});
        break;
      case 'delete.fulfilled':
        pageFacade.get({});
        break;
    }
  }, [pageFacade.status]);

  const [searchValue, setSearchValue] = useState('');
  const formatMap = (data: Page[]): any[] =>
    data.map(({ children, ...item }) => {
      const strTitle = item.name as string;
      const index = strTitle.indexOf(searchValue);
      const beforeStr = strTitle.substring(0, index);
      const afterStr = strTitle.slice(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="text-red-600 font-bold">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );
      return {
        ...item,
        title,
        key: item.id,
        children: children && formatMap(children),
      };
    });

  const { t } = useTranslation();
  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => setData(info.node);
  const handleSubmit = (values: any) => {
    setData({ ...data, ...values });
    if (data?.key) pageFacade.put({ ...values, id: data?.key });
    else pageFacade.post(values);
  };
  return (
    <Fragment>
      <div className="container mx-auto grid grid-cols-12 gap-3">
        <div className="col-span-12 md:col-span-5 lg:col-span-4 -intro-x">
          <div className="shadow rounded-md w-full bg-white overflow-hidden">
            <div className="h-14 flex justify-between items-center border-b border-gray-100 px-2 py-2">
              <div className="relative">
                <input
                  value={searchValue}
                  className="w-full sm:w-52 h-10 rounded-xl text-gray-600 bg-white border border-solid border-gray-100 pr-9 pl-4"
                  // defaultValue={params.fullTextSearch}
                  type="text"
                  placeholder={t('components.datatable.pleaseEnterValueToSearch') as string}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchValue(e.target.value)}
                />
                {!searchValue ? (
                  <Search className="w-4 h-4 my-1 fill-gray-600 text-lg las absolute top-2 right-2.5 z-10" />
                ) : (
                  <Times
                    className="w-4 h-4 my-1 fill-gray-600 text-lg las absolute top-2 right-2.5 z-10"
                    onClick={() => setSearchValue('')}
                  />
                )}
              </div>
              <Button
                icon={<Plus className="icon-cud !h-5 !w-5" />}
                text={t('components.button.New')}
                onClick={() => setData(undefined)}
              />
            </div>
            <div className="overflow-x-hidden overflow-y-auto relative py-2 px-4 h-[calc(100vh-12rem)]">
              {!pageFacade.isLoading ? (
                <Tree
                  defaultExpandAll
                  titleRender={(node) => (
                    <div className={'group w-full flex items-center justify-between cursor-pointer'}>
                      <div className="flex-auto py-1">{node.title as ReactNode}</div>
                      {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (
                        <Tooltip title={t('routes.admin.Layout.Delete')}>
                          <Popconfirm
                            placement="left"
                            title={t('components.datatable.areYouSureWant')}
                            onConfirm={() => pageFacade.delete(node.key.toString())}
                            okText={t('components.datatable.ok')}
                            cancelText={t('components.datatable.cancel')}
                          >
                            <button title={t('routes.admin.Layout.Delete') || ''}>
                              <Trash className="icon-cud bg-red-600 hover:bg-red-400 opacity-0 group-hover:opacity-100 transition-all duration-300" />
                            </button>
                          </Popconfirm>
                        </Tooltip>
                      )}
                    </div>
                  )}
                  showLine
                  treeData={formatMap(pageFacade?.result?.data || [])}
                  onSelect={onSelect}
                  switcherIcon={(node: any) => (
                    <Arrow
                      className={classNames('!h-3 !w-3 transition-all duration-300', { 'rotate-90': node.expanded })}
                    />
                  )}
                />
              ) : (
                <Spin>
                  <div className="w-full h-52"></div>
                </Spin>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-8 intro-x">
          <div className="shadow rounded-md w-full bg-white overflow-auto">
            <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
              <h2 className="font-bold order-1 text-xl">{data?.key ? t('pages.Page/Edit') : t('pages.Page/Add')}</h2>
            </div>
            <div className="overflow-x-hidden overflow-y-auto relative py-2 px-4 h-[calc(100vh-12rem)]">
              <Spin spinning={pageFacade.isLoading}>
                <Form
                  values={{ ...data }}
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
                      title: 'Page.Type',
                      name: 'type',
                      formItem: {
                        type: 'select',
                        col: 6,
                        list: listType,
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
                            title: 'Page.Slug',
                            name: 'id',
                            formItem: {
                              type: 'hidden',
                            },
                          },
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
                  handCancel={() => setData(undefined)}
                  handSubmit={handleSubmit}
                  disableSubmit={pageFacade.isLoading}
                />
              </Spin>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};
export default PageC;
