import React, { Fragment, useEffect, useMemo, useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Popconfirm, Spin, Tooltip } from 'antd';

import { Button } from '@core/button';
import { TableRefObject } from '@models';
import { GlobalFacade, PageFacade, Page } from '@store';
import { Arrow, Edit, Plus, Search, Times, Trash } from '@svgs';
import { listStyle, loopMapSelect } from '@utils';

import { Tree } from 'antd';
import type { TreeProps, DataNode } from 'antd/es/tree';
import slug from 'slug';
import { Form } from '@core/form';
import classNames from 'classnames';

const Page = () => {
  const { user, setBreadcrumbs } = GlobalFacade();
  const [data, setData] = useState<DataNode>();
  useEffect(() => {
    setBreadcrumbs([
      { title: 'titles.Setting', link: '' },
      { title: 'titles.Page', link: '' },
    ]);
    pageFacade.get({});
  }, []);

  const pageFacade = PageFacade();
  useEffect(() => {
    switch (pageFacade.status) {
      case 'delete.fulfilled':
        pageTableRef?.current?.onChange!();
        break;
    }
  }, [pageFacade.status]);
  // const formatMap: any = (array: any[] = [], title = 'name', key = 'id') => {
  //   return array.map(({ children, style, ...item }) => ({
  //     ...item,
  //     title: item[title],
  //     key: item[key],
  //     children: children && formatMap(children),
  //   }));
  // };

  const [searchValue, setSearchValue] = useState('');

  const formatMap = (data: Page[]): any[] =>
    data.map((item) => {
      const strTitle = item.name as string;
      const index = strTitle.indexOf(searchValue);
      const beforeStr = strTitle.substring(0, index);
      const afterStr = strTitle.slice(index + searchValue.length);
      const title =
        index > -1 ? (
          <span>
            {beforeStr}
            <span className="text-red-600">{searchValue}</span>
            {afterStr}
          </span>
        ) : (
          <span>{strTitle}</span>
        );
      if (item.children) {
        return { title, key: item.id, children: formatMap(item.children) };
      }

      return {
        title,
        key: item.id,
        children: undefined,
      };
    });

  const pageTableRef = useRef<TableRefObject>(null);
  const { t } = useTranslation();

  const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
    console.log('selected', selectedKeys, info);
    setData(info.node);
  };

  const handleSubmit = (values: any) => {
    // if (id) pageFacade.put({ ...values, id });
    // else pageFacade.post(values);
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
                // onClick={() => navigate(`/${lang}${routerLinks('User/Add')}`)}
              />
            </div>
            <div className="overflow-x-hidden overflow-y-auto relative py-2 px-4 h-[calc(100vh-9rem)]">
              {pageFacade.result?.data ? (
                <Tree
                  defaultExpandAll
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
                  <div className="w-screen h-screen" />
                </Spin>
              )}
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-7 lg:col-span-8 intro-x">
          <div className="shadow rounded-md w-full bg-white overflow-auto">
            <div className="h-14 flex justify-between items-center border-b border-gray-100 px-4 py-2">
              <h2 className="font-bold order-1 text-xl">{data ? t('pages.Page/Edit') : t('pages.Page/Add')}</h2>
            </div>
            <div className="overflow-x-hidden overflow-y-auto relative py-2 px-4 h-[calc(100vh-9rem)]">
              <Form
                values={data}
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
                      text={t('components.button.Save and Add new')}
                      className={'md:min-w-[12rem] w-full justify-center out-line'}
                      onClick={() => {
                        form.submit();
                      }}
                    />
                  </div>
                )}
                handSubmit={handleSubmit}
                disableSubmit={pageFacade.isLoading}
              />
            </div>
          </div>
        </div>
      </div>
      {/*<DataTable*/}
      {/*  className={'max-w-5xl mx-auto'}*/}
      {/*  facade={pageFacade}*/}
      {/*  showSearch={false}*/}
      {/*  ref={pageTableRef}*/}
      {/*  onRow={() => ({*/}
      {/*    onDoubleClick: () => null,*/}
      {/*  })}*/}
      {/*  pageSizeRender={(sizePage: number) => sizePage}*/}
      {/*  pageSizeWidth={'50px'}*/}
      {/*  paginationDescription={(from: number, to: number, total: number) =>*/}
      {/*    t('routes.admin.Layout.Pagination', { from, to, total })*/}
      {/*  }*/}
      {/*  columns={[*/}
      {/*    {*/}
      {/*      title: 'user.Name',*/}
      {/*      name: 'name',*/}
      {/*      tableItem: {*/}
      {/*        filter: { type: 'search' },*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'Data.Order',*/}
      {/*      name: 'order',*/}
      {/*      tableItem: {*/}
      {/*        filter: { type: 'search' },*/}
      {/*        sorter: true,*/}
      {/*      },*/}
      {/*    },*/}
      {/*    {*/}
      {/*      title: 'user.Action',*/}
      {/*      tableItem: {*/}
      {/*        width: 100,*/}
      {/*        align: 'center',*/}
      {/*        onCell: () => ({*/}
      {/*          style: { paddingTop: '0.25rem', paddingBottom: '0.25rem' },*/}
      {/*        }),*/}
      {/*        render: (text: string, data) => (*/}
      {/*          <div className={'flex gap-2'}>*/}
      {/*            {user?.role?.permissions?.includes(keyRole.P_CODE_UPDATE) && (*/}
      {/*              <Tooltip title={t('routes.admin.Layout.Edit')}>*/}
      {/*                <button*/}
      {/*                  title={t('routes.admin.Layout.Edit') || ''}*/}
      {/*                  onClick={() => navigate(`/${lang}${routerLinks('Page')}/${data.id}/edit`)}*/}
      {/*                >*/}
      {/*                  <Edit className="icon-cud bg-blue-600 hover:bg-blue-400" />*/}
      {/*                </button>*/}
      {/*              </Tooltip>*/}
      {/*            )}*/}
      {/*            {user?.role?.permissions?.includes(keyRole.P_CODE_DELETE) && (*/}
      {/*              <Tooltip title={t('routes.admin.Layout.Delete')}>*/}
      {/*                <Popconfirm*/}
      {/*                  placement="left"*/}
      {/*                  title={t('components.datatable.areYouSureWant')}*/}
      {/*                  onConfirm={() => pageTableRef?.current?.handleDelete!(data.id)}*/}
      {/*                  okText={t('components.datatable.ok')}*/}
      {/*                  cancelText={t('components.datatable.cancel')}*/}
      {/*                >*/}
      {/*                  <button title={t('routes.admin.Layout.Delete') || ''}>*/}
      {/*                    <Trash className="icon-cud bg-red-600 hover:bg-red-400" />*/}
      {/*                  </button>*/}
      {/*                </Popconfirm>*/}
      {/*              </Tooltip>*/}
      {/*            )}*/}
      {/*          </div>*/}
      {/*        ),*/}
      {/*      },*/}
      {/*    },*/}
      {/*  ]}*/}
      {/*  rightHeader={*/}
      {/*    <div className={'flex gap-2'}>*/}
      {/*      {user?.role?.permissions?.includes(keyRole.P_PAGE_CREATE) && (*/}
      {/*        <Button*/}
      {/*          icon={<Plus className="icon-cud !h-5 !w-5" />}*/}
      {/*          text={t('components.button.New')}*/}
      {/*          onClick={() => navigate(`/${lang}${routerLinks('Page/Add')}`)}*/}
      {/*        />*/}
      {/*      )}*/}
      {/*    </div>*/}
      {/*  }*/}
      {/*/>*/}
    </Fragment>
  );
};
export default Page;
