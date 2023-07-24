import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cart, Buffer, Store, User, Shopping } from '@svgs';

const Layout = () => [
  {
    icon: <Buffer className="icon-menu" />,
    name: 'Dashboard',
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
    icon: <Shopping className="icon-menu" />,
    name: 'Merchandise Management',
    child: [
      {
        name: 'Store',
      },
      {
        name: 'Store',
      },
      {
        name: 'Store',
      }
    ]
  },
];

export default Layout;
