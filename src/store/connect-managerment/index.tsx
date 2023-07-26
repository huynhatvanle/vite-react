import { createSlice } from '@reduxjs/toolkit';
import { CommonEntity, PaginationQuery } from '@models';
import { useAppDispatch, useTypedSelector, Action, Slice, State, District, Province, Ward } from '@store';


const name = 'Connect';
const action = new Action<Connect>(name);
export const ConnectSlice = createSlice(new Slice<Connect>(action));
export const ConnectFacade = () => {
  const dispatch = useAppDispatch();
  return {
    ...useTypedSelector((state) => state[action.name] as State<Connect>),
    set: (values: State<Connect>) => dispatch(action.set(values)),
    get: (params: PaginationQuery<Connect>) => dispatch(action.get(params)),
    getById: ({ id, keyState = 'isVisible' }: { id: string; keyState?: keyof State<Connect> }) =>
      dispatch(action.getById({ id, keyState })),
    post: (values: Connect) => dispatch(action.post(values)),
    put: (values: Connect) => dispatch(action.put(values)),
    delete: (id: string) => dispatch(action.delete(id)),
  };
};
export class Connect extends CommonEntity {
  constructor(
    public approvedAt?: string,
    public code?: string,
    public description?: string,
    public id?: string,
    public note?: string,
    public productName?: string,
    public reason?: string,
    public requestedAt?: string,
    public status?: string,
    public store?: {
       address?: {
        id?: number;
        street?: string;
        district?: District;
        province?: Province;
        ward?: Ward;
      },
      fax?:string,
      id?:string,
      name?:string,
      userRole?: {
        0: {        
          id: string;
          userAdmin: {
            email: string;
            name: string;
            phoneNumber: string;
          };
        };
      },
    },
    public storeRequestSupplier?:{
        0:{
          id:string,
          product:{
            basicUnit:string,
            capitalCost:string,
            id:string,
            name:string,
            photo:{
              0:{
                id:string,
                url:string,
              },
              
            },
            price:string,
            productCategory:{
              0:{
                category:{
                  id:string,
                  url:string,
                },
                id:string,
              },
            },
            productPrice:{
              0:{
                defaultPrice:string,
                id:string,
                minQuantity:string,
                price:string,
                priceType:string,
                productId:string,
              },
            },

          },
          status:string,
          supplier:{
            address:{
              district:{
                code:string,
                id:string,
                name:string,
                provinceCode:string,
              },
              districtId:string,
              id:string,
              postCode:string,
              province:{
                code:string,
                id:string,
                name:string,
              },
              provinceId:string,
              street:string,
              ward:{
                code:string,
                districtCode:string,
                id:string,
                name:string,
              },
              wardId:string,
            },
            fax:string,
            id:string,
            name:string,
            userRole:{
              0:{
                id:string,
                userAdmin:{
                  id:string,
                  name:string,
                  phoneNumber:string,
                },
              },
            },
          },
        },

    },

    

  ) {
    super();
  }
}

