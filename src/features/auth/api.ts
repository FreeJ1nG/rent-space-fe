import api from "@/common/services/api";

export const authApi = api.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation<
      AuthFeature.LoginResponse,
      ApiParam<AuthFeature.LoginParam>
    >({
      query: ({ payload }) => ({
        url: `/auth/login`,
        method: "POST",
        body: payload,
      }),
    }),
    register: builder.mutation<
      AuthFeature.RegisterResponse,
      ApiParam<AuthFeature.RegisterParam>
    >({
      query: ({ payload }) => ({
        url: `/auth/register`,
        method: "POST",
        body: { role: "USER", ...payload },
      }),
    }),
    getUser: builder.query<User, ApiParam>({
      query: ({ accessToken }) => ({
        url: `/auth/current-user`,
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useLazyGetUserQuery,
} = authApi;
