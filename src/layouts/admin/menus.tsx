import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cart, Buffer, Store, User, Shopping, Revenue } from '@svgs';

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
    ],
  },
];

export default Layout;
