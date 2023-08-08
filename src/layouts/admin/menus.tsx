import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cart, Buffer, Store, User, Shopping, Revenue, Link } from '@svgs';

const Layout = () => [
  {
    icon: <Buffer className="icon-menu" />,
    name: 'Dashboard',
  },
  {
    icon: <Shopping className="icon-menu" />,
    name: 'Merchandise-managerment',
    child: [
      {
        name: 'Tax',
      },
    ],
  },
  {
    icon: <Link className="icon-menu" />,
    name: 'connect-managerment',
    child: [
      {
        name: 'Connect',
      }
    ]
  },
  {
    icon: <User className="icon-menu" />,
    name: 'User/List',
  },
  {
    icon: <Cart className="icon-menu " />,
    name: 'Supplier',
  },
  {
    icon: <Store className="icon-menu" />,
    name: 'Store',
  },
  {
    icon: <Revenue className="icon-menu" />,
    name: 'revenue-management',
    child: [
      {
        name: 'revenue-management/store',
      },
      {
        name: 'revenue-management/supplier',
      },
      {
        name: 'revenue-management/discount',
      },
    ],
  },
];

export default Layout;
