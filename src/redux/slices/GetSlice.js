import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')


// Define an async thunk for API call
var get_refresh_token = localStorage.getItem("refresh");
var get_access_token = localStorage.getItem("access_token");

export const fetchApiData = createAsyncThunk('getData', async (API_URL) => {

  const response = await fetch(
    `${config["baseUrl"]}${API_URL}`,
    {
      method: "GET",
      headers: {
        "content-type": "application/json",
        accessToken: `Bareer ${get_access_token}`,
      },
    }
  )
  const data = await response.json();
  if (data?.messsage == "unauthorized") {
    var ress = await fetch(
      `${config["baseUrl"]}${API_URL}`,
      {
        method: "GET",
        headers: {
          "content-type": "application/json",
          refereshToken: `Bareer ${get_refresh_token}`,
        },
      }
    )
    data = await ress.json();
    localStorage.setItem("refresh",  data?.referesh_token);
    secureLocalStorage.setItem("access_token", data?.access_token);
  }
  else if (data?.messsage == "timeout error") {
   setTimeout(() => {
    window.location.href = "/"
   }, 5000);
  }
  return data
  // setTimeout(() => {
  //   console.log("API_URL",data)
   
  //  }, 1000);
});

// Create a slice
const GetSlice = createSlice({
  name: 'get data',
  initialState: {
    data: [],
    error: null,
    status: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchApiData.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchApiData.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.data = action.payload;
        state.error = action.payload.messsage;
      })
      .addCase(fetchApiData.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      });
  },
});



export default GetSlice.reducer;