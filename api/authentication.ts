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

export type Vehicle = {
  vehicleType: string;
  vehicleBrand: string;
  vehicleModel: string;
  vehicleColor: string;
  vehicleYear: string;
  vehicleImage: string;
  registrationNumber: string;
};

export type Driver = {
  licenceNumber?: string;
  licenceExpiration?: string;
  licenceFront?: string;
  licenceBack?: string;
  idCardBack?: string;
  idCardFront?: string;
  idCardNumber?: string;
  selfieWithID?: string;
};

export type User = {
  firstName: string;
  lastName: string;
  email: string;
  dob?: string;
  password: string;
  image?: string;
  phone?: string;
} & Driver &
  Vehicle;

export type PostUpdateUserPasswordPayload = {
  password: string;
  newPassword: string;
};
