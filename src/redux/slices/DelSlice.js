import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import secureLocalStorage from 'react-secure-storage';
const config = require('../../config.json')


var get_refresh_token = localStorage.getItem("refresh");
var get_access_token = localStorage.getItem("access_token");

export const DeleteApiData = createAsyncThunk('DelData', async ( jsons ) => {
    const response = await fetch(
        `${config["baseUrl"]}${jsons.url}`,
        {
            method: "POST",
            headers: {
                "content-type": "application/json",
                "accessToken": `Bareer ${get_access_token}`,
            },
            body:JSON.stringify(
                jsons.body
            )  
        }
    )
    const data = await response.json();
    if (data?.messsage == "unauthorized") {
        var ress = await fetch(
            `${config["baseUrl"]}${jsons.url}`,
            {
                method: "POST",
                headers: {
                    "content-type": "application/json",
                     refereshToken: `Bareer ${get_refresh_token}`,
                },
                body: JSON.stringify(
                    jsons.body
                ) 
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
});

// Create a slice
const DelSlice = createSlice({
    name: 'Delete data',
    initialState: {
        error: null,
        status: null,
        msg: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(DeleteApiData.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(DeleteApiData.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.msg = action.payload.messsage;
                setTimeout(() => {
                    window.location.reload();
                }, 2000);
            })
            .addCase(DeleteApiData.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    },
});


export default DelSlice.reducer;