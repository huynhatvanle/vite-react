import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cog, User, Coffee } from '@svgs';

const Layout = [
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
    icon: <Coffee className="h-8 w-8" />,
    name: 'DayOff',
    child: [
      {
        name: 'DayOff/List',
        permission: keyRole.P_DAYOFF_LISTED,
      },
      {
        name: 'DayOff/Add',
        permission: keyRole.P_DAYOFF_CREATE,
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
      {
        name: 'Page',
        permission: keyRole.P_PAGE_LISTED,
      },
      {
        name: 'Team',
        permission: keyRole.P_USER_TEAM_LISTED,
      },
    ],
  },
];

export default Layout;
