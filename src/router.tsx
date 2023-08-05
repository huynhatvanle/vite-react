import React, { Suspense, useEffect } from 'react';
import { BrowserRouter, Navigate, Outlet, Route, Routes } from 'react-router-dom';

import { Spin } from 'antd';
import { keyUser, routerLinks, language, languages } from '@utils';
import { useTranslation } from 'react-i18next';
import { GlobalFacade } from '@store';

const pages = [
  {
    layout: React.lazy(() => import('src/layouts/default')),
    isPublic: true,
    child: [
      {
        path: routerLinks('Home'),
        component: React.lazy(() => import('src/pages/home')),
        title: 'Home',
      },
      {
        path: routerLinks('Tech'),
        component: React.lazy(() => import('src/pages/tech')),
        title: 'Tech',
      },
      {
        path: routerLinks('Team'),
        component: React.lazy(() => import('src/pages/team')),
        title: 'Team',
      },
      {
        path: routerLinks('News'),
        component: React.lazy(() => import('src/pages/news')),
        title: 'News',
      },
      {
        path: routerLinks('News') + '/:slug',
        component: React.lazy(() => import('src/pages/news/detail')),
        title: 'News Detail',
      },
    ],
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
    globalFacade.set({ title });
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
