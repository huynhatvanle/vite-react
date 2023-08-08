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
        path: routerLinks('Techvn'),
        component: React.lazy(() => import('src/pages/tech')),
        title: 'Tech',
      },
      {
        path: routerLinks('Techen'),
        component: React.lazy(() => import('src/pages/tech')),
        title: 'Tech',
      },
      {
        path: routerLinks('Teamvn'),
        component: React.lazy(() => import('src/pages/team')),
        title: 'Team',
      },
      {
        path: routerLinks('Teamen'),
        component: React.lazy(() => import('src/pages/team')),
        title: 'Team',
      },
      {
        path: routerLinks('Newsen'),
        component: React.lazy(() => import('src/pages/news')),
        title: 'News',
      },
      {
        path: routerLinks('Newsen') + '/:slug',
        component: React.lazy(() => import('src/pages/news/detail')),
        title: 'News Detail',
      },
      {
        path: routerLinks('Newsvn'),
        component: React.lazy(() => import('src/pages/news')),
        title: 'News',
      },
      {
        path: routerLinks('Newsvn') + '/:slug',
        component: React.lazy(() => import('src/pages/news/detail')),
        title: 'News Detail',
      },
      {
        path: routerLinks('Projectsen'),
        component: React.lazy(() => import('src/pages/news')),
        title: 'Projects',
      },
      {
        path: routerLinks('Projectsen') + '/:slug',
        component: React.lazy(() => import('src/pages/news/detail')),
        title: 'Projects Detail',
      },
      {
        path: routerLinks('Projectsvn'),
        component: React.lazy(() => import('src/pages/news')),
        title: 'Projects',
      },
      {
        path: routerLinks('Projectsvn') + '/:slug',
        component: React.lazy(() => import('src/pages/news/detail')),
        title: 'Projects Detail',
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
    document.title = t('pages.' + title || '', globalFacade.titleOption || {});
    globalFacade.set({ title });
  }, [title, globalFacade.titleOption]);
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
