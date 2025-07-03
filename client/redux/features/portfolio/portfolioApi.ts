import { apiSlice } from "../api/apiSlice";

const portfolioApi = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    addPortfolio: builder.mutation({
      query: (data) => ({
        url: "create-portfolio",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    getPortfolio: builder.query({
      query: (username) => ({
        url: `get-portfolio/${username}`,
      }),
    }),
    getPortfolioForDashboard: builder.query({
      query: () => ({
        url: `get-portfolio`,
        credentials: "include" as const,
      }),
    }),
    editPortfolio: builder.mutation({
      query: (data) => ({
        url: "edit-portfolio",
        method: "PUT",
        body: data,
        credentials: "include" as const,
      }),
    }),
    sendMessageContact: builder.mutation({
      query: (data) => ({
        url: "contact",
        method: "POST",
        body: data,
      }),
    }),
    getContactMessages: builder.query({
      query: () => ({
        url: "get-contacts",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    sendNewsletter: builder.mutation({
      query: (data) => ({
        url: "send-newsLetter",
        method: "POST",
        body: data,
      }),
    }),
    addSkill: builder.mutation({
      query: (data) => ({
        url: "add-skills",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editSkill: builder.mutation({
      query: (skill) => ({
        url: `edit-skill/${skill.id}`,
        method: "PUT",
        body: skill.data,
        credentials: "include" as const,
      }),
    }),
    deleteSkill: builder.mutation({
      query: (id) => ({
        url: `delete-skill/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    getAllCategories: builder.query({
      query: () => ({
        url: "get-categories",
        method: "GET",
        credentials: "include" as const,
      }),
    }),
    addCategory: builder.mutation({
      query: (data) => ({
        url: "create-category",
        method: "POST",
        body: data,
        credentials: "include" as const,
      }),
    }),
    editCategory: builder.mutation({
      query: (category) => ({
        url: `update-category/${category.id}`,
        method: "PUT",
        body: category.data,
        credentials: "include" as const,
      }),
    }),
    deleteCategory: builder.mutation({
      query: (id) => ({
        url: `delete-category/${id}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
    addProject: builder.mutation({
      query: (data) => ({
        url: `add-projects-to-category/${data.id}`,
        method: "PUT",
        body: data.data,
        credentials: "include" as const,
      }),
    }),
    editProject: builder.mutation({
      query: (project) => ({
        url: `update-project/${project.categoryId}/${project.projectId}`,
        method: "PUT",
        body: project.data,
        credentials: "include" as const,
      }),
    }),
    deleteProject: builder.mutation({
      query: (data) => ({
        url: `delete-project/${data.categoryId}/${data.projectId}`,
        method: "DELETE",
        credentials: "include" as const,
      }),
    }),
  }),
});

export const {
  useAddPortfolioMutation,
  useGetPortfolioQuery,
  useSendMessageContactMutation,
  useSendNewsletterMutation,
  useGetContactMessagesQuery,
  useGetPortfolioForDashboardQuery,
  useEditPortfolioMutation,
  useAddSkillMutation,
  useEditSkillMutation,
  useDeleteSkillMutation,
  useGetAllCategoriesQuery,
  useAddCategoryMutation,
  useEditCategoryMutation,
  useDeleteCategoryMutation,
  useAddProjectMutation,
  useEditProjectMutation,
  useDeleteProjectMutation,
} = portfolioApi;
