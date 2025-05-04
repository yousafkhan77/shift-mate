import api from "./api";

export const commonApi = api.injectEndpoints({
  endpoints: (build) => ({
    getVendors: build.query<Vendor[], undefined>({
      query: () => `/getVendors.php`,
    }),

    getLocations: build.query<Location[], string>({
      query: (search) => `/getLocations.php?search=${search}`,
    }),

    getAddress: build.mutation<any, string>({
      query: (zip) => `/searchZip.php?search=${zip}`,
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetVendorsQuery,
  useGetLocationsQuery,
  useGetAddressMutation,
} = commonApi;

export type Vendor = {
  vendorID: number;
  vendorName: string;
  vendorWebsite: string;
  vendorImage: string;
  createdAt: string;
  updatedAt: string;
  vendorStatus: number;
};

export type Filters = {
  search?: string;
  location?: string;
  sort?: string;
  categories?: string[];
  categoryHeading?: string;
  groupBy?: boolean;
  popular?: boolean;
  contractors?: boolean;
  offset?: number;
  limit?: number;
};

export type Location = {
  location: string;
};
