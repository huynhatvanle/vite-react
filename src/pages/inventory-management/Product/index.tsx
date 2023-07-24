import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { useTranslation } from 'react-i18next';

import { Plus } from '@svgs';
import { ProductFacade } from '@store';
import { TableRefObject } from '@models';
import { Button } from '@core/button';
import { DataTable } from '@core/data-table';
import { routerLinks, languages, language } from '@utils';
import { Tabs } from 'antd';


const Page = () => {
    const { t } = useTranslation();
    const navigate = useNavigate();
    const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
    const productFacade = ProductFacade();
    const dataTableRef = useRef<TableRefObject>(null);
    const [activeKey, setActiveKey] = useState<string>(localStorage.getItem('activeInventoryTab') || 'tab');
    // const { id } = useParams();
    
    const onChangeTab = (key: string) => {
      setActiveKey(key);
      localStorage.setItem('activeInventoryTab', key);
  
      navigate(`/${lang}${routerLinks('inventory-management/product')}?tab=${key}`);
    };
  
    const urlParams = new URLSearchParams(window.location.search);
    const tab = urlParams.get('tab');
  
    useEffect(() => {
      if (tab) {
        setActiveKey(tab);
      }
      // else {
      //   setActiveKey('1');
      // }
    }, []);
  
    return (
        <div className='w-full'>
            <Fragment>
                <Tabs defaultActiveKey='1'
                    type="card"
                    size="large"
                activeKey={activeKey} 
                onTabClick={(key: string) => {
                    //setDate(false)
                    onChangeTab(key)
                }
                }
                >
                    <Tabs.TabPane tab={'Danh sách sản phẩm'} key="1" className="">
                        <DataTable
                             facade={productFacade}
                             ref={dataTableRef}
                            onRow={(data: any) => ({
                                onDoubleClick: () => {
                                    navigate(`/${lang}${routerLinks('store-managerment/branch-management/edit')}/${data.id}`)
                                },
                            })}
                             defaultRequest={{ page: 1, perPage: 10, filter: { type: 'BALANCE', approveStatus: 'ALL' } }}
                            xScroll="1270px"
                            className=" bg-white p-5 rounded-lg form-store form-store-tab3 form-supplier-index"
                            pageSizeRender={(sizePage: number) => sizePage}
                            pageSizeWidth={'50px'}
                            paginationDescription={(from: number, to: number, total: number) =>
                                t('routes.admin.Layout.PaginationSubStore', { from, to, total })
                            }
                            columns={[
                                {
                                    title: 'product.Code',
                                    name: 'code',
                                    tableItem: {
                                        width: 120,
                                    },
                                },
                                {
                                    title: 'product.Name',
                                    name: 'name',
                                    tableItem: {},
                                }, 
                                {
                                    title: 'product.Category',
                                    name: 'category.name',
                                    tableItem: {
                                        render: (value: any, item: any) => item.category?.name,
                                    },
                                },
                                {
                                    title: 'product.SupplierName',
                                    name: 'subOrg.name',
                                    tableItem: {
                                        render: (value: any, item: any) => item.subOrg?.name,
                                    },
                                },
                                {
                                    title: 'product.PriceBalance',
                                    name: 'productPrice.price',
                                    tableItem: {
                                        render: (value: any, item: any) => item.productPrice[0]?.price,
                                    },
                                },
                                {
                                    title: 'product.status',
                                    name: 'approveStatus',
                                    tableItem: {
                                        render: (text: string) =>
                                            text == 'APPROVED' ? (
                                                <div className="bg-green-100 text-center p-1 border border-green-500 text-green-600 rounded">
                                                    {t('supplier.status.on sale')}
                                                </div>
                                            ) : text == 'WAITING_APPROVE' ? (
                                                <div className="bg-yellow-100 text-center p-1 border border-yellow-500 text-yellow-600 rounded">
                                                {t('supplier.status.wait for confirmation')}
                                            </div>
                                            ) : text == 'REJECTED' ? (
                                                <div className="bg-purple-100 text-center p-1 border border-purple-500 text-purple-600 rounded">
                                                {t('supplier.status.decline')}
                                            </div>
                                            ) : text == 'OUT_OF_STOCK' ? (
                                                <div className="bg-red-100 text-center p-1 border border-red-500 text-red-600 rounded">
                                                {t('supplier.status.out of stock')}
                                            </div>
                                            )
                                            : text == 'STOP_SELLING' ? (
                                                <div className=" text-center p-1 border border-black text-black rounded">
                                                {t('supplier.status.stop selling')}
                                            </div>
                                            ) : (
                                                <div className=" text-center p-1 border border-black text-black rounded">{t('supplier.status.canceled')}</div>
                                            ),
                                    },
                                },
                            ]}
                        />
                    </Tabs.TabPane>
                    <Tabs.TabPane tab={'Phê duyệt sản phẩm'} key="2" className="">

                    </Tabs.TabPane>
                </Tabs>
            </Fragment>
        </div>
    );
};
export default Page;
