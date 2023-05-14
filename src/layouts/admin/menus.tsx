import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Chart, Cog, User } from '@svgs';

const Layout = [
  {
    icon: <Chart className="h-8 w-8" />,
    name: 'Dashboard',
  },
  {
    icon: <User className="h-8 w-8" />,
    name: 'User',
    child: [
      {
        name: 'User/List',
        permission: keyRole.P_USER_LISTED,
      },
      {
        name: 'User/Add',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
  {
    icon: <Cog className="h-8 w-8" />,
    name: 'Setting',
    child: [
      {
        name: 'Code',
        permission: keyRole.P_CODE_LISTED,
      },
      {
        name: 'Data',
        permission: keyRole.P_DATA_LISTED,
      },
    ],
  },
];

export default Layout;
