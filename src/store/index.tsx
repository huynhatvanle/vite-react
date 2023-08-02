import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { Action } from './action';
import { Slice, State } from './slice';
const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  });
};
const useAppDispatch = () => useDispatch<ReturnType<typeof setupStore>['dispatch']>();
const useTypedSelector: TypedUseSelectorHook<ReturnType<typeof rootReducer>> = useSelector;
export { setupStore, useAppDispatch, useTypedSelector, Action, Slice };
export type { State };

export * from './global';
export * from './user';
export * from './user/role';
export * from './store-management';
export * from './address/province';
export * from './address/district';
export * from './address/ward';
export * from './supplier';
export * from './category';
export * from './product';
export * from './store-management/sub-store';
export * from './store-connect-supplier';
export * from './order';
export * from './discount';
export * from './store-management/inventory-product';
export * from './store-management/invoice-kiot-viet';
export * from './supplier/inventory-order';
export * from './store-management/all-supplier-store';
export * from './supplier/inventory-supplier';
export * from './store-management/invoice-revenue';
export * from './supplier/inventory-product';
export * from './supplier/document-sub';
export * from './supplier/discount-detail';
export * from './revenue-management/revenue-store';
export * from './merchandise-managerment/tax';
export * from './store-management/supplier-order';
import {
  globalSlice,
  userSlice,
  userRoleSlice,
  storeSlice,
  provinceSlice,
  districtSlice,
  wardSlice,
  supplierSlice,
  categorySlice,
  productSlice,
  subStoreSlice,
  connectSupplierSlice,
  OrdersSlice,
  DiscountSlice,
  inventoryProductSlice,
  invoiceKiotVietSlice,
  inventoryOrdersSlice,
  supplierStoreSlice,
  InventorySupplierSlice,
  invoiceRevenueSlice,
  inventoryListProductSlice,
  documentsubSlice,
  detailDiscountSlice,
  storeOderSlice,
  taxSlice,
  supplierOderSlice
} from './';
const rootReducer = combineReducers({
  [globalSlice.name]: globalSlice.reducer,
  [userSlice.name]: userSlice.reducer,
  [userRoleSlice.name]: userRoleSlice.reducer,
  [storeSlice.name]: storeSlice.reducer,
  [provinceSlice.name]: provinceSlice.reducer,
  [districtSlice.name]: districtSlice.reducer,
  [wardSlice.name]: wardSlice.reducer,
  [supplierSlice.name]: supplierSlice.reducer,
  [categorySlice.name]: categorySlice.reducer,
  [productSlice.name]: productSlice.reducer,
  [subStoreSlice.name]: subStoreSlice.reducer,
  [connectSupplierSlice.name]: connectSupplierSlice.reducer,
  [inventoryProductSlice.name]: inventoryProductSlice.reducer,
  [OrdersSlice.name]: OrdersSlice.reducer,
  [DiscountSlice.name]: DiscountSlice.reducer,
  [invoiceKiotVietSlice.name]: invoiceKiotVietSlice.reducer,
  [inventoryOrdersSlice.name]: inventoryOrdersSlice.reducer,
  [supplierStoreSlice.name]: supplierStoreSlice.reducer,
  [InventorySupplierSlice.name]: InventorySupplierSlice.reducer,
  [invoiceRevenueSlice.name]: invoiceRevenueSlice.reducer,
  [inventoryListProductSlice.name]: inventoryListProductSlice.reducer,
  [documentsubSlice.name]: documentsubSlice.reducer,
  [detailDiscountSlice.name]: detailDiscountSlice.reducer,
  [storeOderSlice.name]: storeOderSlice.reducer,
  [taxSlice.name]: taxSlice.reducer,
  [supplierOderSlice.name]: supplierOderSlice.reducer,
});
