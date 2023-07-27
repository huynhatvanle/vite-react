import { District, Province, Ward } from '@store';

export class Responses<T> {
  constructor(
    public statusCode?: 200 | 201 | 500 | 404,
    public message?: string,
    public data?: T,
    public count?: number,
    public statistical?: {
      totalOderCancel?: number;
      totalOderReturn?: number;
      totalOderSuccess?: number;
      totalRenueve?: number;
    },
    public total?: {
      sumMoney?: number;
      sumSubTotal?: number;
      sumTotal?: number;
      sumVoucherAmount?: number;
      totalCommission?: number;
      totalNopay?: number;
      totalPaid?: number;
      total?: number;
      subTotal?: number;
      totalDiscount?: number;
      totalRevenue?: number;
    },
    public address?: {
      province?: Province;
      district?: District;
      ward?: Ward;
      street?: string;
    },
    public province?: Province,
    public district?: District,
    public ward?: Ward,
    public provinceId?: string,
    public districtId?: string,
    public wardId?: string,
    public street?: string,
    public totalCommissionSupplier?: number,
  ) {}
}

export class CommonEntity {
  constructor(public id?: string, public created_at?: string, public updated_at?: string, public isDeleted?: string) {}
}

export class PaginationQuery<T = object> {
  constructor(
    public perPage?: number,
    public page?: number,
    public filter?: string | T,
    public sorts?: string | T,
    public extend?: string | T,
    public skip?: string | T,
    public fullTextSearch?: string, // public type?: string, // public storeId?: string, // public supplierId?: string,
  ) // public filterSupplier?: string,
  // public supplierType?: string,
  // public idSuppiler?: string,
  // public idStore?: string,
  // public filterDate?: {
  //   dateFrom?: string;
  //   dateTo?: string;
  // },
  // public tab?: string
  {}
}
