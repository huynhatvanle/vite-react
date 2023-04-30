import { Collapse, Popover } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import classNames from 'classnames';
import { useNavigate, useLocation } from 'react-router';
import { useTranslation } from 'react-i18next';

import { routerLinks } from '@utils';
import listMenu from '../menus';
import './index.less';
import { v4 } from 'uuid';

const Layout = ({ isCollapsed = false, permission = [] }: { isCollapsed: boolean; permission?: string[] }) => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const refMenu = useRef<HTMLUListElement>(null);
  const clearTime = useRef<NodeJS.Timeout>();

  const [menuActive, set_menuActive] = useState<string[]>();
  useEffect(() => {
    clearTimeout(clearTime.current);
    let linkActive = '';
    listMenu.forEach((item) => {
      if (!linkActive && !!item.child && location.pathname.indexOf(routerLinks(item.name)) > -1) {
        linkActive = routerLinks(item.name);
      }
    });
    clearTime.current = setTimeout(() => set_menuActive([linkActive]), 200);
  }, [location.pathname]);

  useEffect(() => {
    if (isCollapsed) {
      refMenu!.current!.scrollTop = 0;
    }
  }, [isCollapsed]);

  const subMenu = (child: { name: string; permission: string }[]) => (
    <ul>
      {child
        .filter((subItem) => !subItem.permission || permission?.includes(subItem.permission))
        .map((subItem, index: number) => (
          <li
            key={index + v4()}
            className={classNames('child-item py-2 cursor-pointer', {
              'bg-white text-blue-600 !fill-blue-600': location.pathname.indexOf(routerLinks(subItem.name)) > -1,
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
        listMenu
          .filter((item) => {
            return (
              !item.child ||
              item.child.filter((subItem: any) => !subItem.permission || permission?.includes(subItem.permission))
                .length > 0
            );
          })
          .map((item, index) => {
            if (!item.child) {
              return (
                <li
                  className={classNames('flex items-center h-11 m-3 px-2', {
                    'bg-white text-blue-600 !fill-blue-600 rounded-2xl': location.pathname === routerLinks(item.name),
                    'fill-gray-600': location.pathname !== routerLinks(item.name),
                    'justify-center': isCollapsed,
                  })}
                  onClick={() => navigate(routerLinks(item.name))}
                  key={index}
                >
                  {item.icon}
                  <span
                    className={classNames('ml-2.5 transition-all duration-300 ease-in-out font-bold', {
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
                <Popover key={index} placement="rightTop" trigger={'hover'} content={subMenu(item.child)}>
                  <li className="flex items-center justify-center h-11 m-3 px-2 fill-gray-600 ">
                    <div className={classNames({ 'ml-1': !isCollapsed })}>{item.icon}</div>
                  </li>
                </Popover>
              ) : (
                <li className="my-3" key={index}>
                  <Collapse
                    accordion
                    bordered={false}
                    className={classNames('bg-blue-100', {
                      'active-menu': location.pathname.indexOf(routerLinks(item.name)) > -1,
                    })}
                    defaultActiveKey={menuActive}
                  >
                    <Collapse.Panel
                      key={routerLinks(item.name)}
                      showArrow={!isCollapsed}
                      header={
                        <div
                          className={classNames('flex items-center text-gray-600 fill-gray-600  ', {
                            'justify-center ': isCollapsed,
                          })}
                        >
                          <div className={classNames({ 'ml-1': !isCollapsed })}>{item.icon}</div>
                          <span
                            className={classNames('pl-2.5 transition-all duration-300 ease-in-out font-bold', {
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
