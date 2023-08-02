import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spin } from 'antd';
import { keyUser, language, languages, routerLinks } from '@utils';
import { useTranslation } from 'react-i18next';
import { GlobalFacade } from '@store';

const pages = [
  {
    layout: React.lazy(() => import('@layouts/auth')),
    isPublic: true,
    child: [
      {
        path: '/',
        component: routerLinks('Dashboard'),
      },
      {
        path: routerLinks('Login'),
        component: React.lazy(() => import('@pages/login')),
        title: 'Login',
      },
      {
        path: routerLinks('ForgetPassword'),
        component: React.lazy(() => import('@pages/forget-password')),
        title: 'Quên Mật Khẩu',
      },
      {
        path: routerLinks('VerifyForotPassword'),
        component: React.lazy(() => import('@pages/forget-password/otp')),
        title: 'Quên Mật Khẩu',
      },
      {
        path: routerLinks('SetPassword'),
        component: React.lazy(() => import('@pages/forget-password/otp/set-password')),
        title: 'Đặt Lại Mật Khẩu',
      },
    ],
  },
  {
    layout: React.lazy(() => import('@layouts/admin')),
    isPublic: false,
    child: [
      {
        path: '/',
        component: routerLinks('Dashboard'),
      },
      {
        path: routerLinks('MyProfile'),
        component: React.lazy(() => import('@pages/my-profile')),
        title: 'MyProfile',
      },
      {
        path: routerLinks('Dashboard'),
        component: React.lazy(() => import('@pages/dashboard')),
        title: 'Dashboard',
      },
      {
        path: routerLinks('User/List'),
        component: React.lazy(() => import('@pages/user/index')),
        title: 'User/List',
      },
      {
        path: routerLinks('User/Add'),
        component: React.lazy(() => import('@pages/user/add')),
        title: 'User/Add',
      },
      {
        path: routerLinks('User/Edit') + '/:id',
        component: React.lazy(() => import('@pages/user/edit')),
        title: 'User/Edit',
      },
      {
        path: routerLinks('Store'),
        component: React.lazy(() => import('@pages/store')),
        title: 'Store',
      },
      {
        path: routerLinks('store-managerment/create'),
        component: React.lazy(() => import('@pages/store/add')),
        title: 'store-managerment/create',
      },
      {
        path: routerLinks('store-managerment/edit') + '/:id',
        component: React.lazy(() => import('@pages/store/edit')),
        title: 'store-managerment/edit',
      },
      {
        path: routerLinks('store-managerment/branch-management/create') + '/:id',
        component: React.lazy(() => import('@pages/store/branch//add')),
        title: 'store-managerment/branch-management/create',
      },
      {
        path: routerLinks('store-managerment/branch-management/edit') + '/:id',
        component: React.lazy(() => import('@pages/store/branch/edit')),
        title: 'store-managerment/branch-management/edit',
      },
      {
        path: routerLinks('Supplier'),
        component: React.lazy(() => import('@pages/supplier')),
        title: 'Supplier',
      },
      {
        path: routerLinks('Supplier/Add'),
        component: React.lazy(() => import('@pages/supplier/add')),
        title: 'Supplier/Add',
      },
      {
        path: routerLinks('Supplier/Edit') + '/:id',
        component: React.lazy(() => import('@pages/supplier/edit')),
        title: 'Supplier/Edit',
      },
      {
        path: routerLinks('Contract-View') + '/:id',
        component: React.lazy(() => import('@pages/supplier/supllier-contract/supplierContract')),
        title: 'Contract-View',
      },
      {
        path: routerLinks('Discount-Detail') + '/:id',
        component: React.lazy(() => import('@pages/supplier/discountDetail/discountDetail')),
        title: 'Discount-Detail',
      },
      {
        path: routerLinks('Merchandise-Managerment/Product/Detail') + '/:id',
        component: React.lazy(() => import('@pages/supplier/productDetail/index')),
        title: 'Merchandise-Managerment/Product/Detail',
      },
      {
        path: routerLinks('MerchandiseManagermentCategory'),
        component: React.lazy(() => import('@pages/merchandise-managerment/category/index')),
        title: 'MerchandiseManagermentCategory',
      },
      {
        path: routerLinks('Tax'),
        component: React.lazy(() => import('@pages/merchandise-managerment/tax/index')),
        title: 'Merchandise-Managerment/Tax',
      },
      {
        path: routerLinks('revenue-management/store'),
        component: React.lazy(() => import('@pages/revenue-management/store/index')),
        title: 'Store-Revenue',
      },
      {
        path: routerLinks('revenue-management/supplier'),
        component: React.lazy(() => import('@pages/revenue-management/supplier/index')),
        title: 'Supplier-Revenue',
      },
    ], // 💬 generate link to here
  },
];

const Layout = ({
  layout: Layout,
  isPublic = false,
}: {
  layout: React.LazyExoticComponent<({ children }: { children?: React.ReactNode }) => JSX.Element>;
  isPublic: boolean;
}) => {
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  const { user } = GlobalFacade();
  if (isPublic || !!user?.email || !!JSON.parse(localStorage.getItem(keyUser) || '{}')?.email)
    return (
      <Layout>
        <Outlet />
      </Layout>
    );
  return <Navigate to={`/${lang}${routerLinks('Login')}`} />;
};

const Page = ({
  title = '',
  component: Comp,
}: {
  title: string;
  component: React.LazyExoticComponent<() => JSX.Element>;
}) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();

  useEffect(() => {
    document.title = t('pages.' + title || '');
    globalFacade.set({ title, formatDate: globalFacade.formatDate });
  }, [title]);
  return <Comp />;
};
const Pages = () => {
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;
  return (
    <BrowserRouter>
      <Routes>
        <Route path={'/:lang'}>
          {pages.map(({ layout, isPublic, child }, index) => (
            <Route key={index} element={<Layout layout={layout} isPublic={isPublic} />}>
              {child.map(({ path = '', title = '', component }, subIndex: number) => (
                <Route
                  key={path + subIndex}
                  path={'/:lang' + path}
                  element={
                    <Suspense
                      fallback={
                        <Spin>
                          <div className="w-screen h-screen" />
                        </Spin>
                      }
                    >
                      {typeof component === 'string' ? (
                        <Navigate to={'/' + lang + component} />
                      ) : (
                        <Page title={title} component={component} />
                      )}
                    </Suspense>
                  }
                />
              ))}
            </Route>
          ))}
        </Route>
        <Route path="*" element={<Navigate to={'/' + lang + '/'} />} />
      </Routes>
    </BrowserRouter>
  );
};

export default Pages;
