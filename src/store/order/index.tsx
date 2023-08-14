import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { API, cleanObjectKeyNull, routerLinks } from '@utils';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State, Product, StoreManagement, Supplier } from '@store';

const name = 'Orders';

const action = {
  ...new Action<Orders>(name),
  getOrder: createAsyncThunk(
    name + '/get',
    async ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { filterSupplier?: string };
      fullTextSearch: string;
    }) => {
      const filterOrder = JSON.parse(filter.toString() || '{}');

      const data = await API.get(
        routerLinks(name, 'api'),
        cleanObjectKeyNull({
          page,
          perPage,
          filterSupplier: filterOrder.filterSupplier,
          fullTextSearch: fullTextSearch,
        }),
      );
      return data;
    },
  ),
};

export const OrdersSlice = createSlice(new Slice<Orders>(action));

export const OrdersFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...(useTypedSelector((state) => state[action.name]) as State<Orders>),
    set: (values: State<Orders>) => dispatch(action.set(values)),
    get: ({
      page,
      perPage,
      filter,
      fullTextSearch,
    }: {
      page: number;
      perPage: number;
      filter: { filterSupplier?: string };
      fullTextSearch: string;
    }) => dispatch(action.getOrder({ page, perPage, filter, fullTextSearch })),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Orders> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Orders) => dispatch(action.post(values)),
    put: (values: Orders) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};

export class Orders extends CommonEntity {
  constructor(
    public id?: string,
    public code?: string,
    public confirmAt?: string,
    public createdAt?: string,
    public deliveredAt?: string,
    public cancelledAt?: string,
    public cancelledReason?: string,
    public importedReason?: string,
    public isApplyTax?: string,
    public isStoreCancel?: string,
    public oderInvoiceCode?: string,
    public orderInvoice?: {
      code?: string,
      typeOrderInvoice?: string,
      url?: string,
    }[],
    public orderLineItem?: OrderLineItem[],
    public orderPhase?: OrderPhase[],
    public ownerSupplier?: OwnerSupplier,
    public paymentSupplierOrder?: string,
    public paymentSupplierStatus?: string,
    public pickupAt?: string,
    public poIdKiotViet?: string,
    public status?: string,
    public store?: StoreManagement,
    public storeAdmin?: {
      phoneNumber?: string,
    },
    public storeId?: string,
    public supplier?: Supplier,
    public supplierId?: string,
    public total?: string,
    public totalReceived?: string,
    public totalTax?: string,
    public typeOrder?: string,
    public updateOrderCount?: string,
    public updatedAt?: string,
    public voucher?: string,
    public voucherAmount?: string,
    public voucherReceiptAmount?: string,
  ) {
    super();
  }
}

export class OrderLineItem extends CommonEntity {
  constructor(
    public id?: string,
    public isDeleted?: string,
    public orderId?: string,
    public price?: string,
    public product?: Product,
    public productId?: string,
    public quantity?: string,
    public remainQuantity?: string,
    public storeBarcode?: string,
    public subTotal?: string,
    public tax?: string,
    public total?: string,
    public totalReceived?: string,
  ) {
    super();
  }
}

export class OrderPhase extends CommonEntity {
  constructor(
    public id?: string,
    public order?: {
      id?: string,
      isApplyTax?: string,
      total?: string,
    },
    public orderId?: string,
    public orderLineItemPhase?: string,
    public receivedDate?: Product,
    public totalReceivedOrderPhase?: string,
  ) {
    super();
  }
}
export class OrderLineItemPhase extends CommonEntity {
  constructor(
    public id?: string,
    public orderLineItem?: OrderLineItem,
    public orderPhaseId?: string,
    public quantity?: string,
    public remainQuantity?: string,
    public totalReceived?: string,
    public updatedReason?: string,
  ) {
    super();
  }
}
export class OwnerSupplier extends CommonEntity {
  constructor(
    public addressId?: string,
    public code?: string,
    public createdOn?: string,
    public dateOfBirth?: string,
    public email?: string,
    public gender?: string,
    public id?: string,
    public identityCard?: string,
    public isActive?: boolean,
    public isDeactivated?: boolean,
    public lastLogin?: string,
    public name?: string,
    public note?: string,
    public orgId?: string,
    public password?: string,
    public phoneNumber?: string,
    public profileImage?: string,
    public status?: string,
    public subOrgId?: string,
    public updatedAt?: string,
    public username?: string,
    public uuid?: string,
  ) {
    super();
  }
}