import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Available at your primary URL https://hrms-xj6h.onrender.com
const baseURL = "https://hrms-xj6h.onrender.com/api/v1";

// Base API
export const baseAPI = createApi({
  reducerPath: "api",

  baseQuery: fetchBaseQuery({
    baseUrl: baseURL, // for cookies
    prepareHeaders: (headers) => {
      headers.set("Content-Type", "application/json");
      return headers;
    },
  }),

  tagTypes: ["Employee", "Attendance"],

  // TypeScript requires endpoints to be typed
  endpoints: (builder) => ({}),
});