import api from "./api";

export const authApi = api.injectEndpoints({
  endpoints: (build) => ({
    registerUser: build.mutation<any, User>({
      query: (body) => ({
        url: `/registerUser.php`,
        method: "POST",
        body,
      }),
    }),

    loginUser: build.mutation<any, Partial<User>>({
      query: (body) => ({
        url: `/loginUser.php`,
        method: "POST",
        body,
      }),
    }),

    updateUser: build.mutation<any, Partial<User>>({
      query: (body) => ({
        url: `/updateUser.php`,
        method: "POST",
        body,
      }),
    }),

    updateUserPassword: build.mutation<any, PostUpdateUserPasswordPayload>({
      query: (body) => ({
        url: `/updateUserPassword.php`,
        method: "POST",
        body,
      }),
    }),

    uploadUserImage: build.mutation<any, any>({
      query: (body) => ({
        url: `/uploadUserImage.php`,
        method: "POST",
        body,
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }),
    }),
  }),

  overrideExisting: false,
});

export const {
  useRegisterUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useUploadUserImageMutation,
  useUpdateUserPasswordMutation,
} = authApi;

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  contact?: string | null;
};

export type PostUpdateUserPasswordPayload = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};
