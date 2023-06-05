export const routerLinks = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/auth/login',
    ResetPassword: '/auth/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',
    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    Setting: '/setting',
    Data: '/setting/data',
    'Data/Add': '/setting/data/add',
    Code: '/setting/code',
    'Code/Add': '/setting/code/add',
    Page: '/setting/page',
    Team: '/team',
    'Team/Add': '/team/add',
    DayOff: '/dayoff',
    'DayOff/List': '/dayoff/list',
    'DayOff/Add': '/dayoff/add',
    'DayOff/Detail': '/dayoff/detail',
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    Auth: '/auth',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/user-role',
    User: '/user',
    DataType: '/data-type',
    Data: '/data',
    Page: '/page',
    UserTeam: '/user-team',
    DayOff: '/dayoff',
    UserManager: '/user',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
