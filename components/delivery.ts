import api from "./api";
import { Address } from "./user";

export const deliveryApi = api.injectEndpoints({
  endpoints: (build) => ({
    getDeliveries: build.query<Delivery[], undefined>({
      query: () => `/deliveries`,
      providesTags: ["Delivery"],
    }),

    getDelivery: build.query<Delivery, string>({
      query: (deliveryID) => `/deliveries/${deliveryID}`,
      providesTags: ["DeliveryDetail"],
    }),

    getPendingDelivery: build.query<Delivery, { detail?: boolean }>({
      query: ({ detail }) =>
        `/deliveries/pending-delivery?${detail ? `detail=${detail}` : ""}`,
      providesTags: ["PendingDelivery"],
    }),

    getDriverLocation: build.query<
      { location: Address["coordinates"] },
      { deliveryID: string; driverID: string }
    >({
      query: ({ deliveryID, driverID }) =>
        `/deliveries/${deliveryID}/driver/${driverID}/location`,
    }),

    getCurrentDelivery: build.query<Delivery, undefined>({
      query: () => `/deliveries/current-delivery`,
      providesTags: ["CurrentDelivery"],
    }),

    getNearbyDrivers: build.query<
      {
        driverID: string;
        vehicleType: string;
        coordinates: Address["coordinates"];
        driverName: string;
      }[],
      Address["coordinates"]
    >({
      query: (coordinates) =>
        `/deliveries/nearby-drivers?lat=${coordinates.lat}&lon=${coordinates.lon}`,
    }),

    getNearbyDeliveries: build.query<Delivery[], Address["coordinates"]>({
      query: (coordinates) =>
        `/deliveries/nearby?lat=${coordinates.lat}&lon=${coordinates.lon}`,
      providesTags: ["NearbyDelivery"],
    }),

    getDeliveryRequests: build.query<DeliveryRequest[], string>({
      query: (deliveryID) => `/deliveries/${deliveryID}/requests`,
    }),

    acceptDeliveryRequest: build.mutation({
      query: (deliveryRequestID) => {
        return {
          url: `/deliveries/requests/accept`,
          method: "POST",
          body: { deliveryRequestID },
        };
      },
      invalidatesTags: ["Delivery", "DeliveryDetail", "PendingDelivery"],
    }),

    declineDeliveryRequest: build.mutation({
      query: (deliveryRequestID) => {
        return {
          url: `/deliveries/requests/decline`,
          method: "POST",
          body: { deliveryRequestID },
        };
      },
    }),

    postDelivery: build.mutation<any, Partial<Delivery>>({
      query: (body) => ({ url: `/deliveries`, method: "POST", body }),
      invalidatesTags: ["Delivery", "PendingDelivery"],
    }),

    updateDeliveryStatus: build.mutation({
      query: ({ deliveryID, ...body }) => ({
        url: `/deliveries/${deliveryID}/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [
        "Delivery",
        "DeliveryDetail",
        "PendingDelivery",
        "CurrentDelivery",
      ],
    }),

    sendDeliveryRequest: build.mutation({
      query: ({ deliveryID, ...body }) => ({
        url: `/deliveries/${deliveryID}/requests`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["NearbyDelivery"],
    }),

    updateDelivery: build.mutation<any, any>({
      query: ({ deliveryID, ...body }) => ({
        url: `/deliveries/${deliveryID}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Delivery", "DeliveryDetail", "PendingDelivery"],
    }),
  }),

  overrideExisting: false,
});

export const {
  useGetDeliveriesQuery,
  useGetDeliveryQuery,
  usePostDeliveryMutation,
  useUpdateDeliveryMutation,
  useLazyGetNearbyDriversQuery,
  useGetPendingDeliveryQuery,
  useGetDeliveryRequestsQuery,
  useAcceptDeliveryRequestMutation,
  useDeclineDeliveryRequestMutation,
  useUpdateDeliveryStatusMutation,
  useGetNearbyDeliveriesQuery,
  useSendDeliveryRequestMutation,
  useGetCurrentDeliveryQuery,
  useGetDriverLocationQuery,
  useLazyGetDriverLocationQuery,
} = deliveryApi;

export type DeliveryRequest = {
  deliveryRequestID: string;
  deliveryRequestFare: string;
  user: {
    userID: string;
    firstName: string;
    lastName: string;
    phone: string;
    image: string;
  };
};

export type Delivery = {
  deliveryID: string;
  pickup: Address;
  dropoff: Address;
  deliveryState: string;
  deliveryStatus: string;
  deliveryItems: any[];
  locationType?: string;
  user: DeliveryRequest["user"];
  createdAt: string;
  deliveryFare: number;
  deliveryRequest: DeliveryRequest;
};
