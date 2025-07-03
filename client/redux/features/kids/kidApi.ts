import { url } from "inspector";
import { apiSlice } from "../api/apiSlice";

const kidsApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getAllKids: builder.query({
      query: (group) => {
        return {
          url: group.group ? `all-kids?ageGroup=${group.group}` : "all-kids",
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
    editKidProfile: builder.mutation({
      query: (kid) => ({
        url: `edit-kid/${kid.id}`,
        body: kid.data,
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
    addKidProfile: builder.mutation({
      query: (kid) => ({
        url: "add-kid",
        body: kid.data,
        method: "POST",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useGetAllKidsQuery,
  useEditKidProfileMutation,
  useAddKidProfileMutation,
} = kidsApi;
