import React from 'react';

import { keyRole } from '@utils';
import './index.less';
import { Cog, User, Coffee, UserSolid } from '@svgs';

const Layout = [
  {
    icon: <User className="icon-menu" />,
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
    icon: <Coffee className="icon-menu" />,
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
    icon: <UserSolid className="icon-menu" />,
    name: 'Team',
    permission: keyRole.P_USER_TEAM_LISTED,
  },
  {
    icon: <Cog className="icon-menu" />,
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
