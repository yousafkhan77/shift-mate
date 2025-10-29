import api from "./api";
import { Vehicle } from "./authentication";
import { Location } from "./common";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAddresses: build.query<Address[], undefined>({
      query: () => `/users/addresses`,
      providesTags: ["Address"],
    }),

    addAddress: build.mutation<{ message: string }, Partial<Address>>({
      query: (body) => ({ url: `/users/addresses`, method: "POST", body }),
      invalidatesTags: ["Address", "DefaultAddress"],
    }),

    updateAddress: build.mutation<{ message: string }, Partial<Address>>({
      query: ({ addressID, ...body }) => ({
        url: `/users/addresses/${addressID}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Address"],
    }),

    addFields: build.mutation<any, { [key: string]: any }>({
      query: (body) => ({
        url: `/users/fields`,
        method: "POST",
        body,
      }),
    }),

    addCompany: build.mutation<any, { [key: string]: any }>({
      query: (body) => ({
        url: `/users/company`,
        method: "POST",
        body,
      }),
    }),

    addVehicle: build.mutation<any, Vehicle>({
      query: (body) => ({
        url: `/users/vehicles`,
        method: "POST",
        body,
      }),
    }),

    getDefaultAddress: build.query<Address, undefined>({
      query: () => `/users/addresses/default`,
      providesTags: ["DefaultAddress"],
    }),

    getVerificationStatus: build.mutation<any, undefined>({
      query: () => `/users/verification-status`,
    }),

    setDefaultAddress: build.mutation<
      { message: string },
      { addressID: string }
    >({
      query: (body) => ({
        url: `/users/addresses/default`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["DefaultAddress"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetAddressesQuery,
  useAddAddressMutation,
  useGetDefaultAddressQuery,
  useUpdateAddressMutation,
  useSetDefaultAddressMutation,
  useAddFieldsMutation,
  useAddVehicleMutation,
  useAddCompanyMutation,
  useGetVerificationStatusMutation,
} = userApi;

export type Address = {
  addressID: string;
  default: boolean;
  addressFull: string;
} & Location;
