import api from './base';

export const getCart = () => api.get('./cart');
export const addOrUpdateCartItem = (productId, delta) => 
    api.post('/cart/items', {productId, delta});
export const removeCartItem = (productId) => 
    api.delete(`/cart/items/${productId}`);