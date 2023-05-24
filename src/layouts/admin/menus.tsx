import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cart, Chart, Cog, Store, User } from '@svgs';

const Layout = () => [
  {
    icon: <Chart className="icon-menu" />,
    name: 'Dashboard',
  },
  {
    icon: <User className="icon-menu" />,
    name: 'User/List',
  },
  {
    icon: <Cart className="icon-menu" />,
    name: 'Supplier',
  },
  {
    icon: <Store className="icon-menu" />,
    name: 'Store',
  },
];

export default Layout;
