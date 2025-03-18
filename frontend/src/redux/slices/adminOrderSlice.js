import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// fetch all orders (admin only)
export const fetchAllOrders = createAsyncThunk(
  "admin/fetchAllOrders",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response.data);
    }
  }
);


// Update order delivery status
export const updateOrderStatus = createAsyncThunk(
    "admin/updateOrderStatus",
    async ({id, status}, { rejectWithValue }) => {
      try {
        const response = await axios.put(
          `${import.meta.env.VITE_BACKEND_URL}/api/admin/orders${id}`,
          {status},
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("userToken")}`,
            },
          }
        );
        return response.data;
      } catch (error) {
        return rejectWithValue(error.response.data);
      }
    }
);

// async thunk to delete a product
export const deleteProduct = createAsyncThunk(
    "admin/deleteProduct",
    async(id)=>{
        await axios.delete(
            `${import.meta.env.VITE_BACKEND_URL}/api/admin/products/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("userToken")}`
                }
            }
        )
        return response.data
    }
);