import { apiSlice } from "../api/apiSlice";

export const layoutApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getHeroData: builder.query({
      query: (params) => {
        // Check if params is a string (for backward compatibility) or an object
        if (typeof params === 'string') {
          return {
            url: `get-layout/${params}`,
            method: "GET",
            credentials: "include" as const,
          };
        }
        
        // If params is an object with type and lang
        const { type, lang } = params;
        return {
          url: `get-layout/${type}${lang ? `?lang=${lang}` : ''}`,
          method: "GET",
          credentials: "include" as const,
        };
      },
    }),
    editLayout: builder.mutation({
      query: ({ type, image, title, subTitle, faq, categories }) => ({
        url: `edit-layout`,
        body: {
          type,
          image,
          title,
          subTitle,
          faq,
          categories,
        },
        method: "PUT",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const { useGetHeroDataQuery, useEditLayoutMutation } = layoutApi;
