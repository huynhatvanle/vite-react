import React, { PropsWithChildren, useEffect } from 'react';
import { Select } from 'antd';
import { useTranslation } from 'react-i18next';

import { GlobalFacade } from '@store';
import { Facebook, Twitter, Linkedin, Logo } from '@svgs';

import './index.less';
import { useNavigate } from 'react-router';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const globalFacade = GlobalFacade();
  const navigate = useNavigate();

  useEffect(() => {
    globalFacade.logout();
  }, []);
  useEffect(() => {
    if (globalFacade.pathname && globalFacade.pathname !== location.pathname) {
      globalFacade.setPathname('');
      navigate(globalFacade.pathname);
    }
  }, [globalFacade.pathname]);
  return (
    <div className="layout-auth bg-cover bg-center p-20 relative z-10">
      <div className="container mx-auto block lg:flex bg-white rounded-xl overflow-hidden">
        <div className="w-full lg:w-3/5 p-10 into relative z-10 overflow-hidden flex justify-between flex-col">
          <div className="mb-5">
            <h2 className="font-bold text-3xl -intro-x">
              <a href="/" className="flex items-center text-white hover:text-yellow-600">
                <Logo className={'w-14 h-14 mr-3 brightness-0 invert'} />
              </a>
            </h2>
          </div>
          <div className="">
            <h2 className="-intro-x font-bold text-3xl text-white mb-3">{t('routes.auth.login.Welcome')}</h2>
            <div className="-intro-x mb-4">
              <a
                href="/"
                className="bg-blue-300 bg-opacity-50 text-white rounded-md py-2 px-3 inline-block leading-none mr-2"
              >
                <Facebook className={'w-6 h-6'} />
              </a>
              <a
                href="/"
                className="bg-blue-300 bg-opacity-50 text-white rounded-md py-2 px-3 inline-block leading-none mr-2"
              >
                <Twitter className={'w-6 h-6'} />
              </a>
              <a
                href="/"
                className="bg-blue-300 bg-opacity-50 text-white rounded-md py-2 px-3 inline-block leading-none"
              >
                <Linkedin className={'w-6 h-6'} />
              </a>
            </div>
            <p className="-intro-x text-white">{t('layout.footer', { year: new Date().getFullYear() })}</p>
          </div>
        </div>
        <div className="w-full lg:w-2/5 p-10 flex justify-center flex-col">
          {children}
          <div className="intro-x text-center mt-5">
            <label>
              <Select
                aria-hidden="true"
                value={globalFacade.language}
                onChange={(e: string) => globalFacade.setLanguage(e)}
              >
                <Select.Option value="en">
                  <img
                    width={'16'}
                    height={'16'}
                    src="/assets/svg/en.svg"
                    alt="EN"
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default Layout;
