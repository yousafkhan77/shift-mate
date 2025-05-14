import api from "./api";

export const userApi = api.injectEndpoints({
  endpoints: (build) => ({
    getAddresses: build.query<Address[], undefined>({
      query: () => `/users/addresses`,
      providesTags: ["Address"],
    }),

    addAddress: build.mutation<{ message: string }, { address: string }>({
      query: (body) => ({ url: `/users/addresses`, method: "POST", body }),
      invalidatesTags: ["Address"],
    }),

    getDefaultAddress: build.query<Address, undefined>({
      query: () => `/users/addresses/default`,
      providesTags: ["DefaultAddress"],
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
  useSetDefaultAddressMutation,
} = userApi;

export type Address = {
  addressID: string;
  address: string;
  default: boolean;
};
