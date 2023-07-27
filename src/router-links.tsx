export const routerLinks = (name: string, type?: string) => {
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
    'Contract-View': '/contract-view',
    'Discount-Detail': '/discount-detail',
    'Merchandise-Managerment/Product/Detail': '/merchandise-managerment/product/detail',

    Store: '/store-managerment',
    'store-managerment/create': '/store-managerment/create',
    'store-managerment/edit': '/store-managerment/edit',
    'Store/branch/edit': '/store/branch/edit',

    'store-managerment/branch-management/create': '/store-managerment/branch-management/create',
    'store-managerment/branch-management/edit': '/store-managerment/branch-management/edit',

    merchandise: '/merchandise-management',
    'merchandise-management/product': '/merchandise-management/product',

    Category: '/category',

    Product: '/product',
  }; // 💬 generate link to here

  const apis: {
    [selector: string]: string;
  } = {
    'User-admin': '/user-admin',
    Auth: '/auth',
    UserRole: '/mt-role',
    User: '/user-admin',
    Organization: '/sub-organization',
    Province: '/province',
    notApproved: '/product/list/not-approved',
    District: '/district',
    Ward: '/ward',
    Category: '/category',
    Product: '/product',
    Orders: '/orders',
    SubStore: '/sub-organization/sub-org-in-store',
    ConnectSupplier: '/store-connect-supplier/supplier',
    InventoryProduct: '/inventory-product',
    Suborgcommision: '/sub-org-commision',
    Invoicekiotviet: '/invoice-kiot-viet',
    InvoiceRevenue: '/invoice-kiot-viet/invoice',
    InventoryOrders: '/inventory-order/revenue-list',
    SupplierStore: '/sub-organization/store/all-supplier-store',
    Supplieradmin: '/sub-organization/admin/all-supplier',
    InventorySupplier: '/inventory-order/store-by-suppier',
    InventoryListProduct: '/inventory-order/revenue-list-product',
    documentsuborganiztion: '/document-sub-organiztion',
    suborgcommisionline: '/sub-org-commision-line',
  }; // 💬 generate api to here

  switch (type) {
    case 'api':
      return apis[name];
    default:
      return array[name];
  }
};
