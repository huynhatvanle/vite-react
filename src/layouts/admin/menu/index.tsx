import { Collapse, Popover } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { routerLinks } from '@utils';
import listMenu from '../menus'
import './index.less';
import { v4 } from 'uuid';

const Layout = ({ isCollapsed = false, permission = [] }: any) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const refMenu = useRef<any>();
  const clearTime = useRef<NodeJS.Timeout>();

  const [menuActive, set_menuActive] = useState<any>();
  useEffect(() => {
    clearTimeout(clearTime.current);
    let linkActive = '';
    listMenu().forEach((item: any) => {
      if (!linkActive && !!item.child && location.pathname.indexOf(routerLinks(item.name)) > -1) {
        linkActive = routerLinks(item.name);
      }
    });
    clearTime.current = setTimeout(() => set_menuActive([linkActive]), 200);
  }, [location.pathname]);

  useEffect(() => {
    if (isCollapsed) {
      refMenu.current.scrollTop = 0;
    }
  }, [isCollapsed]);

  const subMenu = (child: any[]) => (
    <ul>
      {child
        .filter((subItem: any) => !subItem.permission || permission?.includes(subItem.permission))
        .map((subItem: any, index: number) => (
          <li
            key={index + v4()}
            className={classNames('child-item py-2 cursor-pointer rounded-2xl text-gray-300 font-medium text-base', {
              'bg-teal-700 text-white !fill-gray-300': location.pathname.indexOf(routerLinks(subItem.name)) > -1,
            })}
            onClick={() => navigate(routerLinks(subItem.name))}
          >
            {t(`titles.${subItem.name}`)}
          </li>
        ))}
    </ul>
  );

  const subMenu1 = (child: any[]) => (
    <ul className='px-1 mx-2'>
      {child
        .filter((subItem: any) => !subItem.permission || permission?.includes(subItem.permission))
        .map((subItem: any, index: number) => (
          <li
            key={index + v4()}
            className={classNames('child-item py-2 px-3 cursor-pointer rounded-2xl text-black font-medium text-base', {
              'bg-teal-700 text-white !fill-gray-300 justify-center flex': location.pathname.indexOf(routerLinks(subItem.name)) > -1,
            })}
            onClick={() => navigate(routerLinks(subItem.name))}
          >
            {t(`titles.${subItem.name}`)}
          </li>
        ))}
    </ul>
  );

  return (
    <ul className="menu relative h-[calc(100vh-5rem)]" id={'menu-sidebar'} ref={refMenu}>
      {!!menuActive &&
        listMenu()
          .filter((item: any) => {
            if (!item.permission || permission?.includes(item.permission)) {
              return (
                !item.child ||
                item.child.filter((subItem: any) => !subItem.permission || permission?.includes(subItem.permission))
                  .length > 0
              );
            }
            return false;
          })
          .map((item: any, index: number) => {
            if (!item.child) {
              return (
                <li
                  className={classNames('flex items-center text-gray-300 h-11 m-3 px-2 relative', {
                    'bg-teal-700 text-white !fill-gray-300 rounded-2xl opacity-100': location.pathname === routerLinks(item.name),
                    'fill-gray-300': location.pathname !== routerLinks(item.name),
                    'justify-center': isCollapsed,
                  })}
                  onClick={() => navigate(routerLinks(item.name))}
                  key={index}
                >
                  {/* <img src={item.icon} className='h-8  w-8 block text-slate-700 fill-red-700'/> */}
                  {/* {item.icon} */}
                  <div className={classNames({'absolute': isCollapsed })}>{item.icon}</div>
                  <span
                    className={classNames('ml-2.5 transition-all duration-300 ease-in-out font-medium text-base h-8', {
                      'opacity-100': !isCollapsed,
                      'opacity-0 text-[0] ml-0': isCollapsed,
                    })}
                  >
                    {t(`titles.${item.name}`)}
                  </span>
                </li>
              );
            } else {
              return isCollapsed ? (
                <Popover key={index} placement="rightTop" trigger={'hover'} content={subMenu1(item.child)} >
                  <li className="flex items-center justify-center h-11 m-3 px-2 text-gray-300 fill-gray-300 ">
                    {/* <img src={item.icon} className={classNames('h-8  w-8 block !fill-red-700', { 'ml-1': !isCollapsed})}/> */}
                    <div className={classNames({ 'ml-1': !isCollapsed })}>{item.icon}</div>
                  </li>
                </Popover>
              ) : (
                <li className="my-3" key={index}>
                  <Collapse
                    accordion
                    bordered={false}
                    className={classNames('bg-teal-900', {
                      'active-menu': location.pathname.indexOf(routerLinks(item.name)) > -1,
                    })}
                    defaultActiveKey={menuActive}
                  >
                    <Collapse.Panel
                      key={routerLinks(item.name)}
                      showArrow={!isCollapsed}
                      header={
                        <div
                          className={classNames('flex items-center text-gray-300 fill-gray-300  ', {
                            'justify-center ': isCollapsed,
                          })}
                        >
                          {/* <img src={item.icon} className={classNames('h-8 w-8 block !fill-red-700', { 'ml-1': !isCollapsed})}/> */}
                          <div className={classNames({ 'ml-1': !isCollapsed })}>{item.icon}</div>
                          <span
                            className={classNames('pl-2.5 transition-all duration-300 ease-in-out font-medium text-base text-gray-300', {
                              'opacity-100': !isCollapsed,
                              'opacity-0 text-[0]': isCollapsed,
                            })}
                          >
                            {t(`titles.${item.name}`)}
                          </span>
                        </div>
                      }
                    >
                      {subMenu(item.child)}
                    </Collapse.Panel>
                  </Collapse>
                </li>
              );
            }
          })}
    </ul>
  );
};
export default Layout;
