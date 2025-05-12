import api from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<any, User>({
      query: (body) => ({
        url: `/users/register`,
        method: "POST",
        body,
      }),
    }),

    emailCheck: build.mutation<any, Partial<User>>({
      query: (body) => ({
        url: `/users/email-check`,
        method: "POST",
        body,
      }),
    }),

    loginUser: build.mutation<any, Partial<User>>({
      query: (body) => ({
        url: `/users/login`,
        method: "POST",
        body,
      }),
    }),

    updateUser: build.mutation<any, Partial<User>>({
      query: (body) => ({
        url: `/users/update`,
        method: "PUT",
        body,
      }),
    }),

    updateUserPassword: build.mutation<any, PostUpdateUserPasswordPayload>({
      query: (body) => ({
        url: `/users/reset-password-auth`,
        method: "PUT",
        body,
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useUpdateUserPasswordMutation,
  useEmailCheckMutation,
} = authApi;

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone?: string;
};

export type PostUpdateUserPasswordPayload = {
  password: string;
};
