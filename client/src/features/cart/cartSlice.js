import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getCart, addOrUpdateCartItem, removeCartItem } from "../../api/cart";

const initialState = {
  items: [],
  totalQuantity: 0,
  subtotal: 0,
  tax: 0,
  total: 0,
  loading: false
};

const fetchCart = createAsyncThunk(
  'cart/fetch',
  async () => {
    const response = await getCart();
    return response.data;
  }
)

const addOrUpdateCart = createAsyncThunk(
  'cart/addOrUpdate',
  async ({ productId, delta }) => {
    const response = await addOrUpdateCartItem(productId, delta);
    return response.data;
  }
)

const removeCart = createAsyncThunk(
  'cart/delete', 
  async (productId) => {
    const response = await removeCartItem(productId);
    return response.data
  }
)

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCart.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchCart.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload.items;
        state.totalQuantity = action.payload.totalQuantity;
        state.subtotal = action.payload.subtotal;
        state.tax = action.payload.tax;
        state.total = action.payload.total
      })
      .addCase(fetchCart.rejected, (state) => {
        state.loading = false;
      })
  }
});

export const {} = cartSlice.actions;
export { fetchCart, addOrUpdateCart, removeCart };
export default cartSlice.reducer;
