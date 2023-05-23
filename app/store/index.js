"use client";
import { configureStore } from "@reduxjs/toolkit";
import { createSlice } from "@reduxjs/toolkit";

// create a slice
export const loginSlice = createSlice({
  name: "imsData",
  initialState: {
    pageTittle: "",
    filterOptions: [],
    showFilterOptions: false,
    showFilterToggle: false,
    showHelpButton: false,
    loading: false,
    helpInfo: "",
    helpWarning: "",
    companyBranch:
      typeof window !== "undefined" &&
      JSON.parse(localStorage && localStorage?.getItem("otherData"))
        ?.companyBranch
        ? JSON.parse(localStorage && localStorage?.getItem("otherData"))
            ?.companyBranch
        : "BRMSC012",
    currentSession:
      typeof window !== "undefined" &&
      JSON.parse(localStorage && localStorage?.getItem("otherData"))
        ?.currentSession
        ? JSON.parse(localStorage && localStorage?.getItem("otherData"))
            ?.currentSession
        : "23-24",
    user:
      JSON.parse(
        typeof window !== "undefined" &&
          window.localStorage?.getItem("loggedInUser")
      ) ?? null,
  },
  reducers: {
    // setting the user
    setUser: (state, action) => {
      state.user = action.payload;
    },
    // setting the page header title
    setPageTittle: (state, action) => {
      state.pageTittle = action.payload;
    },
    // setting the filter options for the page
    setFilterOptions: (state, action) => {
      state.filterOptions = action.payload;
    },
    // setting the drawer state of the filter options
    setShowFilterOptions: (state, action) => {
      state.showFilterOptions = !state.showFilterOptions;
    },
    // setting whether to show the toggle of the filter options
    setShowFilterToggle: (state, action) => {
      state.showFilterToggle = action.payload;
    },
    setShowHelpButton: (state, action) => {
      state.showHelpButton = action.payload;
    },
    // setting the global company branch
    setCompanyBranch: (state, action) => {
      state.companyBranch = action.payload;
    },
    // setting the current session
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    setHelpMessage: (state, action) => {
      state.helpInfo = action.payload.info;
      state.helpWarning = action.payload.warning;
    },
  },
});
// config the store
const store = configureStore({
  reducer: {
    imsData: loginSlice.reducer,
  },
});

// export default the store
export default store;

// export the action
export const {
  setPageTittle,
  setFilterOptions,
  setShowFilterOptions,
  setShowFilterToggle,
  setUser,
  setCurrentSession,
  setCompanyBranch,
  setShowHelpButton,
  setLoading,
  setHelpMessage,
} = loginSlice.actions;
