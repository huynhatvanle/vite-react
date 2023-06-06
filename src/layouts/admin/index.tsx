import React, { Fragment, PropsWithChildren, useEffect, useState } from 'react';
import { Dropdown, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, isSupported, getToken, onMessage } from 'firebase/messaging';
import { routerLinks, language, languages } from '@utils';
import { Avatar } from '@core/avatar';
import { GlobalFacade } from '@store';
import Menu from './menu';
// import { firebaseConfig } from 'variable';
import './index.less';
import { Logo, Arrow } from '@svgs';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const { user, title, breadcrumbs } = globalFacade;

  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, set_isCollapsed] = useState(window.innerWidth < 1025);
  const [isDesktop, set_isDesktop] = useState(window.innerWidth > 767);
  const lang = languages.indexOf(location.pathname.split('/')[1]) > -1 ? location.pathname.split('/')[1] : language;

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      setTimeout(() => {
        set_isCollapsed(true);
      });
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });

    function handleResize() {
      if (window.innerWidth < 1025 && !isCollapsed) {
        set_isCollapsed(true);
      }
      set_isDesktop(window.innerWidth > 767);
    }
    window.addEventListener('resize', handleResize, { passive: true });

    // const init = async () => {
    //   if (await isSupported()) {
    //     try {
    //       const defaultApp = initializeApp(firebaseConfig);
    //       const messaging = getMessaging(defaultApp);
    //       const firebaseToken = await getToken(messaging);
    //       console.log(firebaseToken);
    //       onMessage(messaging, async (payload) => {
    //         antNoti.open({
    //           message: <strong>{payload.notification.title}</strong>,
    //           description: payload.notification.body,
    //           icon: <i className="las la-info-circle text-4xl text-blue-600" />,
    //           // onClick: () => {},
    //         });
    //       });
    //     } catch (e) {
    //       console.log(e);
    //     }
    //   }
    // };
    // init();

    return () => window.removeEventListener('resize', handleResize, true);
  }, []);

  useEffect(() => {
    if (window.innerWidth < 1025 && !isCollapsed) {
      set_isCollapsed(true);
    }
  }, [location]);
  useEffect(() => {
    if (globalFacade.pathname && globalFacade.pathname !== location.pathname) {
      globalFacade.setPathname('');
      navigate(globalFacade.pathname);
    }
  }, [globalFacade.pathname]);

  const Header = ({ isCollapsed, isDesktop }: { isCollapsed: boolean; isDesktop: boolean }) => (
    <header
      className={classNames(
        'bg-blue-50 w-full header h-20 transition-all duration-300 ease-in-out sticky top-0 block z-10',
        {
          'pl-60': !isCollapsed && isDesktop,
          'pl-32': isCollapsed && isDesktop,
          'pl-28': !isDesktop,
        },
      )}
    >
      <div className="flex items-center justify-end sm:justify-between px-5 h-20">
        <div>
          <h1 className={'text-xl font-bold hidden sm:block'}>{t('pages.' + title)}</h1>

          <div className={'hidden sm:flex items-center text-xs mt-0.5'}>
            {breadcrumbs?.map((item, i) => (
              <Fragment key={i}>
                <span className={classNames({ 'text-gray-400': i < breadcrumbs.length - 1 })}>{t(item.title)}</span>{' '}
                {i < breadcrumbs.length - 1 && <Arrow className={'w-2.5 h-2.5 mx-1.5'} />}
              </Fragment>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-5">
          <label>
            <Select
              aria-hidden="true"
              value={globalFacade?.language}
              onChange={(e: string) => globalFacade.setLanguage(e)}
            >
              <Select.Option value="en">
                <img
                  width={'16'}
                  height={'16'}
                  src="/assets/svg/en.svg"
                  alt="US"
                  className="mr-1 w-4 inline-block relative -top-0.5"
                />{' '}
                {t('routes.admin.Layout.English')}
              </Select.Option>
              <Select.Option value="vn">
                <img
                  width={'16'}
                  height={'16'}
                  src="/assets/svg/vn.svg"
                  alt="VN"
                  className="mr-1 w-4 inline-block relative -top-0.5"
                />{' '}
                {t('routes.admin.Layout.Vietnam')}
              </Select.Option>
            </Select>
          </label>

          <Dropdown
            trigger={['hover', 'click']}
            menu={{
              items: [
                {
                  key: '1',
                  label: (
                    <div onClick={() => navigate(`/${lang}${routerLinks('MyProfile')}`, { replace: true })}>
                      {t('routes.admin.Layout.My Profile')}
                    </div>
                  ),
                },
                {
                  key: '2',
                  label: (
                    <div onClick={() => navigate(`/${lang}${routerLinks('Login')}`, { replace: true })}>
                      {t('routes.admin.Layout.Sign out')}
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <section className="flex items-center image-shine" id={'dropdown-profile'}>
              <div className="text-right leading-none mr-3 hidden sm:block">
                <div className="font-bold text-black text-lg leading-snug mb-0.5">{user?.name}</div>
                <div className="text-gray-600">{user?.email}</div>
              </div>
              <Avatar src="/assets/images/avatar.jpeg" size={10} />
            </section>
          </Dropdown>
        </div>
      </div>
    </header>
  );
  return (
    <main>
      <div className="leading-5 leading-10" />
      <Header isCollapsed={isCollapsed} isDesktop={isDesktop} />
      <div
        className={classNames(
          'flex items-center justify-between text-gray-800 hover:text-gray-600 h-20 fixed top-0 left-0 px-5 font-bold transition-all duration-300 ease-in-out z-10',
          {
            'w-60': !isCollapsed && isDesktop,
            'w-20': isCollapsed,
            'bg-blue-100': isDesktop,
            'bg-blue-50': !isDesktop,
          },
        )}
      >
        <div>
          <a href="/" className="flex items-center">
            <Logo className={'w-10 h-10 mr-3'} />
            <div
              id={'name-application'}
              className={classNames(
                'transition-all duration-300 ease-in-out absolute left-16 overflow-ellipsis overflow-hidden ml-2',
                {
                  'opacity-100 text-lg': !isCollapsed && isDesktop,
                  'opacity-0 text-[0px] invisible': isCollapsed || !isDesktop,
                },
              )}
            >
              Admin
            </div>
          </a>
        </div>

        <div
          className={classNames('hamburger', {
            'is-active': (isCollapsed && isDesktop) || (!isCollapsed && !isDesktop),
          })}
          onClick={() => set_isCollapsed(!isCollapsed)}
        >
          <span className="line" />
          <span className="line" />
          <span className="line" />
        </div>
      </div>
      {!isDesktop && (
        <div
          className={classNames('fixed h-full bg-black transition-all duration-500 ease-in-out w-full z-20', {
            'opacity-70 left-0': !isCollapsed,
            'opacity-0 -left-full': isCollapsed,
          })}
          onClick={() => set_isCollapsed(true)}
        />
      )}
      <div
        onMouseEnter={() => {
          const offsetWidth = document.body.offsetWidth;
          document.body.style.overflowY = 'hidden';
          document.body.style.paddingRight = document.body.offsetWidth - offsetWidth + 'px';
        }}
        onMouseLeave={() => {
          document.body.style.overflowY = 'auto';
          document.body.style.paddingRight = '';
        }}
        className={classNames('fixed z-20 top-20 left-0 h-screen bg-blue-100 transition-all duration-300 ease-in-out', {
          'w-60': !isCollapsed,
          'w-20': isCollapsed,
          '!-left-20': isCollapsed && !isDesktop,
        })}
      >
        <Menu isCollapsed={isCollapsed} permission={user?.role?.permissions} />
      </div>

      <section
        id={'main'}
        className={classNames('px-5 transition-all duration-300 ease-in-out z-10 h-[calc(100vh-5rem)] relative', {
          'ml-60': !isCollapsed && isDesktop,
          'ml-20': isCollapsed && isDesktop,
        })}
      >
        <div className={'h-[calc(100vh-8rem)] overflow-y-auto lg:overflow-x-hidden'}>
          <h1 className={'text-xl font-bold block sm:hidden'}>{t('pages.' + title)}</h1>
          <div className={'flex items-center text-xs mt-0.5 pb-5 sm:hidden'}>
            {breadcrumbs?.map((item, i) => (
              <Fragment key={i}>
                <span className={classNames({ 'text-gray-400': i < breadcrumbs.length - 1 })}>{t(item.title)}</span>{' '}
                {i < breadcrumbs.length - 1 && <Arrow className={'w-2.5 h-2.5 mx-1.5'} />}
              </Fragment>
            ))}
          </div>
          {children}
        </div>

        <footer className="text-center bg-blue-50 pt-2.5 w-full">
          {t('layout.footer', { year: new Date().getFullYear() })}
        </footer>
      </section>
      <div className="hidden h-7 w-7 leading-7" />
    </main>
  );
};
export default Layout;
