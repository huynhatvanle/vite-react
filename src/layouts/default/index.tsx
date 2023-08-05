import React, { PropsWithChildren, useEffect, Fragment, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { Dropdown } from 'antd';
import { useNavigate } from 'react-router';

import { GlobalFacade } from '@store';

import './index.less';
import { Envelope, MapMarked, Phone, Facebook, Linkedin, Arrow } from '@svgs';
import SectionContact from '@layouts/default/contact';

const Layout = ({ children }: PropsWithChildren) => {
  const { t } = useTranslation();
  const { setLanguage, pathname, setPathname, language } = GlobalFacade();
  const [showMenu, set_showMenu] = useState(false);
  const data = [
    { title: 'Home', slug: '/' + language },
    {
      title: 'About',
      slug: '/' + language,
      children: [
        { title: 'About Tech', slug: '/' + language + '/tech' },
        { title: 'Our Core Team', slug: '/' + language + '/team' },
      ],
    },
  ];
  const menus: any = [];
  const navigate = useNavigate();

  const loop = (array: any[], returnArray: any[]) => {
    array.forEach((item: any) => {
      if (item && item?.translations) {
        const data = {
          ...item,
          ...item?.translations.filter((subItem: any) => subItem.language === localStorage.getItem('i18nextLng'))[0],
          children: [],
        };
        if (item.children) {
          loop(item.children, data.children);
        }
        returnArray.push(data);
      }
    });
  };
  loop(data, menus);

  useEffect(() => {
    if (!!pathname && pathname !== location.pathname) {
      setPathname('');
      navigate(pathname);
    }
  }, [pathname]);

  const handleScrollTo = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      window.scroll({
        top: element.offsetTop - 70,
        behavior: 'smooth',
      });
    }
    set_showMenu(false);
  };

  return (
    <Fragment>
      <div className="container px-6 mx-auto py-5 items-center justify-between hidden lg:flex">
        <div className="flex items-center">
          <Link to={'/'}>
            <img src="/assets/images/logo.svg" className="h-14" alt="logo" />
          </Link>
        </div>
        <div className="flex items-center">
          <div className="flex items-center pr-5 mr-5 border-r">
            <MapMarked className={'w-8 h-8 mr-3 text-blue-600'} />
            <div className="leading-5">
              <strong>{t('layout.header.Location')}</strong>
              <br />
              <span className="text-gray-600 text-sm">{t('layout.header.Address')}</span>
            </div>
          </div>

          <div className="flex items-center pr-5 mr-5 border-r">
            <Envelope className={'w-8 h-8 mr-3 text-blue-600'} />

            <div className="leading-5">
              <strong>{t('layout.header.Mail us')}</strong>
              <br />
              <a className="text-gray-600 text-sm" href="mailto:contact@ari.com.vn">
                contact@ari.com.vn
              </a>
            </div>
          </div>

          <div className="flex items-center">
            <Phone className={'w-8 h-8 mr-3 text-blue-600'} />

            <div className="leading-5">
              <strong>{t('layout.header.Call us')}</strong>
              <br />
              <a className="text-gray-600 text-sm" href="tel:(+84)363672405">
                {' '}
                (+84) 098 7765926
              </a>
            </div>
          </div>
        </div>
      </div>
      <header className="w-full sticky top-0 left-0 z-30">
        <div className="max-w-screen-2xl mx-auto py-3.5 pl-5 pr-3.5 flex items-center justify-between bg-blue-500">
          <div className="text-center hidden lg:block">
            <div className="flex gap-10 font-bold items-center">
              {data.map((item: any, index: number) => (
                <Fragment key={index}>
                  <Dropdown
                    disabled={!item.children?.length}
                    destroyPopupOnHide={true}
                    menu={{
                      items: item.children
                        ? item.children.map((sub: any, subIndex: number) => ({
                            key: subIndex,
                            label: (
                              <Link to={sub.slug} key={subIndex}>
                                {sub.title}
                              </Link>
                            ),
                          }))
                        : [],
                    }}
                  >
                    <span
                      className="text-white font-bold hover:text-white cursor-pointer"
                      onClick={() => navigate(item.slug)}
                    >
                      {t('layout.header.' + item.title)}
                    </span>
                  </Dropdown>
                </Fragment>
              ))}
              <span
                className="text-white font-bold hover:text-white cursor-pointer"
                onClick={() => navigate(language === 'vn' ? '/vn/tin-tuc' : '/en/news')}
              >
                {t('layout.header.News')}
              </span>
              <span
                className="text-white font-bold hover:text-white cursor-pointer"
                onClick={() => navigate(language === 'vn' ? '/vn/du-an' : '/en/projects')}
              >
                {t('layout.header.Projects')}
              </span>
              <span
                className="text-white font-bold hover:text-white cursor-pointer"
                onClick={() => handleScrollTo('form-contact-us')}
              >
                {t('layout.header.Contact Us')}
              </span>
            </div>
          </div>
          <div className="flex items-center lg:hidden">
            <img src="/assets/images/logo.svg" className="h-12" alt="logo" />
          </div>
          <div className="flex items-center">
            <Dropdown
              destroyPopupOnHide={true}
              menu={{
                items: [
                  {
                    key: '1',
                    label: (
                      <div onClick={() => setLanguage(language === 'vn' ? 'en' : 'vn')}>
                        {t(`layout.header.${language === 'vn' ? 'English' : 'Vietnamese'}`)}
                      </div>
                    ),
                  },
                ],
              }}
            >
              <div className="lg:mr-4 lg:border-r lg:pr-4">
                <img src={`/assets/svg/${language}.svg`} alt="" className="w-6" />
              </div>
            </Dropdown>
            <div className="hidden lg:flex items-center gap-2">
              <a
                className="text-white inline-flex"
                href="https://www.facebook.com/ARI-Technology-103059672364812"
                target="_blank"
                rel="noreferrer"
              >
                <Facebook className={'w-5 h-5 inline'} />
              </a>
              <a
                className="text-white inline-flex"
                href="https://www.linkedin.com/company/aritechnology/"
                target="_blank"
                rel="noreferrer"
              >
                <Linkedin className={'w-5 h-5 inline'} />
              </a>
            </div>
          </div>
        </div>
      </header>
      <span
        className={classNames('hamburger lg:!hidden fixed z-50 right-6 top-6', { 'body-menu-opened': showMenu })}
        onClick={() => set_showMenu(!showMenu)}
      >
        <span className="top-bun"></span>
        <span className="meat"></span>
        <span className="bottom-bun"></span>
      </span>
      <div
        className={classNames('fixed top-0 h-full bg-black transition-all duration-500 ease-in-out w-full z-30', {
          'opacity-70 right-0': showMenu,
          'opacity-0 -right-full': !showMenu,
        })}
        onClick={() => set_showMenu(false)}
      ></div>
      <div
        className={classNames(
          'w-80 bg-blue-500 h-screen z-40 fixed top-0 p-5 text-white transition-all duration-500 ease-in-out flex justify-between flex-col',
          { 'right-0 ': showMenu, '-right-80': !showMenu },
        )}
      >
        <div
          className={classNames('transition-all duration-1000 ease-in-out relative', {
            'top-0 opacity-100': showMenu,
            'top-10 opacity-0': !showMenu,
          })}
        >
          <div className="font-medium flex flex-col text-white mt-10">
            {menus.map((item: any, index: number) => (
              <Fragment key={index}>
                <Link
                  className={classNames('text-white border-white py-3 flex justify-between', {
                    'border-b ': !item.child,
                  })}
                  to={'/' + item.slug}
                  onClick={() => set_showMenu(false)}
                >
                  {item.title}
                  {!item.child && <Arrow className={'w-4 h-4 relative'} />}
                </Link>
                {!!item.children.length &&
                  item.children.map((sub: any, subIndex: number) => (
                    <Link
                      to={sub.slug}
                      key={subIndex}
                      className="text-white border-white py-3 flex justify-between pl-5"
                      onClick={() => set_showMenu(false)}
                    >
                      {sub.title}
                      <Arrow className={'w-4 h-4 relative'} />
                    </Link>
                  ))}
              </Fragment>
            ))}
            <a
              className="text-white border-white py-3 flex justify-between"
              onClick={() => handleScrollTo('form-contact-us')}
            >
              {t('layout.header.Contact Us')}
              <Arrow className={'w-4 h-4 relative'} />
            </a>
          </div>
        </div>

        <div
          className={classNames('transition-all duration-1000 ease-in-out relative', {
            'top-0 opacity-100': showMenu,
            '-top-10 opacity-0': !showMenu,
          })}
        >
          <div className="flex items-center mt-5">
            <MapMarked className={'w-12 h-8 mr-3'} />
            <div className="leading-5">
              <strong>{t('layout.header.Location')}</strong>
              <br />
              <span className="text-sm">{t('layout.header.Address')}</span>
            </div>
          </div>

          <div className="flex items-center mt-3 border-t border-white pt-3">
            <Envelope className={'w-8 h-8 mr-3'} />
            <div className="leading-5">
              <strong>{t('layout.header.Mail us')}</strong>
              <br />
              <a className="text-sm text-white" href="mailto:contact@ari.com.vn">
                contact@ari.com.vn
              </a>
            </div>
          </div>

          <div className="flex items-center mt-3 border-t border-white pt-3">
            <Phone className={'w-8 h-8 mr-3'} />
            <div className="leading-5">
              <strong>{t('layout.header.Call us')}</strong>
              <br />
              <a className="text-sm text-white" href="tel:(+84)363672405">
                {' '}
                (+84) 098 7765926
              </a>
            </div>
          </div>
        </div>
      </div>
      {children}
      <SectionContact />

      <footer className="text-white font-medium bg-gray-900 bg-[url('/assets/images/footer-shape.png')] bg-cover bg-[center_top_9rem] bg-no-repeat">
        <div className="container mx-auto px-6 py-28 leading-8">
          <div className="grid grid-cols-2 gap-16 lg:flex lg:justify-between">
            <div className={'lg:max-w-xs'}>
              <img src="/assets/images/logo.svg" className="h-12 brightness-0 invert mb-5" alt="logo" />
              <p>
                Tincidunt neque pretium lectus donec risus. Mauris mi tempor nunc orc leo consequat vitae erat gravida
                lobortis nec et sagittis.
              </p>
              <div className={'gap-4 flex mt-8'}>
                <a
                  className="text-white inline-flex bg-gray-700 p-3 rounded-md"
                  href="https://www.facebook.com/ARI-Technology-103059672364812"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Facebook className={'w-5 h-5 inline'} />
                </a>
                <a
                  className="text-white inline-flex bg-gray-700 p-3 rounded-md"
                  href="https://www.linkedin.com/company/aritechnology/"
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin className={'w-5 h-5 inline'} />
                </a>
              </div>
            </div>
            <div className={'lg:max-w-xs'}>
              <h3 className={'text-xl font-bold pb-7'}>Our Services</h3>
              <div className={'leading-10'}>
                <a className="text-white font-bold hover:text-white cursor-pointer block">
                  {t('Digital transformation')}
                </a>
                <a className="text-white font-bold hover:text-white cursor-pointer block">{t('R&D services')}</a>
                <a className="text-white font-bold hover:text-white cursor-pointer block">
                  {t('Outsourcing services')}
                </a>
                <a className="text-white font-bold hover:text-white cursor-pointer block">{t('Product development')}</a>
              </div>
            </div>
            <div className={'lg:max-w-xs'}>
              <h3 className={'text-xl font-bold pb-7'}>Usefull Links</h3>
              <div className={'leading-10'}>
                {data.map((item: any, index: number) => (
                  <a
                    key={index}
                    className="text-white font-bold hover:text-white cursor-pointer block"
                    onClick={() => navigate(item.slug)}
                  >
                    {t('layout.header.' + item.title)}
                  </a>
                ))}
                <a
                  className="text-white font-bold hover:text-white cursor-pointer block"
                  onClick={() => navigate(language === 'vn' ? '/vn/tin-tuc' : '/en/news')}
                >
                  {t('layout.header.News')}
                </a>
                <a
                  className="text-white font-bold hover:text-white cursor-pointer block"
                  onClick={() => navigate(language === 'vn' ? '/vn/du-an' : '/en/projects')}
                >
                  {t('layout.header.Projects')}
                </a>
                <a
                  className="text-white font-bold hover:text-white cursor-pointer block"
                  onClick={() => handleScrollTo('form-contact-us')}
                >
                  {t('layout.header.Contact Us')}
                </a>
              </div>
            </div>
            <div className={'lg:max-w-xs'}>
              <h3 className={'text-xl font-bold pb-8'}>Contact</h3>

              <div className={'flex flex-col gap-6'}>
                <div className="flex items-center">
                  <MapMarked className={'w-12 h-8 lg:mr-3 mr-0.5 text-white lg:ml-0 -ml-2'} />
                  <div className="leading-5">
                    <span className="text-sm">{t('layout.header.Address')}</span>
                  </div>
                </div>

                <div className="flex items-center ">
                  <Envelope className={'w-8 h-8 mr-3 text-white'} />
                  <div className="leading-5">
                    <a className="text-sm text-white" href="mailto:contact@ari.com.vn">
                      contact@ari.com.vn
                    </a>
                  </div>
                </div>

                <div className="flex items-center ">
                  <Phone className={'w-8 h-8 mr-3 text-white'} />
                  <div className="leading-5">
                    <a className="text-sm text-white" href="tel:(+84)363672405">
                      (+84) 098 7765926
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="py-8 text-center border-t border-gray-800">
          {t('layout.footer.copyright', { year: new Date().getFullYear() })}
        </div>
      </footer>
    </Fragment>
  );
};
export default Layout;