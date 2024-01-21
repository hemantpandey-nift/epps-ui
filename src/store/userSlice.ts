import http from "../utils/http";
import END_POINTS from "../constants/endPoints";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetchAllUserList = createAsyncThunk(
  END_POINTS.GET_ALL_USERS,
  async (params: any, { rejectWithValue }) => {
    try {
      const data: any = await http.get(
        `${END_POINTS.GET_ALL_USERS}?search=${params.search}&sortBy=${params.sortBy}&order=${params.order}&page=${params.page}&limit=${params.limit}`
      );

      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

export const fetchUserAvailibility = createAsyncThunk(
  END_POINTS.FETCH_USER_AVAILIBILITY,
  async (params: any, { rejectWithValue }) => {
    try {
      const data: any = await http.get(
        `${END_POINTS.FETCH_USER_AVAILIBILITY}?availibilityDays=${params.weekDays}`
      );

      return data;
    } catch (error: any) {
      console.log(error);
      return rejectWithValue(error.response ? error.response.data : error);
    }
  }
);

interface productSliceProps {
  allUserData: { userList: any[]; totalRecords: number };
  availibilityData: { availibilityList: any[] };
  loading: boolean;
  error: any;
  success: boolean;
}

const initialState: productSliceProps = {
  allUserData: { userList: [], totalRecords: 0 },
  availibilityData: { availibilityList: [] },
  loading: false,
  error: null,
  success: false,
};

export const userSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder

      .addCase(fetchAllUserList.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllUserList.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.allUserData = {
          userList: payload.data.data,
          totalRecords: payload.data.totalRecords,
        };
      })
      .addCase(fetchAllUserList.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.allUserData = { userList: [], totalRecords: 0 };
        state.success = false;
      })
      .addCase(fetchUserAvailibility.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAvailibility.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
        state.error = null;
        state.availibilityData = {
          availibilityList: payload.data.data,
        };
      })
      .addCase(fetchUserAvailibility.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
        state.availibilityData = { availibilityList: [] };
        state.success = false;
      });
  },
});

export default userSlice.reducer;
