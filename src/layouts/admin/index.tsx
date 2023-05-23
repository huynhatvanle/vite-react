import React, { PropsWithChildren, useEffect, useState } from 'react';
import { Dropdown, Select } from 'antd';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router';
import classNames from 'classnames';
import { useLocation } from 'react-router-dom';
// import { initializeApp } from 'firebase/app';
// import { getMessaging, isSupported, getToken, onMessage } from 'firebase/messaging';
import { routerLinks } from '@utils';
// import { Avatar } from '@components/avatar';
// import { GlobalFacade } from '@reducers';
import { Avatar } from '@core/avatar';
import { GlobalFacade } from '@store';
import Menu1 from './menu';
// import { firebaseConfig } from 'variable';
import './index.less';
import { Chevronleft, LeftArrow, Logo, RightArrow, Menu, ArrowBack, User1, Key, Out, User, UserProfile } from '@svgs';
import Logo1 from '../../assets/images/logo.png';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const { user, title } = globalFacade;

  const navigate = useNavigate();
  const location = useLocation();

  const [isCollapsed, set_isCollapsed] = useState(window.innerWidth < 1025);
  const [isDesktop, set_isDesktop] = useState(window.innerWidth > 640);

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
      set_isDesktop(window.innerWidth > 640);
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

  const Header = ({ isCollapsed, isDesktop }: any) => (
    <header
      className={classNames(
        'bg-white w-full header h-20 transition-all duration-300 ease-in-out top-0 block sm:bg-gray-100 z-20 fixed',
        {
          'pl-64': !isCollapsed && isDesktop,
          'pl-32': isCollapsed && isDesktop,
          'pl-28': !isDesktop,
        },
      )}
    >
      <div className="flex items-center justify-end sm:justify-between px-5 h-20">
        <div className="flex items-center gap-5 absolute right-6">
          <Select value={globalFacade?.language} onChange={(e: 'vn' | 'en') => globalFacade.setLanguage(e)}>
            <Select.Option value="en">
              <img src="/assets/svg/us.svg" alt="US" className="mr-1 w-4 inline-block relative -top-0.5" />{' '}
              {t('routes.admin.Layout.English')}
            </Select.Option>
            <Select.Option value="vn">
              <img src="/assets/svg/vn.svg" alt="VN" className="mr-1 w-4 inline-block relative -top-0.5" />{' '}
              {t('routes.admin.Layout.Vietnam')}
            </Select.Option>
          </Select>
          <Dropdown
            trigger={['click']}
            menu={{
              items: [
                {
                  key: '0',
                  className: 'hover:!bg-white !border-b-slate-300 border-b !rounded-none',
                  label: (
                    <div className='flex'>
                      <Avatar src={user?.profileImage} size={8} />
                      <div className="text-left leading-none mr-3 hidden sm:block pl-2">
                        <div className="font-semibold text-black text-sm leading-snug mb-0.5">{user?.name}</div>
                        <div className="text-gray-500 text-[10px]">{user?.email}</div>
                      </div>
                    </div>
                  ),
                },
                {
                  key: '1',
                  className: 'h-11',
                  label: (
                    <div className='flex'>
                      <div className='flex items-center'>
                        <UserProfile className='w-6 h-6 pr-2 text-black' />
                      </div>
                      <div onClick={() => navigate(routerLinks('MyProfile'), { replace: true })}>
                        {t('routes.admin.Layout.My Profile')}
                      </div>
                    </div>
                  ),
                },
                {
                  key: '2',
                  className: 'h-11 !border-b-slate-300 border-b !rounded-none',
                  label: (
                    <div className='flex'>
                      <div className='flex items-center'>
                        <Key className='w-6 h-6 pr-2 text-black' />
                      </div>
                      <div onClick={() => navigate(routerLinks('MyProfile'), { replace: true })}>
                        {t('routes.admin.Layout.Change Password')}
                      </div>
                    </div>
                  ),
                },
                {
                  key: '3',
                  className: 'h-11',
                  label: (
                    <div className='flex'>
                      <div className='flex items-center'>
                        <Out className='w-6 h-6 pr-2 text-black' />
                      </div>
                      <div onClick={() => navigate(routerLinks('Login'), { replace: true })}>
                        {t('routes.admin.Layout.Sign out')}
                      </div>
                    </div>
                  ),
                },
              ],
            }}
            placement="bottomRight"
          >
            <section className="flex items-center" id={'dropdown-profile'}>
              {/* <div className="text-right leading-none mr-3 hidden sm:block">
                <div className="font-bold text-black text-lg leading-snug mb-0.5">{user?.name}</div>
                <div className="text-gray-500">{user?.email}</div>
              </div> */}
              <Avatar src={user?.profileImage} size={10} />
            </section>
          </Dropdown>
        </div>
      </div>
    </header>
  );
  return (
    <main>
      <div className="leading-5 leading-10" />
      <div className='h-20 relative'>
        <div className='absolute top-0 left-0 right-0'>
          <Header isCollapsed={isCollapsed} isDesktop={isDesktop} />
        </div>
      </div>
      <div
        className={classNames(
          'flex items-center justify-between bg-white sm:bg-teal-900 text-gray-800 hover:text-gray-500 h-20 fixed top-0 left-0 px-5 font-bold transition-all duration-300 ease-in-out rounded-tr-3xl z-20',
          {
            'w-64': !isCollapsed && isDesktop,
            'w-16': isCollapsed && isDesktop,
            'bg-teal-900': isDesktop,
            'bg-gray-100': !isDesktop,
          },
        )}
      >

        <div className='flex'>
          <div
            className={classNames('max-md:mr-3', {
              'is-active': (isCollapsed && isDesktop) || (!isCollapsed && !isDesktop),
            })}
            onClick={() => { set_isCollapsed(!isCollapsed), set_isDesktop(isDesktop) }}
          >
            {(isCollapsed && !isDesktop) && <Menu className="w-9 text-black select-none" />}
            {(!isCollapsed && !isDesktop) && <ArrowBack className="w-9 text-black select-none" />}

            {/* <span className="line" />
              <span className="line" />
              <span className="line" /> */}
          </div>
          <a href="/dashboard" className="flex items-center">
            {/* <Logo className={classNames('w-10 h-10 mr-3',
                {
                  'opacity-100 text-lg': !isCollapsed && isDesktop || isCollapsed && !isDesktop,
                  'opacity-0 text-[0px] hidden': isCollapsed && isDesktop,
                },)} /> */}

            <img src={Logo1} className={classNames('w-12 mr-3 rounded ',
              {
                'opacity-100 text-lg w-12': !isCollapsed && isDesktop || isCollapsed && !isDesktop,
                'opacity-0 text-[0px] hidden': isCollapsed && isDesktop,
                // 'opacity-100 text-xl': isCollapsed && !isDesktop,
              },)}></img>
            <div
              id={'name-application'}
              className={classNames(
                'transition-all duration-300 ease-in-out absolute text-white left-16 overflow-ellipsis overflow-hidden ml-5',
                {
                  'opacity-100 text-2xl': !isCollapsed && isDesktop,
                  'opacity-0 text-[0px] hidden': isCollapsed || !isDesktop,
                },
              )}
            >
              BALANCE
            </div>
          </a>
        </div>
        <div
          className={classNames('hamburger', {
            'is-active': (isCollapsed && isDesktop) || (!isCollapsed && !isDesktop),
          })}
          onClick={() => { set_isCollapsed(!isCollapsed), set_isDesktop(isDesktop) }}
        >
          {(!isCollapsed && isDesktop) && <LeftArrow className="w-9 text-white" />}
          {(isCollapsed && isDesktop) && <RightArrow className="w-9 text-white" />}

        </div>
      </div>
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
        className={classNames('fixed z-20 top-20 left-0 h-screen bg-teal-900 transition-all duration-300 ease-in-out', {
          'w-64': !isCollapsed,
          'w-16': isCollapsed,
          '!-left-20': isCollapsed && !isDesktop,
        })}
      >
        <Menu1 isCollapsed={isCollapsed} />
        {/* permission={user?.role?.permissions} */}
      </div>
      {!isCollapsed && !isDesktop && (
        <div className={'w-full h-full fixed bg-gray-100 opacity-50 z-[1]'} onClick={() => set_isCollapsed(true)} />
      )}
      <section
        id={'main'}
        className={classNames('px-5 min-h-screen transition-all duration-300 ease-in-out z-10  relative', {
          'ml-64': !isCollapsed && isDesktop,
          'ml-16': isCollapsed && isDesktop,
        })}
      >
        <div className={''}>
          {/* <h1 className={'text-xl font-bold block sm:hidden pb-5'}>{t('pages.' + title)}</h1> */}
          {title !== 'Dashboard' && (
            <h1 className={'text-2xl text-teal-900 font-bold block pb-5'}>{t('titles.' + title)}</h1>)}
          {children}
        </div>
      </section>
      <footer className={classNames("text-left pt-5 z-50  mt-10  bg-white p-4 !mr-0", {
        'ml-64': !isCollapsed && isDesktop,
        'ml-16': isCollapsed && isDesktop,
      })}>
        {t('layout.footer', { year: new Date().getFullYear() })}
      </footer>
      <div className="hidden h-7 w-7 leading-7" />
    </main>
  );
};
export default Layout;
