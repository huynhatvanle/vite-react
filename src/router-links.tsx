const Util = (name: string, type?: string) => {
  const array: {
    [selector: string]: string;
  } = {
    Login: '/login',
    ForgetPassword: '/forgot-password',
    VerifyForotPassword: '/verify-forgot-password',
    SetPassword: '/set-password',
    ResetPassword: '/reset-password',
    MyProfile: '/my-profile',
    Dashboard: '/dashboard',

    User: '/user',
    'User/List': '/user/list',
    'User/Add': '/user/add',
    'User/Edit': '/user/edit',

    Supplier: '/supplier',
    'Supplier/Add': '/supplier/add',
    'Supplier/Edit': '/supplier/edit',

    Store: '/store-managerment',
    'store-managerment/create': '/store-managerment/create',
    'store-managerment/edit': '/store-managerment/edit',
    'Store/branch/edit': '/store/branch/edit',

    Category: '/category',

    Product: '/product',
  }; // 💬 generate link to here

  //   import { routerLinks } from './router-links';

  // const link = routerLinks('MyProfile') + '?tab=1';

  const apis: {
    [selector: string]: string;
  } = {
    'User-admin': '/user-admin',
    Auth: '/auth',
    UserRole: '/mt-role',
    User: '/user-admin',
    Organization: '/sub-organization',
    Province: '/province',
    District: '/district',
    Ward: '/ward',
    Category: '/category',
    Product: '/product',
    Orders: '/orders',
    SubStore: '/sub-organization/sub-org-in-store',
    ConnectSupplier: '/store-connect-supplier/supplier',
    InventoryProduct: '/inventory-product',
    Suborgcommision: '/sub-org-commision',
    Invoicekiotviet: '/invoice-kiot-viet/invoice',
    InventoryOrders: '/inventory-order/revenue-list',
    SupplierStore: '/sub-organization/store/all-supplier-store',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
export default Util;
