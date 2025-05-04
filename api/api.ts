import { getToken } from "@/redux/slices/auth";
import {
  createApi,
  fetchBaseQuery,
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";

export const baseURL = "http://localhost:9600/api";
export const MAIN_API_REDUCER_KEY = "mainApi";

const baseQuery = fetchBaseQuery({
  baseUrl: baseURL,
  prepareHeaders: async (headers) => {
    const token = await getToken();

    if (token) {
      // headers.set("ATKN", token);
    }

    return headers;
  },
});

const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, theApi, extraOptions) => {
  let result = await baseQuery(args, theApi, extraOptions);
  if (
    result.error &&
    (result.error.status === 401 || result.error.status === 412)
  ) {
    try {
    } catch (err) {}
  }

  return result;
};

const api = createApi({
  reducerPath: MAIN_API_REDUCER_KEY,
  tagTypes: [],
  baseQuery: baseQueryWithReauth,
  keepUnusedDataFor: 30,
  endpoints: () => ({}),
});

export default api;
