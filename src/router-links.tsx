const Util = (name: string, type?: string) => {
  const array: any = {
    Login: '/auth/login',
    MyProfile: '/my-profile',
    Dashboard: '/',
    Code: '/code',
    User: '/user',
    Data: '/data',
    Page: '/page',
  }; // 💬 generate link to here

  const apis: any = {
    Auth: '/auth',
    CodeType: '/code-type',
    Code: '/code',
    UserRole: '/user-role',
    User: '/user',
    DataType: '/data-type',
    Data: '/data',
    Page: '/page',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
