import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Async Thunk to fetch products by collection and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async ({
    collection,
    size,
    color,
    minPrice,
    maxPrice,
    sortBy,
    search,
    category,
    material,
    brand,
    limit,
  }) => {
    const query = new URLSearchParams();
    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products?${query.toString()}`
    );
    return response.data;
  }
);

// Async thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`
    );
    return response.data;
  }
);

// Async thunk to update products
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await axios.put(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/${id}`,
      productData,
      {
        headers: `Bearer ${localStorage.getItem("userToken")}`,
      }
    );
    return response.data;
  }
);

// Async thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk(
  "products/fetchSimilarProducts",
  async ({ id }) => {
    const response = await axios.get(
      `${import.meta.env.VITE_BACKEND_URL}/api/products/similar/${id}`
    );
    return response.data;
  }
);

productSlice = createSlice({
    name: "products",
    initialState: {
        products : [],
        selectedProduct: null,  // store the detail of singleproduct
        similarProducts: [],
        loading: false,
        error: null,
        filters:{
            category: "",
            size: "",
            color: "",
            minPrice: 0,
            maxPrice: 0,
            sortBy: "",
            search: "",
            material: "",
            brand: "",
            collection:"",
        },
    },
    reducers:{
        setFilters: (state, action) => {
            state.filters = {...state.filters, ...action.payload};
        },
        clearFilters: (state) => {
            state.filters = {
                category: "",
                size: "",
                color: "",
                minPrice: 0,
                maxPrice: 0,
                sortBy: "",
                search: "",
                material: "",
                brand: "",
                collection:"",
            };
        },
    },
    extraReducers: (builder) => {
        builder
        // handle fetching products with filter
        .addCase(fetchProductsByFilters.pending, (state) => {
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload;
        })
    }
})
